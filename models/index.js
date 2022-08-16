const User = require('./User');
const Post = require('./Post');
const Inventory = require('./Inventory');
const Comment = require('./Comment')



//create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Inventory, {
    foreignKey: 'user_id',
});
Inventory.belongsTo(User, {
    foreignKey: 'user_id'
});


Comment.belongsTo(User, {
    foreignKey: 'user_id',
});
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});
User.hasMany(Comment, {
    foreignKey: 'user_id'
});
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});



module.exports = { User, Post, Inventory, Comment };