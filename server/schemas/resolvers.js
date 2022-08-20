const { User, Comment, Post, Inventory } = require('../models')
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth')

const resolvers = {
Query: {
// ME will work with apolloServer to read request headers (JWT authentication)
me: async (parent, args, context) => {
  if (context.user) {
    const userData = await User.findOne({ _id: context.user._id })
      .select('-__v -password')
      .populate('comments')
      .populate('posts')
      .populate('inventory')
      .populate('friends');

    return userData;
  }

  throw new AuthenticationError('Not logged in');
},

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
      .populate('comments')
      .populate('inventory');
  },
  // get a user by username
  user: async (parent, { username }) => {
    return User.findOne({ username })
      .select('-__v -password')
      .populate('posts')
      .populate('friends')
      .populate('comments')
      .populate('inventory');
  }

  },
  Mutation: {
    // create card
    // if in inventory block
    // if not create

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    }
  }
};


module.exports = resolvers;
