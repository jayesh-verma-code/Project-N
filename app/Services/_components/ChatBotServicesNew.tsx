"use client";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface ChatBotService {
  chatbot_name: string;
  image: string;
  description: string;
  getStarted: string;
}

const chatBotServices: ChatBotService[] = [
  {
    chatbot_name: "HealthMate",
    image: "/telehealth-consultation.jpg",
    description:
      "Your AI-powered personal healthcare companion, providing real-time health insights, monitoring vital parameters, and offering expert medical guidance for a healthier life.",
    getStarted: "/HealthMateLanding",
  },
  {
    chatbot_name: "MindEase",
    image: "/girl-sitting-pose.jpg",
    description:
      "An intelligent mental wellness and lifestyle coach, designed to help you manage stress, enhance focus, and cultivate inner peace through mindfulness and hobby-based therapy.",
    getStarted: "/mindease",
  },
  {
    chatbot_name: "GoldenCare",
    image: "/service-goldencare-pic.png",
    description:
      "A specialized AI assistant dedicated to elder care, offering support for seniors and caregivers with health monitoring, medication reminders, and companionship features.",
    getStarted: "/goldencare",
  },
  {
    chatbot_name: "PetAI",
    image: "/service-petai-pic.png",
    description:
      "A smart virtual veterinary assistant, delivering expert guidance on pet health, nutrition, and overall well-being—ensuring your furry companions receive the best possible care.",
    getStarted: "/pet-ai",
  },
];

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

const ServicesPage = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const motionVariants = (index: number) => ({
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? -500 : 500,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        ease: "linear",
      },
    },
  });

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
      <section id="services" className="pt-6 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6">
          <div
            className={`flex ${
              isMobile
                ? "flex-col items-center"
                : "flex-row justify-between items-center"
            } gap-4 md:gap-2 relative mb-12 sm:mb-28 md:mb-32`}
          >
            <Link href="/" className={isMobile ? "self-start mb-2" : ""}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.1 }}
                className="bg-white bg-opacity-10 rounded-full p-3 transition-all duration-200 hover:bg-opacity-20 active:bg-white active:bg-opacity-30 active:scale-95"
              >
                <ArrowLeft className="size-4 md:size-5 text-black" />
              </motion.div>
            </Link>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-[#DBEAFE] text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Our AI Chatbot Services
              </h1>
              <p className="text-[#dbd4d7] text-balance md:text-xl leading-none tracking-normal">
                Discover our suite of AI-powered health and wellness solutions
                designed to provide
                <br />
                personalized care for every aspect of your life.
              </p>
            </div>
          </div>
          <div className="space-y-16">
            {chatBotServices.map((service, index) => (
              <motion.div
                key={service.chatbot_name}
                style={{ willChange: "transform, opacity" }}
                variants={motionVariants(index)}
                initial="hidden"
                {...(isMobile
                  ? { animate: "visible" }
                  : { whileInView: "visible", viewport: { once: false } })}
                className={`p-3 sm:p-4 md:p-6 bg-gray-600/50 backdrop-blur-sm rounded-4xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  isMobile ? "mx-2 max-w-[calc(100%-16px)]" : ""
                }`}
              >
                <div className="flex flex-col md:grid md:grid-cols-3 gap-4 sm:gap-6 items-center">
                  <div className="order-1 md:order-2 md:col-span-1 flex justify-center">
                    <div className="w-[min(80vw,10rem)] h-[min(60vw,12rem)] sm:w-40 sm:h-48 md:w-52 md:h-60 relative rounded-4xl overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.chatbot_name}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                  <div className="order-2 md:order-1 md:col-span-2 p-3 sm:p-4 md:p-8">
                    <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-4 sm:mb-6 md:mb-10">
                      {service.chatbot_name}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-xl text-white mb-4 sm:mb-6 md:mb-8">
                      {service.description}
                    </p>
                    <Link href={service.getStarted}>
                      <Button className="bg-white text-black hover:bg-[#f0f0f0] rounded-full py-2 px-6 text-sm font-semibold transition duration-300 shadow hover:shadow-md focus:outline-none active:bg-[#e0e0e0] active:text-gray-500">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
