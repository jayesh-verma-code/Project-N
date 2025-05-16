'use client';
import { useRef } from "react";
import { useRouter } from 'next/navigation';
import { ThemeProvider } from "next-themes";
import ParticlesBackground from "@/components/shared/particle-background";
import NoiseTexture from "@/components/shared/noise-texture";
import CustomCursor from "@/components/shared/custom-cursor";
import Link from "next/link";

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
  
  // Categories data matching the screenshot
  const categories: MedicalCategory[] = [
    { id: 'kidney-ct', title: 'Kidney - CT', image: '/imagekidney.png' },
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

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main
        ref={containerRef}
        className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden"
      >
        <NoiseTexture />
        <ParticlesBackground />
        <CustomCursor
          containerRef={containerRef as React.RefObject<HTMLDivElement>}
        />

        {/* Background image */}
        
        
        {/* Back button */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
          <Link href="/HealthMateLanding">
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-md border border-black">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-black"
                >
                  <path
                    d="M20 12H4M4 12L10 6M4 12L10 18"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Decorative particle cluster */}
        <div className="absolute top-0 right-0 z-10 opacity-40">
          <div className="w-64 h-64 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 py-6 relative z-10">
          {/* Header - Centered */}
          <header className="flex flex-col items-center mb-16 mt-8">
            <h1 className="text-4xl font-bold text-blue-500 mb-2">HealthMate</h1>
            <div className="inline-flex border border-green-500 items-center bg-opacity-50 rounded-full px-4 py-1">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Online</span>
            </div>
          </header>
          
          {/* Medical Categories Grid - Matches screenshot */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {categories.map(category => (
              <div 
                key={category.id}
                className="flex flex-col items-center bg-gray-800 bg-opacity-50 rounded-lg p-4 relative z-30"
              >
                {/* Circular image */}
                <div className="md:w-32 md:h-32 w-24 h-24 rounded-full overflow-hidden mb-4 flex items-center justify-center">
                  {/* Placeholder for actual images */}
                  <div className={`w-full h-full rounded-full`}>
                    <img src={category.image} alt={category.title} className="object-cover w-[100%] h-[100%]" /> 
                  </div>
                </div>
                
                <span className="text-sm mt-3 mb-3">{category.title}</span>
                
                <Link 
                  href="/Healthmate"
                  className="bg-white text-black text-xs font-medium py-1 px-4 rounded-full hover:bg-gray-200 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
          
          {/* Bottom particle cluster */}
          <div className="absolute bottom-0 left-0 z-10 opacity-40">
            <div className="w-64 h-64 rounded-full"></div>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
