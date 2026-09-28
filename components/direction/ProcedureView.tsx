"use client";

import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { ActionMenu, Button, CheckRow, ChipGroup, SourceLinks, toast } from "@/components/workspace/ui";
import { PageTitle } from "@/components/enseigner/EnseignerShell";
import { WithDirection, type DirectionContext } from "@/components/direction/DirectionShell";
import { PROCEDURES, getProcedure, visibleItems, type Procedure } from "@/content/direction/catalog";
import { addTask, directionStore, startRun, updateRun, type ProcedureRun } from "@/lib/workspace/direction";
import { addDays, todayIso } from "@/lib/workspace/school-year";

export function ProceduresIndex() {
  return (
    <WithDirection place={{ path: "/direction/demarches", label: "Démarches" }}>
      {(context) => (
        <>
          <PageTitle title="Démarches" eyebrow="Checklists guidées, sources officielles" />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PROCEDURES.map((p) => {
              const run = context.direction.runs.filter((r) => r.procedureId === p.id).at(-1);
              const total = run ? visibleItems(p, run.choices).length : p.items.length;
              return (
                <li key={p.id}>
                  <Link href={`/direction/demarches/${p.id}`} className="flex h-full flex-col rounded-2xl border border-line bg-panel-soft p-5 transition hover:border-ink/25">
                    <Icon name={p.icon} className="h-5 w-5 text-gold" />
                    <span className="mt-3 font-serif text-lg font-semibold">{p.title}</span>
                    <span className="mt-1 text-sm text-muted">{p.summary}</span>
                    {run ? (
                      <span className="mt-3 text-xs font-medium text-jade">
                        En cours · {run.checked.filter((c) => visibleItems(p, run.choices).some((i) => i.id === c)).length} / {total}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </WithDirection>
  );
}

export function ProcedureView({ id }: { id: string }) {
  const procedure = getProcedure(id);
  return (
    <WithDirection place={{ path: `/direction/demarches/${id}`, label: procedure?.title ?? "Démarche" }}>
      {(context) => (procedure ? <ProcedureRunner procedure={procedure} context={context} /> : null)}
    </WithDirection>
  );
}

function ProcedureRunner({ procedure, context }: { procedure: Procedure; context: DirectionContext }) {
  const run: ProcedureRun | undefined = context.direction.runs.filter((r) => r.procedureId === procedure.id).at(-1);
  const choices = run?.choices ?? [];
  const checked = run?.checked ?? [];
  const answered = procedure.questions.every((q) => q.optional || q.options.some((o) => choices.includes(o.id)));
  const items = visibleItems(procedure, choices);
  const done = items.filter((i) => checked.includes(i.id)).length;

  function remind(days: number) {
    addTask(procedure.title, addDays(todayIso(), days), { kind: "demarche", id: procedure.id, label: "Démarche" });
    toast("Ajouté au tableau de bord");
  }

  function ensureRun(): string {
    return run?.id ?? startRun(procedure.id);
  }

  function choose(questionId: string, optionId: string | null) {
    const question = procedure.questions.find((q) => q.id === questionId);
    if (!question) return;
    const runId = ensureRun();
    const current = directionStore.get().runs.find((r) => r.id === runId);
    const rest = (current?.choices ?? []).filter((c) => !question.options.some((o) => o.id === c));
    updateRun(runId, { choices: optionId ? [...rest, optionId] : rest });
  }

  function toggle(itemId: string) {
    const runId = ensureRun();
    const current = directionStore.get().runs.find((r) => r.id === runId);
    const list = current?.checked ?? [];
    updateRun(runId, { checked: list.includes(itemId) ? list.filter((c) => c !== itemId) : [...list, itemId] });
  }

  return (
    <>
      <PageTitle
        eyebrow="Démarche guidée"
        title={procedure.title}
        actions={
          <>
            <ActionMenu
              label="Me le rappeler"
              triggerContent={
                <span className="btn btn-secondary">
                  <Icon name="calendar" className="h-4 w-4" /> Me le rappeler
                </span>
              }
              sections={[
                {
                  title: "Ajouter au tableau de bord",
                  actions: [
                    { label: "Cette semaine", onSelect: () => remind(5) },
                    { label: "Dans deux semaines", onSelect: () => remind(14) },
                    { label: "Dans un mois", onSelect: () => remind(30) },
                  ],
                },
              ]}
            />
            {run ? (
              <Button
                variant="quiet"
                icon="repeat"
                onClick={() => {
                  startRun(procedure.id);
                  toast("Nouvelle liste vierge");
                }}
              >
                Nouvelle
              </Button>
            ) : null}
          </>
        }
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="grid content-start gap-6">
          {procedure.questions.map((question) => (
            <ChipGroup
              key={question.id}
              label={question.label}
              allowEmpty
              options={question.options}
              value={question.options.find((o) => choices.includes(o.id))?.id ?? null}
              onChange={(value) => choose(question.id, value)}
            />
          ))}

          {answered ? (
            <section aria-label="Liste à cocher">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="font-serif text-xl font-semibold">À faire</h2>
                <span className="text-sm text-muted">
                  {done} / {items.length}
                </span>
              </div>
              <ul className="grid gap-0.5 rounded-2xl border border-line p-2">
                {items.map((item) => (
                  <li key={item.id}>
                    <CheckRow checked={checked.includes(item.id)} onToggle={() => toggle(item.id)}>
                      {item.label}
                    </CheckRow>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
        <aside>
          <SourceLinks sources={procedure.sources} />
        </aside>
      </div>
    </>
  );
}
