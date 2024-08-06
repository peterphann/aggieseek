import { useEffect, useState } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom";

const errorMessages = {
  "auth/invalid-email": "The email you entered is invalid.",
  "auth/missing-password": "Please enter a password.",
  "auth/invalid-credential": "The password you entered is incorrect.",
  "auth/too-many-requests": "You have attempted to log in too many times. Please wait before trying again.",
  "auth/user-disabled": "The account you're trying to access is disabled."
}

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    getAuth().onAuthStateChanged(user => {
      if (user) {
        navigate("/dashboard")
      }
    })
  }, [])

  const handleSignin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        navigate("/dashboard")
      })
      .catch((error) => {
        const errorCode = error.code
        setMessage(errorMessages[errorCode])
      })
  }

  return (
    <div className="justify-center flex mt-20">
      <div className="flex-col items-center bg-white px-10 py-10 rounded-lg shadow-2xl">
        <h1 className="text-center font-bold text-black text-3xl mx-32">Log In</h1>
        <h2 className="text-center text-black text-sm font-medium mt-1">Don't have an account? <Link to="/signup" className="text-blue-700 hover:underline">Sign Up</Link></h2>

        <form onSubmit={(e) => handleSignin(e)}>
          <div className="mt-5 text-center text-sm">
            <input type="text" name="email" id="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} value={email} className="bg-white text-black border-b-2 border-zinc-200 px-5 py-2" autoComplete="off" />
          </div>
          <div className="mt-5 text-center text-sm">
            <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} value={password} className="bg-white text-black border-b-2 border-zinc-200 px-5 py-2" />
          </div>

          <div className="mt-3 text-center">
            <p className="text-red-600 font-medium text-xs min-h-0">{message}</p>
          </div>
          <div className="text-center">
          <p><Link to="/forgotPassword" className="text-red-600 font-medium text-xs min-h-6 hover:underline">Forgot Password?</Link></p>
          </div>
          <div className="text-center mt-6">
            <Button action="submit">Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;