'use client'
import CustomCursor from "@/components/shared/custom-cursor";
import ParticlesBackground from "@/components/shared/particle-background";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function LandingPage() {
  const router = useRouter();
  const callerName = "MindEase Assistant";
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAudioCall = () => {
    router.push(`/callscreen/audio_call?callerName=${encodeURIComponent(callerName)}`);
  };

  const handleVideoCall = () => {
    router.push(`/callscreen/video_call?callerName=${encodeURIComponent(callerName)}`);
  };

  return (
    <div ref={containerRef}
    className="min-h-screen w-full  bg-[#000a0b] bg-center relative flex items-start justify-center"
    
  >
    <ParticlesBackground/>
    <img src="/mindease-bg.jpg" alt="" className="absolute min-w-[780px]  lg:w-[1000px] top-0 " />
      <CustomCursor
        containerRef={containerRef as React.RefObject<HTMLDivElement>}
      />
      <ParticlesBackground/>
      <div className="absolute w-full h-full flex flex-col gap-8 lg:gap-10 overflow-x-hidden z-10">
        <div className="flex gap-2 justify-between items-center mb-20 lg:mb-10 px-4 lg:px-10">
        <Link href="/" className="z-10 bg-white bg-opacity-10 rounded-full p-2 md:p-3 mt-5 md:mt-0 hover:bg-opacity-20 active:bg-opacity-30 transition">
  <ArrowLeft className="size-4 md:size-5 text-black" />
</Link>




          {/* Title and subtitle */}
          <div className="absolute left-1/2 transform -translate-x-1/2  top-16  md:top-4 w-full" >
            <h1 className="text-[#1760f4] text-4xl md:text-4xl lg:text-5xl font-bold mb-2 text-center">
              MindEase 
            </h1>
            <p className="text-white text-center font-bold text-balance md:text-2xl leading-none tracking-normal">
              Mental Wellness & Lifestyle Coach
            </p>
          </div>


          <div className="absoute flex gap-4 mt-5 lg:mt-16">
            <button className="bg-[#16a34a] rounded-full p-2 md:p-3" onClick={handleAudioCall} aria-label="Start audio call with MindEase Assistant">
              <Phone className="size-4 md:size-5 text-white" />
            </button>
            <button className="bg-[#dc2626] rounded-full p-2 md:p-3" onClick={handleVideoCall} aria-label="Start video call with MindEase Assistant">
              <Video className="size-4 md:size-5 text-white " />
            </button>
          </div>
        </div>
        <div className="lg:mt-[11%] grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 items-center justify-center  gap-4 md:gap-9 mt-30 px-3 mx-auto">
          <Card
            title="Guided Meditation" imagePath="/Guided-mindease.png" />
          <Card
            title="Hobby-Based Theraphy"
            imagePath="/Hobby-mindease.png"
          />
          <Card
            title="Daily Stress Check"
            imagePath="/Daily-mindease.png"
          />
          <Card
            title="Mindfulness Tips"
            imagePath="/Mindfull-mindease.png"
          />
        </div>
      </div>
    </div>

  );
}

function Card({ title, imagePath }: { title: string; imagePath: string }) {
  return (
    <div className="bg-[#1f2937] h-[90%] md:h-[100%] py-3 px-5 md:px-7 flex flex-col items-center justify-center gap-1 rounded-3xl shadow-md 
      transform hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(96,165,250,0.6)] 
      transition duration-200 ease-in-out">
      
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-2 rounded-full bg-white blur-sm opacity-20 z-0" />
        <Image
          src={imagePath || "/placeholder.svg"}
          alt={title}
          width={180}
          height={180}
          className="relative w-50 md:w-44 object-center z-10 rounded-full"
        />
      </div>

      <div>
        <h1 className="text-white text-sm md:text-balance font-semibold text-center mb-3">
          {title}
        </h1>
      </div>

      <Link href={"/mindease/chat"} className="pb-4">
        <Button className="bg-white text-black hover:bg-[#f0f0f0] rounded-full py-2 px-6 text-sm font-semibold transition duration-300 shadow hover:shadow-md focus:outline-none active:bg-[#e0e0e0] active:text-gray-500">
          Get Started
        </Button>
      </Link>
    </div>
  );
}
