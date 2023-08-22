const mongoose = require("mongoose");


// Define the item schema
const itemSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;