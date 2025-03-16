"use client"

import type React from "react"

export default function TeamClient({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="cursor-default">
      {children}
      <style jsx global>{`
        body {
          cursor: auto !important;
        }
        .cursor-dot, .cursor-outline {
          display: none !important;
        }
      `}</style>
    </div>
  )
}

