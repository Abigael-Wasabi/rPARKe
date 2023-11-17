const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

// router.get('/dashboard', adminController.getDashboardData);
router.get('/dashboard', adminController);


module.exports = router;