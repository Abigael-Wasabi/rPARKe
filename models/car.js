const {Sequelize,DataTypes} = require('sequelize');
const sequelize= require('../config/db');
const User = require('./user');


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

module.exports = Car;