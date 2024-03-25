import Button from "../components/Button"
import Logo from "../components/Logo"
import { Link } from 'react-router-dom'
import { CheckIcon } from '@heroicons/react/24/outline'
import './Home.css'
import { auth } from "../firebase"

const Home = () => {
  return (
    <div>
      <div className="mt-20 text-center">
        <div className="flex flex-col mb-6 sm:flex-row sm:mb-0 justify-center items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white my-3">Welcome to</h1>
          <Logo className="object-contain w-60 md:w-80 mx-4"></Logo>
        </div>
        <h2 className="text-xl font-medium">Get your desired classes hassle free</h2>
        <div className="flex justify-center my-3">
          <div className="hidden sm:block transform-translate ease-in-out duration-200 mx-3 cursor-default hover:-translate-y-1">
            <CheckIcon className="inline h-8 w-8 pr-2"></CheckIcon>
            No 8ams
          </div>
          <div className="text-sm sm:text-lg transform-translate ease-in-out duration-200 mx-3 cursor-default hover:-translate-y-1">
            <CheckIcon className="inline h-8 w-8 pr-2"></CheckIcon>
            Notify you upon course openings
          </div>
          <div className="hidden sm:block transform-translate ease-in-out duration-200 mx-3 cursor-default hover:-translate-y-1">
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

    </div>

  );
}

export default Home;