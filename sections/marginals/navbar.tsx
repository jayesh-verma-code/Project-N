"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { NavLink } from "@/components/NavBar/NavLink";
import { Logo } from "@/components/NavBar/NavLogo";
import { HamburgerButton } from "@/components/NavBar/HamburgerButton";
import { MobileMenu } from "@/components/NavBar/MobileMenu";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

// Constants
export const NAV_ITEMS = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#services", label: "Services" },
  { href: "#founding", label: "Pioneers" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

// Animation variants
export const ANIMATIONS = {
  circle: {
    open: {
      strokeDashoffset: 0,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      strokeDashoffset: 100,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
  },
  menu: {
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
  },
  item: {
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
    },
    closed: {
      x: -50,
      opacity: 0,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
};

// Component types
export interface NavbarProps {
  scrolled: boolean;
}

export interface NavLinkProps {
  href: string;
  label: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

export default function Navbar({ scrolled }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

  // Close menu when resizing to desktop
  useEffect(() => {
    if (isDesktop && isOpen) {
      setIsOpen(false);
    }
  }, [isDesktop, isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

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
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  isHovered={hoveredItem === item.href}
                  onHover={() => setHoveredItem(item.href)}
                  onLeave={() => setHoveredItem(null)}
                />
              ))}
              {/* Theme toggle placeholder */}
            </div>
            <div className="flex flex-row gap-3">
              {/* Sign In Button */}
              <SignedOut>
                <motion.div
                  className=""
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-black text-white hover:bg-gray-800 relative overflow-hidden group max-md:hidden">
                    <SignInButton />
                  </Button>
                </motion.div>
              </SignedOut>

              {/* User Button when signed in */}
              <SignedIn>
                <motion.div
                  className=""
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-black text-white hover:bg-gray-800 relative overflow-hidden group max-md:hidden">
                    <UserButton showName 
                     appearance={{
                      elements: {
                        userButtonBox: "text-white",
                        userButtonText: "text-white",
                        userButtonOuterIdentifier: "text-white",
                        userButtonTrigger: "text-white"
                      }
                    }}/>
                  </Button>
                </motion.div>
              </SignedIn>

              {/* Sign Up Button */}
              <SignedOut>
                <motion.div
                  className=""
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-black text-white hover:bg-gray-800 relative overflow-hidden group max-md:hidden">
                    <SignUpButton />
                    <motion.span
                      className="absolute inset-0 bg-gray-800"
                      initial={{ y: "100%" }}
                      whileHover={{ y: "0%" }}
                      transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    />
                  </Button>
                </motion.div>
              </SignedOut>
            </div>

            {/* Hamburger Menu Button (mobile only) */}
            <div className="md:hidden">
              <HamburgerButton isOpen={isOpen} toggleMenu={toggleMenu} />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}