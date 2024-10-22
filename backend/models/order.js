const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  tableNumber: String,
  items: [
    {
      name: String,
      quantity: Number,
      option: String,  
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('order', OrderSchema);
