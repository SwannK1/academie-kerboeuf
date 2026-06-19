"use client";

import { useEffect, useState } from "react";
import {
  createDefaultParentMeetingState,
  isParentMeetingState,
  TEACHER_PARENT_MEETING_STORAGE_KEY,
  type ParentMeetingAgendaItem,
  type ParentMeetingDocument,
  type ParentMeetingQuestion,
  type ParentMeetingState,
} from "@/content/teacher-parent-meeting";

function readStoredState(): ParentMeetingState | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(
      TEACHER_PARENT_MEETING_STORAGE_KEY,
    );
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    return isParentMeetingState(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function TeacherParentMeetingPrepClient() {
  const [state, setState] = useState<ParentMeetingState>(
    () => readStoredState() ?? createDefaultParentMeetingState(),
  );
  const [newQuestion, setNewQuestion] = useState("");
  const [newDocument, setNewDocument] = useState("");
  const [newAgendaItem, setNewAgendaItem] = useState("");

  useEffect(() => {
    window.localStorage.setItem(
      TEACHER_PARENT_MEETING_STORAGE_KEY,
      JSON.stringify(state),
    );
  }, [state]);

  function updatePracticalInfo(
    field: keyof ParentMeetingState["practicalInfo"],
    value: string,
  ) {
    setState((previous) => ({
      ...previous,
      practicalInfo: { ...previous.practicalInfo, [field]: value },
    }));
  }

  function updateAgendaItem(
    id: string,
    update: Partial<ParentMeetingAgendaItem>,
  ) {
    setState((previous) => ({
      ...previous,
      agendaItems: previous.agendaItems.map((item) =>
        item.id === id ? { ...item, ...update } : item,
      ),
    }));
  }

  function addAgendaItem() {
    const label = newAgendaItem.trim();
    if (!label) {
      return;
    }
    setState((previous) => ({
      ...previous,
      agendaItems: [
        ...previous.agendaItems,
        { id: createId("agenda"), label, isIncluded: true, notes: "" },
      ],
    }));
    setNewAgendaItem("");
  }

  function removeAgendaItem(id: string) {
    setState((previous) => ({
      ...previous,
      agendaItems: previous.agendaItems.filter((item) => item.id !== id),
    }));
  }

  function updateDocument(id: string, update: Partial<ParentMeetingDocument>) {
    setState((previous) => ({
      ...previous,
      documents: previous.documents.map((document) =>
        document.id === id ? { ...document, ...update } : document,
      ),
    }));
  }

  function addDocument() {
    const label = newDocument.trim();
    if (!label) {
      return;
    }
    setState((previous) => ({
      ...previous,
      documents: [
        ...previous.documents,
        { id: createId("document"), label, isChecked: false },
      ],
    }));
    setNewDocument("");
  }

  function removeDocument(id: string) {
    setState((previous) => ({
      ...previous,
      documents: previous.documents.filter((document) => document.id !== id),
    }));
  }

  function updateQuestion(
    id: string,
    update: Partial<ParentMeetingQuestion>,
  ) {
    setState((previous) => ({
      ...previous,
      questions: previous.questions.map((question) =>
        question.id === id ? { ...question, ...update } : question,
      ),
    }));
  }

  function addQuestion() {
    const question = newQuestion.trim();
    if (!question) {
      return;
    }
    setState((previous) => ({
      ...previous,
      questions: [
        ...previous.questions,
        {
          id: createId("question"),
          question,
          responseNotes: "",
          isPrepared: false,
        },
      ],
    }));
    setNewQuestion("");
  }

  function removeQuestion(id: string) {
    setState((previous) => ({
      ...previous,
      questions: previous.questions.filter((question) => question.id !== id),
    }));
  }

  function updateFollowUp(
    field: keyof ParentMeetingState["followUp"],
    value: string,
  ) {
    setState((previous) => ({
      ...previous,
      followUp: { ...previous.followUp, [field]: value },
    }));
  }

  function handleReset() {
    setState(createDefaultParentMeetingState());
  }

  return (
    <div className="mt-10 space-y-8 print:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <p className="text-sm text-muted">
          Les informations restent enregistrées uniquement sur cet appareil.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-jade/40 bg-jade/10 px-4 text-sm font-black text-jade transition hover:border-jade/60"
          >
            Imprimer
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-ember/50 hover:text-ember"
          >
            Réinitialiser
          </button>
        </div>
      </div>

      <section
        aria-label="Informations pratiques"
        className="rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6"
      >
        <h2 className="text-xl font-black text-foreground">
          Informations pratiques
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="meeting-date"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Date
            </label>
            <input
              id="meeting-date"
              type="date"
              value={state.practicalInfo.date}
              onChange={(event) =>
                updatePracticalInfo("date", event.target.value)
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>
          <div>
            <label
              htmlFor="meeting-time"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Heure
            </label>
            <input
              id="meeting-time"
              type="time"
              value={state.practicalInfo.time}
              onChange={(event) =>
                updatePracticalInfo("time", event.target.value)
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>
          <div>
            <label
              htmlFor="meeting-place"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Lieu
            </label>
            <input
              id="meeting-place"
              type="text"
              value={state.practicalInfo.place}
              onChange={(event) =>
                updatePracticalInfo("place", event.target.value)
              }
              placeholder="Salle de classe, préau..."
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>
          <div>
            <label
              htmlFor="meeting-duration"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Durée estimée (minutes)
            </label>
            <input
              id="meeting-duration"
              type="number"
              min={0}
              value={state.practicalInfo.durationMinutes}
              onChange={(event) =>
                updatePracticalInfo("durationMinutes", event.target.value)
              }
              placeholder="60"
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="meeting-personal-note"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Note personnelle
            </label>
            <textarea
              id="meeting-personal-note"
              value={state.practicalInfo.personalNote}
              onChange={(event) =>
                updatePracticalInfo("personalNote", event.target.value)
              }
              rows={2}
              className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
            />
          </div>
        </div>
      </section>

      <section
        aria-label="Ordre du jour"
        className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
      >
        <h2 className="text-xl font-black text-foreground">Ordre du jour</h2>
        <ul className="mt-4 grid gap-3" role="list">
          {state.agendaItems.map((item) => (
            <li
              key={item.id}
              className="rounded-md border border-white/10 bg-background/45 p-3"
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={item.isIncluded}
                  onChange={(event) =>
                    updateAgendaItem(item.id, {
                      isIncluded: event.target.checked,
                    })
                  }
                  aria-label={`Inclure : ${item.label}`}
                  className="mt-1 h-5 w-5"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">
                    {item.label}
                  </p>
                  <textarea
                    value={item.notes}
                    onChange={(event) =>
                      updateAgendaItem(item.id, { notes: event.target.value })
                    }
                    placeholder="Notes de préparation"
                    rows={1}
                    className="mt-2 w-full rounded-md border border-white/10 bg-background/60 px-2 py-1 text-sm text-foreground print:hidden"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeAgendaItem(item.id)}
                  aria-label={`Retirer : ${item.label}`}
                  className="print:hidden text-sm font-bold text-muted hover:text-ember"
                >
                  Retirer
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2 print:hidden">
          <input
            type="text"
            value={newAgendaItem}
            onChange={(event) => setNewAgendaItem(event.target.value)}
            placeholder="Ajouter un point à l'ordre du jour"
            className="min-h-11 flex-1 rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          />
          <button
            type="button"
            onClick={addAgendaItem}
            className="min-h-11 rounded-md border border-jade/40 bg-jade/10 px-4 text-sm font-black text-jade"
          >
            Ajouter
          </button>
        </div>
      </section>

      <section
        aria-label="Documents à préparer"
        className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
      >
        <h2 className="text-xl font-black text-foreground">
          Documents à préparer
        </h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2" role="list">
          {state.documents.map((document) => (
            <li
              key={document.id}
              className="flex items-center justify-between gap-3 rounded-md border border-white/10 bg-background/45 px-3 py-2"
            >
              <label className="flex items-center gap-3 text-sm font-bold text-foreground">
                <input
                  type="checkbox"
                  checked={document.isChecked}
                  onChange={(event) =>
                    updateDocument(document.id, {
                      isChecked: event.target.checked,
                    })
                  }
                  className="h-5 w-5"
                />
                {document.label}
              </label>
              <button
                type="button"
                onClick={() => removeDocument(document.id)}
                aria-label={`Retirer : ${document.label}`}
                className="print:hidden text-sm font-bold text-muted hover:text-ember"
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2 print:hidden">
          <input
            type="text"
            value={newDocument}
            onChange={(event) => setNewDocument(event.target.value)}
            placeholder="Ajouter un document personnalisé"
            className="min-h-11 flex-1 rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          />
          <button
            type="button"
            onClick={addDocument}
            className="min-h-11 rounded-md border border-jade/40 bg-jade/10 px-4 text-sm font-black text-jade"
          >
            Ajouter
          </button>
        </div>
      </section>

      <section
        aria-label="Questions à anticiper"
        className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
      >
        <h2 className="text-xl font-black text-foreground">
          Questions à anticiper
        </h2>
        {state.questions.length > 0 ? (
          <ul className="mt-4 grid gap-3" role="list">
            {state.questions.map((question) => (
              <li
                key={question.id}
                className="rounded-md border border-white/10 bg-background/45 p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-bold text-foreground">
                    {question.question}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeQuestion(question.id)}
                    aria-label="Retirer la question"
                    className="print:hidden text-sm font-bold text-muted hover:text-ember"
                  >
                    Retirer
                  </button>
                </div>
                <textarea
                  value={question.responseNotes}
                  onChange={(event) =>
                    updateQuestion(question.id, {
                      responseNotes: event.target.value,
                    })
                  }
                  placeholder="Réponse ou note de préparation"
                  rows={2}
                  className="mt-2 w-full rounded-md border border-white/10 bg-background/60 px-2 py-1 text-sm text-foreground"
                />
                <label className="mt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted">
                  <input
                    type="checkbox"
                    checked={question.isPrepared}
                    onChange={(event) =>
                      updateQuestion(question.id, {
                        isPrepared: event.target.checked,
                      })
                    }
                    className="h-4 w-4"
                  />
                  {question.isPrepared ? "Préparée" : "À traiter"}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted">
            Aucune question anticipée pour le moment.
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2 print:hidden">
          <input
            type="text"
            value={newQuestion}
            onChange={(event) => setNewQuestion(event.target.value)}
            placeholder="Ajouter une question à anticiper"
            className="min-h-11 flex-1 rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
          />
          <button
            type="button"
            onClick={addQuestion}
            className="min-h-11 rounded-md border border-jade/40 bg-jade/10 px-4 text-sm font-black text-jade"
          >
            Ajouter
          </button>
        </div>
      </section>

      <section
        aria-label="Après la réunion"
        className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
      >
        <h2 className="text-xl font-black text-foreground">
          Après la réunion
        </h2>
        <div className="mt-4 grid gap-4">
          <div>
            <label
              htmlFor="followup-notes"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Notes personnelles
            </label>
            <textarea
              id="followup-notes"
              value={state.followUp.personalNotes}
              onChange={(event) =>
                updateFollowUp("personalNotes", event.target.value)
              }
              rows={3}
              className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
            />
          </div>
          <div>
            <label
              htmlFor="followup-tasks"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Tâches de suivi
            </label>
            <textarea
              id="followup-tasks"
              value={state.followUp.tasks}
              onChange={(event) => updateFollowUp("tasks", event.target.value)}
              rows={3}
              className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
            />
          </div>
          <div>
            <label
              htmlFor="followup-documents"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Documents à transmettre
            </label>
            <textarea
              id="followup-documents"
              value={state.followUp.documentsToShare}
              onChange={(event) =>
                updateFollowUp("documentsToShare", event.target.value)
              }
              rows={3}
              className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
            />
          </div>
          <div>
            <label
              htmlFor="followup-reminders"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Rappels
            </label>
            <textarea
              id="followup-reminders"
              value={state.followUp.reminders}
              onChange={(event) =>
                updateFollowUp("reminders", event.target.value)
              }
              rows={3}
              className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
            />
          </div>
        </div>
      </section>

      <p className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-xs leading-relaxed text-muted">
        Cet outil aide à préparer la réunion de rentrée et ne remplace pas les
        documents officiels de l’école. Aucune liste de parents, adresse ou
        numéro de téléphone n’est demandé ni stocké. Les informations restent
        uniquement sur cet appareil, sans compte ni partage.
      </p>
    </div>
  );
}
