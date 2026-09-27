"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ResourcePanel } from "@/components/ressources/ResourcePanel";
import { useActivity } from "@/lib/workspace/activity";
import { Icon } from "@/components/icons/Icon";
import { Button, ChipGroup } from "@/components/workspace/ui";
import {
  FILE_TYPE_LABELS,
  RESOURCE_SUBJECTS,
  TYPE_FILTERS,
  getResource,
  getVisibleCollections,
  publishedResources,
  searchResources,
  suggestResources,
  subjectLabel,
  type ResourceFileType,
  type ResourceUnit,
} from "@/lib/resources/library";
import { RESOURCE_LEVELS, findNotion, getSubject, isTeachLevel, levelLabel, type ResourceLevel } from "@/lib/workspace/curriculum";
import { useProfile } from "@/lib/workspace/profile";
import { dayLabel, formatShortDate } from "@/lib/workspace/school-year";
import { sessionTitle, useTeach } from "@/lib/workspace/teach";

const PAGE = 24;

const levelsWithResources = RESOURCE_LEVELS.filter((l) => publishedResources.some((u) => u.level === l.id));

export function ResourceLibrary() {
  const params = useSearchParams();
  const router = useRouter();
  const profile = useProfile();
  const teach = useTeach();
  const activity = useActivity();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [limit, setLimit] = useState(PAGE);
  const inputRef = useRef<HTMLInputElement>(null);

  const levelParam = params.get("niveau") as ResourceLevel | null;
  const subject = params.get("matiere");
  const type = params.get("type") as ResourceFileType | null;
  const collection = params.get("collection");
  const favorites = params.get("favoris") === "1";
  const viewing = params.get("voir");
  const targetSession = params.get("seance");
  const q = params.get("q") ?? "";

  // Niveau du profil proposé par défaut, sans l'imposer (« tous » reste un clic).
  const level = levelParam === null && !q && !collection && !params.has("tous") && profile?.level ? profile.level : levelParam;

  function setParam(patch: Record<string, string | null>) {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(patch)) {
      if (value === null) next.delete(key);
      else next.set(key, value);
    }
    setLimit(PAGE);
    router.replace(`/ressources?${next.toString()}`, { scroll: false });
  }

  useEffect(() => {
    const handle = setTimeout(() => {
      if (query !== q) setParam({ q: query || null, voir: null });
    }, 250);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- déclenché par la saisie uniquement
  }, [query]);

  const notionId = params.get("notion");
  const notion = notionId && level && isTeachLevel(level) ? findNotion(level, notionId) : null;
  const { results, inferred } = useMemo(() => {
    if (notion && level) {
      const units = suggestResources({
        level,
        resourceSubject: getSubject(notion.subjectId).resourceSubject,
        domain: notion.domainLabel,
        text: notion.label,
        limit: 12,
      });
      return { results: units, inferred: {} };
    }
    return searchResources({ q, level, subject, type, collection });
  }, [notion, q, level, subject, type, collection]);
  const favoriteIds = new Set(activity?.favorites.filter((f) => f.kind === "ressource").map((f) => f.id));
  const shown = favorites ? results.filter((u) => favoriteIds.has(u.id)) : results;

  const subjectsHere = RESOURCE_SUBJECTS.filter((s) =>
    publishedResources.some((u) => u.subject === s.id && (!level || u.level === level)),
  );
  const collections = getVisibleCollections();
  const viewed = viewing ? getResource(viewing) : undefined;
  const session = targetSession && teach ? teach.sessions.find((s) => s.id === targetSession) : undefined;

  return (
    <>
      {session ? (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gold/30 bg-gold/[0.06] px-4 py-3 text-sm">
          <span>
            Ajout à la séance <strong>{sessionTitle(session)}</strong> · {dayLabel(session.date)} {formatShortDate(session.date)}
          </span>
          <Link href="/enseigner/semaine" className="font-semibold text-gold hover:underline">
            Retour à la semaine
          </Link>
        </div>
      ) : null}

      {notion ? (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-panel-soft px-4 py-3 text-sm">
          <span>
            Ressources proches de la notion <strong>{notion.label}</strong>
          </span>
          <button type="button" className="text-muted underline" onClick={() => setParam({ notion: null })}>
            Voir toute la bibliothèque
          </button>
        </div>
      ) : null}

      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          setParam({ q: query || null });
          inputRef.current?.blur();
        }}
        className="relative"
      >
        <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Que cherchez-vous ?"
          placeholder="Que cherchez-vous ? « soustraction CE1 », « imparfait »…"
          className="h-14 w-full rounded-2xl border border-line bg-panel-soft pl-12 pr-4 text-base shadow-[0_12px_30px_-24px_rgba(43,36,32,0.5)] placeholder:text-muted/70 focus:outline-2 focus:outline-gold"
        />
      </form>

      <div className="mt-5 grid gap-4">
        <ChipGroup
          label="Niveau"
          size="sm"
          allowEmpty
          options={levelsWithResources}
          value={level ?? inferred.level ?? null}
          onChange={(v) => setParam({ niveau: v, tous: v ? null : "1", matiere: null })}
        />
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <ChipGroup
            label="Matière"
            size="sm"
            allowEmpty
            options={subjectsHere}
            value={subject ?? inferred.subject ?? null}
            onChange={(v) => setParam({ matiere: v })}
          />
          <ChipGroup
            label="Type"
            size="sm"
            allowEmpty
            options={TYPE_FILTERS}
            value={type ?? inferred.type ?? null}
            onChange={(v) => setParam({ type: v })}
          />
          {favoriteIds.size ? (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Mes favoris</p>
              <button type="button" aria-pressed={favorites} className={`chip chip-sm ${favorites ? "chip-on" : ""}`} onClick={() => setParam({ favoris: favorites ? null : "1" })}>
                <Icon name="star" className="h-3.5 w-3.5" />
                {favoriteIds.size}
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {!q && !collection && collections.length ? (
        <section aria-labelledby="collections" className="mt-8">
          <h2 id="collections" className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Collections
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {collections.map((c) => (
              <button key={c.id} type="button" onClick={() => setParam({ collection: c.id, niveau: null, tous: "1" })} className="rounded-xl border border-line bg-panel-soft px-4 py-2.5 text-left transition hover:border-ink/25">
                <span className="block text-sm font-semibold">{c.title}</span>
                <span className="text-xs text-muted">{c.count} ressources</span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {collection ? (
        <div className="mt-6 flex items-center gap-3 text-sm">
          <span className="font-semibold">{collections.find((c) => c.id === collection)?.title}</span>
          <button type="button" className="text-muted underline" onClick={() => setParam({ collection: null })}>
            Retirer
          </button>
        </div>
      ) : null}

      <p className="mt-8 text-sm text-muted" aria-live="polite">
        {shown.length} ressource{shown.length > 1 ? "s" : ""}
        {level ? ` · ${levelLabel(level)}` : ""}
        {q ? ` pour « ${q} »` : ""}
      </p>

      <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shown.slice(0, limit).map((unit) => (
          <li key={unit.id}>
            <ResourceCard unit={unit} favorite={favoriteIds.has(unit.id)} onOpen={() => setParam({ voir: unit.id })} />
          </li>
        ))}
      </ul>
      {shown.length > limit ? (
        <div className="mt-6 flex justify-center">
          <Button onClick={() => setLimit((l) => l + PAGE)}>Voir plus ({shown.length - limit})</Button>
        </div>
      ) : null}
      {!shown.length ? (
        <div className="mt-6 rounded-2xl border border-dashed border-line p-8 text-center">
          <p className="text-foreground">Cette ressource est encore en préparation.</p>
          <p className="mt-1 text-sm text-muted">Voici ce qui est déjà disponible :</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {level ? (
              <button type="button" className="btn btn-secondary" onClick={() => router.replace(`/ressources?niveau=${level}`)}>
                Toutes les ressources {levelLabel(level)}
              </button>
            ) : null}
            {subject ? (
              <button type="button" className="btn btn-secondary" onClick={() => router.replace(`/ressources?matiere=${subject}&tous=1`)}>
                Toutes les ressources {subjectLabel(subject)}
              </button>
            ) : null}
            <button type="button" className="btn btn-quiet" onClick={() => router.replace("/ressources?tous=1")}>
              Effacer les filtres
            </button>
          </div>
        </div>
      ) : null}

      <ResourcePanel unit={viewed} targetSessionId={session?.id ?? null} onClose={() => setParam({ voir: null })} onNavigate={(id) => setParam({ voir: id })} />
    </>
  );
}

function ResourceCard({ unit, favorite, onOpen }: { unit: ResourceUnit; favorite: boolean; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-panel-soft text-left transition hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_18px_40px_-28px_rgba(43,36,32,0.6)]">
      <span className="relative block aspect-[4/3] overflow-hidden border-b border-line bg-white">
        {unit.preview ? (
          <Image src={unit.preview} alt="" fill sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 90vw" className="object-cover object-top transition group-hover:scale-[1.02]" />
        ) : null}
        {favorite ? (
          <span className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-background/90 text-gold">
            <Icon name="star" className="h-4 w-4" />
            <span className="sr-only">Favori</span>
          </span>
        ) : null}
      </span>
      <span className="flex flex-1 flex-col p-4">
        <span className="text-xs text-muted">
          {levelLabel(unit.level)} · {subjectLabel(unit.subject)}
        </span>
        <span className="mt-1 line-clamp-2 font-medium leading-snug text-foreground">{unit.title}</span>
        <span className="mt-auto pt-3 text-xs text-muted">{unit.files.map((f) => FILE_TYPE_LABELS[f.type]).join(" · ")}</span>
      </span>
    </button>
  );
}

