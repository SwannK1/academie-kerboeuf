"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon, type IconName } from "@/components/icons/Icon";
import { ChipGroup, Skeleton } from "@/components/workspace/ui";
import { clearRecents, toggleFavoriteItem, useActivity, type ActivityItem, type ActivityKind } from "@/lib/workspace/activity";

const KIND_LABEL: Record<ActivityKind, string> = { ressource: "Ressources", outil: "Outils", page: "Espaces de travail" };
const KIND_ICON: Record<ActivityKind, IconName> = { ressource: "book-open", outil: "grid", page: "calendar" };

function when(iso: string): string {
  const d = new Date(iso);
  const days = Math.floor((Date.now() - d.getTime()) / 86_400_000);
  if (days <= 0) return "aujourd'hui";
  if (days === 1) return "hier";
  return `il y a ${days} jours`;
}

export function ActivityList({ mode }: { mode: "favoris" | "recents" }) {
  const activity = useActivity();
  const [kind, setKind] = useState<ActivityKind | null>(null);
  if (!activity) return <Skeleton className="h-64" />;
  const all = mode === "favoris" ? activity.favorites : activity.recents;
  const items = kind ? all.filter((i) => i.kind === kind) : all;
  const kinds = (Object.keys(KIND_LABEL) as ActivityKind[]).filter((k) => all.some((i) => i.kind === k));

  if (!all.length) {
    return (
      <div className="rounded-2xl border border-dashed border-line p-8 text-center">
        <p className="text-foreground">
          {mode === "favoris" ? "Aucun favori pour l'instant." : "Rien d'ouvert récemment sur cet appareil."}
        </p>
        <p className="mt-1 text-sm text-muted">
          {mode === "favoris" ? "L'étoile d'une ressource ou d'un outil l'ajoute ici." : "Ressources, outils et écrans ouverts apparaîtront ici."}
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <Link href="/ressources" className="btn btn-secondary">Ressources</Link>
          <Link href="/enseigner/outils" className="btn btn-quiet">Outils</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        {kinds.length > 1 ? (
          <ChipGroup label="Type" hideLabel size="sm" allowEmpty options={kinds.map((k) => ({ id: k, label: KIND_LABEL[k] }))} value={kind} onChange={setKind} />
        ) : (
          <span />
        )}
        {mode === "recents" ? (
          <button type="button" onClick={clearRecents} className="text-sm text-muted underline decoration-ink/25 hover:text-foreground">
            Effacer l&apos;historique
          </button>
        ) : null}
      </div>
      <ul className="mt-4 divide-y divide-line rounded-2xl border border-line">
        {items.map((item: ActivityItem) => (
          <li key={`${item.kind}-${item.id}`} className="flex items-center gap-3 pr-2">
            <Link href={item.href} className="flex min-h-14 min-w-0 flex-1 items-center gap-3 px-4 py-2 hover:bg-ink/[0.03]">
              <Icon name={KIND_ICON[item.kind]} className="h-4 w-4 shrink-0 text-gold" />
              <span className="min-w-0">
                <span className="block truncate text-[15px]">{item.label}</span>
                <span className="text-xs text-muted">
                  {[item.detail, mode === "recents" ? when(item.at) : KIND_LABEL[item.kind]].filter(Boolean).join(" · ")}
                </span>
              </span>
            </Link>
            {mode === "favoris" ? (
              <button type="button" onClick={() => toggleFavoriteItem(item)} aria-label={`Retirer ${item.label} des favoris`} className="grid size-10 place-items-center rounded-md text-gold hover:bg-ink/6">
                <Icon name="star" className="h-4 w-4" />
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    </>
  );
}
