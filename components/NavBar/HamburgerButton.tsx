import { ANIMATIONS } from "@/sections/marginals/navbar";
import { motion } from "framer-motion";

export const HamburgerButton = ({
  isOpen,
  toggleMenu,
}: {
  isOpen: boolean;
  toggleMenu: () => void;
}) => (
  <motion.button
    onClick={toggleMenu}
    className="relative w-12 h-12 rounded-full flex items-center justify-center cursor-hover-trigger"
    whileTap={{ scale: 0.9 }}
    aria-label="Menu"
  >
    <svg width="36" height="36" viewBox="0 0 36 36">
      <motion.circle
        cx="18"
        cy="18"
        r="16"
        fill="none"
        stroke="white"
        strokeWidth="1"
        variants={ANIMATIONS.circle}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        strokeDasharray="100"
      />
    </svg>

    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1.5">
      <motion.div
        className="w-6 h-0.5 bg-white"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 2 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="w-6 h-0.5 bg-white"
        animate={{
          opacity: isOpen ? 0 : 1,
          x: isOpen ? -20 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="w-6 h-0.5 bg-white"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -2 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      />
    </div>
  </motion.button>
);
