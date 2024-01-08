import express from 'express';
import multer from 'multer';
import {
   addCarController,
   getCarController,
   updateCarController,
} from '../controllers/carController.js';
const uploadMiddleware = multer({ dest: './uploads/carImages' });

const router = express.Router();
router.post('/add-car', uploadMiddleware.single('file'), addCarController);
router.get('/get-car', getCarController);
router.put('/update-car', updateCarController);
export default router;
