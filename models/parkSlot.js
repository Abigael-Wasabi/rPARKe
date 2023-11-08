const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const ParkingSlot = sequelize.define('ParkingSlot', {
  parkingSlotID: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  parkingSlotNumber: {
    type: Sequelize.DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
    validate: {
      min: 1,
      max: 30
    }
  },
  parkingSlotStatus: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    defaultValue: 'vacant',
    validate: {
      isIn: [['vacant', 'active', 'booked']],
    },
  }
});


// Synchronize the model with the database
sequelize.sync().then(async () => { 
  const existingSlotsCount = await ParkingSlot.count();
  if (existingSlotsCount === 0) {
    for (let i = 1; i <= 30; i++) {
      await ParkingSlot.findOrCreate({
        where: { parkingSlotNumber: i },
        defaults: {
          parkingSlotNumber: i,
          parkingSlotStatus: 'vacant',
        }
      });
    }
  }
});

// Synchronize the model with the database
sequelize.sync();

module.exports = ParkingSlot;

//!fk force