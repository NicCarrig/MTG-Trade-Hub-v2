
const { Schema, model, Types } = require('mongoose');
const { Comment } = require('./Comment')
const dateFormat = require('../utils/dateFormat');

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    post_body: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    }  
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false
  }

);

const Post = model('Post', PostSchema)

module.exports = Post;