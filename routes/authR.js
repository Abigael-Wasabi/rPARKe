const { Router } = require('express');
const router = Router();
const { signUp, login } = require('../controllers/authC');
const { authenticateToken } = require('../middlewares/authM'); // Imported the middleware

// Registration route (no authentication required) //callback function
router.post('/auth/register', signUp);

// Login route (no authentication required) //callback function
router.post('/login', login);

// Protected route: Example of a route that requires authentication
router.get('/profile', authenticateToken, (req, res) => {
  // Only authenticated users can access this route
  // You can access the authenticated user via req.user
  res.json({ message: 'This is a protected route for user profile.' });
});

// Other routes...

module.exports = router;
