import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
   {
      fullName: {
         type: String,
         require: true,
      },
      email: {
         type: String,
         require: true,
      },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      car: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Car',
         required: true,
      },
      fromLocation: { type: String, required: true },
      toLocation: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      rentalPrice: { type: Number, required: true },
   },
   { timestamps: true }
);

const bookingModel = mongoose.model('Booking', bookingSchema);

export default bookingModel;
