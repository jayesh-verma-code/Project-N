"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { AnimatedCharacter } from "@/components/Hero/AnimatedCharacter";
import { AnimatedLogo } from "@/components/Hero/AnimatedLogo";
import { CTAButtons } from "@/components/Hero/CallToAction";
import { ClerkProvider } from "@clerk/nextjs";


// Extracted constants
const TITLE_TEXT = "NirveonX";
const SUBTITLE_TEXT = "One AI, Infinite Care – Health, Wellness & Beyond.";
const DESCRIPTION =
  "Experience the future of healthcare with our AI-powered platform that provides personalized wellness solutions tailored to your unique needs.";

// Spring configuration for smoother animations
const SPRING_CONFIG = { damping: 30, stiffness: 400, mass: 1 };

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse tracking with spring motion
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseXSpring = useSpring(0, SPRING_CONFIG);
  const mouseYSpring = useSpring(0, SPRING_CONFIG);

  // Scroll progress animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Mouse tracking effect
  useEffect(() => {
    interface MousePosition {
      x: number;
      y: number;
    }

    const handleMouseMove = (e: MouseEvent): void => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y } as MousePosition);

      // Calculate normalized position (-1 to 1)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const normalizedX = (x - centerX) / centerX;
      const normalizedY = (y - centerY) / centerY;

      mouseXSpring.set(normalizedX);
      mouseYSpring.set(normalizedY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseXSpring, mouseYSpring]);

  // Text animation reveal
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
    >
      {/* Background gradients with parallax effect */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-gray-800/20 to-transparent opacity-30"
          style={{
            x: useTransform(mouseXSpring, [-1, 1], [-20, 20]),
            y: useTransform(mouseYSpring, [-1, 1], [-20, 20]),
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-radial from-gray-800/20 to-transparent opacity-30"
          style={{
            x: useTransform(mouseXSpring, [-1, 1], [20, -20]),
            y: useTransform(mouseYSpring, [-1, 1], [20, -20]),
          }}
        />
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center max-w-4xl"
        style={{ scale }}
      >
        {/* Logo */}
        <AnimatedLogo cloudinaryUrl="https://res.cloudinary.com/dqqyuvg1v/image/upload/v1741797055/favicon_wlxa7n.ico" />

        {/* Title with character-by-character animation */}
        <div className={`split-text ${isVisible ? "split-text-visible" : ""}`}>
          {TITLE_TEXT.split("").map((char, index) => (
            <AnimatedCharacter
              key={index}
              char={char}
              index={index}
              className="text-5xl md:text-7xl font-bold"
              baseDelay={0}
            />
          ))}
        </div>

        {/* Subtitle with character-by-character animation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-2xl text-center mb-8 max-w-2xl mx-auto mt-6"
        >
          {SUBTITLE_TEXT.split("").map((char, index) => (
            <AnimatedCharacter
              key={index}
              char={char}
              index={index}
              baseDelay={0.8}
            />
          ))}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-gray-400 mb-10 max-w-3xl mx-auto"
        >
          {DESCRIPTION}
        </motion.p>

        {/* Call-to-action buttons */}
        <ClerkProvider>
        <CTAButtons
          buttonHovered={buttonHovered}
          setButtonHovered={setButtonHovered}
        />
        </ClerkProvider>
       
      </motion.div>
    </section>
  );
}
