import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import Link from 'next/link';

const LeftNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const currentImageRef = useRef<HTMLImageElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Check if device is desktop
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);

    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // GSAP timeline setup
  useEffect(() => {
    if (isMenuOpen && imageContainerRef.current) {
      timelineRef.current = gsap.timeline({ paused: true });
    }
  }, [isMenuOpen]);

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  // Get hover color based on menu item
  const getHoverColor = (itemName: string) => {
    const colors = {
      'Home': '59, 130, 246',      // Blue
      'Features': '16, 185, 129',   // Green
      'Services': '245, 158, 11',   // Amber
      'Pioneers': '139, 92, 246'    // Purple
    };
    return colors[itemName as keyof typeof colors] || '255, 255, 255';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setHoveredItem(null);
  };

  const menuItems = [
    { 
      name: 'Home', 
      path: '/',
      image: 'https://res.cloudinary.com/dg3qhhnjo/image/upload/v1749716087/home_thd5et.jpg'
    },
    { 
      name: 'Features', 
      path: '/Features',
      image: 'https://res.cloudinary.com/dg3qhhnjo/image/upload/v1749716003/Feacture_vkfxw7.jpg'
    },
    { 
      name: 'Services', 
      path: '/Services',
      image: 'https://res.cloudinary.com/dg3qhhnjo/image/upload/v1749716057/Service_fyitnj.jpg'
    },
    { 
      name: 'Pioneers', 
      path: '/Pioneers',
      image: 'https://res.cloudinary.com/dg3qhhnjo/image/upload/v1749715931/pioneer_b9hg9j.jpg'
    }
  ];

  const socialLinks = [
    { name: 'Facebook', url: '#', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
    { name: 'Twitter', url: '#', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
    { name: 'Instagram', url: '#', icon: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM12.017 18.634c-3.662 0-6.637-2.975-6.637-6.637s2.975-6.637 6.637-6.637s6.637 2.975 6.637 6.637S15.679 18.634 12.017 18.634zM18.635 5.228c0 .862-.7 1.562-1.562 1.562s-1.562-.7-1.562-1.562s.7-1.562 1.562-1.562S18.635 4.366 18.635 5.228z' },
    { name: 'LinkedIn', url: '#', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    { name: 'GitHub', url: '#', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
    { name: 'WhatsApp', url: '#', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488' }
  ];

  const footerLinks = [
    { name: 'Press', url: '#' },
    { name: 'Privacy Notice', url: '#' },
    { name: 'Cookie Policy', url: '#' }
  ];

  // Handle hover effects with GSAP
  const handleItemHover = (itemName: string) => {
    setHoveredItem(itemName);
    
    if (currentImageRef.current && imageContainerRef.current) {
      const newImage = menuItems.find(item => item.name === itemName)?.image;
      
      if (newImage) {
        // GSAP animation for image transition
        gsap.timeline()
          .to(imageContainerRef.current, {
            opacity: 0,
            scale: 1.1,
            duration: 0.3,
            ease: "power2.inOut"
          })
          .call(() => {
            if (currentImageRef.current) {
              currentImageRef.current.src = newImage;
            }
          })
          .to(imageContainerRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
          });

        // Parallax effect on image
        gsap.to(currentImageRef.current, {
          y: -20,
          duration: 0.6,
          ease: "power2.out"
        });
      }
    }
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
    
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        ease: "power2.inOut"
      });
    }
  };

  // Animation variants
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

  // Hamburger line animations
  const topLineVariants = {
    initial: {
      width: 0,
      x: -12,
      rotate: 0,
      y: 0
    },
    animate: {
      width: "24px",
      x: 0,
      rotate: 0,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
        repeat: isMenuOpen ? Number.POSITIVE_INFINITY : 0,
        repeatType: "loop" as const,
        repeatDelay: 2
      }
    },
    closed: {
      rotate: 0,
      y: 0,
      width: "24px",
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    open: {
      rotate: 45,
      y: 6,
      width: "24px",
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const middleLineVariants = {
    initial: {
      width: 0,
      x: -12,
      opacity: 1
    },
    animate: {
      width: "24px",
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
        repeat: isMenuOpen ? Number.POSITIVE_INFINITY : 0,
        repeatType: "loop" as const,
        repeatDelay: 2
      }
    },
    closed: {
      opacity: 1,
      x: 0,
      width: "24px",
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    open: {
      opacity: 0,
      x: 0,
      width: "24px",
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const bottomLineVariants = {
    initial: {
      width: 0,
      x: -8,
      rotate: 0,
      y: 0
    },
    animate: {
      width: "16px",
      x: 0,
      rotate: 0,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
        repeat: isMenuOpen ? Number.POSITIVE_INFINITY : 0,
        repeatType: "loop" as const,
        repeatDelay: 2
      }
    },
    closed: {
      rotate: 0,
      y: 0,
      width: "16px",
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    open: {
      rotate: -45,
      y: -6,
      width: "24px",
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  // Only render on desktop devices
  if (!isDesktop) {
    return null;
  }

  return (
    <>
      {/* Left Navbar*/}
      <motion.div 
        className={`fixed left-0 top-0 h-full w-16 z-50 flex flex-col items-center py-8 transition-all duration-500 ${
          isMenuOpen 
            ? 'border-r-0 bg-black' 
            : 'border-r border-white/10 bg-transparent'
        }`}
        // animate={{
        //   backgroundColor: isMenuOpen && hoveredItem 
        //     ? `rgba(${getHoverColor(hoveredItem)}, 0.2)` 
        //     : 'transparent'
        // }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <div className='flex items-center space-x-2 cursor-hover-trigger'>
          <motion.div
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center relative overflow-hidden shadow-lg"
            whileHover={{
              rotate: 180,
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,1)",
              transition: { duration: 0.5, ease: "circOut" },
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/80 to-gray-300/80"
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
              className="w-6 h-6 relative z-10"
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
          className="relative w-10 h-12 rounded-lg flex items-center justify-center cursor-pointer shadow-lg bg-black/20 backdrop-blur-sm border border-white/10"
          whileHover={{ 
            scale: 1.05, 
            backgroundColor: "rgba(255,255,255,0.1)",
            borderColor: "rgba(255,255,255,0.3)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center justify-center space-y-1.5">
            <motion.div
              className="h-0.5 bg-white rounded-full shadow-sm origin-center"
              variants={topLineVariants}
              initial="initial"
              animate={isMenuOpen ? "open" : ["animate", "closed"]}
            />
            <motion.div
              className="h-0.5 bg-white rounded-full shadow-sm origin-center"
              variants={middleLineVariants}
              initial="initial"
              animate={isMenuOpen ? "open" : ["animate", "closed"]}
            />
            <motion.div
              className="h-0.5 bg-white rounded-full shadow-sm origin-center"
              variants={bottomLineVariants}
              initial="initial"
              animate={isMenuOpen ? "open" : ["animate", "closed"]}
            />
          </div>
        </motion.button>
      </motion.div>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed bg-black/90 backdrop-blur-xl z-30 flex flex-col overflow-hidden"
            style={{ 
              left: '64px', 
              top: 0, 
              right: 0, 
              bottom: 0 
            }}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="exit"
          >
            {/* Background Image Container */}
            <div 
              ref={imageContainerRef}
              className="absolute inset-0 opacity-0 transition-opacity duration-500"
              style={{ zIndex: 1 }}
            >
              <img
                ref={currentImageRef}
                src=""
                alt="Background"
                className="w-full h-full object-cover"
                style={{ 
                  filter: 'brightness(0.3) saturate(1.2)',
                  transform: 'scale(1.1)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
            </div>

            {/* Main Menu Content */}
            <div className="flex-1 flex items-center justify-center relative z-10">
              <motion.div
                className="text-center"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="exit"
              >
                <div className="space-y-10 flex flex-row gap-16">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      className="overflow-hidden"
                    >
                      <Link href={item.path} passHref>
                        <motion.button
                          className="text-5xl font-bold text-white hover:text-gray-300 hover:text-6xl transition-colors duration-300 relative group cursor-pointer"
                          onClick={() => setIsMenuOpen(false)}
                          onMouseEnter={() => handleItemHover(item.name)}
                          onMouseLeave={handleItemLeave}
                          whileHover={{ 
                            textShadow: "0px 0px 20px rgba(255,255,255,0.5)"
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.name}
                          
                          {/* Hover underline effect */}
                          <motion.div
                            className="absolute left-0 bottom-0 h-1 bg-white shadow-lg"
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                          />
                          
                          {/* Hover glow effect */}
                          <motion.div
                            className="absolute inset-0 bg-white/10 rounded-lg -z-10 backdrop-blur-sm"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ opacity: 1, scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          />
                        </motion.button>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bottom Section - Get in Touch */}
            <motion.div
              className="border-t border-white/20 px-8 py-6 relative z-10 backdrop-blur-md bg-black/40"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between max-w-screen-xl mx-auto">
                {/* Get in Touch Button */}
                <motion.button
                  className="px-6 py-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: "rgba(255,255,255,0.6)",
                    boxShadow: "0 0 20px rgba(255,255,255,0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get in touch
                </motion.button>

                {/* Social Media Icons */}
                <div className="flex items-center space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      className="w-10 h-10 flex items-center justify-center text-white hover:text-gray-300 transition-colors duration-300 rounded-full hover:bg-white/10 backdrop-blur-sm"
                      whileHover={{ 
                        scale: 1.2, 
                        y: -2,
                        boxShadow: "0 4px 20px rgba(255,255,255,0.2)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: 0.5 + index * 0.1 }
                      }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d={social.icon} />
                      </svg>
                      <span className="sr-only">{social.name}</span>
                    </motion.a>
                  ))}
                </div>

                {/* Footer Links */}
                <div className="flex items-center space-x-6">
                  {footerLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm hover:drop-shadow-lg"
                      whileHover={{ 
                        y: -1,
                        textShadow: "0px 0px 10px rgba(255,255,255,0.8)"
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: 0.8 + index * 0.1 }
                      }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Click outside to close */}
            <motion.div
              className="absolute inset-0 -z-10"
              onClick={() => setIsMenuOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LeftNavbar;