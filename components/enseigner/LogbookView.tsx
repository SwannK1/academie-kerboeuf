"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button, ChipGroup, IconButton } from "@/components/workspace/ui";
import { PageTitle, WithTeach, type TeachContext } from "@/components/enseigner/EnseignerShell";
import { SessionPanel } from "@/components/enseigner/SessionPanel";
import { currentMonday } from "@/components/enseigner/WeekView";
import { getResource, FILE_TYPE_LABELS } from "@/lib/resources/library";
import { findDomain, getSubject, levelLabel } from "@/lib/workspace/curriculum";
import { addDays, formatLongDate, formatShortDate, formatTime, fromIso, isHoliday, mondayOf } from "@/lib/workspace/school-year";
import { ORGANISATIONS, SESSION_KINDS, schoolDatesOfWeek, sessionTitle, sessionsOn } from "@/lib/workspace/teach";

/**
 * Le cahier journal n'est pas saisi : il est la mise en page imprimable de
 * la semaine préparée. Cliquer une ligne ouvre la séance pour l'ajuster.
 */
export function LogbookView() {
  return (
    <WithTeach place={{ path: "/enseigner/cahier-journal", label: "Cahier journal" }}>
      {(context) => <Logbook context={context} />}
    </WithTeach>
  );
}

function Logbook({ context }: { context: TeachContext }) {
  const params = useSearchParams();
  const router = useRouter();
  const day = params.get("jour");
  const week = params.get("semaine") ?? (day ? mondayOf(day) : currentMonday());
  const mode: "jour" | "semaine" = day ? "jour" : "semaine";
  const [openId, setOpenId] = useState<string | null>(null);
  const [withNotes, setWithNotes] = useState(true);

  const dates = (mode === "jour" && day ? [day] : schoolDatesOfWeek(context.teach, week)).filter((d) => !isHoliday(d, context.zone));

  function go(query: string) {
    router.replace(`/enseigner/cahier-journal?${query}`, { scroll: false });
  }

  return (
    <>
      <div className="no-print">
        <PageTitle
          eyebrow={`${levelLabel(context.level)} · construit depuis votre semaine`}
          title="Cahier journal"
          actions={
            <Button variant="primary" icon="printer" onClick={() => window.print()}>
              Imprimer
            </Button>
          }
        />
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <ChipGroup<"jour" | "semaine">
            label="Affichage"
            hideLabel
            size="sm"
            options={[
              { id: "jour", label: "Une journée" },
              { id: "semaine", label: "La semaine" },
            ]}
            value={mode}
            onChange={(v) => (v === "jour" ? go(`jour=${dates[0] ?? week}`) : go(`semaine=${week}`))}
          />
          <div className="flex items-center">
            <IconButton
              icon="chevron-left"
              tone="quiet"
              label={mode === "jour" ? "Jour précédent" : "Semaine précédente"}
              onClick={() => (mode === "jour" && day ? go(`jour=${addDays(day, -1)}`) : go(`semaine=${addDays(week, -7)}`))}
            />
            <span className="min-w-40 text-center text-sm font-medium">
              {mode === "jour" && day ? formatLongDate(day) : `Semaine du ${formatShortDate(week)}`}
            </span>
            <IconButton
              icon="chevron-right"
              tone="quiet"
              label={mode === "jour" ? "Jour suivant" : "Semaine suivante"}
              onClick={() => (mode === "jour" && day ? go(`jour=${addDays(day, 1)}`) : go(`semaine=${addDays(week, 7)}`))}
            />
          </div>
          <label className="flex min-h-10 items-center gap-2 text-sm text-muted">
            <input type="checkbox" className="check" checked={withNotes} onChange={() => setWithNotes((v) => !v)} />
            Précisions personnelles
          </label>
        </div>
      </div>

      <div className="grid gap-8">
        {dates.map((date, index) => (
          <LogbookSheet key={date} date={date} context={context} onOpen={setOpenId} withNotes={withNotes} breakBefore={index > 0} />
        ))}
        {!dates.length ? <p className="text-muted">Pas de classe sur cette période.</p> : null}
      </div>

      <SessionPanel sessionId={openId} context={context} onClose={() => setOpenId(null)} />
    </>
  );
}

function LogbookSheet({
  date,
  context,
  onOpen,
  withNotes,
  breakBefore,
}: {
  date: string;
  context: TeachContext;
  onOpen: (id: string) => void;
  withNotes: boolean;
  breakBefore: boolean;
}) {
  const sessions = sessionsOn(context.teach, date);
  return (
    <article className={`print-sheet rounded-2xl border border-line bg-white p-6 shadow-[0_20px_50px_-40px_rgba(43,36,32,0.6)] sm:p-8 ${breakBefore ? "print-break-before" : ""}`}>
      <header className="flex items-baseline justify-between border-b-2 border-foreground pb-2">
        <h2 className="font-serif text-2xl font-semibold">{formatLongDate(date)} {fromIso(date).getFullYear()}</h2>
        <p className="text-sm text-muted">Cahier journal · {levelLabel(context.level)}</p>
      </header>

      {sessions.length ? (
        <table className="mt-4 w-full border-collapse text-left text-[13px] leading-snug">
          <thead>
            <tr className="border-b border-ink/30 text-[11px] uppercase tracking-[0.08em] text-muted">
              <th scope="col" className="w-[4.5rem] py-2 pr-2 font-semibold">Horaire</th>
              <th scope="col" className="w-[7.5rem] py-2 pr-2 font-semibold">Domaine</th>
              <th scope="col" className="py-2 pr-2 font-semibold">Séance</th>
              <th scope="col" className="hidden w-[9rem] py-2 pr-2 font-semibold sm:table-cell print:table-cell">Supports</th>
              <th scope="col" className="hidden w-[8rem] py-2 font-semibold sm:table-cell print:table-cell">Bilan</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => {
              const subject = getSubject(session.subject);
              const domain = session.domainId ? findDomain(session.level, session.subject, session.domainId) : null;
              const kind = SESSION_KINDS.find((k) => k.id === session.kind)?.label;
              const org = ORGANISATIONS.find((o) => o.id === session.organisation)?.label;
              return (
                <tr key={session.id} className="print-avoid-break border-b border-ink/12 align-top">
                  <td className="py-2.5 pr-2 tabular-nums">
                    {formatTime(session.start)}
                    <span className="block text-[11px] text-muted">{session.duration} min</span>
                  </td>
                  <td className="py-2.5 pr-2">
                    <span className="font-semibold">{subject.short}</span>
                    {domain ? <span className="block text-[11px] text-muted">{domain.label}</span> : null}
                  </td>
                  <td className="py-2.5 pr-2">
                    <button type="button" onClick={() => onOpen(session.id)} className="text-left hover:underline print:no-underline">
                      {session.notionLabel ? sessionTitle(session) : <span className="text-muted">À préciser</span>}
                    </button>
                    {kind || org ? <span className="block text-[11px] text-muted">{[kind, org].filter(Boolean).join(" · ")}</span> : null}
                    {withNotes && session.note ? <span className="mt-1 block whitespace-pre-line text-[12px] italic text-muted">{session.note}</span> : null}
                  </td>
                  <td className="hidden py-2.5 pr-2 text-[12px] sm:table-cell print:table-cell">
                    {session.resources
                      .map(getResource)
                      .filter(Boolean)
                      .map((unit) => (
                        <span key={unit!.id} className="block">
                          {unit!.title}
                          <span className="text-muted"> ({unit!.files.map((f) => FILE_TYPE_LABELS[f.type].toLowerCase()).join(", ")})</span>
                        </span>
                      ))}
                  </td>
                  <td className="hidden py-2.5 sm:table-cell print:table-cell">
                    <span className="block h-4 border-b border-dotted border-ink/30" />
                    <span className="mt-3 block h-4 border-b border-dotted border-ink/30" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="mt-6 text-sm text-muted">Aucune séance préparée ce jour-là.</p>
      )}
    </article>
  );
}
