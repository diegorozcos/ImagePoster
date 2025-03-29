import express from 'express';
import { getGallery } from '../controllers/galleryController';

const router = express.Router();
router.get('/', getGallery);

export default router;
