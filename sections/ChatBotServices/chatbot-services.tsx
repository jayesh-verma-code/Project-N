"use client";

import type React from "react";
import { JSX, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Heart, Users, PawPrintIcon as Paw } from "lucide-react";
import {
  GradientBackground,
  ServiceCard,
} from "@/components/ChatBotServices/ServiceCard";
import { SERVICES} from "../../contents/chatbot-services";


type IconType = {
  [key: string]: JSX.Element;
};
// Constants
const ICONS: IconType = {
  Heart: <Heart className="h-12 w-12 text-white" />,
  Brain: <Brain className="h-12 w-12 text-white" />,
  Users: <Users className="h-12 w-12 text-white" />,
  Paw: <Paw className="h-12 w-12 text-white" />,
};


export const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export const ITEM_VARIANTS = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ChatbotServices() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="py-24 px-4 relative overflow-hidden"
      ref={ref}
    >
      <GradientBackground />
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Our AI Chatbot Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our suite of AI-powered health and wellness solutions
            designed to provide personalized care for every aspect of your life.
          </p>
        </motion.div>

        <motion.div
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={index}
              service={{
                ...service,
                icon: ICONS[service.icon],
              }}
              index={index}
              isActive={activeIndex === index}
              setActive={setActiveIndex}
              variants={ITEM_VARIANTS}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}