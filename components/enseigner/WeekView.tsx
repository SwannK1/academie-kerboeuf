"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { ActionMenu, Button, Hint, IconButton, toast } from "@/components/workspace/ui";
import { PageTitle, WithTeach, type TeachContext } from "@/components/enseigner/EnseignerShell";
import { DayColumn } from "@/components/enseigner/DayPlan";
import { SessionPanel } from "@/components/enseigner/SessionPanel";
import { getSubject, levelLabel } from "@/lib/workspace/curriculum";
import { addDays, formatShortDate, formatTime, getPeriodFor, mondayOf, todayIso, WEEKDAYS, weekday } from "@/lib/workspace/school-year";
import {
  addSlot,
  applyRecommendedTimetable,
  detectHabits,
  dismiss,
  duplicateWeek,
  schoolDatesOfWeek,
  teachStore,
} from "@/lib/workspace/teach";

export function currentMonday(): string {
  const today = todayIso();
  return weekday(today) >= 6 ? addDays(mondayOf(today), 7) : mondayOf(today);
}

export function WeekView() {
  return (
    <WithTeach place={{ path: "/enseigner/semaine", label: "Ma semaine" }}>
      {(context) => <Week context={context} />}
    </WithTeach>
  );
}

function Week({ context }: { context: TeachContext }) {
  const [monday, setMonday] = useState(currentMonday);
  const [openId, setOpenId] = useState<string | null>(null);
  const router = useRouter();
  const dates = schoolDatesOfWeek(context.teach, monday);
  const period = getPeriodFor(monday, context.zone);
  const habits = detectHabits(context.teach).slice(0, 1);
  const weekSessions = context.teach.sessions.filter((s) => s.date >= monday && s.date < addDays(monday, 7));
  const done = weekSessions.filter((s) => s.done).length;

  return (
    <>
      <PageTitle
        eyebrow={`${levelLabel(context.level)} · Période ${period.id}`}
        title={`Semaine du ${formatShortDate(monday)}`}
        actions={
          <>
            <div className="flex items-center">
              <IconButton icon="chevron-left" label="Semaine précédente" tone="quiet" onClick={() => setMonday(addDays(monday, -7))} />
              {monday !== currentMonday() ? (
                <button type="button" className="btn btn-quiet" onClick={() => setMonday(currentMonday())}>
                  Cette semaine
                </button>
              ) : null}
              <IconButton icon="chevron-right" label="Semaine suivante" tone="quiet" onClick={() => setMonday(addDays(monday, 7))} />
            </div>
            <Button href={`/enseigner/cahier-journal?semaine=${monday}`} icon="printer">
              Cahier journal
            </Button>
            <ActionMenu
              label="Actions de la semaine"
              sections={[
                {
                  actions: [
                    {
                      label: "Dupliquer vers la semaine suivante",
                      icon: "copy",
                      onSelect: () => {
                        const before = teachStore.get();
                        const n = duplicateWeek(monday);
                        toast(n ? `${n} séances copiées sur la semaine suivante` : "Semaine vide : rien à copier", () => teachStore.set(before));
                      },
                    },
                    { label: "Modifier l'emploi du temps", icon: "clock", onSelect: () => router.push("/enseigner/classe") },
                  ],
                },
              ]}
            />
          </>
        }
      />

      {!context.teach.timetableReady && !context.teach.slots.length ? (
        <div className="mb-5">
          <Hint
            action={
              <>
                <Button variant="primary" onClick={() => applyRecommendedTimetable(context.level)}>
                  Utiliser la semaine type {levelLabel(context.level)}
                </Button>
                <Link href="/enseigner/classe" className="btn btn-quiet">
                  La construire
                </Link>
              </>
            }
          >
            Votre emploi du temps remplit automatiquement la semaine. Partez d&apos;un modèle, vous l&apos;ajusterez ensuite.
          </Hint>
        </div>
      ) : null}

      {habits.map((habit) => (
        <div key={habit.id} className="mb-5">
          <Hint
            onDismiss={() => dismiss(habit.id)}
            action={
              <Button
                onClick={() => {
                  addSlot({ day: habit.day, start: habit.start, duration: habit.duration, subject: habit.subject });
                  toast("Créneau ajouté à la semaine type");
                }}
              >
                Ajouter
              </Button>
            }
          >
            Vous placez souvent {getSubject(habit.subject).short} le {WEEKDAYS[habit.day - 1]?.label.toLowerCase()} à {formatTime(habit.start)}. L&apos;ajouter à
            votre semaine type&nbsp;?
          </Hint>
        </div>
      ))}

      <div className={`grid gap-3 md:grid-cols-2 ${dates.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
        {dates.map((date) => (
          <DayColumn key={date} date={date} context={context} onOpen={setOpenId} />
        ))}
      </div>

      {weekSessions.length ? (
        <p className="mt-4 flex items-center gap-2 text-sm text-muted">
          <Icon name="check-circle" className="h-4 w-4 text-jade" />
          {done} / {weekSessions.length} séances terminées cette semaine
        </p>
      ) : null}

      <p className="mt-6 hidden text-xs text-muted md:block">
        Astuce : glissez une séance vers un autre jour ou sur un créneau libre. Le menu <span aria-hidden="true">···</span> fait la même chose au clavier.
      </p>

      <SessionPanel sessionId={openId} context={context} onClose={() => setOpenId(null)} />
    </>
  );
}
