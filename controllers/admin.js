const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add more admin dashboard API endpoints here

module.exports = router;
