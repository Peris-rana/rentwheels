import bookingModel from "../models/bookingModel.js";
import carModel from "../models/carModel.js";
//add a new booking
export const addBooking = async (req, res) => {
  try {
    const booking = await bookingModel.create(req.body);
    const carId = booking.car;
    await carModel.findByIdAndUpdate(carId, { available: false });

    res.status(200).json({ booking: booking, message: "Booking successful" });
  } catch (error) {
    console.log(error);
  }
};
