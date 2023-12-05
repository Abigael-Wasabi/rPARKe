const { findOne, findById, countDocuments } = require('../models/parkSlot'); 
const { create, findById: _findById } = require('../models/car');
const { createToken, postStk } = require('./mpesaC');

const HttpError = require('http-errors');
const sequelize = require('../config/db');

const parkingSlot = require ('../models/parkSlot');
const Car = require ('../models/car');

const calcParkingFee = (arrivalTime, departureTime) => {
  const arrivalHour = parseInt(arrivalTime.split(':')[0]);//!takes time str splits using colon ,convts to int n acces elmt at pos 0
  const departureHour = parseInt(departureTime.split(':')[0]);
  const parkingHours = departureHour - arrivalHour;

  if (parkingHours >= 1 && parkingHours <= 3) {
    return 50;
  } else if (parkingHours <= 5) {
    return 100;
  } else if (parkingHours <= 7) {
    return 200;
  } else if (parkingHours <= 9) {
    return 300; 
  } else if (parkingHours <= 11) {
    return 400;
  } else if (parkingHours <= 13) {
    return 500;
  } else if (parkingHours <= 15) {
    return 600;
  } else if (parkingHours <= 17) {
    return 700;
  } else if (parkingHours <= 18) { 
    return 800;
  } else {
    return 0;
  }
};

const enterBookingDetails = async (req, res) => {
  try {
    const {arrivalTime,departureTime,carType,registrationNumber} = req.body;

    if (!arrivalTime || !departureTime || !carType || !registrationNumber) {
      return res.status(400).json({ message: 'All details must be filled.' });
    }
    const availableSlot = await parkingSlot.findOne({ where:{parkingSlotStatus:'vacant'}});

 
    if (!availableSlot) {
      return res.status(400).json({ message: 'No available parking slot' });
    }

    const car = await Car.create({
      arrivalTime,
      departureTime,
      carType,
      registrationNumber,
      parkingSlotID: availableSlot.parkingSlotID,
      });

    availableSlot.parkingSlotStatus = 'booked';
    await availableSlot.save();

    const parkingFee = calcParkingFee(arrivalTime, departureTime);


    res.status(201).json({ message: 'Parking details entered successfully.', car, parkingFee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const allocateRandomSlot = async (req, res) => {
  try {
    const { carType } = req.query;

    let minSlot, maxSlot;
    if (carType === '2 wheeler') {
      minSlot = 21;
      maxSlot = 30;
    } else if (carType === '4 wheeler') {
      minSlot = 11; 
      maxSlot = 20;
    } else if (carType === '4+ wheeler') {
      minSlot = 1;
      maxSlot = 10;
    } else { 
      return res.status(400).json({ message: 'Invalid car type.' });
    }

    const randomSlotNumber = Math.floor(Math.random() * (maxSlot - minSlot + 1)) + minSlot;
  
    const availableSlot = await parkingSlot.findOne({
      where: { parkingSlotNumber: randomSlotNumber, parkingSlotStatus: 'vacant' }
    });

    if (!availableSlot) {
      return res.status(400).json({ message: 'No available parking slot.' });
    }

    availableSlot.parkingSlotStatus = 'booked';
    await availableSlot.save();

    console.log('Parking slot allocated successfully.');

    res.status(200).json({ message: 'Parking slot allocated successfully.', parkingSlot: availableSlot });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};



const cancelReservation = async (req, res) => {
  try {
    const { carID } = req.body;
    const car = await _findById(carID);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    const slot = await findById(car.parkingSlotID);
    if (slot) {
      slot.parkingSlotStatus = 'vacant';
      await slot.save();
    }
    await car.remove();
    res.status(200).json({ message: 'Reservation cancelled successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};


const checkAvailableSlots = async (req, res) => {
  try {
    const availableSlotsCount = await parkingSlot.count({where: {parkingSlotStatus:'vacant'}});

    res.status(200).json({ message: 'Available parking slots count:', availableSlotsCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { enterBookingDetails, allocateRandomSlot, cancelReservation, checkAvailableSlots, calcParkingFee };




 //!! reminder 15 minutes before arrival time

//!!status to b for a parkSlot No



















// require('dotenv').config(); //!! the .env
// const axios = require("axios");


// //!runs as a middleware b4 we get stk push
//     const createToken = async (req, res, next) => {
//       const secret = "RG39qwogoZeUz29O";
//       const consumer = "dWoBrA7okqW5wrDCh8GwB87RtQWGY4wE";//!unique identifier of my app
//       const auth = Buffer.from(`${consumer}:${secret}`).toString("base64");//!raw binary data representation in nodejs
//       await axios
//         .get(
//           "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",//!its the daraja API endpoint used to generate access tokens
//           {
//             headers: {
//               authorization: `Basic ${auth}`,//!auth string used in the headers of my http requests to auth my app with daraja API
//             },
//           } 
//         )
//         .then((data) => {
//           token = data.data.access_token;//!after sucs http req generate token
//           console.log(data.data);//!log data on console
//           next();//!proceed to next midlw
//         })
//         .catch((err) => {
//           console.log(err);
//           res.status(400).json(err.message);
//         });
//     };
// //!neces params
// const postStk = async (req, res) => {
//   const shortCode = 4119567;
//   const phone = req.body.phone.substring(1);
//   const amount = req.body.amount;
//   const passkey ="5c973b3b8967d889259776b058248347962926aea0943773301f482cb35db058";
//   const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
//   const date = new Date();
//   const timestamp = date.getFullYear() +
//     ("0" + (date.getMonth() + 1)).slice(-2) +
//     ("0" + date.getDate()).slice(-2) +
//     ("0" + date.getHours()).slice(-2) +
//     ("0" + date.getMinutes()).slice(-2) +
//     ("0" + date.getSeconds()).slice(-2);
//   const password = new Buffer.from(shortCode + passkey + timestamp).toString(
//     "base64"
//   );
//   const data = {
//     BusinessShortCode: shortCode,
//     Password: password,
//     Timestamp: timestamp,
//     TransactionType: "CustomerPayBillOnline",
//     Amount: 1000,
//     PartyA: `254${phone}`,
//     PartyB: shortCode,
//     PhoneNumber: `254${phone}`,
//     CallBackURL: "http://ambyachievers.org/path",
//     AccountReference: "Mpesa",
//     TransactionDesc: "stk push",
//   };

//   await axios
//     .post(url, data, {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     })
//     .then((data) => {
//       console.log(data);
//       res.status(200).json(data.data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err.message);
//     });
// };

// module.exports = { createToken, postStk };