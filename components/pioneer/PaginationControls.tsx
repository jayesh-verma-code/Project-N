import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TeamMember } from "@/types/team";

interface PaginationControlsProps {
  activeIndex: number;
  pioneers: TeamMember[];
  handlePrev: () => void;
  handleNext: () => void;
  handleDotClick: (index: number) => void;
}

export default function PaginationControls({
  activeIndex,
  pioneers,
  handlePrev,
  handleNext,
  handleDotClick,
}: PaginationControlsProps) {
  return (
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
            onClick={() => handleDotClick(index)}
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
  );
}
