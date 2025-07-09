"use client";
import CustomCursor from '@/components/shared/custom-cursor';
import ParticlesBackground from '@/components/shared/particle-background';
import ChatbotServices from './_components/ChatBotServicesNew';
import { ThemeProvider } from 'next-themes';
import React,{useRef} from 'react'
import CommunityServicesPage from './_components/CommunityServicesPage';

const page = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <CustomCursor containerRef={containerRef as React.RefObject<HTMLDivElement>} />
        <ParticlesBackground/>
        <ChatbotServices/>
        <CommunityServicesPage/>
      </ThemeProvider>
    </div>
  )
}

export default page
