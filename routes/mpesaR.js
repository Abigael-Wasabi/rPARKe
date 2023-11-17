const { Router } = require ('express');
const router = Router();
const {createToken, postStk, calculateParkingFee}= require("../controllers/mpesaC");

router.post('/', createToken, postStk);
router.post('/calculateParkingFee', calculateParkingFee);
module.exports=router;

