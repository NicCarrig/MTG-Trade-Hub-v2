
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PostSchema = new Schema(
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
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    }
  }

);

const Post = model('Post', PostSchema)

module.exports = Post;