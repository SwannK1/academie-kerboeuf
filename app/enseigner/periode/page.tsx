import type { Metadata } from "next";
import { PeriodView } from "@/components/enseigner/PeriodView";

export const metadata: Metadata = { title: "Ma période" };

export default function PeriodePage() {
  return <PeriodView />;
}
