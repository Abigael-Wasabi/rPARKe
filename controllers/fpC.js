// passwordResetC.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/user');
const {generateToken} = require('../controllers/authC');
const nodemailer = require('nodemailer');

const passwordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await users.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = generateToken(user);
    //!send reset token to users email
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    sendResetEmail(email, resetLink);

    res.status(200).json({ message: 'Reset email sent successfully' });
  } catch (error) {
    console.error('Error initiating password reset:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const sendResetEmail = (email, resetLink) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'abiwasabi03@gmail.com',
        pass: 'Bcjfkbeojweqwtuz',
      }, 
    });

    const mailOptions = {
        from:  'noreply@swiftpark.com',
        to: email,
        subject: 'Password Reset',
        html: `<p>Click the following link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending password reset email:', error);
        } else {
          console.log('Password reset email sent:', info.response);
        }
      });
    };

const updatePassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    const decoded = jwt.verify(resetToken, 'reset-secret-key');
    const user = await users.findOne({ where: { userID: decoded.userID } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { passwordReset, updatePassword };
