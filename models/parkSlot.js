const Sequelize= require('sequelize');
const Connection= require('../config/db');
const Car=require('./car');

const ParkingSlot = Connection.define('ParkingSlot', {
  parkingSlotID: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  parkingSlotNumber: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
  parkingSlotStatus: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
});

ParkingSlot.belongsTo(Car, {foreignKey:'carID', as: 'carID'});

module.exports = ParkingSlot;