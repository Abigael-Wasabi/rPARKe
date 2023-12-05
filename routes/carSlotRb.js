const { Router } = require ('express');
const router = Router();
const { enterBookingDetails, allocateRandomSlot, cancelReservation, checkAvailableSlots } = require('../controllers/carCb');

//routes
router.post('/enterBookingDetails', enterBookingDetails);//!working both FnB

router.get('/allocateRandomSlot', allocateRandomSlot);//!working both FnB


router.get('/checkAvailableSlots', checkAvailableSlots);//!working both FnB


router.post('/cancelReservation', async (req, res) => {
    try{
        const {carID} = req.body;
        await cancelReservation(req, res, carID);
    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error.' });}
});//!working

module.exports = router; 