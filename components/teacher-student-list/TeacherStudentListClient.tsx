"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  buildTeacherStudentListExport,
  createTeacherStudentId,
  getTeacherStudentColorTag,
  moveTeacherStudent,
  parseTeacherStudentListImport,
  readTeacherStudentsChecked,
  teacherStudentColorTags,
  teacherStudentDisplayName,
  writeTeacherStudents,
  type TeacherStudent,
  type TeacherStudentColorTagId,
} from "@/lib/teacher-students-local";

type FormState = {
  id: string | null;
  firstName: string;
  lastName: string;
  group: string;
  note: string;
  colorTagId: TeacherStudentColorTagId | "";
};

const emptyForm: FormState = {
  id: null,
  firstName: "",
  lastName: "",
  group: "",
  note: "",
  colorTagId: "",
};

function fileDateSuffix(): string {
  return new Date().toISOString().slice(0, 10);
}

export function TeacherStudentListClient() {
  const initial = useMemo(() => readTeacherStudentsChecked(), []);
  const [students, setStudents] = useState<TeacherStudent[]>(
    initial.students,
  );
  const [storageNotice, setStorageNotice] = useState<string | null>(
    !initial.storageAvailable
      ? "Le stockage local n'est pas disponible (navigation privée ou bloqué) : vos modifications ne seront pas sauvegardées."
      : initial.wasReset
        ? "Certains élèves enregistrés étaient illisibles et ont été ignorés."
        : null,
  );
  const [form, setForm] = useState<FormState>(emptyForm);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [pendingImport, setPendingImport] = useState<TeacherStudent[] | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formTitleId = useId();

  useEffect(() => {
    writeTeacherStudents(students);
  }, [students]);

  function resetForm() {
    setForm(emptyForm);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const firstName = form.firstName.trim();
    if (!firstName) return;

    const lastName = form.lastName.trim() || undefined;
    const group = form.group.trim() || undefined;
    const note = form.note.trim() || undefined;
    const colorTagId = form.colorTagId || undefined;

    if (form.id) {
      setStudents((previous) =>
        previous.map((student) =>
          student.id === form.id
            ? { ...student, firstName, lastName, group, note, colorTagId }
            : student,
        ),
      );
    } else {
      const newStudent: TeacherStudent = {
        id: createTeacherStudentId(),
        firstName,
        lastName,
        group,
        note,
        colorTagId,
      };
      setStudents((previous) => [...previous, newStudent]);
    }

    resetForm();
  }

  function handleEdit(student: TeacherStudent) {
    setForm({
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName ?? "",
      group: student.group ?? "",
      note: student.note ?? "",
      colorTagId: student.colorTagId ?? "",
    });
  }

  function handleDeleteRequest(id: string) {
    setPendingDeleteId(id);
  }

  function handleDeleteConfirm() {
    if (!pendingDeleteId) return;
    setStudents((previous) =>
      previous.filter((student) => student.id !== pendingDeleteId),
    );
    if (form.id === pendingDeleteId) resetForm();
    setPendingDeleteId(null);
  }

  function handleDeleteCancel() {
    setPendingDeleteId(null);
  }

  function handleMove(index: number, direction: -1 | 1) {
    setStudents((previous) => moveTeacherStudent(previous, index, direction));
  }

  function handlePrint() {
    window.print();
  }

  function handleExport() {
    const file = buildTeacherStudentListExport(students);
    const blob = new Blob([JSON.stringify(file, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `academie-kerboeuf-liste-eleves-${fileDateSuffix()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleFileSelected(fileList: FileList | null) {
    setImportError(null);
    const file = fileList?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as unknown;
        const imported = parseTeacherStudentListImport(parsed);
        if (!imported) {
          setImportError(
            "Ce fichier n'est pas reconnu comme un export de liste d'élèves valide.",
          );
          return;
        }
        setPendingImport(imported);
      } catch {
        setImportError("Ce fichier JSON est invalide ou corrompu.");
      }
    };
    reader.onerror = () => {
      setImportError("Impossible de lire ce fichier.");
    };
    reader.readAsText(file);
  }

  function handleConfirmImport() {
    if (!pendingImport) return;
    setStudents(pendingImport);
    setPendingImport(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleCancelImport() {
    setPendingImport(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="mt-10 space-y-8 print:mt-0 print:space-y-4">
      {storageNotice ? (
        <div
          role="status"
          className="flex items-start justify-between gap-4 rounded-lg border border-amber/40 bg-amber/10 p-4 text-sm text-amber print:hidden"
        >
          <p>{storageNotice}</p>
          <button
            type="button"
            onClick={() => setStorageNotice(null)}
            className="shrink-0 text-xs font-semibold uppercase tracking-wide text-amber underline"
          >
            Fermer
          </button>
        </div>
      ) : null}

      <p className="text-xs font-medium text-muted print:hidden">
        Données enregistrées uniquement sur cet appareil.
      </p>

      <section
        aria-labelledby={formTitleId}
        className="rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6 print:hidden"
      >
        <h2 id={formTitleId} className="text-xl font-black text-foreground">
          {form.id ? "Modifier l'élève" : "Ajouter un élève"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="tsl-firstname"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Prénom *
            </label>
            <input
              id="tsl-firstname"
              type="text"
              required
              value={form.firstName}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  firstName: event.target.value,
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="tsl-lastname"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Nom
            </label>
            <input
              id="tsl-lastname"
              type="text"
              value={form.lastName}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  lastName: event.target.value,
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="tsl-group"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Groupe
            </label>
            <input
              id="tsl-group"
              type="text"
              value={form.group}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  group: event.target.value,
                }))
              }
              placeholder="Groupe 1, Rouge, Lecteurs..."
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="tsl-color"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Couleur / étiquette
            </label>
            <select
              id="tsl-color"
              value={form.colorTagId}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  colorTagId: event.target.value as
                    | TeacherStudentColorTagId
                    | "",
                }))
              }
              className="mt-1 min-h-11 w-full rounded-md border border-white/10 bg-background/45 px-3 text-sm text-foreground"
            >
              <option value="">Aucune</option>
              {teacherStudentColorTags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="tsl-note"
              className="block text-xs font-bold uppercase tracking-wide text-muted"
            >
              Remarque
            </label>
            <textarea
              id="tsl-note"
              rows={2}
              value={form.note}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  note: event.target.value,
                }))
              }
              className="mt-1 w-full rounded-md border border-white/10 bg-background/45 px-3 py-2 text-sm text-foreground"
            />
          </div>

          <div className="sm:col-span-2 flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-jade/50 bg-jade/10 px-4 text-sm font-black text-jade transition hover:bg-jade/20"
            >
              {form.id ? "Enregistrer les modifications" : "Ajouter à la liste"}
            </button>
            {form.id ? (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
              >
                Annuler
              </button>
            ) : null}
          </div>
        </form>
      </section>

      <section
        aria-label="Liste de la classe"
        className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
          <h2 className="text-xl font-black text-foreground">
            Élèves ({students.length})
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleExport}
              disabled={students.length === 0}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade disabled:cursor-not-allowed disabled:opacity-40"
            >
              Exporter
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
            >
              Importer
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              onChange={(event) => handleFileSelected(event.target.files)}
              className="hidden"
            />
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
            >
              Imprimer la liste
            </button>
          </div>
        </div>
        <h2 className="hidden text-xl font-black text-foreground print:block">
          Liste de la classe
        </h2>

        {importError ? (
          <p
            role="alert"
            className="mt-4 rounded-md border border-ember/40 bg-ember/10 p-3 text-sm text-ember print:hidden"
          >
            {importError}
          </p>
        ) : null}

        {students.length === 0 ? (
          <p className="mt-4 text-sm leading-7 text-muted">
            Aucun élève n’a encore été ajouté.
          </p>
        ) : (
          <ul className="mt-5 grid gap-3" role="list">
            {students.map((student, index) => {
              const colorTag = getTeacherStudentColorTag(student.colorTagId);
              return (
                <li
                  key={student.id}
                  className="rounded-md border border-white/10 bg-background/45 p-4 print:break-inside-avoid"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {colorTag ? (
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-3 w-3 shrink-0 rounded-full"
                          style={{ backgroundColor: colorTag.hex }}
                        />
                      ) : null}
                      <div>
                        <p className="text-base font-black text-foreground">
                          {teacherStudentDisplayName(student)}
                        </p>
                        <p className="mt-1 text-sm text-muted">
                          {[student.group, colorTag?.label]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                        {student.note ? (
                          <p className="mt-2 text-sm leading-6 text-muted">
                            {student.note}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1 print:hidden">
                      <button
                        type="button"
                        onClick={() => handleMove(index, -1)}
                        disabled={index === 0}
                        aria-label={`Monter ${teacherStudentDisplayName(student)}`}
                        className="min-h-8 min-w-8 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/50 hover:text-jade disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMove(index, 1)}
                        disabled={index === students.length - 1}
                        aria-label={`Descendre ${teacherStudentDisplayName(student)}`}
                        className="min-h-8 min-w-8 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/50 hover:text-jade disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEdit(student)}
                        className="ml-1 inline-flex min-h-9 items-center justify-center rounded-md border border-white/15 px-3 text-xs font-bold text-foreground transition hover:border-jade/50 hover:text-jade"
                      >
                        Modifier
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteRequest(student.id)}
                        className="inline-flex min-h-9 items-center justify-center rounded-md border border-ember/40 px-3 text-xs font-bold text-ember transition hover:bg-ember/10"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {pendingDeleteId ? (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-label="Confirmer la suppression"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 print:hidden"
        >
          <div className="max-w-sm rounded-lg border border-white/10 bg-background p-6">
            <p className="text-base font-black text-foreground">
              Supprimer cet élève ?
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Cette action est définitive et ne peut pas être annulée.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-ember/50 bg-ember/10 px-4 text-sm font-black text-ember transition hover:bg-ember/20"
              >
                Supprimer
              </button>
              <button
                type="button"
                onClick={handleDeleteCancel}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {pendingImport ? (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-label="Confirmer l'import"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 print:hidden"
        >
          <div className="max-w-sm rounded-lg border border-white/10 bg-background p-6">
            <p className="text-base font-black text-foreground">
              Remplacer la liste actuelle ?
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Ce fichier contient {pendingImport.length} élève
              {pendingImport.length > 1 ? "s" : ""}. La liste actuelle (
              {students.length} élève{students.length > 1 ? "s" : ""}) sera
              remplacée. Cette action ne peut pas être annulée.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleConfirmImport}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-jade/50 bg-jade/10 px-4 text-sm font-black text-jade transition hover:bg-jade/20"
              >
                Remplacer
              </button>
              <button
                type="button"
                onClick={handleCancelImport}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-black text-foreground transition hover:border-jade/50 hover:text-jade"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
