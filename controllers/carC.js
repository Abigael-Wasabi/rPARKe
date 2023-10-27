// const { findOne, findById, countDocuments } = require('../models/parkSlot');
// const { create, findById: _findById } = require('../models/car');
const parkingSlot = require ('../models/parkSlot');
const HttpError = require('http-errors');


// Function to enter parking details
const enterParkingDetails = async (req, res) => {
  try {
    // Get data from the request body
    const {arrivalTime,departureTime,carType,registrationNumber} = req.body;

    // Check if all details are filled
    if (!arrivalTime || !departureTime || !carType || !registrationNumber) {
      return res.status(400).json({ message: 'All details must be filled.' });
    }

    // Check if a parking slot is available
    const availableSlot = await findOne({ parkingSlotStatus: 'available' });

    if (!availableSlot) {
      return res.status(400).json({ message: 'No available parking slot.' });
    }

    // Create a new car entry
    const car = await create({arrivalTime,departureTime,carType,registrationNumber,
      parkingSlotID: availableSlot.parkingSlotID,
    });

    // Update the parking slot status to 'active'
    availableSlot.parkingSlotStatus = 'active';
    await availableSlot.save();

    // Set a reminder for 15 minutes before arrival time (You would need to implement this separately)

    res.status(201).json({ message: 'Parking details entered successfully.', car });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Function to allocate a random parking slot
const allocateRandomSlot = async (req, res) => {
  try {
    // Check if a parking slot is available
    const availableSlot = await findOne({ parkingSlotStatus: 'available' });

    if (!availableSlot) {
      return res.status(400).json({ message: 'No available parking slot.' });
    }

    res.status(200).json({ message: 'Parking slot allocated successfully.', parkingSlot: availableSlot });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Function to cancel reservation (assuming you have a car cancellation mechanism)
const cancelReservation = async (req, res) => {
  try {
    const { carID } = req.body;

    // Find the car by ID
    const car = await _findById(carID);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Release the parking slot (update status to 'available')
    const slot = await findById(car.parkingSlotID);
    if (slot) {
      slot.parkingSlotStatus = 'vacant';
      await slot.save();
    }

    // Delete the car entry
    await car.remove();

    res.status(200).json({ message: 'Reservation canceled successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Function to check available slots
const checkAvailableSlots = async (req, res) => {
  try {
    // Count the number of available parking slots
    const availableSlotsCount = await parkingSlot.count({where: {parkingSlotStatus:'vacant'}});

    res.status(200).json({ message: 'Available parking slots count:', availableSlotsCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { enterParkingDetails, allocateRandomSlot, cancelReservation, checkAvailableSlots };
