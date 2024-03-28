import { useEffect, useState } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { auth } from "../firebase.jsx";
import {  } from "firebase/auth"
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
    // TODO: create profile and user settings as shown in figma
    // make sure to remove the h1 :)
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    return (
        <div className="justify-center flex mt-20">
        <div className="flex-col items-center bg-white px-10 py-10 rounded-lg shadow-2xl">
          <h1 className="text-center font-bold text-black text-3xl mx-10">Forgot Password?</h1>
          <h2 className="text-center text-black text-sm font-medium">Remember your password? <Link to="/signup" className="text-blue-700 hover:underline">Login</Link></h2>
  
          <form>
            <div className="mt-5 text-center text-sm">
              <input type="text" name="email" id="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} value={email} className="bg-white text-black border-b-2 border-zinc-200 px-5 py-2" autoComplete="off" />
            </div>
  
            <div className="mt-3 text-center">
            </div>
            <div className="text-center">
            <p><Link to="/forgotPassword" className="text-red-600 font-medium text-xs min-h-6 hover:underline">Forgot Password?</Link></p>
            </div>
            <div className="text-center mt-6">
              <Button action="send reset password email">Send Reset Email</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
   
  export default ForgotPassword;