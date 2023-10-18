const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db'); // Assuming db.js exports Sequelize instance
const authRoutes = require('./routes/authR');
const carSlotRoutes = require('./routes/carSlotR');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/car', carSlotRoutes);

// Database Connection
db.authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });


  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
