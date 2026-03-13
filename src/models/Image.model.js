const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ImageModel = sequelize.define(
  'Image',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = ImageModel;
