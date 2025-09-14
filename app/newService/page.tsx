"use client";
import React, { useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ParticlesBackground from "@/components/shared/particle-background";
import CustomCursor from "@/components/shared/custom-cursor";
import BackButton from "@/components/Auth/BackButton";
import "tailboot-lite/css/responsive.css";
import { SquareArrowOutDownLeft } from "lucide-react";
import Link from "next/link";

const page = () => {
  const containerRef = useRef(null);

  return (
    <div className="px-[0rem] lg:px-[3rem] py-[3rem] lg:py-[0rem] flex flex-col justify-center items-center">
      <ParticlesBackground />
      <BackButton />
      <div className="flex justify-center items-center">
        <CustomCursor containerRef={containerRef} />
        {/* // Page content */}
        <div className="min-h-[100vh] w-[70%] flex flex-col justify-center items-center ">
          <div className="service-card-wrapper row flex justify-center">
            {/* Card 1 */}
            <div className="service-card group relative text-[#ffffff75] hover:text-black transition-colors duration-500 ease-in-out col-lg-6 col-md-12 p-[1rem] mb-[2rem]">
              <Link href="/VirzeonX">
              <div className="p-[2rem] overflow-hidden pt-[6rem] bg-gray-100/5 hover:bg-white/90 backdrop-blur-sm transition-bg duration-500 ease-in-out rounded-xl shadow-lg relative">
                <img
                  className="absolute opacity-25 group-hover:opacity-100 transition-opacity duration-500 ease-in-out w-[10rem] bottom-[60%] right-[-1rem]"
                  src="https://res.cloudinary.com/dnfq7ty1x/image/upload/v1757830417/nirveon-white_agtczf.png"
                  alt="Image"
                />
                <h2 className="text-[2.8rem] transition-colors duration-500 ease-in-out">
                  01
                </h2>
                <p className="text-[0.8rem] transition-colors duration-500 ease-in-out">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                  deserunt et modi, atque tempora voluptatum
                </p>
                <div className="flex justify-between items-end mt-[2rem]">
                  <h1 className="text-[2rem] transition-colors duration-500 ease-in-out">
                    VirzeonX
                  </h1>
                  <div>
                    <SquareArrowOutDownLeft size={26} />
                  </div>
                </div>
              </div>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="service-card group relative text-[#ffffff75] hover:text-black transition-colors duration-500 ease-in-out col-lg-6 col-md-12 p-[1rem] mb-[2rem]">
              <Link href="/MedhaCare">
              <div className="p-[2rem] overflow-hidden pt-[6rem] bg-gray-100/5 hover:bg-white/90 backdrop-blur-sm transition-bg duration-500 ease-in-out  rounded-xl shadow-lg relative">
                <img
                  className="absolute opacity-25 group-hover:opacity-100 transition-opacity duration-500 ease-in-out w-[10rem] bottom-[60%] right-[-1rem]"
                  src="https://res.cloudinary.com/dnfq7ty1x/image/upload/v1757830417/nirveon-white_agtczf.png"
                  alt="Image"
                />
                <h2 className="text-[2.8rem] transition-colors duration-500 ease-in-out">
                  02
                </h2>
                <p className="text-[0.8rem] transition-colors duration-500 ease-in-out">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                  deserunt et modi, atque tempora voluptatum
                </p>
                <div className="flex justify-between items-end mt-[2rem]">
                  <h1 className="text-[2rem] transition-colors duration-500 ease-in-out">
                    MedhaCare
                  </h1>
                  <div>
                    <SquareArrowOutDownLeft size={26} />
                  </div>
                </div>
              </div>
              </Link>
            </div>
          </div>
          <div className="service-para text-[#777777] px-[1rem]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Dignissimos aspernatur recusandae officiis est facilis iste quo
            corporis nulla culpa beatae distinctio, maiores, minima incidunt
            laborum reprehenderit similique tenetur cupiditate odio?
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
