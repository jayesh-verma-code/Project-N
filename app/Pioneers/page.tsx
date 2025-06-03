"use client";
import CustomCursor from '@/components/shared/custom-cursor';
import ParticlesBackground from '@/components/shared/particle-background';
import ChatbotServices from '@/sections/ChatBotServices/chatbot-services';
import InvestorSection from '@/sections/Patron/Investors';
import TeamMembersSection from '@/sections/Pioneer/pioneer';
import { ThemeProvider } from 'next-themes';
import React,{useRef} from 'react'

const page = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <CustomCursor
          containerRef={containerRef as React.RefObject<HTMLDivElement>}
        />
        <ParticlesBackground/>
        <InvestorSection/>
        <TeamMembersSection/>
      </ThemeProvider>
    </div>
  )
}

export default page
