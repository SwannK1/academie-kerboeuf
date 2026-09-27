import type { Metadata } from "next";
import { YearView } from "@/components/enseigner/YearView";

export const metadata: Metadata = { title: "Mon année" };

export default function AnneePage() {
  return <YearView />;
}
