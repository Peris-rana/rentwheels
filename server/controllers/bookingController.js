import bookingModel from "../models/bookingModel.js";
import carModel from "../models/carModel.js";
import { addBookingToQueue } from "../services/bookingScheduler.js";
//add a new booking
export const addBookingController = async (req, res) => {
  try {
    const isCarBooked = await bookingModel.exists({ car: req.body.car });
    if (isCarBooked) {
      console.log("Requested car is already booked");
      return res.json("Requested car is already booked");
    }
    const booking = await bookingModel.create(req.body);
    await addBookingToQueue(booking);
    res.status(200).json({
      message: "Booking request received. Processing...",
    });
  } catch (error) {
    console.log(error);
  }
};

// get all bookings
export const getBookingController = async (req, res) => {
  try {
    const booking = await bookingModel.find().populate("user").populate("car");
    res.status(200).json({
      booking,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// delete a booking
export const deleteBookingController = async (req, res) => {
  const bookingId = req.params.bookingId;
  try {
    const booking = await bookingModel.findByIdAndDelete(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    const carId = booking.car;
    await carModel.findByIdAndUpdate(carId, { available: true });
    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
