const { verify } = require('jsonwebtoken');
const secretKey = 'emergency-kit'; //secret key

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    console.log('Decoded Token:', user);
    
    req.user = user; // You can access the user object in your routes
    next();
  });
};

module.exports = { authenticateToken };