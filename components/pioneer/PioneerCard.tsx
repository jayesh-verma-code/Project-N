import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { TeamMember } from "@/types/team";
import { useScreenSize } from "@/hooks/useScreenSize";

interface PioneerCardProps {
  member: TeamMember;
  direction: number;
}

export default function PioneerCard({ member, direction }: PioneerCardProps) {
  const { isMobile } = useScreenSize();

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
          </motion.div>

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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="overflow-y-auto pr-2 max-h-[180px] sm:max-h-[350px]"
              style={{ scrollbarWidth: "thin" }}
            >
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
                      delay: wordIndex * (isMobile ? 0.03 : 0.02),
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
}
// 'use client';

// import { useRef, useEffect } from 'react';
// import { motion, useInView, useAnimation } from 'framer-motion';
// import { TeamMember } from '@/types/team';

// interface PioneerCardProps {
//   member: TeamMember;
//   direction: number;
// }

// export default function PioneerCard({ member }: PioneerCardProps) {
//   const ref = useRef(null);
  

//   const isInView = useInView(ref, {
//     once: true,
//     margin: '-50% 0px -50% 0px', 
//   });

//   const controls = useAnimation();

//   useEffect(() => {
//     if (isInView) {
//       controls.start({
//         x: 0,
//         opacity: 1,
//         transition: { duration: 0.6, ease: 'easeOut' },
//       });
//     }
//   }, [isInView, controls]);

//   return (
//     <section
//       ref={ref}
//       className="w-full flex flex-col md:flex-row items-center justify-center gap-36 min-h-screen lg:px-16"
//     >
//       {/* Left Content */}
//       <div className="w-1/3 space-y-4">
//         <h2 className="text-3xl font-bold text-gray-100">{member.name}</h2>
//         <h2 className="text-base font-bold text-[#668bb0]">{member.role}</h2>
//         <p className="text-lg text-gray-400">
//           {member.description}
//         </p>
//       </div>

//       {/* Right: Animated Image & Background */}
//       <div className="relative w-[320px] h-[320px] flex items-center justify-center rounded-full overflow-visible">
//         {/* Fixed Dotted Circle */}
//         <svg
//           className="absolute w-[350px] h-[350px] z-0 top-14"
//           viewBox="0 0 320 320"
//           fill="none"
//         >
//           <circle
//             cx="160"
//             cy="160"
//             r="140"
//             stroke="#FF2D55"
//             strokeWidth="1"
//             strokeDasharray="10 10"
//           />
//         </svg>

//         {/* Moving Image + Background */}
//         <motion.div
//           initial={{ x: 900, opacity: 0 }}
//           animate={controls}
//           className="absolute w-[280px] h-[280px] flex items-center justify-center"
//         >
//           {/* Background Circle */}
//           <div className="absolute w-full h-full left-12 top-5 rounded-full bg-gradient-to-br from-red-500 to-orange-400 z-0 opacity-50" />

//           {/* Image */}
//           <img
//             src={member.avatar}
//             alt={member.name}
//             className="w-full h-full object-cover rounded-full z-10"
//           />
//         </motion.div>
//       </div>
//     </section>
//   );
// }

