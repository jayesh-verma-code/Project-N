import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useState } from "react";
import { TeamMember } from "@/app/team/page";
import { Sparkles } from "lucide-react";

interface TeamMemberCardProps {
  member: TeamMember;
  variants: {
    hidden: { y: number; opacity: number };
    visible: {
      y: number;
      opacity: number;
      transition: { duration: number; ease: number[] };
    };
  };
  index: number;
}

export function TeamMemberCard({ member, variants }: TeamMemberCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const categoryColors = {
    leadership: "bg-gradient-to-r from-blue-600 to-blue-400",
    employee: "bg-gradient-to-r from-emerald-600 to-emerald-400",
    intern: "bg-gradient-to-r from-purple-600 to-purple-400",
  };

  const categoryLabels = {
    leadership: "Leadership",
    employee: "Employee",
    intern: "Intern",
  };

  return (
    <motion.div
      variants={variants}
      className="relative h-[400px] w-[300px] group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
    >
      {/* Animated background gradients */}
      <motion.div
        className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Card content */}
      <div className="relative h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-xl border border-gray-700/50">
        {/* Animated shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-20"
          animate={{
            backgroundPosition: ["200% 0", "-200% 0"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
            backgroundSize: "200% 100%",
          }}
        />

        {/* Floating particles */}
        {isHovered && Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            initial={{ opacity: 0, y: 0 }}
            animate={{
              y: [-10, -60],
              x: Math.sin(i) * 20,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeOut",
            }}
            style={{
              left: `${30 + i * 20}%`,
              bottom: "20%",
            }}
          />
        ))}

        <div className="relative h-full flex flex-col items-center justify-center p-6">
          {/* Sparkle icon  */}
          {isHovered && (
            <motion.div
              className="absolute top-4 right-4 text-yellow-400"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                opacity: { duration: 0.3 },
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <Sparkles size={24} />
            </motion.div>
          )}

          {/* Avatar with animated ring */}
          <motion.div
            className="relative mb-6"
            animate={
              isHovered
                ? {
                    y: [0, -8, 0],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
                : {}
            }
          >
            {/* Animated ring */}
            <motion.div
              className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100"
              animate={{
                background: [
                  "linear-gradient(0deg, rgba(59,130,246,0.3), rgba(147,51,234,0.3))",
                  "linear-gradient(180deg, rgba(59,130,246,0.3), rgba(147,51,234,0.3))",
                  "linear-gradient(360deg, rgba(59,130,246,0.3), rgba(147,51,234,0.3))",
                ],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                filter: "blur(8px)",
              }}
            />
            <Avatar className="h-32 w-32 ring-2 ring-white/20 relative z-10 group-hover:ring-white/40 transition-all duration-300">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-gray-700 to-gray-900 text-white">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </motion.div>

          {/* Badge with glow */}
          <motion.div
            initial={{ scale: 1 }}
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Badge
              className={`${categoryColors[member.category]} mb-4 py-1 px-3 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300`}
            >
              {categoryLabels[member.category]}
            </Badge>
          </motion.div>

          {/* Name with underline animation */}
          <motion.h3
            className="text-2xl font-bold text-white mb-2 text-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="relative">
              {member.name}
              <motion.span
                className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 origin-left"
                initial={{ scaleX: 0 }}
                animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.3 }}
              />
            </span>
          </motion.h3>

          {/* Role with color transition */}
          <motion.p
            className="text-gray-300 font-medium mb-4 text-center group-hover:text-blue-300 transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {member.role}
          </motion.p>

          {/* Education with fade animation */}
          {member.education && (
            <motion.p
              className="text-sm text-gray-400 text-center group-hover:text-gray-300 transition-colors duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              🎓 {member.education}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}