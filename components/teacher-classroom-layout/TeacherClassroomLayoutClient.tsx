"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  assignRoles,
  createGroups,
  generateGroupAssignment,
  generateLayout,
  layoutKinds,
  roles,
  type AvoidPair,
  type Group,
  type GroupGenerationMode,
  type Label,
  type LayoutKind,
  type RoleAssignment,
  type StoredLayout,
  type TableShape,
} from "@/content/teacher-classroom-layout";

const STORAGE_KEY = "academie-kerboeuf-organisation-classe-plan-v1";
const CANVAS_WIDTH = 880;
const CANVAS_HEIGHT = 560;

type Tab = "plan" | "groupes";

function emptyLayout(name: string): StoredLayout {
  return {
    id: `config-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    tables: [],
    labels: [],
    groups: [],
    roleAssignment: {},
    isDefault: false,
  };
}

function readSaves(): StoredLayout[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) return parsed as StoredLayout[];
    return [];
  } catch {
    return [];
  }
}

export function TeacherClassroomLayoutClient() {
  const [saves, setSaves] = useState<StoredLayout[]>(() => readSaves());
  const [initialDefault] = useState<StoredLayout>(() => {
    const initial = readSaves();
    return initial.find((s) => s.isDefault) ?? initial[0] ?? emptyLayout("Configuration 1");
  });
  const [currentId, setCurrentId] = useState<string>(initialDefault.id);

  const [tables, setTables] = useState<TableShape[]>(initialDefault.tables);
  const [labels, setLabels] = useState<Label[]>(initialDefault.labels);
  const [groups, setGroups] = useState<Group[]>(initialDefault.groups);
  const [roleAssignment, setRoleAssignment] = useState<RoleAssignment>(
    initialDefault.roleAssignment,
  );
  const [configName, setConfigName] = useState(initialDefault.name);

  const [tab, setTab] = useState<Tab>("plan");
  const [showLegend, setShowLegend] = useState(true);
  const [pendingLayout, setPendingLayout] = useState<LayoutKind | null>(null);

  const [newLabelText, setNewLabelText] = useState("");
  const [groupSize, setGroupSize] = useState(4);
  const [genMode, setGenMode] = useState<GroupGenerationMode>("heterogene");
  const [avoidPairs, setAvoidPairs] = useState<AvoidPair[]>([]);
  const [avoidA, setAvoidA] = useState("");
  const [avoidB, setAvoidB] = useState("");
  const [proposedGroups, setProposedGroups] = useState<string[][] | null>(
    null,
  );

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef<{
    tableId: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const dragLabelRef = useRef<string | null>(null);

  const hydratedRef = useRef(false);

  function persistCurrent(next: Partial<StoredLayout> = {}) {
    setSaves((prev) => {
      const existingIndex = prev.findIndex((s) => s.id === currentId);
      const updated: StoredLayout = {
        id: currentId,
        name: configName,
        tables,
        labels,
        groups,
        roleAssignment,
        isDefault: existingIndex >= 0 ? prev[existingIndex].isDefault : false,
        ...next,
      };
      const nextList =
        existingIndex >= 0
          ? prev.map((s, i) => (i === existingIndex ? updated : s))
          : [...prev, updated];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList));
      return nextList;
    });
  }

  function addTable() {
    setTables((prev) => [
      ...prev,
      {
        id: `table-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        x: 40 + (prev.length % 6) * 20,
        y: 40 + Math.floor(prev.length / 6) * 20,
        rotation: 0,
        width: 90,
        height: 56,
        seats: 2,
      },
    ]);
  }

  function applyQuickLayout(kind: LayoutKind) {
    if (tables.length > 0) {
      setPendingLayout(kind);
      return;
    }
    setTables(generateLayout(kind, CANVAS_WIDTH, CANVAS_HEIGHT));
  }

  function confirmApplyLayout() {
    if (!pendingLayout) return;
    setTables(generateLayout(pendingLayout, CANVAS_WIDTH, CANVAS_HEIGHT));
    setLabels((prev) => prev.map((label) => ({ ...label, tableId: null })));
    setPendingLayout(null);
  }

  function updateTable(id: string, patch: Partial<TableShape>) {
    setTables((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    );
  }

  function rotateTable(id: string) {
    updateTable(id, {
      rotation:
        ((tables.find((t) => t.id === id)?.rotation ?? 0) + 45) % 360,
    });
  }

  function resizeTable(id: string, delta: number) {
    const table = tables.find((t) => t.id === id);
    if (!table) return;
    const nextWidth = Math.min(160, Math.max(56, table.width + delta));
    const nextHeight = Math.min(120, Math.max(40, table.height + delta * 0.6));
    updateTable(id, { width: nextWidth, height: nextHeight });
  }

  function duplicateTable(id: string) {
    const table = tables.find((t) => t.id === id);
    if (!table) return;
    setTables((prev) => [
      ...prev,
      {
        ...table,
        id: `table-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        x: table.x + 20,
        y: table.y + 20,
      },
    ]);
  }

  function deleteTable(id: string) {
    setTables((prev) => prev.filter((t) => t.id !== id));
    setLabels((prev) =>
      prev.map((label) =>
        label.tableId === id ? { ...label, tableId: null } : label,
      ),
    );
  }

  function onTablePointerDown(
    event: React.PointerEvent<HTMLDivElement>,
    table: TableShape,
  ) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    dragState.current = {
      tableId: table.id,
      offsetX: event.clientX - rect.left - table.x,
      offsetY: event.clientY - rect.top - table.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onCanvasPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragState.current;
    const canvas = canvasRef.current;
    if (!drag || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(CANVAS_WIDTH - 40, event.clientX - rect.left - drag.offsetX),
    );
    const y = Math.max(
      0,
      Math.min(CANVAS_HEIGHT - 40, event.clientY - rect.top - drag.offsetY),
    );
    updateTable(drag.tableId, { x, y });
  }

  function onCanvasPointerUp() {
    dragState.current = null;
  }

  function addLabel() {
    const text = newLabelText.trim();
    if (!text) return;
    setLabels((prev) => [
      ...prev,
      {
        id: `label-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        text,
        tableId: null,
        groupId: null,
      },
    ]);
    setNewLabelText("");
  }

  function removeLabel(id: string) {
    setLabels((prev) => prev.filter((label) => label.id !== id));
    setAvoidPairs((prev) =>
      prev.filter((pair) => pair.a !== id && pair.b !== id),
    );
  }

  function onLabelDragStart(id: string) {
    dragLabelRef.current = id;
  }

  function onTableDrop(tableId: string) {
    const labelId = dragLabelRef.current;
    dragLabelRef.current = null;
    if (!labelId) return;
    setLabels((prev) =>
      prev.map((label) =>
        label.id === labelId ? { ...label, tableId } : label,
      ),
    );
  }

  function unassignLabel(labelId: string) {
    setLabels((prev) =>
      prev.map((label) =>
        label.id === labelId ? { ...label, tableId: null } : label,
      ),
    );
  }

  function onGroupDrop(groupId: string | null) {
    const labelId = dragLabelRef.current;
    dragLabelRef.current = null;
    if (!labelId) return;
    setLabels((prev) =>
      prev.map((label) =>
        label.id === labelId ? { ...label, groupId } : label,
      ),
    );
  }

  function createGroupSet(count: number) {
    const nextGroups = createGroups(count);
    setGroups(nextGroups);
    setLabels((prev) => prev.map((label) => ({ ...label, groupId: null })));
    setRoleAssignment({});
  }

  function renameGroup(id: string, name: string) {
    setGroups((prev) => prev.map((g) => (g.id === id ? { ...g, name } : g)));
  }

  function addAvoidPair() {
    if (!avoidA || !avoidB || avoidA === avoidB) return;
    setAvoidPairs((prev) => [...prev, { a: avoidA, b: avoidB }]);
    setAvoidA("");
    setAvoidB("");
  }

  function removeAvoidPair(index: number) {
    setAvoidPairs((prev) => prev.filter((_, i) => i !== index));
  }

  function generateProposal() {
    if (groups.length === 0) return;
    const labelIds = labels.map((l) => l.id);
    const buckets = generateGroupAssignment(
      labelIds,
      groupSize,
      genMode,
      avoidPairs,
    );
    setProposedGroups(buckets);
  }

  function applyProposal() {
    if (!proposedGroups) return;
    const nextGroups =
      proposedGroups.length === groups.length
        ? groups
        : createGroups(proposedGroups.length);
    setGroups(nextGroups);
    setLabels((prev) => {
      const map = new Map<string, string>();
      proposedGroups.forEach((bucket, index) => {
        bucket.forEach((labelId) => {
          map.set(labelId, nextGroups[index].id);
        });
      });
      return prev.map((label) => ({
        ...label,
        groupId: map.get(label.id) ?? null,
      }));
    });
    setProposedGroups(null);
  }

  function discardProposal() {
    setProposedGroups(null);
  }

  function assignRolesToGroups() {
    const nextAssignment: RoleAssignment = {};
    groups.forEach((group) => {
      const members = labels
        .filter((label) => label.groupId === group.id)
        .map((label) => label.id);
      Object.assign(nextAssignment, assignRoles(members));
    });
    setRoleAssignment(nextAssignment);
  }

  function saveAs(name: string) {
    const id = `config-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const next: StoredLayout = {
      id,
      name,
      tables,
      labels,
      groups,
      roleAssignment,
      isDefault: false,
    };
    setSaves((prev) => {
      const list = [...prev, next];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return list;
    });
    setCurrentId(id);
    setConfigName(name);
  }

  function loadSave(id: string) {
    const found = saves.find((s) => s.id === id);
    if (!found) return;
    setCurrentId(found.id);
    setConfigName(found.name);
    setTables(found.tables);
    setLabels(found.labels);
    setGroups(found.groups);
    setRoleAssignment(found.roleAssignment);
    setProposedGroups(null);
  }

  function renameSave(id: string, name: string) {
    setSaves((prev) => {
      const list = prev.map((s) => (s.id === id ? { ...s, name } : s));
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return list;
    });
    if (id === currentId) setConfigName(name);
  }

  function duplicateSave(id: string) {
    const found = saves.find((s) => s.id === id);
    if (!found) return;
    const copy: StoredLayout = {
      ...found,
      id: `config-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: `${found.name} (copie)`,
      isDefault: false,
    };
    setSaves((prev) => {
      const list = [...prev, copy];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return list;
    });
  }

  function deleteSave(id: string) {
    setSaves((prev) => {
      const list = prev.filter((s) => s.id !== id);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return list;
    });
  }

  function setDefaultSave(id: string) {
    setSaves((prev) => {
      const list = prev.map((s) => ({ ...s, isDefault: s.id === id }));
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return list;
    });
  }

  useEffect(() => {
    if (!hydratedRef.current) {
      hydratedRef.current = true;
      return;
    }
    persistCurrent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tables, labels, groups, roleAssignment, configName]);

  const unassignedLabels = useMemo(
    () => labels.filter((label) => label.tableId === null),
    [labels],
  );

  const groupedLabels = useMemo(() => {
    const map = new Map<string, Label[]>();
    groups.forEach((g) => map.set(g.id, []));
    labels.forEach((label) => {
      if (label.groupId && map.has(label.groupId)) {
        map.get(label.groupId)!.push(label);
      }
    });
    return map;
  }, [groups, labels]);

  const ungroupedLabels = useMemo(
    () => labels.filter((label) => !label.groupId),
    [labels],
  );

  return (
    <div className="mt-10 space-y-8">
      <p
        role="note"
        className="rounded-lg border border-ember/40 bg-ember/10 p-4 text-sm font-bold text-foreground print:hidden"
      >
        Aucune donnée sensible : utilisez uniquement des prénoms ou des codes.
        Jamais d&apos;information médicale, familiale ou comportementale. Tout est
        enregistré uniquement sur cet appareil.
      </p>

      <div
        className="flex flex-wrap gap-2 print:hidden"
        role="tablist"
        aria-label="Sections de l'outil"
      >
        {(
          [
            { id: "plan", label: "Plan de classe" },
            { id: "groupes", label: "Groupes" },
          ] as { id: Tab; label: string }[]
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`min-h-11 rounded-md border px-4 text-sm font-bold transition ${
              tab === t.id
                ? "border-jade/60 bg-jade/15 text-jade"
                : "border-white/15 text-foreground hover:border-jade/40"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "plan" && (
        <>
          <section
            aria-labelledby="configs-rapides"
            className="rounded-lg border border-white/10 bg-background/45 p-4 print:hidden"
          >
            <h2
              id="configs-rapides"
              className="text-xl font-black text-foreground"
            >
              Configurations rapides
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {layoutKinds.map((k) => (
                <button
                  key={k.id}
                  type="button"
                  onClick={() => applyQuickLayout(k.id)}
                  className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-jade/50 hover:text-jade"
                >
                  {k.label}
                </button>
              ))}
              <button
                type="button"
                onClick={addTable}
                className="min-h-11 rounded-md border border-jade/60 bg-jade/15 px-4 text-sm font-bold text-jade transition hover:bg-jade/25"
              >
                + Ajouter une table
              </button>
            </div>

            {pendingLayout && (
              <div
                role="alertdialog"
                aria-labelledby="confirm-overwrite"
                className="mt-4 rounded-md border border-ember/50 bg-ember/10 p-3"
              >
                <p id="confirm-overwrite" className="text-sm font-bold text-foreground">
                  Remplacer le plan actuel par cette configuration ? Les
                  tables actuelles seront supprimées et les étiquettes
                  placées seront libérées.
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={confirmApplyLayout}
                    className="min-h-9 rounded-md border border-ember/60 bg-ember/20 px-3 text-sm font-bold text-foreground"
                  >
                    Confirmer
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingLayout(null)}
                    className="min-h-9 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            )}
          </section>

          <section aria-labelledby="surface-plan">
            <h2 id="surface-plan" className="text-xl font-black text-foreground">
              Surface de la salle
            </h2>
            <div
              ref={canvasRef}
              onPointerMove={onCanvasPointerMove}
              onPointerUp={onCanvasPointerUp}
              className="relative mt-4 overflow-hidden rounded-lg border border-white/15 bg-background/30"
              style={{ width: "100%", maxWidth: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
            >
              {tables.map((table) => {
                const tableLabels = labels.filter((l) => l.tableId === table.id);
                return (
                  <div
                    key={table.id}
                    onPointerDown={(e) => onTablePointerDown(e, table)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => onTableDrop(table.id)}
                    className="absolute flex flex-col items-center justify-center gap-1 rounded-md border-2 border-foreground/40 bg-background/70 p-1 text-center text-xs font-bold text-foreground shadow-sm"
                    style={{
                      left: table.x,
                      top: table.y,
                      width: table.width,
                      height: table.height,
                      transform: `rotate(${table.rotation}deg)`,
                      cursor: "grab",
                      touchAction: "none",
                    }}
                  >
                    <span className="text-[10px] uppercase tracking-wide text-muted">
                      {table.seats} places
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-1">
                      {tableLabels.map((label) => (
                        <span
                          key={label.id}
                          className="rounded bg-jade/20 px-1 text-[10px] font-bold text-jade"
                        >
                          {label.text}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-1 print:hidden">
                      <button
                        type="button"
                        aria-label="Pivoter la table"
                        onClick={() => rotateTable(table.id)}
                        className="min-h-6 min-w-6 rounded border border-white/20 text-[10px]"
                      >
                        ⟳
                      </button>
                      <button
                        type="button"
                        aria-label="Agrandir la table"
                        onClick={() => resizeTable(table.id, 12)}
                        className="min-h-6 min-w-6 rounded border border-white/20 text-[10px]"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        aria-label="Réduire la table"
                        onClick={() => resizeTable(table.id, -12)}
                        className="min-h-6 min-w-6 rounded border border-white/20 text-[10px]"
                      >
                        −
                      </button>
                      <button
                        type="button"
                        aria-label="Dupliquer la table"
                        onClick={() => duplicateTable(table.id)}
                        className="min-h-6 min-w-6 rounded border border-white/20 text-[10px]"
                      >
                        ⧉
                      </button>
                      <button
                        type="button"
                        aria-label="Supprimer la table"
                        onClick={() => deleteTable(table.id)}
                        className="min-h-6 min-w-6 rounded border border-ember/40 text-[10px] text-ember"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
              {tables.length === 0 && (
                <p className="absolute inset-0 flex items-center justify-center text-sm text-muted">
                  Salle vide. Ajoutez une table ou choisissez une
                  configuration rapide.
                </p>
              )}
            </div>
          </section>

          <section
            aria-labelledby="etiquettes"
            className="rounded-lg border border-white/10 bg-background/45 p-4 print:hidden"
          >
            <h2 id="etiquettes" className="text-xl font-black text-foreground">
              Étiquettes
            </h2>
            <div className="mt-3 flex flex-wrap items-end gap-3">
              <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
                Prénom ou code
                <input
                  type="text"
                  value={newLabelText}
                  onChange={(e) => setNewLabelText(e.target.value)}
                  className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
                  placeholder="Ex : Léo, ou Élève 4"
                />
              </label>
              <button
                type="button"
                onClick={addLabel}
                disabled={!newLabelText.trim()}
                className="min-h-11 rounded-md border border-jade/60 bg-jade/15 px-4 text-sm font-bold text-jade disabled:cursor-not-allowed disabled:opacity-40"
              >
                Créer l&apos;étiquette
              </button>
            </div>

            <p className="mt-3 text-sm text-muted">
              Glissez une étiquette non placée sur une table du plan
              ci-dessus.
            </p>
            <ul className="mt-3 flex flex-wrap gap-2" role="list">
              {unassignedLabels.map((label) => (
                <li
                  key={label.id}
                  draggable
                  onDragStart={() => onLabelDragStart(label.id)}
                  className="cursor-grab rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-bold text-foreground"
                >
                  {label.text}
                </li>
              ))}
              {unassignedLabels.length === 0 && labels.length > 0 && (
                <li className="text-sm text-muted">Toutes les étiquettes sont placées.</li>
              )}
            </ul>

            {labels.some((l) => l.tableId !== null) && (
              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                  Étiquettes placées
                </p>
                <ul className="mt-2 flex flex-wrap gap-2" role="list">
                  {labels
                    .filter((l) => l.tableId !== null)
                    .map((label) => (
                      <li
                        key={label.id}
                        className="flex items-center gap-2 rounded-md border border-white/15 bg-background/30 px-3 py-2 text-sm font-bold text-foreground"
                      >
                        {label.text}
                        <button
                          type="button"
                          aria-label={`Retirer ${label.text} de la table`}
                          onClick={() => unassignLabel(label.id)}
                          className="text-xs text-muted hover:text-ember"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {labels.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2" role="list">
                {labels.map((label) => (
                  <li key={`del-${label.id}`}>
                    <button
                      type="button"
                      aria-label={`Supprimer l'étiquette ${label.text}`}
                      onClick={() => removeLabel(label.id)}
                      className="text-xs text-muted hover:text-ember"
                    >
                      Supprimer {label.text}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}

      {tab === "groupes" && (
        <>
          <section
            aria-labelledby="creer-groupes"
            className="rounded-lg border border-white/10 bg-background/45 p-4 print:hidden"
          >
            <h2 id="creer-groupes" className="text-xl font-black text-foreground">
              Créer des groupes
            </h2>
            <div className="mt-3 flex flex-wrap items-end gap-3">
              {[2, 3, 4, 5, 6].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => createGroupSet(n)}
                  className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-jade/50 hover:text-jade"
                >
                  {n} groupes
                </button>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="generateur"
            className="rounded-lg border border-white/10 bg-background/45 p-4 print:hidden"
          >
            <h2 id="generateur" className="text-xl font-black text-foreground">
              Générateur de groupes
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
                Taille de groupe
                <select
                  value={groupSize}
                  onChange={(e) => setGroupSize(Number(e.target.value))}
                  className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
                >
                  {[2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
                Mode
                <select
                  value={genMode}
                  onChange={(e) =>
                    setGenMode(e.target.value as GroupGenerationMode)
                  }
                  className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
                >
                  <option value="heterogene">Hétérogène (mélangé)</option>
                  <option value="homogene">Homogène (ordre conservé)</option>
                </select>
              </label>
            </div>

            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                Éviter certains binômes
              </p>
              <div className="mt-2 flex flex-wrap items-end gap-2">
                <select
                  value={avoidA}
                  onChange={(e) => setAvoidA(e.target.value)}
                  className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
                >
                  <option value="">Étiquette 1</option>
                  {labels.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.text}
                    </option>
                  ))}
                </select>
                <select
                  value={avoidB}
                  onChange={(e) => setAvoidB(e.target.value)}
                  className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
                >
                  <option value="">Étiquette 2</option>
                  {labels.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.text}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={addAvoidPair}
                  disabled={!avoidA || !avoidB || avoidA === avoidB}
                  className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Ajouter
                </button>
              </div>
              <ul className="mt-2 flex flex-wrap gap-2" role="list">
                {avoidPairs.map((pair, index) => {
                  const a = labels.find((l) => l.id === pair.a)?.text ?? "?";
                  const b = labels.find((l) => l.id === pair.b)?.text ?? "?";
                  return (
                    <li
                      key={`${pair.a}-${pair.b}`}
                      className="flex items-center gap-2 rounded-md border border-white/15 bg-background/30 px-3 py-1 text-xs font-bold text-foreground"
                    >
                      {a} ≠ {b}
                      <button
                        type="button"
                        aria-label={`Retirer la contrainte ${a} ${b}`}
                        onClick={() => removeAvoidPair(index)}
                        className="text-muted hover:text-ember"
                      >
                        ✕
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button
              type="button"
              onClick={generateProposal}
              disabled={groups.length === 0 || labels.length === 0}
              className="mt-4 min-h-11 rounded-md border border-jade/60 bg-jade/15 px-4 text-sm font-bold text-jade disabled:cursor-not-allowed disabled:opacity-40"
            >
              Générer une proposition
            </button>

            {proposedGroups && (
              <div className="mt-4 rounded-md border border-jade/40 bg-jade/10 p-3">
                <p className="text-sm font-bold text-foreground">
                  Proposition (non appliquée) :
                </p>
                <ul className="mt-2 space-y-2">
                  {proposedGroups.map((bucket, index) => (
                    <li key={index} className="text-sm text-foreground">
                      <span className="font-bold">Groupe {index + 1} : </span>
                      {bucket
                        .map((id) => labels.find((l) => l.id === id)?.text)
                        .filter(Boolean)
                        .join(", ")}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={applyProposal}
                    className="min-h-9 rounded-md border border-jade/60 bg-jade/20 px-3 text-sm font-bold text-jade"
                  >
                    Appliquer au plan
                  </button>
                  <button
                    type="button"
                    onClick={discardProposal}
                    className="min-h-9 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground"
                  >
                    Ignorer
                  </button>
                </div>
              </div>
            )}
          </section>

          {groups.length > 0 && (
            <section aria-labelledby="mode-activite">
              <div className="flex items-center justify-between print:hidden">
                <h2 id="mode-activite" className="text-xl font-black text-foreground">
                  Mode activité de groupe
                </h2>
                <button
                  type="button"
                  onClick={assignRolesToGroups}
                  className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-jade/50 hover:text-jade"
                >
                  Répartir les rôles
                </button>
              </div>

              <p className="mt-2 text-sm text-muted print:hidden">
                Glissez une étiquette d&apos;un groupe à l&apos;autre pour ajuster
                manuellement après génération.
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => onGroupDrop(group.id)}
                    className="rounded-lg border-2 p-3"
                    style={{ borderColor: group.color }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className="text-lg"
                        style={{ color: group.color }}
                      >
                        {group.pictogram}
                      </span>
                      <input
                        type="text"
                        value={group.name}
                        onChange={(e) => renameGroup(group.id, e.target.value)}
                        className="min-h-9 flex-1 rounded-md border border-white/15 bg-background/60 px-2 text-sm font-bold text-foreground print:hidden"
                        aria-label={`Renommer ${group.name}`}
                      />
                      <span className="hidden text-sm font-bold text-foreground print:inline">
                        {group.name}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-1" role="list">
                      {(groupedLabels.get(group.id) ?? []).map((label) => {
                        const role = roleAssignment[label.id];
                        const roleLabel = roles.find((r) => r.id === role)?.label;
                        return (
                          <li
                            key={label.id}
                            draggable
                            onDragStart={() => onLabelDragStart(label.id)}
                            className="flex items-center justify-between gap-2 rounded-md border border-white/10 bg-background/30 px-2 py-1 text-sm font-bold text-foreground"
                          >
                            <span>{label.text}</span>
                            {roleLabel && (
                              <span className="text-xs font-bold uppercase tracking-wide text-muted">
                                {roleLabel}
                              </span>
                            )}
                          </li>
                        );
                      })}
                      {(groupedLabels.get(group.id) ?? []).length === 0 && (
                        <li className="text-xs text-muted">Aucune étiquette.</li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>

              {ungroupedLabels.length > 0 && (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onGroupDrop(null)}
                  className="mt-4 rounded-lg border border-white/15 bg-background/30 p-3 print:hidden"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                    Étiquettes sans groupe (déposer ici pour retirer d&apos;un groupe)
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-2" role="list">
                    {ungroupedLabels.map((label) => (
                      <li
                        key={label.id}
                        draggable
                        onDragStart={() => onLabelDragStart(label.id)}
                        className="cursor-grab rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-bold text-foreground"
                      >
                        {label.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}
        </>
      )}

      <section
        aria-labelledby="sauvegardes"
        className="rounded-lg border border-white/10 bg-background/45 p-4 print:hidden"
      >
        <h2 id="sauvegardes" className="text-xl font-black text-foreground">
          Sauvegardes locales
        </h2>
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Nom de la configuration actuelle
            <input
              type="text"
              value={configName}
              onChange={(e) => setConfigName(e.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>
          <button
            type="button"
            onClick={() => saveAs(configName || "Nouvelle configuration")}
            className="min-h-11 rounded-md border border-jade/60 bg-jade/15 px-4 text-sm font-bold text-jade"
          >
            Enregistrer comme nouvelle
          </button>
        </div>

        <ul className="mt-4 space-y-2" role="list">
          {saves.map((save) => (
            <li
              key={save.id}
              className="flex flex-wrap items-center gap-2 rounded-md border border-white/10 bg-background/30 p-2"
            >
              <button
                type="button"
                onClick={() => loadSave(save.id)}
                className={`min-h-9 rounded-md border px-3 text-sm font-bold ${
                  save.id === currentId
                    ? "border-jade/60 bg-jade/15 text-jade"
                    : "border-white/15 text-foreground hover:border-jade/40"
                }`}
              >
                {save.name}
                {save.isDefault ? " (par défaut)" : ""}
              </button>
              <button
                type="button"
                onClick={() => {
                  const name = window.prompt("Nouveau nom", save.name);
                  if (name) renameSave(save.id, name);
                }}
                className="min-h-9 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground"
              >
                Renommer
              </button>
              <button
                type="button"
                onClick={() => duplicateSave(save.id)}
                className="min-h-9 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground"
              >
                Dupliquer
              </button>
              <button
                type="button"
                onClick={() => setDefaultSave(save.id)}
                className="min-h-9 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground"
              >
                Définir par défaut
              </button>
              <button
                type="button"
                onClick={() => {
                  if (
                    window.confirm(
                      `Supprimer la configuration « ${save.name} » ?`,
                    )
                  ) {
                    deleteSave(save.id);
                  }
                }}
                className="min-h-9 rounded-md border border-ember/40 px-2 text-xs font-bold text-ember"
              >
                Supprimer
              </button>
            </li>
          ))}
          {saves.length === 0 && (
            <li className="text-sm text-muted">Aucune configuration enregistrée.</li>
          )}
        </ul>
      </section>

      <section
        aria-labelledby="impression"
        className="rounded-lg border border-white/10 bg-background/45 p-4"
      >
        <h2 id="impression" className="text-xl font-black text-foreground print:hidden">
          Impression
        </h2>
        <div className="mt-3 flex flex-wrap items-center gap-3 print:hidden">
          <label className="flex items-center gap-2 text-sm font-bold text-foreground">
            <input
              type="checkbox"
              checked={showLegend}
              onChange={(e) => setShowLegend(e.target.checked)}
              className="h-4 w-4"
            />
            Afficher la légende des groupes
          </label>
          <button
            type="button"
            onClick={() => window.print()}
            className="min-h-11 rounded-md border border-jade/60 bg-jade/15 px-4 text-sm font-bold text-jade"
          >
            Imprimer le plan
          </button>
        </div>
        {showLegend && groups.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-3 print:flex" role="list">
            {groups.map((group) => (
              <li
                key={group.id}
                className="rounded-md border border-foreground/30 px-3 py-1 text-xs font-bold text-foreground"
              >
                {group.pictogram} {group.name}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
