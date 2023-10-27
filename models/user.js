const Sequelize= require('sequelize');
const Connection= require ('../config/db'); // Imported Sequelize instance
const ParkSlot = require('./parkSlot');

const User = Connection.define('User', {
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

User.belongsTo(ParkSlot,{foreignKey:'parkingSlotID'})

module.exports = User;