import { motion } from "framer-motion";

export function SkeletonCard({ delay = 0 }) {
  return (
    <motion.div
      className="bg-gray-800/50 rounded-xl overflow-hidden shadow-lg h-64"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="h-full flex flex-col items-center justify-center p-6">
        <motion.div
          className="rounded-full bg-gray-700/50 h-24 w-24 mb-4"
          animate={{
            boxShadow: [
              "0 0 0px rgba(255,255,255,0.1)",
              "0 0 10px rgba(255,255,255,0.3)",
            ],
            opacity: [0.7, 0.5],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5,
          }}
        />
        <motion.div
          className="h-6 w-36 bg-gray-700/50 rounded mb-3"
          animate={{
            opacity: [0.7, 0.5],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5,
            delay: 0.2,
          }}
        />
        <motion.div
          className="h-4 w-24 bg-gray-700/50 rounded"
          animate={{
            opacity: [0.7, 0.5],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5,
            delay: 0.4,
          }}
        />
      </div>
    </motion.div>
  );
}
