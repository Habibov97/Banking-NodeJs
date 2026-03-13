const { DataTypes } = require('sequelize');
const sequlize = require('../config/database');

const Activation = sequlize.define(
  'Activation',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expireDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['activation', 'resetPassword'],
      allowNull: false,
    },
  },
  { timestamps: true },
);

module.exports = Activation;
