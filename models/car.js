// const { DataTypes, Sequelize } = require('sequelize');
// const { sequelize } = require('../config/db'); // Imported Sequelize instance

// const Car = sequelize.define('Car', {
//   carID: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   arrivalTime: {
//     type: DataTypes.DATE,
//     allowNull: false,
//   },
//   departureTime: {
//     type: DataTypes.DATE,
//   },
//   carType: {
//     type: DataTypes.STRING,
//   },
//   numberOfVehicles: {
//     type: DataTypes.INTEGER,
//   },
//   registrationNumber: {
//     type: DataTypes.STRING,
//   },
// });

// module.exports = Car;






const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Car = sequelize.define('car',{
    carID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    arrivalTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    departureTime: {
      type: DataTypes.DATE,
    },
    carType: {
      type: DataTypes.STRING,
    },
    numberOfVehicles: {
      type: DataTypes.INTEGER,
    },
    registrationNumber: {
      type: DataTypes.STRING,
    },
  });

  return Car;
}; 