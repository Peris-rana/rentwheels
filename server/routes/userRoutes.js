import express from 'express';
import multer from 'multer';
import { registerUserController } from '../controllers/userController.js';
const uploadMiddleware = multer({ dest: './uploads/license' });
const router = express.Router();
router.post('/register-user', uploadMiddleware.single('file'), registerUserController);
export default router;
