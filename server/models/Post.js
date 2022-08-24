
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const commentSchema = require('./Comment');

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },  
    postBody: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    comments: [commentSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    }
  }

);
postSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});
const Post = model('Post', postSchema)

module.exports = Post;