"use client"

import { motion, type MotionValue } from "framer-motion"

interface ScrollProgressProps {
  scrollYProgress: MotionValue<number>
}

export default function ScrollProgress({ scrollYProgress }: ScrollProgressProps) {
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
}