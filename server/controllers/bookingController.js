import bookingModel from "../models/bookingModel.js";
import carModel from "../models/carModel.js";
//add a new booking
export const addBookingController = async (req, res) => {
  try {
    const booking = await bookingModel.create(req.body);
    const carId = booking.car;
    await carModel.findByIdAndUpdate(carId, { available: false });

    res.status(200).json({
      booking: booking,
      message: "Booking successful",
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
