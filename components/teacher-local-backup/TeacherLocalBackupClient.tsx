"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  TEACHER_BACKUP_FORMAT_VERSION,
  teacherBackupTools,
  type TeacherBackupToolId,
} from "@/content/teacher-local-backup";

const HISTORY_STORAGE_KEY = "academie-kerboeuf-sauvegardes-historique-v1";
const LAST_BACKUP_STORAGE_KEY = "academie-kerboeuf-sauvegardes-derniere-v1";
const HISTORY_LIMIT = 8;

type BackupFile = {
  formatVersion: number;
  createdAt: string;
  tools: TeacherBackupToolId[];
  data: Partial<Record<TeacherBackupToolId, string | null>>;
};

type HistoryEntry = {
  date: string;
  action: "export-global" | "export-outil" | "import";
  tools: string[];
};

type ImportChoice = "remplacer" | "fusionner" | "annuler";

type DetectedTool = {
  id: TeacherBackupToolId;
  label: string;
  hasIncomingData: boolean;
  hasExistingData: boolean;
  canMerge: boolean;
};

function readHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

function pushHistory(entry: HistoryEntry) {
  if (typeof window === "undefined") return;
  const next = [entry, ...readHistory()].slice(0, HISTORY_LIMIT);
  window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(next));
}

function readLastBackupDate(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(LAST_BACKUP_STORAGE_KEY);
}

function markBackupDate(date: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LAST_BACKUP_STORAGE_KEY, date);
}

function formatDate(iso: string | null): string {
  if (!iso) return "jamais";
  try {
    return new Date(iso).toLocaleString("fr-FR", {
      dateStyle: "long",
      timeStyle: "short",
    });
  } catch {
    return "jamais";
  }
}

function fileDateSuffix(): string {
  return new Date().toISOString().slice(0, 10);
}

function buildBackupFile(toolIds: TeacherBackupToolId[]): BackupFile {
  const data: Partial<Record<TeacherBackupToolId, string | null>> = {};
  for (const id of toolIds) {
    const tool = teacherBackupTools.find((candidate) => candidate.id === id);
    if (!tool) continue;
    data[id] =
      typeof window === "undefined"
        ? null
        : window.localStorage.getItem(tool.storageKey);
  }
  return {
    formatVersion: TEACHER_BACKUP_FORMAT_VERSION,
    createdAt: new Date().toISOString(),
    tools: toolIds,
    data,
  };
}

function downloadJson(file: BackupFile, filenameSuffix: string) {
  const blob = new Blob([JSON.stringify(file, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `academie-kerboeuf-sauvegarde-enseignant-${filenameSuffix}-${fileDateSuffix()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function isKnownToolId(value: unknown): value is TeacherBackupToolId {
  return (
    typeof value === "string" &&
    teacherBackupTools.some((tool) => tool.id === value)
  );
}

function validateBackupFile(value: unknown): BackupFile | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Record<string, unknown>;
  if (typeof candidate.formatVersion !== "number") return null;
  if (candidate.formatVersion < 1) return null;
  if (candidate.formatVersion > TEACHER_BACKUP_FORMAT_VERSION) return null;
  if (typeof candidate.createdAt !== "string") return null;
  if (!Array.isArray(candidate.tools)) return null;
  if (!candidate.tools.every(isKnownToolId)) return null;
  if (!candidate.data || typeof candidate.data !== "object") return null;
  const data = candidate.data as Record<string, unknown>;
  for (const value of Object.values(data)) {
    if (value !== null && typeof value !== "string") return null;
  }
  return {
    formatVersion: candidate.formatVersion,
    createdAt: candidate.createdAt,
    tools: candidate.tools as TeacherBackupToolId[],
    data: data as Partial<Record<TeacherBackupToolId, string | null>>,
  };
}

function tryParseArray(raw: string | null): unknown[] | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function mergeArrayValues(
  existingRaw: string | null,
  incomingRaw: string | null,
): string {
  const existing = tryParseArray(existingRaw) ?? [];
  const incoming = tryParseArray(incomingRaw) ?? [];
  const seen = new Set<string>();
  const merged: unknown[] = [];
  for (const item of [...existing, ...incoming]) {
    const itemId =
      item && typeof item === "object" && "id" in item
        ? String((item as { id: unknown }).id)
        : JSON.stringify(item);
    if (seen.has(itemId)) continue;
    seen.add(itemId);
    merged.push(item);
  }
  return JSON.stringify(merged);
}

export function TeacherLocalBackupClient() {
  const [lastBackupDate, setLastBackupDate] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedToolId, setSelectedToolId] =
    useState<TeacherBackupToolId>("programmation-annuelle");
  const [importError, setImportError] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<BackupFile | null>(null);
  const [importChoices, setImportChoices] = useState<
    Record<string, ImportChoice>
  >({});
  const [importDone, setImportDone] = useState<string | null>(null);
  const [overwriteConfirmPending, setOverwriteConfirmPending] =
    useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Hydration-safe mount read: localStorage must not be read during SSR/first paint.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLastBackupDate(readLastBackupDate());
    setHistory(readHistory());
    setIsMounted(true);
  }, []);

  const detectedTools: DetectedTool[] = useMemo(() => {
    if (!pendingFile) return [];
    return pendingFile.tools.map((id) => {
      const tool = teacherBackupTools.find((candidate) => candidate.id === id);
      const incomingRaw = pendingFile.data[id] ?? null;
      const existingRaw =
        tool && typeof window !== "undefined"
          ? window.localStorage.getItem(tool.storageKey)
          : null;
      return {
        id,
        label: tool?.label ?? id,
        hasIncomingData: Boolean(incomingRaw),
        hasExistingData: Boolean(existingRaw),
        canMerge: tryParseArray(incomingRaw) !== null,
      };
    });
  }, [pendingFile]);

  const toolsToOverwrite = detectedTools.filter(
    (detected) =>
      detected.hasExistingData && importChoices[detected.id] === "remplacer",
  );

  function recordExport(action: HistoryEntry["action"], tools: string[]) {
    const date = new Date().toISOString();
    markBackupDate(date);
    pushHistory({ date, action, tools });
    setLastBackupDate(date);
    setHistory(readHistory());
  }

  function handleExportAll() {
    const ids = teacherBackupTools.map((tool) => tool.id);
    const file = buildBackupFile(ids);
    downloadJson(file, "globale");
    recordExport(
      "export-global",
      teacherBackupTools.map((tool) => tool.label),
    );
  }

  function handleExportOne() {
    const tool = teacherBackupTools.find(
      (candidate) => candidate.id === selectedToolId,
    );
    if (!tool) return;
    const file = buildBackupFile([selectedToolId]);
    downloadJson(file, tool.id);
    recordExport("export-outil", [tool.label]);
  }

  function handleFileSelected(fileList: FileList | null) {
    setImportError(null);
    setImportDone(null);
    setPendingFile(null);
    setOverwriteConfirmPending(false);
    const file = fileList?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as unknown;
        const validated = validateBackupFile(parsed);
        if (!validated) {
          setImportError(
            "Ce fichier n'est pas reconnu comme une sauvegarde valide ou provient d'une version trop ancienne.",
          );
          return;
        }
        setPendingFile(validated);
        const defaults: Record<string, ImportChoice> = {};
        for (const id of validated.tools) defaults[id] = "annuler";
        setImportChoices(defaults);
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
    if (!pendingFile) return;
    const appliedLabels: string[] = [];
    for (const detected of detectedTools) {
      const choice = importChoices[detected.id] ?? "annuler";
      if (choice === "annuler") continue;
      const tool = teacherBackupTools.find(
        (candidate) => candidate.id === detected.id,
      );
      if (!tool) continue;
      const incomingRaw = pendingFile.data[detected.id] ?? null;
      if (incomingRaw === null) continue;
      if (choice === "remplacer") {
        window.localStorage.setItem(tool.storageKey, incomingRaw);
        appliedLabels.push(`${tool.label} (remplacé)`);
      } else if (choice === "fusionner" && detected.canMerge) {
        const existingRaw = window.localStorage.getItem(tool.storageKey);
        window.localStorage.setItem(
          tool.storageKey,
          mergeArrayValues(existingRaw, incomingRaw),
        );
        appliedLabels.push(`${tool.label} (fusionné)`);
      }
    }
    if (appliedLabels.length > 0) {
      pushHistory({
        date: new Date().toISOString(),
        action: "import",
        tools: appliedLabels,
      });
      setHistory(readHistory());
      setImportDone(
        `Restauration appliquée : ${appliedLabels.join(", ")}.`,
      );
    } else {
      setImportDone("Aucune donnée n'a été modifiée.");
    }
    setPendingFile(null);
    setImportChoices({});
    setOverwriteConfirmPending(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleCancelImport() {
    setPendingFile(null);
    setImportChoices({});
    setOverwriteConfirmPending(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleRequestImport() {
    if (toolsToOverwrite.length > 0) {
      setOverwriteConfirmPending(true);
      return;
    }
    handleConfirmImport();
  }

  function handleCancelOverwriteConfirm() {
    setOverwriteConfirmPending(false);
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-lg border border-gold/40 bg-gold/10 p-4 text-sm leading-6 text-foreground">
        Vos données restent sur cet appareil tant que vous ne les exportez
        pas. Aucune donnée élève, aucun mot de passe et aucune information de
        compte ne sont jamais inclus dans une sauvegarde.
      </div>

      <section className="rounded-lg border border-white/10 bg-background/45 p-4">
        <h2 className="text-lg font-bold text-foreground">Exporter tout</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Télécharge un fichier JSON unique contenant tous les outils
          enseignants ci-dessous.
        </p>
        <p className="mt-2 text-xs text-muted">
          Dernière sauvegarde locale :{" "}
          <span className="font-bold text-foreground">
            {formatDate(lastBackupDate)}
          </span>
        </p>
        <button
          type="button"
          onClick={handleExportAll}
          className="mt-4 min-h-11 rounded-md border border-jade/60 bg-jade/15 px-4 text-sm font-bold text-jade transition hover:bg-jade/25"
        >
          Exporter tout (JSON)
        </button>
      </section>

      <section className="rounded-lg border border-white/10 bg-background/45 p-4">
        <h2 className="text-lg font-bold text-foreground">
          Exporter un outil
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Choisissez un seul outil à exporter séparément.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <select
            value={selectedToolId}
            onChange={(event) =>
              setSelectedToolId(event.target.value as TeacherBackupToolId)
            }
            className="min-h-11 rounded-md border border-white/15 bg-background px-3 text-sm text-foreground"
          >
            {teacherBackupTools.map((tool) => (
              <option key={tool.id} value={tool.id}>
                {tool.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleExportOne}
            className="min-h-11 rounded-md border border-jade/60 bg-jade/15 px-4 text-sm font-bold text-jade transition hover:bg-jade/25"
          >
            Exporter cet outil
          </button>
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-background/45 p-4">
        <h2 className="text-lg font-bold text-foreground">
          Importer une sauvegarde
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Sélectionnez un fichier JSON exporté depuis cette page.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={(event) => handleFileSelected(event.target.files)}
          className="mt-4 block w-full text-sm text-foreground"
        />

        {importError && (
          <p className="mt-3 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {importError}
          </p>
        )}

        {importDone && (
          <p className="mt-3 rounded-md border border-jade/40 bg-jade/10 px-3 py-2 text-sm text-jade">
            {importDone}
          </p>
        )}

        {pendingFile && (
          <div className="mt-4 space-y-3 rounded-md border border-white/10 bg-background/60 p-3">
            <p className="text-sm font-bold text-foreground">
              Aperçu de la sauvegarde du{" "}
              {formatDate(pendingFile.createdAt)}
            </p>
            <ul className="space-y-3">
              {detectedTools.map((detected) => (
                <li
                  key={detected.id}
                  className="rounded-md border border-white/10 p-3"
                >
                  <p className="text-sm font-bold text-foreground">
                    {detected.label}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {detected.hasExistingData
                      ? "Des données existent déjà sur cet appareil pour cet outil."
                      : "Aucune donnée existante sur cet appareil pour cet outil."}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs">
                    {(["remplacer", "fusionner", "annuler"] as const).map(
                      (choice) => {
                        const disabled =
                          choice === "fusionner" && !detected.canMerge;
                        return (
                          <label
                            key={choice}
                            className={`flex items-center gap-1.5 ${
                              disabled ? "opacity-40" : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name={`choice-${detected.id}`}
                              disabled={disabled}
                              checked={
                                (importChoices[detected.id] ?? "annuler") ===
                                choice
                              }
                              onChange={() =>
                                setImportChoices((prev) => ({
                                  ...prev,
                                  [detected.id]: choice,
                                }))
                              }
                            />
                            {choice === "remplacer" && "Remplacer"}
                            {choice === "fusionner" &&
                              (disabled
                                ? "Fusionner (indisponible)"
                                : "Fusionner")}
                            {choice === "annuler" && "Ne rien faire"}
                          </label>
                        );
                      },
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {overwriteConfirmPending && (
              <div className="space-y-3 rounded-md border border-red-500/40 bg-red-500/10 p-3">
                <p className="text-sm font-bold text-red-100">
                  Confirmer le remplacement des données existantes ?
                </p>
                <p className="text-sm leading-6 text-red-100/90">
                  Les données locales actuelles seront définitivement
                  écrasées pour :{" "}
                  <span className="font-bold">
                    {toolsToOverwrite.map((tool) => tool.label).join(", ")}
                  </span>
                  . Cette action ne peut pas être annulée une fois validée.
                  Vous pouvez encore annuler maintenant sans rien modifier.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleConfirmImport}
                    className="min-h-11 rounded-md border border-red-500/60 bg-red-500/20 px-4 text-sm font-bold text-red-100 transition hover:bg-red-500/30"
                  >
                    Oui, remplacer ces données
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelOverwriteConfirm}
                    className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-muted transition hover:bg-white/5"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={handleRequestImport}
                disabled={overwriteConfirmPending}
                className="min-h-11 rounded-md border border-jade/60 bg-jade/15 px-4 text-sm font-bold text-jade transition hover:bg-jade/25 disabled:opacity-40"
              >
                Confirmer l&apos;import
              </button>
              <button
                type="button"
                onClick={handleCancelImport}
                className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-muted transition hover:bg-white/5"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="rounded-lg border border-white/10 bg-background/45 p-4">
        <h2 className="text-lg font-bold text-foreground">
          Historique local
        </h2>
        {!isMounted ? (
          <p className="mt-2 text-sm text-muted">Chargement de l&apos;historique…</p>
        ) : history.length === 0 ? (
          <p className="mt-2 text-sm text-muted">
            Aucune opération enregistrée pour l&apos;instant.
          </p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {history.map((entry, index) => (
              <li key={`${entry.date}-${index}`}>
                <span className="font-bold text-foreground">
                  {formatDate(entry.date)}
                </span>{" "}
                —{" "}
                {entry.action === "export-global" && "export global"}
                {entry.action === "export-outil" && "export d'un outil"}
                {entry.action === "import" && "import"} (
                {entry.tools.join(", ")})
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
