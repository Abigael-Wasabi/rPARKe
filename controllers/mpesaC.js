// require('dotenv').config(); //!! the .env
// const axios = require("axios");


// //!runs as a middleware b4 we get stk push
//     const createToken = async (req, res, next) => {
//       const secret = "RG39qwogoZeUz29O";
//       const consumer = "dWoBrA7okqW5wrDCh8GwB87RtQWGY4wE";//!unique identifier of my app
//       const auth = Buffer.from(`${consumer}:${secret}`).toString("base64");//!raw binary data representation in nodejs
//       await axios
//         .get(
//           "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
//           {
//             headers: {
//               authorization: `Basic ${auth}`,//!auth string used in the headers of my http requests to auth my app with daraja API
//             },
//           }
//         )
//         .then((data) => {
//           token = data.data.access_token;
//           console.log(data.data);
//           next();
//         })
//         .catch((err) => {
//           console.log(err);
//           res.status(400).json(err.message);
//         });
//     };

// const postStk = async (req, res) => {
//   const shortCode = 4119567;
//   const phone = req.body.phone.substring(1);
//   const amount = req.body.amount;
//   const passkey ="5c973b3b8967d889259776b058248347962926aea0943773301f482cb35db058";
//   const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
//   const date = new Date();
//   const timestamp =
//     date.getFullYear() +
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

// const calculateParkingFee = async (req, res) => {
//   try {
//     const hoursParked = req.body.hoursParked;

//     let parkingFee = 0;
//     if (hoursParked >= 1 && hoursParked <= 3) {
//       parkingFee = 200;
//     } else if (hoursParked <= 5) {
//       parkingFee = 400;
//     } else if (hoursParked <= 7) {
//       parkingFee = 600;
//     } else if (hoursParked <= 9) {
//       parkingFee = 800;
//     } else if (hoursParked <= 11) {
//       parkingFee = 1000;
//     } else if (hoursParked <= 13) {
//       parkingFee = 1200;
//     } else if (hoursParked <= 15) {
//       parkingFee = 1400;
//     } else if (hoursParked <= 17) {
//       parkingFee = 1600;
//     } else if (hoursParked <= 18) { 
//       parkingFee = 1800;
//     }

//     res.status(200).json({ parkingFee });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error calculating parking fee.' });
//   }
// };

// module.exports = { createToken, postStk, calculateParkingFee };



















require('dotenv').config(); //!! the .env
const axios = require("axios");


//!runs as a middleware b4 we get stk push
    const createToken = async (req, res, next) => {
      const secret = "RG39qwogoZeUz29O";
      const consumer = "dWoBrA7okqW5wrDCh8GwB87RtQWGY4wE";
      const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");
      await axios
        .get(
          "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
          {
            headers: {
              authorization: `Basic ${auth}`,
            },
          }
        )
        .then((data) => {
          token = data.data.access_token;
          console.log(data.data);
          next();
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err.message);
        });
    };

const postStk = async (req, res) => {
  const shortCode = 4119567;
  const phone = req.body.phone.substring(1);
  const amount = req.body.amount;
  const passkey =
    "5c973b3b8967d889259776b058248347962926aea0943773301f482cb35db058";
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);
  const password = new Buffer.from(shortCode + passkey + timestamp).toString(
    "base64"
  );
  const data = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: 1000,
    PartyA: `254${phone}`,
    PartyB: shortCode,
    PhoneNumber: `254${phone}`,
    CallBackURL: "http://ambyachievers.org/path",
    AccountReference: "Mpesa",
    TransactionDesc: "stk push",
  };

  await axios
    .post(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((data) => {
      console.log(data);
      res.status(200).json(data.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
};

const calculateParkingFee = async (req, res) => { 
  try {
    const hoursParked = req.body.hoursParked;

    let parkingFee = 0;
    if (hoursParked >= 1 && hoursParked <= 3) {
      parkingFee = 200;
    } else if (hoursParked <= 5) {
      parkingFee = 400;
    } else if (hoursParked <= 7) {
      parkingFee = 600;
    } else if (hoursParked <= 9) {
      parkingFee = 800;
    } else if (hoursParked <= 11) {
      parkingFee = 1000;
    } else if (hoursParked <= 13) {
      parkingFee = 1200;
    } else if (hoursParked <= 15) {
      parkingFee = 1400;
    } else if (hoursParked <= 17) {
      parkingFee = 1600;
    } else if (hoursParked <= 18) {
      parkingFee = 1800;
    }

    res.status(200).json({ parkingFee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error calculating parking fee.' });
  }
};

module.exports = { createToken, postStk, calculateParkingFee };