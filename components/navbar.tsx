"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import Link from "next/link";

interface NavbarProps {
  scrolled: boolean;
}

export default function Navbar({ scrolled }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Close menu when resizing to desktop
  useEffect(() => {
    if (isDesktop && isOpen) {
      setIsOpen(false);
    }
  }, [isDesktop, isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#services", label: "Services" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  // Circular progress for hamburger
  const circleVariants = {
    open: {
      strokeDashoffset: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    closed: {
      strokeDashoffset: 100,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  // Menu variants
  const menuVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
    closed: {
      x: "-100%",
      opacity: 0.3,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    closed: {
      x: -50,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <div ref={containerRef}>
      <motion.nav
        style={{ opacity }}
        className={`fixed top-0 left-0 right-0 z-50 px-4 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-black/80 backdrop-blur-lg border-b border-white/10"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="#home">
              <motion.div
                className="flex items-center space-x-2 cursor-hover-trigger"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center relative overflow-hidden"
                  whileHover={{
                    rotate: 180,
                    transition: { duration: 0.5, ease: "circOut" },
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white to-gray-300"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                  <span className="font-bold text-black relative z-10">N</span>
                </motion.div>
                <span className="text-xl font-bold tracking-tight text-white">
                  NirveonX
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  isHovered={hoveredItem === item.href}
                  onHover={() => setHoveredItem(item.href)}
                  onLeave={() => setHoveredItem(null)}
                />
              ))}
            </div>
            <motion.div
              className="ml-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-white text-black hover:bg-gray-200 relative overflow-hidden group max-md:hidden">
                <span className="relative z-10">Get Started</span>
                <motion.span
                  className="absolute inset-0 bg-gray-300"
                  initial={{ y: "100%" }}
                  whileHover={{ y: "0%" }}
                  transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                />
              </Button>
            </motion.div>

            {/* Hamburger Menu */}
            <div className="md:hidden">
              <motion.button
                onClick={toggleMenu}
                className="relative w-12 h-12 rounded-full flex items-center justify-center cursor-hover-trigger"
                whileTap={{ scale: 0.9 }}
                aria-label="Menu"
              >
                <svg width="36" height="36" viewBox="0 0 36 36">
                  <motion.circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                    variants={circleVariants}
                    initial="closed"
                    animate={isOpen ? "open" : "closed"}
                    strokeDasharray="100"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1.5">
                  <motion.div
                    className="w-6 h-0.5 bg-white"
                    animate={{
                      rotate: isOpen ? 45 : 0,
                      y: isOpen ? 2 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                  />
                  <motion.div
                    className="w-6 h-0.5 bg-white"
                    animate={{
                      opacity: isOpen ? 0 : 1,
                      x: isOpen ? -20 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                  />
                  <motion.div
                    className="w-6 h-0.5 bg-white"
                    animate={{
                      rotate: isOpen ? -45 : 0,
                      y: isOpen ? -2 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-lg flex md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          >
            <motion.div
              className="w-full h-full p-8 pt-28 flex flex-col"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex flex-col space-y-6 mb-10">
                {navItems.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={itemVariants}
                    className="overflow-hidden"
                  >
                    <motion.a
                      href={item.href}
                      className="text-3xl font-bold text-white hover:text-gray-300 transition-colors inline-block relative"
                      onClick={() => setIsOpen(false)}
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                      <motion.div
                        className="absolute left-0 bottom-0 h-0.5 bg-white"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.a>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={itemVariants} className="mt-auto">
                <Button
                  className="w-full bg-white text-black hover:bg-gray-200 py-6 text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-8 flex justify-center space-x-6"
              >
                {["Twitter", "Instagram", "LinkedIn"].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {social}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function NavLink({ href, label, isHovered, onHover, onLeave }: NavLinkProps) {
  return (
    <motion.div
      className="relative"
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <a
        href={href}
        className="px-4 py-2 text-sm text-white relative cursor-hover-trigger"
      >
        {label}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
          initial={{ width: 0, left: "50%", x: "-50%" }}
          animate={{
            width: isHovered ? "100%" : 0,
          }}
          transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
        />
      </a>
    </motion.div>
  );
}
