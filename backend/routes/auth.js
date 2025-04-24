const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// @route POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
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
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, name: user.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route GET /api/auth/user
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/favorites
router.post('/favorites', authMiddleware, async (req, res) => {
  console.log(' POST /favorites request body:', req.body);
  console.log(' Authenticated user:', req.user);

  const { code } = req.body;

  if (!code) return res.status(400).json({ message: 'Missing country code' });

  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

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


// DELETE /api/auth/favorites/:code
router.delete('/favorites/:code', authMiddleware, async (req, res) => {

  console.log(' DELETE /favorites request body:', req.body);
  console.log(' Authenticated user:', req.user);

  const { code } = req.params;

  if (!code) return res.status(400).json({ message: 'Missing country code' });

  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.favorites = user.favorites.filter(fav => fav !== code);
    await user.save();

    res.json({ favorites: user.favorites });
  } catch (err) {
    console.error(' DELETE /favorites error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// GET /api/auth/favorites
router.get('/favorites', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('favorites');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
