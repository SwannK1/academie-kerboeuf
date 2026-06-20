"use client";

import { useEffect, useMemo, useState } from "react";
import {
  TEACHER_SEQUENCE_PLANNER_STORAGE_KEY,
  duplicateTeacherSequence,
  teacherSequenceStatuses,
  teacherSequenceSubjects,
  type TeacherSequence,
  type TeacherSequenceStatusId,
} from "@/content/teacher-sequence-planner";
import { SequenceForm } from "@/components/teacher-sequence-planner/SequenceForm";
import { SequenceCard } from "@/components/teacher-sequence-planner/SequenceCard";

function readStoredSequences(): TeacherSequence[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(
      TEACHER_SEQUENCE_PLANNER_STORAGE_KEY,
    );
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as TeacherSequence[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
}

export function TeacherSequencePlanner() {
  const [sequences, setSequences] = useState<TeacherSequence[]>(() =>
    readStoredSequences(),
  );
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [periodFilter, setPeriodFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<TeacherSequenceStatusId | "">(
    "",
  );

  useEffect(() => {
    window.localStorage.setItem(
      TEACHER_SEQUENCE_PLANNER_STORAGE_KEY,
      JSON.stringify(sequences),
    );
  }, [sequences]);

  const periods = useMemo(() => {
    const set = new Set<string>();
    for (const sequence of sequences) {
      if (sequence.period) {
        set.add(sequence.period);
      }
    }
    return Array.from(set).sort();
  }, [sequences]);

  const filteredSequences = useMemo(() => {
    const query = search.trim().toLowerCase();
    return sequences.filter((sequence) => {
      if (subjectFilter && sequence.subject !== subjectFilter) {
        return false;
      }
      if (periodFilter && sequence.period !== periodFilter) {
        return false;
      }
      if (statusFilter && sequence.statusId !== statusFilter) {
        return false;
      }
      if (!query) {
        return true;
      }
      return (
        sequence.title.toLowerCase().includes(query) ||
        sequence.competency.toLowerCase().includes(query) ||
        sequence.objective.toLowerCase().includes(query)
      );
    });
  }, [sequences, search, subjectFilter, periodFilter, statusFilter]);

  function handleSave(sequence: TeacherSequence) {
    setSequences((previous) => {
      const exists = previous.some((item) => item.id === sequence.id);
      if (exists) {
        return previous.map((item) =>
          item.id === sequence.id ? sequence : item,
        );
      }
      return [...previous, sequence];
    });
    setIsCreating(false);
    setEditingId(null);
  }

  function handleDelete(sequenceId: string) {
    const confirmed = window.confirm(
      "Supprimer définitivement cette séquence ?",
    );
    if (!confirmed) {
      return;
    }
    setSequences((previous) =>
      previous.filter((sequence) => sequence.id !== sequenceId),
    );
  }

  function handleDuplicate(sequence: TeacherSequence) {
    setSequences((previous) => [...previous, duplicateTeacherSequence(sequence)]);
  }

  function handlePrint() {
    window.print();
  }

  const editingSequence = editingId
    ? sequences.find((sequence) => sequence.id === editingId)
    : undefined;

  return (
    <div className="mt-10">
      <section aria-label="Recherche et filtres" className="print:hidden">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            placeholder="Rechercher une séquence"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="min-h-11 flex-1 rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            aria-label="Rechercher une séquence"
          />
          <select
            value={subjectFilter}
            onChange={(event) => setSubjectFilter(event.target.value)}
            className="min-h-11 rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            aria-label="Filtrer par matière"
          >
            <option value="">Toutes les matières</option>
            {teacherSequenceSubjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <select
            value={periodFilter}
            onChange={(event) => setPeriodFilter(event.target.value)}
            className="min-h-11 rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            aria-label="Filtrer par période"
          >
            <option value="">Toutes les périodes</option>
            {periods.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as TeacherSequenceStatusId | "")
            }
            className="min-h-11 rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            aria-label="Filtrer par statut"
          >
            <option value="">Tous les statuts</option>
            {teacherSequenceStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setIsCreating(true);
              setEditingId(null);
            }}
            className="min-h-11 rounded-md border border-jade/50 bg-jade/10 px-5 text-sm font-black text-jade hover:bg-jade/20"
          >
            Créer une séquence
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="min-h-11 rounded-md border border-white/15 px-5 text-sm font-black text-foreground hover:border-jade/40"
          >
            Imprimer
          </button>
        </div>
      </section>

      {isCreating ? (
        <SequenceForm
          onSave={handleSave}
          onCancel={() => setIsCreating(false)}
        />
      ) : null}

      {editingSequence ? (
        <SequenceForm
          initialSequence={editingSequence}
          onSave={handleSave}
          onCancel={() => setEditingId(null)}
        />
      ) : null}

      <section aria-label="Liste des séquences" className="mt-8 grid gap-4">
        {filteredSequences.length > 0 ? (
          filteredSequences.map((sequence) => (
            <SequenceCard
              key={sequence.id}
              sequence={sequence}
              onEdit={() => {
                setEditingId(sequence.id);
                setIsCreating(false);
              }}
              onDuplicate={() => handleDuplicate(sequence)}
              onDelete={() => handleDelete(sequence.id)}
              onPrint={handlePrint}
            />
          ))
        ) : (
          <p className="text-sm leading-7 text-muted">
            {sequences.length === 0
              ? "Aucune séquence pour le moment. Créez votre première séquence."
              : "Aucune séquence ne correspond à la recherche ou aux filtres."}
          </p>
        )}
      </section>
    </div>
  );
}
