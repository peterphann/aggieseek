import { useState, useEffect } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth"

const errorMessages = {
  "auth/invalid-email": "The email you entered is invalid.",
  "auth/missing-password": "Please enter a password.",
  "auth/email-already-in-use": "The email you entered is already in use.",
  "auth/weak-password": "Your password must be at least 6 characters long."
}

const Signup = () => {
  const navigate = useNavigate()
  const [first, setFirst] = useState("")
  const [last, setLast] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [message, setMessage] = useState("")

  const handleSignup = (e) => {
    e.preventDefault()

    if (password != confirm) {
      setMessage("The passwords you entered do not match!")
      return
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/dashboard')
      })
      .catch((error) => {
        const errorCode = error.code;
        setMessage(errorMessages[errorCode])
      })
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigate("/dashboard")
      }
    })
  }, [])

  return (
    <div className="justify-center flex mt-20">
      <div className="flex-col items-center bg-white px-10 py-10 rounded-lg shadow-md">
        <h1 className="text-center font-bold text-black text-3xl mx-32">Sign Up</h1>
        <h2 className="text-center text-black text-sm font-medium">Already have an account? <Link to="/signin" className="text-blue-700 hover:underline">Login</Link></h2>

        <form onSubmit={(e) => handleSignup(e)}>
          
          <div className="mt-5 text-center text-sm">
            <input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={(e) => setFirst(e.target.value)} value={first} className="bg-white text-black border-b-2 border-zinc-200 px-6 py-2" autoComplete="address-level4" />
          </div>

          <div className="mt-5 text-center text-sm">
            <input type="text" name="lastName" id="lastName" placeholder="Last Name" value={last} onChange={(e) => setLast(e.target.value)} className="bg-white text-black border-b-2 border-zinc-200 px-6 py-2" autoComplete="address-level4" />
          </div>

          <div className="mt-5 text-center text-sm">
            <input type="text" name="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white text-black border-b-2 border-zinc-200 px-6 py-2" autoComplete="address-level4" />
          </div>

          <div className="mt-5 text-center text-sm">
            <input type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white text-black border-b-2 border-zinc-200 px-6 py-2" />
          </div>

          <div className="mt-5 text-center text-sm">
            <input type="password" name="confirmPass" id="confirmPass" placeholder="Confirm Password" onChange={(e) => setConfirm(e.target.value)} value={confirm} className="bg-white text-black border-b-2 border-zinc-200 px-6 py-2" />
          </div>

          <div className="mt-5 text-center">
            <p className="text-red-600 font-medium text-xs min-h-6">{message}</p>
          </div>

          <div className="text-center mt-5">
            <Button>Sign Up</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;