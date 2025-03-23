"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { pioneers } from "@/contents/pioneer-section";
import { useRouter } from "next/navigation";
import PioneerCard from "../../components/pioneer/PioneerCard";
import PaginationControls from "../../components/pioneer/PaginationControls";
import { SectionHeader } from "../../components/pioneer/SectionHeader";

export default function TeamMembersSection() {
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

  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
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
        <SectionHeader isInView={isInView} />
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
                <PioneerCard
                  member={pioneers[activeIndex]}
                  direction={direction}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <PaginationControls
            activeIndex={activeIndex}
            pioneers={pioneers}
            handlePrev={handlePrev}
            handleNext={handleNext}
            handleDotClick={handleDotClick}
          />

          <div className="space h-12 w-full"></div>
          <div className="w-full h-2 flex flex-row justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="touch-none"
            >
              <button
                onClick={handleMeet}
                className="px-6 py-2 bg-[#f9f9fb] text-black rounded-md active:text-white active:scale-105 active:shadow-lg transition-all duration-300 hover:text-white hover:bg-black hover:scale-105 hover:shadow-lg"
              >
                Meet Our Team
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
