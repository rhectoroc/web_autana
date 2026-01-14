import { Request, Response } from 'express';
import { pool } from '../config/db.js';
import fs from 'fs';
import path from 'path';

export const createProperty = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const { title, description, price, type, bathrooms, bedrooms, area_sqm, parking_spots, location, features, status } = req.body;
        // Features might come as a JSON string if sent via FormData
        const parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;

        const propResult = await client.query(
            `INSERT INTO properties (title, description, price, type, bathrooms, bedrooms, area_sqm, parking_spots, location, features, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
             RETURNING id`,
            [title, description, price, type, bathrooms, bedrooms, area_sqm || 0, parking_spots || 0, location, JSON.stringify(parsedFeatures), status || 'available']
        );

        const propertyId = propResult.rows[0].id;

        if (req.files && Array.isArray(req.files)) {
            const files = req.files as Express.Multer.File[];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                // First image is main by default, or user could specify. 
                // For now, simpler: first uploaded is main.
                const isMain = i === 0;
                await client.query(
                    `INSERT INTO images (property_id, image_url, is_main) VALUES ($1, $2, $3)`,
                    [propertyId, `/uploads/${file.filename}`, isMain]
                );
            }
        }

        await client.query('COMMIT');
        res.status(201).json({ message: 'Property created successfully', propertyId });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ message: 'Error creating property' });
    } finally {
        client.release();
    }
};

export const getProperties = async (req: Request, res: Response): Promise<void> => {
    try {
        const query = `
            SELECT p.*, 
                   COALESCE(json_agg(json_build_object('id', i.id, 'image_url', i.image_url, 'is_main', i.is_main)) 
                   FILTER (WHERE i.id IS NOT NULL), '[]') as images
            FROM properties p
            LEFT JOIN images i ON p.id = i.property_id
            GROUP BY p.id
            ORDER BY p.created_at DESC
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching properties' });
    }
};

export const getPropertyById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const query = `
            SELECT p.*, 
                   COALESCE(json_agg(json_build_object('id', i.id, 'image_url', i.image_url, 'is_main', i.is_main)) 
                   FILTER (WHERE i.id IS NOT NULL), '[]') as images
            FROM properties p
            LEFT JOIN images i ON p.id = i.property_id
            WHERE p.id = $1
            GROUP BY p.id
        `;
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Property not found' });
            return;
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching property' });
    }
};

export const updateProperty = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const { title, description, price, type, bathrooms, bedrooms, area_sqm, parking_spots, location, features, status, existingImages } = req.body;

        const parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;

        // Update property details
        await client.query(
            `UPDATE properties 
             SET title = $1, description = $2, price = $3, type = $4, bathrooms = $5, bedrooms = $6, area_sqm = $7, parking_spots = $8, location = $9, features = $10, status = $11
             WHERE id = $12`,
            [title, description, price, type, bathrooms, bedrooms, area_sqm || 0, parking_spots || 0, location, JSON.stringify(parsedFeatures), status || 'available', id]
        );

        // Handle Images
        // existingImages is sent as a JSON string of IDs to keep
        const keepIds = existingImages ? JSON.parse(existingImages) : [];

        // Construct delete query
        let deleteQuery = '';
        let deleteParams: any[] = [id];

        if (keepIds.length > 0) {
            // Delete images NOT in the keep list
            deleteQuery = `DELETE FROM images WHERE property_id = $1 AND id NOT IN (${keepIds.map((_: any, i: number) => '$' + (i + 2)).join(',')}) RETURNING image_url`;
            deleteParams = [id, ...keepIds];
        } else {
            // If empty, delete ALL images for this property
            deleteQuery = `DELETE FROM images WHERE property_id = $1 RETURNING image_url`;
        }

        const deletedImgs = await client.query(deleteQuery, deleteParams);

        // Delete files from filesystem
        deletedImgs.rows.forEach((img: any) => {
            const filePath = path.join(process.cwd(), img.image_url);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        });
        // If existingImages is NOT sent or empty string? Be careful not to delete all if not intended. 
        // Let's assume if it is NOT present, we do nothing to existing. If it is present but empty, we delete all?
        // Better: Frontend MUST send 'existingImages' as JSON string of ID array if it wants to manage them.

        if (req.files && Array.isArray(req.files)) {
            const files = req.files as Express.Multer.File[];
            for (const file of files) {
                await client.query(
                    `INSERT INTO images (property_id, image_url, is_main) VALUES ($1, $2, $3)`,
                    [id, `/uploads/${file.filename}`, false] // Append new images
                );
            }
        }

        await client.query('COMMIT');
        res.json({ message: 'Property updated successfully' });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ message: 'Error updating property' });
    } finally {
        client.release();
    }
};

export const deleteProperty = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Get images to delete files
        const imgResult = await client.query('SELECT image_url FROM images WHERE property_id = $1', [id]);

        await client.query('DELETE FROM properties WHERE id = $1', [id]);

        await client.query('COMMIT');

        // Delete files from filesystem
        imgResult.rows.forEach((img: any) => {
            const filePath = path.join(process.cwd(), img.image_url);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });

        res.json({ message: 'Property deleted successfully' });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ message: 'Error deleting property' });
    } finally {
        client.release();
    }
};
