const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './.env' }); // Adjust the path based on your folder structure

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = sequelize; 
