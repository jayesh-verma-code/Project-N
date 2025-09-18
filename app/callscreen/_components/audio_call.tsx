"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MicIcon,
  MuteIcon,
  EntToEndEncrypt,
  EndCall,
  PersonAdd,
  ShareScreen,
  VideoCallOff,
  AddPersonMobile,
  EndCallMobile,
  EndToEndMobile,
  ExtraMenuMobile,
  MuteMobile,
  SpeakerMobile,
  VideoOnMobile,
} from "../_assets/call_icons";
const AudioCallScreen: React.FC = () => {
  const [isMuteClicked, setIsMuteClicked] = useState(true);
  const [isSpeakerClicked, setIsSpeakerClicked] = useState(false);
  const searchParams = useSearchParams();
  const callerName = searchParams.get("callerName") || "Doc";
  const app = searchParams.get("app");
  console.log("Upstream app in audio_call:", app);
  const toggleMute = () => setIsMuteClicked((prev) => !prev);
  const toggleSpeaker = () => setIsSpeakerClicked((prev) => !prev);
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
          <div
            className="absolute inset-0 bg-center bg-cover opacity-30"
            style={{ backgroundImage: "url('/callScreen_bg.png')" }}
          />
          <div className="relative h-full flex items-center justify-center">
            {/* Participant Info Overlay */}
            <div className="absolute top-4 left-4 z-20">
              <div className="bg-black/40 backdrop-blur-md rounded-lg px-3 py-2 border border-white/10">
                <p className="text-white text-sm font-medium">{callerName}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-yellow-300 text-xs">Ringing...</span>
                </div>
              </div>
            </div>
            {/* Audio Call Content */}
            <div className="flex flex-col items-center z-10">
              <div className="relative mb-6">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center">
                  <Image
                    src="/callScreen_sun.svg"
                    alt="Caller Avatar"
                    width={120}
                    height={120}
                    className="w-30 h-30"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-yellow-500/80 rounded-full flex items-center justify-center animate-pulse">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <div className="text-white text-3xl font-medium mb-2">
                  {callerName}
                </div>
                <div className="text-gray-300 text-lg mb-4">
                  Incoming audio call...
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Desktop Controls */}
        <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-md border-t border-gray-600/30 px-8 py-6">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {/* Left Controls */}
            <div className="flex items-center space-x-4">
              <Link
                href={`/callscreen/video_call?callerName=${encodeURIComponent(
                  callerName
                )}&app=${encodeURIComponent(app || "")}`}
                className="p-4 rounded-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/50 transition-all duration-300"
                aria-label="Switch to video call"
              >
                <VideoCallOff
                  className="w-8 h-8"
                  reactFill="#60A5FA"
                  pathFill="#1E40AF"
                />
              </Link>
              <button
                onClick={toggleMute}
                className={`p-4 rounded-full transition-all duration-300 ${
                  isMuteClicked
                    ? "bg-green-500/20 hover:bg-green-500/30 border border-green-400/50"
                    : "bg-red-500/20 hover:bg-red-500/30 border border-red-400/50"
                }`}
                aria-label={isMuteClicked ? "Unmute" : "Mute"}
              >
                {isMuteClicked ? (
                  <MicIcon
                    className="w-8 h-8"
                    reactFill="#10B981"
                    pathFill="#065F46"
                  />
                ) : (
                  <MuteIcon
                    className="w-8 h-8"
                    reactFill="#EF4444"
                    pathFill="#FFFFFF"
                  />
                )}
              </button>
            </div>
            {/* Center Controls */}
            <div className="flex items-center space-x-6">
              <button
                className="p-3 rounded-full bg-gray-600/30 hover:bg-gray-600/50 border border-gray-500/30 transition-all duration-300"
                aria-label="Share screen"
              >
                <ShareScreen className="w-7 h-7 text-gray-300" />
              </button>
              <button
                className="p-3 rounded-full bg-gray-600/30 hover:bg-gray-600/50 border border-gray-500/30 transition-all duration-300"
                aria-label="Add person"
              >
                <PersonAdd className="w-7 h-7 text-gray-300" />
              </button>
            </div>
            {/* Right Controls */}
            <div className="flex items-center">
              <Link
                href={`/callscreen/end_call?callerName=${encodeURIComponent(
                  callerName
                )}&app=${encodeURIComponent(app || "")}`}
                className="p-4 rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-400/50 transition-all duration-300"
                aria-label="End call"
              >
                <EndCall className="w-8 h-8 text-red-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Layout (hidden on desktop) */}
      <div className="md:hidden w-full h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10 z-0" />
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-center bg-cover opacity-20 z-0"
          style={{ backgroundImage: "url('/callScreen_bg.png')" }}
        />
        {/* Top Status Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/60 to-transparent pt-safe-top">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">Audio Call</span>
            </div>
            <div className="text-white text-sm font-medium">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
        {/* Caller Info */}
        <div className="absolute top-20 left-0 right-0 z-20 text-center px-6">
          <div className="bg-black/30 backdrop-blur-md rounded-2xl px-6 py-4 mx-auto max-w-xs border border-white/10">
            <h2 className="text-white text-2xl font-semibold mb-2">
              {callerName}
            </h2>
            <div className="flex justify-center items-center mb-2">
              <EndToEndMobile className="w-28 h-4" />
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-yellow-300 text-sm">Incoming call...</span>
            </div>
          </div>
        </div>
        {/* Main Avatar */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center">
              <Image
                src="/callScreen_sun.svg"
                alt="Caller Avatar"
                width={120}
                height={120}
                className="w-30 h-30"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-yellow-500/80 rounded-full flex items-center justify-center animate-pulse">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
          </div>
        </div>
        {/* Audio Visualization */}
        <div className="absolute bottom-80 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex items-center space-x-1">
            <div className="w-1 h-8 bg-green-400 rounded-full animate-pulse"></div>
            <div
              className="w-1 h-12 bg-green-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-1 h-6 bg-green-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-1 h-10 bg-green-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.3s" }}
            ></div>
            <div
              className="w-1 h-4 bg-green-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
        {/* Right Side Controls */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20 flex flex-col space-y-4">
          <button
            className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/60 transition-all duration-300"
            aria-label="Add person"
          >
            <AddPersonMobile className="w-8 h-8" />
          </button>
        </div>
        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 to-transparent pb-safe-bottom">
          <div className="px-6 py-6">
            {/* Main Control Bar */}
            <div className="bg-black/50 backdrop-blur-md rounded-full py-3 px-4 border border-white/20">
              <div className="flex justify-around items-center">
                <button
                  className="p-3 rounded-full bg-gray-600/30 hover:bg-gray-600/50 border border-gray-500/30 transition-all duration-300"
                  aria-label="More options"
                >
                  <ExtraMenuMobile className="w-9 h-9" />
                </button>
                <Link
                  href={`/callscreen/video_call?callerName=${encodeURIComponent(
                    callerName
                  )}&app=${encodeURIComponent(app || "")}`}
                  className="p-3 rounded-full bg-blue-500/30 hover:bg-blue-500/50 border border-blue-400/50 transition-all duration-300"
                  aria-label="Switch to video call"
                >
                  <VideoOnMobile
                    className="w-9 h-9"
                    circleFill="#60A5FA"
                    pathFill="#1E40AF"
                  />
                </Link>
                <button
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isSpeakerClicked
                      ? "bg-green-500/30 border border-green-400/50"
                      : "bg-gray-600/30 border border-gray-500/50"
                  }`}
                  onClick={toggleSpeaker}
                  aria-label={
                    isSpeakerClicked ? "Turn off speaker" : "Turn on speaker"
                  }
                >
                  <SpeakerMobile
                    className="w-9 h-9"
                    circleFill={isSpeakerClicked ? "#10B981" : "#6B7280"}
                    pathFill="#FFFFFF"
                  />
                </button>
                <button
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isMuteClicked
                      ? "bg-green-500/30 border border-green-400/50"
                      : "bg-red-500/30 border border-red-400/50"
                  }`}
                  onClick={toggleMute}
                  aria-label={isMuteClicked ? "Unmute" : "Mute"}
                >
                  <MuteMobile
                    className="w-9 h-9"
                    circleFill={isMuteClicked ? "#10B981" : "#EF4444"}
                    pathFill={isMuteClicked ? "#065F46" : "#FFFFFF"}
                  />
                </button>
                <Link
                  href={`/callscreen/end_call?callerName=${encodeURIComponent(
                    callerName
                  )}&app=${encodeURIComponent(app || "")}`}
                  className="p-3 rounded-full bg-red-500/40 hover:bg-red-500/60 border border-red-400/50 transition-all duration-300"
                  aria-label="End call"
                >
                  <EndCallMobile className="w-9 h-9" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AudioCallScreen;
