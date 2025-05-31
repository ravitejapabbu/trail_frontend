import React from "react";
import { useNavigate } from "react-router-dom";  // import useNavigate
import Lottie from "lottie-react";
import animationData from "../assets/animations/mountain.json";
import googleLogo from "../assets/animations/image.png";
import "./Signup.css";

import { auth, provider, signInWithPopup } from "../firebase";

const Signup = () => {
  const navigate = useNavigate();  // get navigate function

  const handleGoogleSignup = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("User Info:", user);
        alert(`Welcome ${user.displayName}`);

        // Redirect to dashboard after successful login
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Authentication failed:", error);
        alert("Google Sign-In failed!");
      });
  };

  return (
    <div className="signup-container">
      <Lottie 
        animationData={animationData}
        loop
        autoplay
        className="background-animation"
      />

      <div className="signup-box">
        <h2>Create your account</h2>
        <div className="signup-actions">
          <button className="google-btn" onClick={handleGoogleSignup}>
            <img src={googleLogo} alt="Google logo" />
            Sign up with Google
          </button>
        </div>
        <p className="signin-link">
          Already have an account? <a href="/signin">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
