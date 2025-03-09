"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView, useMotionValue, useTransform, Variants } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, BarChart, Clock, Users, Globe } from "lucide-react"

export default function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const features = [
    {
      title: "AI-Powered Diagnostics",
      description:
        "Advanced algorithms analyze symptoms and provide preliminary health assessments with high accuracy.",
      icon: <Zap className="h-10 w-10 text-white" />,
      delay: 0.1,
    },
    {
      title: "Personalized Health Plans",
      description: "Custom wellness programs tailored to your unique health profile, goals, and preferences.",
      icon: <Users className="h-10 w-10 text-white" />,
      delay: 0.2,
    },
    {
      title: "Real-time Monitoring",
      description: "Continuous tracking of vital health metrics with instant alerts for any concerning changes.",
      icon: <BarChart className="h-10 w-10 text-white" />,
      delay: 0.3,
    },
    {
      title: "24/7 Virtual Support",
      description: "Round-the-clock access to AI health assistants for immediate guidance and support.",
      icon: <Clock className="h-10 w-10 text-white" />,
      delay: 0.4,
    },
    {
      title: "Global Health Network",
      description: "Connect with healthcare providers worldwide for specialized consultations and treatments.",
      icon: <Globe className="h-10 w-10 text-white" />,
      delay: 0.5,
    },
    {
      title: "Secure Data Protection",
      description: "Military-grade encryption ensures your health data remains private and protected.",
      icon: <Shield className="h-10 w-10 text-white" />,
      delay: 0.6,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="features" className="py-24 px-4 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-30" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-30" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Revolutionary Features</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how NIRVEON&apos;X is transforming healthcare with cutting-edge AI technology and innovative
            solutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              isHovered={hoveredCard === index}
              setHovered={setHoveredCard}
              variants={itemVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  feature: {
    title: string
    description: string
    icon: React.ReactNode
    delay: number
  }
  index: number
  isHovered: boolean
  setHovered: (index: number | null) => void
  variants: Variants
}

// Update the FeatureCard component for smoother transformations
function FeatureCard({ feature, index, isHovered, setHovered, variants }: FeatureCardProps) {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smoother rotations with better range constraints
  const rotateX = useTransform(y, [-100, 100], [8, -8]) // Reduced range for subtler effect
  const rotateY = useTransform(x, [-100, 100], [-8, 8]) // Reduced range for subtler effect

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = (cardRef.current as HTMLElement).getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Smoother tracking with damping
    const newX = e.clientX - centerX
    const newY = e.clientY - centerY

    // Apply smoother changes using spring physics
    x.set(newX * 0.8) // Reduce multiplier for less extreme movement
    y.set(newY * 0.8) // Reduce multiplier for less extreme movement
  }

  const handleMouseLeave = () => {
    // Smooth reset
    x.set(0)
    y.set(0)
    setHovered(null)
  }

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      transition={{ delay: feature.delay, duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setHovered(index)}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className="cursor-hover-trigger"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{
          duration: 0.4,
          ease: [0.33, 1, 0.68, 1], // Cubic bezier for smoother motion
        }}
        className="h-full"
      >
        <Card className="bg-black/50 border-white/10 backdrop-blur-sm transition-all duration-300 h-full overflow-hidden relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.95,
            }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          />

          <CardHeader>
            <motion.div
              className="mb-4 p-3 rounded-full w-fit bg-black/50 relative overflow-hidden"
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? [0, 5, -5, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1],
                rotate: {
                  repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                  repeatType: "loop",
                  duration: 2,
                  ease: "easeInOut", // Smoother icon rotation
                },
              }}
            >
              {feature.icon}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isHovered ? [1, 1.5, 1] : 0,
                  opacity: isHovered ? [0.5, 0, 0] : 0,
                }}
                transition={{
                  duration: 1.5, // Longer duration for smoother effect
                  repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                  ease: "easeInOut", // Smoother pulse
                }}
              />
            </motion.div>

            <CardTitle className="text-2xl font-bold text-white">{feature.title}</CardTitle>
          </CardHeader>

          <CardContent>
            <CardDescription className="text-gray-400 text-base">{feature.description}</CardDescription>
          </CardContent>

          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-white"
            initial={{ width: "0%" }}
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          />
        </Card>
      </motion.div>
    </motion.div>
  )
}

