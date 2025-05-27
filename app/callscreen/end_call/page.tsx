"use client";
import { Suspense } from "react";
import EndCallScreen from "../_components/callscreen_end";

export default function EndCallPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <EndCallScreen />
    </Suspense>
  );
}
