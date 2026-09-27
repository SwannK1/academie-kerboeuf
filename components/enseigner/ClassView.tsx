"use client";

import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { ActionMenu, Button, ChipGroup, SidePanel, ToggleChips, accentStyles, toast } from "@/components/workspace/ui";
import { PageTitle, WithTeach, type TeachContext } from "@/components/enseigner/EnseignerShell";
import { TEACH_LEVELS, getSubject, getTimetableSubjects, levelLabel } from "@/lib/workspace/curriculum";
import { updateProfile } from "@/lib/workspace/profile";
import { SCHOOL_YEAR_SOURCE, WEEKDAYS, formatTime, type Zone } from "@/lib/workspace/school-year";
import {
  addSlot,
  applyRecommendedTimetable,
  duplicateSlotToDays,
  removeSlot,
  setSchoolDays,
  teachStore,
  updateSlot,
  type Slot,
} from "@/lib/workspace/teach";

const SUBJECT_DRAG = "application/x-ak-matiere";
const SLOT_DRAG = "application/x-ak-creneau";

export function ClassView() {
  return (
    <WithTeach place={{ path: "/enseigner/classe", label: "Ma classe" }}>
      {(context) => <ClassSettings context={context} />}
    </WithTeach>
  );
}

function ClassSettings({ context }: { context: TeachContext }) {
  const [openSlot, setOpenSlot] = useState<string | null>(null);
  const [armed, setArmed] = useState<string | null>(null);
  const subjects = getTimetableSubjects(context.level);
  const days = WEEKDAYS.filter((d) => context.teach.schoolDays.includes(d.id));
  const totalMinutes = context.teach.slots.reduce((sum, s) => sum + (s.subject === "rituels" || s.subject === "apc" ? 0 : s.duration), 0);

  function addTo(day: number, subject: string) {
    const last = context.teach.slots.filter((s) => s.day === day).sort((a, b) => a.start - b.start).at(-1);
    let start = last ? last.start + last.duration : 510;
    if (start >= 720 && start < 810) start = 810;
    const id = addSlot({ day, start, duration: 45, subject });
    return id;
  }

  return (
    <>
      <PageTitle eyebrow="Réglages de base" title="Ma classe" />

      <section className="grid gap-6 rounded-2xl border border-line bg-panel-soft p-5 sm:grid-cols-3 sm:p-6">
        <ChipGroup
          label="Niveau"
          size="sm"
          options={TEACH_LEVELS}
          value={context.level}
          onChange={(level) => level && updateProfile({ level })}
        />
        <ToggleChips
          label="Jours de classe"
          options={WEEKDAYS.map((d) => ({ id: String(d.id), label: d.short }))}
          values={context.teach.schoolDays.map(String)}
          onChange={(values) => values.length && setSchoolDays(values.map(Number))}
        />
        <div>
          <ChipGroup<Zone>
            label="Zone de vacances"
            size="sm"
            options={[
              { id: "A", label: "A" },
              { id: "B", label: "B" },
              { id: "C", label: "C" },
            ]}
            value={context.profile.zone}
            onChange={(zone) => zone && updateProfile({ zone })}
          />
          <p className="mt-2 text-xs text-muted">
            Dates des périodes :{" "}
            <a href={SCHOOL_YEAR_SOURCE.href} target="_blank" rel="noopener noreferrer" className="underline decoration-ink/25">
              calendrier officiel
            </a>
          </p>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="edt-title">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="edt-title" className="font-serif text-2xl font-semibold">Semaine type</h2>
            <p className="mt-1 text-sm text-muted">
              Elle remplit chaque semaine automatiquement. {Math.round((totalMinutes / 60) * 10) / 10} h d&apos;enseignement placées.
            </p>
          </div>
          <Button
            onClick={() => {
              const before = teachStore.get();
              applyRecommendedTimetable(context.level);
              toast(`Semaine type ${levelLabel(context.level)} appliquée`, () => teachStore.set(before));
            }}
            icon="repeat"
          >
            Modèle recommandé {levelLabel(context.level)}
          </Button>
        </div>

        <div className="mt-4 rounded-2xl border border-line p-3">
          <p className="px-1 pb-2 text-xs text-muted">
            {armed
              ? `Touchez « + » sous un jour pour placer ${getSubject(armed).short}.`
              : "Palette : glissez une matière sur un jour, ou touchez-la puis « + »."}
          </p>
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject) => {
              const accent = accentStyles[subject.accent];
              const on = armed === subject.id;
              return (
                <button
                  key={subject.id}
                  type="button"
                  draggable
                  aria-pressed={on}
                  onDragStart={(event) => event.dataTransfer.setData(SUBJECT_DRAG, subject.id)}
                  onClick={() => setArmed(on ? null : subject.id)}
                  className={`chip chip-sm ${on ? "chip-on" : ""}`}
                >
                  <span className={`size-2 rounded-full ${accent.dot}`} aria-hidden="true" />
                  {subject.short}
                </button>
              );
            })}
          </div>
        </div>

        <div className={`mt-4 grid gap-3 sm:grid-cols-2 ${days.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
          {days.map((day) => (
            <DaySlots
              key={day.id}
              day={day.id}
              label={day.label}
              slots={context.teach.slots.filter((s) => s.day === day.id).sort((a, b) => a.start - b.start)}
              onOpen={setOpenSlot}
              onAdd={() => {
                const id = addTo(day.id, armed ?? subjects[0].id);
                if (!armed) setOpenSlot(id);
              }}
              onDropSubject={(subject) => addTo(day.id, subject)}
            />
          ))}
        </div>
      </section>

      <SlotPanel slotId={openSlot} context={context} onClose={() => setOpenSlot(null)} />
    </>
  );
}

function DaySlots({
  day,
  label,
  slots,
  onOpen,
  onAdd,
  onDropSubject,
}: {
  day: number;
  label: string;
  slots: Slot[];
  onOpen: (id: string) => void;
  onAdd: () => void;
  onDropSubject: (subject: string) => void;
}) {
  const [over, setOver] = useState(false);
  return (
    <section
      aria-label={label}
      onDragOver={(event) => {
        if (event.dataTransfer.types.includes(SUBJECT_DRAG) || event.dataTransfer.types.includes(SLOT_DRAG)) {
          event.preventDefault();
          setOver(true);
        }
      }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOver(false);
      }}
      onDrop={(event) => {
        setOver(false);
        const subject = event.dataTransfer.getData(SUBJECT_DRAG);
        const slotId = event.dataTransfer.getData(SLOT_DRAG);
        if (subject) onDropSubject(subject);
        if (slotId) updateSlot(slotId, { day });
      }}
      className={`rounded-2xl border p-2 transition ${over ? "border-gold/60 bg-gold/[0.05]" : "border-line bg-panel/35"}`}
    >
      <h3 className="px-2 pb-2 pt-1 text-sm font-semibold">{label}</h3>
      <ol className="grid gap-1.5">
        {slots.map((slot) => {
          const subject = getSubject(slot.subject);
          const accent = accentStyles[subject.accent];
          return (
            <li key={slot.id}>
              <button
                type="button"
                draggable
                onDragStart={(event) => event.dataTransfer.setData(SLOT_DRAG, slot.id)}
                onClick={() => onOpen(slot.id)}
                className="flex w-full items-center gap-2.5 rounded-xl border border-line bg-panel-soft px-3 py-2.5 text-left transition hover:border-ink/25"
              >
                <span className={`h-7 w-1 rounded-full ${accent.dot}`} aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] tabular-nums text-muted">
                    {formatTime(slot.start)} – {formatTime(slot.start + slot.duration)}
                  </span>
                  <span className="block text-sm font-medium">{subject.short}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <button type="button" onClick={onAdd} className="mt-1.5 flex min-h-10 w-full items-center gap-2 rounded-lg px-3 text-sm text-muted hover:bg-ink/5 hover:text-foreground">
        <Icon name="plus" className="h-4 w-4" />
        Créneau
      </button>
    </section>
  );
}

function SlotPanel({ slotId, context, onClose }: { slotId: string | null; context: TeachContext; onClose: () => void }) {
  const slot = context.teach.slots.find((s) => s.id === slotId);
  const subjects = getTimetableSubjects(context.level);
  const otherDays = WEEKDAYS.filter((d) => context.teach.schoolDays.includes(d.id) && d.id !== slot?.day);
  return (
    <SidePanel
      open={Boolean(slot)}
      onClose={onClose}
      title={slot ? `${getSubject(slot.subject).label}` : ""}
      subtitle={slot ? `${WEEKDAYS[slot.day - 1]?.label} · ${formatTime(slot.start)} – ${formatTime(slot.start + slot.duration)}` : undefined}
      footer={
        slot ? (
          <div className="flex items-center justify-between">
            <ActionMenu
              label="Plus d'actions"
              align="left"
              sections={[
                {
                  title: "Dupliquer vers",
                  actions: [
                    ...otherDays.map((d) => ({ label: d.label, icon: "copy" as const, onSelect: () => duplicateSlotToDays(slot.id, [d.id]) })),
                    { label: "Tous les jours", icon: "copy" as const, onSelect: () => duplicateSlotToDays(slot.id, otherDays.map((d) => d.id)) },
                  ],
                },
                {
                  actions: [
                    {
                      label: "Supprimer le créneau",
                      icon: "trash",
                      tone: "danger",
                      onSelect: () => {
                        const before = teachStore.get();
                        removeSlot(slot.id);
                        onClose();
                        toast("Créneau supprimé", () => teachStore.set(before));
                      },
                    },
                  ],
                },
              ]}
            />
            <Button variant="primary" onClick={onClose}>
              OK
            </Button>
          </div>
        ) : null
      }
    >
      {slot ? (
        <div className="grid gap-6">
          <ChipGroup
            label="Matière"
            size="sm"
            options={subjects.map((s) => ({ id: s.id, label: s.short }))}
            value={slot.subject}
            onChange={(subject) => subject && updateSlot(slot.id, { subject })}
          />
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Début</p>
            <div className="flex flex-wrap items-center gap-2">
              {[-15, -5].map((d) => (
                <button key={d} type="button" className="chip chip-sm" onClick={() => updateSlot(slot.id, { start: Math.max(420, slot.start + d) })}>
                  {d} min
                </button>
              ))}
              <span className="min-w-16 text-center text-lg font-semibold tabular-nums">{formatTime(slot.start)}</span>
              {[5, 15].map((d) => (
                <button key={d} type="button" className="chip chip-sm" onClick={() => updateSlot(slot.id, { start: Math.min(1080, slot.start + d) })}>
                  +{d} min
                </button>
              ))}
            </div>
          </div>
          <ChipGroup
            label="Durée"
            size="sm"
            options={Array.from(new Set([15, 20, 30, 45, 60, 90, 120, slot.duration])).sort((a, b) => a - b).map((d) => ({ id: d, label: `${d} min` }))}
            value={slot.duration}
            onChange={(duration) => duration && updateSlot(slot.id, { duration })}
          />
          <ChipGroup
            label="Jour"
            size="sm"
            options={WEEKDAYS.filter((d) => context.teach.schoolDays.includes(d.id)).map((d) => ({ id: d.id, label: d.label }))}
            value={slot.day}
            onChange={(day) => day && updateSlot(slot.id, { day })}
          />
        </div>
      ) : null}
    </SidePanel>
  );
}
