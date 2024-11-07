const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Authy = require("authy");

// Create the Express app
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Authy API key
const authy = new Authy("your-authy-api-key"); // Replace with your actual Authy API key

// Store OTP for a user in memory (in a real app, you should store this in a session or database)
let otpStoredForUser = {};

// Endpoint to send OTP
app.post("/send-otp", (req, res) => {
  const { countryCode, contactNumber } = req.body;
  const phoneNumber = `${countryCode}${contactNumber}`;

  // Send OTP via Authy API
  authy.requestSms(phoneNumber, { force: true }, (err, response) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to send OTP" });
    }

    otpStoredForUser[phoneNumber] = response.token; // Save the OTP for the user (for demo purposes)
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  });
});

// Endpoint to verify OTP
app.post("/verify-otp", (req, res) => {
  const { countryCode, contactNumber, otp } = req.body;
  const phoneNumber = `${countryCode}${contactNumber}`;

  // Verify OTP with Authy
  authy.verifyOtp(phoneNumber, otp, (err, response) => {
    if (err) {
      return res.status(400).json({ success: false, error: "Invalid OTP" });
    }

    if (response.success) {
      res
        .status(200)
        .json({ success: true, message: "Your contact is verified" });
    } else {
      res.status(400).json({ success: false, error: "Invalid OTP" });
    }
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
