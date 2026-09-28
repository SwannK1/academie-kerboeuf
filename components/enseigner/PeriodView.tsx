"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ActionMenu, Button, ChipGroup, Hint, toast } from "@/components/workspace/ui";
import { PageTitle, WithTeach, type TeachContext } from "@/components/enseigner/EnseignerShell";
import { STATE_TONE, progressMenu } from "@/components/enseigner/YearView";
import { findNotion, getCurriculum, levelLabel } from "@/lib/workspace/curriculum";
import { dayLabel, formatShortDate, getPeriodFor, getPeriods, todayIso } from "@/lib/workspace/school-year";
import { PROGRESS_STATES, proposeDistribution, scheduleNotion, setProgress, teachStore, type Progress, type ProgressState } from "@/lib/workspace/teach";

export function PeriodView() {
  return (
    <WithTeach place={{ path: "/enseigner/periode", label: "Ma période" }}>
      {(context) => <Period context={context} />}
    </WithTeach>
  );
}

const NOTION_DRAG = "application/x-ak-notion";

const COLUMNS: { id: string; label: string; symbol: string; states: ProgressState[] }[] = [
  { id: "a-faire", label: "À faire", symbol: "○", states: ["prevue", "reportee"] },
  { id: "en-cours", label: "En cours", symbol: "◐", states: ["commencee", "a-reprendre"] },
  { id: "travaille", label: "Travaillé", symbol: "●", states: ["travaillee"] },
];

const SYMBOL: Record<ProgressState, string> = { prevue: "○", reportee: "○", commencee: "◐", "a-reprendre": "◐", travaillee: "●" };
const NEXT_STATE: Record<ProgressState, ProgressState> = {
  prevue: "commencee",
  reportee: "commencee",
  commencee: "travaillee",
  "a-reprendre": "travaillee",
  travaillee: "prevue",
};

function Period({ context }: { context: TeachContext }) {
  const router = useRouter();
  const [over, setOver] = useState<string | null>(null);
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
          <Hint
            action={
              <>
                <Button
                  variant="primary"
                  icon="repeat"
                  onClick={() => {
                    const before = teachStore.get();
                    const n = proposeDistribution(context.level);
                    toast(`${n} notions réparties sur l'année`, () => teachStore.set(before));
                  }}
                >
                  Répartir l&apos;année
                </Button>
                <Button href="/enseigner/annee" variant="quiet">
                  À la main
                </Button>
              </>
            }
          >
            Aucune notion en P{period.id}.
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

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {COLUMNS.map((column) => {
          const items = planned.flatMap(({ subject, notions }) =>
            notions.filter((n) => column.states.includes(progress[n.id]?.state ?? "prevue")).map((n) => ({ ...n, subjectShort: subject.short })),
          );
          return (
            <section
              key={column.id}
              aria-label={column.label}
              onDragOver={(event) => {
                if (event.dataTransfer.types.includes(NOTION_DRAG)) {
                  event.preventDefault();
                  setOver(column.id);
                }
              }}
              onDragLeave={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node)) setOver(null);
              }}
              onDrop={(event) => {
                const id = event.dataTransfer.getData(NOTION_DRAG);
                setOver(null);
                if (id) setProgress(id, { state: column.states[0] });
              }}
              className={`flex min-h-32 flex-col rounded-2xl border p-2 transition ${over === column.id ? "border-gold/60 bg-gold/[0.05]" : "border-line bg-panel/35"}`}
            >
              <h2 className="flex items-center justify-between px-2 pb-2 pt-1 text-sm font-semibold">
                <span>
                  <span aria-hidden="true" className="mr-1.5">{column.symbol}</span>
                  {column.label}
                </span>
                <span className="text-xs font-normal text-muted">{items.length}</span>
              </h2>
              <ul className="grid gap-1.5">
                {items.map((notion) => {
                  const p = progress[notion.id];
                  const stateId = p?.state ?? "prevue";
                  const count = countByNotion.get(notion.id) ?? 0;
                  return (
                    <li
                      key={notion.id}
                      draggable
                      onDragStart={(event) => event.dataTransfer.setData(NOTION_DRAG, notion.id)}
                      className="group flex items-start gap-2 rounded-xl border border-line bg-panel-soft py-2 pl-2 pr-1"
                    >
                      <button
                        type="button"
                        onClick={() => setProgress(notion.id, { state: NEXT_STATE[stateId] })}
                        aria-label={`${notion.label} : ${PROGRESS_STATES.find((s) => s.id === stateId)?.label}. Passer à ${PROGRESS_STATES.find((s) => s.id === NEXT_STATE[stateId])?.label}`}
                        className={`grid size-9 shrink-0 place-items-center rounded-full text-lg leading-none hover:bg-ink/6 ${STATE_TONE[stateId]}`}
                      >
                        {SYMBOL[stateId]}
                      </button>
                      <div className="min-w-0 flex-1 py-1">
                        <p className="text-[13px] leading-snug">{notion.label}</p>
                        <p className="mt-0.5 text-[11px] text-muted">
                          {notion.subjectShort}
                          {count ? ` · ${count} séance${count > 1 ? "s" : ""}` : ""}
                        </p>
                      </div>
                      <ActionMenu
                        label={`Actions : ${notion.label}`}
                        buttonClassName="size-9"
                        sections={[
                          {
                            actions: [
                              {
                                label: "Programmer une séance",
                                icon: "calendar",
                                onSelect: () => {
                                  const date = scheduleNotion(notion, context.level, context.zone, todayIso());
                                  toast(date ? `Séance programmée ${dayLabel(date).toLowerCase()} ${formatShortDate(date)}` : "Aucun créneau libre de cette matière dans les deux semaines");
                                },
                              },
                              { label: "Voir les ressources", icon: "book-open", onSelect: () => router.push(`/ressources?niveau=${context.level}&notion=${notion.id}`) },
                            ],
                          },
                          ...progressMenu(notion.id, p).slice(-1),
                        ]}
                      />
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <p className="mt-8 text-sm text-muted">
        Autres outils :{" "}
        <Link href="/enseignants/calendrier" className="underline decoration-ink/25">calendrier</Link>,{" "}
        <Link href="/enseignants/ateliers" className="underline decoration-ink/25">ateliers</Link>,{" "}
        <Link href="/enseignants/apc" className="underline decoration-ink/25">APC</Link>.
      </p>
    </>
  );
}
