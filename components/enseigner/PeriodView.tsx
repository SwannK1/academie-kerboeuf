"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { ActionMenu, Button, ChipGroup, Hint } from "@/components/workspace/ui";
import { PageTitle, WithTeach, type TeachContext } from "@/components/enseigner/EnseignerShell";
import { STATE_TONE, progressMenu } from "@/components/enseigner/YearView";
import { findNotion, getCurriculum, levelLabel } from "@/lib/workspace/curriculum";
import { formatShortDate, getPeriodFor, getPeriods, todayIso } from "@/lib/workspace/school-year";
import { PROGRESS_STATES, setProgress, type Progress } from "@/lib/workspace/teach";

export function PeriodView() {
  return (
    <WithTeach place={{ path: "/enseigner/periode", label: "Ma période" }}>
      {(context) => <Period context={context} />}
    </WithTeach>
  );
}

function Period({ context }: { context: TeachContext }) {
  const periods = getPeriods(context.zone);
  const current = getPeriodFor(todayIso(), context.zone);
  const [periodId, setPeriodId] = useState<Progress["period"]>(current.id);
  const period = periods.find((p) => p.id === periodId) ?? current;
  const { progress, sessions } = context.teach;

  const inPeriod = sessions.filter((s) => s.date >= period.start && s.date <= period.end && s.notionId);
  const countByNotion = new Map<string, number>();
  for (const s of inPeriod) countByNotion.set(s.notionId as string, (countByNotion.get(s.notionId as string) ?? 0) + 1);

  const tree = getCurriculum(context.level);
  const planned = tree
    .map((subject) => ({
      subject,
      notions: subject.domains.flatMap((d) => d.notions).filter((n) => progress[n.id]?.period === period.id),
    }))
    .filter((group) => group.notions.length);

  const unplannedWorked = Array.from(countByNotion.keys())
    .filter((id) => progress[id]?.period !== period.id)
    .map((id) => findNotion(context.level, id))
    .filter((n): n is NonNullable<typeof n> => Boolean(n));

  const total = planned.reduce((sum, g) => sum + g.notions.length, 0);
  const worked = planned.reduce((sum, g) => sum + g.notions.filter((n) => progress[n.id]?.state === "travaillee").length, 0);

  return (
    <>
      <PageTitle
        eyebrow={`${levelLabel(context.level)} · du ${formatShortDate(period.start)} au ${formatShortDate(period.end)}${context.profile.zone ? "" : " (zone A par défaut)"}`}
        title={`Période ${period.id}`}
        actions={
          <>
            <Button href="/enseignants/fin-periode" icon="check-circle">
              Fin de période
            </Button>
            <Button href="/enseignants/evaluations" icon="clipboard">
              Évaluations
            </Button>
          </>
        }
      />

      <ChipGroup
        label="Période"
        hideLabel
        size="sm"
        options={periods.map((p) => ({ id: p.id, label: p.id === current.id ? `P${p.id} · en cours` : `P${p.id}` }))}
        value={period.id}
        onChange={(id) => id && setPeriodId(id)}
      />

      {total ? (
        <div className="mt-5 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink/8" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={worked} aria-label="Notions travaillées">
            <div className="h-full rounded-full bg-jade" style={{ width: `${(worked / total) * 100}%` }} />
          </div>
          <span className="text-sm text-muted">
            {worked} / {total} travaillées
          </span>
        </div>
      ) : (
        <div className="mt-6">
          <Hint action={<Button href="/enseigner/annee">Placer des notions</Button>}>
            Aucune notion placée en P{period.id}. Répartissez votre année en quelques glissers dans Mon année.
          </Hint>
        </div>
      )}

      {unplannedWorked.length ? (
        <div className="mt-5">
          <Hint
            action={
              <Button onClick={() => unplannedWorked.forEach((n) => setProgress(n.id, { period: period.id, state: "commencee" }))}>
                Les ajouter à P{period.id}
              </Button>
            }
          >
            {unplannedWorked.length} notion{unplannedWorked.length > 1 ? "s" : ""} travaillée{unplannedWorked.length > 1 ? "s" : ""} en séance sans être
            prévue{unplannedWorked.length > 1 ? "s" : ""} dans cette période.
          </Hint>
        </div>
      ) : null}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {planned.map(({ subject, notions }) => (
          <section key={subject.id} className="rounded-2xl border border-line p-4">
            <h2 className="px-1 font-serif text-xl font-semibold">{subject.label}</h2>
            <ul className="mt-2 divide-y divide-line">
              {notions.map((notion) => {
                const p = progress[notion.id];
                const count = countByNotion.get(notion.id) ?? 0;
                const state = PROGRESS_STATES.find((s) => s.id === (p?.state ?? "prevue"));
                return (
                  <li key={notion.id} className="group flex items-center gap-3 px-1 py-2.5">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-snug">{notion.label}</p>
                      <p className="mt-0.5 text-xs text-muted">
                        {count ? `${count} séance${count > 1 ? "s" : ""}` : "Pas encore de séance"}
                      </p>
                    </div>
                    <ActionMenu
                      label={`État : ${state?.label}`}
                      sections={progressMenu(notion.id, p)}
                      triggerContent={
                        <span className={`inline-flex min-h-9 items-center gap-1 rounded-full border border-line px-3 text-xs font-semibold ${STATE_TONE[p?.state ?? "prevue"]}`}>
                          {state?.label}
                          <Icon name="chevron-right" className="h-3 w-3 rotate-90" />
                        </span>
                      }
                    />
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted">
        Terminer une séance fait passer sa notion à « Commencée ». Autres outils de période :{" "}
        <Link href="/enseignants/calendrier" className="underline decoration-ink/25">calendrier</Link>,{" "}
        <Link href="/enseignants/ateliers" className="underline decoration-ink/25">ateliers</Link>,{" "}
        <Link href="/enseignants/apc" className="underline decoration-ink/25">APC</Link>.
      </p>
    </>
  );
}
