const Sequelize= require('sequelize');
const sequelize= require ('../config/db'); // Imported Sequelize instance
const ParkingSlot = require('./parkSlot');


const User = sequelize.define('User', {
  userID: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstname: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  lastname: { 
    type:Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type:Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
});

User.belongsTo(ParkingSlot,{foreignKey:'parkingSlotID'});

module.exports = User;