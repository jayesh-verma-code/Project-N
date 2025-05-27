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
    <div className="min-h-screen w-full flex flex-col items-center justify-between md:justify-center rounded-[10px]">
      {/* Desktop Frame (hidden on mobile) */}
      <div className="hidden md:flex md:w-[900px] md:h-[600px] bg-[#3C3C3C] pt-1 pl-3 pr-3 pb-3 rounded-[10px] shadow-2xl flex-col">
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
            <EntToEndEncrypt className="w-[168px] h-12" />
          </div>
          <div className="ml-auto flex items-center space-x-2 text-[#C1BEBE] text-sm font-semibold">
            <button className="px-2 py-1 rounded -mt-0.5 hover:bg-gray-600" aria-label="Minimize">
              —
            </button>
            <button className="px-2 py-1 text-lg rounded hover:bg-gray-600" aria-label="Maximize">
              ▢
            </button>
            <button className="px-2 py-1 text-2xl rounded -mt-1.5 hover:bg-gray-600" aria-label="Close">
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
            <Image
              src="/callScreen_sun.svg"
              alt="Caller Avatar"
              width={140}
              height={140}
              className="w-[140px] h-[140px] mb-1"
            />
            <div className="text-2xl">{callerName}</div>
            <div className="text-lg text-gray-300">Ringing...</div>
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="bg-[#3C3C3C] grid grid-cols-3 items-center px-3 py-5">
          <div className="flex space-x-5 justify-start -mb-3">
            <Link
              href={`/callscreen/video_call?callerName=${encodeURIComponent(callerName)}&app=${encodeURIComponent(app || '')}`}
              aria-label="Switch to video call"
            >
              <VideoCallOff className="w-10 h-6" reactFill="#FFFFFF" pathFill="#000000" />
            </Link>
            <button onClick={toggleMute} aria-label={isMuteClicked ? "Unmute" : "Mute"}>
              {isMuteClicked ? (
                <MicIcon className="w-10 h-6" reactFill="#FFFFFF" pathFill="#000000" />
              ) : (
                <MuteIcon className="w-10 h-6" reactFill="#FFFFFF" pathFill="#000000" />
              )}
            </button>
          </div>
          <div className="flex space-x-4 justify-center -mb-3">
            <button aria-label="Share screen">
              <ShareScreen className="w-5 h-5" />
            </button>
            <button aria-label="Add person">
              <PersonAdd className="w-5 h-5" />
            </button>
          </div>
          <div className="flex justify-end -mb-3">
            <Link
              href={`/callscreen/end_call?callerName=${encodeURIComponent(callerName)}&app=${encodeURIComponent(app || '')}`}
              aria-label="End call"
            >
              <EndCall className="w-10 h-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Layout (hidden on desktop) */}
      <div className="md:hidden w-full min-h-screen bg-[url('/callScreen_bg.png')] bg-cover bg-no-repeat rounded-[5px] flex flex-col items-center justify-between text-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-20 z-0" />
        <div className="z-10 text-center text-white mt-[8vh] px-4">
          <h2 className="text-4xl font-semibold mb-2">{callerName}</h2>
          <div className="flex justify-center items-center mb-1">
            <EndToEndMobile className="w-[120px] h-[15px]" />
          </div>
          <p className="text-md">Ringing...</p>
        </div>
        <div className="absolute top-1/2 left-0 right-0 flex items-center justify-center z-0 pointer-events-none -translate-y-[70%]">
          <Image
            src="/callScreen_sun.svg"
            alt="Caller Avatar"
            width={140}
            height={140}
            className="w-[140px] h-[140px]"
          />
        </div>
        <div className="z-10 absolute top-[8vh] right-4 flex flex-col space-y-3">
          <button className="rounded-full p-1" aria-label="Add person">
            <AddPersonMobile className="w-9 h-9" />
          </button>
        </div>
        <div className="z-10 w-full px-5 pb-[3vh]">
          <div className="bg-black bg-opacity-80 rounded-3xl py-1 px-2 flex justify-around items-center">
            <button className="p-2" aria-label="More options">
              <ExtraMenuMobile className="w-9 h-9" />
            </button>
            <Link
              href={`/callscreen/video_call?callerName=${encodeURIComponent(callerName)}&app=${encodeURIComponent(app || '')}`}
              aria-label="Switch to video call"
            >
              <VideoOnMobile className="w-9 h-9" circleFill="#3F3D3D" pathFill="#FFFFFF" />
            </Link>
            <button
              className="p-2"
              onClick={toggleSpeaker}
              aria-label={isSpeakerClicked ? "Turn off speaker" : "Turn on speaker"}
            >
              <SpeakerMobile
                className="w-9 h-9"
                circleFill={isSpeakerClicked ? "#FFFFFF" : "#3F3D3D"}
                pathFill={isSpeakerClicked ? "#000000" : "#FFFFFF"}
              />
            </button>
            <button
              className="p-2"
              onClick={toggleMute}
              aria-label={isMuteClicked ? "Unmute" : "Mute"}
            >
              <MuteMobile
                className="w-9 h-9"
                circleFill={isMuteClicked ? "#FFFFFF" : "#3F3D3D"}
                pathFill={isMuteClicked ? "#000000" : "#FFFDFD"}
              />
            </button>
            <Link
              href={`/callscreen/end_call?callerName=${encodeURIComponent(callerName)}&app=${encodeURIComponent(app || '')}`}
              aria-label="End call"
            >
              <EndCallMobile className="w-9 h-9" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioCallScreen;
