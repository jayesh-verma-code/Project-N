"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Healthcare Professional",
      avatar: "/placeholder.svg?height=80&width=80",
      content:
        "NIRVEON'X has revolutionized how I provide care to my patients. The AI diagnostics are remarkably accurate, and the personalized health plans have significantly improved patient outcomes.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Fitness Enthusiast",
      avatar: "/placeholder.svg?height=80&width=80",
      content:
        "As someone who takes fitness seriously, I've tried many health apps, but NIRVEON'X is in a league of its own. The real-time monitoring and personalized workout suggestions have helped me achieve my goals faster than ever.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Busy Parent",
      avatar: "/placeholder.svg?height=80&width=80",
      content:
        "With three kids and a full-time job, I never had time to focus on my health. NIRVEON'X changed that by making health management effortless. The 24/7 support is a lifesaver for my family!",
      rating: 4,
    },
    {
      name: "David Thompson",
      role: "Senior Citizen",
      avatar: "/placeholder.svg?height=80&width=80",
      content:
        "At my age, health concerns are a priority. NIRVEON'X's GoldenCare has been an incredible support system. The medication reminders and easy-to-understand health insights have given me peace of mind.",
      rating: 5,
    },
  ]

  const handlePrev = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.5,
      },
    }),
  }

  return (
    <section id="testimonials" className="py-24 px-4 relative overflow-hidden" ref={ref}>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">What Our Users Say</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how NIRVEON&apos;X is transforming lives and improving health outcomes for people around the world.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          <div className="flex justify-center overflow-hidden relative h-[400px]">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute max-w-3xl w-full"
              >
                <Card className="bg-black/50 border-white/10 backdrop-blur-sm shadow-lg overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-6">
                      {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                        >
                          <Star className="h-6 w-6 text-white fill-white" />
                        </motion.div>
                      ))}
                      {Array.from({ length: 5 - testimonials[activeIndex].rating }).map((_, i) => (
                        <Star key={i} className="h-6 w-6 text-gray-600" />
                      ))}
                    </div>
                    <motion.p
                      className="text-xl text-center italic mb-8 relative"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <span className="absolute -left-4 top-0 text-4xl text-white/20">.</span>
                      {testimonials[activeIndex].content}
                      <span className="absolute -right-4 bottom-0 text-4xl text-white/20">.</span>
                    </motion.p>
                  </CardContent>
                  <CardFooter className="flex flex-col items-center pb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                    >
                      <Avatar className="h-16 w-16 mb-4 ring-2 ring-white">
                        <AvatarImage src={testimonials[activeIndex].avatar} alt={testimonials[activeIndex].name} />
                        <AvatarFallback>{testimonials[activeIndex].name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                    >
                      <h4 className="text-lg font-semibold">{testimonials[activeIndex].name}</h4>
                      <p className="text-gray-400">{testimonials[activeIndex].role}</p>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                className="rounded-full border-white/20 hover:bg-white/10 cursor-hover-trigger"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </motion.div>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1)
                    setActiveIndex(index)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 cursor-hover-trigger ${
                    activeIndex === index ? "bg-white scale-125" : "bg-gray-700"
                  }`}
                  whileHover={{ scale: 1.5 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="rounded-full border-white/20 hover:bg-white/10 cursor-hover-trigger"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

