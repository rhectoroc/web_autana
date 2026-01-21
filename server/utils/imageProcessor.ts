import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

interface ProcessedImage {
    filename: string;
    buffer: Buffer;
}

export const processImage = async (buffer: Buffer, originalName: string): Promise<ProcessedImage> => {
    // Generate new filename with .jpg extension
    const nameWithoutExt = path.parse(originalName).name;
    const timestamp = Date.now();
    const newFilename = `${timestamp}-${nameWithoutExt}.jpg`;

    // Path to watermark
    // Assuming process.cwd() is the project root (where package.json is)
    const watermarkPath = path.join(process.cwd(), 'public', 'logo', 'logoOriginalSinFondo.png');

    let pipeline = sharp(buffer)
        .resize({ width: 1920, withoutEnlargement: true }) // Resize to max width 1920
        .toFormat('jpeg', { quality: 80, mozjpeg: true }); // Convert to JPEG with compression

    // Check if watermark exists before attempting to composite
    if (fs.existsSync(watermarkPath)) {
        // Prepare watermark: resize it relative to the main image or use a fixed width?
        // Let's typically make it visible but not overwhelming. e.g., 200px width.
        // Or better, let's load it and composite it.
        // We'll place it in the bottom-right corner with some padding.

        try {
            pipeline = pipeline.composite([
                {
                    input: watermarkPath,
                    gravity: 'southeast',
                    blend: 'over',
                    // basic scaling for logo if needed - sharp composite input can be a Buffer or path.
                    // Ideally we might want to resize the watermark based on the image size, 
                    // but simple composition is a good start. 
                    // If the logo is huge, we might want to resize it first.
                    // Let's blindly composite for now as per "simple" requirements, 
                    // but usually resizing the watermark is safer.
                }
            ]);
        } catch (error) {
            console.warn('Failed to load watermark image:', error);
        }
    } else {
        console.warn('Watermark image not found at:', watermarkPath);
    }

    const processedBuffer = await pipeline.toBuffer();

    return {
        filename: newFilename,
        buffer: processedBuffer
    };
};
