const { Router } = require ('express');
const router = Router();
const { enterParkingDetails, allocateRandomSlot, cancelReservation, checkAvailableSlots } = require('../controllers/carC'); // Imported the car controller

// Route to enter parking details 
router.post('/enterParkingDetails', enterParkingDetails);//!working both FnB

// Route to allocate a random parking slot
router.get('/allocateRandomSlot', allocateRandomSlot);//!working !!!!

// Route to check available slots
router.get('/checkAvailableSlots', checkAvailableSlots);//!working 

// Route to cancel a reservation
router.post('/cancelReservation', cancelReservation);//!working

module.exports = router; 