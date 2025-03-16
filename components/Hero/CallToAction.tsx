import { motion } from "framer-motion";
import { Button } from "../ui/button";


export const CTAButtons = ({
  buttonHovered,
  setButtonHovered,
}: {
  buttonHovered: boolean;
  setButtonHovered: (value: boolean) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 1.2 }}
    className="flex flex-col sm:flex-row items-center justify-center gap-4"
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setButtonHovered(true)}
      onHoverEnd={() => setButtonHovered(false)}
      className="flex gap-3"
    >
      

      <motion.div
        className="absolute -inset-1 bg-white/20 rounded-lg blur-sm"
        animate={{
          opacity: buttonHovered ? 1 : 0,
          scale: buttonHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>

    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        size="lg"
        variant="outline"
        className="border-white/20 hover:bg-white/10 text-white px-8 py-6 text-lg relative overflow-hidden group"
      >
        <span className="relative z-10">Learn More</span>
        <motion.span
          className="absolute inset-0 bg-white/10 z-0"
          initial={{ y: "-100%" }}
          whileHover={{ y: "0%" }}
          transition={{ duration: 0.3 }}
        />
      </Button>
    </motion.div>
  </motion.div>
);
