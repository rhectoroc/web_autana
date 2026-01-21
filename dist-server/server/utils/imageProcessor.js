import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
export const processImage = async (buffer, originalName) => {
    // Generate new filename with .jpg extension
    const nameWithoutExt = path.parse(originalName).name;
    const timestamp = Date.now();
    const newFilename = `${timestamp}-${nameWithoutExt}.jpg`;
    // Path to watermark
    // Assuming process.cwd() is the project root (where package.json is)
    const watermarkPath = path.join(process.cwd(), 'public', 'logo', 'logoOriginalSinFondo.png');
    try {
        let pipeline = sharp(buffer)
            .resize({ width: 1920, withoutEnlargement: true }) // Resize to max width 1920
            .toFormat('jpeg', { quality: 80, mozjpeg: true }); // Convert to JPEG with compression
        // Check if watermark exists before attempting to composite
        if (fs.existsSync(watermarkPath)) {
            // Prepare watermark
            try {
                pipeline = pipeline.composite([
                    {
                        input: watermarkPath,
                        gravity: 'southeast',
                        blend: 'over',
                    }
                ]);
            }
            catch (error) {
                console.warn('Failed to load watermark image:', error);
            }
        }
        else {
            console.warn('Watermark image not found at:', watermarkPath);
        }
        const processedBuffer = await pipeline.toBuffer();
        return {
            filename: newFilename,
            buffer: processedBuffer
        };
    }
    catch (error) {
        console.error('CRITICAL ERROR processing image:', error);
        // Fallback: return original buffer and name
        // Use a safe filename
        const safeName = `${Date.now()}-${path.basename(originalName).replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        return {
            filename: safeName,
            buffer
        };
    }
};
