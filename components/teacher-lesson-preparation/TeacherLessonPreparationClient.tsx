"use client";

import { useEffect, useId, useMemo, useState } from "react";
import {
  createEmptyMaterialItem,
  createEmptyStep,
  createLessonFromTemplate,
  duplicateLesson,
  lessonLevels,
  lessonModalities,
  lessonPeriods,
  lessonStatuses,
  lessonSubjects,
  lessonTemplates,
  type LessonLevel,
  type LessonPeriod,
  type LessonStatus,
  type LessonStep,
  type LessonSubject,
  type LessonTemplateId,
  type TeacherLesson,
} from "@/content/teacher-lesson-preparation";
import {
  addDaysToKey,
  createBlankSession,
  createSessionId,
  formatWeekRangeLabel,
  getMondayKey,
  logbookDays,
  logbookSlots,
  type LogbookDay,
  type LogbookSlotId,
  type LogbookWeekData,
} from "@/content/teacher-logbook";

const STORAGE_KEY = "academie-kerboeuf-preparer-une-seance-v1";

/** Clé de stockage de l'outil "Progression de période" (lecture seule, import ciblé). */
const PROGRESSION_STORAGE_KEY = "progression-periode-kanban-v3";

/** Clé de stockage du cahier journal (écriture ciblée, sur confirmation uniquement). */
const LOGBOOK_STORAGE_KEY = "academie-kerboeuf-cahier-journal-v1";

type StoredData = { lessons: TeacherLesson[] };

type ProgressionCard = {
  id: string;
  niveau: LessonLevel;
  periode: LessonPeriod;
  matiere: string;
  domaine: string;
  competenceLabel: string;
  dureeMinutes: number;
};

function readLessons(): TeacherLesson[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object" && Array.isArray((parsed as StoredData).lessons)) {
      return (parsed as StoredData).lessons;
    }
    return [];
  } catch {
    return [];
  }
}

function readProgressionCards(): ProgressionCard[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PROGRESSION_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { cards?: ProgressionCard[] };
    if (!Array.isArray(parsed.cards)) return [];
    return parsed.cards;
  } catch {
    return [];
  }
}

function mapToLessonSubject(matiere: string): LessonSubject {
  const known = lessonSubjects.find((item) => item.id === matiere);
  return known ? known.id : "autre";
}

function readLogbookData(): Record<string, LogbookWeekData> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(LOGBOOK_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object") return parsed as Record<string, LogbookWeekData>;
    return {};
  } catch {
    return {};
  }
}

function statusMeta(status: LessonStatus) {
  return lessonStatuses.find((item) => item.id === status) ?? lessonStatuses[0];
}

function levelLabel(level: LessonLevel): string {
  return lessonLevels.find((item) => item.id === level)?.label ?? level;
}

function subjectLabel(subject: LessonSubject): string {
  return lessonSubjects.find((item) => item.id === subject)?.label ?? subject;
}

export function TeacherLessonPreparationClient() {
  const [lessons, setLessons] = useState<TeacherLesson[]>(() => readLessons());
  const [view, setView] = useState<"liste" | "edition">("liste");
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<LessonTemplateId>("libre");
  const [showImportPicker, setShowImportPicker] = useState(false);
  const [showLogbookConfirm, setShowLogbookConfirm] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ lessons } satisfies StoredData));
  }, [lessons]);

  const currentLesson = useMemo(
    () => lessons.find((item) => item.id === currentId) ?? null,
    [lessons, currentId],
  );

  function updateLesson(id: string, updater: (lesson: TeacherLesson) => TeacherLesson) {
    setLessons((previous) =>
      previous.map((item) =>
        item.id === id ? { ...updater(item), updatedAt: new Date().toISOString() } : item,
      ),
    );
  }

  function openLesson(id: string) {
    setCurrentId(id);
    setView("edition");
  }

  function createBlankLesson() {
    const lesson = createLessonFromTemplate("libre");
    setLessons((previous) => [lesson, ...previous]);
    openLesson(lesson.id);
  }

  function createFromTemplate() {
    const lesson = createLessonFromTemplate(selectedTemplate);
    setLessons((previous) => [lesson, ...previous]);
    openLesson(lesson.id);
  }

  function handleDuplicate(lesson: TeacherLesson) {
    const copy = duplicateLesson(lesson);
    setLessons((previous) => [copy, ...previous]);
  }

  function handleArchiveToggle(id: string) {
    updateLesson(id, (lesson) => ({ ...lesson, archived: !lesson.archived }));
  }

  function handleDelete(id: string) {
    const lesson = lessons.find((item) => item.id === id);
    if (!lesson) return;
    const confirmed = window.confirm(
      `Supprimer la séance « ${lesson.title || "(sans titre)"} » ? Cette action est irréversible.`,
    );
    if (!confirmed) return;
    setLessons((previous) => previous.filter((item) => item.id !== id));
    if (currentId === id) {
      setCurrentId(null);
      setView("liste");
    }
  }

  function importFromProgression(card: ProgressionCard) {
    const lesson = createLessonFromTemplate("libre");
    lesson.title = card.competenceLabel;
    lesson.level = card.niveau;
    lesson.subject = mapToLessonSubject(card.matiere);
    lesson.domain = card.domaine;
    lesson.competency = card.competenceLabel;
    lesson.period = card.periode;
    lesson.duration = card.dureeMinutes ? `${card.dureeMinutes} min` : "";
    setLessons((previous) => [lesson, ...previous]);
    setShowImportPicker(false);
    openLesson(lesson.id);
  }

  const visibleLessons = lessons.filter((lesson) => lesson.archived === showArchived);

  if (view === "edition" && currentLesson) {
    return (
      <div className="mt-10 space-y-8 print:mt-4 print:space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
          <button
            type="button"
            onClick={() => {
              setView("liste");
              setCurrentId(null);
            }}
            className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-jade/40"
          >
            ← Retour aux séances
          </button>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleDuplicate(currentLesson)}
              className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-jade/40"
            >
              Dupliquer
            </button>
            <button
              type="button"
              onClick={() => setShowLogbookConfirm(true)}
              className="min-h-11 rounded-md border border-sky-400/50 bg-sky-400/10 px-3 text-sm font-bold text-sky-300 transition hover:bg-sky-400/20"
            >
              Ajouter au cahier journal
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground transition hover:border-jade/40"
            >
              Imprimer (A4 N&amp;B)
            </button>
          </div>
        </div>

        <LessonEditor lesson={currentLesson} onChange={(updater) => updateLesson(currentLesson.id, updater)} />

        {showLogbookConfirm && (
          <AddToLogbookModal
            lesson={currentLesson}
            onClose={() => setShowLogbookConfirm(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-8">
      <p
        role="note"
        className="rounded-lg border border-ember/40 bg-ember/10 p-4 text-sm font-bold text-foreground"
      >
        Atelier local uniquement. Sauvegarde sur cet appareil (localStorage).
        N’inscrivez aucune information sensible ou nominative : pas de nom,
        prénom, donnée de santé ou de comportement d’élève.
      </p>

      <section
        aria-labelledby="creer-seance"
        className="flex flex-wrap items-end gap-4 rounded-lg border border-white/10 bg-background/45 p-4"
      >
        <h2 id="creer-seance" className="w-full text-xl font-black text-foreground">
          Créer une séance
        </h2>
        <button
          type="button"
          onClick={createBlankLesson}
          className="min-h-11 rounded-md border border-jade/60 bg-jade/15 px-4 text-sm font-bold text-jade transition hover:bg-jade/25"
        >
          + Séance vide
        </button>
        <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
          Partir d&apos;un modèle
          <select
            value={selectedTemplate}
            onChange={(event) => setSelectedTemplate(event.target.value as LessonTemplateId)}
            className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
          >
            {lessonTemplates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={createFromTemplate}
          className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-jade/40"
        >
          Créer depuis ce modèle
        </button>
        <button
          type="button"
          onClick={() => setShowImportPicker(true)}
          className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-jade/40"
        >
          Importer depuis la progression
        </button>
      </section>

      <section aria-labelledby="liste-seances">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="liste-seances" className="text-xl font-black text-foreground">
            {showArchived ? "Séances archivées" : "Mes séances"}
          </h2>
          <button
            type="button"
            onClick={() => setShowArchived((value) => !value)}
            className="min-h-9 rounded-md border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-jade/40"
          >
            {showArchived ? "Voir les séances actives" : "Voir les séances archivées"}
          </button>
        </div>

        {visibleLessons.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            {showArchived ? "Aucune séance archivée." : "Aucune séance pour le moment."}
          </p>
        ) : (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {visibleLessons.map((lesson) => {
              const meta = statusMeta(lesson.status);
              return (
                <li
                  key={lesson.id}
                  className="flex flex-col gap-3 rounded-lg border border-white/10 bg-background/40 p-4"
                >
                  <button
                    type="button"
                    onClick={() => openLesson(lesson.id)}
                    className="text-left"
                  >
                    <span className="block text-base font-black text-foreground">
                      {lesson.title || "(sans titre)"}
                    </span>
                    <span className="mt-1 block text-xs text-muted">
                      {levelLabel(lesson.level)} · {subjectLabel(lesson.subject)}
                      {lesson.duration ? ` · ${lesson.duration}` : ""}
                    </span>
                    <span
                      className="mt-2 inline-flex items-center gap-1 rounded border border-white/20 px-1.5 py-0.5 text-[11px] font-bold text-foreground"
                      aria-label={`Statut : ${meta.label}`}
                    >
                      <span aria-hidden="true">{meta.symbol}</span>
                      {meta.label}
                    </span>
                  </button>
                  <div className="flex flex-wrap gap-1">
                    <button
                      type="button"
                      onClick={() => handleDuplicate(lesson)}
                      className="min-h-8 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/40"
                    >
                      Dupliquer
                    </button>
                    <button
                      type="button"
                      onClick={() => handleArchiveToggle(lesson.id)}
                      className="min-h-8 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/40"
                    >
                      {lesson.archived ? "Désarchiver" : "Archiver"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(lesson.id)}
                      className="min-h-8 rounded-md border border-ember/50 px-2 text-xs font-bold text-ember transition hover:bg-ember/10"
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {showImportPicker && (
        <ImportFromProgressionModal
          onClose={() => setShowImportPicker(false)}
          onImport={importFromProgression}
        />
      )}
    </div>
  );
}

function ImportFromProgressionModal({
  onClose,
  onImport,
}: {
  onClose: () => void;
  onImport: (card: ProgressionCard) => void;
}) {
  const [cards] = useState<ProgressionCard[]>(() => readProgressionCards());
  const titleId = useId();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-white/15 bg-background p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-xl font-black text-foreground">
            Importer depuis la progression de période
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            autoFocus
            className="min-h-8 min-w-8 rounded-md border border-white/15 px-2 text-sm font-bold text-foreground"
          >
            ✕
          </button>
        </div>

        {cards.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            Aucune carte trouvée dans l&apos;outil « Progression de période ».
            Créez d&apos;abord des séquences dans cet outil.
          </p>
        ) : (
          <ul className="mt-4 space-y-2" role="list">
            {cards.map((card) => (
              <li
                key={card.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-white/10 bg-background/30 p-3"
              >
                <span className="text-sm font-bold text-foreground">
                  {card.competenceLabel || "(sans intitulé)"}
                  <span className="ml-2 text-xs font-medium text-muted">
                    {levelLabel(card.niveau)} ·{" "}
                    {lessonPeriods.find((item) => item.id === card.periode)?.label ?? card.periode}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => onImport(card)}
                  className="min-h-9 rounded-md border border-jade/60 bg-jade/15 px-3 text-sm font-bold text-jade transition hover:bg-jade/25"
                >
                  Importer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function AddToLogbookModal({
  lesson,
  onClose,
}: {
  lesson: TeacherLesson;
  onClose: () => void;
}) {
  const titleId = useId();
  const [weekKey, setWeekKey] = useState(() => getMondayKey(new Date()));
  const [day, setDay] = useState<LogbookDay>(logbookDays[0].id);
  const [slotId, setSlotId] = useState<LogbookSlotId>(logbookSlots[0].id);
  const [done, setDone] = useState(false);

  function confirmAdd() {
    const confirmed = window.confirm(
      `Ajouter « ${lesson.title || "cette séance"} » au cahier journal, ${formatWeekRangeLabel(weekKey)} ?`,
    );
    if (!confirmed) return;

    const data = readLogbookData();
    const week: LogbookWeekData = data[weekKey] ?? {
      specialWeekType: null,
      specialWeekNote: "",
      sessions: [],
    };
    const session = createBlankSession(day, slotId);
    session.id = createSessionId();
    session.title = lesson.title;
    session.subject = lesson.subject;
    session.level = lesson.level;
    session.durationLabel = lesson.duration;
    session.objective = lesson.objective;
    session.outline = lesson.steps.map((step) => step.instruction).filter(Boolean).join(" → ");

    const updatedWeek: LogbookWeekData = { ...week, sessions: [...week.sessions, session] };
    const updatedData = { ...data, [weekKey]: updatedWeek };
    window.localStorage.setItem(LOGBOOK_STORAGE_KEY, JSON.stringify(updatedData));
    setDone(true);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 print:hidden"
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
    >
      <div className="w-full max-w-lg rounded-lg border border-white/15 bg-background p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-xl font-black text-foreground">
            Ajouter au cahier journal
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            autoFocus
            className="min-h-8 min-w-8 rounded-md border border-white/15 px-2 text-sm font-bold text-foreground"
          >
            ✕
          </button>
        </div>

        {done ? (
          <p className="mt-4 text-sm font-bold text-jade">
            Séance ajoutée au cahier journal, {formatWeekRangeLabel(weekKey)}.
          </p>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
              Semaine
              <input
                type="date"
                onChange={(event) => {
                  if (!event.target.value) return;
                  const [y, m, d] = event.target.value.split("-").map(Number);
                  setWeekKey(getMondayKey(new Date(y, m - 1, d)));
                }}
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              />
              <span className="text-xs text-muted">{formatWeekRangeLabel(weekKey)}</span>
              <button
                type="button"
                onClick={() => setWeekKey(addDaysToKey(weekKey, 7))}
                className="self-start text-xs font-bold text-jade underline"
              >
                Semaine suivante
              </button>
            </label>
            <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
              Jour
              <select
                value={day}
                onChange={(event) => setDay(event.target.value as LogbookDay)}
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              >
                {logbookDays.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
              Créneau
              <select
                value={slotId}
                onChange={(event) => setSlotId(event.target.value as LogbookSlotId)}
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              >
                {logbookSlots.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={confirmAdd}
              className="min-h-11 rounded-md border border-jade/60 bg-jade/15 px-4 text-sm font-bold text-jade transition hover:bg-jade/25"
            >
              Confirmer l&apos;ajout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function LessonEditor({
  lesson,
  onChange,
}: {
  lesson: TeacherLesson;
  onChange: (updater: (lesson: TeacherLesson) => TeacherLesson) => void;
}) {
  function set<K extends keyof TeacherLesson>(key: K, value: TeacherLesson[K]) {
    onChange((current) => ({ ...current, [key]: value }));
  }

  function setStep(id: string, updater: (step: LessonStep) => LessonStep) {
    onChange((current) => ({
      ...current,
      steps: current.steps.map((step) => (step.id === id ? updater(step) : step)),
    }));
  }

  function addStep() {
    onChange((current) => ({ ...current, steps: [...current.steps, createEmptyStep()] }));
  }

  function removeStep(id: string) {
    onChange((current) => ({ ...current, steps: current.steps.filter((step) => step.id !== id) }));
  }

  function duplicateStep(id: string) {
    onChange((current) => {
      const index = current.steps.findIndex((step) => step.id === id);
      if (index === -1) return current;
      const copy = { ...current.steps[index], id: createEmptyStep().id };
      const steps = [...current.steps];
      steps.splice(index + 1, 0, copy);
      return { ...current, steps };
    });
  }

  function moveStep(id: string, direction: -1 | 1) {
    onChange((current) => {
      const index = current.steps.findIndex((step) => step.id === id);
      const target = index + direction;
      if (index === -1 || target < 0 || target >= current.steps.length) return current;
      const steps = [...current.steps];
      const [moved] = steps.splice(index, 1);
      steps.splice(target, 0, moved);
      return { ...current, steps };
    });
  }

  function addMaterial() {
    onChange((current) => ({
      ...current,
      materials: [...current.materials, createEmptyMaterialItem()],
    }));
  }

  function setMaterial(id: string, updater: (item: TeacherLesson["materials"][number]) => TeacherLesson["materials"][number]) {
    onChange((current) => ({
      ...current,
      materials: current.materials.map((item) => (item.id === id ? updater(item) : item)),
    }));
  }

  function removeMaterial(id: string) {
    onChange((current) => ({
      ...current,
      materials: current.materials.filter((item) => item.id !== id),
    }));
  }

  return (
    <div className="space-y-6 print:space-y-3">
      <details open className="rounded-lg border border-white/10 bg-background/45 p-4 print:border-black/30">
        <summary className="cursor-pointer text-lg font-black text-foreground">
          1. Informations essentielles
        </summary>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
            Titre
            <input
              type="text"
              value={lesson.title}
              onChange={(event) => set("title", event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Niveau
            <select
              value={lesson.level}
              onChange={(event) => set("level", event.target.value as LessonLevel)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {lessonLevels.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Matière
            <select
              value={lesson.subject}
              onChange={(event) => set("subject", event.target.value as LessonSubject)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {lessonSubjects.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Domaine
            <input
              type="text"
              value={lesson.domain}
              onChange={(event) => set("domain", event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Compétence
            <input
              type="text"
              value={lesson.competency}
              onChange={(event) => set("competency", event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
            Objectif
            <textarea
              value={lesson.objective}
              onChange={(event) => set("objective", event.target.value)}
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Période
            <select
              value={lesson.period}
              onChange={(event) => set("period", event.target.value as LessonPeriod | "")}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              <option value="">—</option>
              {lessonPeriods.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Durée
            <input
              type="text"
              value={lesson.duration}
              onChange={(event) => set("duration", event.target.value)}
              placeholder="45 min"
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Statut
            <select
              value={lesson.status}
              onChange={(event) => set("status", event.target.value as LessonStatus)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {lessonStatuses.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </details>

      <details className="rounded-lg border border-white/10 bg-background/45 p-4 print:border-black/30">
        <summary className="cursor-pointer text-lg font-black text-foreground">
          2. Situation de départ
        </summary>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
            Contexte
            <textarea
              value={lesson.context}
              onChange={(event) => set("context", event.target.value)}
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
            Question de départ
            <input
              type="text"
              value={lesson.startingQuestion}
              onChange={(event) => set("startingQuestion", event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
            Consigne initiale
            <textarea
              value={lesson.initialInstruction}
              onChange={(event) => set("initialInstruction", event.target.value)}
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
            Production attendue
            <textarea
              value={lesson.expectedOutput}
              onChange={(event) => set("expectedOutput", event.target.value)}
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
        </div>
      </details>

      <details open className="rounded-lg border border-white/10 bg-background/45 p-4 print:border-black/30">
        <summary className="cursor-pointer text-lg font-black text-foreground">
          3. Déroulé modulable
        </summary>
        <ul className="mt-4 space-y-3" role="list">
          {lesson.steps.map((step, index) => (
            <li
              key={step.id}
              className="rounded-md border border-white/15 bg-background/30 p-3 print:border-black/30"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 print:hidden">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                  Étape {index + 1}
                </span>
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    onClick={() => moveStep(step.id, -1)}
                    disabled={index === 0}
                    aria-label="Monter l'étape"
                    className="min-h-8 min-w-8 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/50 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveStep(step.id, 1)}
                    disabled={index === lesson.steps.length - 1}
                    aria-label="Descendre l'étape"
                    className="min-h-8 min-w-8 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/50 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => duplicateStep(step.id)}
                    className="min-h-8 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/40"
                  >
                    Dupliquer
                  </button>
                  <button
                    type="button"
                    onClick={() => removeStep(step.id)}
                    className="min-h-8 rounded-md border border-ember/50 px-2 text-xs font-bold text-ember transition hover:bg-ember/10"
                  >
                    Supprimer
                  </button>
                </div>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
                  Durée
                  <input
                    type="text"
                    value={step.durationLabel}
                    onChange={(event) =>
                      setStep(step.id, (current) => ({ ...current, durationLabel: event.target.value }))
                    }
                    placeholder="10 min"
                    className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
                  Modalité
                  <select
                    value={step.modality}
                    onChange={(event) =>
                      setStep(step.id, (current) => ({
                        ...current,
                        modality: event.target.value as LessonStep["modality"],
                      }))
                    }
                    className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
                  >
                    {lessonModalities.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
                  Consigne
                  <textarea
                    value={step.instruction}
                    onChange={(event) =>
                      setStep(step.id, (current) => ({ ...current, instruction: event.target.value }))
                    }
                    rows={2}
                    className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
                  Rôle de l&apos;enseignant
                  <textarea
                    value={step.teacherRole}
                    onChange={(event) =>
                      setStep(step.id, (current) => ({ ...current, teacherRole: event.target.value }))
                    }
                    rows={2}
                    className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
                  Activité des élèves
                  <textarea
                    value={step.studentActivity}
                    onChange={(event) =>
                      setStep(step.id, (current) => ({ ...current, studentActivity: event.target.value }))
                    }
                    rows={2}
                    className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
                  Matériel
                  <input
                    type="text"
                    value={step.material}
                    onChange={(event) =>
                      setStep(step.id, (current) => ({ ...current, material: event.target.value }))
                    }
                    className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
                  Vigilance pédagogique
                  <input
                    type="text"
                    value={step.vigilance}
                    onChange={(event) =>
                      setStep(step.id, (current) => ({ ...current, vigilance: event.target.value }))
                    }
                    className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
                  />
                </label>
              </div>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={addStep}
          className="mt-3 min-h-9 rounded-md border border-dashed border-white/20 px-3 text-xs font-bold text-muted transition hover:border-jade/40 hover:text-jade print:hidden"
        >
          + Ajouter une étape
        </button>
      </details>

      <details className="rounded-lg border border-white/10 bg-background/45 p-4 print:border-black/30">
        <summary className="cursor-pointer text-lg font-black text-foreground">
          4. Différenciation
        </summary>
        <div className="mt-4 grid gap-3">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Guidage renforcé
            <textarea
              value={lesson.differentiation.reinforcedGuidance}
              onChange={(event) =>
                set("differentiation", { ...lesson.differentiation, reinforcedGuidance: event.target.value })
              }
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Parcours standard
            <textarea
              value={lesson.differentiation.standardPath}
              onChange={(event) =>
                set("differentiation", { ...lesson.differentiation, standardPath: event.target.value })
              }
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Autonomie / approfondissement
            <textarea
              value={lesson.differentiation.autonomyExtension}
              onChange={(event) =>
                set("differentiation", { ...lesson.differentiation, autonomyExtension: event.target.value })
              }
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
        </div>
      </details>

      <details className="rounded-lg border border-white/10 bg-background/45 p-4 print:border-black/30">
        <summary className="cursor-pointer text-lg font-black text-foreground">
          5. Évaluation
        </summary>
        <div className="mt-4 grid gap-3">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Critères de réussite
            <textarea
              value={lesson.evaluation.successCriteria}
              onChange={(event) =>
                set("evaluation", { ...lesson.evaluation, successCriteria: event.target.value })
              }
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Erreurs attendues
            <textarea
              value={lesson.evaluation.expectedErrors}
              onChange={(event) =>
                set("evaluation", { ...lesson.evaluation, expectedErrors: event.target.value })
              }
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Observation
            <textarea
              value={lesson.evaluation.observation}
              onChange={(event) =>
                set("evaluation", { ...lesson.evaluation, observation: event.target.value })
              }
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Suite à donner
            <textarea
              value={lesson.evaluation.followUp}
              onChange={(event) => set("evaluation", { ...lesson.evaluation, followUp: event.target.value })}
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
        </div>
      </details>

      <details className="rounded-lg border border-white/10 bg-background/45 p-4 print:border-black/30">
        <summary className="cursor-pointer text-lg font-black text-foreground">
          6. Matériel et supports
        </summary>
        <ul className="mt-4 space-y-2" role="list">
          {lesson.materials.map((item) => (
            <li key={item.id} className="flex flex-wrap items-center gap-2">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(event) =>
                  setMaterial(item.id, (current) => ({ ...current, checked: event.target.checked }))
                }
                className="h-4 w-4"
              />
              <input
                type="text"
                value={item.label}
                onChange={(event) =>
                  setMaterial(item.id, (current) => ({ ...current, label: event.target.value }))
                }
                placeholder="Manuel, fiche, matériel de manipulation..."
                className="min-h-9 flex-1 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              />
              <input
                type="text"
                value={item.link}
                onChange={(event) =>
                  setMaterial(item.id, (current) => ({ ...current, link: event.target.value }))
                }
                placeholder="Lien réel (optionnel)"
                className="min-h-9 w-48 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground print:hidden"
              />
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-jade underline"
                >
                  Ouvrir
                </a>
              ) : null}
              <button
                type="button"
                onClick={() => removeMaterial(item.id)}
                className="min-h-8 rounded-md border border-ember/50 px-2 text-xs font-bold text-ember transition hover:bg-ember/10 print:hidden"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={addMaterial}
          className="mt-3 min-h-9 rounded-md border border-dashed border-white/20 px-3 text-xs font-bold text-muted transition hover:border-jade/40 hover:text-jade print:hidden"
        >
          + Ajouter un élément
        </button>
        <p className="mt-2 text-xs text-muted print:hidden">
          N&apos;ajoutez un lien que s&apos;il pointe vers une ressource réelle. Jamais de faux PDF.
        </p>
      </details>

      <details className="rounded-lg border border-white/10 bg-background/45 p-4 print:border-black/30">
        <summary className="cursor-pointer text-lg font-black text-foreground">
          7. Trace écrite et bilan enseignant
        </summary>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
            Trace prévue
            <textarea
              value={lesson.wrapUp.writtenTrace}
              onChange={(event) => set("wrapUp", { ...lesson.wrapUp, writtenTrace: event.target.value })}
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
            Devoir
            <input
              type="text"
              value={lesson.wrapUp.homework}
              onChange={(event) => set("wrapUp", { ...lesson.wrapUp, homework: event.target.value })}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
            Retour après séance
            <textarea
              value={lesson.wrapUp.feedbackAfter}
              onChange={(event) => set("wrapUp", { ...lesson.wrapUp, feedbackAfter: event.target.value })}
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Durée réelle
            <input
              type="text"
              value={lesson.wrapUp.actualDuration}
              onChange={(event) => set("wrapUp", { ...lesson.wrapUp, actualDuration: event.target.value })}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
            Ajustements
            <textarea
              value={lesson.wrapUp.adjustments}
              onChange={(event) => set("wrapUp", { ...lesson.wrapUp, adjustments: event.target.value })}
              rows={2}
              className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
            />
          </label>
        </div>
      </details>
    </div>
  );
}
