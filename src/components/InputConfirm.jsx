import {Input} from "../components/Input.jsx";
import {CheckIcon} from "@heroicons/react/24/outline";
import {motion, AnimatePresence} from "framer-motion";

const InputConfirm = ({onClick, confirm, ...props}) => {
    return (
        <div className={'flex relative items-center'}>
            <Input {...props}></Input>
            <AnimatePresence>
                {confirm && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 0.5}}
                        exit={{opacity: 0, transition: {duration: 0.2}}}
                        whileHover={{opacity: 1}}
                        whileTap={{scale: 0.9}}
                        transition={{duration: 0.2}}
                        onClick={onClick}
                        className={`absolute -left-6 cursor-pointer`}>
                        <CheckIcon className={"w-4"}></CheckIcon>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
};

export default InputConfirm;