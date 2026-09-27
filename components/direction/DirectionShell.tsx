"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Skeleton } from "@/components/workspace/ui";
import { rememberPlace, useProfile, type Profile } from "@/lib/workspace/profile";
import { useDirection, type DirectionState } from "@/lib/workspace/direction";

const TABS = [
  { href: "/direction", label: "Tableau de bord" },
  { href: "/direction/reunions", label: "Réunions" },
  { href: "/direction/demarches", label: "Démarches" },
];

export function DirectionTabs() {
  const pathname = usePathname();
  return (
    <nav aria-label="Direction" className="no-print -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ul className="flex min-w-max gap-1 border-b border-line">
        {TABS.map((tab) => {
          const active = tab.href === "/direction" ? pathname === tab.href : pathname.startsWith(tab.href);
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`relative block px-3.5 py-3 text-[15px] font-medium transition ${active ? "text-foreground" : "text-muted hover:text-foreground"}`}
              >
                {tab.label}
                {active ? <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gold" aria-hidden="true" /> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export type DirectionContext = { profile: Profile; direction: DirectionState };

export function WithDirection({
  children,
  place,
}: {
  children: (context: DirectionContext) => ReactNode;
  place: { path: string; label: string };
}) {
  const profile = useProfile();
  const direction = useDirection();
  useEffect(() => {
    if (profile) rememberPlace(place.path, place.label);
  }, [profile, place.path, place.label]);

  if (!profile || !direction) {
    return (
      <div className="grid gap-3 pt-6" aria-busy="true">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-72" />
      </div>
    );
  }
  return <>{children({ profile, direction })}</>;
}
