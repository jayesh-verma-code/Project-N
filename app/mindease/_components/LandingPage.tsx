import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
    return (
    <div
        className="min-h-screen w-full  bg-cover bg-center relative"
        style={{ backgroundImage: "url('/mindease-bg.jpg')" }}
    >
          
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
            <div className="lg:mt-[12%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-5 lg:gap-5 mt-30 px-10 lg:px-36 ">
                <Card 
                title="Guided Meditation" imagePath="/Guided-mindease.png"/>
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
  }){
    return(
        <div className="bg-[#1f2937] py-5 px-5 md:px-10 flex flex-col items-center justify-center gap-3 rounded-md mb-3">

            <div className="relative w-44 h-44 flex items-center justify-center">
                <div className="absolute inset-4 rounded-full bg-white blur-sm opacity-10 z-0" />
                <Image
                    src={imagePath || "/placeholder.svg"}
                    alt={title}
                    width={120}
                    height={120}
                    className="realative object-center z-10 rounded-full"
                />
            </div>
            <div>
                <h1 className="text-white font-semibold text-center">{title}</h1>
            </div>
            <Button className="mb-2 flex items-center justify-center hover:bg-white rounded-full">
                <Link href={"/mindease/chat"} className="bg-white text-black rounded-full py-2 px-3 text-sm font-medium">Get Started</Link>
            </Button>
        </div>
    )
}