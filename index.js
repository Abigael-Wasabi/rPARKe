const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db'); // db.js exports Sequelize instance
const authRoutes = require('./routes/authR');
const carSlotRoutes = require('./routes/carSlotR');
const sequlize = require('./config/db');

//** model imports */
//!! import your models below this line after defining them 

require('./models/car');
require('./models/parkSlot');
require('./models/user');


// //* joins 
// require('./models/parkSlot').hasOne(require('./models/user'));
// require('./models/user').belongsTo(require('./models/parkSlot'));

// require('./models/car').hasOne(require('./models/parkSlot'));
// require('./models/parkSlot').belongsTo(require('./models/car'));

// require('./models/user').hasOne(require('./models/car'));
// require('./models/car').belongsTo(require('./models/user'));


// require('./models/parkSlot').hasOne(require('./models/user'));
// require('./models/user').belongsTo(ParkingSlot, { foreignKey: 'parkingSlotID' });

// require('./models/car').hasOne(require('./models/parkSlot'));
// require('./models/parkSlot').belongsTo(Car, { foreignKey: 'carID' });

// require('./models/user').hasOne(require('./models/car'));
// require('./models/car').belongsTo(User, { foreignKey: 'userID' });



//**sync db */
//!! used to sync the DB after changes it is the same as laravel seeders
sequlize.sync({alert:true});

dotenv.config();

const app = express();

// Middleware
const allowedOrigins=["http://localhost:3000"];
app.use(cors(
  {
    origin:(origin,callback)=>{
      if(!origin||allowedOrigins.includes(origin)){
        callback(null,true);
      }
      else{
        callback(new error('not allowed by cors'));
      }
    }
  }
));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/car', carSlotRoutes);

// Database Connection
db.authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });


//**check for errors in the path */
app.use((req,res,next)=>{
  const err = new Error("NOT FOUND");
  err.status=404;
  next(err);
})
app.use((err,req,res,next)=>{
  res.status(err.status||500);
  res.send({
      error:{
          status:err.status ||500,
          Message:err.Message
      }
  })
})

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });