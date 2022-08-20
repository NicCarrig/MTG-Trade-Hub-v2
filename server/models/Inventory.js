const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const inventorySchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    card_name: {
      type: String,
      required: true
    },
    scryfall_id: {
      type: String,
      required: true,
      unique: true
    },
    img_uri: {
      type: String,
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Inventory = model('Inventory', inventorySchema);


module.exports = Inventory, inventorySchema;