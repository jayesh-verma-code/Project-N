import { motion } from "framer-motion";

interface SectionHeaderProps {
  isInView: boolean;
}

export function SectionHeader({ isInView }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-6 text-white">
        Our Leadership Team
      </h2>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-2">
        Meet the visionaries behind NIRVEON&apos;S who are dedicated to
        revolutionizing healthcare through innovation.
      </p>
    </motion.div>
  );
}
