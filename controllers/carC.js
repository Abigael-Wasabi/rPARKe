const { findOne, findById, countDocuments } = require('../models/parkSlot'); 
const { create, findById: _findById } = require('../models/car');
const { createToken, postStk } = require('./mpesaC');

const HttpError = require('http-errors');
const sequelize = require('../config/db');

const parkingSlot = require ('../models/parkSlot');
const Car = require ('../models/car');

const calcParkingFee = (arrivalTime, departureTime) => {
  const arrivalHour = parseInt(arrivalTime.split(':')[0]);
  const departureHour = parseInt(departureTime.split(':')[0]);
  const parkingHours = departureHour - arrivalHour;

  if (parkingHours >= 1 && parkingHours <= 3) {
    return 200;
  } else if (parkingHours <= 5) {
    return 400;
  } else if (parkingHours <= 7) {
    return 600;
  } else if (parkingHours <= 9) {
    return 800;
  } else if (parkingHours <= 11) {
    return 1000;
  } else if (parkingHours <= 13) {
    return 1200;
  } else if (parkingHours <= 15) {
    return 1400;
  } else if (parkingHours <= 17) {
    return 1600;
  } else if (parkingHours <= 18) {
    return 1800;
  } else {
    return 0;
  }
};

const enterParkingDetails = async (req, res) => {
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

    availableSlot.parkingSlotStatus = 'active';
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

    availableSlot.parkingSlotStatus = 'active'; // or 'booked'
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

module.exports = { enterParkingDetails, allocateRandomSlot, cancelReservation, checkAvailableSlots, calcParkingFee };




 //!! reminder 15 minutes before arrival time

//!!status to b for a parkSlot No