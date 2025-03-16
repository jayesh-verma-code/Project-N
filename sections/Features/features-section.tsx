"use client";

import React, { JSX, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Shield, Zap, BarChart, Clock, Users, Globe } from "lucide-react";
import { FeatureCard } from "@/components/Features/FeatureCard";
import { FEATURES } from "../../contents/features-section"; // Importing the content

// Define the type for the ICONS object
type IconType = {
  [key: string]: JSX.Element;
};

const ICONS: IconType = {
  Shield: <Shield className="h-10 w-10 text-white" />,
  Zap: <Zap className="h-10 w-10 text-white" />,
  BarChart: <BarChart className="h-10 w-10 text-white" />,
  Clock: <Clock className="h-10 w-10 text-white" />,
  Users: <Users className="h-10 w-10 text-white" />,
  Globe: <Globe className="h-10 w-10 text-white" />,
};

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
              feature={{
                ...feature,
                icon: ICONS[feature.icon], // Map icon name to actual component
              }}
              variants={ITEM_VARIANTS}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}