import type React from "react";
import type { Metadata } from "next";
import TeamClient from "@/components/TeamClient";

export const metadata: Metadata = {
  title: "Our Team | NirveonX",
  description:
    "Meet the passionate individuals behind NirveonX who are dedicated to transforming healthcare through AI innovation.",
};

export default function TeamLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TeamClient>{children}</TeamClient>;
}
