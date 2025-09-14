"use client";
import React, { useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ParticlesBackground from "@/components/shared/particle-background";
import CustomCursor from "@/components/shared/custom-cursor";
import BackButton from "@/components/Auth/BackButton";
import "tailboot-lite/css/responsive.css";
import { HeartPulse } from "lucide-react";

const page = () => {
  const containerRef = useRef(null);
  
  const virzeonXServiceData = [
    {
      id: 1,
      title: "FitronX",
      description: "AI-driven fitness and wellness platform offering personalized workout plans and health tracking.",
    },
    {
      id: 2,
      title: "Wellip",
      description: "AI-driven fitness and wellness platform offering personalized workout plans and health tracking.",
    },
    {
      id: 3,
      title: "HealthMate",
      description: "AI-driven fitness and wellness platform offering personalized workout plans and health tracking.",
    },
    {
      id: 4,
      title: "GoldenCare",
      description: "AI-driven fitness and wellness platform offering personalized workout plans and health tracking.",
    },
    {
      id: 5,
      title: "MindEase",
      description: "AI-driven fitness and wellness platform offering personalized workout plans and health tracking.",
    },
    {
      id: 6,
      title: "PetAI",
      description: "AI-driven fitness and wellness platform offering personalized workout plans and health tracking.",
    },
  ];
  return (
    <div className="p-[3rem] pt-[9rem] items-center min-h-[100vh] w-full">
        <ParticlesBackground />
        <BackButton />
        <CustomCursor containerRef={containerRef} />
        <div className="main-container">
          <div className="row">
            <div className="flex flex-col mb-[5rem] col-lg-6 col-md-12">
              <div className="p-[0.5rem] px-[1rem] w-fit rounded-[2rem] border-[1px] border-solid border-gray-400 text-gray-400 text-[0.8rem]">
                VIRZEONX SERVICES
              </div>
              
              <div className="py-[2rem] text-[2rem] font-[500]">
                <h1 className="leading-[40px]">Explore our cutting edge AI-Powered</h1>
                <h1 className="leading-[40px]">healthcare solutions</h1>
              </div>

              <p className="w-[75%] leading-5 text-gray-400 text-[0.9rem]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ducimus ratione omnis quis magnam vero nostrum atque explicabo suscipit saepe maxime doloribus dicta nobis tempora incidunt et iste, sequi numquam?
              </p>
            </div>

            <div className="flex flex-col max-h-[75vh] overflow-auto col-lg-6 col-md-12">
              <div className="row">
                {virzeonXServiceData.map((service) => (
                    <div className="col-lg-6 col-md-6 col-sm-12 pr-[1rem] pb-[1rem]">
                    <div className="flex flex-col bg-gray-100/5 hover:bg-white/90 text-white hover:text-black backdrop-blur-sm transition-bg duration-500 ease-in-out rounded-xl shadow-lg p-[2rem]">
                        <div className="p-[0.8rem] w-fit rounded-[50%] bg-white/90 text-black mb-[3rem]">
                            <HeartPulse />
                        </div>
                        <h1 className="text-[1.3rem] mb-[1rem] font-[500]">{service.title}</h1>
                        <p className="text-[0.8rem]">{service.description}</p>
                    </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div> 
    </div>
  )
}

export default page