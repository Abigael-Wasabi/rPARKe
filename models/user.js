// const { DataTypes, Sequelize } = require ('sequelize');
// const { sequelize } = require ('../config/db'); // Imported Sequelize instance

// const User = sequelize.define('User', {
//   firstname: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   lastname: { 
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// module.exports = User;



const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
  });

  return User;
};