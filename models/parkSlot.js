// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/db'); // Imported Sequelize instance

// const ParkingSlot = sequelize.define('ParkingSlot', {
//   parkingSlotID: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   parkingSlotStatus: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   // Other ParkingSlot fields as needed
// });

// module.exports = ParkingSlot;









const {DataTypes} = require('sequelize');


module.exports = (sequelize, Sequelize)=>{
  const ParkSlot = sequelize.define('parkSlot',{
    parkingSlotID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    parkingSlotStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return ParkSlot;
};