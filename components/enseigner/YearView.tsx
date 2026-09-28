"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ActionMenu, Button, ChipGroup, toast, type MenuSection } from "@/components/workspace/ui";
import { PageTitle, WithTeach, type TeachContext } from "@/components/enseigner/EnseignerShell";
import { getCurriculum, levelLabel, type Notion } from "@/lib/workspace/curriculum";
import { PROGRESS_STATES, proposeDistribution, setProgress, teachStore, type Progress, type ProgressState } from "@/lib/workspace/teach";

const COLUMNS: { id: Progress["period"]; label: string }[] = [
  { id: 0, label: "Non planifié" },
  { id: 1, label: "P1" },
  { id: 2, label: "P2" },
  { id: 3, label: "P3" },
  { id: 4, label: "P4" },
  { id: 5, label: "P5" },
];

const DRAG = "application/x-ak-notion";

export const STATE_TONE: Record<ProgressState, string> = {
  prevue: "text-muted",
  commencee: "text-sky",
  travaillee: "text-jade",
  "a-reprendre": "text-ember",
  reportee: "text-gold",
};

export function progressMenu(
  notionId: string,
  current: Progress | undefined,
  openResources?: () => void,
): MenuSection[] {
  return [
    ...(openResources ? [{ actions: [{ label: "Voir les ressources", icon: "book-open" as const, onSelect: openResources }] }] : []),
    {
      title: "Placer en",
      actions: COLUMNS.filter((c) => c.id !== (current?.period ?? 0)).map((c) => ({
        label: c.label,
        onSelect: () => setProgress(notionId, { period: c.id }),
      })),
    },
    {
      title: "État",
      actions: PROGRESS_STATES.filter((s) => s.id !== (current?.state ?? "prevue")).map((s) => ({
        label: s.label,
        onSelect: () => setProgress(notionId, { state: s.id }),
      })),
    },
  ];
}

export function YearView() {
  return (
    <WithTeach place={{ path: "/enseigner/annee", label: "Mon année" }}>
      {(context) => <Year context={context} />}
    </WithTeach>
  );
}

function Year({ context }: { context: TeachContext }) {
  const tree = getCurriculum(context.level);
  const [subjectId, setSubjectId] = useState<string | null>(tree[0]?.id ?? null);
  const [overColumn, setOverColumn] = useState<number | null>(null);
  const router = useRouter();
  const subject = tree.find((s) => s.id === subjectId) ?? tree[0];
  const notions: (Notion & { domainLabel: string })[] =
    subject?.domains.flatMap((d) => d.notions.map((n) => ({ ...n, domainLabel: d.label }))) ?? [];
  const { progress } = context.teach;
  const planned = notions.filter((n) => (progress[n.id]?.period ?? 0) > 0).length;

  function distribute() {
    const before = teachStore.get();
    proposeDistribution(context.level, subject?.id);
    toast("Répartition proposée : ajustez en déplaçant les cartes", () => teachStore.set(before));
  }

  return (
    <>
      <PageTitle
        eyebrow={`${levelLabel(context.level)} · programmation et progression`}
        title="Mon année"
        actions={
          planned < notions.length ? (
            <Button onClick={distribute} icon="repeat">
              Proposer une répartition
            </Button>
          ) : null
        }
      />

      <ChipGroup
        label="Matière"
        hideLabel
        size="sm"
        options={tree.map((s) => ({ id: s.id, label: s.short }))}
        value={subject?.id ?? null}
        onChange={setSubjectId}
      />
      <p className="mt-3 text-sm text-muted">
        {planned} / {notions.length} placées
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        {COLUMNS.map((column) => {
          const cards = notions.filter((n) => (progress[n.id]?.period ?? 0) === column.id);
          return (
            <section
              key={column.id}
              aria-label={column.label}
              onDragOver={(event) => {
                if (event.dataTransfer.types.includes(DRAG)) {
                  event.preventDefault();
                  setOverColumn(column.id);
                }
              }}
              onDragLeave={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node)) setOverColumn(null);
              }}
              onDrop={(event) => {
                const id = event.dataTransfer.getData(DRAG);
                setOverColumn(null);
                if (id) setProgress(id, { period: column.id });
              }}
              className={`flex min-h-40 flex-col rounded-2xl border p-2 transition ${
                overColumn === column.id ? "border-gold/60 bg-gold/[0.05]" : column.id === 0 ? "border-dashed border-line" : "border-line bg-panel/35"
              }`}
            >
              <h2 className="flex items-center justify-between px-2 pb-2 pt-1 text-sm font-semibold">
                {column.label}
                <span className="text-xs font-normal text-muted">{cards.length}</span>
              </h2>
              <ul className="grid gap-1.5">
                {cards.map((notion) => {
                  const p = progress[notion.id];
                  return (
                    <li
                      key={notion.id}
                      draggable
                      onDragStart={(event) => event.dataTransfer.setData(DRAG, notion.id)}
                      className="group flex items-start gap-1 rounded-xl border border-line bg-panel-soft py-2 pl-3 pr-1 transition hover:border-ink/25"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] leading-snug text-foreground">{notion.label}</p>
                        <p className="mt-1 text-[11px] text-muted">
                          {notion.domainLabel}
                          {p && p.state !== "prevue" ? (
                            <span className={`ml-1.5 font-semibold ${STATE_TONE[p.state]}`}>· {PROGRESS_STATES.find((s) => s.id === p.state)?.label}</span>
                          ) : null}
                        </p>
                      </div>
                      <ActionMenu label={`Déplacer ou changer l'état : ${notion.label}`} sections={progressMenu(notion.id, p, () => router.push(`/ressources?niveau=${context.level}&notion=${notion.id}`))} buttonClassName="size-8 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100" />
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
