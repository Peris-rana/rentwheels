import bookingModel from "../models/bookingModel.js";
import carModel from "../models/carModel.js";

let bookingQueue = [];

const processBookingQueue = async () => {
  if (bookingQueue.length > 0) {
    const booking = bookingQueue[0];
    try {
      const createdBooking = await bookingModel.create(booking);
      const carId = createdBooking.car;
      await carModel.findByIdAndUpdate(carId, { available: false });
      console.log("Booking processed:", createdBooking);
      bookingQueue.shift();
      processBookingQueue();
    } catch (error) {
      console.log("Error processing booking:", error);
    }
  }
};

const addBookingToQueue = async (booking) => {
  bookingQueue.push(booking);
  processBookingQueue();
};

export { addBookingToQueue };
