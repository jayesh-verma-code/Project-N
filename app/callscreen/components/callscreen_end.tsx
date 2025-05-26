"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  CallAgain,
  CloseCall,
  EntToEndEncrypt,
  MessageIcon,
  EndToEndMobile,
} from "../assets/call_icons";

const CallScreenEnd: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callerName = searchParams.get("callerName") || "Doc";

  const handleAudioCall = () => {
    router.push(
      `/callscreen/audio_call?callerName=${encodeURIComponent(callerName)}`
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center md:justify-center overflow-auto px-0 md:px-0 rounded-[10px]">
      {/* Desktop Frame (hidden on mobile) */}
      <div className="hidden md:flex md:w-[900px] md:h-[600px] bg-[#3C3C3C] pt-1 pl-3 pr-3 pb-3 rounded-[10px] shadow-2xl flex-col max-w-full max-h-full">
        {/* Header */}
        <div className="relative flex items-center px-2 text-white bg-[#3C3C3C] rounded-[4px] mb-1">
          <div className="text-sm -ml-2">
            <Image
              src="/callScreen_logo.svg"
              alt="CallScreen Logo"
              width={128}
              height={32}
              className="w-32 h-8"
            />
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
            <EntToEndEncrypt className="w-42 h-12" />
          </div>
          <div className="ml-auto flex items-center space-x-2 text-[#C1BEBE] text-sm font-semibold">
            <button
              className="px-2 py-1 rounded -mt-0.5 hover:bg-gray-600"
              aria-label="Minimize"
            >
              —
            </button>
            <button
              className="px-2 py-1 text-lg rounded hover:bg-gray-600"
              aria-label="Maximize"
            >
              ▢
            </button>
            <button
              className="px-2 py-1 text-2xl rounded -mt-1.5 hover:bg-gray-600"
              aria-label="Close"
            >
              x
            </button>
          </div>
        </div>

        {/* Inner Screen */}
        <div className="flex-1 rounded-[8px] overflow-hidden relative flex flex-col">
          <div
            className="relative flex-1 bg-center bg-cover flex flex-col items-center justify-center text-white"
            style={{ backgroundImage: "url('/callScreen_bg.png')" }}
          >
            <div
              className="flex flex-col items-center"
              style={{ transform: "translateY(-10%)" }}
            >
              <div className="flex flex-col items-center mb-10 -mr-5">
                <Image
                  src="/callScreen_sun.svg"
                  alt="Caller Avatar"
                  width={150}
                  height={150}
                  className="w-[120px] h-[120px] mb-3 md:w-[150px] md:h-[150px]"
                />
                <div className="text-2xl md:text-3xl">{callerName}</div>
                <div className="text-lg text-gray-300 md:text-xl">Call ended</div>
              </div>
              <div className="flex space-x-8 md:space-x-12 flex-wrap justify-center">
                <div className="flex flex-col items-center">
                  <MessageIcon
                    className="w-8 h-8 mb-1 md:w-10 md:h-10"
                    aria-label="Message"
                  />
                  <span className="text-sm text-white md:text-base">Message</span>
                </div>
                <div
                  className="flex flex-col items-center"
                  onClick={handleAudioCall}
                  aria-label="Call Back"
                >
                  <CallAgain className="w-8 h-8 mb-1 md:w-10 md:h-10" />
                  <span className="text-sm text-white md:text-base">Call Back</span>
                </div>
                <div
                  className="flex flex-col items-center"
                  aria-label="Close"
                >
                  <CloseCall className="w-8 h-8 mb-1 md:w-10 md:h-10" />
                  <span className="text-sm text-white md:text-base">Close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout (hidden on desktop) */}
      <div className="md:hidden w-full min-h-screen bg-[url('/callScreen_bg.png')] bg-cover bg-no-repeat rounded-[5px] flex flex-col items-center text-black relative overflow-hidden p-0">
        <div className="flex flex-col justify-evenly items-center w-full space-y-[2vh] flex-1 px-4 py-[15vh] sm:px-6 sm:-mt-[80px] -mt-[60px]">
          <div className="flex justify-center">
            <Image
              src="/callScreen_sun.svg"
              alt="Caller Avatar"
              width={150}
              height={150}
              className="w-[140px] h-[140px] sm:w-[150px] sm:h-[150px]"
            />
          </div>
          <div className="text-white text-center flex flex-col items-center space-y-2 flex-wrap">
            <h2 className="text-3xl sm:text-4xl font-semibold">{callerName}</h2>
            <EndToEndMobile className="w-[100px] h-[13px] sm:w-[120px] sm:h-[15px]" />
            <div className="text-lg sm:text-xl text-gray-300 mt-4">Call ended</div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 sm:gap-x-12 sm:gap-y-8">
            <div className="flex flex-col items-center">
              <MessageIcon className="w-9 h-9 sm:w-10 sm:h-10 mb-1" aria-label="Message" />
              <span className="text-xs sm:text-sm text-white">Message</span>
            </div>
            <div
              className="flex flex-col items-center"
              onClick={handleAudioCall}
              aria-label="Call Back"
            >
              <CallAgain className="w-9 h-9 sm:w-10 sm:h-10 mb-1" />
              <span className="text-xs sm:text-sm text-white">Call Back</span>
            </div>
            <div className="flex flex-col items-center" aria-label="Close">
              <CloseCall className="w-9 h-9 sm:w-10 sm:h-10 mb-1" />
              <span className="text-xs sm:text-sm text-white">Close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallScreenEnd;