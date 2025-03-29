import express from 'express';
import { getUploadForm, uploadFile, handleUploadError } from '../controllers/uploadController';
import { upload } from '../middlewares/multerMiddleware'; // Ahora importamos desde `middlewares/`

const router = express.Router();

router.get('/upload', getUploadForm);
router.post('/uploads', upload.single('image'), uploadFile, handleUploadError);

export default router;
