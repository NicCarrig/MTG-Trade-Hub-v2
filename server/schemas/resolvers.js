// const { User, Comment, Post, Inventory } = require('../models');
const { User, Post, Inventory } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth')

const resolvers = {
Query: {
  // ME will work with apolloServer to read request headers (JWT authentication)
  me: async (parent, args, context) => {
    if (context.user) {
      const userData = await User.findOne({ _id: context.user._id })
        .select('-__v -password')
        .populate('posts')
        .populate('inventory')
        .populate('friends');

      return userData;
    }

    throw new AuthenticationError('Not logged in');
  },

  //get all posts
  posts: async (parent, { username }) => {
    const params = username ? { username } : {};
    return Post.find(params).sort({ createdAt: -1 })
    .select('-__v');
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
      .populate('inventory');
  },
  // get a user by username
  user: async (parent, { username }) => {
    return User.findOne({ username })
      .select('-__v -password')
      .populate('posts')
      .populate('friends')
      .populate('inventory');
  }

  },
  Mutation: {

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
    },
    
    addPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true }
        );

        return post;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    

    addComment: async (parent, { postId, commentBody }, context) => {

      if (context.user) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $push: { comments: {commentBody, username: context.user.username} } },
          { new: true, runValidators: true }
        );

        return updatedPost;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addInventory: async (parent, args, context) => {
      if (context.user) {
        const inventory = await Inventory.create({ ...args, username: context.user.username });
        
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { inventory: {_id: inventory._id}}},
          { new: true }
          );
     return inventory;
    }

      throw new AuthenticationError('You need to be logged in!');
    },

    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate('friends');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    
    deletePost: async ( parent, args, context ) => {
      if (context.user) {

        const post = await Post.deleteOne({ ...args, username: context.user.username });

        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: post._id } },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }
};


module.exports = resolvers;
