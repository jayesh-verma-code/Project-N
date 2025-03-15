import type React from "react";
import type { Metadata } from "next";
import TeamClient from "@/components/TeamClient";

export const metadata: Metadata = {
  title: "Our Team | NIRVEON'X",
  description:
    "Meet the passionate individuals behind NIRVEON'X who are dedicated to transforming healthcare through AI innovation.",
};

export default function TeamLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TeamClient>{children}</TeamClient>;
}
