import express from 'express';
import upload from '../config/multer';
import { deleteFile, uploadFile } from '../controllers/fileUploadController';

const router = express.Router();

router.post('/', upload.single('imagen'), uploadFile);
router.delete('/delete/:secure_url', deleteFile);

export default router;
