const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const replySchema = new Schema(
  {
    replyId: {
      // use mongoose ObjectId data type
      type: Schema.Types.ObjectId,
      // Default value is set to a new ObjectId
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      // set default value to current timestamp
      default: Date.now,
      // use a getter method to format timestamp on query
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }

);

const CommentSchema = new Schema({
  writtenBy: {
    type: String
  },
  commentBody: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
  // use ReplySchema to validate data for a reply
  replies: [replySchema]

},
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

const Comment = model('Comment', CommentSchema);

module.exports = Comment;