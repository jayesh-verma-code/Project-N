"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { pioneers } from "@/contents/pioneer-section";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  description: string;
}

// Custom hook for screen size detection
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
  });

  useEffect(() => {
    const checkScreenSize = () => {
      setScreenSize({
        isMobile: window.innerWidth < 640,
        isTablet: window.innerWidth >= 640 && window.innerWidth < 1024,
      });
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return screenSize;
};

// CardWithLoading Component
const CardWithLoading = ({
  member,
  direction,
}: {
  member: TeamMember;
  direction: number;
}) => {
  const screenSize = useScreenSize();

  return (
    <Card className="bg-black/10 border-white/10 backdrop-blur-sm shadow-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:border-white/20">
      <CardContent className="p-1">
        <div id="pioneer" className="flex flex-col sm:flex-row">
          <motion.div
            className="w-full sm:w-2/5 relative overflow-hidden h-[200px] sm:h-[450px]"
            initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {/* Image with whileHover animation */}
            {
              <motion.img
                src={member.avatar}
                alt={member.name}
                className="object-contain w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              />
            }
          </motion.div>

          {/* Right side - Content with scrollable description */}
          <div className="w-full sm:w-3/5 p-4 xs:p-5 sm:p-5 md:p-6 lg:p-8 flex flex-col group">
            <motion.div
              className="mb-2 sm:mb-2 md:mb-3 lg:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <h3 className="text-lg xs:text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2 transition-all duration-300 group-hover:text-blue-400">
                {member.name}
              </h3>
              <p className="text-sm xs:text-base sm:text-base md:text-lg lg:text-xl text-white/80 font-medium mb-2 sm:mb-2 md:mb-3 transition-all duration-300 group-hover:text-blue-300">
                {member.role}
              </p>
            </motion.div>

            {/* Description container with scrollbar and text animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="overflow-y-auto pr-2 max-h-[180px] sm:max-h-[350px]"
              style={{ scrollbarWidth: "thin" }}
            >
              {/* Animated text with staggered character reveal */}
              <motion.p
                className="text-sm sm:text-base text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {member.description.split(" ").map((word, wordIndex) => (
                  <motion.span
                    key={wordIndex}
                    className="inline-block mr-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: wordIndex * (screenSize.isMobile ? 0.03 : 0.02),
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function TeamMembersSection() {
  // const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const handleMeet = () => router.push("/team");

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? pioneers.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === pioneers.length - 1 ? 0 : prev + 1));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <section
      id="founding"
      className="py-8 sm:py-12 md:py-16 lg:py-24 px-2 sm:px-4 relative overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-30" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-30" />
      </div>
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-6 text-white">
            Our Leadership Team
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-2">
            Meet the visionaries behind NIRVEON&apos;S who are dedicated to
            revolutionizing healthcare through innovation.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          <div className="flex justify-center overflow-hidden relative h-[500px] xs:h-[550px] sm:h-[500px] md:h-[450px] lg:h-[500px]">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full max-w-[320px] xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl"
              >
                <CardWithLoading
                  member={pioneers[activeIndex]}
                  direction={direction}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center mt-4 sm:mt-4 md:mt-6 lg:mt-8 space-x-2 sm:space-x-2 md:space-x-3 lg:space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrev}
                className="rounded-full border-white/20 hover:bg-white/10 h-8 w-8 sm:h-8 sm:w-8 md:h-10 md:w-10 p-0"
              >
                <ChevronLeft className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5" />
              </Button>
            </motion.div>
            <div className="flex items-center space-x-1 md:space-x-2">
              {pioneers.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`w-2 h-2 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-white scale-125 animate-pulse"
                      : "bg-gray-700"
                  }`}
                  whileHover={{ scale: 1.5 }}
                  aria-label={`Go to team member ${index + 1}`}
                />
              ))}
            </div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                className="rounded-full border-white/20 hover:bg-white/10 h-8 w-8 sm:h-8 sm:w-8 md:h-10 md:w-10 p-0"
              >
                <ChevronRight className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5" />
              </Button>
            </motion.div>
          </div>
          <div className="space h-12 w-full"></div>
          <div className="w-full h-2 flex flex-row justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="touch-none"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={handleMeet}
                className="bg-[#f9f9fb] text-black active:text-white active:scale-105 active:shadow-lg transition-all duration-300 hover:text-white hover:scale-105 hover:shadow-lg"
              >
                Meet Our Team
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
