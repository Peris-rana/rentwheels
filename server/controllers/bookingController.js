import { response } from 'express';
import bookingModel from '../models/bookingModel.js';

//add a new booking
export const addBooking = async (req, res) => {
   try {
      const booking = await bookingModel.create(req.body);
      res.status(200).json({ booking: booking, message: 'Booking successful' });
   } catch (error) {
      console.log(error);
   }
};
