"use client";
import { Suspense } from "react";
import AudioCallScreen from "../_components/audio_call";
function AudioCallWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AudioCallScreen />
    </Suspense>
  );
}
export default AudioCallWrapper;
