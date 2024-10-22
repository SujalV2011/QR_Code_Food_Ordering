const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  contactNumber: { type: String, required: true },
  otp: { type: Number, required: true },
  expiresAt: { type: Date, required: true }
});

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;
