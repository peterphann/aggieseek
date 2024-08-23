import { useEffect, useState } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    // TODO: create profile and user settings as shown in figma
    // make sure to remove the h1 :)
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const sendResetPasswordEmail = async () => {
        if (email) { // Check if the email is not empty
            try {
                await sendPasswordResetEmail(getAuth(), email);
                setMessage("Password reset email sent!");
                //navigate("/signup"); // Redirect to login page or any other page
            } catch (error) {
                console.error("Failed to send password reset email: ", error);
                setMessage("Failed to send password reset email. Please try again.");
            }
        } else {
            alert("Please enter your email address.");
        }
    };
    return (
        <div className="justify-center flex mt-20">
        <div className="flex-col items-center bg-white px-10 md:px-32 py-10 shadow-2xl">
          <h1 className="text-center font-bold text-black text-3xl">Forgot Password?</h1>
          <h2 className="text-center text-black text-sm font-medium mt-1">Remember your password? <Link to="/signin" className="text-blue-700 hover:underline">Login</Link></h2>
  
          <form onSubmit={(e) => { e.preventDefault(); sendResetPasswordEmail(); }}>
            <div className="mt-5 text-center text-sm">
              <input type="text" name="email" id="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} value={email} className="bg-white text-black border-b-2 border-zinc-200 px-5 py-2" autoComplete="off" />
            </div>
            <div className="mt-3 text-center">
            <p className="text-red-600 font-medium text-xs min-h-6">{message}</p>
            </div>
            <div className="text-center mt-4">
              <Button action="send reset password email">Send Reset Email</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
   
  export default ForgotPassword;