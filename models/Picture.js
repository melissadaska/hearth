const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create the Picture model
class Picture extends Model {}

// create fields / columsn for Picture model
Picture.init(
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      filetype: {
         type: DataTypes.STRING,
         allowNull: false
      },
      filename: {
         type: DataTypes.STRING,
         allowNull: false
      },
      data: {
         type: DataTypes.BLOB,
         allowNull: false
      },
      annotation: {
         type: DataTypes.STRING
      },
      post_id: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      user_id: {
         type: DataTypes.INTEGER,
         allowNull: false
      }
   },
   {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'picture'
   }
);

module.exports = Picture;