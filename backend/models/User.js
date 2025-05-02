const mongoose = require('mongoose'); // Import mongoose for MongoDB interaction

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
  name: {
    type: String, // Name must be a string
    required: true, // Name is required
    minlength: 2, // Minimum length of 2 characters
  },
  email: {
    type: String, // Email must be a string
    required: true, // Email is required
    unique: true, // Email must be unique
    lowercase: true, // Email will be stored in lowercase
  },
  password: {
    type: String, // Password must be a string
    required: true, // Password is required
    minlength: 6, // Minimum length of 6 characters
  },
  favorites: {
    type: [String], // Favorites is an array of strings
    default: [], // Default value is an empty array
  },
});

// Export the User model based on the schema
module.exports = mongoose.model('User', UserSchema);
