import express from 'express';
import multer from 'multer';
import {
   deleteUserController,
   getUserController,
   loginUserController,
   registerUserController,
} from '../controllers/userController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';
const uploadMiddleware = multer({ dest: './uploads/license' });
const router = express.Router();
router.post(
   '/register-user',
   uploadMiddleware.single('file'),
   registerUserController
);
router.post('/login-user', loginUserController);
router.get('/get-user', getUserController);
router.delete('/delete-user', deleteUserController);
router.get('/test', requireSignIn, (req, res) => {
   res.send('protected route');
});

export default router;
