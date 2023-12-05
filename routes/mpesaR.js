const { Router } = require ('express');
const router = Router();
const {createToken, postStk }= require("../controllers/mpesaC");

router.post('/', createToken, postStk);
module.exports=router;

