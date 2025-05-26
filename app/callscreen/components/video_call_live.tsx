"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
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
} from "../assets/call_icons";

const VideoCallLive: React.FC = () => {
  const [isDocMain, setIsDocMain] = useState(true);
  const [isMeMain, setIsMeMain] = useState(false);
  const [isMuteClicked, setIsMuteClicked] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSpeakerClicked, setIsSpeakerClicked] = useState(false);
  const [isExtraBClicked, setIsExtraBClicked] = useState(false);
  const [showVoiceSwitch, setShowVoiceSwitch] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callerName = searchParams.get("callerName") || "Doc";

  const toggleMute = () => setIsMuteClicked((prev) => !prev);
  const toggleVideo = () => setIsVideoOn((prev) => !prev);
  const toggleSpeaker = () => setIsSpeakerClicked((prev) => !prev);
  const toggleExtraB = () => setIsExtraBClicked(!isExtraBClicked);
  const handleSwap = () => {
    setIsDocMain(!isDocMain);
    setIsMeMain(!isMeMain);
  };

  const handleAudioCall = () => {
    router.push(
      `/callscreen/audio_call?callerName=${encodeURIComponent(callerName)}`
    );
    toggleExtraB();
  };

  const handleEndScreen = () => {
    router.push(
      `/callscreen/end_call?callerName=${encodeURIComponent(callerName)}`
    );
  };

  const MainComponentDesktop = isDocMain ? DocVideo : MeVideo;
  const ThumbnailComponentDesktop = isDocMain ? MeVideo : DocVideo;
  const MainComponentMobile = isMeMain ? MeVideoMobile : DocVideoMobile;
  const ThumbnailComponentMobile = isMeMain ? DocVideoMobile : MeVideoMobile;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center rounded-[10px]">
      {/* Desktop View */}
      <div className="hidden md:flex w-[900px] h-[600px] max-w-[95vw] max-h-[95vh] min-w-[300px] min-h-[400px] bg-[#3C3C3C] pt-1 pl-3 pr-3 pb-3 rounded-[10px] shadow-2xl flex-col">
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

        {/* Video Area */}
        <div className="flex-1 rounded-[8px] overflow-hidden relative flex flex-col bg-black">
          <div
            className="relative flex-1 bg-center bg-cover flex flex-col items-center justify-center text-white"
            style={{ backgroundImage: "url('/callScreen_bg.png')" }}
          >
            <div className="flex flex-col items-center">
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <MainComponentDesktop className="w-full h-full object-cover transition-all duration-700 ease-in-out scale-110 opacity-100" />
              </div>
              <div
                onClick={handleSwap}
                className="absolute top-[5%] right-[3%] w-[30%] rounded-md shadow-xl shadow-black/30 overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02]"
                aria-label="Swap video"
              >
                <ThumbnailComponentDesktop className="w-full h-full object-cover rounded-md transition-all duration-300 ease-in-out" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-[#3C3C3C] grid grid-cols-3 items-center px-3 py-4">
          <div className="flex space-x-5 justify-start -mb-3">
            <button
              onClick={toggleVideo}
              aria-label={isVideoOn ? "Turn off video" : "Turn on video"}
            >
              {isVideoOn ? (
                <VideoCallOn
                  className="w-10 h-6"
                  reactFill="#FFFFFF"
                  pathFill="#000000"
                />
              ) : (
                <VideoCallOff
                  className="w-10 h-6"
                  reactFill="#FFFFFF"
                  pathFill="#000000"
                />
              )}
            </button>
            <button
              onClick={toggleMute}
              aria-label={isMuteClicked ? "Unmute" : "Mute"}
            >
              {isMuteClicked ? (
                <MicIcon
                  className="w-10 h-6"
                  reactFill="#FFFFFF"
                  pathFill="#000000"
                />
              ) : (
                <MuteIcon
                  className="w-10 h-6"
                  reactFill="#FFFFFF"
                  pathFill="#000000"
                />
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
            <button onClick={handleEndScreen} aria-label="End call">
              <EndCall className="w-10 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden w-full h-full flex-col items-center rounded-[5px] justify-between text-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-20 z-0" />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-0">
          <MainComponentMobile className="min-w-full min-h-full w-full h-full object-cover transition-all duration-700 ease-in-out" />
        </div>
        <div className="z-10 text-center text-white mt-[8vh] px-4">
          <h2 className="text-4xl font-semibold mb-2">{callerName}</h2>
          <div className="flex justify-center items-center mb-1">
            <EndToEndMobile className="w-30 h-3" />
          </div>
        </div>
        <div className="z-10 absolute top-[8vh] right-4 flex flex-col space-y-3">
          <button className="rounded-full p-1" aria-label="Add person">
            <AddPersonMobile className="w-9 h-9" />
          </button>
          <button className="rounded-full p-1" aria-label="Flip camera">
            <CameraFlipMobile className="w-9 h-9" />
          </button>
          <button className="rounded-full p-1" aria-label="Apply filter">
            <FilterEffectMobile className="w-9 h-9" />
          </button>
        </div>
        <div
          onClick={handleSwap}
          className="absolute bottom-[15vh] right-[3%] w-[25%] rounded-md shadow-xl shadow-black/50 overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02]"
          aria-label="Swap video"
        >
          <ThumbnailComponentMobile className="w-full h-full object-cover rounded-md transition-all duration-300 ease-in-out" />
        </div>
        <div className="z-10 w-full px-5 pb-[3vh]">
          {showVoiceSwitch && (
            <button
              className="py-0 px-1 mb-2"
              onClick={handleAudioCall}
              aria-label="Switch to voice call"
            >
              <SwitchToVoiceCallMobile
                className="w-25 h-10"
                circleFill={isMuteClicked ? "#FFFFFF" : "#3F3D3D"}
                pathFill={isMuteClicked ? "#000000" : "#FFFDFD"}
              />
            </button>
          )}
          <div className="bg-black bg-opacity-80 rounded-3xl py-1 px-2 flex justify-around items-center">
            <button
              className="p-2"
              onClick={() => {
                setShowVoiceSwitch((prev) => !prev);
                toggleExtraB();
              }}
              aria-label="More options"
            >
              <ExtraMenuMobile
                className="w-9 h-9"
                circleFill={isExtraBClicked ? "#FFFFFF" : "#3F3D3D"}
                pathFill={isExtraBClicked ? "#000000" : "#FFFFFF"}
              />
            </button>
            <button
              className="p-2"
              onClick={toggleVideo}
              aria-label={isVideoOn ? "Turn off video" : "Turn on video"}
            >
              {isVideoOn ? (
                <VideoOnMobile className="w-9 h-9" />
              ) : (
                <VideoOffMobile className="w-9 h-9" />
              )}
            </button>
            <button
              className="p-2"
              onClick={toggleSpeaker}
              aria-label={isSpeakerClicked ? "Turn off speaker" : "Turn on speaker"}
            >
              <SpeakerMobile
                className="w-9 h-9"
                circleFill={isSpeakerClicked ? "#3F3D3D" : "#FFFFFF"}
                pathFill={isSpeakerClicked ? "#FFFFFF" : "#000000"}
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
            <button
              className="rounded-full p-2"
              onClick={handleEndScreen}
              aria-label="End call"
            >
              <EndCallMobile className="w-9 h-9" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCallLive;
