"use client";

import React, { useRef } from "react";
import {
  motion,
  useInView,
  Variants,
} from "framer-motion";
import { Shield, Zap, BarChart, Clock, Users, Globe } from "lucide-react";
import { FeatureCard } from "@/components/Features/FeatureCard";

const FEATURES = [
  {
    title: "AI-Powered Diagnostics",
    description:
      "Advanced algorithms analyze symptoms and provide preliminary health assessments with high accuracy.",
    icon: <Zap className="h-10 w-10 text-white" />,
    delay: 0.1,
    bgColor: "bg-purple-500",
    glowColor: "bg-purple-400",
    borderColor: "bg-purple-300",
  },
  {
    title: "Personalized Health Plans",
    description:
      "Custom wellness programs tailored to your unique health profile, goals, and preferences.",
    icon: <Users className="h-10 w-10 text-white" />,
    delay: 0.2,
    bgColor: "bg-blue-500",
    glowColor: "bg-blue-400",
    borderColor: "bg-blue-300",
  },
  {
    title: "Real-time Monitoring",
    description:
      "Continuous tracking of vital health metrics with instant alerts for any concerning changes.",
    icon: <BarChart className="h-10 w-10 text-white" />,
    delay: 0.3,
    bgColor: "bg-green-500",
    glowColor: "bg-green-400",
    borderColor: "bg-green-300",
  },
  {
    title: "24/7 Virtual Support",
    description:
      "Round-the-clock access to AI health assistants for immediate guidance and support.",
    icon: <Clock className="h-10 w-10 text-white" />,
    delay: 0.4,
    bgColor: "bg-amber-500",
    glowColor: "bg-amber-400",
    borderColor: "bg-amber-300",
  },
  {
    title: "Global Health Network",
    description:
      "Connect with healthcare providers worldwide for specialized consultations and treatments.",
    icon: <Globe className="h-10 w-10 text-white" />,
    delay: 0.5,
    bgColor: "bg-pink-500",
    glowColor: "bg-pink-400",
    borderColor: "bg-pink-300",
  },
  {
    title: "Secure Data Protection",
    description:
      "Military-grade encryption ensures your health data remains private and protected.",
    icon: <Shield className="h-10 w-10 text-white" />,
    delay: 0.6,
    bgColor: "bg-teal-500",
    glowColor: "bg-teal-400",
    borderColor: "bg-teal-300",
  },
];

// Animation variants
const CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ITEM_VARIANTS: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="features"
      className="py-24 px-4 relative overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-30" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-gray-800/20 to-transparent opacity-30" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Revolutionary Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how NIRVEON&apos;X is transforming healthcare with
            cutting-edge AI technology and innovative solutions.
          </p>
        </motion.div>

        <motion.div
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              variants={ITEM_VARIANTS}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

