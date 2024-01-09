import mongoose from 'mongoose';
const userSchema = mongoose.Schema(
   {
      firstName: {
         type: String,
         required: true,
      },
      lastName: {
         type: String,
         required: true,
      },
      phoneNumber: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      plainPassword: {
         type: String,
      },
      password: {
         type: String,
         required: true,
      },
      licenseFile: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);
const userModel = mongoose.model('User', userSchema);
export default userModel;
