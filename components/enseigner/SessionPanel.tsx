"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { ActionMenu, Button, ChipGroup, Hint, SidePanel, toast, type MenuSection } from "@/components/workspace/ui";
import type { TeachContext } from "@/components/enseigner/EnseignerShell";
import { FILE_TYPE_LABELS, getResource, suggestResources } from "@/lib/resources/library";
import { getCurriculum, getSubject, getTimetableSubjects, levelLabel } from "@/lib/workspace/curriculum";
import { addDays, dayLabel, formatLongDate, formatShortDate, formatTime, mondayOf } from "@/lib/workspace/school-year";
import {
  DURATIONS,
  ORGANISATIONS,
  SESSION_KINDS,
  duplicateSession,
  moveSession,
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
      subtitle={session ? `${formatLongDate(session.date)} · ${formatTime(session.start)} · ${levelLabel(session.level)}` : undefined}
      footer={session ? <PanelFooter session={session} context={context} onClose={onClose} /> : null}
    >
      {session ? <SessionEditor key={session.id} session={session} context={context} /> : null}
    </SidePanel>
  );
}

function PanelFooter({ session, context, onClose }: { session: Session; context: TeachContext; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <label className="flex min-h-10 cursor-pointer items-center gap-2.5 text-sm font-medium">
        <input type="checkbox" className="check" checked={session.done} onChange={() => toggleSessionDone(session.id, context.zone)} />
        Terminée
      </label>
      <div className="flex items-center gap-1">
        <ActionMenu label="Dupliquer, déplacer, plus d'actions" sections={sessionMenuSections(session, context, onClose)} trigger="more" />
        <Button variant="primary" onClick={onClose}>
          OK
        </Button>
      </div>
    </div>
  );
}

function SessionEditor({ session, context }: { session: Session; context: TeachContext }) {
  const tree = getCurriculum(session.level);
  const subjects = getTimetableSubjects(session.level);
  const subjectTree = tree.find((s) => s.id === session.subject);
  const domain = subjectTree?.domains.find((d) => d.id === session.domainId);
  const [showNote, setShowNote] = useState(Boolean(session.note));
  const [showAllNotions, setShowAllNotions] = useState(false);
  const progress = session.notionId ? context.teach.progress[session.notionId] : undefined;
  const set = (patch: Partial<Session>) => updateSession(session.id, patch);

  const suggestions = suggestResources({
    level: session.level,
    resourceSubject: getSubject(session.subject).resourceSubject,
    domain: domain?.label ?? "",
    text: session.notionLabel ?? "",
    limit: 6,
  })
    .filter((unit) => !session.resources.includes(unit.id))
    .slice(0, 4);

  const notions = domain?.notions ?? [];
  const visibleNotions = showAllNotions || notions.length <= 6 ? notions : notions.slice(0, 6);

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <TimeStepper value={session.start} onChange={(start) => set({ start })} />
        <span className="text-muted">·</span>
        <span className="text-muted">{dayLabel(session.date)}</span>
      </div>

      <ChipGroup
        label="Matière"
        size="sm"
        options={subjects.map((s) => ({ id: s.id, label: s.short }))}
        value={session.subject}
        onChange={(subject) => subject && set({ subject, domainId: null, notionId: null, notionLabel: null })}
      />

      {subjectTree ? (
        <ChipGroup
          label="Domaine"
          size="sm"
          allowEmpty
          options={subjectTree.domains.map((d) => ({ id: d.id, label: d.label }))}
          value={session.domainId}
          onChange={(domainId) => set({ domainId, notionId: null, notionLabel: null })}
        />
      ) : null}

      {domain ? (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Notion</p>
          <div role="radiogroup" aria-label="Notion" className="grid gap-1.5">
            {visibleNotions.map((notion) => {
              const on = notion.id === session.notionId;
              return (
                <button
                  key={notion.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => set(on ? { notionId: null, notionLabel: null } : { notionId: notion.id, notionLabel: notion.label })}
                  className={`flex min-h-10 items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-sm transition ${
                    on ? "border-foreground bg-foreground text-background" : "border-line bg-panel-soft hover:border-ink/30"
                  }`}
                >
                  {on ? <Icon name="check" className="h-4 w-4 shrink-0" /> : <span className="w-4 shrink-0" />}
                  {notion.label}
                </button>
              );
            })}
          </div>
          {notions.length > visibleNotions.length ? (
            <button type="button" onClick={() => setShowAllNotions(true)} className="mt-2 text-sm text-muted underline decoration-ink/25">
              Voir les {notions.length - visibleNotions.length} autres notions
            </button>
          ) : null}
        </div>
      ) : null}

      {session.notionId || !subjectTree?.domains.length ? (
        <>
          <ChipGroup label="Type" size="sm" allowEmpty options={SESSION_KINDS} value={session.kind} onChange={(kind) => set({ kind })} />
          <ChipGroup label="Organisation" size="sm" allowEmpty options={ORGANISATIONS} value={session.organisation} onChange={(organisation) => set({ organisation })} />
        </>
      ) : null}

      <ChipGroup
        label="Durée"
        size="sm"
        options={Array.from(new Set([...DURATIONS, session.duration])).sort((a, b) => a - b).map((d) => ({ id: d, label: `${d} min` }))}
        value={session.duration}
        onChange={(duration) => duration && set({ duration })}
      />

      {session.done && session.notionId && progress?.state === "commencee" ? (
        <Hint
          action={
            <button type="button" className="btn btn-secondary" onClick={() => setProgress(session.notionId as string, { state: "travaillee" })}>
              Oui
            </button>
          }
        >
          Notion travaillée pour la période&nbsp;?
        </Hint>
      ) : null}

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Ressources</p>
        {session.resources.length ? (
          <ul className="mb-3 grid gap-1.5">
            {session.resources.map((id) => {
              const unit = getResource(id);
              if (!unit) return null;
              return (
                <li key={id} className="flex items-center gap-2 rounded-lg border border-line bg-panel-soft py-1 pl-3 pr-1">
                  <Icon name="book-open" className="h-4 w-4 shrink-0 text-jade" />
                  <span className="min-w-0 flex-1 truncate text-sm">{unit.title}</span>
                  {unit.files[0] ? (
                    <a href={unit.files[0].href} target="_blank" rel="noopener noreferrer" className="grid size-9 place-items-center rounded-md text-muted hover:bg-ink/6" aria-label={`Ouvrir ${unit.title}`}>
                      <Icon name="external" className="h-4 w-4" />
                    </a>
                  ) : null}
                  <button type="button" onClick={() => toggleResource(session.id, id)} className="grid size-9 place-items-center rounded-md text-muted hover:bg-ink/6" aria-label={`Retirer ${unit.title}`}>
                    <Icon name="x" className="h-4 w-4" />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
        {suggestions.length ? (
          <ul className="grid gap-1.5">
            {suggestions.map((unit) => (
              <li key={unit.id}>
                <button
                  type="button"
                  onClick={() => toggleResource(session.id, unit.id)}
                  className="flex w-full items-center gap-2.5 rounded-lg border border-dashed border-line px-3 py-2 text-left text-sm transition hover:border-ink/30 hover:bg-panel-soft"
                >
                  <Icon name="plus" className="h-4 w-4 shrink-0 text-muted" />
                  <span className="min-w-0 flex-1">
                    <span className="block leading-snug">{unit.title}</span>
                    <span className="text-xs text-muted">{unit.files.map((f) => FILE_TYPE_LABELS[f.type]).join(" · ")}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted">Aucune ressource publiée ne correspond encore à cette notion.</p>
        )}
        <Link href={`/ressources?niveau=${session.level}&seance=${session.id}`} className="mt-2 inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-gold hover:underline">
          <Icon name="search" className="h-4 w-4" />
          Chercher dans la bibliothèque
        </Link>
      </div>

      {showNote ? (
        <label className="grid gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Précision personnelle</span>
          <textarea
            className="field min-h-24"
            value={session.note}
            onChange={(event) => set({ note: event.target.value })}
            placeholder="Facultatif"
          />
        </label>
      ) : (
        <button type="button" onClick={() => setShowNote(true)} className="justify-self-start text-sm text-muted underline decoration-ink/25 hover:text-foreground">
          Ajouter une précision personnelle
        </button>
      )}
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
