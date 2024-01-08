import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import carRoutes from './routes/carRoutes.js';
import userRoutes from './routes/userRoutes.js';
const port = 5900;
const app = express();

dotenv.config();
connectDB();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/car', carRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
   res.send('car-rental server');
});
app.listen(port, () => {
   console.log('Server is running ...');
});
