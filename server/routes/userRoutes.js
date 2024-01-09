import express from 'express';
import multer from 'multer';
import {
   loginUserController,
   registerUserController,
} from '../controllers/userController.js';
const uploadMiddleware = multer({ dest: './uploads/license' });
const router = express.Router();
router.post(
   '/register-user',
   uploadMiddleware.single('file'),
   registerUserController
);
router.post('/login-user', loginUserController);
export default router;
