const jwt = require('jsonwebtoken');

// Middleware to authenticate requests using JWT
module.exports = (req, res, next) => {
  // Get the Authorization header from the request
  const authHeader = req.header('Authorization');
  if (!authHeader)
    return res.status(401).json({ message: 'No token provided' }); // Respond if no token is provided

  // Extract the token from the "Bearer <token>" format
  const token = authHeader.split(' ')[1];
  if (!token)
    return res.status(401).json({ message: 'Malformed token' }); // Respond if the token format is invalid

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('Auth error:', err.message); // Log the error for debugging
    res.status(401).json({ message: 'Invalid token' }); // Respond if the token is invalid
  }
};
