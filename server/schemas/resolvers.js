const { User, Comment, Post } = require('../models')
const resolvers = {
  Query: {
    // get all comments
    comments: async (parent, { username }) => {
      // allow to search by username
      const params = username ? { username } : {};
      return Comment.find(params).sort({ createdAt: -1 });
    },
    // get a comment by ID
    comment: async (parent, { _id}) => {
      return Comment.findOne({ _id});
    },
    //get all posts
    posts: async () => {
      return Post.find().sort({ createdAt: -1 })
      .select('-__v')
      .populate('comments');
    },
    // get a post by id
    post: async (parent, { _id }) => {
      return Post.findOne({ _id });
    },
    // get all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('posts')
        .populate('friends')
        .populate('comments');
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('posts')
        .populate('friends')
        .populate('comments');
    },
  }
};


module.exports = resolvers;
