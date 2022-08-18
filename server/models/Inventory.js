const { Schema, model, Types } = require('mongoose');



const InventorySchema = new Schema(
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
      required: true
    },
    img_uri: {
      type: String,
      required: true
    }
  }
);



const Inventory = model('Inventory', InventorySchema);


module.exports = Inventory;