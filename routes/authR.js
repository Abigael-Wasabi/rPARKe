const express = require('express');
const router = express.Router();
const { signUp, login, logout, editProfile, getUserProfile} = require('../controllers/authC');
const { passwordReset, updatePassword } = require('../controllers/fpC');
const { authenticateToken } = require('../middlewares/authM');
const authcontroller = require("../controllers/authC")

router.post('/signup', authcontroller.signUp);
router.post('/login', authcontroller.login);
router.post('/passwordreset', passwordReset);
router.post('/updatepassword', updatePassword);

 
//pr req auth
router.put('/editProfile', authenticateToken, async (req, res) => {
    try{
        await editProfile(req, res);
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'server error'});
    }
});

router.get('/profile', authenticateToken, getUserProfile);

router.delete('/logout', async (req, res) => {
    try{
        await logout(req, res);
    }catch (error){
        console.log(error);
        res.status(500).json({message:'server error'});
    } 
});

module.exports = router;