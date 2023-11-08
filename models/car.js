const {Sequelize,DataTypes} = require('sequelize');
const sequelize= require('../config/db');  // Imported Sequelize instance
const User = require('./user');
const ParkingSlot = require('./parkSlot');

const Car = sequelize.define('Car', {
  carID: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  arrivalTime: {
    type: Sequelize.DataTypes.TIME,
    allowNull: false,
  },
  departureTime: {
    type: Sequelize.DataTypes.TIME,
    allowNull: false,
  },
  carType: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  registrationNumber: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  }, 
});

Car.belongsTo(User, {foreignKey:'userID'});
// ParkingSlot.hasOne(Car)

module.exports = Car;