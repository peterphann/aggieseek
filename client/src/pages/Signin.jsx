import { useEffect, useState } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { auth } from "../firebase.jsx";
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom";

const errorMessages = {
  "auth/invalid-email": "The email you entered is invalid.",
  "auth/missing-password": "Please enter a password.",
  "auth/invalid-credential": "The password you entered is incorrect.",
  "auth/too-many-requests": "You have attempted to log in too many times. Please wait before trying again."
}

const Signin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigate("/dashboard")
      }
    })
  }, [])

  const handleSignin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/dashboard")
      })
      .catch((error) => {
        const errorCode = error.code
        setMessage(errorCode)
      })
  }

  return (
    <div className="justify-center flex mt-20">
      <div className="flex-col items-center bg-white px-16 py-10 rounded-lg shadow-md">
        <h1 className="text-center font-bold text-black text-3xl">Login</h1>
        <h2 className="text-center text-black text-sm font-medium">Don't have an account? <Link to="/signup" className="text-blue-700 hover:underline">Sign Up</Link></h2>

        <form onSubmit={(e) => handleSignin(e)}>
          <div className="mt-5 text-center text-sm">
            <input type="text" name="email" id="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} value={email} className="bg-white text-black border-b-2 border-zinc-200 px-6 py-2" autoComplete="off" />
          </div>

          <div className="mt-5 text-center text-sm">
            <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} value={password} className="bg-white text-black border-b-2 border-zinc-200 px-6 py-2" />
          </div>

          <div className="mt-5 text-center">
            <p className="text-red-600 font-medium text-xs min-h-6">{message}</p>
          </div>

          <div className="text-center mt-6">
            <Button action="submit">Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;