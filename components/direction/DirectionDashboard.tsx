"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { ActionMenu, CheckRow, toast } from "@/components/workspace/ui";
import { PageTitle } from "@/components/enseigner/EnseignerShell";
import { WithDirection, type DirectionContext } from "@/components/direction/DirectionShell";
import { MEETING_KINDS, MILESTONES_2026_2027, PROCEDURES, getMeetingKind } from "@/content/direction/catalog";
import { addTask, directionStore, removeTask, toggleMilestone, updateTask } from "@/lib/workspace/direction";
import { addDays, formatShortDate, getPeriodFor, todayIso } from "@/lib/workspace/school-year";

type Entry = {
  id: string;
  label: string;
  due: string | null;
  done: boolean;
  meta?: string;
  href?: string;
  actionLabel?: string;
  sourceHref?: string;
  toggle: () => void;
  remove?: () => void;
  postpone?: (days: number) => void;
};

function bucketOf(due: string | null, today: string, periodEnd: string): "now" | "week" | "soon" | "period" | "later" {
  if (!due) return "week";
  if (due <= addDays(today, 3)) return "now";
  if (due <= addDays(today, 7)) return "week";
  if (due <= addDays(today, 42)) return "soon";
  if (due <= periodEnd) return "period";
  return "later";
}

const BUCKETS: { id: ReturnType<typeof bucketOf>; title: string; empty: string }[] = [
  { id: "now", title: "Maintenant", empty: "Rien d'urgent." },
  { id: "week", title: "Cette semaine", empty: "Semaine dégagée." },
  { id: "soon", title: "À anticiper", empty: "Rien dans les six prochaines semaines." },
  { id: "period", title: "Cette période", empty: "" },
];

export function DirectionDashboard() {
  return (
    <WithDirection place={{ path: "/direction", label: "Tableau de bord Direction" }}>
      {(context) => <Dashboard context={context} />}
    </WithDirection>
  );
}

function Dashboard({ context }: { context: DirectionContext }) {
  const { direction, profile } = context;
  const today = todayIso();
  const zone = profile.zone ?? "A";
  const period = getPeriodFor(today, zone);
  const [draft, setDraft] = useState("");
  const [showDone, setShowDone] = useState(false);

  const entries: Entry[] = [
    ...MILESTONES_2026_2027.filter((m) => m.date >= addDays(today, -21) || !direction.milestonesDone.includes(m.id)).map((m) => ({
      id: m.id,
      label: m.label,
      due: m.date,
      done: direction.milestonesDone.includes(m.id),
      meta: m.kind === "ferme" ? "Date officielle" : "Repère indicatif",
      href: m.action?.href,
      actionLabel: m.action?.label,
      sourceHref: m.source?.href,
      toggle: () => toggleMilestone(m.id),
    })),
    ...direction.tasks.map((t) => ({
      id: t.id,
      label: t.label,
      due: t.due,
      done: t.done,
      meta: t.origin.label,
      toggle: () => updateTask(t.id, { done: !t.done }),
      remove: () => {
        const before = directionStore.get();
        removeTask(t.id);
        toast("Tâche supprimée", () => directionStore.set(before));
      },
      postpone: (days: number) => updateTask(t.id, { due: addDays(t.due ?? today, days) }),
    })),
  ].sort((a, b) => (a.due ?? "9").localeCompare(b.due ?? "9"));

  const open = entries.filter((e) => !e.done);
  const done = entries.filter((e) => e.done);

  function add(due: string | null) {
    if (!draft.trim()) return;
    addTask(draft.trim(), due);
    setDraft("");
  }

  const meetings = [...direction.meetings].reverse().slice(0, 4);

  return (
    <>
      <PageTitle eyebrow={`Période ${period.id} · ${formatShortDate(today)}`} title="Ce qu'il faut préparer" />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="grid content-start gap-7">
          {BUCKETS.map((bucket) => {
            const items = open.filter((e) => bucketOf(e.due, today, period.end) === bucket.id);
            if (!items.length && !bucket.empty) return null;
            return (
              <section key={bucket.id} aria-labelledby={`b-${bucket.id}`}>
                <h2 id={`b-${bucket.id}`} className="flex items-center gap-2 font-serif text-xl font-semibold">
                  {bucket.title}
                  {items.length ? <span className="text-sm font-normal text-muted">{items.length}</span> : null}
                </h2>
                {items.length ? (
                  <ul className="mt-2 grid gap-0.5">
                    {items.map((e) => (
                      <li key={e.id}>
                        <EntryRow entry={e} today={today} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-sm text-muted">{bucket.empty}</p>
                )}
                {bucket.id === "week" ? (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      add(addDays(today, 5));
                    }}
                    className="mt-2 flex flex-wrap items-center gap-2 px-2"
                  >
                    <Icon name="plus" className="h-4 w-4 text-muted" />
                    <input
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      placeholder="Ajouter une tâche"
                      aria-label="Nouvelle tâche"
                      className="min-h-10 min-w-0 flex-1 bg-transparent text-[15px] placeholder:text-muted/70 focus:outline-none"
                    />
                    {draft.trim() ? (
                      <span className="flex gap-1">
                        <button type="button" className="chip chip-sm" onClick={() => add(today)}>Aujourd&apos;hui</button>
                        <button type="submit" className="chip chip-sm chip-on">Cette semaine</button>
                        <button type="button" className="chip chip-sm" onClick={() => add(addDays(today, 21))}>Plus tard</button>
                      </span>
                    ) : null}
                  </form>
                ) : null}
              </section>
            );
          })}

          {done.length ? (
            <section>
              <button type="button" onClick={() => setShowDone((v) => !v)} className="text-sm text-muted underline decoration-ink/25" aria-expanded={showDone}>
                {showDone ? "Masquer" : "Afficher"} les {done.length} éléments terminés
              </button>
              {showDone ? (
                <ul className="mt-2 grid gap-0.5">
                  {done.map((e) => (
                    <li key={e.id}>
                      <EntryRow entry={e} today={today} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ) : null}
        </div>

        <aside className="grid content-start gap-6">
          <section className="rounded-2xl border border-line p-4" aria-labelledby="instances">
            <h2 id="instances" className="font-serif text-lg font-semibold">Instances</h2>
            <ul className="mt-2 grid gap-1">
              {MEETING_KINDS.map((kind) => (
                <li key={kind.id}>
                  <Link href={`/direction/reunions?nouveau=${kind.id}`} className="flex min-h-11 items-center justify-between rounded-lg px-2 text-[15px] hover:bg-ink/5">
                    Préparer un {kind.label.toLowerCase()}
                    <Icon name="plus" className="h-4 w-4 text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
            {meetings.length ? (
              <>
                <p className="mt-3 px-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Récentes</p>
                <ul className="mt-1 grid gap-1">
                  {meetings.map((m) => (
                    <li key={m.id}>
                      <Link href={`/direction/reunions?id=${m.id}`} className="flex min-h-10 items-center justify-between rounded-lg px-2 text-sm hover:bg-ink/5">
                        <span>
                          {getMeetingKind(m.kind).short} n°{m.number}
                        </span>
                        <span className="text-muted">{m.date ? formatShortDate(m.date) : "sans date"}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </section>

          <section className="rounded-2xl border border-line p-4" aria-labelledby="demarches">
            <h2 id="demarches" className="font-serif text-lg font-semibold">Mon école · démarches</h2>
            <ul className="mt-2 grid gap-1">
              {PROCEDURES.map((p) => (
                <li key={p.id}>
                  <Link href={`/direction/demarches/${p.id}`} className="flex min-h-11 items-center gap-3 rounded-lg px-2 text-[15px] hover:bg-ink/5">
                    <Icon name={p.icon} className="h-4 w-4 text-gold" />
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </>
  );
}

function EntryRow({ entry, today }: { entry: Entry; today: string }) {
  const router = useRouter();
  const late = entry.due && entry.due < today && !entry.done;
  return (
    <CheckRow
      checked={entry.done}
      onToggle={entry.toggle}
      meta={
        <>
          {entry.due ? <span className={late ? "font-semibold text-ember" : ""}>{late ? "En retard · " : ""}{formatShortDate(entry.due)}</span> : null}
          {entry.meta ? <span> · {entry.meta}</span> : null}
          {entry.sourceHref ? (
            <>
              {" · "}
              <a href={entry.sourceHref} target="_blank" rel="noopener noreferrer" className="underline decoration-ink/25">
                source
              </a>
            </>
          ) : null}
        </>
      }
      actions={
        <div className="flex items-center gap-1">
          {entry.href && !entry.done ? (
            <Link href={entry.href} className="btn btn-quiet hidden sm:inline-flex">
              {entry.actionLabel ?? "Ouvrir"}
            </Link>
          ) : null}
          {entry.postpone || entry.remove || entry.href ? (
            <ActionMenu
              label={`Actions : ${entry.label}`}
              buttonClassName="size-9 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
              sections={[
                {
                  actions: [
                    ...(entry.href ? [{ label: entry.actionLabel ?? "Ouvrir", icon: "arrow-right" as const, onSelect: () => router.push(entry.href as string) }] : []),
                    ...(entry.postpone
                      ? [
                          { label: "Reporter d'une semaine", icon: "repeat" as const, onSelect: () => entry.postpone?.(7) },
                          { label: "Reporter d'un mois", icon: "repeat" as const, onSelect: () => entry.postpone?.(28) },
                        ]
                      : []),
                    ...(entry.remove ? [{ label: "Supprimer", icon: "trash" as const, tone: "danger" as const, onSelect: entry.remove }] : []),
                  ],
                },
              ]}
            />
          ) : null}
        </div>
      }
    >
      {entry.label}
    </CheckRow>
  );
}
