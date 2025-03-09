"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowDown } from "lucide-react"

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [buttonHovered, setButtonHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Enhanced spring motion for smoother parallax
  const springConfig = { damping: 30, stiffness: 400, mass: 1 } // More natural spring
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const rect = ref.current?.getBoundingClientRect()

      if (rect) {
        const x = clientX - rect.left
        const y = clientY - rect.top
        setMousePosition({ x, y })

        // Calculate mouse position relative to the center of the container
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        // Update motion values
        mouseX.set((x - centerX) / centerX)
        mouseY.set((y - centerY) / centerY)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // Split text animation
  const [isVisible, setIsVisible] = useState(false)
  // Smoother text reveal animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Text to split
  const titleText = "NirveonX"
  const subtitleText = "One AI, Infinite Care – Health, Wellness & Beyond."

  return (
    <section
      id="home"
      ref={ref}
      className="h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
    >
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

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center max-w-4xl"
        style={{ scale }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 mx-auto"
          style={{
            rotateX: useTransform(mouseYSpring, [-1, 1], [10, -10]),
            rotateY: useTransform(mouseXSpring, [-1, 1], [-10, 10]),
          }}
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
              animate={{
                rotate: [0, 360],
              }}
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

        <div className={`split-text ${isVisible ? "split-text-visible" : ""}`}>
          {titleText.split("").map((char, index) => (
            <motion.span
              key={index}
              className="split-text-char text-5xl md:text-7xl font-bold inline-block"
              style={{
                transitionDelay: `${index * 0.04}s`, // Slightly faster for smoother appearance
                transitionDuration: "0.8s", // Longer duration for smoother motion
                textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-2xl text-center mb-8 max-w-2xl mx-auto mt-6"
        >
          {subtitleText.split("").map((char, index) => (
            <motion.span
              key={index}
              className="split-text-char inline-block"
              style={{
                transitionDelay: `${0.8 + index * 0.02}s`,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-gray-400 mb-10 max-w-3xl mx-auto"
        >
          Experience the future of healthcare with our AI-powered platform that provides personalized wellness solutions
          tailored to your unique needs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setButtonHovered(true)}
            onHoverEnd={() => setButtonHovered(false)}
            className="relative"
          >
            <Button
              size="lg"
              className="bg-white hover:bg-gray-200 text-black px-8 py-6 text-lg relative z-10 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                Get Started
                <motion.span
                  animate={buttonHovered ? { x: [0, 5, 0] } : {}}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                >
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.span>
              </span>
              <motion.span
                className="absolute inset-0 bg-gray-200 z-0"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </Button>
            <motion.div
              className="absolute -inset-1 bg-white/20 rounded-lg blur-sm"
              animate={{
                opacity: buttonHovered ? 1 : 0,
                scale: buttonHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 hover:bg-white/10 text-white px-8 py-6 text-lg relative overflow-hidden group"
            >
              <span className="relative z-10">Learn More</span>
              <motion.span
                className="absolute inset-0 bg-white/10 z-0"
                initial={{ y: "-100%" }}
                whileHover={{ y: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

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
    </section>
  )
}

