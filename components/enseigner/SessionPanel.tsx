"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { ActionMenu, ChipGroup, Hint, SidePanel, toast, type MenuSection } from "@/components/workspace/ui";
import type { TeachContext } from "@/components/enseigner/EnseignerShell";
import { FILE_TYPE_LABELS, getResource, suggestResources, type ResourceUnit } from "@/lib/resources/library";
import { defaultPrintFile, defaultProjectFile, printPdf } from "@/components/ressources/ResourcePanel";
import { getCurriculum, getSubject, getTimetableSubjects } from "@/lib/workspace/curriculum";
import { addDays, dayLabel, formatLongDate, formatShortDate, formatTime, mondayOf } from "@/lib/workspace/school-year";
import {
  DURATIONS,
  ORGANISATIONS,
  SESSION_KINDS,
  duplicateSession,
  moveSession,
  rankNotions,
  nextSchoolDay,
  remainingWeeklyDates,
  removeSession,
  saveAsTemplate,
  schoolDatesOfWeek,
  sessionTitle,
  setProgress,
  teachStore,
  toggleResource,
  toggleSessionDone,
  updateSession,
  type Session,
} from "@/lib/workspace/teach";

/** Actions de duplication / déplacement communes au panneau et aux cartes. */
export function sessionMenuSections(session: Session, context: TeachContext, onRemoved?: () => void): MenuSection[] {
  const { teach, zone } = context;
  const monday = mondayOf(session.date);
  const otherDays = schoolDatesOfWeek(teach, monday).filter((d) => d !== session.date);
  const tomorrow = nextSchoolDay(teach, session.date, zone);
  const repeatDates = remainingWeeklyDates(session.date, zone);
  const title = sessionTitle(session);

  const duplicate = (dates: string[], label: string) => () => {
    const before = teachStore.get();
    duplicateSession(session.id, dates);
    toast(label, () => teachStore.set(before));
  };
  const move = (date: string) => () => {
    const before = teachStore.get();
    moveSession(session.id, date);
    toast(`Déplacée à ${dayLabel(date).toLowerCase()} ${formatShortDate(date)}`, () => teachStore.set(before));
  };

  return [
    {
      title: "Dupliquer",
      actions: [
        { label: `Demain (${dayLabel(tomorrow).toLowerCase()})`, icon: "copy", onSelect: duplicate([tomorrow], "Séance dupliquée demain") },
        ...otherDays
          .filter((d) => d !== tomorrow)
          .map((d) => ({ label: dayLabel(d), icon: "copy" as const, onSelect: duplicate([d], `Séance dupliquée ${dayLabel(d).toLowerCase()}`) })),
        { label: "Semaine prochaine", icon: "copy", onSelect: duplicate([addDays(session.date, 7)], "Séance dupliquée la semaine prochaine") },
        ...(repeatDates.length
          ? [
              {
                label: `Chaque ${dayLabel(session.date).toLowerCase()} jusqu'aux vacances (${repeatDates.length})`,
                icon: "repeat" as const,
                onSelect: duplicate(repeatDates, `${repeatDates.length} séances ajoutées`),
              },
            ]
          : []),
      ],
    },
    {
      title: "Déplacer vers…",
      actions: [
        ...otherDays.map((d) => ({ label: dayLabel(d), icon: "move" as const, onSelect: move(d) })),
        { label: "Semaine prochaine", icon: "move", onSelect: move(addDays(session.date, 7)) },
      ],
    },
    {
      actions: [
        {
          label: "Enregistrer comme modèle",
          icon: "bookmark",
          onSelect: () => {
            saveAsTemplate(session.id);
            toast(`Modèle « ${title} » enregistré`);
          },
        },
        {
          label: "Supprimer",
          icon: "trash",
          tone: "danger",
          onSelect: () => {
            const before = teachStore.get();
            removeSession(session.id);
            onRemoved?.();
            toast("Séance supprimée", () => teachStore.set(before));
          },
        },
      ],
    },
  ];
}

export function SessionPanel({
  sessionId,
  context,
  onClose,
}: {
  sessionId: string | null;
  context: TeachContext;
  onClose: () => void;
}) {
  const session = context.teach.sessions.find((s) => s.id === sessionId) ?? null;
  return (
    <SidePanel
      open={Boolean(session)}
      onClose={onClose}
      title={session ? sessionTitle(session) : ""}
      subtitle={session ? `${formatLongDate(session.date)} · ${formatTime(session.start)} · ${session.duration} min · ${getSubject(session.subject).short}` : undefined}
      footer={session ? <PanelFooter session={session} context={context} onClose={onClose} /> : null}
    >
      {session ? <SessionEditor key={session.id} session={session} context={context} /> : null}
    </SidePanel>
  );
}

/**
 * Tout est enregistré à chaque clic : pas de bouton de validation. Le pied de
 * panneau affiche « ✓ Enregistré » dès la première modification ; on ferme
 * par la croix, Échap ou un clic à côté.
 */
function PanelFooter({ session, context, onClose }: { session: Session; context: TeachContext; onClose: () => void }) {
  const [initial] = useState(() => JSON.stringify(session));
  const saved = JSON.stringify(session) !== initial;
  return (
    <div className="flex items-center justify-between gap-2">
      <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm font-medium">
        <input type="checkbox" className="check" checked={session.done} onChange={() => toggleSessionDone(session.id, context.zone)} />
        Terminée
      </label>
      <div className="flex items-center gap-2">
        <span role="status" className={`flex items-center gap-1 text-sm font-medium text-jade transition-opacity ${saved ? "opacity-100" : "opacity-0"}`}>
          <Icon name="check" className="h-4 w-4" />
          Enregistré
        </span>
        <ActionMenu label="Dupliquer, déplacer, plus d'actions" sections={sessionMenuSections(session, context, onClose)} trigger="more" buttonClassName="size-11" />
      </div>
    </div>
  );
}

function SessionEditor({ session, context }: { session: Session; context: TeachContext }) {
  const [more, setMore] = useState(false);
  const [changing, setChanging] = useState(false);
  const [allNotions, setAllNotions] = useState(false);
  const set = (patch: Partial<Session>) => updateSession(session.id, patch);

  const subjectTree = getCurriculum(session.level).find((s) => s.id === session.subject);
  const domain = subjectTree?.domains.find((d) => d.id === session.domainId);
  const resourceSubject = getSubject(session.subject).resourceSubject;
  // Une notion qui a déjà une fiche publiée remonte, à priorité égale.
  const ranked = rankNotions(context.teach, session.level, session.subject, session.date, context.zone)
    .map((n, index) => ({
      ...n,
      index,
      ready: Boolean(resourceSubject) && suggestResources({ level: session.level, resourceSubject, text: n.label, strict: true, limit: 1 }).length > 0,
    }))
    .sort((a, b) => Number(Boolean(b.hint)) - Number(Boolean(a.hint)) || Number(b.ready) - Number(a.ready) || a.index - b.index);
  const hasNotion = Boolean(session.notionId || session.notionLabel);
  // Trois suggestions, davantage seulement si plusieurs notions sont prévues ou en continuité.
  const suggestionCount = Math.max(3, ranked.filter((n) => n.hint).length);
  const pickingNotion = ranked.length > 0 && (!hasNotion || changing);
  const progress = session.notionId ? context.teach.progress[session.notionId] : undefined;

  const attached = session.resources.map(getResource).filter((u): u is ResourceUnit => Boolean(u));
  // Correspondances directes avec la notion d'abord ; à défaut, fiches du même domaine.
  const direct = hasNotion
    ? suggestResources({ level: session.level, resourceSubject, domain: domain?.label ?? "", text: session.notionLabel ?? "", strict: true, limit: 8 })
    : [];
  const sameDomain =
    hasNotion && !direct.length
      ? suggestResources({ level: session.level, resourceSubject, domain: domain?.label ?? "", text: "", limit: 6 })
      : [];
  const suggestions = [...direct, ...sameDomain].filter((unit) => !session.resources.includes(unit.id));
  const resourceChoices = suggestions.slice(0, attached.length ? 4 : 6);

  function chooseNotion(id: string, label: string, domainId: string) {
    set({ notionId: id, notionLabel: label, domainId });
    setChanging(false);
  }

  return (
    <div className="grid gap-6">
      {pickingNotion ? (
        <section aria-labelledby="choisir-notion">
          <h3 id="choisir-notion" className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            {allNotions ? "Toutes les notions" : "Suggestions"}
          </h3>
          <ul role="radiogroup" aria-labelledby="choisir-notion" className="grid gap-1.5">
            {(allNotions ? ranked : ranked.slice(0, suggestionCount)).map((notion) => {
              const on = notion.id === session.notionId;
              return (
                <li key={notion.id}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => chooseNotion(notion.id, notion.label, notion.domainId)}
                    className={`flex min-h-14 w-full items-center gap-3 rounded-xl border px-4 py-2.5 text-left transition ${
                      on ? "border-foreground bg-foreground text-background" : "border-line bg-panel-soft hover:border-ink/30"
                    }`}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] leading-snug">{notion.label}</span>
                      <span className={`text-xs ${on ? "text-background/70" : "text-muted"}`}>
                        {notion.domainLabel}
                        {notion.hint ? <span className="font-semibold text-gold"> · {notion.hint}</span> : null}
                        {notion.ready ? <span className={`font-semibold ${on ? "" : "text-jade"}`}> · Fiche prête</span> : null}
                      </span>
                    </span>
                    <Icon name={on ? "check" : "chevron-right"} className="h-4 w-4 shrink-0 opacity-60" />
                  </button>
                </li>
              );
            })}
          </ul>
          {!allNotions && ranked.length > suggestionCount ? (
            <button type="button" onClick={() => setAllNotions(true)} className="mt-2 min-h-10 text-sm text-muted underline decoration-ink/25">
              Toutes les notions ({ranked.length})
            </button>
          ) : null}
        </section>
      ) : hasNotion ? (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-panel/40 px-4 py-2.5">
          <span className="min-w-0 text-sm">
            <span className="block text-xs text-muted">{domain?.label ?? getSubject(session.subject).label}</span>
            <span className="line-clamp-2">{session.notionLabel}</span>
          </span>
          {ranked.length ? (
            <button type="button" onClick={() => setChanging(true)} className="btn btn-quiet shrink-0">
              Changer
            </button>
          ) : null}
        </div>
      ) : null}

      {hasNotion && !changing ? (
        <section aria-labelledby="choisir-ressource">
          {attached.length ? (
            <ul aria-label="Fiches de la séance" className="mb-4 grid gap-2">
              {attached.map((unit) => {
                const printFile = defaultPrintFile(unit);
                const projectFile = defaultProjectFile(unit);
                return (
                  <li key={unit.id} className="flex items-center gap-3 rounded-xl border border-jade/40 bg-jade/[0.05] p-2">
                    <span className="relative h-14 w-11 shrink-0 overflow-hidden rounded-md border border-line bg-white">
                      {unit.preview ? <Image src={unit.preview} alt="" fill sizes="44px" className="object-cover object-top" /> : null}
                    </span>
                    <span className="min-w-0 flex-1 text-[13px] leading-snug">
                      <span className="line-clamp-2">{unit.title}</span>
                    </span>
                    <span className="flex shrink-0 items-center">
                      {printFile ? (
                        <button type="button" onClick={() => printPdf(printFile.href)} className="grid size-11 place-items-center rounded-md text-foreground hover:bg-ink/6" aria-label={`Imprimer : ${unit.title}`} title="Imprimer">
                          <Icon name="printer" className="h-5 w-5" />
                        </button>
                      ) : null}
                      {projectFile ? (
                        <a href={`${projectFile.href}#view=Fit`} target="_blank" rel="noopener noreferrer" className="grid size-11 place-items-center rounded-md text-foreground hover:bg-ink/6" aria-label={`Projeter : ${unit.title}`} title="Projeter">
                          <Icon name="presentation" className="h-5 w-5" />
                        </a>
                      ) : null}
                      <button type="button" onClick={() => toggleResource(session.id, unit.id)} className="grid size-11 place-items-center rounded-md text-muted hover:bg-ink/6" aria-label={`Retirer : ${unit.title}`} title="Retirer">
                        <Icon name="x" className="h-5 w-5" />
                      </button>
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : null}
          <h3 id="choisir-ressource" className={`mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted ${attached.length && !resourceChoices.length ? "sr-only" : ""}`}>
            {attached.length ? "Autres fiches" : direct.length || !sameDomain.length ? "Ressource" : "Ressources du même domaine"}
          </h3>
          {resourceChoices.length ? (
            <ul className="grid grid-cols-2 gap-2">
              {resourceChoices.map((unit) => (
                <li key={unit.id}>
                  <button
                    type="button"
                    onClick={() => toggleResource(session.id, unit.id)}
                    aria-label={`Ajouter : ${unit.title}`}
                    className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-line text-left transition hover:border-ink/30"
                  >
                    <span className="relative block aspect-[4/3] overflow-hidden bg-white">
                      {unit.preview ? <Image src={unit.preview} alt="" fill sizes="200px" className="object-cover object-top" /> : null}
                      <span className="absolute right-1.5 top-1.5 grid size-7 place-items-center rounded-full bg-background/90 text-foreground">
                        <Icon name="plus" className="h-4 w-4" />
                      </span>
                    </span>
                    <span className="flex-1 bg-panel-soft px-2.5 py-2">
                      <span className="line-clamp-2 text-[13px] leading-snug">{unit.title}</span>
                      <span className="text-[11px] text-muted">{unit.files.map((f) => FILE_TYPE_LABELS[f.type]).join(" · ")}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : attached.length ? null : (
            <p className="text-sm text-muted">Pas encore de fiche publiée pour cette notion.</p>
          )}
          <Link
            href={`/ressources?niveau=${session.level}&seance=${session.id}${session.notionId ? `&notion=${session.notionId}` : ""}`}
            className="mt-2 inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-gold hover:underline"
          >
            <Icon name="search" className="h-4 w-4" />
            Autre ressource
          </Link>
        </section>
      ) : null}

      {session.done && session.notionId && progress?.state === "commencee" ? (
        <Hint
          action={
            <button type="button" className="btn btn-secondary" onClick={() => setProgress(session.notionId as string, { state: "travaillee" })}>
              Oui
            </button>
          }
        >
          Notion travaillée&nbsp;?
        </Hint>
      ) : null}

      <div className="border-t border-line pt-3">
        <button type="button" aria-expanded={more} onClick={() => setMore((v) => !v)} className="flex min-h-10 items-center gap-1.5 text-sm text-muted hover:text-foreground">
          <Icon name={more ? "chevron-right" : "plus"} className={`h-4 w-4 transition ${more ? "rotate-90" : ""}`} />
          Plus d&apos;options
        </button>
        {more ? (
          <div className="mt-4 grid gap-6">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <TimeStepper value={session.start} onChange={(start) => set({ start })} />
            </div>
            <ChipGroup
              label="Durée"
              size="sm"
              options={Array.from(new Set([...DURATIONS, session.duration])).sort((a, b) => a - b).map((d) => ({ id: d, label: `${d} min` }))}
              value={session.duration}
              onChange={(duration) => duration && set({ duration })}
            />
            <ChipGroup label="Type" size="sm" allowEmpty options={SESSION_KINDS} value={session.kind} onChange={(kind) => set({ kind })} />
            <ChipGroup label="Organisation" size="sm" allowEmpty options={ORGANISATIONS} value={session.organisation} onChange={(organisation) => set({ organisation })} />
            <ChipGroup
              label="Matière"
              size="sm"
              options={getTimetableSubjects(session.level).map((s) => ({ id: s.id, label: s.short }))}
              value={session.subject}
              onChange={(subject) => subject && set({ subject, domainId: null, notionId: null, notionLabel: null })}
            />
            <label className="grid gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Précision personnelle</span>
              <textarea className="field min-h-20" value={session.note} onChange={(event) => set({ note: event.target.value })} placeholder="Facultatif" />
            </label>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function TimeStepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-line bg-panel-soft">
      <button type="button" aria-label="5 minutes plus tôt" onClick={() => onChange(Math.max(420, value - 5))} className="grid size-9 place-items-center text-muted hover:text-foreground">
        <Icon name="chevron-left" className="h-4 w-4" />
      </button>
      <span className="min-w-14 text-center font-semibold tabular-nums" aria-live="polite">
        {formatTime(value)}
      </span>
      <button type="button" aria-label="5 minutes plus tard" onClick={() => onChange(Math.min(1080, value + 5))} className="grid size-9 place-items-center text-muted hover:text-foreground">
        <Icon name="chevron-right" className="h-4 w-4" />
      </button>
    </span>
  );
}
