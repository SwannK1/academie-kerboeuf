"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type DragEvent,
  type KeyboardEvent,
} from "react";
import {
  teacherLevels,
  teacherPeriods,
  teacherSubjects,
  getTeacherProgrammationItemsByLevel,
  type TeacherLevel,
  type TeacherPeriod,
  type TeacherSubject,
} from "@/content/teacher-programmation";

/**
 * Progression de période — v2.
 *
 * Modèle pédagogique obligatoire :
 *   niveau → période → matière → domaine → compétence → séquence → semaine → statut
 *
 * Règle : 1 séquence = 1 compétence. `competenceId` est une chaîne unique,
 * jamais un tableau — pas de séquence multi-compétences.
 *
 * Statuts locaux à cet outil uniquement (distincts des statuts publics de
 * visibilité "disponible"/"bientôt"/"en construction" gouvernés par
 * content/public-status.*). Ne jamais router ces 4 statuts via la façade
 * publique ni via PublicStatusBadge : ce sont deux systèmes différents.
 *
 * Aucune donnée nominative ou d'élève : uniquement séquence / compétence /
 * semaine / matière / domaine / statut / durée.
 */

export type SequenceStatus = "a-programmer" | "prevu" | "en-cours" | "termine";

export const SEQUENCE_STATUSES: { id: SequenceStatus; label: string }[] = [
  { id: "a-programmer", label: "À programmer" },
  { id: "prevu", label: "Prévu" },
  { id: "en-cours", label: "En cours" },
  { id: "termine", label: "Terminé" },
];

const STATUS_STYLES: Record<SequenceStatus, string> = {
  "a-programmer": "border-white/20 bg-white/5 text-muted",
  prevu: "border-sky-400/50 bg-sky-400/10 text-sky-300",
  "en-cours": "border-gold/50 bg-gold/10 text-gold",
  termine: "border-jade/50 bg-jade/10 text-jade",
};

export const WEEKS = [1, 2, 3, 4, 5] as const;
export type WeekNumber = (typeof WEEKS)[number];

export interface PeriodSequence {
  id: string;
  niveau: TeacherLevel;
  periode: TeacherPeriod;
  matiere: TeacherSubject;
  domaine: string;
  /** Identifiant unique de compétence — 1 séquence = 1 compétence. */
  competenceId: string;
  competenceLabel: string;
  titre: string;
  semaine: WeekNumber;
  /** Durée indicative en minutes. */
  dureeMinutes: number;
  statut: SequenceStatus;
}

type StoredStateV2 = {
  sequences: PeriodSequence[];
};

const STORAGE_KEY_V2 = "progression-periode-v2";
const STORAGE_KEY_V1 = "academie-kerboeuf-progression-periode-v1";

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/**
 * Migration v1 -> v2.
 *
 * Forme v1 (academie-kerboeuf-progression-periode-v1) :
 *   Record<"<level>__<period>", string[]>  — un simple ordre d'ids faisant
 *   référence à des entrées de content/primary-programmation.ts. Aucun champ
 *   "semaine", "durée" ou "statut" propre n'existait dans le stockage : seul
 *   l'ordre relatif était persisté, le reste (titre, compétence, matière,
 *   domaine, statut) provenait de la donnée statique au moment de l'affichage.
 *
 * Comme la v1 ne stockait ni semaine ni durée ni statut par séquence (champs
 * désormais obligatoires en v2), une reconstruction fidèle est impossible.
 * Le contenu utile et réel de la v1 est l'ORDRE choisi par l'enseignant pour
 * un (niveau, période) donné : on le préserve en répartissant les séquences
 * migrées sur les semaines 1..5 dans l'ordre sauvegardé (round-robin), avec
 * un statut par défaut "a-programmer" et une durée par défaut de 45 minutes
 * (valeur neutre, à ajuster manuellement par l'enseignant après migration).
 * On loggue chaque séquence migrée pour traçabilité — aucune donnée n'est
 * perdue silencieusement, mais le mapping "semaine"/"durée" est une
 * approximation explicite, pas une vérité reconstruite.
 */
function migrateFromV1(): PeriodSequence[] {
  const v1 = readJson<Record<string, string[]>>(STORAGE_KEY_V1);
  if (!v1 || Object.keys(v1).length === 0) return [];

  const migrated: PeriodSequence[] = [];

  for (const [key, orderedIds] of Object.entries(v1)) {
    const [levelRaw, periodRaw] = key.split("__");
    const level = levelRaw as TeacherLevel;
    const period = periodRaw as TeacherPeriod;
    const catalogue = getTeacherProgrammationItemsByLevel(level);

    orderedIds.forEach((id, index) => {
      const item = catalogue.find((entry) => entry.id === id);
      if (!item || item.period !== period) return;

      const semaine = ((index % 5) + 1) as WeekNumber;
      const migratedSequence: PeriodSequence = {
        id: `migrated-${item.id}`,
        niveau: level,
        periode: period,
        matiere: item.subject,
        domaine: item.domain,
        competenceId: item.id,
        competenceLabel: item.skill,
        titre: item.title,
        semaine,
        dureeMinutes: 45,
        statut: "a-programmer",
      };
      migrated.push(migratedSequence);
      console.info(
        `[progression v1->v2] séquence migrée: "${migratedSequence.titre}" ` +
          `(${level}/${period}) -> semaine ${semaine}, durée par défaut 45 min, statut "a-programmer".`,
      );
    });
  }

  return migrated;
}

function readStoredSequences(): PeriodSequence[] {
  const v2 = readJson<StoredStateV2>(STORAGE_KEY_V2);
  if (v2 && Array.isArray(v2.sequences)) {
    return v2.sequences;
  }
  // Pas de clé v2 : tenter une migration depuis la v1 (lecture unique).
  const migrated = migrateFromV1();
  return migrated;
}

function writeStoredSequences(sequences: PeriodSequence[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    STORAGE_KEY_V2,
    JSON.stringify({ sequences } satisfies StoredStateV2),
  );
}

let sequenceCounter = 0;
function nextId(): string {
  sequenceCounter += 1;
  return `seq-${Date.now()}-${sequenceCounter}`;
}

export function TeacherPeriodProgressionClient() {
  const [niveau, setNiveau] = useState<TeacherLevel>("cp");
  const [periode, setPeriode] = useState<TeacherPeriod>("periode-1");
  const [sequences, setSequences] = useState<PeriodSequence[]>(() =>
    readStoredSequences(),
  );

  // Filtres
  const [filterMatiere, setFilterMatiere] = useState<TeacherSubject | "all">(
    "all",
  );
  const [filterDomaine, setFilterDomaine] = useState<string | "all">("all");
  const [filterStatut, setFilterStatut] = useState<SequenceStatus | "all">(
    "all",
  );

  // Vue mobile : une semaine à la fois.
  const [mobileWeek, setMobileWeek] = useState<WeekNumber>(1);

  // Formulaire de création / édition.
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formMatiere, setFormMatiere] = useState<TeacherSubject>("francais");
  const [formCompetenceId, setFormCompetenceId] = useState<string>("");
  const [formTitre, setFormTitre] = useState("");
  const [formSemaine, setFormSemaine] = useState<WeekNumber>(1);
  const [formDuree, setFormDuree] = useState(45);
  const [formStatut, setFormStatut] = useState<SequenceStatus>("a-programmer");

  const formId = useId();

  // Drag state.
  const dragIdRef = useRef<string | null>(null);
  const [dropTarget, setDropTarget] = useState<{
    semaine: WeekNumber;
    index: number;
  } | null>(null);

  useEffect(() => {
    writeStoredSequences(sequences);
  }, [sequences]);

  const catalogue = useMemo(
    () => getTeacherProgrammationItemsByLevel(niveau),
    [niveau],
  );

  const catalogueForPeriod = useMemo(
    () => catalogue.filter((item) => item.period === periode),
    [catalogue, periode],
  );

  const catalogueForFormMatiere = useMemo(
    () =>
      catalogueForPeriod.filter((item) => item.subject === formMatiere),
    [catalogueForPeriod, formMatiere],
  );

  const domainesForFormMatiere = useMemo(() => {
    const seen = new Set<string>();
    const domains: string[] = [];
    for (const item of catalogueForFormMatiere) {
      if (!seen.has(item.domain)) {
        seen.add(item.domain);
        domains.push(item.domain);
      }
    }
    return domains;
  }, [catalogueForFormMatiere]);

  const [formDomaine, setFormDomaine] = useState<string>("");

  const competencesForFormDomaine = useMemo(
    () =>
      catalogueForFormMatiere.filter((item) => item.domain === formDomaine),
    [catalogueForFormMatiere, formDomaine],
  );

  const periodSequences = useMemo(
    () =>
      sequences.filter(
        (sequence) => sequence.niveau === niveau && sequence.periode === periode,
      ),
    [sequences, niveau, periode],
  );

  const availableMatieres = useMemo(() => {
    const seen = new Set<TeacherSubject>();
    const list: TeacherSubject[] = [];
    for (const sequence of periodSequences) {
      if (!seen.has(sequence.matiere)) {
        seen.add(sequence.matiere);
        list.push(sequence.matiere);
      }
    }
    return list;
  }, [periodSequences]);

  const availableDomaines = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const sequence of periodSequences) {
      if (!seen.has(sequence.domaine)) {
        seen.add(sequence.domaine);
        list.push(sequence.domaine);
      }
    }
    return list;
  }, [periodSequences]);

  const filteredSequences = useMemo(
    () =>
      periodSequences.filter((sequence) => {
        if (filterMatiere !== "all" && sequence.matiere !== filterMatiere) {
          return false;
        }
        if (filterDomaine !== "all" && sequence.domaine !== filterDomaine) {
          return false;
        }
        if (filterStatut !== "all" && sequence.statut !== filterStatut) {
          return false;
        }
        return true;
      }),
    [periodSequences, filterMatiere, filterDomaine, filterStatut],
  );

  const sequencesByWeek = useMemo(() => {
    const map = new Map<WeekNumber, PeriodSequence[]>();
    for (const week of WEEKS) {
      map.set(
        week,
        filteredSequences
          .filter((sequence) => sequence.semaine === week)
          .sort((a, b) => {
            const orderA = periodSequences.indexOf(a);
            const orderB = periodSequences.indexOf(b);
            return orderA - orderB;
          }),
      );
    }
    return map;
  }, [filteredSequences, periodSequences]);

  const syntheseByMatiere = useMemo(() => {
    const map = new Map<TeacherSubject, { count: number; dureeMinutes: number }>();
    for (const sequence of periodSequences) {
      const current = map.get(sequence.matiere) ?? { count: 0, dureeMinutes: 0 };
      current.count += 1;
      current.dureeMinutes += sequence.dureeMinutes;
      map.set(sequence.matiere, current);
    }
    return map;
  }, [periodSequences]);

  // --- Fonctions canoniques de déplacement, utilisées par le drag & drop ET
  // --- les boutons clavier (même implémentation, pas de logique divergente).

  const moveWithinWeek = useCallback(
    (id: string, direction: -1 | 1) => {
      setSequences((prev) => {
        const sequence = prev.find((entry) => entry.id === id);
        if (!sequence) return prev;
        const sameWeek = prev.filter(
          (entry) =>
            entry.niveau === sequence.niveau &&
            entry.periode === sequence.periode &&
            entry.semaine === sequence.semaine,
        );
        const index = sameWeek.indexOf(sequence);
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= sameWeek.length) return prev;

        const targetSequence = sameWeek[targetIndex];
        const globalIndexA = prev.indexOf(sequence);
        const globalIndexB = prev.indexOf(targetSequence);

        const next = [...prev];
        [next[globalIndexA], next[globalIndexB]] = [
          next[globalIndexB],
          next[globalIndexA],
        ];
        return next;
      });
    },
    [],
  );

  const moveToWeek = useCallback(
    (id: string, targetWeek: WeekNumber, targetIndex?: number) => {
      setSequences((prev) => {
        const sequence = prev.find((entry) => entry.id === id);
        if (!sequence) return prev;
        if (targetWeek < 1 || targetWeek > 5) return prev;

        const without = prev.filter((entry) => entry.id !== id);
        const updated: PeriodSequence = { ...sequence, semaine: targetWeek };

        if (targetIndex === undefined) {
          return [...without, updated];
        }

        // Insertion à une position précise relative aux séquences de la
        // semaine cible (pour le drop avec indicateur de position).
        const weekEntries = without.filter(
          (entry) =>
            entry.niveau === sequence.niveau &&
            entry.periode === sequence.periode &&
            entry.semaine === targetWeek,
        );
        const others = without.filter(
          (entry) =>
            !(
              entry.niveau === sequence.niveau &&
              entry.periode === sequence.periode &&
              entry.semaine === targetWeek
            ),
        );
        const clampedIndex = Math.max(0, Math.min(targetIndex, weekEntries.length));
        const nextWeekEntries = [...weekEntries];
        nextWeekEntries.splice(clampedIndex, 0, updated);
        return [...others, ...nextWeekEntries];
      });
    },
    [],
  );

  function moveToPreviousWeek(id: string) {
    const sequence = sequences.find((entry) => entry.id === id);
    if (!sequence) return;
    moveToWeek(id, (sequence.semaine - 1) as WeekNumber);
  }

  function moveToNextWeek(id: string) {
    const sequence = sequences.find((entry) => entry.id === id);
    if (!sequence) return;
    moveToWeek(id, (sequence.semaine + 1) as WeekNumber);
  }

  // --- Drag & drop natif (HTML5 Drag and Drop API). ---

  function handleDragStart(event: DragEvent<HTMLDivElement>, id: string) {
    dragIdRef.current = id;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", id);
  }

  function handleDragOverSlot(
    event: DragEvent<HTMLLIElement>,
    semaine: WeekNumber,
    index: number,
  ) {
    event.preventDefault();
    setDropTarget({ semaine, index });
  }

  function handleDragOverColumn(event: DragEvent<HTMLDivElement>, semaine: WeekNumber) {
    event.preventDefault();
    const weekEntries = sequencesByWeek.get(semaine) ?? [];
    setDropTarget({ semaine, index: weekEntries.length });
  }

  function handleDrop(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    const id = dragIdRef.current ?? event.dataTransfer.getData("text/plain");
    if (id && dropTarget) {
      moveToWeek(id, dropTarget.semaine, dropTarget.index);
    }
    dragIdRef.current = null;
    setDropTarget(null);
  }

  function handleDragEnd() {
    dragIdRef.current = null;
    setDropTarget(null);
  }

  function handleCardKeyDown(event: KeyboardEvent<HTMLDivElement>, id: string) {
    // Alternative clavier additionnelle (au-delà des boutons explicites) :
    // flèches haut/bas pour réordonner, gauche/droite pour changer de semaine.
    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveWithinWeek(id, -1);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      moveWithinWeek(id, 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveToPreviousWeek(id);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      moveToNextWeek(id);
    }
  }

  // --- Création / édition / suppression. ---

  function resetForm() {
    setEditingId(null);
    setFormMatiere("francais");
    setFormDomaine("");
    setFormCompetenceId("");
    setFormTitre("");
    setFormSemaine(1);
    setFormDuree(45);
    setFormStatut("a-programmer");
  }

  function startEdit(sequence: PeriodSequence) {
    setEditingId(sequence.id);
    setFormMatiere(sequence.matiere);
    setFormDomaine(sequence.domaine);
    setFormCompetenceId(sequence.competenceId);
    setFormTitre(sequence.titre);
    setFormSemaine(sequence.semaine);
    setFormDuree(sequence.dureeMinutes);
    setFormStatut(sequence.statut);
  }

  function deleteSequence(id: string) {
    setSequences((prev) => prev.filter((sequence) => sequence.id !== id));
    if (editingId === id) resetForm();
  }

  function submitForm() {
    if (!formTitre.trim() || !formDomaine || !formCompetenceId) return;
    const competence = catalogueForFormMatiere.find(
      (item) => item.id === formCompetenceId,
    );
    if (!competence) return;

    if (editingId) {
      setSequences((prev) =>
        prev.map((sequence) =>
          sequence.id === editingId
            ? {
                ...sequence,
                matiere: formMatiere,
                domaine: formDomaine,
                competenceId: formCompetenceId,
                competenceLabel: competence.skill,
                titre: formTitre.trim(),
                semaine: formSemaine,
                dureeMinutes: formDuree,
                statut: formStatut,
              }
            : sequence,
        ),
      );
    } else {
      const newSequence: PeriodSequence = {
        id: nextId(),
        niveau,
        periode,
        matiere: formMatiere,
        domaine: formDomaine,
        competenceId: formCompetenceId,
        competenceLabel: competence.skill,
        titre: formTitre.trim(),
        semaine: formSemaine,
        dureeMinutes: formDuree,
        statut: formStatut,
      };
      setSequences((prev) => [...prev, newSequence]);
    }
    resetForm();
  }

  return (
    <div className="mt-10 space-y-8 print:text-black">
      <section aria-labelledby="choix-niveau-periode" className="print:hidden">
        <h2 id="choix-niveau-periode" className="text-xl font-black text-foreground">
          Choisir le niveau et la période
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Niveau
            <select
              value={niveau}
              onChange={(event) => setNiveau(event.target.value as TeacherLevel)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {teacherLevels.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Période
            <select
              value={periode}
              onChange={(event) => setPeriode(event.target.value as TeacherPeriod)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {teacherPeriods.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section aria-labelledby="creer-sequence" className="print:hidden">
        <h2 id="creer-sequence" className="text-xl font-black text-foreground">
          {editingId ? "Modifier la séquence" : "Créer une séquence"}
        </h2>
        <div className="mt-4 grid gap-4 rounded-lg border border-white/10 bg-background/45 p-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Matière
            <select
              value={formMatiere}
              onChange={(event) => {
                setFormMatiere(event.target.value as TeacherSubject);
                setFormDomaine("");
                setFormCompetenceId("");
              }}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {teacherSubjects.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Domaine
            <select
              value={formDomaine}
              onChange={(event) => {
                setFormDomaine(event.target.value);
                setFormCompetenceId("");
              }}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              <option value="">Choisir un domaine</option>
              {domainesForFormMatiere.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Compétence
            <select
              value={formCompetenceId}
              onChange={(event) => setFormCompetenceId(event.target.value)}
              disabled={!formDomaine}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground disabled:opacity-40"
            >
              <option value="">Choisir une compétence</option>
              {competencesForFormDomaine.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.skill}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2 lg:col-span-1">
            Titre de la séquence
            <input
              type="text"
              value={formTitre}
              onChange={(event) => setFormTitre(event.target.value)}
              placeholder="Ex : Découverte de l'imparfait"
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Semaine
            <select
              value={formSemaine}
              onChange={(event) =>
                setFormSemaine(Number(event.target.value) as WeekNumber)
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {WEEKS.map((week) => (
                <option key={week} value={week}>
                  Semaine {week}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Durée indicative (minutes)
            <input
              type="number"
              min={5}
              step={5}
              value={formDuree}
              onChange={(event) => setFormDuree(Number(event.target.value) || 0)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Statut
            <select
              value={formStatut}
              onChange={(event) =>
                setFormStatut(event.target.value as SequenceStatus)
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {SEQUENCE_STATUSES.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-3">
            <button
              type="button"
              onClick={submitForm}
              disabled={!formTitre.trim() || !formDomaine || !formCompetenceId}
              className="min-h-11 rounded-md border border-jade/50 bg-jade/15 px-4 text-sm font-bold text-jade transition hover:bg-jade/25 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {editingId ? "Enregistrer les modifications" : "Ajouter la séquence"}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={resetForm}
                className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-ember/50 hover:text-ember"
              >
                Annuler
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <section aria-labelledby="filtres" className="print:hidden">
        <h2 id="filtres" className="text-xl font-black text-foreground">
          Filtres
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Matière
            <select
              value={filterMatiere}
              onChange={(event) =>
                setFilterMatiere(event.target.value as TeacherSubject | "all")
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              <option value="all">Toutes les matières</option>
              {availableMatieres.map((subject) => (
                <option key={subject} value={subject}>
                  {teacherSubjects.find((option) => option.id === subject)?.label ??
                    subject}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Domaine
            <select
              value={filterDomaine}
              onChange={(event) => setFilterDomaine(event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              <option value="all">Tous les domaines</option>
              {availableDomaines.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Statut
            <select
              value={filterStatut}
              onChange={(event) =>
                setFilterStatut(event.target.value as SequenceStatus | "all")
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              <option value="all">Tous les statuts</option>
              {SEQUENCE_STATUSES.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section aria-labelledby="synthese-matiere">
        <h2 id="synthese-matiere" className="text-xl font-black text-foreground">
          Synthèse par matière
        </h2>
        {syntheseByMatiere.size === 0 ? (
          <p className="mt-4 text-sm text-muted">Aucune séquence pour cette période.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[28rem] border-collapse text-left text-sm print:border print:border-black">
              <thead>
                <tr className="border-b border-white/10 text-xs font-bold uppercase tracking-wide text-muted print:border-black print:text-black">
                  <th className="py-2 pr-4">Matière</th>
                  <th className="py-2 pr-4">Séquences</th>
                  <th className="py-2 pr-4">Durée totale</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(syntheseByMatiere.entries()).map(([subject, stats]) => (
                  <tr
                    key={subject}
                    className="border-b border-white/5 print:border-black"
                  >
                    <td className="py-2 pr-4 font-bold text-foreground">
                      {teacherSubjects.find((option) => option.id === subject)
                        ?.label ?? subject}
                    </td>
                    <td className="py-2 pr-4">{stats.count}</td>
                    <td className="py-2 pr-4">
                      {stats.dureeMinutes} min ({Math.round((stats.dureeMinutes / 60) * 10) / 10} h)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section aria-labelledby="semaines">
        <h2 id="semaines" className="text-xl font-black text-foreground">
          Semaines de la période
        </h2>

        {/* Navigation mobile : une semaine à la fois. */}
        <div className="mt-4 flex items-center justify-between gap-3 sm:hidden print:hidden">
          <button
            type="button"
            onClick={() => setMobileWeek((week) => (week > 1 ? ((week - 1) as WeekNumber) : week))}
            disabled={mobileWeek === 1}
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Semaine précédente
          </button>
          <span className="text-sm font-black text-foreground">Semaine {mobileWeek}</span>
          <button
            type="button"
            onClick={() => setMobileWeek((week) => (week < 5 ? ((week + 1) as WeekNumber) : week))}
            disabled={mobileWeek === 5}
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            Semaine suivante →
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:hidden print:hidden">
          <WeekColumn
            week={mobileWeek}
            sequences={sequencesByWeek.get(mobileWeek) ?? []}
            dropTarget={dropTarget}
            onDragStart={handleDragStart}
            onDragOverSlot={handleDragOverSlot}
            onDragOverColumn={handleDragOverColumn}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            onCardKeyDown={handleCardKeyDown}
            onMoveUp={(id) => moveWithinWeek(id, -1)}
            onMoveDown={(id) => moveWithinWeek(id, 1)}
            onMovePrev={moveToPreviousWeek}
            onMoveNext={moveToNextWeek}
            onEdit={startEdit}
            onDelete={deleteSequence}
            formId={formId}
          />
        </div>

        <div className="mt-4 hidden gap-4 sm:grid sm:grid-cols-5 print:grid print:grid-cols-1 print:gap-2">
          {WEEKS.map((week) => (
            <WeekColumn
              key={week}
              week={week}
              sequences={sequencesByWeek.get(week) ?? []}
              dropTarget={dropTarget}
              onDragStart={handleDragStart}
              onDragOverSlot={handleDragOverSlot}
              onDragOverColumn={handleDragOverColumn}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
              onCardKeyDown={handleCardKeyDown}
              onMoveUp={(id) => moveWithinWeek(id, -1)}
              onMoveDown={(id) => moveWithinWeek(id, 1)}
              onMovePrev={moveToPreviousWeek}
              onMoveNext={moveToNextWeek}
              onEdit={startEdit}
              onDelete={deleteSequence}
              formId={formId}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

interface WeekColumnProps {
  week: WeekNumber;
  sequences: PeriodSequence[];
  dropTarget: { semaine: WeekNumber; index: number } | null;
  onDragStart: (event: DragEvent<HTMLDivElement>, id: string) => void;
  onDragOverSlot: (
    event: DragEvent<HTMLLIElement>,
    semaine: WeekNumber,
    index: number,
  ) => void;
  onDragOverColumn: (event: DragEvent<HTMLDivElement>, semaine: WeekNumber) => void;
  onDrop: (event: DragEvent<HTMLElement>) => void;
  onDragEnd: () => void;
  onCardKeyDown: (event: KeyboardEvent<HTMLDivElement>, id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onMovePrev: (id: string) => void;
  onMoveNext: (id: string) => void;
  onEdit: (sequence: PeriodSequence) => void;
  onDelete: (id: string) => void;
  formId: string;
}

function WeekColumn({
  week,
  sequences,
  dropTarget,
  onDragStart,
  onDragOverSlot,
  onDragOverColumn,
  onDrop,
  onDragEnd,
  onCardKeyDown,
  onMoveUp,
  onMoveDown,
  onMovePrev,
  onMoveNext,
  onEdit,
  onDelete,
  formId,
}: WeekColumnProps) {
  return (
    <div
      onDragOver={(event) => onDragOverColumn(event, week)}
      onDrop={onDrop}
      className="flex flex-col gap-3 rounded-lg border border-white/10 bg-background/30 p-3 print:break-inside-avoid print:border-black print:bg-transparent"
    >
      <h3 className="text-sm font-black uppercase tracking-wide text-foreground print:text-black">
        Semaine {week}
      </h3>
      <ol className="flex flex-col gap-2" role="list" aria-labelledby={`${formId}-week-${week}`}>
        {sequences.length === 0 ? (
          <li className="rounded-md border border-dashed border-white/15 p-3 text-xs text-muted print:hidden">
            Aucune séquence.
          </li>
        ) : null}
        {sequences.map((sequence, index) => (
          <li
            key={sequence.id}
            onDragOver={(event) => onDragOverSlot(event, week, index)}
            onDrop={onDrop}
            className={
              dropTarget?.semaine === week && dropTarget.index === index
                ? "border-t-2 border-jade pt-1"
                : undefined
            }
          >
            <SequenceCard
              sequence={sequence}
              index={index}
              total={sequences.length}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onCardKeyDown={onCardKeyDown}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
              onMovePrev={onMovePrev}
              onMoveNext={onMoveNext}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

interface SequenceCardProps {
  sequence: PeriodSequence;
  index: number;
  total: number;
  onDragStart: (event: DragEvent<HTMLDivElement>, id: string) => void;
  onDragEnd: () => void;
  onCardKeyDown: (event: KeyboardEvent<HTMLDivElement>, id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onMovePrev: (id: string) => void;
  onMoveNext: (id: string) => void;
  onEdit: (sequence: PeriodSequence) => void;
  onDelete: (id: string) => void;
}

function SequenceCard({
  sequence,
  index,
  total,
  onDragStart,
  onDragEnd,
  onCardKeyDown,
  onMoveUp,
  onMoveDown,
  onMovePrev,
  onMoveNext,
  onEdit,
  onDelete,
}: SequenceCardProps) {
  const matiereLabel =
    teacherSubjects.find((option) => option.id === sequence.matiere)?.label ??
    sequence.matiere;
  const statutLabel =
    SEQUENCE_STATUSES.find((option) => option.id === sequence.statut)?.label ??
    sequence.statut;

  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, sequence.id)}
      onDragEnd={onDragEnd}
      onKeyDown={(event) => onCardKeyDown(event, sequence.id)}
      tabIndex={0}
      role="group"
      aria-label={`Séquence ${sequence.titre}`}
      className="rounded-md border border-white/10 bg-background/50 p-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-jade/60 print:border-black"
    >
      <div className="flex items-start justify-between gap-2">
        <span
          aria-hidden="true"
          className="select-none text-muted print:hidden"
          title="Glisser pour déplacer"
        >
          ⠿
        </span>
        <span
          className={`rounded-full border px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide ${STATUS_STYLES[sequence.statut]} print:border-black print:bg-transparent print:text-black`}
        >
          {statutLabel}
        </span>
      </div>

      <p className="mt-2 text-xs font-bold uppercase tracking-wide text-muted print:text-black">
        {matiereLabel} · {sequence.domaine}
      </p>
      <h4 className="mt-1 font-black text-foreground print:text-black">
        {sequence.titre}
      </h4>
      <p className="mt-1 text-xs leading-5 text-muted print:text-black">
        Compétence : {sequence.competenceLabel}
      </p>
      <p className="mt-1 text-xs font-medium text-muted print:text-black">
        Durée indicative : {sequence.dureeMinutes} min
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5 print:hidden">
        <button
          type="button"
          onClick={() => onMoveUp(sequence.id)}
          disabled={index === 0}
          aria-label={`Monter ${sequence.titre} dans la semaine`}
          className="min-h-9 min-w-9 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/50 hover:text-jade disabled:cursor-not-allowed disabled:opacity-30"
        >
          ↑
        </button>
        <button
          type="button"
          onClick={() => onMoveDown(sequence.id)}
          disabled={index === total - 1}
          aria-label={`Descendre ${sequence.titre} dans la semaine`}
          className="min-h-9 min-w-9 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/50 hover:text-jade disabled:cursor-not-allowed disabled:opacity-30"
        >
          ↓
        </button>
        <button
          type="button"
          onClick={() => onMovePrev(sequence.id)}
          disabled={sequence.semaine === 1}
          aria-label={`Déplacer ${sequence.titre} vers la semaine précédente`}
          className="min-h-9 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/50 hover:text-jade disabled:cursor-not-allowed disabled:opacity-30"
        >
          ← Semaine
        </button>
        <button
          type="button"
          onClick={() => onMoveNext(sequence.id)}
          disabled={sequence.semaine === 5}
          aria-label={`Déplacer ${sequence.titre} vers la semaine suivante`}
          className="min-h-9 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-jade/50 hover:text-jade disabled:cursor-not-allowed disabled:opacity-30"
        >
          Semaine →
        </button>
        <button
          type="button"
          onClick={() => onEdit(sequence)}
          aria-label={`Modifier ${sequence.titre}`}
          className="min-h-9 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-sky-400/50 hover:text-sky-300"
        >
          Modifier
        </button>
        <button
          type="button"
          onClick={() => onDelete(sequence.id)}
          aria-label={`Supprimer ${sequence.titre}`}
          className="min-h-9 rounded-md border border-white/15 px-2 text-xs font-bold text-foreground transition hover:border-ember/50 hover:text-ember"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}
