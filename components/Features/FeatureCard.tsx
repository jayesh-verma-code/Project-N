import { motion, useMotionValue, useTransform, Variants } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useRef, useState } from "react";

interface FeatureCardProps {
  feature: {
    title: string;
    description: string;
    icon: React.ReactNode;
    delay: number;
    bgColor: string;
    glowColor: string;
    borderColor: string;
  };
  variants: Variants;
}

export function FeatureCard({ feature, variants }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = (cardRef.current as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * 0.8);
    y.set((e.clientY - centerY) * 0.8);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      transition={{
        delay: feature.delay,
        duration: 0.7,
        ease: [0.33, 1, 0.68, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className="cursor-hover-trigger"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        className="h-full"
      >
        <Card className="bg-black/50 border-white/10 backdrop-blur-sm transition-all duration-300 h-full overflow-hidden relative">
          {/* Card background glow effect */}
          <motion.div
            className={`absolute inset-0 ${feature.bgColor} opacity-0`}
            animate={{
              opacity: isHovered ? 0.15 : 0,
              scale: isHovered ? 1 : 0.95,
            }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          />

          <CardHeader>
            <motion.div
              className={`mb-4 p-3 rounded-full w-fit bg-black/50 relative overflow-hidden`}
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? [0, 5, -5, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1],
                rotate: {
                  repeat: isHovered ? Infinity : 0,
                  duration: 2,
                  ease: "easeInOut",
                },
              }}
            >
              {/* Icon */}
              {feature.icon}

              {/* Icon glow effect */}
              <motion.div
                className={`absolute inset-0 ${feature.glowColor} rounded-full`}
                animate={{
                  scale: isHovered ? [1, 1.5, 1] : 0,
                  opacity: isHovered ? [0.5, 0, 0] : 0,
                }}
                transition={{
                  duration: 1.5,
                  repeat: isHovered ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <CardTitle className="text-2xl font-bold text-white">
              {feature.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <CardDescription className="text-gray-400 text-base">
              {feature.description}
            </CardDescription>
          </CardContent>

          {/* Animated border */}
          <motion.div
            className={`absolute bottom-0 left-0 h-1 ${feature.borderColor}`}
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          />
        </Card>
      </motion.div>
    </motion.div>
  );
}
