// create notificaiton model with id,user id and message and bookingId

import mongoose from "mongoose";
const Schema = mongoose.Schema;

let notificationSchema = new Schema({
  id: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
});

const notificationModel = mongoose.model("Notification", notificationSchema);
export default notificationModel;
