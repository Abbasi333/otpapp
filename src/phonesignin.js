import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Phone.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase/setup";
function Phonesignin() {
  const [phone, setphone] = useState("");
  const [user, setuser] = useState(null);
  const [otp, setotp] = useState("");
  const sendotp = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);

      setuser(confirmation);
    } catch (err) {
      console.log(err);
    }
  };
  const verifyotp = async () => {
    try {
      await user.confirm(otp);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="phone-signin">
      <div className="phone-content">
        <PhoneInput
          country={"us"}
          value={phone}
          onChange={(phone) => setphone("+" + phone)}
        />
        <button onClick={sendotp} className="btn1" variant="contained">
          SEND OTP
        </button>
        <div id="recaptcha"></div>
        <br />
        <input
          onChange={(e) => sendotp(e.target.value)}
          type="text"
          id="input1"
          placeholder="ENTER OTP"
        />
        <br />
        <button onClick={verifyotp} className="btn1">
          VERIFIED OTP
        </button>
      </div>
    </div>
  );
}
export default Phonesignin;
