const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserGroup extends Model {}

UserGroup.init(
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      }
      ,
      user_id: {
         type: DataTypes.INTEGER,
         references: {
            model: 'user',
            key: 'id'
         }
      },
      group_id: {
         type: DataTypes.INTEGER,
         references: {
            model: 'tblgroup',
            key: 'id'
         }
      }
   },
   {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'usergroup'
   }
);

module.exports = UserGroup;