"use client";

import { useState } from "react";
import {
  createEmptyTeacherSequence,
  teacherSequenceLevels,
  teacherSequenceStatuses,
  teacherSequenceStepKinds,
  teacherSequenceSubjects,
  type TeacherSequence,
  type TeacherSequenceLevelId,
  type TeacherSequenceStatusId,
  type TeacherSequenceStepKind,
} from "@/content/teacher-sequence-planner";

type SequenceFormProps = {
  initialSequence?: TeacherSequence;
  onSave: (sequence: TeacherSequence) => void;
  onCancel: () => void;
};

export function SequenceForm({
  initialSequence,
  onSave,
  onCancel,
}: SequenceFormProps) {
  const [sequence, setSequence] = useState<TeacherSequence>(
    initialSequence ?? createEmptyTeacherSequence(),
  );
  const [newStepKind, setNewStepKind] =
    useState<TeacherSequenceStepKind>("decouverte");
  const [newStepDescription, setNewStepDescription] = useState("");
  const [newChecklistLabel, setNewChecklistLabel] = useState("");

  function handleAddStep() {
    if (!newStepDescription.trim()) {
      return;
    }
    setSequence((previous) => ({
      ...previous,
      steps: [
        ...previous.steps,
        {
          id: crypto.randomUUID(),
          kind: newStepKind,
          description: newStepDescription.trim(),
        },
      ],
    }));
    setNewStepDescription("");
  }

  function handleRemoveStep(stepId: string) {
    setSequence((previous) => ({
      ...previous,
      steps: previous.steps.filter((step) => step.id !== stepId),
    }));
  }

  function handleAddChecklistItem() {
    if (!newChecklistLabel.trim()) {
      return;
    }
    setSequence((previous) => ({
      ...previous,
      checklist: [
        ...previous.checklist,
        {
          id: crypto.randomUUID(),
          label: newChecklistLabel.trim(),
          done: false,
        },
      ],
    }));
    setNewChecklistLabel("");
  }

  function handleToggleChecklistItem(itemId: string) {
    setSequence((previous) => ({
      ...previous,
      checklist: previous.checklist.map((item) =>
        item.id === itemId ? { ...item, done: !item.done } : item,
      ),
    }));
  }

  function handleRemoveChecklistItem(itemId: string) {
    setSequence((previous) => ({
      ...previous,
      checklist: previous.checklist.filter((item) => item.id !== itemId),
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!sequence.title.trim() || !sequence.competency.trim()) {
      return;
    }
    onSave({ ...sequence, updatedAt: new Date().toISOString() });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded-lg border border-jade/25 bg-jade/[0.05] p-5 sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="sequence-title" className="block text-sm font-bold text-foreground">
            Titre
          </label>
          <input
            id="sequence-title"
            type="text"
            required
            value={sequence.title}
            onChange={(event) =>
              setSequence((previous) => ({
                ...previous,
                title: event.target.value,
              }))
            }
            className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          />
        </div>

        <div>
          <label htmlFor="sequence-level" className="block text-sm font-bold text-foreground">
            Niveau (facultatif)
          </label>
          <select
            id="sequence-level"
            value={sequence.levelId}
            onChange={(event) =>
              setSequence((previous) => ({
                ...previous,
                levelId: event.target.value as TeacherSequenceLevelId | "",
              }))
            }
            className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          >
            <option value="">—</option>
            {teacherSequenceLevels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sequence-subject" className="block text-sm font-bold text-foreground">
            Matière
          </label>
          <select
            id="sequence-subject"
            required
            value={sequence.subject}
            onChange={(event) =>
              setSequence((previous) => ({
                ...previous,
                subject: event.target.value,
              }))
            }
            className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          >
            {teacherSequenceSubjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sequence-domain" className="block text-sm font-bold text-foreground">
            Domaine (facultatif)
          </label>
          <input
            id="sequence-domain"
            type="text"
            value={sequence.domain}
            onChange={(event) =>
              setSequence((previous) => ({
                ...previous,
                domain: event.target.value,
              }))
            }
            className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          />
        </div>

        <div>
          <label htmlFor="sequence-period" className="block text-sm font-bold text-foreground">
            Période
          </label>
          <input
            id="sequence-period"
            type="text"
            placeholder="Ex. Période 3"
            value={sequence.period}
            onChange={(event) =>
              setSequence((previous) => ({
                ...previous,
                period: event.target.value,
              }))
            }
            className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="sequence-competency" className="block text-sm font-bold text-foreground">
            Compétence unique
          </label>
          <input
            id="sequence-competency"
            type="text"
            required
            value={sequence.competency}
            onChange={(event) =>
              setSequence((previous) => ({
                ...previous,
                competency: event.target.value,
              }))
            }
            className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="sequence-objective" className="block text-sm font-bold text-foreground">
            Objectif
          </label>
          <textarea
            id="sequence-objective"
            value={sequence.objective}
            onChange={(event) =>
              setSequence((previous) => ({
                ...previous,
                objective: event.target.value,
              }))
            }
            rows={2}
            className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
          />
        </div>

        <div>
          <label htmlFor="sequence-duration" className="block text-sm font-bold text-foreground">
            Durée prévue
          </label>
          <input
            id="sequence-duration"
            type="text"
            placeholder="Ex. 5 séances de 45 min"
            value={sequence.duration}
            onChange={(event) =>
              setSequence((previous) => ({
                ...previous,
                duration: event.target.value,
              }))
            }
            className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          />
        </div>

        <div>
          <label htmlFor="sequence-status" className="block text-sm font-bold text-foreground">
            Statut
          </label>
          <select
            id="sequence-status"
            value={sequence.statusId}
            onChange={(event) =>
              setSequence((previous) => ({
                ...previous,
                statusId: event.target.value as TeacherSequenceStatusId,
              }))
            }
            className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          >
            {teacherSequenceStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="sequence-material" className="block text-sm font-bold text-foreground">
            Matériel
          </label>
          <textarea
            id="sequence-material"
            value={sequence.material}
            onChange={(event) =>
              setSequence((previous) => ({
                ...previous,
                material: event.target.value,
              }))
            }
            rows={2}
            className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="sequence-note" className="block text-sm font-bold text-foreground">
            Note pédagogique
          </label>
          <textarea
            id="sequence-note"
            value={sequence.note}
            onChange={(event) =>
              setSequence((previous) => ({
                ...previous,
                note: event.target.value,
              }))
            }
            rows={2}
            className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
          />
        </div>
      </div>

      <section aria-label="Étapes de la séquence" className="mt-6">
        <h3 className="text-sm font-bold text-foreground">Étapes</h3>
        {sequence.steps.length > 0 ? (
          <ul className="mt-2 grid gap-2" role="list">
            {sequence.steps.map((step) => (
              <li
                key={step.id}
                className="flex items-center justify-between gap-3 rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm"
              >
                <span>
                  <span className="font-bold text-foreground">
                    {teacherSequenceStepKinds.find((kind) => kind.id === step.kind)
                      ?.label}
                  </span>{" "}
                  <span className="text-muted">— {step.description}</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveStep(step.id)}
                  className="min-h-8 rounded-md border border-white/10 px-2 text-xs font-bold text-muted hover:border-ember/40 hover:text-ember"
                >
                  Retirer
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <select
            value={newStepKind}
            onChange={(event) =>
              setNewStepKind(event.target.value as TeacherSequenceStepKind)
            }
            className="min-h-11 rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          >
            {teacherSequenceStepKinds.map((kind) => (
              <option key={kind.id} value={kind.id}>
                {kind.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Description de l'étape"
            value={newStepDescription}
            onChange={(event) => setNewStepDescription(event.target.value)}
            className="min-h-11 flex-1 rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          />
          <button
            type="button"
            onClick={handleAddStep}
            className="min-h-11 rounded-md border border-jade/40 px-4 text-sm font-bold text-jade hover:bg-jade/10"
          >
            Ajouter l’étape
          </button>
        </div>
      </section>

      <section aria-label="Checklist de préparation" className="mt-6">
        <h3 className="text-sm font-bold text-foreground">
          Checklist de préparation
        </h3>
        {sequence.checklist.length > 0 ? (
          <ul className="mt-2 grid gap-2" role="list">
            {sequence.checklist.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm"
              >
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => handleToggleChecklistItem(item.id)}
                  />
                  <span
                    className={item.done ? "text-muted line-through" : "text-foreground"}
                  >
                    {item.label}
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => handleRemoveChecklistItem(item.id)}
                  className="min-h-8 rounded-md border border-white/10 px-2 text-xs font-bold text-muted hover:border-ember/40 hover:text-ember"
                >
                  Retirer
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Élément de préparation"
            value={newChecklistLabel}
            onChange={(event) => setNewChecklistLabel(event.target.value)}
            className="min-h-11 flex-1 rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          />
          <button
            type="button"
            onClick={handleAddChecklistItem}
            className="min-h-11 rounded-md border border-jade/40 px-4 text-sm font-bold text-jade hover:bg-jade/10"
          >
            Ajouter
          </button>
        </div>
      </section>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          className="min-h-11 rounded-md border border-jade/50 bg-jade/10 px-5 text-sm font-black text-jade hover:bg-jade/20"
        >
          Enregistrer
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="min-h-11 rounded-md border border-white/15 px-5 text-sm font-black text-foreground hover:border-white/30"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
