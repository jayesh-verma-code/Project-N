"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [step, setStep] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (step < 3) {
          setStep(step + 1);
        } else {
          onComplete();
        }
      },
      step === 0 ? 1000 : step === 1 ? 2000 : 2000
    );

    return () => clearTimeout(timer);
  }, [step, onComplete]);

  useEffect(() => {
    if (step === 1) {
      setTimeout(() => setTextVisible(true), 300);

      // Add glitch effect periodically
      const glitchInterval = setInterval(() => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }, 2000);

      return () => clearInterval(glitchInterval);
    }
  }, [step]);

  const logoVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    exit: {
      scale: 1.5,
      opacity: 0,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: "blur(10px)",
      transition: {
        duration: 0.5,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const titleText = "NirveonX";
  const taglineText = "One AI, Infinite Care – Health, Wellness & Beyond.";

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <AnimatePresence>
        {step === 0 && (
          <motion.div
            key="logo"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <motion.circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <motion.path
                  d="M40 60L55 75L85 45"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>
            <motion.div
              className="absolute -inset-4"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(255, 255, 255, 0)",
                  "0 0 0 10px rgba(255, 255, 255, 0.1)",
                  "0 0 0 20px rgba(255, 255, 255, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div
              className={`mb-4 ${glitchActive ? "glitch" : ""}`}
              data-text="NIRVEON'X"
            >
              <motion.div
                variants={textContainerVariants}
                initial="hidden"
                animate={textVisible ? "visible" : "hidden"}
                className="flex justify-center flex-wrap"
              >
                {titleText.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className="text-4xl md:text-5xl font-bold inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-lg md:text-xl text-white typing overflow-hidden whitespace-nowrap"
            >
              {taglineText}
            </motion.p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="particles"
            className="absolute inset-0 overflow-hidden"
          >
            <div className="absolute inset-0">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, Math.random() * 1.5 + 0.5, 0],
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    rotate: [0, Math.random() * 360],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                  }}
                  className="absolute w-2 h-2 rounded-full bg-white"
                />
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center text-white text-lg sm:text-xl">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="shimmer"
                >
                  <h3>Welcome to Future of HealthCare !</h3>
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
