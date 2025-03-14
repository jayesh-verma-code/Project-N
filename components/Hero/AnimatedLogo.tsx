"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

export const AnimatedLogo = ({ cloudinaryUrl }: { cloudinaryUrl: string }) => {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      scale: 1,
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
    });
  }, [controls]);

  const containerVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.02, 1],
      opacity: [0.7, 1, 0.7],
      boxShadow: [
        "0 0 0 0px rgba(255, 255, 255, 0.2)",
        "0 0 0 10px rgba(255, 255, 255, 0)",
        "0 0 0 0px rgba(255, 255, 255, 0.2)",
      ],
    },
  };

  const logoVariants = {
    initial: { scale: 0.8, rotate: -10 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    hover: {
      scale: 1.05,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const cornerVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="mb-6 mx-auto"
    >
      <div className="relative w-32 h-32 mx-auto mb-6">
        {/* Outer glowing effect */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-white/30"
          variants={pulseVariants}
          animate="animate"
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Main container with glass effect */}
        <motion.div
          className="absolute inset-2 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* Logo container with hover effect */}
          <motion.div
            className="relative w-20 h-20 flex items-center justify-center"
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src={cloudinaryUrl}
              alt="Company Logo"
              className="w-16 h-16 object-contain"
              style={{
                filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Enhanced corner accents */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4"
            custom={i}
            variants={cornerVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div
              className="w-full h-full border-2 border-white/80"
              style={{
                position: "absolute",
                borderRadius: "2px",
                borderWidth: "2px 0 0 2px",
                transform: `rotate(${i * 90}deg)`,
                top: i < 2 ? -2 : "auto",
                bottom: i >= 2 ? -2 : "auto",
                left: i % 2 === 0 ? -2 : "auto",
                right: i % 2 === 1 ? -2 : "auto",
              }}
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.2,
              }}
            />
          </motion.div>
        ))}

        {/* Subtle rotating background effect */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background:
              "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
            filter: "blur(8px)",
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </motion.div>
  );
};
