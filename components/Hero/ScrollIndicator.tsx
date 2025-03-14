import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export const ScrollIndicator = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.6 }}
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-hover-trigger"
      whileHover={{ scale: 1.1 }}
    >
      <motion.a
        href="#features"
        className="text-gray-400 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      >
        <span className="mb-2">Scroll Down</span>
        <ArrowDown className="h-5 w-5" />
      </motion.a>
    </motion.div>
  );