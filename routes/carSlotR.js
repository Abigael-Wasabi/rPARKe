// const { Router } = require('express');
// const router = Router();
// const { enterParkingDetails, allocateRandomSlot, cancelReservation, checkAvailableSlots } = require('../controllers/carC'); // Imported the car controller

// // Route to enter parking details
// router.post('/enterParkingDetails', enterParkingDetails);

// // Route to allocate a random parking slot
// router.get('/allocateRandomSlot', allocateRandomSlot);

// // Route to cancel a reservation
// router.post('/cancelReservation', cancelReservation);

// // Route to check available slots
// router.get('/checkAvailableSlots', checkAvailableSlots);

// module.exports = router;







const { Router } = require('express');
const router = Router();
const { enterParkingDetails, allocateRandomSlot, cancelReservation, checkAvailableSlots } = require('../controllers/carC');


router.post('/allocateRandomSlot',allocateRandomSlot);


module.exports = router;