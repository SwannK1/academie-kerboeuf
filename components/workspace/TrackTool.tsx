"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { recordRecent } from "@/lib/workspace/activity";

/** Note l'outil ouvert dans les récents (titre de la page, sans le nom du site). */
export function TrackTool() {
  const pathname = usePathname();
  useEffect(() => {
    const timer = setTimeout(() => {
      const label = document.title.split("|")[0].replace(/·.*$/, "").trim() || pathname;
      recordRecent({ kind: "outil", id: pathname, label, href: pathname });
    }, 300);
    return () => clearTimeout(timer);
  }, [pathname]);
  return null;
}
