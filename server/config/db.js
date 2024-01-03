import mongoose from 'mongoose';
const connectDB = async () => {
   try {
      const conn = mongoose.connect(process.env.MONGO_URL);
      console.log('connected to mongodb database');
   } catch (error) {
      console.log('Error in mongodb');
   }
};
export default connectDB;
