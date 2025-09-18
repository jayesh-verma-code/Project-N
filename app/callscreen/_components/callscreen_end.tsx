"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CallAgain,
  CloseCall,
  EntToEndEncrypt,
  MessageIcon,
  EndToEndMobile,
} from "../_assets/call_icons";
const CallScreenEnd: React.FC = () => {
  const searchParams = useSearchParams();
  const callerName = searchParams.get("callerName") || "Doc";
  const app = searchParams.get("app");
  // Debug: Log app value
  console.log("App parameter:", app);
  // Explicitly type app keys
  type AppKey = "goldencare" | "healthmate" | "pet-ai" | "mindease";
  const appRoutes: Record<AppKey, { landing: string; chat: string }> = {
    goldencare: { landing: "/goldencare", chat: "/Healthmate?category=biopsy" },
    healthmate: {
      landing: "/HealthMateLanding",
      chat: "/HealthMatesecondLanding",
    },
    "pet-ai": { landing: "/pet-ai", chat: "/pet-ai/chat" },
    mindease: { landing: "/mindease", chat: "/mindease/chat" },
  };
  // Get routes for the current app, default to homepage if app is invalid
  const { landing, chat } =
    app && app in appRoutes
      ? appRoutes[app as AppKey]
      : { landing: "/", chat: "/chat" };
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Desktop Frame (hidden on mobile) */}
      <div className="hidden md:flex w-full max-w-7xl h-[calc(100vh-4rem)] mx-4 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-2xl flex-col overflow-hidden">
        {/* Header */}
        <div className="relative flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-md border-b border-gray-600/30">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <Image
              src="/callScreen_logo.svg"
              alt="CallScreen Logo"
              width={120}
              height={30}
              className="w-28 h-7 ml-4"
            />
          </div>
          <div className="flex items-center">
            <EntToEndEncrypt className="w-40 h-10" />
          </div>
          <div className="flex items-center space-x-1">
            <button
              className="p-2 rounded-lg hover:bg-gray-600/50 transition-colors text-gray-300 hover:text-white"
              aria-label="Minimize"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 10h12v1H4z" />
              </svg>
            </button>
            <button
              className="p-2 rounded-lg hover:bg-gray-600/50 transition-colors text-gray-300 hover:text-white"
              aria-label="Maximize"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 6h8v8H6V6zm1 1v6h6V7H7z" />
              </svg>
            </button>
            <button
              className="p-2 rounded-lg hover:bg-red-500/50 transition-colors text-gray-300 hover:text-white"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        </div>
        {/* Inner Screen */}
        <div className="flex-1 relative bg-black rounded-xl mx-6 mb-6 overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-gray-900/40"></div>
          <div
            className="absolute inset-0 bg-center bg-cover opacity-30"
            style={{ backgroundImage: "url('/callScreen_bg.png')" }}
          />
          <div className="relative h-full flex items-center justify-center">
            {/* Call Status Overlay */}
            <div className="absolute top-4 left-4 z-20">
              <div className="bg-black/40 backdrop-blur-md rounded-lg px-3 py-2 border border-white/10">
                <p className="text-white text-sm font-medium">{callerName}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-red-300 text-xs">Call ended</span>
                </div>
              </div>
            </div>
            {/* Call End Content */}
            <div className="flex flex-col items-center z-10">
              <div className="relative mb-8">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-gray-500/20 to-gray-700/20 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center">
                  <Image
                    src="/callScreen_sun.svg"
                    alt="Caller Avatar"
                    width={120}
                    height={120}
                    className="w-30 h-30 opacity-80"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-red-500/80 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-center mb-8">
                <div className="text-white text-3xl font-medium mb-2">
                  {callerName}
                </div>
                <div className="text-gray-300 text-lg mb-4">Call ended</div>
              </div>
              {/* Action Buttons */}
              <div className="flex items-center space-x-8">
                <Link
                  href={chat}
                  className="flex flex-col items-center p-4 rounded-2xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/50 transition-all duration-300 min-w-[80px]"
                  aria-label="Message"
                >
                  <MessageIcon className="w-10 h-10 mb-2 text-blue-400" />
                  <span className="text-sm text-blue-300">Message</span>
                </Link>
                <Link
                  href={`/callscreen/audio_call?callerName=${encodeURIComponent(
                    callerName
                  )}&app=${encodeURIComponent(app || "")}`}
                  className="flex flex-col items-center p-4 rounded-2xl bg-green-500/20 hover:bg-green-500/30 border border-green-400/50 transition-all duration-300 min-w-[80px]"
                  aria-label="Call Back"
                >
                  <CallAgain className="w-10 h-10 mb-2 text-green-400" />
                  <span className="text-sm text-green-300">Call Back</span>
                </Link>
                <Link
                  href={landing}
                  className="flex flex-col items-center p-4 rounded-2xl bg-gray-500/20 hover:bg-gray-500/30 border border-gray-400/50 transition-all duration-300 min-w-[80px]"
                  aria-label="Close"
                >
                  <CloseCall className="w-10 h-10 mb-2 text-gray-400" />
                  <span className="text-sm text-gray-300">Close</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Layout (hidden on desktop) */}
      <div className="md:hidden w-full h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-gray-900/10 to-black/20 z-0" />
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-center bg-cover opacity-20 z-0"
          style={{ backgroundImage: "url('/callScreen_bg.png')" }}
        />
        {/* Top Status Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/60 to-transparent pt-safe-top">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span className="text-white text-sm font-medium">Call Ended</span>
            </div>
            <div className="text-white text-sm font-medium">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex flex-col items-center justify-center h-full px-6 z-10 relative">
          {/* Avatar Section */}
          <div className="relative mb-8">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-500/20 to-gray-700/20 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center">
              <Image
                src="/callScreen_sun.svg"
                alt="Caller Avatar"
                width={100}
                height={100}
                className="w-25 h-25 opacity-80"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-red-500/80 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          {/* Call Info */}
          <div className="bg-black/30 backdrop-blur-md rounded-2xl px-6 py-4 mb-8 border border-white/10">
            <h2 className="text-white text-2xl font-semibold mb-2 text-center">
              {callerName}
            </h2>
            <div className="flex justify-center items-center mb-2">
              <EndToEndMobile className="w-28 h-4" />
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span className="text-red-300 text-sm">Call ended</span>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-6 max-w-sm">
            <Link
              href={chat}
              className="flex flex-col items-center p-4 rounded-2xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/50 transition-all duration-300 min-w-[100px] backdrop-blur-md"
              aria-label="Message"
            >
              <MessageIcon className="w-10 h-10 mb-2 text-blue-400" />
              <span className="text-xs text-blue-300">Message</span>
            </Link>
            <Link
              href={`/callscreen/audio_call?callerName=${encodeURIComponent(
                callerName
              )}&app=${encodeURIComponent(app || "")}`}
              className="flex flex-col items-center p-4 rounded-2xl bg-green-500/20 hover:bg-green-500/30 border border-green-400/50 transition-all duration-300 min-w-[100px] backdrop-blur-md"
              aria-label="Call Back"
            >
              <CallAgain className="w-10 h-10 mb-2 text-green-400" />
              <span className="text-xs text-green-300">Call Back</span>
            </Link>
            <Link
              href={landing}
              className="flex flex-col items-center p-4 rounded-2xl bg-gray-500/20 hover:bg-gray-500/30 border border-gray-400/50 transition-all duration-300 min-w-[100px] backdrop-blur-md"
              aria-label="Close"
            >
              <CloseCall className="w-10 h-10 mb-2 text-gray-400" />
              <span className="text-xs text-gray-300">Close</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CallScreenEnd;
