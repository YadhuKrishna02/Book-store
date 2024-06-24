import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bookRoutes from './routes/bookRoutes';
import authRoutes from './routes/authRoutes';
import cors from 'cors';

import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
mongoose
  .connect(process.env.MONGODB_URI!, {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/rest/api/auth', authRoutes);
app.use('/rest/api/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
