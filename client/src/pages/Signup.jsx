import Button from "../components/Button";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="justify-center flex mt-20">
      <div className="flex-col items-center bg-white px-16 py-10 rounded-lg shadow-md">
        <h1 className="text-center font-bold text-black text-3xl">Sign Up</h1>
        <h2 className="text-center text-black text-sm font-medium">Already have an account? <Link to="/signin" className="text-blue-700">Login</Link></h2>

        <form onSubmit={(e) => handleSignin(e)}>
          
          <div className="mt-5 text-center">
            <input type="text" name="firstName" id="firstName" placeholder="First Name" className="bg-white text-black border-b-2 border-zinc-200 px-6 py-2" autoComplete="address-level4" />
          </div>

          <div className="mt-5 text-center">
            <input type="text" name="lastName" id="lastName" placeholder="Last Name" className="bg-white text-black border-b-2 border-zinc-200 px-6 py-2" autoComplete="address-level4" />
          </div>

          <div className="mt-5 text-center">
            <input type="text" name="email" id="email" placeholder="Email" className="bg-white text-black border-b-2 border-zinc-200 px-6 py-2" autoComplete="address-level4" />
          </div>

          <div className="mt-5 text-center">
            <input type="password" name="password" id="password" placeholder="Password" className="bg-white text-black border-b-2 border-zinc-200 px-6 py-2" />
          </div>

          <div className="mt-5 text-center">
            <input type="password" name="password" id="password" placeholder="Confirm Password" className="bg-white text-black border-b-2 border-zinc-200 px-6 py-2" />
            <p>Forgot password?</p>
          </div>

          <div className="text-center mt-3">
            <Button>Sign Up</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;