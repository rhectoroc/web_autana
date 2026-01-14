import { pool } from '../config/db.js';
import fs from 'fs';
import path from 'path';
export const createProperty = async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const { title, description, price, type, bathrooms, bedrooms, location, features } = req.body;
        // Features might come as a JSON string if sent via FormData
        const parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
        const propResult = await client.query(`INSERT INTO properties (title, description, price, type, bathrooms, bedrooms, location, features)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING id`, [title, description, price, type, bathrooms, bedrooms, location, JSON.stringify(parsedFeatures)]);
        const propertyId = propResult.rows[0].id;
        if (req.files && Array.isArray(req.files)) {
            const files = req.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                // First image is main by default, or user could specify. 
                // For now, simpler: first uploaded is main.
                const isMain = i === 0;
                await client.query(`INSERT INTO images (property_id, image_url, is_main) VALUES ($1, $2, $3)`, [propertyId, `/uploads/${file.filename}`, isMain]);
            }
        }
        await client.query('COMMIT');
        res.status(201).json({ message: 'Property created successfully', propertyId });
    }
    catch (err) {
        await client.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ message: 'Error creating property' });
    }
    finally {
        client.release();
    }
};
export const getProperties = async (req, res) => {
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching properties' });
    }
};
export const deleteProperty = async (req, res) => {
    const { id } = req.params;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        // Get images to delete files
        const imgResult = await client.query('SELECT image_url FROM images WHERE property_id = $1', [id]);
        await client.query('DELETE FROM properties WHERE id = $1', [id]);
        await client.query('COMMIT');
        // Delete files from filesystem
        imgResult.rows.forEach(img => {
            const filePath = path.join(process.cwd(), 'server', img.image_url);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });
        res.json({ message: 'Property deleted successfully' });
    }
    catch (err) {
        await client.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ message: 'Error deleting property' });
    }
    finally {
        client.release();
    }
};
