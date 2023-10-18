const Sequelize= require('sequelize');
const Connection= require ('../config/db'); // Imported Sequelize instance

const User = Connection.define('User', {
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

module.exports = User;



// const { DataTypes } = require('sequelize');

// module.exports = (sequelize, Sequelize) => {
//   const User = sequelize.define('user', {
//     firstname: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     lastname: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     password: {
//       type: DataTypes.STRING, 
//       allowNull: false,
//     },
//   });

//   return User;
// };