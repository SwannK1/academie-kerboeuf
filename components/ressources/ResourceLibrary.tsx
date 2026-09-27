"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { ActionMenu, Button, ChipGroup, SidePanel, toast, type MenuSection } from "@/components/workspace/ui";
import {
  FILE_TYPE_LABELS,
  RESOURCE_SUBJECTS,
  TYPE_FILTERS,
  getResource,
  getVisibleCollections,
  publishedResources,
  searchResources,
  subjectLabel,
  type ResourceFileType,
  type ResourceUnit,
} from "@/lib/resources/library";
import { RESOURCE_LEVELS, getSubject, isMaternelle, levelLabel, type ResourceLevel, type TeachLevel } from "@/lib/workspace/curriculum";
import { useProfile } from "@/lib/workspace/profile";
import { addDays, dayLabel, formatShortDate, mondayOf, todayIso, weekday } from "@/lib/workspace/school-year";
import {
  createSession,
  freeSlotsOn,
  schoolDatesOfWeek,
  sessionTitle,
  sessionsOn,
  teachStore,
  toggleFavorite,
  toggleResource,
  useTeach,
  type TeachState,
} from "@/lib/workspace/teach";

const PAGE = 24;

const TEACH_SUBJECT: Record<string, string> = {
  francais: "francais",
  maths: "mathematiques",
  langage: "langage",
  sciences: "sciences-technologie",
  "hg-emc": "histoire",
  langues: "langue-vivante",
  arts: "arts-plastiques",
  eps: "eps",
};

function teachSubjectFor(unit: ResourceUnit, level: TeachLevel): string {
  if (unit.subject === "maths" && isMaternelle(level)) return "premiers-outils-mathematiques";
  if (unit.subject === "sciences" && ["cp", "ce1", "ce2"].includes(level)) return "questionner-le-monde";
  return TEACH_SUBJECT[unit.subject] ?? "francais";
}

const levelsWithResources = RESOURCE_LEVELS.filter((l) => publishedResources.some((u) => u.level === l.id));

export function ResourceLibrary() {
  const params = useSearchParams();
  const router = useRouter();
  const profile = useProfile();
  const teach = useTeach();
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

  const { results, inferred } = useMemo(
    () => searchResources({ q, level, subject, type, collection }),
    [q, level, subject, type, collection],
  );
  const shown = favorites && teach ? results.filter((u) => teach.favorites.includes(u.id)) : results;

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
          {teach?.favorites.length ? (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Mes favoris</p>
              <button type="button" aria-pressed={favorites} className={`chip chip-sm ${favorites ? "chip-on" : ""}`} onClick={() => setParam({ favoris: favorites ? null : "1" })}>
                <Icon name="star" className="h-3.5 w-3.5" />
                {teach.favorites.length}
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
            <ResourceCard unit={unit} favorite={Boolean(teach?.favorites.includes(unit.id))} onOpen={() => setParam({ voir: unit.id })} />
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
          <p className="text-foreground">Aucune ressource publiée ne correspond.</p>
          <button type="button" className="mt-2 text-sm text-gold underline" onClick={() => router.replace("/ressources?tous=1")}>
            Effacer les filtres
          </button>
        </div>
      ) : null}

      <ResourcePanel unit={viewed} teach={teach} profileLevel={profile?.level ?? null} targetSessionId={session?.id ?? null} onClose={() => setParam({ voir: null })} />
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

function addMenu(unit: ResourceUnit, teach: TeachState, level: TeachLevel): MenuSection[] {
  const today = todayIso();
  const monday = weekday(today) >= 6 ? addDays(mondayOf(today), 7) : mondayOf(today);
  const dates = schoolDatesOfWeek(teach, monday).filter((d) => d >= today || weekday(today) >= 6);
  const subjectId = teachSubjectFor(unit, level);
  const matching = teach.sessions
    .filter((s) => s.date >= today && s.date < addDays(monday, 7) && s.subject === subjectId && !s.resources.includes(unit.id))
    .sort((a, b) => a.date.localeCompare(b.date) || a.start - b.start)
    .slice(0, 5);

  function addToDay(date: string) {
    const before = teachStore.get();
    const slot = freeSlotsOn(teach, date).find((s) => s.subject === subjectId);
    const last = sessionsOn(teach, date).at(-1);
    createSession({
      date,
      start: slot?.start ?? (last ? last.start + last.duration : 510),
      duration: slot?.duration ?? 30,
      level,
      subject: subjectId,
      notionLabel: unit.title,
      resources: [unit.id],
    });
    toast(`Ajoutée ${date === today ? "aujourd'hui" : dayLabel(date).toLowerCase()}`, () => teachStore.set(before));
  }

  return [
    ...(matching.length
      ? [
          {
            title: "À une séance prévue",
            actions: matching.map((s) => ({
              label: `${dayLabel(s.date)} · ${sessionTitle(s)}`.slice(0, 60),
              icon: "plus" as const,
              onSelect: () => {
                toggleResource(s.id, unit.id);
                toast("Ressource ajoutée à la séance");
              },
            })),
          },
        ]
      : []),
    {
      title: "Nouvelle séance",
      actions: dates.map((d) => ({
        label: d === today ? "Aujourd'hui" : `${dayLabel(d)} ${formatShortDate(d)}`,
        icon: "calendar" as const,
        onSelect: () => addToDay(d),
      })),
    },
  ];
}

function ResourcePanel({
  unit,
  teach,
  profileLevel,
  targetSessionId,
  onClose,
}: {
  unit: ResourceUnit | undefined;
  teach: TeachState | null;
  profileLevel: TeachLevel | null;
  targetSessionId: string | null;
  onClose: () => void;
}) {
  const [picked, setPicked] = useState<{ id?: string; index: number }>({ index: 0 });
  const fileIndex = picked.id === unit?.id ? picked.index : 0;
  const setFileIndex = (index: number) => setPicked({ id: unit?.id, index });
  const file = unit?.files[Math.min(fileIndex, (unit?.files.length ?? 1) - 1)];
  const favorite = Boolean(unit && teach?.favorites.includes(unit.id));
  const level: TeachLevel = profileLevel ?? (RESOURCE_LEVELS.slice(0, 8).some((l) => l.id === unit?.level) ? (unit?.level as TeachLevel) : "cm2");
  const target = targetSessionId && teach ? teach.sessions.find((s) => s.id === targetSessionId) : undefined;
  const alreadyInTarget = Boolean(target && unit && target.resources.includes(unit.id));

  return (
    <SidePanel
      open={Boolean(unit)}
      wide
      onClose={onClose}
      title={unit?.title ?? ""}
      subtitle={unit ? `${levelLabel(unit.level)} · ${subjectLabel(unit.subject)}${unit.domain ? ` · ${unit.domain}` : ""}` : undefined}
      footer={
        unit && file ? (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <a href={file.href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <Icon name="printer" className="h-4 w-4" />
                Ouvrir et imprimer
              </a>
              <a href={file.href} download className="btn btn-quiet" aria-label="Télécharger le PDF">
                <Icon name="download" className="h-4 w-4" />
                <span className="hidden sm:inline">Télécharger</span>
              </a>
              {teach ? (
                <button type="button" onClick={() => toggleFavorite(unit.id)} aria-pressed={favorite} className={`btn btn-quiet ${favorite ? "text-gold" : ""}`}>
                  <Icon name="star" className="h-4 w-4" />
                  <span className="hidden sm:inline">{favorite ? "Dans mes favoris" : "Favori"}</span>
                </button>
              ) : null}
            </div>
            {target ? (
              <Button
                variant="primary"
                icon={alreadyInTarget ? "check" : "plus"}
                onClick={() => {
                  if (!alreadyInTarget) {
                    toggleResource(target.id, unit.id);
                    toast("Ressource ajoutée à la séance");
                  }
                }}
              >
                {alreadyInTarget ? "Dans la séance" : "Ajouter à la séance"}
              </Button>
            ) : teach ? (
              <ActionMenu
                label="Ajouter à ma semaine"
                sections={addMenu(unit, teach, level)}
                triggerContent={
                  <span className="btn btn-primary">
                    <Icon name="plus" className="h-4 w-4" />
                    Ajouter à…
                  </span>
                }
              />
            ) : null}
          </div>
        ) : null
      }
    >
      {unit && file ? (
        <div className="grid gap-4">
          {unit.objective ? <p className="text-[15px] leading-7 text-foreground">{unit.objective}</p> : null}
          {unit.files.length > 1 ? (
            <ChipGroup
              label="Document"
              hideLabel
              size="sm"
              options={unit.files.map((f, i) => ({ id: i, label: `${FILE_TYPE_LABELS[f.type]}${f.pages > 1 ? ` · ${f.pages} p.` : ""}` }))}
              value={fileIndex}
              onChange={(i) => i !== null && setFileIndex(i)}
            />
          ) : null}
          <div className="overflow-hidden rounded-xl border border-line bg-white">
            <iframe key={file.href} src={`${file.href}#view=FitH&toolbar=0`} title={`Aperçu : ${unit.title} (${FILE_TYPE_LABELS[file.type]})`} className="h-[62vh] w-full" />
          </div>
          <p className="text-xs text-muted">
            PDF A4 · {file.pages} page{file.pages > 1 ? "s" : ""} · {getSubject(teachSubjectFor(unit, level)).label}
          </p>
        </div>
      ) : null}
    </SidePanel>
  );
}
