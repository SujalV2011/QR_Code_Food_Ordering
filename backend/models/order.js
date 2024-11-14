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
  approve: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('order', OrderSchema);
