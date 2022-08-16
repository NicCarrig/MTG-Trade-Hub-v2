const { Schema, model } = require('mongoose');
const { Inventory } = require('./Inventory');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  inventory: [Inventory]
  // friends: [{
  //   // Array of _id values referenceing the User model (self-ref)
  //   type: Schema.Types.ObjectId,
  //   ref: 'User'
  // }]
},
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  })

// UserSchema.virtual('friendCount').get(function () {
//   return this.friends.length
// });

const User = model('User', UserSchema)

module.exports = User;