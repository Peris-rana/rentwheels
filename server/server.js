import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import carRoutes from './routes/carRoutes.js';
import userRoutes from './routes/userRoutes.js';
import path from 'path';
const port = 5900;
const __dirname = process.cwd();

const app = express();

dotenv.config();
connectDB();

//middlewares
app.use(cors({ origin: '*' }));
app.use(
   '/uploads/carImages',
   express.static(path.join(__dirname, 'uploads', 'carImages'))
);
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
