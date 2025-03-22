"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

export default function VerticalMenuIndicator() {
  const { scrollYProgress } = useScroll()
  const [activeSection, setActiveSection] = useState("home")
  const [isHovered, setIsHovered] = useState(false)
  const [showLabels, setShowLabels] = useState(false)
  const menuRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

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
    { id: "pioneer", label: "Pioneers", position: "55%" },
    { id: "faq", label: "FAQ", position: "70%" },
    { id: "contact", label: "Contact", position: "90%" },
  ]

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Update active section based on scroll with IntersectionObserver
  useEffect(() => {
    if (isMobile) return // Skip observer setup on mobile
    
    interface Observer {
      observer: IntersectionObserver;
      element: Element;
    }
    const observers: Observer[] = [];
    
    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (!element) return
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id)
            }
          })
        },
        { 
          threshold: 0.3,
          rootMargin: "-20% 0px -20% 0px" 
        }
      )
      
      observer.observe(element)
      observers.push({ observer, element })
    })
    
    return () => {
      observers.forEach(({ observer, element }) => {
        observer.unobserve(element)
      })
    }
  }, [isMobile])

  // Handle click to scroll to section
  interface ScrollToSectionParams {
    id: string;
  }

  const scrollToSection = (id: ScrollToSectionParams['id']): void => {
    const element: HTMLElement | null = document.getElementById(id)
    if (element) {
      const yOffset: number = -50 // Offset for fixed headers if needed
      const y: number = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    if (isMobile) return // Skip keyboard navigation on mobile
    
    interface KeyboardEvent {
      key: string;
      preventDefault: () => void;
    }

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (!isHovered && !showLabels) return
      
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault()
      const currentIndex: number = sections.findIndex(section => section.id === activeSection)
      const nextIndex: number = e.key === "ArrowUp" 
        ? Math.max(0, currentIndex - 1) 
        : Math.min(sections.length - 1, currentIndex + 1)
      
      scrollToSection(sections[nextIndex].id)
      }
      
      if (e.key === "Enter" && activeSection) {
      scrollToSection(activeSection)
      }
    }
    
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeSection, isHovered, showLabels, isMobile])

  // Don't render the menu on mobile devices
  if (isMobile) {
    return null
  }

  return (
    <div
      ref={menuRef}
      className="fixed left-4 top-0 h-screen flex items-center z-40"
      onMouseEnter={() => {
        setIsHovered(true)
        setShowLabels(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setTimeout(() => setShowLabels(false), 300)
      }}
      aria-label="Navigation menu"
      role="navigation"
    >
      {/* Container */}
      <div className="relative h-[70%] w-[3px] bg-white/10 rounded-full">
        {/* Active section indicator */}
        <motion.div
          className="absolute w-2 h-2 bg-white rounded-full -left-[2px]"
          style={{ top: indicatorY }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }}
        />

        {/* Section dots */}
        {sections.map((section) => (
          <motion.button
            key={section.id}
            className="-left-[6px] absolute w-5 h-5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 focus-visible:ring-2 focus-visible:ring-white"
            style={{ top: section.position }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection(section.id)}
            onHoverStart={() => {
              setIsHovered(true)
              setShowLabels(true)
            }}
            aria-label={`Navigate to ${section.label}`}
            aria-current={activeSection === section.id ? "page" : undefined}
          >
            <motion.span
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ease-out ${activeSection === section.id ? "bg-white scale-110" : "bg-white/30"}`}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
            />
          </motion.button>
        ))}

        {/* Section labels */}
        <AnimatePresence>
          {showLabels && (
            <motion.div
              className="absolute left-8 top-0 h-full flex flex-col justify-between items-start pointer-events-none"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {sections.map((section) => (
                <motion.div
                  key={section.id}
                  className="flex items-center gap-2"
                  style={{
                    position: "absolute",
                    top: section.position,
                    transform: 'translateY(-50%)',
                  }}
                >
                  <motion.span
                    className={`text-sm font-medium py-1 px-2 rounded-md backdrop-blur-sm ${
                      activeSection === section.id 
                        ? "text-white bg-white/10" 
                        : "text-white/70"
                    }`}
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                  >
                    {section.label}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse animation for active section */}
        <motion.div
          className="absolute w-4 h-4 -left-[6px] rounded-full bg-white/20 z-[-1]"
          style={{ top: indicatorY }}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Animated gradient line */}
        <motion.div
          className="absolute w-[3px] h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-0 rounded-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 0.5 : 0,
            top: ["0%", "100%", "0%"],
          }}
          transition={{
            opacity: { duration: 0.3 },
            top: {
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
              repeatType: "mirror",
            },
          }}
        />
      </div>
    </div>
  )
}