"use client";
import { Suspense } from "react";
import VideoCallScreen from "../_components/video_call";
function VideoCallWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VideoCallScreen />
    </Suspense>
  );
}
export default VideoCallWrapper;
