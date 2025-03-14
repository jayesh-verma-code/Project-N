import { motion } from "framer-motion";

export const AnimatedCharacter = ({ char, index, baseDelay = 0, className = "" }: { char: string; index: number; baseDelay?: number; className?: string }) => (
    <motion.span
      key={index}
      className={`split-text-char inline-block ${className}`}
      style={{
        transitionDelay: `${baseDelay + index * 0.03}s`,
        transitionDuration: "0.8s",
      }}
    >
      {char}
    </motion.span>
  );