import express from 'express';
import { addBooking } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/add-booking', addBooking);
export default router;
