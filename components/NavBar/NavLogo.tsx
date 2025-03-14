import { motion } from "framer-motion";
import Link from "next/link";

export const Logo = () => (
    <Link href="#home">
      <motion.div
        className="flex items-center space-x-2 cursor-hover-trigger"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center relative overflow-hidden"
          whileHover={{
            rotate: 180,
            transition: { duration: 0.5, ease: "circOut" },
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white to-gray-300"
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <img
            src="https://res.cloudinary.com/dqqyuvg1v/image/upload/v1741948683/Vector_z4x9e1.png"
            alt="NirveonX Logo"
            className="w-6 h-6 relative z-10"
          />
        </motion.div>
        <span className="text-xl font-bold tracking-tight text-white">
          NirveonX
        </span>
      </motion.div>
    </Link>
  );