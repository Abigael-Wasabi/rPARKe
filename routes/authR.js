const express = require('express');
const router = express.Router();
const { signUp, login, logout, editProfile, getUserProfile} = require('../controllers/authC');
const { authenticateToken } = require('../middlewares/authM');


router.post('/signup', signUp);//!working both FnB


router.post('/login', login);//!working both FnB

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