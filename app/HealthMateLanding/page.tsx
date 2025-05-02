"use client"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { ArrowLeft, Phone, Video } from "lucide-react"
import "@fontsource/roboto/700.css"
import CustomCursor from "@/components/shared/custom-cursor"

export default function HealthMate() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <CustomCursor containerRef={containerRef as React.RefObject<HTMLDivElement>} />
      <div ref={containerRef} className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-80">
          <Image src="/image 52.png" alt="Pills background" fill className="object-cover" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="flex flex-col lg:block relative mb-8">
            <div className="absolute top-4 left-4 lg:absolute lg:top-[25px] lg:left-[57px] mb-6 lg:mb-0">
              <Link
                href="/"
                className="h-10 w-10 lg:h-12 lg:w-12 bg-white bg-opacity-10 rounded-full p-2 lg:p-3 flex items-center justify-center"
              >
                <ArrowLeft className="text-black" size={20} />
              </Link>
            </div>

            <div>
              <div className="absolute top-4 right-4 flex gap-3 lg:hidden">
                <button className="bg-[#16a34a] rounded-full p-2 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </button>
                <button className="bg-[#dc2626] rounded-full p-2 flex items-center justify-center">
                  <Video className="h-5 w-5 text-white" />
                </button>
              </div>

              <div className="hidden lg:flex justify-end gap-3 lg:absolute lg:right-[143px] lg:top-[85px]">
                <button className="bg-[#16a34a] rounded-full p-3 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </button>
                <button className="bg-[#dc2626] rounded-full p-3 flex items-center justify-center">
                  <Video className="h-6 w-6 text-white" />
                </button>
              </div>
            </div>

            <div className="text-center mt-20 lg:mt-0 lg:absolute lg:top-[17px] lg:left-[160px] lg:right-[160px] mb-6 lg:mb-0">
              <h1 className="text-[#2563eb] text-4xl lg:text-5xl font-bold mb-2">HealthMate</h1>
              <p className="font-roboto font-bold text-lg lg:text-2xl leading-none tracking-normal">
                AI Powered Personal Healthcare Companion
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-20 lg:mt-[200px] lg:w-[1072px] lg:mx-auto">
            {["Check Vital Signs", "Monitor Health Trends", "Receive Health Alerts", "Upload Health Reports"].map(
              (title, i) => (
                <FeatureCard
                  key={i}
                  title={title}
                  imagePath={["/vital.svg", "/Monitor_health.svg", "/healthcare-alert.svg", "/doctor-ext.svg"][i]}
                />
              )
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function FeatureCard({ title, imagePath }: { title: string; imagePath: string }) {
  return (
    <div className="bg-[#1f2937] bg-opacity-80 rounded-lg p-4 lg:p-6 flex flex-col items-center">
      <div className="relative mb-3 lg:mb-4">
        <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-30 hidden lg:block"></div>
        <div className="relative overflow-hidden w-20 h-20 lg:w-[130px] lg:h-[135px] rounded-full">
          <Image src={imagePath || "/placeholder.svg"} alt={title} width={130} height={135} className="object-cover" />
        </div>
      </div>
      <h3 className="text-white text-sm lg:text-lg font-medium mb-3 lg:mb-4 text-center">{title}</h3>
      <Link
        href="/HealthMatesecondLanding"
        className="bg-white text-black rounded-full px-4 lg:px-6 py-1.5 lg:py-2 text-xs lg:text-sm font-medium hover:bg-opacity-90 transition-colors"
      >
        Get Started
      </Link>
    </div>
  )
}

