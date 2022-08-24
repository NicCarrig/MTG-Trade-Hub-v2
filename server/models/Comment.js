const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat')


const commentSchema = new Schema({
  commentBody: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
  username: {
    type: String,
    required: true
  }
},
  {
    toJSON: {
      getters: true
    }
  }
);


module.exports = commentSchema;