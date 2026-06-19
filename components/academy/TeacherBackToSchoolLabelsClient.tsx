"use client";

import { useEffect, useState } from "react";
import {
  buildCustomEntryId,
  getDefaultTeacherBackToSchoolLabelsState,
  parseStudentNames,
  studentLabelFormats,
  TEACHER_BACK_TO_SCHOOL_LABELS_STORAGE_KEY,
  type ChecklistDocument,
  type ClassMarker,
  type DocumentStatus,
  type StudentLabelFormatId,
  type StudentNameMode,
  type TeacherBackToSchoolLabelsState,
} from "@/content/teacher-back-to-school-labels";

type TabId = "etiquettes" | "reperes" | "documents";

const TABS: { id: TabId; label: string }[] = [
  { id: "etiquettes", label: "Étiquettes élèves" },
  { id: "reperes", label: "Repères de classe" },
  { id: "documents", label: "Documents de rentrée" },
];

const LABEL_FORMAT_SIZE_CLASSES: Record<StudentLabelFormatId, string> = {
  cahier: "min-h-12 min-w-24 text-sm",
  "porte-manteau": "min-h-24 min-w-48 text-2xl",
  casier: "min-h-16 min-w-36 text-lg",
  boite: "min-h-16 min-w-36 text-lg",
};

function readStoredState(): TeacherBackToSchoolLabelsState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(
      TEACHER_BACK_TO_SCHOOL_LABELS_STORAGE_KEY,
    );
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as TeacherBackToSchoolLabelsState;
    if (
      !parsed ||
      typeof parsed.studentNamesText !== "string" ||
      !Array.isArray(parsed.classMarkers) ||
      !Array.isArray(parsed.documents)
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function TeacherBackToSchoolLabelsClient() {
  const [activeTab, setActiveTab] = useState<TabId>("etiquettes");
  const [state, setState] = useState<TeacherBackToSchoolLabelsState>(
    () => readStoredState() ?? getDefaultTeacherBackToSchoolLabelsState(),
  );
  const [newMarkerLabel, setNewMarkerLabel] = useState("");
  const [newDocumentLabel, setNewDocumentLabel] = useState("");

  useEffect(() => {
    window.localStorage.setItem(
      TEACHER_BACK_TO_SCHOOL_LABELS_STORAGE_KEY,
      JSON.stringify(state),
    );
  }, [state]);

  const studentNames = parseStudentNames(
    state.studentNamesText,
    state.studentNameMode,
  );

  function handleNameModeChange(mode: StudentNameMode) {
    setState((previous) => ({ ...previous, studentNameMode: mode }));
  }

  function handleFormatChange(format: StudentLabelFormatId) {
    setState((previous) => ({ ...previous, labelFormat: format }));
  }

  function handleNamesTextChange(text: string) {
    setState((previous) => ({ ...previous, studentNamesText: text }));
  }

  function handleAddMarker() {
    const label = newMarkerLabel.trim();
    if (!label) {
      return;
    }
    const marker: ClassMarker = {
      id: buildCustomEntryId("repere", label),
      label,
      isCustom: true,
    };
    setState((previous) => ({
      ...previous,
      classMarkers: [...previous.classMarkers, marker],
    }));
    setNewMarkerLabel("");
  }

  function handleRemoveMarker(id: string) {
    setState((previous) => ({
      ...previous,
      classMarkers: previous.classMarkers.filter((marker) => marker.id !== id),
    }));
  }

  function handleAddDocument() {
    const label = newDocumentLabel.trim();
    if (!label) {
      return;
    }
    const document: ChecklistDocument = {
      id: buildCustomEntryId("document", label),
      label,
      isCustom: true,
      status: "a-faire",
    };
    setState((previous) => ({
      ...previous,
      documents: [...previous.documents, document],
    }));
    setNewDocumentLabel("");
  }

  function handleRemoveDocument(id: string) {
    setState((previous) => ({
      ...previous,
      documents: previous.documents.filter((document) => document.id !== id),
    }));
  }

  function handleToggleDocumentStatus(id: string) {
    setState((previous) => ({
      ...previous,
      documents: previous.documents.map((document) => {
        if (document.id !== id) {
          return document;
        }
        const nextStatus: DocumentStatus =
          document.status === "pret" ? "a-faire" : "pret";
        return { ...document, status: nextStatus };
      }),
    }));
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="mt-10">
      <div
        role="tablist"
        aria-label="Sections étiquettes et documents de rentrée"
        className="print:hidden flex flex-wrap gap-2"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeTab}
            onClick={() => setActiveTab(tab.id)}
            className={[
              "min-h-11 rounded-md border px-4 text-sm font-bold transition",
              tab.id === activeTab
                ? "border-jade/60 bg-jade/10 text-jade"
                : "border-white/10 bg-white/[0.04] text-foreground hover:border-jade/40",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "etiquettes" ? (
        <section aria-label="Étiquettes élèves" className="mt-8">
          <div className="print:hidden grid gap-6 rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:grid-cols-2 sm:p-6">
            <div>
              <p className="text-sm font-bold text-foreground">
                Prénoms ou initiales
              </p>
              <p className="mt-1 text-sm leading-6 text-muted">
                Un nom par ligne. Aucune autre information n’est demandée.
              </p>
              <label htmlFor="student-names" className="sr-only">
                Liste des prénoms, un par ligne
              </label>
              <textarea
                id="student-names"
                value={state.studentNamesText}
                onChange={(event) => handleNamesTextChange(event.target.value)}
                rows={8}
                placeholder={"Léa\nNoah\nIris"}
                className="mt-3 w-full rounded-md border border-white/10 bg-background/45 p-3 text-sm text-foreground"
              />
            </div>

            <div className="grid gap-5">
              <div>
                <p className="text-sm font-bold text-foreground">Affichage</p>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleNameModeChange("prenom")}
                    aria-pressed={state.studentNameMode === "prenom"}
                    className={[
                      "min-h-11 flex-1 rounded-md border px-3 text-sm font-bold transition",
                      state.studentNameMode === "prenom"
                        ? "border-jade/60 bg-jade/10 text-jade"
                        : "border-white/10 bg-white/[0.04] text-foreground",
                    ].join(" ")}
                  >
                    Prénom
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNameModeChange("initiales")}
                    aria-pressed={state.studentNameMode === "initiales"}
                    className={[
                      "min-h-11 flex-1 rounded-md border px-3 text-sm font-bold transition",
                      state.studentNameMode === "initiales"
                        ? "border-jade/60 bg-jade/10 text-jade"
                        : "border-white/10 bg-white/[0.04] text-foreground",
                    ].join(" ")}
                  >
                    Initiales
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-foreground">Format</p>
                <div className="mt-2 grid gap-2">
                  {studentLabelFormats.map((format) => (
                    <button
                      key={format.id}
                      type="button"
                      onClick={() => handleFormatChange(format.id)}
                      aria-pressed={state.labelFormat === format.id}
                      className={[
                        "min-h-11 rounded-md border px-3 text-left text-sm font-bold transition",
                        state.labelFormat === format.id
                          ? "border-jade/60 bg-jade/10 text-jade"
                          : "border-white/10 bg-white/[0.04] text-foreground hover:border-jade/40",
                      ].join(" ")}
                    >
                      {format.label}
                      <span className="block text-xs font-normal text-muted">
                        {format.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handlePrint}
                className="min-h-11 rounded-md border border-sky/35 bg-sky/10 px-4 text-sm font-black text-sky transition hover:bg-sky hover:text-ink"
              >
                Imprimer les étiquettes
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-5 print:border-0 print:bg-white print:p-0 sm:p-6">
            <p className="text-sm font-bold text-foreground print:hidden">
              Aperçu avant impression
            </p>
            {studentNames.length > 0 ? (
              <ul
                role="list"
                className="mt-4 flex flex-wrap gap-3 print:mt-0 print:gap-2"
              >
                {studentNames.map((name, index) => (
                  <li
                    key={`${name}-${index}`}
                    className={[
                      "flex items-center justify-center rounded-md border border-white/15 bg-background/45 px-4 font-bold text-foreground print:rounded-none print:border print:border-black print:bg-white print:text-black",
                      LABEL_FORMAT_SIZE_CLASSES[state.labelFormat],
                    ].join(" ")}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm leading-7 text-muted print:hidden">
                Saisissez au moins un prénom ou des initiales pour voir
                l’aperçu.
              </p>
            )}
          </div>
        </section>
      ) : null}

      {activeTab === "reperes" ? (
        <section aria-label="Repères de classe" className="mt-8">
          <div className="print:hidden flex flex-wrap items-end gap-3 rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6">
            <div className="flex-1">
              <label
                htmlFor="new-marker"
                className="text-sm font-bold text-foreground"
              >
                Ajouter un repère personnalisé
              </label>
              <input
                id="new-marker"
                type="text"
                value={newMarkerLabel}
                onChange={(event) => setNewMarkerLabel(event.target.value)}
                placeholder="Ex. Coin lecture"
                className="mt-2 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
              />
            </div>
            <button
              type="button"
              onClick={handleAddMarker}
              className="min-h-11 rounded-md border border-sky/35 bg-sky/10 px-4 text-sm font-black text-sky transition hover:bg-sky hover:text-ink"
            >
              Ajouter
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
            >
              Imprimer les repères
            </button>
          </div>

          <ul
            role="list"
            className="mt-6 grid gap-3 sm:grid-cols-2 print:mt-0 print:grid-cols-3 print:gap-2"
          >
            {state.classMarkers.map((marker) => (
              <li
                key={marker.id}
                className="flex min-h-12 items-center justify-between rounded-md border border-white/10 bg-background/45 px-4 text-sm font-bold text-foreground print:rounded-none print:border-black print:bg-white print:text-black"
              >
                {marker.label}
                <button
                  type="button"
                  onClick={() => handleRemoveMarker(marker.id)}
                  className="print:hidden text-xs font-bold text-muted transition hover:text-ember"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {activeTab === "documents" ? (
        <section aria-label="Documents de rentrée" className="mt-8">
          <div className="print:hidden flex flex-wrap items-end gap-3 rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6">
            <div className="flex-1">
              <label
                htmlFor="new-document"
                className="text-sm font-bold text-foreground"
              >
                Ajouter un document personnalisé
              </label>
              <input
                id="new-document"
                type="text"
                value={newDocumentLabel}
                onChange={(event) => setNewDocumentLabel(event.target.value)}
                placeholder="Ex. Cahier de liaison"
                className="mt-2 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
              />
            </div>
            <button
              type="button"
              onClick={handleAddDocument}
              className="min-h-11 rounded-md border border-sky/35 bg-sky/10 px-4 text-sm font-black text-sky transition hover:bg-sky hover:text-ink"
            >
              Ajouter
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
            >
              Imprimer la checklist
            </button>
          </div>

          <ul role="list" className="mt-6 grid gap-3 print:mt-0">
            {state.documents.map((document) => (
              <li
                key={document.id}
                className="flex min-h-12 items-center justify-between gap-3 rounded-md border border-white/10 bg-background/45 px-4 text-sm font-bold text-foreground print:rounded-none print:border-black print:bg-white print:text-black"
              >
                <span>{document.label}</span>
                <span className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggleDocumentStatus(document.id)}
                    aria-pressed={document.status === "pret"}
                    className={[
                      "min-h-9 rounded-md border px-3 text-xs font-bold transition print:border-black",
                      document.status === "pret"
                        ? "border-jade/60 bg-jade/10 text-jade"
                        : "border-gold/40 bg-gold/[0.08] text-gold",
                    ].join(" ")}
                  >
                    {document.status === "pret" ? "Prêt" : "À faire"}
                  </button>
                  {document.isCustom ? (
                    <button
                      type="button"
                      onClick={() => handleRemoveDocument(document.id)}
                      className="print:hidden text-xs font-bold text-muted transition hover:text-ember"
                    >
                      Supprimer
                    </button>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
