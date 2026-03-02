const { Sequelize } = require('sequelize');

const config = require('../config');

const sequelize = new Sequelize(config.databaseURL);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection is successfull');
  })
  .catch((err) => {
    console.log('Database connection is failed', err);
  });

module.exports = sequelize;
