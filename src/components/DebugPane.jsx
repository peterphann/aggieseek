import {useState} from "react";
import {motion} from "framer-motion";

const DebugPane = ({children}) => {

    const convert = [
        'top-16 left-0',
        'top-16 right-0',
        'bottom-0 right-0',
        'bottom-0 left-0',
    ]
    const [mode, setMode] = useState(0)

    return (
        <motion.div
            animate={{opacity: 0.5, transition: {delay: 1, duration: 2}}}
            whileHover={{opacity: 1, transition: {duration: 0.1}}}
            className={`absolute ${convert[mode]} p-4 m-4 bg-zinc-50 shadow-lg cursor-pointer`}
            onClick={() => {setMode(mode === 3 ? 0 : mode + 1)}}>
            {children}
        </motion.div>
    )
}

export default DebugPane;