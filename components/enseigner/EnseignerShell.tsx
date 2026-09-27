"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { ChipGroup, Skeleton } from "@/components/workspace/ui";
import { TEACH_LEVELS, levelLabel, type TeachLevel } from "@/lib/workspace/curriculum";
import { rememberPlace, updateProfile, useProfile, type Profile } from "@/lib/workspace/profile";
import { useTeach, type TeachState } from "@/lib/workspace/teach";
import type { Zone } from "@/lib/workspace/school-year";

const TABS = [
  { href: "/enseigner", label: "Aujourd'hui" },
  { href: "/enseigner/semaine", label: "Ma semaine" },
  { href: "/enseigner/periode", label: "Ma période" },
  { href: "/enseigner/annee", label: "Mon année" },
  { href: "/enseigner/classe", label: "Ma classe" },
  { href: "/enseigner/outils", label: "Autres outils" },
];

export function EnseignerTabs() {
  const pathname = usePathname();
  return (
    <nav aria-label="Enseigner" className="no-print -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ul className="flex min-w-max gap-1 border-b border-line">
        {TABS.map((tab) => {
          const active = tab.href === "/enseigner" ? pathname === tab.href : pathname.startsWith(tab.href);
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`relative block px-3.5 py-3 text-[15px] font-medium transition ${
                  active ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
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

export type TeachContext = { profile: Profile; teach: TeachState; level: TeachLevel; zone: Zone };

/**
 * Rend `children` une fois les données locales lues et le niveau connu.
 * Si le niveau manque, une seule question est posée, en chips.
 */
export function WithTeach({
  children,
  place,
}: {
  children: (context: TeachContext) => ReactNode;
  place: { path: string; label: string };
}) {
  const profile = useProfile();
  const teach = useTeach();

  useEffect(() => {
    if (profile) rememberPlace(place.path, place.label);
  }, [profile, place.path, place.label]);

  if (!profile || !teach) {
    return (
      <div className="grid gap-3 pt-6" aria-busy="true">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-72" />
      </div>
    );
  }

  if (!profile.level) {
    return (
      <div className="mt-8 max-w-xl rounded-2xl border border-line bg-panel-soft p-6">
        <h1 className="font-serif text-2xl font-semibold">Votre niveau principal&nbsp;?</h1>
        <p className="mt-1 text-sm text-muted">Il sert à proposer les bonnes notions et les bonnes ressources. Modifiable à tout moment.</p>
        <div className="mt-5">
          <ChipGroup
            label="Niveau"
            hideLabel
            options={TEACH_LEVELS}
            value={null}
            onChange={(level) => level && updateProfile({ level, role: profile.role ?? "enseignant" })}
          />
        </div>
      </div>
    );
  }

  return <>{children({ profile, teach, level: profile.level, zone: profile.zone ?? "A" })}</>;
}

export function PageTitle({ title, eyebrow, actions }: { title: string; eyebrow?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 pb-5 pt-7">
      <div>
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{eyebrow}</p> : null}
        <h1 className="mt-1 font-serif text-3xl font-semibold text-foreground sm:text-[2.1rem]">{title}</h1>
      </div>
      {actions ? <div className="no-print flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function levelBadge(level: TeachLevel) {
  return levelLabel(level);
}
