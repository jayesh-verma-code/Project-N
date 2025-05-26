"use client";
import { useRef } from "react";
import { ThemeProvider } from "next-themes";
import CustomCursor from "@/components/shared/custom-cursor";
import NoiseTexture from "@/components/shared/noise-texture";
import ParticlesBackground from "@/components/shared/particle-background";

export default function CallScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main
        ref={containerRef}
        className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 dark:from-black dark:to-gray-900 text-white overflow-hidden"
      >
        <CustomCursor
          containerRef={containerRef as React.RefObject<HTMLDivElement>}
        />
        <NoiseTexture />
        <ParticlesBackground />
        {children}
      </main>
    </ThemeProvider>
  );
}