"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  assignRoles,
  createGroups,
  generateGroupAssignment,
  generateId,
  generateLayout,
  layoutKinds,
  makeTable,
  roles,
  type AvoidPair,
  type Group,
  type GroupGenerationMode,
  type LayoutKind,
  type RoleAssignment,
  type StoredLayout,
  type TableShape,
} from "@/content/teacher-classroom-layout";

const STORAGE_KEY = "academie-kerboeuf-organisation-classe-plan-v2";
const CANVAS_WIDTH = 880;
const CANVAS_HEIGHT = 560;

type Tab = "plan" | "groupes";

type NamedSeat = { id: string; name: string };

function seatCountLabel(seats: number): string {
  if (seats === 1) return "table simple";
  if (seats === 4) return "groupe de 4";
  return "table double";
}

function normalizeTable(raw: unknown): TableShape | null {
  if (typeof raw !== "object" || raw === null) return null;
  const t = raw as Record<string, unknown>;
  const seats =
    typeof t.seats === "number" && t.seats > 0 ? Math.round(t.seats) : 2;
  const rawNames = Array.isArray(t.names) ? t.names : [];
  const names: (string | null)[] = Array.from({ length: seats }, (_, i) => {
    const v = rawNames[i];
    return typeof v === "string" && v.trim() ? v : null;
  });
  return {
    id: typeof t.id === "string" ? t.id : generateId("table"),
    x: typeof t.x === "number" ? t.x : 40,
    y: typeof t.y === "number" ? t.y : 40,
    rotation: typeof t.rotation === "number" ? t.rotation : 0,
    width: typeof t.width === "number" ? t.width : 90,
    height: typeof t.height === "number" ? t.height : 56,
    seats,
    names,
  };
}

function normalizeLayout(raw: unknown): StoredLayout | null {
  if (typeof raw !== "object" || raw === null) return null;
  const s = raw as Record<string, unknown>;
  const tables = Array.isArray(s.tables)
    ? s.tables.map(normalizeTable).filter((t): t is TableShape => t !== null)
    : [];
  const groups = Array.isArray(s.groups) ? (s.groups as Group[]) : [];
  const groupAssignment =
    typeof s.groupAssignment === "object" && s.groupAssignment !== null
      ? (s.groupAssignment as Record<string, string | null>)
      : {};
  const roleAssignment =
    typeof s.roleAssignment === "object" && s.roleAssignment !== null
      ? (s.roleAssignment as RoleAssignment)
      : {};
  return {
    id: typeof s.id === "string" ? s.id : generateId("config"),
    name: typeof s.name === "string" && s.name ? s.name : "Configuration",
    tables,
    groups,
    groupAssignment,
    roleAssignment,
    isDefault: Boolean(s.isDefault),
  };
}

function emptyLayout(name: string): StoredLayout {
  return {
    id: generateId("config"),
    name,
    tables: [],
    groups: [],
    groupAssignment: {},
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
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(normalizeLayout)
      .filter((l): l is StoredLayout => l !== null);
  } catch {
    return [];
  }
}

export function TeacherClassroomLayoutClient() {
  const [saves, setSaves] = useState<StoredLayout[]>(() => readSaves());
  const [initialDefault] = useState<StoredLayout>(() => {
    const initial = readSaves();
    return (
      initial.find((s) => s.isDefault) ?? initial[0] ?? emptyLayout("Configuration 1")
    );
  });
  const [currentId, setCurrentId] = useState<string>(initialDefault.id);

  const [tables, setTables] = useState<TableShape[]>(initialDefault.tables);
  const [groups, setGroups] = useState<Group[]>(initialDefault.groups);
  const [groupAssignment, setGroupAssignment] = useState<
    Record<string, string | null>
  >(initialDefault.groupAssignment);
  const [roleAssignment, setRoleAssignment] = useState<RoleAssignment>(
    initialDefault.roleAssignment,
  );
  const [configName, setConfigName] = useState(initialDefault.name);

  const [tab, setTab] = useState<Tab>("plan");
  const [showLegend, setShowLegend] = useState(true);
  const [pendingLayout, setPendingLayout] = useState<LayoutKind | null>(null);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);

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

  const hydratedRef = useRef(false);

  function persistCurrent() {
    setSaves((prev) => {
      const existingIndex = prev.findIndex((s) => s.id === currentId);
      const updated: StoredLayout = {
        id: currentId,
        name: configName,
        tables,
        groups,
        groupAssignment,
        roleAssignment,
        isDefault: existingIndex >= 0 ? prev[existingIndex].isDefault : false,
      };
      const nextList =
        existingIndex >= 0
          ? prev.map((s, i) => (i === existingIndex ? updated : s))
          : [...prev, updated];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList));
      return nextList;
    });
  }

  function addTable(seats: 1 | 2) {
    setTables((prev) => [
      ...prev,
      makeTable(
        40 + (prev.length % 6) * 20,
        40 + Math.floor(prev.length / 6) * 20,
        0,
        seats,
      ),
    ]);
  }

  function applyQuickLayout(kind: LayoutKind) {
    if (tables.length > 0) {
      setPendingLayout(kind);
      return;
    }
    setTables(generateLayout(kind, CANVAS_WIDTH, CANVAS_HEIGHT));
    setSelectedTableId(null);
  }

  function confirmApplyLayout() {
    if (!pendingLayout) return;
    setTables(generateLayout(pendingLayout, CANVAS_WIDTH, CANVAS_HEIGHT));
    setSelectedTableId(null);
    setPendingLayout(null);
  }

  function resetPlan() {
    const hasContent =
      tables.length > 0 || groups.length > 0 || Object.keys(roleAssignment).length > 0;
    if (
      hasContent &&
      !window.confirm(
        "Réinitialiser le plan ? Toutes les tables, les noms et les groupes actuels seront supprimés.",
      )
    ) {
      return;
    }
    setTables([]);
    setGroups([]);
    setGroupAssignment({});
    setRoleAssignment({});
    setProposedGroups(null);
    setSelectedTableId(null);
    setAvoidPairs([]);
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

  function duplicateTable(id: string) {
    const table = tables.find((t) => t.id === id);
    if (!table) return;
    const copy: TableShape = {
      ...table,
      id: generateId("table"),
      x: table.x + 20,
      y: table.y + 20,
      names: [...table.names],
    };
    setTables((prev) => [...prev, copy]);
    setSelectedTableId(copy.id);
  }

  function deleteTable(id: string) {
    setTables((prev) => prev.filter((t) => t.id !== id));
    if (selectedTableId === id) setSelectedTableId(null);
  }

  function setSeatName(tableId: string, seatIndex: number, value: string) {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id !== tableId) return t;
        const names = [...t.names];
        names[seatIndex] = value;
        return { ...t, names };
      }),
    );
  }

  function selectTable(tableId: string) {
    setSelectedTableId(tableId);
  }

  function onTablePointerDown(
    event: React.PointerEvent<HTMLDivElement>,
    table: TableShape,
  ) {
    selectTable(table.id);
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

  function onCanvasPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      setSelectedTableId(null);
    }
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

  const namedSeats = useMemo<NamedSeat[]>(
    () =>
      tables.flatMap((table) =>
        table.names
          .map((name, index) =>
            name && name.trim()
              ? { id: `${table.id}#${index}`, name: name.trim() }
              : null,
          )
          .filter((s): s is NamedSeat => s !== null),
      ),
    [tables],
  );

  const namedSeatsMap = useMemo(
    () => new Map(namedSeats.map((s) => [s.id, s.name])),
    [namedSeats],
  );

  function createGroupSet(count: number) {
    setGroups(createGroups(count));
    setGroupAssignment({});
    setRoleAssignment({});
  }

  function renameGroup(id: string, name: string) {
    setGroups((prev) => prev.map((g) => (g.id === id ? { ...g, name } : g)));
  }

  function setSeatGroup(seatId: string, groupId: string | null) {
    setGroupAssignment((prev) => ({ ...prev, [seatId]: groupId }));
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
    if (groups.length === 0 || namedSeats.length === 0) return;
    const buckets = generateGroupAssignment(
      namedSeats.map((s) => s.id),
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
    const nextAssignment: Record<string, string | null> = {};
    proposedGroups.forEach((bucket, index) => {
      bucket.forEach((seatId) => {
        nextAssignment[seatId] = nextGroups[index].id;
      });
    });
    setGroupAssignment(nextAssignment);
    setProposedGroups(null);
  }

  function discardProposal() {
    setProposedGroups(null);
  }

  function assignRolesToGroups() {
    const nextAssignment: RoleAssignment = {};
    groups.forEach((group) => {
      const members = namedSeats
        .filter((seat) => groupAssignment[seat.id] === group.id)
        .map((seat) => seat.id);
      Object.assign(nextAssignment, assignRoles(members));
    });
    setRoleAssignment(nextAssignment);
  }

  function saveAs(name: string) {
    const id = generateId("config");
    const next: StoredLayout = {
      id,
      name,
      tables,
      groups,
      groupAssignment,
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
    setGroups(found.groups);
    setGroupAssignment(found.groupAssignment);
    setRoleAssignment(found.roleAssignment);
    setProposedGroups(null);
    setSelectedTableId(null);
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
      id: generateId("config"),
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
  }, [tables, groups, groupAssignment, roleAssignment, configName]);

  const selectedTable = useMemo(
    () => tables.find((t) => t.id === selectedTableId) ?? null,
    [tables, selectedTableId],
  );

  const groupedSeats = useMemo(() => {
    const map = new Map<string, NamedSeat[]>();
    groups.forEach((g) => map.set(g.id, []));
    namedSeats.forEach((seat) => {
      const groupId = groupAssignment[seat.id];
      if (groupId && map.has(groupId)) {
        map.get(groupId)!.push(seat);
      }
    });
    return map;
  }, [groups, namedSeats, groupAssignment]);

  const ungroupedSeats = useMemo(
    () =>
      namedSeats.filter((seat) => {
        const groupId = groupAssignment[seat.id];
        return !groupId || !groups.some((g) => g.id === groupId);
      }),
    [namedSeats, groupAssignment, groups],
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
              Modèles rapides
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
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => addTable(1)}
                className="min-h-11 rounded-md border border-jade/60 bg-jade/15 px-4 text-sm font-bold text-jade transition hover:bg-jade/25"
              >
                + Table simple
              </button>
              <button
                type="button"
                onClick={() => addTable(2)}
                className="min-h-11 rounded-md border border-jade/60 bg-jade/15 px-4 text-sm font-bold text-jade transition hover:bg-jade/25"
              >
                + Table double
              </button>
              <button
                type="button"
                onClick={resetPlan}
                className="min-h-11 rounded-md border border-ember/50 px-4 text-sm font-bold text-ember transition hover:bg-ember/10"
              >
                Réinitialiser le plan
              </button>
            </div>

            {pendingLayout && (
              <div
                role="alertdialog"
                aria-labelledby="confirm-overwrite"
                className="mt-4 rounded-md border border-ember/50 bg-ember/10 p-3"
              >
                <p id="confirm-overwrite" className="text-sm font-bold text-foreground">
                  Remplacer le plan actuel par ce modèle ? Les tables et les
                  noms actuellement placés seront supprimés.
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
            <p className="mt-1 text-sm text-muted print:hidden">
              Touchez ou cliquez une table pour la sélectionner et agir
              dessus. Tapez un nom dans chaque emplacement pour nommer un
              élève.
            </p>
            <div className="mt-4 overflow-x-auto rounded-lg border border-white/15 bg-background/30">
              <div
                ref={canvasRef}
                onPointerDown={onCanvasPointerDown}
                onPointerMove={onCanvasPointerMove}
                onPointerUp={onCanvasPointerUp}
                className="relative"
                style={{
                  width: CANVAS_WIDTH,
                  height: CANVAS_HEIGHT,
                  flexShrink: 0,
                }}
              >
                {tables.map((table) => (
                  <div
                    key={table.id}
                    onPointerDown={(e) => onTablePointerDown(e, table)}
                    className={`absolute flex flex-col overflow-hidden rounded-md border-2 bg-background/70 text-center shadow-sm print:outline-none ${
                      selectedTableId === table.id
                        ? "border-jade outline outline-2 outline-jade"
                        : "border-foreground/40"
                    }`}
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
                    <div
                      aria-hidden
                      className="flex h-4 shrink-0 items-center justify-center bg-foreground/10 print:hidden"
                    >
                      <span className="text-[8px] leading-none text-foreground/50">
                        ⠿⠿⠿
                      </span>
                    </div>
                    <div className="flex flex-1 flex-wrap items-center justify-center gap-1 p-1">
                      {table.names.map((name, index) => (
                        <span key={index} className="inline-flex">
                          <input
                            type="text"
                            value={name ?? ""}
                            onChange={(e) =>
                              setSeatName(table.id, index, e.target.value)
                            }
                            onPointerDown={(e) => {
                              e.stopPropagation();
                              selectTable(table.id);
                            }}
                            placeholder="Élève"
                            aria-label={`Nom de l'élève, place ${index + 1}`}
                            className="w-[46px] min-h-6 rounded border border-white/25 bg-background/90 px-1 text-center text-[10px] font-bold text-foreground print:hidden"
                          />
                          <span className="hidden min-w-[46px] border-b border-foreground/40 px-1 text-[10px] font-bold text-foreground print:inline-block">
                            {name || " "}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                {tables.length === 0 && (
                  <p className="absolute inset-0 flex items-center justify-center text-sm text-muted">
                    Salle vide. Ajoutez une table ou choisissez un modèle
                    rapide.
                  </p>
                )}
              </div>
            </div>

            {selectedTable && (
              <div className="mt-3 flex flex-wrap items-center gap-2 rounded-md border border-jade/40 bg-jade/10 p-3 print:hidden">
                <p className="text-sm font-bold text-foreground">
                  Sélection : {seatCountLabel(selectedTable.seats)}
                </p>
                <button
                  type="button"
                  onClick={() => rotateTable(selectedTable.id)}
                  className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground hover:border-jade/50"
                >
                  ⟳ Pivoter
                </button>
                <button
                  type="button"
                  onClick={() => duplicateTable(selectedTable.id)}
                  className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground hover:border-jade/50"
                >
                  ⧉ Dupliquer
                </button>
                <button
                  type="button"
                  onClick={() => deleteTable(selectedTable.id)}
                  className="min-h-11 rounded-md border border-ember/40 px-3 text-sm font-bold text-ember hover:bg-ember/10"
                >
                  ✕ Supprimer
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTableId(null)}
                  className="min-h-11 rounded-md border border-white/15 px-3 text-sm font-bold text-foreground"
                >
                  Désélectionner
                </button>
              </div>
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
            <p className="mt-1 text-sm text-muted">
              Les élèves proviennent des noms saisis sur les tables du plan.
            </p>
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
                  <option value="">Élève 1</option>
                  {namedSeats.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <select
                  value={avoidB}
                  onChange={(e) => setAvoidB(e.target.value)}
                  className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
                >
                  <option value="">Élève 2</option>
                  {namedSeats.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
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
                  const a = namedSeatsMap.get(pair.a) ?? "?";
                  const b = namedSeatsMap.get(pair.b) ?? "?";
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
              disabled={groups.length === 0 || namedSeats.length === 0}
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
                        .map((id) => namedSeatsMap.get(id))
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
                Utilisez le menu à côté de chaque élève pour le déplacer vers
                un autre groupe.
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {groups.map((group) => (
                  <div
                    key={group.id}
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
                      {(groupedSeats.get(group.id) ?? []).map((seat) => {
                        const role = roleAssignment[seat.id];
                        const roleLabel = roles.find((r) => r.id === role)?.label;
                        return (
                          <li
                            key={seat.id}
                            className="flex items-center justify-between gap-2 rounded-md border border-white/10 bg-background/30 px-2 py-1 text-sm font-bold text-foreground"
                          >
                            <span>{seat.name}</span>
                            <span className="flex items-center gap-2">
                              {roleLabel && (
                                <span className="text-xs font-bold uppercase tracking-wide text-muted">
                                  {roleLabel}
                                </span>
                              )}
                              <select
                                value={group.id}
                                onChange={(e) =>
                                  setSeatGroup(
                                    seat.id,
                                    e.target.value === "none"
                                      ? null
                                      : e.target.value,
                                  )
                                }
                                aria-label={`Déplacer ${seat.name} vers un autre groupe`}
                                className="min-h-9 rounded-md border border-white/15 bg-background/60 px-1 text-xs font-bold text-foreground print:hidden"
                              >
                                {groups.map((g) => (
                                  <option key={g.id} value={g.id}>
                                    {g.name}
                                  </option>
                                ))}
                                <option value="none">Sans groupe</option>
                              </select>
                            </span>
                          </li>
                        );
                      })}
                      {(groupedSeats.get(group.id) ?? []).length === 0 && (
                        <li className="text-xs text-muted">Aucun élève.</li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>

              {ungroupedSeats.length > 0 && (
                <div className="mt-4 rounded-lg border border-white/15 bg-background/30 p-3 print:hidden">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                    Élèves sans groupe
                  </p>
                  <ul className="mt-2 space-y-2" role="list">
                    {ungroupedSeats.map((seat) => (
                      <li
                        key={seat.id}
                        className="flex items-center justify-between gap-2 rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-bold text-foreground"
                      >
                        <span>{seat.name}</span>
                        <select
                          defaultValue=""
                          onChange={(e) => {
                            if (e.target.value) setSeatGroup(seat.id, e.target.value);
                          }}
                          aria-label={`Ajouter ${seat.name} à un groupe`}
                          className="min-h-9 rounded-md border border-white/15 bg-background/60 px-1 text-xs font-bold text-foreground"
                        >
                          <option value="" disabled>
                            Choisir un groupe
                          </option>
                          {groups.map((g) => (
                            <option key={g.id} value={g.id}>
                              {g.name}
                            </option>
                          ))}
                        </select>
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
