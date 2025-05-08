import CustomCursor from "@/components/shared/custom-cursor";
import { ArrowLeft, Phone, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function GoldencareLandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: "url('/goldencare-bg.png')" }}
    >
      <CustomCursor
        containerRef={containerRef as React.RefObject<HTMLDivElement>}
      />
      <div className="w-full h-full flex flex-col gap-8 lg:gap-10 overflow-hidden">
        <div className="flex gap-2 justify-between items-center mb-20 lg:mb-10 px-4">
          <div className="bg-white bg-opacity-10 rounded-full p-3">
            <Link href="/">
              <ArrowLeft className="size-4 md:size-5 text-black" />
            </Link>
          </div>

          {/* Title and subtitle */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-20 md:top-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent">
              Goldencare
            </h1>
            <p className="font-bold md:text-xl leading-none tracking-normal bg-gradient-to-r from-[#FFD700] to-[#DAA520] bg-clip-text text-transparent">
              Elder Care System
            </p>
          </div>

          <div className="flex gap-4 mt-5">
            <button className="bg-[#16a34a] rounded-full p-3">
              <Phone className="size-4 md:size-5 text-white" />
            </button>
            <button className="bg-[#dc2626] rounded-full p-3">
              <Video className="size-4 md:size-5 text-white" />
            </button>
          </div>
        </div>
        <div className="lg:mt-[11%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-5 lg:gap-5 mt-30 px-10 lg:px-36">
          <Card
            title="Emergency Help"
            imagePath="/Emergency-Help.png"
          />
          <Card
            title="Doctor Appointment"
            imagePath="/Doctor-Appointment.png"
          />
          <Card
            title="Friendly Chat For Companionship"
            imagePath="/Friendly-Chat.png"
          />
          <Card
            title="Medication Reminder"
            imagePath="/Medication-Reminder.png"
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
    <div className="bg-[#1F2937] py-2 px-2 md:px-2 flex flex-col items-center justify-center gap-0 rounded-md mb-3">
      <div className="relative w-44 h-44 flex items-center justify-center">
        <div className="absolute inset-4 rounded-full bg-white blur-sm opacity-20 z-0" />
        <Image
          src={imagePath || "/placeholder.svg"}
          alt={title}
          width={120}
          height={120}
          className="realative object-center z-10 rounded-full"
        />
      </div>
      <div className="mb-2">
        <h1 className="text-white font-semibold text-center">{title}</h1>
      </div>
      <div className="flex flex-col gap-2 w-full px-2 mb-2">
        <Link 
          href="/goldencare/chat" 
          className="bg-white text-black rounded-full py-2 px-3 text-sm font-medium text-center hover:bg-gray-200 transition-colors"
        >
          Go to Chatbot
        </Link>
        <Link 
          href="/goldencare/check-in" 
          className="bg-[#FFD700] text-black rounded-full py-2 px-3 text-sm font-medium text-center hover:bg-[#DAA520] transition-colors"
        >
          Get Daily Health Check-in
        </Link>
      </div>
    </div>
  );
}