"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons/Icon";
import { ActionMenu, accentStyles, toast } from "@/components/workspace/ui";
import type { TeachContext } from "@/components/enseigner/EnseignerShell";
import { sessionMenuSections } from "@/components/enseigner/SessionPanel";
import { getSubject } from "@/lib/workspace/curriculum";
import { addDays, dayLabel, formatShortDate, formatTime, isHoliday, mondayOf, todayIso } from "@/lib/workspace/school-year";
import {
  createSession,
  duplicateDay,
  freeSlotsOn,
  moveSession,
  schoolDatesOfWeek,
  sessionTitle,
  sessionsOn,
  stripDated,
  teachStore,
  toggleSessionDone,
  type Session,
  type Slot,
} from "@/lib/workspace/teach";

const DRAG_TYPE = "application/x-ak-seance";

type Item = { kind: "session"; session: Session } | { kind: "slot"; slot: Slot };

export function dayItems(context: TeachContext, date: string): Item[] {
  const items: Item[] = [
    ...sessionsOn(context.teach, date).map((session) => ({ kind: "session" as const, session })),
    ...freeSlotsOn(context.teach, date).map((slot) => ({ kind: "slot" as const, slot })),
  ];
  return items.sort((a, b) => (a.kind === "session" ? a.session.start : a.slot.start) - (b.kind === "session" ? b.session.start : b.slot.start));
}

/** Colonne d'une journée : séances et créneaux libres de l'emploi du temps. */
export function DayColumn({
  date,
  context,
  onOpen,
  large = false,
  showHeader = true,
}: {
  date: string;
  context: TeachContext;
  onOpen: (id: string) => void;
  large?: boolean;
  showHeader?: boolean;
}) {
  const [over, setOver] = useState(false);
  const router = useRouter();
  const items = dayItems(context, date);
  const holiday = isHoliday(date, context.zone);
  const isToday = date === todayIso();

  function addFree() {
    const last = sessionsOn(context.teach, date).at(-1);
    const start = last ? last.start + last.duration : 510;
    const id = createSession({ date, start, level: context.level, subject: "francais" });
    onOpen(id);
  }

  function fromTemplate(templateId: string) {
    const template = context.teach.templates.find((t) => t.id === templateId);
    if (!template) return;
    const last = sessionsOn(context.teach, date).at(-1);
    const id = createSession({ ...stripDated(template), date, start: last ? last.start + last.duration : 510 });
    onOpen(id);
  }

  const otherDays = schoolDatesOfWeek(context.teach, mondayOf(date)).filter((d) => d !== date);
  const dayMenu = [
    {
      title: "Dupliquer la journée vers…",
      actions: [
        ...otherDays.map((d) => ({
          label: dayLabel(d),
          icon: "copy" as const,
          onSelect: () => {
            const before = teachStore.get();
            const n = duplicateDay(date, d);
            toast(n ? `${n} séance${n > 1 ? "s" : ""} copiée${n > 1 ? "s" : ""} ${dayLabel(d).toLowerCase()}` : "Journée vide : rien à copier", () => teachStore.set(before));
          },
        })),
        {
          label: `${dayLabel(date)} prochain`,
          icon: "copy" as const,
          onSelect: () => {
            const before = teachStore.get();
            const n = duplicateDay(date, addDays(date, 7));
            toast(`${n} séance${n > 1 ? "s" : ""} copiée${n > 1 ? "s" : ""}`, () => teachStore.set(before));
          },
        },
      ],
    },
    {
      actions: [
        { label: "Cahier journal du jour", icon: "printer" as const, onSelect: () => router.push(`/enseigner/cahier-journal?jour=${date}`) },
      ],
    },
  ];

  return (
    <section
      aria-label={`${dayLabel(date)} ${formatShortDate(date)}`}
      onDragOver={(event) => {
        if (event.dataTransfer.types.includes(DRAG_TYPE)) {
          event.preventDefault();
          setOver(true);
        }
      }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOver(false);
      }}
      onDrop={(event) => {
        const id = event.dataTransfer.getData(DRAG_TYPE);
        setOver(false);
        if (id) {
          const before = teachStore.get();
          moveSession(id, date);
          toast(`Déplacée ${dayLabel(date).toLowerCase()}`, () => teachStore.set(before));
        }
      }}
      className={`flex min-w-0 flex-col rounded-2xl border p-2 transition ${over ? "border-gold/60 bg-gold/[0.05]" : "border-line bg-panel/35"}`}
    >
      {showHeader ? (
        <header className="flex items-center justify-between gap-2 px-2 pb-2 pt-1">
          <h2 className="text-sm font-semibold text-foreground">
            {dayLabel(date)} <span className="font-normal text-muted">{formatShortDate(date)}</span>
            {isToday ? <span className="ml-2 rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-semibold text-gold">Aujourd&apos;hui</span> : null}
          </h2>
          <ActionMenu label={`Actions pour ${dayLabel(date)}`} sections={dayMenu} buttonClassName="size-8" />
        </header>
      ) : null}

      {holiday ? (
        <p className="px-3 py-6 text-center text-sm text-muted">Vacances</p>
      ) : (
        <ol className="grid gap-1.5">
          {items.map((item) =>
            item.kind === "session" ? (
              <li key={item.session.id}>
                <SessionCard session={item.session} context={context} onOpen={onOpen} large={large} />
              </li>
            ) : (
              <li key={item.slot.id}>
                <GhostSlot slot={item.slot} date={date} context={context} onOpen={onOpen} large={large} />
              </li>
            ),
          )}
        </ol>
      )}

      {!holiday ? (
        <div className="mt-1.5 flex items-center gap-1">
          <button type="button" onClick={addFree} className="flex min-h-10 flex-1 items-center gap-2 rounded-lg px-3 text-sm text-muted transition hover:bg-ink/5 hover:text-foreground">
            <Icon name="plus" className="h-4 w-4" />
            Ajouter
          </button>
          {context.teach.templates.length ? (
            <ActionMenu
              label="Ajouter depuis un modèle"
              trigger="bookmark"
              buttonClassName="size-9"
              sections={[{ title: "Mes modèles", actions: context.teach.templates.map((t) => ({ label: t.name, onSelect: () => fromTemplate(t.id) })) }]}
            />
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

export function SessionCard({
  session,
  context,
  onOpen,
  large = false,
}: {
  session: Session;
  context: TeachContext;
  onOpen: (id: string) => void;
  large?: boolean;
}) {
  const subject = getSubject(session.subject);
  const accent = accentStyles[subject.accent];
  const title = sessionTitle(session);
  const hasNotion = Boolean(session.notionLabel);

  return (
    <div
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData(DRAG_TYPE, session.id);
        event.dataTransfer.effectAllowed = "move";
      }}
      className={`group relative flex items-stretch rounded-xl border bg-panel-soft transition hover:border-ink/25 hover:shadow-[0_10px_24px_-18px_rgba(43,36,32,0.55)] ${
        session.done ? "border-line opacity-70" : "border-line"
      }`}
    >
      <span className={`my-2 ml-2 w-1 shrink-0 rounded-full ${accent.dot}`} aria-hidden="true" />
      <button
        type="button"
        onClick={() => onOpen(session.id)}
        className={`min-w-0 flex-1 px-3 text-left ${large ? "py-3" : "py-2.5"}`}
      >
        <span className="flex items-center gap-1.5 text-[13px] text-muted">
          <span className="tabular-nums">{formatTime(session.start)}</span>
          <span aria-hidden="true">·</span>
          <span className={`font-semibold ${accent.text}`}>{subject.short}</span>
          {session.done ? <Icon name="check" className="h-3.5 w-3.5 text-jade" /> : null}
          {session.done ? <span className="sr-only">(terminée)</span> : null}
        </span>
        <span className={`mt-0.5 block leading-snug text-foreground ${large ? "text-base" : "text-sm"} ${hasNotion ? "" : "text-muted"}`}>
          <span className="line-clamp-2">{hasNotion ? title : "Choisir la notion"}</span>
          <span className="text-muted"> · {session.duration} min</span>
          {session.resources.length ? (
            <span className="ml-1.5 inline-flex translate-y-0.5 items-center text-jade" title={`${session.resources.length} ressource(s)`}>
              <Icon name="book-open" className="h-3.5 w-3.5" />
              <span className="sr-only">{session.resources.length} ressource(s)</span>
            </span>
          ) : null}
        </span>
      </button>
      <div className="flex items-start gap-0.5 py-1 pr-1 opacity-100 transition md:absolute md:right-1 md:top-1 md:rounded-lg md:bg-panel-soft md:py-0 md:pr-0 md:opacity-0 md:shadow-sm md:group-hover:opacity-100 md:group-focus-within:opacity-100">
        <label className="hidden size-9 cursor-pointer place-items-center rounded-md hover:bg-ink/6 md:grid" title={session.done ? "Rouvrir" : "Terminer"}>
          <input type="checkbox" className="check" checked={session.done} onChange={() => toggleSessionDone(session.id, context.zone)} aria-label={`${session.done ? "Rouvrir" : "Terminer"} : ${title}`} />
        </label>
        <ActionMenu label={`Actions : ${title}`} sections={sessionMenuSections(session, context)} buttonClassName="size-9" />
      </div>
    </div>
  );
}

function GhostSlot({
  slot,
  date,
  context,
  onOpen,
  large,
}: {
  slot: Slot;
  date: string;
  context: TeachContext;
  onOpen: (id: string) => void;
  large: boolean;
}) {
  const subject = getSubject(slot.subject);
  const [over, setOver] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        const id = createSession({ date, start: slot.start, duration: slot.duration, level: context.level, subject: slot.subject });
        onOpen(id);
      }}
      onDragOver={(event) => {
        if (event.dataTransfer.types.includes(DRAG_TYPE)) {
          event.preventDefault();
          event.stopPropagation();
          setOver(true);
        }
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setOver(false);
        const id = event.dataTransfer.getData(DRAG_TYPE);
        if (id) {
          const before = teachStore.get();
          moveSession(id, date, slot.start);
          toast(`Déplacée à ${formatTime(slot.start)}`, () => teachStore.set(before));
        }
      }}
      aria-label={`Préparer ${subject.label} à ${formatTime(slot.start)}`}
      className={`group flex w-full items-center gap-2 rounded-xl border border-dashed px-3 text-left transition ${large ? "py-3" : "py-2.5"} ${
        over ? "border-gold bg-gold/10" : "border-ink/15 hover:border-ink/35 hover:bg-panel-soft"
      }`}
    >
      <span className="min-w-0 flex-1 text-[13px] text-muted">
        <span className="tabular-nums">{formatTime(slot.start)}</span> · {subject.short}
        <span className="block text-xs text-muted/80">{slot.duration} min</span>
      </span>
      <Icon name="plus" className="h-4 w-4 text-muted opacity-60 transition group-hover:opacity-100" />
    </button>
  );
}
