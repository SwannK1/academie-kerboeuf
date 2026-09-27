import type { Metadata } from "next";
import { ClassView } from "@/components/enseigner/ClassView";

export const metadata: Metadata = { title: "Ma classe" };

export default function ClassePage() {
  return <ClassView />;
}
