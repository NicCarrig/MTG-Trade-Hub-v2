
const { Schema, model, Types } = require('mongoose');
const { Comment } = require('./Comment')
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