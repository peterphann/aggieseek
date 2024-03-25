import Button from "../components/Button"
import { Link } from 'react-router-dom'
import { CheckIcon } from '@heroicons/react/24/outline'
import logo from '../assets/logo-white.png'
import './Home.css'

const Home = () => {

  return (
    <div>
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
        <Link to="/signin">
          <Button>Get started</Button>
        </Link>
      </div>

      <div className="text-sm text-white underline opacity-40 py-4 fixed bottom-0 left-0 w-full text-center">
        <Link to="/about">About Us</Link>
      </div>
    </div>

  );
}

export default Home;