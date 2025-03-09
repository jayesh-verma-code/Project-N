"use client"

import { motion } from "framer-motion"

export default function MarqueeText() {
  const text = "NIRVEON'X • AI-POWERED HEALTH • WELLNESS BEYOND IMAGINATION • FUTURE OF HEALTHCARE • "
  const repeatedText = text.repeat(3)

  return (
    <div className="relative py-6 bg-black/50 overflow-hidden border-y border-white/10">
      <div className="marquee">
        <motion.div
          className="marquee-content text-4xl font-bold text-white/20"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 20,
            ease: "linear",
          }}
        >
          {repeatedText}
        </motion.div>
      </div>
    </div>
  )
}

