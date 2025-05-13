import CustomCursor from "@/components/shared/custom-cursor";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div
    className="min-h-screen w-full  bg-cover bg-center relative"
    style={{ backgroundImage: "url('/mindease-bg.jpg')" }}
  >
      <CustomCursor
        containerRef={containerRef as React.RefObject<HTMLDivElement>}
      />
      <div className="w-full h-full flex flex-col gap-8 lg:gap-10 overflow-hidden ">
        <div className="flex gap-2 justify-between items-center mb-20 lg:mb-10 px-4">
          <div className="bg-white bg-opacity-10 rounded-full p-3">
            <Link href="/">
              <ArrowLeft className="size-4 md:size-5 text-black" />
            </Link>
          </div>


          {/* Title and subtitle */}
          <div className="absolute left-1/2 transform -translate-x-1/2  top-20  md:top-4">
            <h1 className="text-[#1760f4] text-3xl md:text-4xl lg:text-4xl font-bold mb-2 text-center">
              MindEase
            </h1>
            <p className="text-white text-center font-bold text-balance md:text-xl leading-none tracking-normal ">
              Mental Wellness & Lifestyle Coach
            </p>
          </div>


          <div className="flex gap-4 mt-5">
            <button className="bg-[#16a34a] rounded-full p-3">
              <Phone className="size-4 md:size-5 text-white" />
            </button>
            <button className="bg-[#dc2626] rounded-full p-3">
              <Video className="size-4 md:size-5 text-white " />
            </button>
          </div>
        </div>
        <div className="lg:mt-[11%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-9 mt-30  px-10 lg:px-36 ">
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

function Card({
  title,
  imagePath,
}: {
  title: string;
  imagePath: string;
}) {
  return (
    <div className="bg-[#1F2937] flex flex-col items-center justify-between rounded-md mb-3 p-4 w-full h-[250px]">
      {/* Image */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="absolute inset-2 rounded-full bg-white blur-sm opacity-20 z-0" />
        <Image
          src={imagePath || "/placeholder.svg"}
          alt={title}
          width={96}
          height={96}
          className="relative object-center z-10 rounded-full"
        />
      </div>

      {/* Title with fixed height */}
      <div className=" flex items-center justify-center text-center px-2">
        <h1 className="text-white font-semibold text-sm leading-snug">
          {title}
        </h1>
      </div>

      {/* Button */}
      <Button className="flex items-center justify-center hover:bg-white rounded-full px-1">
        <Link
          href="/mindease/chat"
          className="bg-white text-black rounded-full py-2 px-3 text-sm font-medium"
        >
          Get Started
        </Link>
      </Button>
    </div>
  );
}

