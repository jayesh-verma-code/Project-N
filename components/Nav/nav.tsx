import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LeftNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = ['Home', 'Features', 'Services', 'Pioneers'];

  // Animation variants with sliding effect
  const menuVariants = {
    closed: {
      x: '-100%',
    },
    open: {
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      x: '-100%',
      transition: {
        duration: 0.4,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      x: -50,
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  // Background overlay animation
  const overlayVariants = {
    closed: {
      opacity: 0,
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.33, 1, 0.68, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <>
      {/* Left Navbar */}
      <div className="fixed left-0 top-0 h-full w-12 sm:w-14 md:w-16 bg-white/10 backdrop-blur-lg border-r border-white/20 z-50 flex flex-col items-center py-4 sm:py-6 md:py-8">
        {/* Logo */}
        <div className='flex items-center space-x-2 cursor-hover-trigger'>
          <motion.div
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center relative overflow-hidden"
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
            <img
              src="https://res.cloudinary.com/dqqyuvg1v/image/upload/v1741948683/Vector_z4x9e1.png"
              alt="NirveonX Logo"
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 relative z-10"
            />
          </motion.div>
        </div>

        {/* Hamburger Button */}
        <motion.button
          onClick={toggleMenu}
          animate={{
            position: "absolute",
            top: isMenuOpen ? "1rem" : "50%",
            right: isMenuOpen ? "1rem" : "auto",
            left: isMenuOpen ? "auto" : "50%",
            x: isMenuOpen ? "calc(100vw - 4rem)" : "-50%",
            y: isMenuOpen ? 0 : "-50%",
          }}
          className="relative w-8 h-8 sm:w-9 sm:h-11 md:w-10 md:h-12 rounded-lg bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center cursor-pointer shadow-lg"
          whileHover={{ 
            scale: 1.05, 
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            borderColor: "rgba(255, 255, 255, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center justify-center space-y-1 sm:space-y-1.5">
            <motion.div
              className="w-6  h-0.5 bg-white rounded-full shadow-sm"
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 6 : 0,
              }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
              className="w-6 h-0.5 bg-white rounded-full shadow-sm"
              animate={{
                opacity: isMenuOpen ? 0 : 1,
                x: isMenuOpen ? -15 : 0,
              }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
              className="w-4 sm:w-5 md:w-6 h-0.5 bg-white rounded-full shadow-sm"
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -6 : 0,
              }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            />
          </div>
        </motion.button>
      </div>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-40 flex items-center justify-center"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="exit"
          >
            <motion.div
              className="text-center"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="exit"
            >
              <div className="space-y-6 sm:space-y-8 flex flex-col sm:flex-row sm:gap-6 gap-8 md:gap-10">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item}
                    variants={itemVariants}
                    className="overflow-hidden"
                  >
                    <motion.button
                      className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-white hover:text-gray-300 transition-colors duration-300 relative group cursor-pointer"
                      onClick={() => {
                        setIsMenuOpen(false);
                        // Handle navigation here
                        console.log(`Navigate to ${item}`);
                      }}
                      whileHover={{ x: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item}
                      
                      {/* Hover underline effect */}
                      <motion.div
                        className="absolute left-0 bottom-0 h-0.5 sm:h-1 bg-white"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                      />
                      
                      {/* Hover glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-white/5 rounded-lg -z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              {/* Close hint */}
              <motion.div
                variants={itemVariants}
                className="mt-12 sm:mt-16"
              >
                <p className="text-gray-400 text-base sm:text-lg">
                  NirveonX
                </p>
              </motion.div>
            </motion.div>

            {/* Click outside to close */}
            <motion.div
              className="absolute inset-0 -z-10"
              onClick={() => setIsMenuOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ESC key handler */}
      <div
        className="fixed inset-0 pointer-events-none"
        onKeyDown={(e) => {
          if (e.key === 'Escape' && isMenuOpen) {
            setIsMenuOpen(false);
          }
        }}
        tabIndex={-1}
      />
    </>
  );
};

export default LeftNavbar;