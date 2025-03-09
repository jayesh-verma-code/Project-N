"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView, useMotionValue, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Heart, Users, PawPrintIcon as Paw } from "lucide-react"

export default function ChatbotServices() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const services = [
    {
      title: "HealthMate",
      description: "AI-powered healthcare assistant for personalized health monitoring and advice.",
      icon: <Heart className="h-12 w-12 text-white" />,
      color: "from-white/10 to-white/5",
    },
    {
      title: "MindEase",
      description: "Mental health and hobby guide to help you relax, focus, and find balance.",
      icon: <Brain className="h-12 w-12 text-white" />,
      color: "from-white/10 to-white/5",
    },
    {
      title: "GoldenCare",
      description: "Specialized elder care support for seniors and their caregivers.",
      icon: <Users className="h-12 w-12 text-white" />,
      color: "from-white/10 to-white/5",
    },
    {
      title: "PetAI",
      description: "Virtual veterinary assistant for all your pet health and wellness needs.",
      icon: <Paw className="h-12 w-12 text-white" />,
      color: "from-white/10 to-white/5",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="services" className="py-24 px-4 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-30" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-30" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Our AI Chatbot Services</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our suite of AI-powered health and wellness solutions designed to provide personalized care for
            every aspect of your life.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              isActive={activeIndex === index}
              setActive={setActiveIndex}
              variants={itemVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

interface ServiceCardProps {
  service: {
    title: string
    description: string
    icon: React.ReactNode
    color: string
  }
  index: number
  isActive: boolean
  setActive: (index: number | null) => void
  variants: {
    hidden: { y: number; opacity: number }
    visible: {
      y: number
      opacity: number
      transition: { duration: number; ease: string }
    }
  }
}

function ServiceCard({ service, index, isActive, setActive, variants }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [5, -5])
  const rotateY = useTransform(x, [-100, 100], [-5, 5])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setActive(null)
  }

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setActive(index)}
      className="cursor-hover-trigger"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ z: 10 }}
      >
        <Card className="bg-black/50 border-white/10 backdrop-blur-sm transition-all duration-300 h-full flex flex-col overflow-hidden relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
            animate={{
              opacity: isActive ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          <CardHeader className="pb-2 relative z-10">
            <motion.div
              className="mb-4 p-3 rounded-full w-fit bg-black/50"
              animate={{
                scale: isActive ? 1.1 : 1,
                rotate: isActive ? [0, 5, -5, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                rotate: {
                  repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                  repeatType: "loop",
                  duration: 2,
                },
              }}
            >
              {service.icon}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isActive ? [1, 1.5, 1] : 0,
                  opacity: isActive ? [0.5, 0, 0] : 0,
                }}
                transition={{
                  duration: 1,
                  repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                }}
              />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-white">{service.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow relative z-10">
            <CardDescription className="text-gray-400 text-base">{service.description}</CardDescription>
          </CardContent>
          <CardFooter className="relative z-10">
            <Button
              className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 text-white border border-white/20 group overflow-hidden`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Get Started</span>
              <motion.span
                className="absolute inset-0 bg-white/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </CardFooter>

          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-white"
            initial={{ width: "0%" }}
            animate={{ width: isActive ? "100%" : "0%" }}
            transition={{ duration: 0.5 }}
          />
        </Card>
      </motion.div>
    </motion.div>
  )
}

