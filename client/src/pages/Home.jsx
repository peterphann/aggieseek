import Button from "../components/Button";
import NavbarGuest from "../components/NavbarGuest";
import Navbar from "../components/Navbar"
import { CheckIcon } from '@heroicons/react/24/outline'
import logo from '../assets/logo-white.png'
import './Home.css'

const Home = () => {

  function getStarted() {
    alert("Get Started!")
  }

  return (
    <div>
      <Navbar></Navbar>

      <div className="mt-20 text-center">
        <div className="flex justify-center">
          <h1 className="text-6xl font-bold text-white my-3">Welcome to</h1>
          <img src={logo} alt="AggieSeek" className="object-contain w-80 mx-4" />
        </div>
        <h2 className="text-xl font-medium">Get your desired classes hassle free</h2>
        <div className="flex-row my-3">
          <div className="inline-block mx-3">
            <CheckIcon className="inline h-8 w-8 pr-2"></CheckIcon>
            No 8ams
          </div>
          <div className="inline-block mx-3">
            <CheckIcon className="inline h-8 w-8 pr-2"></CheckIcon>
            Notify you upon course openings
          </div>
          <div className="inline-block mx-3">
            <CheckIcon className="inline h-8 w-8 pr-2"></CheckIcon>
            Get Fridays off early
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button onClick={() => getStarted()}>Get started</Button>
      </div>
    </div>

  );
}

export default Home;