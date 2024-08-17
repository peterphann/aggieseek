import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";
import {usePopup} from "../contexts/PopupContext.jsx";

const Popup = () => {
    const [show, setShow] = useState(true)
    const { popupText } = usePopup()

    useEffect(() => {
        setShow(true)
        const timer = setTimeout(() => {
            setShow(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [popupText]);

    return (
        <>
            <AnimatePresence>
                {show && <motion.div
                key={popupText.key}
                initial={{top: 120, opacity: 0, left: '50%', translateX: '-50%'}}
                animate={{top: 100, opacity: 1, left: '50%', translateX: '-50%'}}
                exit={{top: 90, opacity: 0, left: '50%', translateX: '-50%'}}
                transition={{
                    top: { type: 'spring', stiffness: 100},
                    opacity: { duration: 0.2 },
                    left: { type: 'spring', stiffness: 150},
                    translateX: { type: 'spring', stiffness: 150}
                }}
                className={`font-bold absolute`}>
                {popupText.text}
                </motion.div>}
            </AnimatePresence>
        </>
    )
}

export default Popup