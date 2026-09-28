"use client";

import Image from "next/image";
import { useState } from "react";
import { ChipGroup } from "@/components/workspace/ui";
import { FILE_TYPE_LABELS, RESOURCE_SUBJECTS, getResource, publishedResources, type ResourceUnit } from "@/lib/resources/library";
import { useActivity } from "@/lib/workspace/activity";
import { RESOURCE_DRAG } from "@/lib/workspace/dnd";
import type { TeachLevel } from "@/lib/workspace/curriculum";

type Source = "recents" | "favoris" | string;

/**
 * Bac de ressources posé à côté de la semaine : on glisse une fiche sur une
 * séance (ajout) ou un créneau libre (création). Un clic ouvre la fiche et
 * son menu « Ajouter à… », pour le clavier et le tactile.
 */
export function ResourceTray({ level, onOpen, compact = false }: { level: TeachLevel; onOpen: (id: string) => void; compact?: boolean }) {
  const activity = useActivity();
  const subjects = RESOURCE_SUBJECTS.filter((s) => publishedResources.some((u) => u.level === level && u.subject === s.id));
  const recents = (activity?.recents ?? [])
    .filter((r) => r.kind === "ressource")
    .map((r) => getResource(r.id))
    .filter((u): u is ResourceUnit => Boolean(u));
  const favorites = (activity?.favorites ?? [])
    .filter((r) => r.kind === "ressource")
    .map((r) => getResource(r.id))
    .filter((u): u is ResourceUnit => Boolean(u));
  const [source, setSource] = useState<Source | null>(null);
  const [limit, setLimit] = useState(compact ? 6 : 30);

  const current = source ?? (recents.length ? "recents" : subjects[0]?.id ?? "recents");
  const list =
    current === "recents" ? recents : current === "favoris" ? favorites : publishedResources.filter((u) => u.level === level && u.subject === current);

  const options = [
    ...(recents.length ? [{ id: "recents", label: "Récents" }] : []),
    ...(favorites.length ? [{ id: "favoris", label: "Favoris" }] : []),
    ...subjects.map((s) => ({ id: s.id, label: s.label })),
  ];

  return (
    <aside
      aria-label="Bac de ressources"
      className={compact ? "" : "rounded-2xl border border-line bg-panel/35 p-3 xl:sticky xl:top-20 xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto"}
    >
      {options.length ? (
        <ChipGroup label="Ressources" hideLabel size="sm" options={options} value={current} onChange={(v) => v && setSource(v)} />
      ) : (
        <p className="text-sm text-muted">Pas encore de fiche publiée pour ce niveau.</p>
      )}
      <ul className="mt-3 grid gap-2">
        {list.slice(0, limit).map((unit) => (
          <li key={unit.id}>
            <button
              type="button"
              draggable
              onDragStart={(event) => {
                event.dataTransfer.setData(RESOURCE_DRAG, unit.id);
                event.dataTransfer.effectAllowed = "copy";
              }}
              onClick={() => onOpen(unit.id)}
              className="flex w-full cursor-grab items-center gap-3 rounded-xl border border-line bg-panel-soft p-2 text-left transition hover:border-ink/25 active:cursor-grabbing"
            >
              <span className="relative h-14 w-11 shrink-0 overflow-hidden rounded-md border border-line bg-white">
                {unit.preview ? <Image src={unit.preview} alt="" fill sizes="44px" className="object-cover object-top" /> : null}
              </span>
              <span className="min-w-0">
                <span className="line-clamp-2 text-[13px] leading-snug">{unit.title}</span>
                <span className="text-[11px] text-muted">{unit.files.map((f) => FILE_TYPE_LABELS[f.type]).join(" · ")}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      {list.length > limit ? (
        <button type="button" onClick={() => setLimit((l) => l + 12)} className="btn btn-quiet mt-2 w-full">
          Voir plus ({list.length - limit})
        </button>
      ) : null}
    </aside>
  );
}
