const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users=require('../models/user');

// Function to register a new user
const signUp = async (req, res,next) => {
  try {
    const { firstname, lastname,email, password, confirmPassword } = req.body;

    // Check if all user details are filled
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All details must be filled.' });
    }

    // Check if the password and confirmed password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // Check if the user already exists (assuming unique email)
    const existingUser = await users.findOne({ where: { email:email } });

    if (existingUser) {
      return res.status(400).json({ message: `User with email ${email} already exists.`});
    }

    // Hash the password

    //**the password salt should be 10 when 20 it will take a long time to hash the password */
    //!! Note password salt should be 10 or lower
    const hashedPassword = bcrypt.hashSync(password, 10); // You can adjust the salt rounds as needed

    // Create a new user
    const newUser = await users.create(
      { 
       firstname:firstname,
       lastname:lastname, 
       email:email, 
       password: hashedPassword 
      }
       );

    res.status(201).json({ message: 'User registration successful.', User:newUser });
  } catch (error) {
    console.error('Error registering user: ', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Function to login a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user based on email
    const user = await users.findOne({ where :{email : email } });

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

  const options = { expiresIn: '1h' }; // Token expires in 1 hour

  const secretKey = 'emergency-kit'; // Replace with your secret key
  return jwt.sign(payload, secretKey, options);
};

module.exports = { signUp, login };