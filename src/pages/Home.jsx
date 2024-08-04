import Button from "../components/Button"
import Logo from "../components/Logo"
import { Link, useNavigate } from 'react-router-dom'
import { CheckIcon } from '@heroicons/react/24/outline'
import ACCBadge from "../components/ACCBadge"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { getAuth } from "firebase/auth"

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    getAuth().onAuthStateChanged(user => {
      if (user) {
        navigate("/dashboard")
      }
    })
  }, [])

  return (
    <>
      <div className="mt-20 text-center">
        <motion.div className="flex justify-center"
          initial={{'opacity': 0, translateY: '40%'}}
          animate={{'opacity': 1, translateY: '0%'}}
          transition={{type: 'spring', stiffness: 100, duration: 0.5}}>
           <h2 className="text-6xl font-bold">Welcome to </h2>
           <Logo className="object-contain w-80 mx-4" ></Logo>
        </motion.div>

        <motion.div
            initial={{'opacity': 0, translateY: '40%'}}
            animate={{'opacity': 1, translateY: '0%'}}
            transition={{type: 'spring', stiffness: 100, delay: 0.25, duration: 0.5}}>
          <h2 className="text-4xl font-bold my-4">Get ahead of the game</h2>
        </motion.div>

        <div className="flex justify-center my-2">
        <div className="hidden text-base sm:block transform-translate ease-in-out duration-200 mr-5 cursor-default hover:-translate-y-1">
            <CheckIcon className="inline h-8 w-8 pr-2"></CheckIcon>
            Pick what courses you want
          </div>
          <div className="text-sm sm:text-base transform-translate ease-in-out duration-200 ml-5 cursor-default hover:-translate-y-1">
            <CheckIcon className="inline h-8 w-8 pr-2"></CheckIcon>
            Notify you upon course openings
          </div>
          <div className="text-sm sm:text-base transform-translate ease-in-out duration-200 ml-5 cursor-default hover:-translate-y-1">
            <CheckIcon className="inline h-8 w-8 pr-2"></CheckIcon>
            Make registration easy and hassle free
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