import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useRef } from "react";
import {
  ITEM_VARIANTS,
  SERVICES,
} from "@/sections/ChatBotServices/chatbot-services";
export const GradientBackground = () => (
  <div className="absolute inset-0 z-0">
    <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-30" />
    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-30" />
  </div>
);

// ServiceCard Component
interface ServiceCardProps {
  service: (typeof SERVICES)[number];
  index: number;
  isActive: boolean;
  setActive: (index: number | null) => void;
  variants: typeof ITEM_VARIANTS;
}

export function ServiceCard({
  service,
  index,
  isActive,
  setActive,
  variants,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setActive(null);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setActive(index)}
      className="cursor-hover-trigger"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ z: 10 }}
      >
        <Card className="bg-black/50 border-white/10 backdrop-blur-sm transition-all duration-300 h-full flex flex-col overflow-hidden relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          <CardHeader className="pb-2 relative z-10">
            <motion.div
              className="mb-4 p-3 rounded-full w-fit bg-black/50"
              animate={{
                scale: isActive ? 1.1 : 1,
                rotate: isActive ? [0, 5, -5, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                rotate: {
                  repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                  repeatType: "loop",
                  duration: 2,
                },
              }}
            >
              {service.icon}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isActive ? [1, 1.5, 1] : 0,
                  opacity: isActive ? [0.5, 0, 0] : 0,
                }}
                transition={{
                  duration: 1,
                  repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                }}
              />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-white">
              {service.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow relative z-10">
            <CardDescription className="text-gray-400 text-base">
              {service.description}
            </CardDescription>
          </CardContent>
          <CardFooter className="relative z-10">
            <motion.button>
              <Button
                className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 text-white border border-white/20 group overflow-hidden`}
              >
                <span className="relative z-10">Get Started</span>
                <motion.span
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.button>
          </CardFooter>

          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-white"
            initial={{ width: "0%" }}
            animate={{ width: isActive ? "100%" : "0%" }}
            transition={{ duration: 0.5 }}
          />
        </Card>
      </motion.div>
    </motion.div>
  );
}
