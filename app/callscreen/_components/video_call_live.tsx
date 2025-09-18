"use client";
import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MicIcon,
  MuteIcon,
  EndCall,
  EntToEndEncrypt,
  PersonAdd,
  MeVideo,
  VideoCallOff,
  VideoCallOn,
  ShareScreen,
  DocVideo,
  AddPersonMobile,
  CameraFlipMobile,
  FilterEffectMobile,
  EndCallMobile,
  EndToEndMobile,
  ExtraMenuMobile,
  MuteMobile,
  SpeakerMobile,
  VideoOffMobile,
  VideoOnMobile,
  SwitchToVoiceCallMobile,
  MeVideoMobile,
  DocVideoMobile,
} from "../_assets/call_icons";
const VideoCallLiveContent: React.FC = () => {
  const [isDocMain, setIsDocMain] = useState(true);
  const [isMeMain, setIsMeMain] = useState(false);
  const [isMuteClicked, setIsMuteClicked] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSpeakerClicked, setIsSpeakerClicked] = useState(false);
  const [isExtraBClicked, setIsExtraBClicked] = useState(false);
  const [showVoiceSwitch, setShowVoiceSwitch] = useState(false);
  const searchParams = useSearchParams();
  const callerName = searchParams.get("callerName") || "Doc";
  const app = searchParams.get("app");
  // Debug: Log app value
  console.log("Upstream app in video_call_live:", app);
  const toggleMute = () => setIsMuteClicked((prev) => !prev);
  const toggleVideo = () => setIsVideoOn((prev) => !prev);
  const toggleSpeaker = () => setIsSpeakerClicked((prev) => !prev);
  const toggleExtraB = () => setIsExtraBClicked(!isExtraBClicked);
  const handleSwap = () => {
    setIsDocMain(!isDocMain);
    setIsMeMain(!isMeMain);
  };
  const MainComponentDesktop = isDocMain ? DocVideo : MeVideo;
  const ThumbnailComponentDesktop = isDocMain ? MeVideo : DocVideo;
  const MainComponentMobile = isMeMain ? MeVideoMobile : DocVideoMobile;
  const ThumbnailComponentMobile = isMeMain ? DocVideoMobile : MeVideoMobile;
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Desktop View */}
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
        {/* Video Area */}
        <div className="flex-1 relative bg-black rounded-xl mx-6 mb-6 overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
          <div className="relative h-full flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl">
              <MainComponentDesktop className="w-full h-full object-cover transition-all duration-700 ease-in-out scale-105" />
            </div>
            {/* Participant Info Overlay */}
            <div className="absolute top-4 left-4 z-20">
              <div className="bg-black/40 backdrop-blur-md rounded-lg px-3 py-2 border border-white/10">
                <p className="text-white text-sm font-medium">{callerName}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 text-xs">Connected</span>
                </div>
              </div>
            </div>
            {/* Thumbnail Video */}
            <div
              onClick={handleSwap}
              className="absolute top-4 right-4 w-48 h-36 rounded-xl shadow-2xl border-2 border-white/20 overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:border-white/40 z-20 group"
              aria-label="Swap video"
            >
              <ThumbnailComponentDesktop className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:brightness-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Controls */}
        <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-md border-t border-gray-600/30 px-8 py-6">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {/* Left Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleVideo}
                className={`p-4 rounded-full transition-all duration-300 ${
                  isVideoOn
                    ? "bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/50"
                    : "bg-red-500/20 hover:bg-red-500/30 border border-red-400/50"
                }`}
                aria-label={isVideoOn ? "Turn off video" : "Turn on video"}
              >
                {isVideoOn ? (
                  <VideoCallOn
                    className="w-6 h-6"
                    reactFill="#60A5FA"
                    pathFill="#1E40AF"
                  />
                ) : (
                  <VideoCallOff
                    className="w-6 h-6"
                    reactFill="#EF4444"
                    pathFill="#FFFFFF"
                  />
                )}
              </button>
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
                    className="w-6 h-6"
                    reactFill="#10B981"
                    pathFill="#065F46"
                  />
                ) : (
                  <MuteIcon
                    className="w-6 h-6"
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
                <ShareScreen className="w-5 h-5 text-gray-300" />
              </button>
              <button
                className="p-3 rounded-full bg-gray-600/30 hover:bg-gray-600/50 border border-gray-500/30 transition-all duration-300"
                aria-label="Add person"
              >
                <PersonAdd className="w-5 h-5 text-gray-300" />
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
                <EndCall className="w-6 h-6 text-red-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile View */}
      <div className="md:hidden w-full h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10 z-0" />
        {/* Main Video */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <MainComponentMobile className="min-w-full min-h-full w-full h-full object-cover transition-all duration-700 ease-in-out" />
        </div>
        {/* Top Status Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/60 to-transparent pt-safe-top">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">HD</span>
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
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 text-sm">Connected</span>
            </div>
          </div>
        </div>
        {/* Right Side Controls */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20 flex flex-col space-y-4">
          <button
            className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/60 transition-all duration-300"
            aria-label="Add person"
          >
            <AddPersonMobile className="w-6 h-6" />
          </button>
          <button
            className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/60 transition-all duration-300"
            aria-label="Flip camera"
          >
            <CameraFlipMobile className="w-6 h-6" />
          </button>
          <button
            className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/60 transition-all duration-300"
            aria-label="Apply filter"
          >
            <FilterEffectMobile className="w-6 h-6" />
          </button>
        </div>
        {/* Thumbnail Video */}
        <div
          onClick={handleSwap}
          className="absolute bottom-36 right-4 w-24 h-32 sm:w-28 sm:h-36 rounded-xl shadow-2xl border-2 border-white/30 overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 z-20 group"
          aria-label="Swap video"
        >
          <ThumbnailComponentMobile className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:brightness-110" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </div>
        </div>
        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 to-transparent pb-safe-bottom">
          <div className="px-6 py-6">
            {/* Voice Switch Option */}
            {showVoiceSwitch && (
              <div className="mb-4 flex justify-center">
                <Link
                  href={`/callscreen/audio_call?callerName=${encodeURIComponent(
                    callerName
                  )}&app=${encodeURIComponent(app || "")}`}
                  className="bg-black/50 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 hover:bg-black/70 transition-all duration-300"
                  aria-label="Switch to voice call"
                  onClick={() => toggleExtraB()}
                >
                  <SwitchToVoiceCallMobile
                    className="w-20 h-8"
                    circleFill="#FFFFFF"
                    pathFill="#000000"
                  />
                </Link>
              </div>
            )}
            {/* Main Control Bar */}
            <div className="bg-black/50 backdrop-blur-md rounded-full py-3 px-4 border border-white/20">
              <div className="flex justify-around items-center">
                <button
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isExtraBClicked
                      ? "bg-white/20 border border-white/30"
                      : "bg-black/30 border border-white/10"
                  }`}
                  onClick={() => {
                    setShowVoiceSwitch((prev) => !prev);
                    toggleExtraB();
                  }}
                  aria-label="More options"
                >
                  <ExtraMenuMobile
                    className="w-7 h-7"
                    circleFill={isExtraBClicked ? "#FFFFFF" : "#6B7280"}
                    pathFill={isExtraBClicked ? "#000000" : "#FFFFFF"}
                  />
                </button>
                <button
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isVideoOn
                      ? "bg-blue-500/30 border border-blue-400/50"
                      : "bg-red-500/30 border border-red-400/50"
                  }`}
                  onClick={toggleVideo}
                  aria-label={isVideoOn ? "Turn off video" : "Turn on video"}
                >
                  {isVideoOn ? (
                    <VideoOnMobile className="w-7 h-7" />
                  ) : (
                    <VideoOffMobile className="w-7 h-7" />
                  )}
                </button>
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
                    className="w-7 h-7"
                    circleFill={isSpeakerClicked ? "#10B981" : "#6B7280"}
                    pathFill={isSpeakerClicked ? "#FFFFFF" : "#FFFFFF"}
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
                    className="w-7 h-7"
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
                  <EndCallMobile className="w-7 h-7" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const VideoCallLive: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <VideoCallLiveContent />
    </Suspense>
  );
};
export default VideoCallLive;
 