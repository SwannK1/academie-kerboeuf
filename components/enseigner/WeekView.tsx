"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { ActionMenu, Button, Hint, IconButton, toast, SidePanel, useMediaQuery } from "@/components/workspace/ui";
import { PageTitle, WithTeach, type TeachContext } from "@/components/enseigner/EnseignerShell";
import { DayColumn } from "@/components/enseigner/DayPlan";
import { ResourceTray } from "@/components/enseigner/ResourceTray";
import { ResourcePanel } from "@/components/ressources/ResourcePanel";
import { getResource } from "@/lib/resources/library";
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
  const [trayOpen, setTrayOpen] = useState(false);
  const [openResource, setOpenResource] = useState<string | null>(null);
  const wide = useMediaQuery("(min-width: 1280px)");
  const dates = schoolDatesOfWeek(context.teach, monday);
  const period = getPeriodFor(monday, context.zone);
  const habits = detectHabits(context.teach).slice(0, 1);
  const weekSessions = context.teach.sessions.filter((s) => s.date >= monday && s.date < addDays(monday, 7));
  const done = weekSessions.filter((s) => s.done).length;
  const previousWeekCount = context.teach.sessions.filter((s) => s.date >= addDays(monday, -7) && s.date < monday).length;

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
            <button type="button" aria-pressed={trayOpen} onClick={() => setTrayOpen((v) => !v)} className={`btn ${trayOpen ? "btn-primary" : "btn-secondary"}`}>
              <Icon name="books" className="h-4 w-4" />
              Ressources
            </button>
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
            Partir d&apos;une semaine type&nbsp;?
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

      {!weekSessions.length && previousWeekCount ? (
        <div className="mb-4">
          <Hint
            action={
              <Button
                variant="primary"
                icon="repeat"
                onClick={() => {
                  const before = teachStore.get();
                  const n = duplicateWeek(addDays(monday, -7));
                  toast(`${n} séances reprises`, () => teachStore.set(before));
                }}
              >
                Reprendre la semaine
              </Button>
            }
          >
            Même structure que la semaine dernière&nbsp;?
          </Hint>
        </div>
      ) : null}

      <div className={trayOpen && wide ? "grid gap-4 xl:grid-cols-[minmax(0,1fr)_17rem]" : ""}>
        <div className={`grid gap-3 md:grid-cols-2 ${dates.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
          {dates.map((date) => (
            <DayColumn key={date} date={date} context={context} onOpen={setOpenId} />
          ))}
        </div>
        {trayOpen && wide ? <ResourceTray level={context.level} onOpen={setOpenResource} /> : null}
      </div>

      {weekSessions.length ? (
        <p className="mt-4 flex items-center gap-2 text-sm text-muted">
          <Icon name="check-circle" className="h-4 w-4 text-jade" />
          {done} / {weekSessions.length} terminées
        </p>
      ) : null}


      <SessionPanel sessionId={openId} context={context} onClose={() => setOpenId(null)} />
      {/* Écran étroit : le bac s'ouvre en panneau ; toucher une fiche ouvre « Ajouter à… ». */}
      <SidePanel open={trayOpen && !wide} title="Ressources" onClose={() => setTrayOpen(false)}>
        <ResourceTray
          level={context.level}
          compact
          onOpen={(id) => {
            setTrayOpen(false);
            setOpenResource(id);
          }}
        />
      </SidePanel>
      <ResourcePanel unit={openResource ? getResource(openResource) : undefined} targetSessionId={null} onClose={() => setOpenResource(null)} onNavigate={setOpenResource} />
    </>
  );
}
