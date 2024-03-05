import bookingModel from "../models/bookingModel.js";
import carModel from "../models/carModel.js";
import notificationModel from "../models/notificationModel.js";
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
  const bookingId = req.body.bookingId;
  try {
    const booking = await bookingModel.findByIdAndDelete(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    const carId = booking.car;
    await carModel.findByIdAndUpdate(carId, { available: true });
    await notificationModel.deleteMany({ booking: bookingId });

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const acceptBookingController = async (req, res) => {
  const bookingId = req.body.bookingId;
  const userId = req.body.userId;
  // update booking table column booked to true
  try {
    const booking = await bookingModel.findByIdAndUpdate(bookingId, {
      booked: true,
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // add to notification collection, userid, message and booking id
    const notification = await notificationModel.create({
      user: userId,
      message: "Booking accepted",
      booking: bookingId,
    });

    res.status(200).json({
      success: true,
      message: "Booking accepted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const notificationController = async (req, res) => {
  try {
    const notifications = await notificationModel
      .find({
        user: req.user.id,
      })
      .populate("user")
      .populate({
        path: "booking",
        populate: {
          path: "car",
          model: "Car",
        },
      })
      .exec();
    return res.status(200).json({
      notifications,
    });
  } catch (error) {}
};

// cancel booking request

export const cancelRequestController = async (req, res) => {
  const bookingId = req.body.bookingId;
  try {
    const booking = await bookingModel.findByIdAndUpdate(
      bookingId,
      {
        booked: false,
        updatedAt: new Date(),
      },
      {
        new: true,
      }
    );
    if (!booking) {
      return res.status(404).json({ message: "booking not available" });
    }
    await notificationModel.deleteMany({ booking: bookingId });

    res.status(200).json({
      success: true,
      messaage: "Cancellation successful",
      booking: booking,
    });
  } catch (error) {
    console.log(error);
  }
};
