import { motion } from "framer-motion";

export const AnimatedLogo = () => (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mb-6 mx-auto"
    >
      <div className="relative w-24 h-24 mx-auto mb-6">
        <motion.div
          className="absolute inset-0 rounded-full bg-white animate-pulse-ring opacity-50"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
        <motion.div
          className="absolute inset-2 rounded-full bg-black flex items-center justify-center"
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M30 10C18.954 10 10 18.954 10 30C10 41.046 18.954 50 30 50C41.046 50 50 41.046 50 30C50 18.954 41.046 10 30 10ZM30 15C38.284 15 45 21.716 45 30C45 38.284 38.284 45 30 45C21.716 45 15 38.284 15 30C15 21.716 21.716 15 30 15Z"
              fill="white"
            />
            <path
              d="M30 20C24.477 20 20 24.477 20 30C20 35.523 24.477 40 30 40C35.523 40 40 35.523 40 30C40 24.477 35.523 20 30 20ZM30 25C32.761 25 35 27.239 35 30C35 32.761 32.761 35 30 35C27.239 35 25 32.761 25 30C25 27.239 27.239 25 30 25Z"
              fill="white"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );