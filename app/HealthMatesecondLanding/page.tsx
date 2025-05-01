'use client';
import { useRef } from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ThemeProvider } from "next-themes";
import ParticlesBackground from "@/components/shared/particle-background";
import NoiseTexture from "@/components/shared/noise-texture";

// Types
interface MedicalCategory {
  id: string;
  title: string;
  image: string;
}

// Main Page Component
export default function HealthMatePage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mock data - in a real app, this might come from an API
  const categories: MedicalCategory[] = [
    { id: 'kidney-ct', title: 'Kidney - CT', image: '/image kidney.png' },
    { id: 'chest-xray', title: 'Chest - Xray', image: '/image chest xray.png' },
    { id: 'mri', title: 'MRI', image: '/image mri.png' },
    { id: 'xray', title: 'Xray', image: '/image xray.png' },
    { id: 'thyroid', title: 'Thyroid', image: '/image thytoid.png' },
    { id: 'sonography', title: 'Sonography', image: '/image sonography.png' },
    { id: 'biopsy', title: 'Biopsy', image: '/image biospy.png' },
    { id: 'other', title: 'Other', image: '/image others.png' },
  ];

  const handleGetStarted = (category: MedicalCategory) => {
    // In a real app, this would navigate to a specific page
    alert(`Starting ${category.title} process`);
    // Example navigation: router.push(`/category/${category.id}`);
  };

  const handleBack = () => {
    // In a real app, this would navigate back
    alert('Going back to previous screen');
    // Example: router.back();
  };

  return (
     <ThemeProvider attribute="class" defaultTheme="dark">
           <main
             ref={containerRef}
             className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 dark:from-black dark:to-gray-900 text-white overflow-hidden"
           >
             
             <NoiseTexture />
             <ParticlesBackground />
               <>
               <div className="container mx-auto px-4 py-6 relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 py-4">
          <button 
            onClick={handleBack}
            className="w-10 h-10 bg-opacity-10 bg-white rounded-full flex items-center justify-center hover:bg-opacity-20 transition-colors self-start md:self-auto"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-500 text-center flex-grow my-4 md:my-0">HealthMate</h1>
          <div className="inline-flex items-center bg-black bg-opacity-50 rounded-full px-5 py-2 border border-gray-700 self-center md:self-auto">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></div>
            <span>Online</span>
          </div>
        </header>
        
        {/* Medical Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {categories.map(category => (
            <div 
              key={category.id}
              className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-white flex items-center justify-center relative">
                {/* Using a placeholder if real image is not available */}
                <div className="w-full h-full relative">
                  <Image 
                    src={category.image}
                    alt={`${category.title} illustration`}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.jpg';
                    }}
                  />
                </div>
              </div>
              <h3 className="text-lg font-medium mb-4">{category.title}</h3>
              <button 
                onClick={() => handleGetStarted(category)}
                className="bg-white text-gray-800 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors"
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>

               </>
           </main>
         </ThemeProvider>  
          

  );
}

// Additional Components (included in the same file for simplicity)
interface NetworkBackgroundProps {
  position: 'top-left' | 'bottom-right';
}

function NetworkBackground({ position }: NetworkBackgroundProps) {
  const positionClasses = {
    'top-left': '-top-12 -left-12',
    'bottom-right': '-bottom-12 -right-12'
  };

  return (
    <svg 
      className={`fixed w-64 h-64 opacity-20 z-0 ${positionClasses[position]}`} 
      viewBox="0 0 200 200"
    >
      <g fill="none" stroke="white" strokeWidth="1">
        <circle cx="100" cy="100" r="80" />
        <circle cx="100" cy="100" r="60" />
        <line x1="30" y1="100" x2="170" y2="100" />
        <line x1="100" y1="30" x2="100" y2="170" />
        <line x1="50" y1="50" x2="150" y2="150" />
        <line x1="50" y1="150" x2="150" y2="50" />
      </g>
    </svg>
  );
}