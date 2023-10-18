const Sequelize= require('sequelize');
const Connection= require ('../config/db');

const ParkingSlot = Connection.define('ParkingSlot', {
  parkingSlotID: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  parkingSlotStatus: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  // Other ParkingSlot fields as needed
});

module.exports = ParkingSlot;









// const {DataTypes} = require('sequelize');


// module.exports = (sequelize, Sequelize)=>{
//   const ParkSlot = sequelize.define('parkSlot',{
//     parkingSlotID: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     parkingSlotStatus: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   });

//   return ParkSlot;
// };