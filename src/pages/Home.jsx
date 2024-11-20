import Button from "../components/Button"
import Logo from "../components/Logo"
import { Link, useNavigate } from 'react-router-dom'
import { CheckIcon } from '@heroicons/react/24/outline'
import { motion } from "framer-motion"
import { useEffect } from "react"
import { getAuth } from "firebase/auth"
import { Check } from "lucide-react"

const Home = () => {

  useEffect(() => {
    getAuth().onAuthStateChanged(user =>{
      if (user) {
        getAuth().signOut();
      }
    })
  }, [])

  return (
    <>
      <div className="mt-20 flex flex-col items-center">
        <motion.div className="flex flex-col items-center justify-center md:flex-row gap-4"
          initial={{'opacity': 0, translateY: '40%'}}
          animate={{'opacity': 1, translateY: '0%'}}
          transition={{type: 'spring', stiffness: 100, duration: 0.5}}>
           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">Welcome to </h2>
           <Logo className="object-contain w-60 lg:w-80" ></Logo>
        </motion.div>

        <motion.div
            initial={{'opacity': 0, translateY: '40%'}}
            animate={{'opacity': 1, translateY: '0%'}}
            transition={{type: 'spring', stiffness: 100, delay: 0.25, duration: 0.5}}>
          <h2 className="text-2xl lg:text-4xl font-bold mt-4 mb-4">Never miss a seat!</h2>
        </motion.div>

        <div className="w-11/12 md:w-2/3 lg:w-1/3 text-center">
        Howdy! AggieSeek is currently down indefinitely. We're currently working to get back up and running by next semester.
        </div>

        <div className="w-11/12 md:w-2/3 lg:w-1/2 text-center mt-3">
        Thank you to everyone who has supported and used our service!
        </div>

        {/* <div className="flex flex-col lg:flex-row justify-center my-2">
          <div className="text-base sm:block transform-translate ease-in-out duration-200 cursor-default hover:-translate-y-1">
            <Check className="inline h-8 w-8 pr-2"></Check>
            Pick what courses you want
          </div>
          <div className="text-base transform-translate ease-in-out duration-200 lg:ml-5 cursor-default hover:-translate-y-1">
            <Check className="inline h-8 w-8 pr-2"></Check>
            Notify you upon course openings
          </div>
          <div className="text-base transform-translate ease-in-out duration-200 lg:ml-5 cursor-default hover:-translate-y-1">
            <Check className="inline h-8 w-8 pr-2"></Check>
            Make registration easy and hassle free
          </div>
        </div>

        <Link to="/signup" className="mr-8">
          <Button>Sign Up</Button>
        </Link>

        <Link to="/signin" className="">
          <Button>Log In</Button>
        </Link> */}
      </div>


    </>
  );
}

export default Home;