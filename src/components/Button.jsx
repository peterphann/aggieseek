import {motion} from "framer-motion";

const Button = ({ children, className, ...props }) => {
  return (
      <motion.div
          className={"inline-block"}
          whileHover={!props.disabled && {translateY: '3%'}}>
        <button
            className={`transition-transform ease-in-out duration-100 px-6 py-2 bg-[#8d0509] shadow-lg text-white font-bold disabled:bg-[#e45c5c] disabled:cursor-not-allowed ${!props.disabled && "active:scale-95"} ${className}`}
            {...props}>
          {children}
        </button>
      </motion.div>
  );
}

export default Button;