import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './Route/productRoute.js'; // We will use this for products

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/products', productRouter);

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL as string;

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB: zod');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));