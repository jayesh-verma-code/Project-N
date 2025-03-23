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
