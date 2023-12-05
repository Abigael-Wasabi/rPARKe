const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users=require('../models/user');
const secretKey = 'emergency-kit';


const authController = {
  signUp : async (req, res,next) => { 
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
  },

  login : async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await users.findOne({ where :{email : email } });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
     console.log("wertyuio,l;rvtyu",password)
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
  
      const token = jwt.sign( {
        userID: user.userID,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password}, secretKey,{ expiresIn: '1h' });
      
        if(!token) {
          return res.status(500).json({message:"Token generation failed"})
        }
  
        const userData = {
          token: token
        };
  
        res.cookie('userData', JSON.stringify(userData), {httpOnly: true} );
        return res.json(userData);
     
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  editProfile :async (req, res) => {
    try { 
      const userID = req.user.userID;
      const { firstname, lastname, email, password} = req.body;
  
      const user = await users.findOne({ where: { userID } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (firstname) user.firstname = firstname;
      if (lastname) user.lastname = lastname;
      if (email) user.email = email;
  
      if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        user.password = hashedPassword;
      }
      await user.save();
  //!
      const updatedUser = await users.findOne({ where: { userID } });
      res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error editing profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  getUserProfile :async (req, res) => {
    try {
      const userID = req.user.userId;

      res.status(200).json({ user: userData }); // Send user details as a response
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  logout : async (req, res) => {
    try {
      req.session.destroy();
      res.json({ message: 'User logged out successfully' });
    } catch (error) {
      console.error('Error logging out user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
}



module.exports = authController;