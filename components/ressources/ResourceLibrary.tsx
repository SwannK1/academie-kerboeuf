"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ResourcePanel, defaultPrintFile, defaultProjectFile, printPdf } from "@/components/ressources/ResourcePanel";
import { RESOURCE_DRAG } from "@/lib/workspace/dnd";
import { useActivity } from "@/lib/workspace/activity";
import { Icon } from "@/components/icons/Icon";
import { ActionMenu, Button, ChipGroup } from "@/components/workspace/ui";
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
  const [showTypes, setShowTypes] = useState(false);
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
  const level =
    levelParam === null && !q && !collection && !params.has("tous") && !params.has("recents") && !params.has("favoris") && profile?.level
      ? profile.level
      : levelParam;

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
  const objectsFirst = Boolean(profile?.level);
  const favoriteIds = new Set(activity?.favorites.filter((f) => f.kind === "ressource").map((f) => f.id));
  const recentIds = (activity?.recents ?? []).filter((r) => r.kind === "ressource").map((r) => r.id);
  const recentsOnly = params.get("recents") === "1";
  const shown = recentsOnly
    ? recentIds.map((id) => results.find((u) => u.id === id)).filter((u): u is ResourceUnit => Boolean(u))
    : favorites
      ? results.filter((u) => favoriteIds.has(u.id))
      : results;

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

      {/* Profil connu : les objets (récents, favoris, matières, niveau) d'abord, la recherche ensuite. */}
      {objectsFirst ? (
        <>
      <div className={`grid gap-3 ${objectsFirst ? "" : "mt-5"}`}>
        <ChipGroup
          label="Afficher"
          hideLabel
          allowEmpty
          options={[
            ...(recentIds.length ? [{ id: "recents", label: "Récents" }] : []),
            ...(favoriteIds.size ? [{ id: "favoris", label: "★ Favoris" }] : []),
            ...subjectsHere,
          ]}
          value={recentsOnly ? "recents" : favorites ? "favoris" : subject ?? inferred.subject ?? null}
          onChange={(v) =>
            setParam({
              recents: v === "recents" ? "1" : null,
              favoris: v === "favoris" ? "1" : null,
              matiere: v && v !== "recents" && v !== "favoris" ? v : null,
            })
          }
        />
        <div className="flex flex-wrap items-center gap-2">
          <ActionMenu
            label="Changer de niveau"
            align="left"
            triggerContent={
              <span className="chip chip-sm">
                {level ? levelLabel(level) : inferred.level ? levelLabel(inferred.level) : "Tous niveaux"}
                <Icon name="chevron-right" className="h-3.5 w-3.5 rotate-90" />
              </span>
            }
            sections={[
              {
                title: "Niveau",
                actions: [
                  { label: "Tous niveaux", onSelect: () => setParam({ niveau: null, tous: "1", matiere: null }) },
                  ...levelsWithResources.map((l) => ({ label: l.label, onSelect: () => setParam({ niveau: l.id, tous: null, matiere: null }) })),
                ],
              },
            ]}
          />
          {showTypes || type ? (
            <ChipGroup
              label="Type"
              hideLabel
              size="sm"
              allowEmpty
              options={TYPE_FILTERS}
              value={type ?? inferred.type ?? null}
              onChange={(v) => setParam({ type: v })}
            />
          ) : (
            <button type="button" onClick={() => setShowTypes(true)} className="btn btn-quiet">
              Leçon, exercices…
            </button>
          )}
        </div>
      </div>

      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          setParam({ q: query || null });
          inputRef.current?.blur();
        }}
        className={`relative ${objectsFirst ? "mt-4 max-w-xl" : ""}`}
      >
        <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Que cherchez-vous ?"
          placeholder={objectsFirst ? "Rechercher une notion…" : "Que cherchez-vous ? « soustraction CE1 », « imparfait »…"}
          className={`w-full border border-line bg-panel-soft pl-12 pr-4 text-base placeholder:text-muted/70 focus:outline-2 focus:outline-gold ${objectsFirst ? "h-12 rounded-xl" : "h-14 rounded-2xl shadow-[0_12px_30px_-24px_rgba(43,36,32,0.5)]"}`}
        />
      </form>

        </>
      ) : (
        <>
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          setParam({ q: query || null });
          inputRef.current?.blur();
        }}
        className={`relative ${objectsFirst ? "mt-4 max-w-xl" : ""}`}
      >
        <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Que cherchez-vous ?"
          placeholder={objectsFirst ? "Rechercher une notion…" : "Que cherchez-vous ? « soustraction CE1 », « imparfait »…"}
          className={`w-full border border-line bg-panel-soft pl-12 pr-4 text-base placeholder:text-muted/70 focus:outline-2 focus:outline-gold ${objectsFirst ? "h-12 rounded-xl" : "h-14 rounded-2xl shadow-[0_12px_30px_-24px_rgba(43,36,32,0.5)]"}`}
        />
      </form>

      <div className={`grid gap-3 ${objectsFirst ? "" : "mt-5"}`}>
        <ChipGroup
          label="Afficher"
          hideLabel
          allowEmpty
          options={[
            ...(recentIds.length ? [{ id: "recents", label: "Récents" }] : []),
            ...(favoriteIds.size ? [{ id: "favoris", label: "★ Favoris" }] : []),
            ...subjectsHere,
          ]}
          value={recentsOnly ? "recents" : favorites ? "favoris" : subject ?? inferred.subject ?? null}
          onChange={(v) =>
            setParam({
              recents: v === "recents" ? "1" : null,
              favoris: v === "favoris" ? "1" : null,
              matiere: v && v !== "recents" && v !== "favoris" ? v : null,
            })
          }
        />
        <div className="flex flex-wrap items-center gap-2">
          <ActionMenu
            label="Changer de niveau"
            align="left"
            triggerContent={
              <span className="chip chip-sm">
                {level ? levelLabel(level) : inferred.level ? levelLabel(inferred.level) : "Tous niveaux"}
                <Icon name="chevron-right" className="h-3.5 w-3.5 rotate-90" />
              </span>
            }
            sections={[
              {
                title: "Niveau",
                actions: [
                  { label: "Tous niveaux", onSelect: () => setParam({ niveau: null, tous: "1", matiere: null }) },
                  ...levelsWithResources.map((l) => ({ label: l.label, onSelect: () => setParam({ niveau: l.id, tous: null, matiere: null }) })),
                ],
              },
            ]}
          />
          {showTypes || type ? (
            <ChipGroup
              label="Type"
              hideLabel
              size="sm"
              allowEmpty
              options={TYPE_FILTERS}
              value={type ?? inferred.type ?? null}
              onChange={(v) => setParam({ type: v })}
            />
          ) : (
            <button type="button" onClick={() => setShowTypes(true)} className="btn btn-quiet">
              Leçon, exercices…
            </button>
          )}
        </div>
      </div>

        </>
      )}

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
          <p className="text-foreground">Pas encore de fiche ici.</p>
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
  const printFile = defaultPrintFile(unit);
  const projectFile = defaultProjectFile(unit);
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel-soft transition hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_18px_40px_-28px_rgba(43,36,32,0.6)]">
      <button
        type="button"
        draggable
        onDragStart={(event) => event.dataTransfer.setData(RESOURCE_DRAG, unit.id)}
        onClick={onOpen}
        className="flex flex-1 flex-col text-left"
      >
        <span className="relative block aspect-[4/3] w-full overflow-hidden border-b border-line bg-white">
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
        <span className="flex flex-1 flex-col px-4 pb-2 pt-3">
          <span className="text-xs text-muted">
            {levelLabel(unit.level)} · {subjectLabel(unit.subject)}
          </span>
          <span className="mt-1 line-clamp-2 font-medium leading-snug text-foreground">{unit.title}</span>
          <span className="mt-auto pt-2 text-xs text-muted">{unit.files.map((f) => FILE_TYPE_LABELS[f.type]).join(" · ")}</span>
        </span>
      </button>
      <div className="flex items-center gap-1 border-t border-line px-2 py-1.5 transition hover-reveal">
        <button type="button" onClick={onOpen} className="btn btn-quiet min-h-11 flex-1 px-2 text-[13px] md:min-h-9" aria-label={`Aperçu : ${unit.title}`}>
          <Icon name="image" className="h-4 w-4" /> Aperçu
        </button>
        {printFile ? (
          <span className="flex items-center">
            <button
              type="button"
              onClick={() => printPdf(printFile.href)}
              className="btn btn-quiet min-h-11 px-2 text-[13px] md:min-h-9"
              aria-label={`Imprimer : ${unit.title} (${FILE_TYPE_LABELS[printFile.type]})`}
              title={`Imprimer : ${FILE_TYPE_LABELS[printFile.type]}`}
            >
              <Icon name="printer" className="h-4 w-4" /> Imprimer
            </button>
            {unit.files.length > 1 ? (
              <ActionMenu
                label={`Imprimer un autre document : ${unit.title}`}
                trigger="chevron-right"
                buttonClassName="size-11 md:size-9 rotate-90"
                sections={[{ title: "Imprimer", actions: unit.files.map((f) => ({ label: FILE_TYPE_LABELS[f.type], icon: "printer" as const, onSelect: () => printPdf(f.href) })) }]}
              />
            ) : null}
          </span>
        ) : null}
        {projectFile ? (
          <a href={`${projectFile.href}#view=Fit`} target="_blank" rel="noopener noreferrer" className="btn btn-quiet min-h-11 px-2 text-[13px] md:min-h-9" aria-label={`Projeter : ${unit.title}`}>
            <Icon name="presentation" className="h-4 w-4" /> Projeter
          </a>
        ) : null}
      </div>
    </div>
  );
}
