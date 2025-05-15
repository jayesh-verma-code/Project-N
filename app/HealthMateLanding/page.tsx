"use client"

import { ArrowLeft, Phone, Video } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import CustomCursor from "@/components/shared/custom-cursor"
import { useRef, useEffect, useState } from "react"

export default function HealthMate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    setIsMobile(/iphone|ipod|ipad|android/i.test(userAgent))
  }, [])

  return (
    <>
      {!isMobile && (
        <CustomCursor containerRef={containerRef as React.RefObject<HTMLDivElement>} />
      )}

      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-80">
          <Image
            src="/image 52.png"
            alt="Pills background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 w-full h-full flex flex-col gap-8 lg:gap-10 overflow-hidden">
          <div className="flex gap-2 justify-between items-center mb-20 lg:mb-10 px-4">
            <Link href="/">
              <div className="bg-white bg-opacity-10 rounded-full p-3 transition-all duration-200 hover:bg-opacity-20 active:bg-white active:bg-opacity-30 active:scale-95">
                <ArrowLeft className="size-4 md:size-5 text-black" />
              </div>
            </Link>

            {/* Title and subtitle */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-20 md:top-4">
              <h1 className="text-[#2563eb] text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-center">
                HealthMate
              </h1>
              <p className="font-bold text-lg lg:text-2xl leading-none tracking-normal text-center self-stretch whitespace-nowrap">
                AI Powered Personal Healthcare Companion
              </p>
            </div>
            <div className="flex gap-4 mt-5">
              <button className="bg-[#16a34a] rounded-full p-3 group hover:bg-[#15803d] shadow-lg hover:shadow-xl transition-all duration-300 active:bg-white active:text-[#16a34a] active:scale-95">
                <Phone className="size-4 md:size-5 text-white group-hover:text-gray-100 transition-all duration-300 active:text-[#16a34a]" />
              </button>
              <button className="bg-[#dc2626] rounded-full p-3 group hover:bg-[#b91c1c] shadow-lg hover:shadow-xl transition-all duration-300 active:bg-white active:text-[#dc2626] active:scale-95">
                <Video className="size-4 md:size-5 text-white group-hover:text-gray-100 transition-all duration-300 active:text-[#dc2626]" />
              </button>
            </div>
          </div>

          <div className="mt-20 lg:mt-[120px] px-4 lg:px-36">
            <div
              className="grid grid-cols-2 lg:grid-cols-4 mx-auto max-w-7xl"
              style={{ gap: ".34px" }}
            >
              <FeatureCard title="Check Vital Signs" imagePath="/vital.svg" />
              <FeatureCard title="Monitor Health Trends" imagePath="/Monitor_health.svg" />
              <FeatureCard title="Receive Health Alerts" imagePath="/healthcare-alert.svg" />
              <FeatureCard title="Upload Health Reports" imagePath="/doctor-ext.svg" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const FeatureCard = ({
  title,
  imagePath,
}: {
  title: string
  imagePath: string
}) => {
  return (
    <div
      className="bg-[#1f2937] bg-opacity-80 rounded-lg p-4 lg:p-6 flex flex-col items-center transition-transform transform hover:-translate-y-4 hover:shadow-[0_6px_30px_rgba(37,99,235,0.6)]"
      style={{
        width: "211.879px",
        padding: "12px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "24px",
        flexShrink: 0,
        borderRadius: "24.072px",
        background: "#1F2937",
      }}
    >
      <div className="relative mb-3 lg:mb-4 w-full aspect-square max-w-[130px]">
        <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-30"></div>
        <div className="relative overflow-hidden w-full h-full rounded-full">
          <Image
            src={imagePath || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 sm:gap-4 lg:gap-[20.34px] w-full">
        <h3 className="text-white text-center font-medium text-xs sm:text-sm lg:text-[13.56px]">
          {title}
        </h3>
        <Link
          href="/HealthMatesecondLanding"
          className="bg-white text-black rounded-full px-3 sm:px-4 lg:px-6 py-1 sm:py-1.5 lg:py-2 text-[10px] sm:text-xs lg:text-sm font-medium hover:bg-opacity-90 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}

