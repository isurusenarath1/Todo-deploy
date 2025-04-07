import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Log environment variables for debugging (don't include sensitive info in production!)
console.log('Backend starting with:');
console.log('PORT:', PORT);
console.log('FRONTEND_URL:', process.env.FRONTEND_URL || 'Not set');

// CORS configuration - temporarily allow all origins for debugging
app.use(cors({
  origin: '*', // Allow all origins temporarily for debugging
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// JSON middleware
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Todo API is running...');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  }); 