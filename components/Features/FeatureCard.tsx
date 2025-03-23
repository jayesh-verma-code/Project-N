import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useRef, useState, useEffect } from "react";
import { FeatureCardProps } from "@/types/features";


export function FeatureCard({ feature, variants }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;

    const rect = (cardRef.current as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * 0.8);
    y.set((e.clientY - centerY) * 0.8);
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      x.set(0);
      y.set(0);
      setIsHovered(false);
    }
  };

  const handleTapStart = () => {
    setIsTapped(true);
    
    // For mobile, simulate a brief hover effect on tap
    if (isMobile) {
      setIsHovered(true);
      
      // Reset hover state after animation completes
      setTimeout(() => {
        setIsHovered(false);
      }, 1500);
    }
  };

  const handleTapEnd = () => {
    setIsTapped(false);
  };

  // Mobile-specific animations
  const mobileEntryVariants = {
    hidden: { 
      opacity: 0,
      y: 50 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: feature.delay * 0.5, // Faster delay for mobile
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={isMobile ? mobileEntryVariants : variants}
      initial="hidden"
      animate="visible"
      transition={!isMobile ? {
        delay: feature.delay,
        duration: 0.7,
        ease: [0.33, 1, 0.68, 1],
      } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onTapStart={handleTapStart}
      onTapCancel={handleTapEnd}
      onTap={handleTapEnd}
      whileTap={isMobile ? { 
        scale: 0.95, 
        rotateZ: -1,
        transition: { duration: 0.2 } 
      } : { 
        scale: 0.9, 
        rotateZ: -2 
      }}
      whileHover={!isMobile ? { scale: 1.08 } : undefined}
      drag={!isMobile ? "x" : false}
      dragConstraints={!isMobile ? { left: -8, right: 8 } : undefined}
      dragElastic={0.3}
      className="cursor-hover-trigger"
    >
      <motion.div
        style={!isMobile ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        className="h-full"
      >
        <Card className="bg-black/50 border-white/10 backdrop-blur-sm transition-all duration-300 h-full overflow-hidden relative">
          {/* Background Glow Effect */}
          <motion.div
            className={`absolute inset-0 ${feature.bgColor} opacity-0`}
            animate={{
              opacity: isHovered || isTapped ? 0.2 : 0,
              scale: isHovered || isTapped ? 1.05 : 1,
            }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          />

          <CardHeader>
            <motion.div
              className={`mb-4 p-3 rounded-full w-fit bg-black/50 relative overflow-hidden`}
              animate={{
                scale: isHovered || isTapped ? 1.2 : 1,
                rotate: isHovered || isTapped ? [0, 8, -8, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1],
                rotate: {
                  repeat: isHovered || isTapped ? Infinity : 0,
                  duration: 1.5,
                  ease: "easeInOut",
                },
              }}
            >
              {feature.icon}

              {/* Pulsating Glow Effect */}
              <motion.div
                className={`absolute inset-0 ${feature.glowColor} rounded-full`}
                animate={{
                  scale: isHovered || isTapped ? [1, 1.4, 1] : 0,
                  opacity: isHovered || isTapped ? [0.5, 0, 0] : 0,
                }}
                transition={{
                  duration: 1.2,
                  repeat: isHovered || isTapped ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <CardTitle className="text-2xl font-bold text-white">
              {feature.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <CardDescription className="text-gray-400 text-base">
              {feature.description}
            </CardDescription>
          </CardContent>

          {/* Animated Border */}
          <motion.div
            className={`absolute bottom-0 left-0 h-1 ${feature.borderColor}`}
            animate={{ width: isHovered || isTapped ? "100%" : "0%" }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          />

          {/* Mobile-specific pulse effect on tap */}
          <AnimatePresence>
            {isMobile && isTapped && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.5, scale: 1.5 }}
                exit={{ opacity: 0, scale: 2 }}
                transition={{ duration: 0.5 }}
                className={`absolute inset-0 rounded-lg ${feature.borderColor} z-0`}
              />
            )}
          </AnimatePresence>
          
          {/* Mobile-specific ripple effect on tap */}
          <AnimatePresence>
            {isMobile && isTapped && (
              <motion.div
                initial={{ opacity: 0.8, scale: 0 }}
                animate={{ opacity: 0, scale: 1.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className={`absolute inset-0 rounded-lg ${feature.glowColor} z-0`}
              />
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </motion.div>
  );
}