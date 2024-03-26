import Button from "../components/Button"
import Logo from "../components/Logo"
import { Link } from 'react-router-dom'
import { CheckIcon } from '@heroicons/react/24/outline'
import { auth } from "../firebase"
import ACCBadge from "../components/ACCBadge"

const Home = () => {
  return (
    <>
      <div className="m-12">
        <div className="flex flex-row justify-between mb-3">
          <Logo className="object-contain md:h-16"></Logo>
          <ACCBadge></ACCBadge>
        </div>

        <h2 className="text-5xl font-bold my-6">Get your desired classes, hassle free</h2>

        <div className="flex my-3">
          <div className="hidden text-base sm:block transform-translate ease-in-out duration-200 mr-5 cursor-default hover:-translate-y-1">
            <CheckIcon className="inline h-8 w-8 pr-2"></CheckIcon>
            Pick what courses you want
          </div>
          <div className="text-sm sm:text-base transform-translate ease-in-out duration-200 ml-5 cursor-default hover:-translate-y-1">
            <CheckIcon className="inline h-8 w-8 pr-2"></CheckIcon>
            Notify you upon course openings
          </div>
        </div>

        <Link to="/signup" className="mr-8">
          <Button>Sign Up</Button>
        </Link>

        <Link to="/signin" className="">
          <Button>Log In</Button>
        </Link>
      </div>


    </>
  );
}

export default Home;