const Sequelize= require('sequelize');
const Connection= require ('../config/db');  // Imported Sequelize instance

const Car = Connection.define('Car', {
  carID: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  arrivalTime: {
    type: Sequelize.DataTypes.DATE,
    allowNull: false,
  },
  departureTime: {
    type: Sequelize.DataTypes.DATE,
  },
  carType: {
    type: Sequelize.DataTypes.STRING,
  },
  numberOfVehicles: {
    type: Sequelize.DataTypes.INTEGER,
  },
  registrationNumber: {
    type: Sequelize.DataTypes.STRING,
  },
});

module.exports = Car;






// const { DataTypes } = require('sequelize');

// module.exports = (sequelize, Sequelize) => {
//   const Car = sequelize.define('car',{
//     carID: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     arrivalTime: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     departureTime: {
//       type: DataTypes.DATE,
//     },
//     carType: {
//       type: DataTypes.STRING,
//     },
//     numberOfVehicles: {
//       type: DataTypes.INTEGER,
//     },
//     registrationNumber: {
//       type: DataTypes.STRING,
//     },
//   });

//   return Car;
// }; 