const sequilize = require('../config/database');
const { DataTypes } = require('sequelize');

const TransactionModel = sequilize.define(
  'Transaction',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['payment', 'topup', 'transfer'],
    },
    status: {
      type: DataTypes.ENUM,
      values: ['refund', 'success', 'fail', 'pending'],
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    fromId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    toId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { timestamps: true },
);

module.exports = TransactionModel;
