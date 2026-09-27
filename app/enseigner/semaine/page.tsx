import type { Metadata } from "next";
import { WeekView } from "@/components/enseigner/WeekView";

export const metadata: Metadata = { title: "Ma semaine" };

export default function SemainePage() {
  return <WeekView />;
}
