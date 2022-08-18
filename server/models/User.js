const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const {inventorySchema} = require('./Inventory')

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!']
  },

  friends: [{
    // Array of _id values referenceing the User model (self-ref)
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
},
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  })

// set up pre-save middleware to create password
// userSchema.pre('save', async function (next) {
//   if (this.isNew || this.isModified('password')) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }

//   next();
// });

// // compare the incoming password with the hashed password
// userSchema.methods.isCorrectPassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

// userSchema.virtual('inventoryCount').get(function () {
//   return this.inventory.length;
// });

const User = model('User', userSchema);

module.exports = User;