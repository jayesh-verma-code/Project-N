'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { TeamMember } from '@/types/team';

interface PioneerCardProps {
  member: TeamMember;
  direction: number;
}

export default function PioneerCard({ member }: PioneerCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-50% 0px -50% 0px',
  });

  const controls = useAnimation();
  const outerControls = useAnimation();
  const innerControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      // Initial slide-in animation
      controls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
      }).then(() => {
        // Outer (orange) circle animation - starts from right, moves in larger orbit
        outerControls.start({
          x: [80, 40, -40, -80, -40, 40, 80], // Larger radius, starts right
          y: [0, 60, 80, 0, -80, -60, 0],
          transition: { 
            duration: 8,
            ease: [0.4, 0, 0.6, 1], // Custom cubic-bezier for smoothness
            repeat: Infinity,
            repeatType: "loop"
          }
        });
        
        // Inner (image) circle animation - starts from right, moves in smaller orbit
        innerControls.start({
          x: [60, 30, -30, -60, -30, 30, 60], // Smaller radius, starts right
          y: [0, 45, 60, 0, -60, -45, 0],
          transition: { 
            duration: 10,
            ease: [0.4, 0, 0.6, 1], // Same easing for consistency
            repeat: Infinity,
            repeatType: "loop"
          }
        });
      });
    }
  }, [isInView, controls, outerControls, innerControls]);

  return (
    <section
      ref={ref}
      className="w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 min-h-screen px-4 sm:px-8 md:px-12 lg:px-16"
    >
      {/* Left Content */}
      <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-100">{member.name}</h2>
        <h3 className="text-sm sm:text-base font-bold text-[#668bb0]">{member.role}</h3>
        <p className="text-base sm:text-lg text-gray-400">{member.description}</p>
      </div>

      {/* Right: Animated Image & Background */}
      <div className="relative w-[250px] h-[250px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] flex items-center justify-center rounded-full overflow-visible">
        {/* Fixed Dotted Circle */}
        <svg
          className="absolute w-full h-full z-0"
          viewBox="0 0 320 320"
          fill="none"
        >
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="#FF2D55"
            strokeWidth="1"
            strokeDasharray="10 10"
          />
        </svg>

        {/* Moving Container */}
        <motion.div
          initial={{ x: 900, opacity: 0 }}
          animate={controls}
          className="absolute w-full h-full"
        >
          {/* Orange Background Circle (outer movement) - starts from right */}
          <motion.div 
            className="absolute w-[85%] h-[85%] rounded-full bg-gradient-to-br from-red-500 to-orange-400 z-0 opacity-60"
            initial={{ x: 80, y: 0 }} // Start position on the right
            animate={outerControls}
            style={{
              top: '50%',
              left: '50%',
              translateX: '-50%',
              translateY: '-50%'
            }}
          />

          {/* Image Circle (inner movement) - starts from right */}
          <motion.div
            className="absolute w-[75%] h-[75%] rounded-full overflow-hidden z-10 ring-2 ring-white/20"
            initial={{ x: 60, y: 0 }} // Start position on the right
            animate={innerControls}
            style={{
              top: '50%',
              left: '50%',
              translateX: '-50%',
              translateY: '-50%'
            }}
          >
            <img
              src={member.avatar}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}