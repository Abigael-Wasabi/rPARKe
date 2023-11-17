const express = require('express');
const router = express.Router();
const { signUp, login, logout, editProfile, getUserProfile} = require('../controllers/authC');
const { authenticateToken } = require('../middlewares/authM'); // Imported the middleware


router.post('/signup', signUp);//!working both FnB


router.post('/login', login);//!working both FnB

//pr req auth
router.put('/editProfile', authenticateToken, editProfile);

router.get('/profile', authenticateToken, getUserProfile);

router.delete('/logout', logout, authenticateToken, (req, res)=>{
    req.session.destroy((err)=>{
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            res.send('Logout successful');
        }
    });
});

module.exports = router;