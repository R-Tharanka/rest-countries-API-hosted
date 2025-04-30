// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import authentication routes
const authRoutes = require('./routes/auth');

// Initialize Express app
const app = express();

// Enable CORS for cross-origin requests
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Set up authentication routes
app.use('/api/auth', authRoutes);

// Define the server port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI) // MongoDB connection string from environment variables
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start the server
  })
  .catch((err) => console.error('MongoDB connection error:', err)); // Handle connection errors
