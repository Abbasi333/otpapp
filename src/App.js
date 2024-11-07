import React, { useState } from "react";
import emailjs from "emailjs-com";

const EmailOTPVerification = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Function to generate a random 6-digit OTP
  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000); // Generate OTP
  };

  // Handle OTP sending
  const handleSendOtp = (e) => {
    e.preventDefault();
    const generated = generateOtp(); // Generate OTP
    setGeneratedOtp(generated); // Store the generated OTP

    // Send OTP to email using EmailJS
    emailjs
      .send(
        "service_bfmygme", // Your EmailJS Service ID
        "template_0i3vjm3", // Your Template ID
        { otp: generated, email: email }, // EmailJS template variables
        "PGGKpLBIPEyv9kABY" // Your EmailJS Public API Key
      )
      .then(
        (response) => {
          console.log("OTP sent successfully:", response);
          setIsOtpSent(true); // Set state to show OTP input
          setMessage("OTP sent to your email!");
          setError("");
        },
        (error) => {
          console.error("Error sending OTP:", error);
          setError("Failed to send OTP.");
          setMessage("");
        }
      );
  };

  // Handle OTP verification
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp === generatedOtp.toString()) {
      setMessage("Your contact is verified!"); // OTP matches
      setError("");
    } else {
      setError("Invalid OTP"); // OTP doesn't match
      setMessage("");
    }
  };

  return (
    <div>
      <h2>OTP Verification</h2>
      <div>
        {!isOtpSent ? (
          <form onSubmit={handleSendOtp}>
            <div>
              <label>Email Address:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit">Send OTP</button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div>
              <label>Enter OTP:</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button type="submit">Verify OTP</button>
          </form>
        )}
      </div>
      {message && <p>{message}</p>} {/* Display success or failure message */}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message */}
    </div>
  );
};

export default EmailOTPVerification;
