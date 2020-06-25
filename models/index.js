const Comment = require('./Comment');
const Group = require('./Group');
const Post = require('./Post');
const User = require('./User');

// create dynamic join tables
// User_Group table
User.belongsToMany(Group, {
   through: 'User_Group'
});

Group.belongsToMany(User, {
   through: 'User_Group'
});

// Post_Comment table
Post.belongsToMany(Comment, {
   through: 'Post_Comment'
});

Comment.belongsToMany(Post, {
   through: 'Post_Comment'
});

// Picture_Comment table


module.exports = {
   Comment,
   Group,
   Post,
   User
};