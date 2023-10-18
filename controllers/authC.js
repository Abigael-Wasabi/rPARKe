const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findOne } = require('../models/user');

// Function to register a new user
const signUp = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Check if all user details are filled
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All details must be filled.' });
    }

    // Check if the password and confirmed password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // Check if the user already exists (assuming unique email)
    const existingUser = await findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 20); // You can adjust the salt rounds as needed

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword }); // Assuming User is your model
    await newUser.save();

    res.status(201).json({ message: 'User registration successful.', User });
  } catch (error) {
    console.error('Error registering user: ', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Function to login a user
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    // Find user based on email or username
    const user = await findOne({ $or: [{ email: identifier }, { username: identifier }] });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare hashed password if correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Function to generate JWT token for authentication
    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to generate a JWT token (You'll need to implement this function)
const generateToken = (user) => {
  const payload = { userId: user.id }; // You can include any user-related data you want here

  const options = { expiresIn: '1h' }; // Token expires in 1 hour (adjust as needed)

  const secretKey = 'emergency-kit'; // Replace with your secret key
  return jwt.sign(payload, secretKey, options);
};

module.exports = { signUp, login };
