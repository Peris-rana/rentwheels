import mongoose from 'mongoose';
const carSchema = mongoose.Schema(
   {
      model: {
         type: String,
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
      cover: {
         type: String,
      },
   },
   {
      timestamps: true,
   }
);
const carModel = mongoose.model('Car', carSchema);
export default carModel;
