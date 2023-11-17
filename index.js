const express = require('express');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db'); // db.js exports Sequelize instance
const authRoutes = require('./routes/authR');
const carSlotRoutes = require('./routes/carSlotR');
const mpesaRoutes = require('./routes/mpesaR');
const adminRoutes = require('./routes/admin');

require('./models/car');
require('./models/parkSlot');
require('./models/user'); 


//sync the DB after changes/eq=laravel seeders
db.sync({alert:true});

dotenv.config();

const app = express(); 

const oneHour = 1000 * 60 * 60; 
app.use(session({
  secret: 'secretSession123',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: oneHour },
}));


// Middleware
const allowedOrigins = ["http://localhost:3000"]; 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ 
    origin: (origin, callback) => { 
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        const error = new Error('Not allowed by cors'); 
        console.error(error.message);
        callback(error);} } }
));
app.use(cookieParser());



// Routes
app.use('/user', authRoutes);
app.use('/car', carSlotRoutes);
app.use('/mpesa',mpesaRoutes);
app.use('/admin',adminRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the server! Swift Slot Allocation, Seamless Mobile Payments',
  {token:'test123'});
});

// Database Connection
db.authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });


//**check for errors in the path */
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err,req,res,next)=>{
  res.status(err.status || 500);
  res.send({
      error:{
          status:err.status || 500,
          Message:err.Message
      }
  })
})

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });


  // Synchronize Sequelize models with the database
  db.sync().then(() => {
    console.log('Sequelize models synchronized with the database.');
  });