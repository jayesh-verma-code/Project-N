'use client'

import React from 'react'

export default function AnimatedHoverPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center p-8">
      <div className="relative w-80 h-60 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-white/40 group">
        
        {/* Text that moves from top-right to bottom-left */}
        <span className="absolute top-4 right-4 text-white font-semibold px-3 py-2 bg-white/20 rounded-lg backdrop-blur-sm transform transition-all duration-1000 ease-in-out group-hover:translate-x-[-200px] group-hover:translate-y-[176px] pointer-events-none">
          Hover Text
        </span>

        {/* Optional: Additional content for the div */}
        <div className="flex items-center justify-center h-full text-white/60 text-lg font-medium">
          Hover me!
        </div>
      </div>
    </div>
  )
}