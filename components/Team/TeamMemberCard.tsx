import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useState } from "react";
import { TeamMember } from "@/app/team/page";

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

export function TeamMemberCard({ member, variants, index }: TeamMemberCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const categoryColors = {
      leadership: "bg-blue-500/80 text-white",
      employee: "bg-green-500/80 text-white",
      intern: "bg-purple-500/80 text-white",
    };
  
    const categoryLabels = {
      leadership: "Leadership",
      employee: "Employee",
      intern: "Intern",
    };
  
    return (
      <motion.div
        variants={variants}
        className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm group"
        whileHover={{
          y: -8,
          boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.3)",
          scale: 1.02,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: index * 0.05,
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="h-full flex flex-col items-center justify-center text-center p-6">
          <motion.div
            className="mb-4 relative"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Avatar className="h-24 w-24 md:h-28 md:w-28 rounded-full border-2 border-gray-200 shadow-lg">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-gray-700 to-black text-white">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={
                isHovered
                  ? { boxShadow: "0 0 25px 5px rgba(120, 120, 255, 0.5)" }
                  : { boxShadow: "0 0 0px 0px rgba(120, 120, 255, 0)" }
              }
              transition={{ duration: 0.3 }}
            />
          </motion.div>
  
          <Badge
            className={`mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              categoryColors[member.category]
            }`}
          >
            {categoryLabels[member.category]}
          </Badge>
  
          <motion.h3
            className="text-xl font-bold text-white mb-2"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {member.name}
          </motion.h3>
  
          <motion.p
            className="text-gray-300 font-medium"
            animate={isHovered ? { y: 0, opacity: 1 } : { y: 0, opacity: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {member.role}
          </motion.p>
  
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          />
        </div>
      </motion.div>
    );
  }
  