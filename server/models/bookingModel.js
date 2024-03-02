import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    fromLocation: { type: String, required: true },
    toLocation: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    booked: { type: Boolean, default: false },
    pickUpTime: { type: String, required: true },
    dropOffTime: { type: String, required: true },
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("Booking", bookingSchema);

export default bookingModel;
