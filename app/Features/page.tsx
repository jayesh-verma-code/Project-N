"use client";
import { useRef } from 'react'
import CustomCursor from '@/components/shared/custom-cursor'
import ParticlesBackground from '@/components/shared/particle-background'
import FeaturesSection from '@/sections/Features/features-section'
import { ThemeProvider } from 'next-themes'
import React from 'react'
// import AnimatedHoverPage from '@/components/featuretrial';

const page = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <CustomCursor
                  containerRef={containerRef as React.RefObject<HTMLDivElement>}
                />
        <ParticlesBackground/>
        <FeaturesSection />
        {/* <AnimatedHoverPage/> */}
      </ThemeProvider>
    </div>
  )
}

export default page
