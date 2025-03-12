"use client";

import { useEffect, useState, useRef } from "react";
import IntroAnimation from "@/components/intro-animation";
import Navbar from "@/components/marginals/navbar";
import ChatbotServices from "@/components/chatbot-services";
import AuthSection from "@/components/auth-section";
import FloatingChatbot from "@/components/floating-chatbot";
import { ThemeProvider } from "next-themes";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import TestimonialsSection from "@/components/testimonial-section"
import FaqSection from "@/components/faq-section";
import Footer from "@/components/marginals/footer";
import ParticlesBackground from "@/components/particle-background";
import CustomCursor from "@/components/custom-cursor";
import ScrollProgress from "@/components/scroll-progress";
import NoiseTexture from "@/components/noise-texture";
import MarqueeText from "@/components/marquee-text";
import VerticalMenuIndicator from "@/components/vertical-menu-indicator"
import { useScroll } from "framer-motion";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main
        ref={containerRef}
        className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 dark:from-black dark:to-gray-900 text-white overflow-hidden"
      >
        <CustomCursor containerRef={containerRef as React.RefObject<HTMLDivElement>} />
        <ScrollProgress scrollYProgress={scrollYProgress} />
        <NoiseTexture />
        <ParticlesBackground />
        <VerticalMenuIndicator />

        {!introComplete ? (
          <IntroAnimation onComplete={() => setIntroComplete(true)} />
        ) : (
          <>
            <Navbar scrolled={scrolled} />
            <HeroSection />
            <MarqueeText />
            <FeaturesSection />
            <ChatbotServices />
            <TestimonialsSection />
            <FaqSection />
            <AuthSection />
            <Footer />
            <FloatingChatbot />
          </>
        )}
      </main>
    </ThemeProvider>
  );
}
