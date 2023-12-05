const jwt = require('jsonwebtoken');
const secretKey = 'emergency-kit'; //secret key

const authenticateToken = (req, res, next) => {
  const token = req.header.authorization('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), 'emergency-kit');
    req.user = decoded;
    next(); 
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }

  jwt.verify(token, secretKey, (err, user) => { 
    if (err) {
      return res.status(403).json({ message: 'Unauthorized: Invalid token' });
    }

    console.log('Decoded Token:', user);
     
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken }; 






// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized: Token missing' });
//   }

//   jwt.verify(token, 'secretKey', (err, user) => {
//     if (err) {
//       console.error('Token verification error:', err);
//       return res.status(403).json({ message: 'Unauthorized: Invalid token' });
//     }

//     req.user = user;
//     next();
//   });
// };

// module.exports = { authenticateToken };
