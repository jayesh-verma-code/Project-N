"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// Simple SVG icons to avoid external dependencies
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
  </svg>
);

const ReplayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
  </svg>
);

export default function AboutUs() {
  const [flipped, setFlipped] = useState(false);
  const [activeTab, setActiveTab] = useState("why");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef(null);
  const componentRef = useRef(null);

  const handleTabClick = (tab, e) => {
    e.stopPropagation();
    setActiveTab(tab);
  };

  // Handle video ended event to auto-flip
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleVideoEnd = () => {
        setFlipped(true);
      };

      video.addEventListener('ended', handleVideoEnd);
      
      // Cleanup event listener
      return () => {
        video.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, []);

  // Intersection Observer for scroll-based video control
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsInView(isVisible);
        
        const video = videoRef.current;
        if (video) {
          if (isVisible) {
            // Component is in view, play video
            video.play().then(() => {
              setIsPlaying(true);
            }).catch((error) => {
              console.log("Video play failed:", error);
            });
          } else {
            // Component is out of view, pause video
            video.pause();
            setIsPlaying(false);
          }
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of component is visible
        rootMargin: '0px 0px -10% 0px' // Add some margin to prevent flickering
      }
    );

    const currentRef = componentRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handlePlayPause = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleReplay = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play();
      setIsPlaying(true);
    }
  };

  const tabContent = {
    why: (
      <>
        <h2 className="text-2xl font-bold mb-4">Why?</h2>
        <p className="mb-4">
          Access to quality healthcare remains one of the most pressing global
          challenges.{" "}
          <em>
            According to the World Health Organization (WHO), nearly 5.8 billion
            people worldwide lack access to essential health services.
          </em>
          While developing nations struggle with inadequate healthcare
          infrastructure, developed countries grapple with skyrocketing medical
          costs.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>
            <strong>Rising healthcare costs:</strong> The global healthcare
            market is projected to reach <em>$12 trillion by 2025</em>, with
            costs continuing to rise.
          </li>
          <li>
            <strong>Shortage of medical professionals:</strong> The WHO predicts
            a <em>shortage of 10 million healthcare workers by 2030</em>, making
            timely medical consultations difficult.
          </li>
          <li>
            <strong>Mental health crisis:</strong> Over{" "}
            <em>1 billion people</em> worldwide suffer from mental health
            disorders, yet <em>only 2% of global healthcare budgets</em> are
            allocated to mental health services.
          </li>
        </ul>
        <p>
          At <strong>NirveonX</strong>, we believe technology can bridge these
          gaps. Our mission is to make{" "}
          <em>healthcare accessible, affordable, and truly personalized</em>
          —empowering individuals to take control of their well-being.
        </p>
      </>
    ),
    how: (
      <>
        <h2 className="text-2xl font-bold mb-4">How?</h2>
        <p className="mb-4">
          We are a team of innovators and problem-solvers who believe in the
          transformative power of <em>Artificial Intelligence (AI)</em> and{" "}
          <em>telehealth solutions</em>. By integrating AI-driven diagnostics,
          virtual consultations, and direct access to industry professionals, we
          are revolutionizing the way people experience healthcare.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>
            <strong>AI-driven intelligence:</strong> Personalized healthcare
            recommendations, real-time symptom analysis, and predictive
            diagnostics.
          </li>
          <li>
            <strong>Video & audio consultations:</strong> Connect instantly with{" "}
            <em>
              doctors, mental health therapists, fitness coaches, and elder care
              specialists
            </em>
            .
          </li>
          <li>
            <strong>Remote healthcare access:</strong> Get expert opinions from{" "}
            <em>top medical professionals, psychologists, and nutritionists</em>{" "}
            without physical visits.
          </li>
        </ul>
      </>
    ),
    what: (
      <>
        <h2 className="text-2xl font-bold mb-4">What?</h2>
        <p className="mb-4">
          At the heart of NirveonX is a{" "}
          <em>comprehensive AI-powered healthcare platform</em> designed to
          deliver <em>seamless and personalized</em> medical experiences.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>
            <strong>Healthmate</strong> – Virtual doctor consultations, fitness
            & nutrition guidance.
          </li>
          <li>
            <strong>Pet AI</strong> – AI-driven veterinary care for pets and
            animal wellness.
          </li>
          <li>
            <strong>Golden Care</strong> – Elder care support and assistance for
            aging individuals.
          </li>
          <li>
            <strong>Mindease</strong> – Anonymous mental health support,
            therapy, and emotional well-being.
          </li>
        </ul>
        <p className="mb-4">
          With <em>live video & audio calls</em>, NirveonX connects users with
          industry experts:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>
            <strong>Licensed doctors</strong> for quick diagnosis and treatment
            plans.
          </li>
          <li>
            <strong>Certified therapists</strong> for mental health support in a
            safe and private space.
          </li>
          <li>
            <strong>Fitness and wellness experts</strong> for personalized
            health coaching.
          </li>
          <li>
            <strong>24/7 accessibility</strong>—because healthcare should never
            be out of reach.
          </li>
        </ul>
        <p>
          By leveraging{" "}
          <em>cutting-edge AI, telemedicine, and real-time consultations</em>,{" "}
          <strong>
            NirveonX makes proactive healthcare a reality, not a luxury.
          </strong>
        </p>
      </>
    ),
  };

  return (
    <div ref={componentRef}>
      <div className="flex items-center justify-center min-h-screen mt-0 pt-0 bg-black/50">
        <div className="w-full max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-2 mt-0">
              About Us
            </h1>
          </motion.div>

          {/* 16:9 Aspect Ratio Container */}
          <div className="relative w-full aspect-video [perspective:1500px] max-w-5xl mx-auto">

            {/* Flip Card */}
            <motion.div
              className="absolute inset-0 rounded-2xl shadow-lg [transform-style:preserve-3d] z-10"
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
              onClick={() => setFlipped(!flipped)}
            >
              {/* Front Side with Video Background */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white rounded-2xl [backface-visibility:hidden] p-8 text-center overflow-hidden">
                {/* Video Background for Front Side Only */}
                <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl">
                  <video
                    className="w-full h-full object-cover"
                    src="/intro.mp4"
                    
                    ref={videoRef}
                    preload="metadata"
                  />
                  {/* Video Controls */}
                  <div className="absolute bottom-4 right-4 z-20 flex items-center space-x-2">
                    <button 
                      onClick={handlePlayPause}
                      className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition"
                    >
                      {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <button 
                      onClick={handleReplay}
                      className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition"
                    >
                      <ReplayIcon />
                    </button>
                  </div>
                </div>
                
                {/* Content Overlay - Positioned at bottom */}
                {/* <div className="absolute bottom-0 left-0 right-0 z-10 p-8 flex justify-center items-end">
                  <span className="relative text-blue-400 text-lg font-semibold px-6 py-3 bg-black/30 backdrop-blur-sm rounded-full border border-blue-400/30 shadow-lg
                    animate-pulse 
                    before:absolute before:inset-0 before:rounded-full before:bg-blue-400/20 before:blur-md before:animate-pulse
                    after:absolute after:inset-0 after:rounded-full after:shadow-[0_0_20px_rgba(59,130,246,0.5)] after:animate-pulse
                    hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] hover:text-blue-300 transition-all duration-900">
                    <span className="relative z-10 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
                      Tap to explore our mission →
                    </span>
                  </span>
                </div> */}
              </div>

              {/* Back Side with Solid Background */}
              <div className="absolute inset-0 flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="flex border-b border-white/20 mb-4">
                  {["why", "how", "what"].map((tab) => (
                    <button
                      key={tab}
                      onClick={(e) => handleTabClick(tab, e)}
                      className={`px-4 py-2 text-lg font-medium ${
                        activeTab === tab
                          ? "text-blue-300 border-b-2 border-blue-300"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}?
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-auto pr-2 text-left">
                  {tabContent[activeTab]}
                </div>

                <div className="mt-4 text-center">
                  <p className="font-bold text-blue-300">
                    Join Us in Redefining Healthcare—One Innovation at a Time.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mb-10 bg-black">
        <div className="relative group bg-transparent text-white rounded-2xl p-8 shadow-lg w-3/4 transition duration-300 hover:bg-blue-900/30 overflow-hidden">
          <h2 className="text-2xl font-bold mb-4">Vision:</h2>
          <p className="mb-6">
            To build a seamless, AI-driven healthcare ecosystem that delivers
            holistic, integrated care for humans and pets—supporting health,
            wellness, and beyond.
          </p>
          <h2 className="text-2xl font-bold mb-4">Mission:</h2>
          <p className="mb-6">
            NirveonX&apos;s mission is to embody the principle of "One AI.
            Infinite Care" by offering comprehensive solutions that encompass
            preventive care, mental health, elder care, fitness, and lifestyle
            coaching through a unified platform.
          </p>

          {/* Animated line */}
          <div className="absolute bottom-0 left-0 h-1 bg-blue-800 w-0 group-hover:w-full transition-all duration-1000"></div>
        </div>
      </div>
    </div>
  );
}