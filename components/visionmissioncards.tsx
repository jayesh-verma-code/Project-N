import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ParticlesBackground from './shared/particle-background';
import { ThemeProvider } from 'next-themes';

const VisionMissionCards = () => {
  const [visionVisible, setVisionVisible] = useState(false);
  const [missionVisible, setMissionVisible] = useState(false);

  const visionRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    };

    const visionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisionVisible(true);
        }
      });
    }, observerOptions);

    const missionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setMissionVisible(true);
        }
      });
    }, observerOptions);

    if (visionRef.current) visionObserver.observe(visionRef.current);
    if (missionRef.current) missionObserver.observe(missionRef.current);

    return () => {
      visionObserver.disconnect();
      missionObserver.disconnect();
    };
  }, []);

  return (
    <ThemeProvider>
     <div className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      
      {/* Background image using Next.js <Image> */}
      <Image
        src="/VisionMission.jpg"
        alt="Background"
        fill
        priority
        className="absolute inset-0 object-cover object-center z-0"
      />

      {/* Dark overlay for better text readability */}
      {/* <div className="absolute inset-0 bg-black/20 z-10" /> */}
       <ParticlesBackground/>

      {/* Foreground content */}
      <div className="relative z-20 max-w-7xl w-full flex flex-col items-center justify-center space-y-20 md:space-y-40">
        {/* Vision */}
        <div ref={visionRef} className="relative flex items-center justify-center">
          <div className={`flex items-center transition-all duration-1000 ease-out ${
            visionVisible 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-full opacity-0'
          }`}>
            <div className="bg-gray-900/80 backdrop-blur-none border-2 border-teal-500 rounded-2xl p-6 md:p-10 shadow-2xl max-w-sm md:max-w-lg relative">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 tracking-wide">Vision</h2>
              <p className="text-gray-300 text-sm md:text-md leading-relaxed">
                To build a seamless, AI-driven healthcare ecosystem that delivers holistic, integrated care 
                for humans and pets—supporting health, wellness, and beyond.
              </p>
              <div className={`absolute top-1/2 left-full h-0.5 bg-gradient-to-r from-teal-500 to-transparent transition-all duration-1000 delay-300 transform -translate-y-1/2 hidden md:block ${
                visionVisible ? 'w-60 lg:w-80 opacity-100' : 'w-0 opacity-0'
              }`} />
            </div>
          </div>
        </div>

        {/* Mission */}
        <div ref={missionRef} className="relative flex items-center justify-center">
          <div className={`flex items-center transition-all duration-1000 ease-out ${
            missionVisible 
              ? 'translate-x-0 opacity-100' 
              : '-translate-x-full opacity-0'
          }`}>
            <div className="bg-gray-900/80 backdrop-blur-none border-2 border-teal-500 rounded-2xl p-6 md:p-10 shadow-2xl max-w-sm md:max-w-lg relative">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 tracking-wide">Mission</h2>
              <p className="text-gray-300 text-sm md:text-md leading-relaxed">
                NirveonX's mission is to embody the principle of "One AI. Infinite Care" by offering 
                comprehensive solutions that encompass preventive care, mental health, elder care, 
                fitness, and lifestyle coaching through a unified platform.
              </p>
              <div className={`absolute top-1/2 right-full h-0.5 bg-gradient-to-l from-teal-500 to-transparent transition-all duration-1000 delay-300 transform -translate-y-1/2 hidden md:block ${
                missionVisible ? 'w-60 lg:w-80 opacity-100' : 'w-0 opacity-0'
              }`} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </ThemeProvider>
   
  );
};

export default VisionMissionCards;