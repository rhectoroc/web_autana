import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import { initDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ESM fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Create uploads directory if not exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
    console.log(`Creating uploads dir at: ${uploadsDir}`);
    fs.mkdirSync(uploadsDir, { recursive: true });
} else {
    console.log(`Uploads dir exists at: ${uploadsDir}`);
}

// Static files
app.use('/uploads', express.static(uploadsDir));

// Routes
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

// Serve Static Files (React App)
// In production, 'dist' will be in the project root.
// We are in 'dist-server/index.js' (compiled) or 'server/index.ts' (source).
// We should use process.cwd() or relative path.
const clientBuildPath = path.join(process.cwd(), 'dist');

if (fs.existsSync(clientBuildPath)) {
    app.use(express.static(clientBuildPath));

    // Handle React routing, return all requests to React app
    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
} else {
    console.log('Client build not found. API mode only.');
}

// Database Intialization
initDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
