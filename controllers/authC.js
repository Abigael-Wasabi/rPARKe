const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users=require('../models/user');


const signUp = async (req, res,next) => {
  try {
    const { firstname, lastname,email, password, confirmPassword } = req.body;

    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All details must be filled.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const existingUser = await users.findOne({ where: { email:email } });

    if (existingUser) {
      return res.status(400).json({ message: `User with email ${email} already exists.`});
    }

    //!the password salt should be 10 when 20 it will take a long time to hash the password */
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await users.create({ 
       firstname:firstname,
       lastname:lastname, 
       email:email, 
       password: hashedPassword 
      });


    res.status(201).json({ message: 'User registration successful.', User:newUser });
  } catch (error) {
    console.error('Error registering user: ', error);
    res.status(500).json({ message: 'Server error.' });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await users.findOne({ where :{email : email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
   
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 
const generateToken = (user) => {
  const payload = { userId: user.userID };
  console.log(payload);
  console.log(user);
  const options = { expiresIn: '1h' };
  const secretKey = 'emergency-kit';
  const token = jwt.sign(payload, secretKey, options);
  console.log('Generated Token:', token); 
  return jwt.sign(payload, secretKey, options);
};


const editProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // Extract user ID from the token
    const { firstname, lastname, email, password, session } = req.body;

    // Validate and update user details in the database
    // Your validation and update logic here...

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error editing profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // Extract user ID from the token

    // Fetch user details from the database using the user ID
    // Your database query logic here...

    res.status(200).json({ user: userData }); // Send user details as a response
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Error logging out user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signUp, login, logout, generateToken, editProfile, getUserProfile };