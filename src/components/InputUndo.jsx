import {Input} from "./ui/input.jsx";
import {ArrowTurnDownLeftIcon} from "@heroicons/react/24/outline";
import {motion, AnimatePresence} from "framer-motion";

const InputUndo = ({actual, setValue, invalid, ...props}) => {
    return (
        <div className={'flex relative items-center'}>
            <Input {...props} className={`${invalid && 'bg-red-100'}`}></Input>
            <AnimatePresence>
                {actual !== props.value && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 0.5}}
                        exit={{opacity: 0, transition: {duration: 0.2}}}
                        whileHover={{opacity: 1}}
                        whileTap={{scale: 0.9}}
                        transition={{duration: 0.2}}
                        onClick={() => setValue(actual)}
                        className={`absolute -left-6 cursor-pointer`}>
                        <ArrowTurnDownLeftIcon className={"w-4"}></ArrowTurnDownLeftIcon>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
};

export default InputUndo;