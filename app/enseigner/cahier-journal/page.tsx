import type { Metadata } from "next";
import { Suspense } from "react";
import { LogbookView } from "@/components/enseigner/LogbookView";

export const metadata: Metadata = { title: "Cahier journal" };

export default function CahierJournalPage() {
  return (
    <Suspense>
      <LogbookView />
    </Suspense>
  );
}
