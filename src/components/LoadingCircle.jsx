import { LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";

const LoadingCircle = ({ className }) => {
  return (
    <motion.div animate={{ rotate: 360 }} transition={{ ease: 'linear', repeat: Infinity, duration: 1 }}>
      <LoaderCircle className={className} />
    </motion.div>
  );
}

export default LoadingCircle;