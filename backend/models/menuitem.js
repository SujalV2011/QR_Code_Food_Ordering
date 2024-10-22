const mongoose = require('mongoose');

// Define the schema for a Menu Item  
const menuItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  itemPrice: { type: Number, required: true },
  itemImage: { type: String, required: true }, // Path to the image
});

// Create and export the model
const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
