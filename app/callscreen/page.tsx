import { redirect } from "next/navigation";

export default function CallScreen({ searchParams }: { searchParams: { callerName?: string } }) {
  const callerName = searchParams.callerName || "Doc";
  redirect(`/callscreen/audio_call?callerName=${encodeURIComponent(callerName)}`);
}