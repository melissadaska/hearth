const bcrypt = require('bcrypt');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class tblGroup extends Model {
   // set up method to run on instance data (per user) to check password
   checkUUID(loginPw) {
      return bcrypt.compareSync(loginPw, this.uuid);
   }
}

tblGroup.init(
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true
      },
      uuid: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            len: [4]
         }
      }
   },
   {
      hooks: {
         // set up beforeCreate lifecycle "hook" functionality
         async beforeCreate(newGroupData) {
           newGroupData.uuid = await bcrypt.hash(newGroupData.uuid, 10);
           return newGroupData;
         },
         // set up beforeUpdate lifecycle "hook" functionality
         async beforeUpdate(updatedGroupData) {
           updatedGroupData.password = await bcrypt.hash(updatedGroupData.uuid, 10);
           return updatedGroupData;
         }
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'tblgroup'
   }
);

module.exports = tblGroup;