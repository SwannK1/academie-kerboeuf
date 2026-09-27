import type { Metadata } from "next";
import { Suspense } from "react";
import { MeetingsView } from "@/components/direction/MeetingsView";

export const metadata: Metadata = { title: "Réunions" };

export default function ReunionsPage() {
  return (
    <Suspense>
      <MeetingsView />
    </Suspense>
  );
}
