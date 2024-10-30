import { useState, useEffect } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { getDatabase, ref, set } from "firebase/database";

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
  const [isProcessing, setProcessing] = useState(false)

  const handleSignup = (e) => {
    e.preventDefault()
    if (isProcessing) return;

    if (first == false) {
      setMessage("Please enter a first name.")
      return
    }

    if (last == false) {
      setMessage("Please enter a last name.")
      return
    }

    if (email == false) {
      setMessage("Please enter an email.")
      return
    }

    setProcessing(true);
    if (password !== confirm) {
      setMessage("The passwords you entered do not match!")
      return
    }

    createUserWithEmailAndPassword(getAuth(), email, password)
      .then(() => {
        navigate('/dashboard')

        const db = getDatabase()
        const uid = getAuth().currentUser.uid
        const date = (new Date()).toISOString().slice(0, -5) + 'Z';

        set(ref(db, 'users/' + uid), {
          firstName: first,
          lastName: last,
          email: email,
          notifications: {
            [`${date} Welcome`]: {
              crn: '',
              message: '',
              newSeats: '',
              origSeats: 'Get Started',
              timestamp: date,
              title: 'Welcome to AggieSeek!'
            }
          },
          methods: {
            email: {
              enabled: false,
              value: email
            },
            phone: {
              enabled: false,
              value: ''
            },
            discord: {
              enabled: false,
              value: ''
            },
          },
          settings: {
            notificationModes: {
              increase: true,
              decrease: true,
              open: true,
              close: true
            }
          },
          sections: []
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        setProcessing(false)
        setMessage(errorMessages[errorCode])
      })
  }

  useEffect(() => {
    getAuth().onAuthStateChanged(user => {
      if (user) {
        navigate("/dashboard")
      }
    })
  }, [])

  return (
    <div className="justify-center flex mt-8 md:mt-20">
      <div className="flex-col items-center bg-white px-16 md:px-32 py-10 shadow-2xl">
        <h1 className="text-center font-bold text-black text-3xl">Sign Up</h1>
        <h2 className="text-center text-black text-sm font-medium mt-1">Already have an account? <Link to="/signin" className="text-blue-700 hover:underline">Login</Link></h2>

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