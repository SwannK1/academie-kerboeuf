"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { ActionMenu, Button, ChipGroup, Hint, ReorderList, SourceLinks, toast } from "@/components/workspace/ui";
import { PageTitle } from "@/components/enseigner/EnseignerShell";
import { WithDirection, type DirectionContext } from "@/components/direction/DirectionShell";
import { MEETING_KINDS, getMeetingKind, type MeetingKind } from "@/content/direction/catalog";
import {
  ITEM_OUTCOMES,
  addItem,
  createMeeting,
  directionStore,
  itemToTask,
  removeMeeting,
  reorderItems,
  updateItem,
  updateMeeting,
  type Meeting,
  type MeetingItem,
} from "@/lib/workspace/direction";
import { addDays, formatLongDate, formatShortDate, fromIso, todayIso } from "@/lib/workspace/school-year";

type Mode = "preparer" | "reunion" | "imprimer";

export function MeetingsView() {
  return (
    <WithDirection place={{ path: "/direction/reunions", label: "Réunions" }}>
      {(context) => <Meetings context={context} />}
    </WithDirection>
  );
}

function Meetings({ context }: { context: DirectionContext }) {
  const params = useSearchParams();
  const router = useRouter();
  const created = useRef(false);
  const nouveau = params.get("nouveau") as MeetingKind | null;
  const id = params.get("id");

  useEffect(() => {
    if (!nouveau || created.current || !MEETING_KINDS.some((k) => k.id === nouveau)) return;
    created.current = true;
    const newId = createMeeting(nouveau);
    router.replace(`/direction/reunions?id=${newId}`);
  }, [nouveau, router]);

  const meeting = id ? context.direction.meetings.find((m) => m.id === id) : undefined;
  if (meeting) return <MeetingEditor meeting={meeting} context={context} />;

  const list = [...context.direction.meetings].reverse();
  return (
    <>
      <PageTitle title="Réunions" eyebrow="Conseils et instances" />
      <div className="grid gap-3 sm:grid-cols-3">
        {MEETING_KINDS.map((kind) => (
          <Link key={kind.id} href={`/direction/reunions?nouveau=${kind.id}`} className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-panel-soft p-5 transition hover:border-ink/25">
            <span>
              <span className="block font-serif text-lg font-semibold">{kind.label}</span>
              <span className="text-sm text-muted">Nouveau n°{context.direction.meetings.filter((m) => m.kind === kind.id).length + 1}</span>
            </span>
            <Icon name="plus" className="h-5 w-5 text-gold" />
          </Link>
        ))}
      </div>
      {list.length ? (
        <ul className="mt-8 divide-y divide-line rounded-2xl border border-line">
          {list.map((m) => (
            <li key={m.id}>
              <Link href={`/direction/reunions?id=${m.id}`} className="flex min-h-14 items-center justify-between px-4 hover:bg-ink/[0.03]">
                <span className="font-medium">
                  {getMeetingKind(m.kind).label} n°{m.number}
                </span>
                <span className="text-sm text-muted">
                  {m.date ? formatShortDate(m.date) : "Date à fixer"} · {m.items.filter((i) => i.included).length} points
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

function MeetingEditor({ meeting, context }: { meeting: Meeting; context: DirectionContext }) {
  const kind = getMeetingKind(meeting.kind);
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("preparer");
  const [draft, setDraft] = useState("");
  const included = meeting.items.filter((i) => i.included);
  const minutes = included.reduce((sum, i) => sum + (i.minutes ?? 0), 0);
  const previous = context.direction.meetings.filter((m) => m.kind === meeting.kind && m.number < meeting.number).at(-1);
  const title = `${kind.label} n°${meeting.number}`;

  return (
    <>
      <div className="no-print">
        <PageTitle
          eyebrow={meeting.date ? formatLongDate(meeting.date) : "Date à fixer"}
          title={title}
          actions={
            <ActionMenu
              label="Actions de la réunion"
              sections={[
                {
                  actions: [
                    {
                      label: "Repartir des points proposés",
                      icon: "repeat",
                      onSelect: () =>
                        updateMeeting(meeting.id, {
                          items: kind.items.map((label, i) => ({ id: `${meeting.id}-p${i}-${Date.now()}`, label, minutes: 10, included: true, outcome: null, decision: "", taskId: null })),
                        }),
                    },
                    {
                      label: "Supprimer la réunion",
                      icon: "trash",
                      tone: "danger",
                      onSelect: () => {
                        const before = directionStore.get();
                        removeMeeting(meeting.id);
                        router.replace("/direction/reunions");
                        toast("Réunion supprimée", () => directionStore.set(before));
                      },
                    },
                  ],
                },
              ]}
            />
          }
        />
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <ChipGroup<Mode>
            label="Étape"
            hideLabel
            options={[
              { id: "preparer", label: "1 · Préparer" },
              { id: "reunion", label: "2 · En réunion" },
              { id: "imprimer", label: "3 · Imprimer" },
            ]}
            value={mode}
            onChange={(m) => m && setMode(m)}
          />
        </div>
      </div>

      {mode === "preparer" ? (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            {previous && meeting.items.some((i) => previous.items.some((p) => p.label === i.label)) ? (
              <div className="mb-4">
                <Hint>Repris du n°{previous.number}.</Hint>
              </div>
            ) : null}
            <label className="mb-5 flex flex-wrap items-center gap-3 text-sm">
              <span className="font-medium">Date</span>
              <input
                type="date"
                className="field w-auto"
                value={meeting.date ?? ""}
                min="2026-09-01"
                onChange={(event) => updateMeeting(meeting.id, { date: event.target.value || null })}
              />
              {meeting.date ? (
                <span className="text-muted">Ordre du jour à envoyer avant le {formatShortDate(addDays(meeting.date, -8))}</span>
              ) : null}
            </label>

            <ReorderList
              label="Points de l'ordre du jour"
              items={meeting.items}
              onReorder={(ids) => reorderItems(meeting.id, ids)}
              renderItem={(item, controls) => <PrepRow meeting={meeting} item={item} controls={controls} />}
            />

            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (draft.trim()) {
                  addItem(meeting.id, draft.trim());
                  setDraft("");
                }
              }}
              className="mt-2 flex items-center gap-2 rounded-lg px-2"
            >
              <Icon name="plus" className="h-4 w-4 text-muted" />
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ajouter un point libre"
                aria-label="Ajouter un point libre"
                className="min-h-11 flex-1 bg-transparent text-[15px] placeholder:text-muted/70 focus:outline-none"
              />
              {draft.trim() ? <Button type="submit">Ajouter</Button> : null}
            </form>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <p className="text-sm text-muted">
                {included.length} points · {minutes} min environ
              </p>
              <Button variant="primary" icon="printer" onClick={() => setMode("imprimer")}>
                Générer l&apos;ordre du jour
              </Button>
            </div>
          </div>
          <aside className="grid content-start gap-4">
            <SourceLinks sources={kind.sources} why={kind.hint} />
          </aside>
        </div>
      ) : null}

      {mode === "reunion" ? <LiveMeeting meeting={meeting} /> : null}
      {mode === "imprimer" ? <PrintMeeting meeting={meeting} title={title} /> : null}
    </>
  );
}

function PrepRow({ meeting, item, controls }: { meeting: Meeting; item: MeetingItem; controls: React.ReactNode }) {
  const cycle = [5, 10, 15, 20];
  return (
    <div className={`flex items-center gap-2 rounded-lg border px-2 py-1 transition ${item.included ? "border-line bg-panel-soft" : "border-transparent"}`}>
      <input
        type="checkbox"
        className="check ml-1"
        checked={item.included}
        onChange={() => updateItem(meeting.id, item.id, { included: !item.included })}
        aria-label={`Inclure : ${item.label}`}
      />
      <span className={`min-w-0 flex-1 py-2 text-[15px] ${item.included ? "" : "text-muted"}`}>{item.label}</span>
      {item.included ? (
        <button
          type="button"
          onClick={() => updateItem(meeting.id, item.id, { minutes: cycle[(cycle.indexOf(item.minutes ?? 10) + 1) % cycle.length] })}
          className="min-h-9 rounded-full border border-line px-2.5 text-xs tabular-nums text-muted hover:border-ink/30"
          aria-label={`Durée : ${item.minutes} minutes. Changer`}
        >
          {item.minutes} min
        </button>
      ) : null}
      {controls}
    </div>
  );
}

function LiveMeeting({ meeting }: { meeting: Meeting }) {
  const items = meeting.items.filter((i) => i.included);
  const [precision, setPrecision] = useState<string[]>([]);
  return (
    <ol className="grid gap-3">
      {items.map((item, index) => (
        <li key={item.id} className="rounded-2xl border border-line bg-panel-soft p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-semibold">
              <span className="mr-2 text-muted">{index + 1}.</span>
              {item.label}
            </h3>
            <ChipGroup
              label="Suite donnée"
              hideLabel
              size="sm"
              allowEmpty
              options={ITEM_OUTCOMES}
              value={item.outcome}
              onChange={(outcome) => updateItem(meeting.id, item.id, { outcome })}
            />
          </div>
          {item.outcome === "decision" || item.outcome === "a-suivre" ? (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {item.taskId ? (
                <span className="inline-flex min-h-10 items-center gap-1.5 text-sm text-jade">
                  <Icon name="check" className="h-4 w-4" /> Action dans le tableau de bord
                </span>
              ) : (
                <ActionMenu
                  label="Créer une action de suivi"
                  align="left"
                  triggerContent={
                    <span className="btn btn-secondary">
                      <Icon name="plus" className="h-4 w-4" /> Créer une action
                    </span>
                  }
                  sections={[
                    {
                      title: "Échéance",
                      actions: [
                        { label: "Cette semaine", onSelect: () => itemToTask(meeting, item, addDays(todayIso(), 5)) },
                        { label: "Dans un mois", onSelect: () => itemToTask(meeting, item, addDays(todayIso(), 30)) },
                        { label: "Avant le prochain conseil", onSelect: () => itemToTask(meeting, item, addDays(todayIso(), 75)) },
                      ],
                    },
                  ]}
                />
              )}
              {item.decision || precision.includes(item.id) ? (
                <input
                  value={item.decision}
                  onChange={(event) => updateItem(meeting.id, item.id, { decision: event.target.value })}
                  placeholder="Précision (facultatif)"
                  aria-label="Décision ou suivi"
                  className="field min-w-0 flex-1"
                />
              ) : (
                <button type="button" onClick={() => setPrecision((list) => [...list, item.id])} className="btn btn-quiet">
                  + Ajouter une précision
                </button>
              )}
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function PrintMeeting({ meeting, title }: { meeting: Meeting; title: string }) {
  const [doc, setDoc] = useState<"odj" | "cr">("odj");
  const items = meeting.items.filter((i) => i.included);
  const year = meeting.date ? fromIso(meeting.date).getFullYear() : "";
  return (
    <>
      <div className="no-print mb-5 flex flex-wrap items-center gap-3">
        <ChipGroup<"odj" | "cr">
          label="Document"
          hideLabel
          size="sm"
          options={[
            { id: "odj", label: "Ordre du jour" },
            { id: "cr", label: "Relevé de décisions" },
          ]}
          value={doc}
          onChange={(d) => d && setDoc(d)}
        />
        <Button variant="primary" icon="printer" onClick={() => window.print()}>
          Imprimer
        </Button>
      </div>
      <article className="print-sheet mx-auto max-w-3xl rounded-2xl border border-line bg-white p-8 shadow-[0_20px_50px_-40px_rgba(43,36,32,0.6)] sm:p-12">
        <header className="border-b-2 border-foreground pb-3">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">{doc === "odj" ? "Ordre du jour" : "Relevé de décisions"}</p>
          <h2 className="mt-1 font-serif text-3xl font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-muted">{meeting.date ? `${formatLongDate(meeting.date)} ${year}` : "Date : ____________"}</p>
        </header>
        <ol className="mt-6 grid gap-4">
          {items.map((item, index) => (
            <li key={item.id} className="print-avoid-break">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-[15px] font-semibold">
                  {index + 1}. {item.label}
                </p>
                {doc === "odj" && item.minutes ? <span className="text-sm tabular-nums text-muted">{item.minutes} min</span> : null}
              </div>
              {doc === "cr" ? (
                <p className="mt-1 text-sm">
                  <span className="text-muted">{ITEM_OUTCOMES.find((o) => o.id === item.outcome)?.label ?? "Non traité"}</span>
                  {item.decision ? <span> — {item.decision}</span> : null}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
        {doc === "odj" ? (
          <p className="mt-8 border-t border-line pt-3 text-sm text-muted">
            Durée prévue : {items.reduce((s, i) => s + (i.minutes ?? 0), 0)} minutes environ.
          </p>
        ) : null}
      </article>
    </>
  );
}
