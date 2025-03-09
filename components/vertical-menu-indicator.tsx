"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function VerticalMenuIndicator() {
  const { scrollYProgress } = useScroll()
  const [activeSection, setActiveSection] = useState("home")
  const [isHovered, setIsHovered] = useState(false)
  const [showLabels, setShowLabels] = useState(false)

  // Map scrollYProgress to an indicator position
  const indicatorY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
    ["10%", "25%", "40%", "55%", "70%", "85%", "90%"],
  )

  const sections = [
    { id: "home", label: "Home", position: "10%" },
    { id: "features", label: "Features", position: "25%" },
    { id: "services", label: "Services", position: "40%" },
    { id: "testimonials", label: "Testimonials", position: "55%" },
    { id: "faq", label: "FAQ", position: "70%" },
    { id: "contact", label: "Contact", position: "90%" },
  ]

  // Update active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.body.scrollHeight

      // Calculate which section is in view
      sections.forEach((section) => {
        const sectionElement = document.getElementById(section.id)
        if (sectionElement) {
          const sectionTop = sectionElement.offsetTop
          const sectionHeight = sectionElement.offsetHeight

          if (
            scrollPosition >= sectionTop - windowHeight / 3 &&
            scrollPosition < sectionTop + sectionHeight - windowHeight / 3
          ) {
            setActiveSection(section.id)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className="fixed left-4 top-0 h-screen flex items-center z-40 pointer-events-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setTimeout(() => setShowLabels(false), 300)
      }}
    >
      {/* Vertical line */}
      <div className="h-[70%] w-0.5 bg-white/10 rounded-full relative pointer-events-auto">
        {/* Active section indicator */}
        <motion.div
          className="absolute w-1.5 h-1.5 bg-white rounded-full -left-[2px]"
          style={{ top: indicatorY }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        />

        {/* Section dots */}
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            className={`absolute w-4 h-4 -left-1.5 pointer-events-auto cursor-hover-trigger flex items-center justify-center`}
            style={{ top: section.position }}
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              const element = document.getElementById(section.id)
              if (element) {
                element.scrollIntoView({ behavior: "smooth" })
              }
            }}
            onHoverStart={() => {
              setIsHovered(true)
              setShowLabels(true)
            }}
          >
            <motion.span
              className={`w-1.5 h-1.5 rounded-full ${activeSection === section.id ? "bg-white" : "bg-white/30"}`}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
            />
          </motion.button>
        ))}

        {/* Section labels */}
        <motion.div
          className="absolute left-6 top-0 h-full flex flex-col justify-between items-start pointer-events-none"
          initial={false}
          animate={{
            opacity: showLabels ? 1 : 0,
            x: showLabels ? 0 : -10,
          }}
          transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
        >
          {sections.map((section) => (
            <motion.span
              key={section.id}
              className={`text-sm font-medium py-1 ${activeSection === section.id ? "text-white" : "text-white/50"}`}
              style={{
                position: "absolute",
                top: section.position,
                transform: "translateY(-50%)",
              }}
            >
              {section.label}
            </motion.span>
          ))}
        </motion.div>

        {/* Animated glow effect */}
        <motion.div
          className="absolute w-0.5 h-[70%] bg-gradient-to-b from-transparent via-white to-transparent opacity-0 rounded-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 0.8 : 0,
            top: ["0%", "30%", "0%"],
          }}
          transition={{
            opacity: { duration: 0.3 },
            top: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 2.5,
              ease: "easeInOut",
              repeatType: "mirror",
            },
          }}
        />
      </div>
    </div>
  )
}

