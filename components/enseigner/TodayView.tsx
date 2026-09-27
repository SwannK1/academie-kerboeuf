"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { Button, Hint } from "@/components/workspace/ui";
import { PageTitle, WithTeach, type TeachContext } from "@/components/enseigner/EnseignerShell";
import { DayColumn } from "@/components/enseigner/DayPlan";
import { SessionPanel } from "@/components/enseigner/SessionPanel";
import { findNotion, levelLabel } from "@/lib/workspace/curriculum";
import { getResource } from "@/lib/resources/library";
import { formatLongDate, getPeriodFor, isHoliday, todayIso, weekday } from "@/lib/workspace/school-year";
import { applyRecommendedTimetable, nextSchoolDay, sessionsOn } from "@/lib/workspace/teach";

export function TodayView() {
  return (
    <WithTeach place={{ path: "/enseigner", label: "Ma journée" }}>
      {(context) => <Today context={context} />}
    </WithTeach>
  );
}

function Today({ context }: { context: TeachContext }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const today = todayIso();
  const isClassDay = context.teach.schoolDays.includes(weekday(today)) && !isHoliday(today, context.zone);
  const day = isClassDay ? today : nextSchoolDay(context.teach, today, context.zone);
  const next = nextSchoolDay(context.teach, day, context.zone);
  const period = getPeriodFor(day, context.zone);
  const sessions = sessionsOn(context.teach, day);
  const prepared = sessions.filter((s) => s.notionId).length;

  const waiting = Object.entries(context.teach.progress)
    .filter(([, p]) => p.period === period.id && p.state === "prevue")
    .map(([id]) => findNotion(context.level, id))
    .filter((n): n is NonNullable<typeof n> => Boolean(n));

  const recentResources = Array.from(
    new Set(
      context.teach.sessions
        .filter((s) => s.date < day)
        .sort((a, b) => b.date.localeCompare(a.date))
        .flatMap((s) => s.resources),
    ),
  )
    .slice(0, 3)
    .map(getResource)
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <>
      <PageTitle
        eyebrow={`${levelLabel(context.level)} · Période ${period.id}${isClassDay ? "" : " · prochaine journée de classe"}`}
        title={formatLongDate(day)}
        actions={
          <>
            <Button href="/enseigner/semaine" icon="calendar">
              Ma semaine
            </Button>
            <Button href={`/enseigner/cahier-journal?jour=${day}`} icon="printer">
              Imprimer
            </Button>
          </>
        }
      />

      {!context.teach.timetableReady && !context.teach.slots.length ? (
        <div className="mb-5">
          <Hint
            action={
              <Button variant="primary" onClick={() => applyRecommendedTimetable(context.level)}>
                Utiliser la semaine type {levelLabel(context.level)}
              </Button>
            }
          >
            Pour préparer en quelques clics, commencez par une semaine type. Vous la modifierez dans Ma classe.
          </Hint>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          {sessions.length ? (
            <p className="mb-3 text-sm text-muted">
              {prepared} / {sessions.length} séance{sessions.length > 1 ? "s" : ""} avec une notion choisie
            </p>
          ) : null}
          <DayColumn date={day} context={context} onOpen={setOpenId} large showHeader={false} />
        </div>

        <aside className="grid content-start gap-5">
          <div className="rounded-2xl border border-line p-4">
            <h2 className="text-sm font-semibold text-foreground">Ensuite · {formatLongDate(next)}</h2>
            <ul className="mt-2 grid gap-1 text-sm text-muted">
              {sessionsOn(context.teach, next).slice(0, 6).map((s) => (
                <li key={s.id} className="truncate">
                  {s.notionLabel ?? "Séance à préciser"}
                </li>
              ))}
              {!sessionsOn(context.teach, next).length ? <li>Rien de préparé pour l&apos;instant.</li> : null}
            </ul>
            <Link href="/enseigner/semaine" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-gold hover:underline">
              Préparer la semaine <Icon name="arrow-right" className="h-4 w-4" />
            </Link>
          </div>

          {waiting.length ? (
            <div className="rounded-2xl border border-line p-4">
              <h2 className="text-sm font-semibold text-foreground">Prévu en P{period.id}, pas encore travaillé</h2>
              <ul className="mt-2 grid gap-1 text-sm text-muted">
                {waiting.slice(0, 4).map((n) => (
                  <li key={n.id} className="line-clamp-2">
                    {n.label}
                  </li>
                ))}
              </ul>
              <Link href="/enseigner/periode" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-gold hover:underline">
                Voir la période <Icon name="arrow-right" className="h-4 w-4" />
              </Link>
            </div>
          ) : null}

          {recentResources.length ? (
            <div className="rounded-2xl border border-line p-4">
              <h2 className="text-sm font-semibold text-foreground">Utilisé récemment</h2>
              <ul className="mt-2 grid gap-1.5 text-sm">
                {recentResources.map((r) => (
                  <li key={r.id}>
                    <a href={r.files[0]?.href} target="_blank" rel="noopener noreferrer" className="line-clamp-2 text-foreground underline decoration-ink/20 hover:decoration-gold">
                      {r.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>

      <SessionPanel sessionId={openId} context={context} onClose={() => setOpenId(null)} />
    </>
  );
}
