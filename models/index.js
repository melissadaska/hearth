
const Comment = require('./Comment');
const tblGroup = require('./tblGroup');
const Picture = require('./Picture');
const Post = require('./Post');
const User = require('./User');
const UserGroup = require('./UserGroup');

User.belongsToMany(tblGroup, {
   through:  UserGroup,
   key: 'user_id'
});

tblGroup.belongsToMany(User, {
   through: UserGroup,
   key: 'group_id'
});

module.exports = {
   Comment,
   tblGroup,
   Picture,
   Post,
   User
   ,
   UserGroup
};