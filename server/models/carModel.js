import mongoose from "mongoose";
const carSchema = mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    rentalPrice: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const carModel = mongoose.model("Car", carSchema);
export default carModel;
