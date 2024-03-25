import { useState } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignin = (e) => {
    e.preventDefault()
  }

  return (
    <div className="justify-center flex mt-20">
      <div className="flex-col items-center bg-white px-16 py-10 rounded-lg shadow-md">
        <h1 className="text-center font-bold text-black text-3xl">Login</h1>
        <h2 className="text-center text-black text-sm font-medium">Don't have an account? <Link to="/signup" className="text-blue-700">Sign Up</Link></h2>

        <form onSubmit={(e) => handleSignin(e)}>
          <div className="mt-5 text-center text-sm">
            <input type="text" name="email" id="email" placeholder="Email" className="bg-white text-black border-b-2 border-zinc-200 px-6 py-2" autoComplete="off" />
          </div>

          <div className="mt-5 text-center text-sm">
            <input type="password" name="password" id="password" placeholder="Password" className="bg-white text-black border-b-2 border-zinc-200 px-6 py-2" />
            <p>Forgot password?</p>
          </div>

          <div className="text-center mt-5">
            <Button action="submit">Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;