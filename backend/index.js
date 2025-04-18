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
console.log('Backend starting on port:', PORT);
console.log('FRONTEND_URL:', process.env.FRONTEND_URL || 'Not set');

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173', // Frontend URL from environment variable
  'http://localhost:3000',                             // Common React development port
  'http://127.0.0.1:5173',                             // Local IP alternative
];

// For Vercel deployment, accept all vercel.app subdomains
if (process.env.VERCEL) {
  allowedOrigins.push('https://*.vercel.app');
}

console.log('Allowed origins for CORS:', allowedOrigins);

// CORS middleware with configured origins
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin is allowed or matches the vercel.app pattern
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin === origin) return true;
      // Handle wildcard for vercel.app domains
      if (allowedOrigin === 'https://*.vercel.app' && origin.endsWith('.vercel.app')) return true;
      return false;
    });
    
    if (isAllowed || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      console.log('CORS blocked request from:', origin);
      callback(null, false); // Just block the request without throwing error
    }
  },
  credentials: true
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