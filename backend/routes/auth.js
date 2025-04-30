const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// @route POST /api/auth/register
// @desc Register a new user
// @access Public
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route POST /api/auth/login
// @desc Authenticate user and return JWT token
// @access Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, name: user.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route GET /api/auth/user
// @desc Get authenticated user's details
// @access Private
router.get('/user', authMiddleware, async (req, res) => {
  try {
    // Fetch user details excluding the password
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route POST /api/auth/favorites
// @desc Add a country code to user's favorites
// @access Private
router.post('/favorites', authMiddleware, async (req, res) => {
  console.log('POST /favorites request body:', req.body);
  console.log('Authenticated user:', req.user);

  const { code } = req.body;

  if (!code) return res.status(400).json({ message: 'Missing country code' });

  try {
    // Find the authenticated user
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Add the country code to favorites if not already present
    if (!user.favorites.includes(code)) {
      user.favorites.push(code);
      await user.save();
    }

    res.json({ favorites: user.favorites });
  } catch (err) {
    console.error('POST /favorites error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route DELETE /api/auth/favorites/:code
// @desc Remove a country code from user's favorites
// @access Private
router.delete('/favorites/:code', authMiddleware, async (req, res) => {
  console.log('DELETE /favorites request body:', req.body);
  console.log('Authenticated user:', req.user);

  const { code } = req.params;

  if (!code) return res.status(400).json({ message: 'Missing country code' });

  try {
    // Find the authenticated user
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Remove the country code from favorites
    user.favorites = user.favorites.filter(fav => fav !== code);
    await user.save();

    res.json({ favorites: user.favorites });
  } catch (err) {
    console.error('DELETE /favorites error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route GET /api/auth/favorites
// @desc Get the list of user's favorite country codes
// @access Private
router.get('/favorites', authMiddleware, async (req, res) => {
  try {
    // Fetch user's favorites
    const user = await User.findById(req.user.userId).select('favorites');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
