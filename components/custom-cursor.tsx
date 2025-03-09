"use client"

import { useEffect, useState, type RefObject } from "react"
import { motion } from "framer-motion"

interface CustomCursorProps {
  containerRef: RefObject<HTMLDivElement>
}

export default function CustomCursor({ containerRef }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", mouseMove)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-hover-trigger")
      ) {
        setCursorVariant("hover")
      } else {
        setCursorVariant("default")
      }
    }

    const container = containerRef.current
    container.addEventListener("mouseover", handleMouseOver)

    return () => {
      container.removeEventListener("mouseover", handleMouseOver)
    }
  }, [containerRef])

  const variants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
      transition: {
        type: "spring",
        mass: 0.1,
        damping: 22,
        stiffness: 800,
      },
    },
    hover: {
      x: mousePosition.x,
      y: mousePosition.y,
      height: 80,
      width: 80,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      mixBlendMode: "difference" as const,
      transition: {
        type: "spring",
        mass: 0.1,
        damping: 22,
        stiffness: 800,
      },
    },
  }

  const dotVariants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
      opacity: 1,
      transition: {
        type: "spring",
        mass: 0.1,
        damping: 30,
        stiffness: 800,
      },
    },
    hover: {
      x: mousePosition.x,
      y: mousePosition.y,
      opacity: 0,
      transition: {
        type: "spring",
        mass: 0.1,
        damping: 30,
        stiffness: 800,
      },
    },
  }

  return (
    <>
      <motion.div className="cursor-outline" variants={variants} animate={cursorVariant} />
      <motion.div className="cursor-dot" variants={dotVariants} animate={cursorVariant} />
    </>
  )
}

