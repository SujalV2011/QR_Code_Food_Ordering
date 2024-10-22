// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { Twilio } = require('twilio');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(bodyParser.json());

const twilioClient = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post('/send-otp', (req, res) => {
  const { phoneNumber } = req.body;

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Save OTP to your database or in-memory storage (not shown here)

  twilioClient.messages.create({
    body: `Your OTP is ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber
  })
  .then(message => res.status(200).json({ success: true, message: 'OTP sent!' }))
  .catch(error => res.status(500).json({ success: false, error: error.message }));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
