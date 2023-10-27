const Sequelize= require('sequelize');
const Connection= require ('../config/db');  // Imported Sequelize instance
const User = require('./user');

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

Car.belongsTo(User, {foreignKey: 'UserID'});

module.exports = Car;