import express from 'express';
import multer from 'multer';
import path from 'path';
import { createProperty, getProperties, getPropertyById, updateProperty, deleteProperty } from '../controllers/propertyController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.post('/', verifyToken, upload.array('images', 12), createProperty);
router.put('/:id', verifyToken, upload.array('images', 12), updateProperty);
router.delete('/:id', verifyToken, deleteProperty);

export default router;
