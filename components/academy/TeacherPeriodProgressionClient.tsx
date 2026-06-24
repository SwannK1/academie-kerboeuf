"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type DragEvent,
} from "react";
import {
  schoolLevels,
  curriculumSubjects,
  getSubjectsForLevel,
} from "@/content/teacher-programming-curriculum";
import {
  listPlanningExportItems,
  type PlanningExportItem,
} from "@/content/teacher-programmation-planning";
import {
  nextCardId,
  periodNumberFromId,
  readStoredCards,
  statusClassName,
  SEQUENCE_STATUSES,
  teacherPeriods,
  writeStoredCards,
  type PeriodCard,
  type SequenceStatus,
  type TeacherLevel,
  type TeacherPeriod,
  type TeacherSubjectId,
} from "@/content/teacher-progression";

/**
 * Progression de période — Kanban modulable.
 *
 * Relié à la programmation annuelle (mêmes matières/domaines/compétences,
 * `content/teacher-programming-curriculum.ts`) mais totalement indépendant
 * du cahier journal et de l'emploi du temps : cet outil ne planifie pas de
 * créneaux horaires, il suit l'avancement de séquences sur une colonne de
 * statut.
 *
 * Statuts locaux à cet outil uniquement (distincts des statuts publics de
 * visibilité "disponible"/"bientôt"/"en construction" gouvernés par
 * content/public-status.*). Ne jamais router ces statuts via la façade
 * publique ni via PublicStatusBadge : ce sont deux systèmes différents.
 *
 * Aucune donnée nominative ou d'élève : uniquement carte / compétence /
 * matière / durée / statut.
 *
 * "Imprimables disponibles" : le catalogue de compétences de programmation
 * annuelle ne porte aujourd'hui aucune référence vers de vrais PDF. Tant
 * qu'aucune liaison réelle n'existe, ce champ reste donc toujours vide —
 * jamais de lien fictif ni de PDF inventé.
 */

export type { TeacherLevel, TeacherPeriod, TeacherSubjectId };
export { teacherPeriods, SEQUENCE_STATUSES };
export type { SequenceStatus, PeriodCard };

let cardCounter = 0;
function nextId(): string {
  cardCounter += 1;
  return `${nextCardId()}-${cardCounter}`;
}

type ImportScope = "all" | "subject";

export function TeacherPeriodProgressionClient() {
  const [niveau, setNiveau] = useState<TeacherLevel>("cp");
  const [periode, setPeriode] = useState<TeacherPeriod>("periode-1");
  const [cards, setCards] = useState<PeriodCard[]>(() => readStoredCards());

  const [filterMatiere, setFilterMatiere] = useState<TeacherSubjectId | "all">(
    "all",
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [creationMode, setCreationMode] = useState<"catalogue" | "libre" | null>(
    null,
  );
  const [formMatiere, setFormMatiere] = useState<TeacherSubjectId>("francais");
  const [formDomaine, setFormDomaine] = useState<string>("");
  const [formCompetenceId, setFormCompetenceId] = useState<string>("");
  const [formCompetenceLibre, setFormCompetenceLibre] = useState("");
  const [formDuree, setFormDuree] = useState(45);

  const [importOpen, setImportOpen] = useState(false);
  const [importScope, setImportScope] = useState<ImportScope>("all");
  const [importSubject, setImportSubject] = useState<TeacherSubjectId>("francais");
  const [importOnlyNew, setImportOnlyNew] = useState(true);
  const [importSummary, setImportSummary] = useState<string | null>(null);

  const formId = useId();

  const [dragId, setDragId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<{
    statut: SequenceStatus;
    index: number;
  } | null>(null);

  useEffect(() => {
    writeStoredCards(cards);
  }, [cards]);

  const subjectsForLevel = useMemo(() => getSubjectsForLevel(niveau), [niveau]);

  const subjectLabelById = useMemo(() => {
    const map = new Map<string, string>();
    curriculumSubjects.forEach((subject) => map.set(subject.id, subject.label));
    return map;
  }, []);

  const formSubject = useMemo(
    () => subjectsForLevel.find((subject) => subject.id === formMatiere) ?? null,
    [subjectsForLevel, formMatiere],
  );

  const domainesForFormMatiere = useMemo(
    () => formSubject?.domains.map((domain) => domain.id) ?? [],
    [formSubject],
  );

  const domainLabelById = useMemo(() => {
    const map = new Map<string, string>();
    formSubject?.domains.forEach((domain) => map.set(domain.id, domain.label));
    return map;
  }, [formSubject]);

  const competencesForFormDomaine = useMemo(
    () =>
      formSubject?.domains.find((domain) => domain.id === formDomaine)
        ?.competencies ?? [],
    [formSubject, formDomaine],
  );

  const periodCards = useMemo(
    () => cards.filter((card) => card.niveau === niveau && card.periode === periode),
    [cards, niveau, periode],
  );

  const availableMatieres = useMemo(() => {
    const seen = new Set<TeacherSubjectId>();
    const list: TeacherSubjectId[] = [];
    for (const card of periodCards) {
      if (!seen.has(card.matiere)) {
        seen.add(card.matiere);
        list.push(card.matiere);
      }
    }
    return list;
  }, [periodCards]);

  const filteredCards = useMemo(
    () =>
      periodCards.filter((card) =>
        filterMatiere === "all" ? true : card.matiere === filterMatiere,
      ),
    [periodCards, filterMatiere],
  );

  const cardsByStatus = useMemo(() => {
    const map = new Map<SequenceStatus, PeriodCard[]>();
    for (const status of SEQUENCE_STATUSES) {
      map.set(
        status.id,
        filteredCards
          .filter((card) => card.statut === status.id)
          .sort((a, b) => periodCards.indexOf(a) - periodCards.indexOf(b)),
      );
    }
    return map;
  }, [filteredCards, periodCards]);

  const syntheseByMatiere = useMemo(() => {
    const map = new Map<
      TeacherSubjectId,
      { total: number; termine: number; dureeMinutes: number }
    >();
    for (const card of periodCards) {
      const current =
        map.get(card.matiere) ?? { total: 0, termine: 0, dureeMinutes: 0 };
      current.total += 1;
      current.dureeMinutes += card.dureeMinutes;
      if (card.statut === "termine") current.termine += 1;
      map.set(card.matiere, current);
    }
    return map;
  }, [periodCards]);

  const selectedCard = useMemo(
    () => cards.find((card) => card.id === selectedId) ?? null,
    [cards, selectedId],
  );

  const importPreview = useMemo<PlanningExportItem[]>(() => {
    const periodNumber = periodNumberFromId(periode);
    const items = listPlanningExportItems(niveau, periodNumber);
    if (importScope === "subject") {
      return items.filter((item) => item.subject === importSubject);
    }
    return items;
  }, [niveau, periode, importScope, importSubject]);

  const moveToStatus = useCallback(
    (id: string, targetStatut: SequenceStatus, targetIndex?: number) => {
      setCards((prev) => {
        const card = prev.find((entry) => entry.id === id);
        if (!card) return prev;

        const without = prev.filter((entry) => entry.id !== id);
        const updated: PeriodCard = { ...card, statut: targetStatut };

        if (targetIndex === undefined) {
          return [...without, updated];
        }

        const columnEntries = without.filter(
          (entry) =>
            entry.niveau === card.niveau &&
            entry.periode === card.periode &&
            entry.statut === targetStatut,
        );
        const others = without.filter(
          (entry) =>
            !(
              entry.niveau === card.niveau &&
              entry.periode === card.periode &&
              entry.statut === targetStatut
            ),
        );
        const clampedIndex = Math.max(
          0,
          Math.min(targetIndex, columnEntries.length),
        );
        const nextColumnEntries = [...columnEntries];
        nextColumnEntries.splice(clampedIndex, 0, updated);
        return [...others, ...nextColumnEntries];
      });
    },
    [],
  );

  function handleDragStart(event: DragEvent<HTMLDivElement>, id: string) {
    setDragId(id);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", id);
  }

  function handleDragOverSlot(
    event: DragEvent<HTMLLIElement>,
    statut: SequenceStatus,
    index: number,
  ) {
    event.preventDefault();
    setDropTarget({ statut, index });
  }

  function handleDragOverColumn(
    event: DragEvent<HTMLDivElement>,
    statut: SequenceStatus,
  ) {
    event.preventDefault();
    const entries = cardsByStatus.get(statut) ?? [];
    setDropTarget({ statut, index: entries.length });
  }

  function handleDrop(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    const id = dragId ?? event.dataTransfer.getData("text/plain");
    if (id && dropTarget) {
      moveToStatus(id, dropTarget.statut, dropTarget.index);
    }
    setDragId(null);
    setDropTarget(null);
  }

  function handleDragEnd() {
    setDragId(null);
    setDropTarget(null);
  }

  function resetForm() {
    setCreationMode(null);
    setFormMatiere("francais");
    setFormDomaine("");
    setFormCompetenceId("");
    setFormCompetenceLibre("");
    setFormDuree(45);
  }

  function deleteCard(id: string) {
    setCards((prev) => prev.filter((card) => card.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function updateCard(id: string, patch: Partial<PeriodCard>) {
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, ...patch } : card)),
    );
  }

  function submitCatalogueForm() {
    const competence = competencesForFormDomaine.find(
      (item) => item.id === formCompetenceId,
    );
    if (!formDomaine || !competence) return;

    const newCard: PeriodCard = {
      id: nextId(),
      niveau,
      periode,
      matiere: formMatiere,
      domaine: formDomaine,
      competenceId: competence.id,
      competenceLabel: competence.label,
      dureeMinutes: formDuree,
      statut: "a-prevoir",
      imprimablesDisponibles: [],
      priority: "important",
    };
    setCards((prev) => [...prev, newCard]);
    resetForm();
  }

  function submitLibreForm() {
    if (!formCompetenceLibre.trim()) return;

    const newCard: PeriodCard = {
      id: nextId(),
      niveau,
      periode,
      matiere: formMatiere,
      domaine: "",
      competenceId: "",
      competenceLabel: formCompetenceLibre.trim(),
      dureeMinutes: formDuree,
      statut: "a-prevoir",
      imprimablesDisponibles: [],
      priority: "important",
    };
    setCards((prev) => [...prev, newCard]);
    resetForm();
  }

  function runImport(overwriteExisting: boolean) {
    setCards((prev) => {
      const existingSourceIds = new Set(
        prev
          .filter((card) => card.sourceProgrammationId)
          .map((card) => card.sourceProgrammationId),
      );
      const toAdd: PeriodCard[] = [];
      let updatedCount = 0;

      const working = prev.map((card) => {
        if (!overwriteExisting || !card.sourceProgrammationId) return card;
        const item = importPreview.find((entry) => entry.sourceId === card.sourceProgrammationId);
        if (!item) return card;
        updatedCount += 1;
        return {
          ...card,
          matiere: item.subject,
          domaine: item.domain,
          competenceId: item.competenceId,
          competenceLabel: item.title,
          dureeMinutes: item.dureeMinutes,
          priority: item.priority,
        };
      });

      for (const item of importPreview) {
        if (existingSourceIds.has(item.sourceId)) {
          continue;
        }
        toAdd.push({
          id: nextId(),
          niveau: item.level,
          periode,
          matiere: item.subject,
          domaine: item.domain,
          competenceId: item.competenceId,
          competenceLabel: item.title,
          dureeMinutes: item.dureeMinutes,
          statut: "a-prevoir",
          imprimablesDisponibles: [],
          priority: item.priority,
          sourceProgrammationId: item.sourceId,
          noteEnseignant: item.teacherNote,
        });
      }

      const summaryParts: string[] = [];
      if (toAdd.length > 0) {
        summaryParts.push(`${toAdd.length} carte(s) importée(s)`);
      }
      if (updatedCount > 0) {
        summaryParts.push(
          `${updatedCount} carte(s) déjà importée(s) mise(s) à jour (statut et notes conservés)`,
        );
      }
      setImportSummary(
        summaryParts.length === 0
          ? "Aucune nouvelle carte à importer pour cette sélection."
          : `${summaryParts.join(", ")} depuis la programmation annuelle.`,
      );

      return [...working, ...toAdd];
    });
  }

  function handleImportClick() {
    const hasExisting = importPreview.some((item) =>
      cards.some((card) => card.sourceProgrammationId === item.sourceId),
    );
    if (!importOnlyNew && hasExisting) {
      const confirmed = window.confirm(
        "Des cartes déjà importées existent pour cette sélection. Mettre à jour la matière, la compétence, la durée et la priorité depuis la programmation annuelle ? Le statut et les notes déjà saisis sur ces cartes seront conservés.",
      );
      if (!confirmed) return;
      runImport(true);
      return;
    }
    runImport(false);
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
              onChange={(event) => {
                setNiveau(event.target.value as TeacherLevel);
                resetForm();
              }}
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              {schoolLevels.map((option) => (
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

      <section aria-labelledby="filtres" className="print:hidden">
        <h2 id="filtres" className="text-xl font-black text-foreground">
          Filtres
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
            Matière
            <select
              value={filterMatiere}
              onChange={(event) =>
                setFilterMatiere(event.target.value as TeacherSubjectId | "all")
              }
              className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
            >
              <option value="all">Toutes les matières</option>
              {availableMatieres.map((subject) => (
                <option key={subject} value={subject}>
                  {subjectLabelById.get(subject) ?? subject}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section aria-labelledby="nouvelle-carte" className="print:hidden">
        <h2 id="nouvelle-carte" className="text-xl font-black text-foreground">
          Ajouter une carte
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              setCreationMode((mode) => (mode === "catalogue" ? null : "catalogue"))
            }
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-sky-400/50 hover:text-sky-300"
          >
            Carte depuis le catalogue
          </button>
          <button
            type="button"
            onClick={() => setCreationMode((mode) => (mode === "libre" ? null : "libre"))}
            className="min-h-11 rounded-md border border-white/15 px-4 text-sm font-bold text-foreground transition hover:border-sky-400/50 hover:text-sky-300"
          >
            Carte libre
          </button>
          <button
            type="button"
            onClick={() => setImportOpen((open) => !open)}
            className="min-h-11 rounded-md border border-jade/50 bg-jade/15 px-4 text-sm font-bold text-jade transition hover:bg-jade/25"
          >
            Importer depuis la programmation annuelle
          </button>
        </div>

        {importOpen ? (
          <div className="mt-4 grid gap-4 rounded-lg border border-jade/30 bg-jade/[0.04] p-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
              Portée
              <select
                value={importScope}
                onChange={(event) => setImportScope(event.target.value as ImportScope)}
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              >
                <option value="all">Importer tout</option>
                <option value="subject">Importer une seule matière</option>
              </select>
            </label>
            {importScope === "subject" ? (
              <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
                Matière
                <select
                  value={importSubject}
                  onChange={(event) => setImportSubject(event.target.value)}
                  className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
                >
                  {subjectsForLevel.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
            <label className="flex min-h-11 items-center gap-2 text-sm font-bold text-foreground">
              <input
                type="checkbox"
                checked={importOnlyNew}
                onChange={(event) => setImportOnlyNew(event.target.checked)}
              />
              Seulement les éléments non déjà présents
            </label>
            <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-4">
              <button
                type="button"
                onClick={handleImportClick}
                disabled={importPreview.length === 0}
                className="min-h-11 rounded-md border border-jade/50 bg-jade/15 px-4 text-sm font-bold text-jade transition hover:bg-jade/25 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Importer ({importPreview.length} élément(s) trouvé(s) dans la programmation)
              </button>
            </div>
            {importSummary ? (
              <p className="text-sm text-muted sm:col-span-2 lg:col-span-4">{importSummary}</p>
            ) : null}
          </div>
        ) : null}

        {creationMode === "catalogue" ? (
          <div className="mt-4 grid gap-4 rounded-lg border border-white/10 bg-background/45 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
              Matière
              <select
                value={formMatiere}
                onChange={(event) => {
                  setFormMatiere(event.target.value as TeacherSubjectId);
                  setFormDomaine("");
                  setFormCompetenceId("");
                }}
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              >
                {subjectsForLevel.map((option) => (
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
                {domainesForFormMatiere.map((domainId) => (
                  <option key={domainId} value={domainId}>
                    {domainLabelById.get(domainId) ?? domainId}
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
                    {item.label}
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
            <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-4">
              <button
                type="button"
                onClick={submitCatalogueForm}
                disabled={!formDomaine || !formCompetenceId}
                className="min-h-11 rounded-md border border-jade/50 bg-jade/15 px-4 text-sm font-bold text-jade transition hover:bg-jade/25 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Ajouter la carte
              </button>
            </div>
          </div>
        ) : null}

        {creationMode === "libre" ? (
          <div className="mt-4 grid gap-4 rounded-lg border border-white/10 bg-background/45 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
              Matière
              <select
                value={formMatiere}
                onChange={(event) => setFormMatiere(event.target.value as TeacherSubjectId)}
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              >
                {subjectsForLevel.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-bold text-foreground sm:col-span-2">
              Compétence (texte libre)
              <input
                type="text"
                value={formCompetenceLibre}
                onChange={(event) => setFormCompetenceLibre(event.target.value)}
                placeholder="Ex : Réviser les tables de multiplication"
                className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
              />
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
            <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-4">
              <button
                type="button"
                onClick={submitLibreForm}
                disabled={!formCompetenceLibre.trim()}
                className="min-h-11 rounded-md border border-jade/50 bg-jade/15 px-4 text-sm font-bold text-jade transition hover:bg-jade/25 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Ajouter la carte
              </button>
            </div>
          </div>
        ) : null}
      </section>

      <section aria-labelledby="synthese-matiere">
        <h2 id="synthese-matiere" className="text-xl font-black text-foreground">
          Progression par matière
        </h2>
        {syntheseByMatiere.size === 0 ? (
          <p className="mt-4 text-sm text-muted">Aucune carte pour cette période.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[28rem] border-collapse text-left text-sm print:border print:border-black">
              <thead>
                <tr className="border-b border-white/10 text-xs font-bold uppercase tracking-wide text-muted print:border-black print:text-black">
                  <th className="py-2 pr-4">Matière</th>
                  <th className="py-2 pr-4">Cartes</th>
                  <th className="py-2 pr-4">Terminées</th>
                  <th className="py-2 pr-4">Durée totale</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(syntheseByMatiere.entries()).map(([subject, stats]) => (
                  <tr key={subject} className="border-b border-white/5 print:border-black">
                    <td className="py-2 pr-4 font-bold text-foreground">
                      {subjectLabelById.get(subject) ?? subject}
                    </td>
                    <td className="py-2 pr-4">{stats.total}</td>
                    <td className="py-2 pr-4">
                      {stats.termine} / {stats.total}
                    </td>
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

      <section aria-labelledby="kanban">
        <h2 id="kanban" className="text-xl font-black text-foreground">
          Tableau Kanban
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-5 print:grid-cols-1 print:gap-2">
          {SEQUENCE_STATUSES.map((status) => (
            <StatusColumn
              key={status.id}
              status={status.id}
              label={status.label}
              cards={cardsByStatus.get(status.id) ?? []}
              dropTarget={dropTarget}
              onDragStart={handleDragStart}
              onDragOverSlot={handleDragOverSlot}
              onDragOverColumn={handleDragOverColumn}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
              onSelect={setSelectedId}
              subjectLabelById={subjectLabelById}
              formId={formId}
            />
          ))}
        </div>
      </section>

      {selectedCard ? (
        <>
          <div
            aria-hidden="true"
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 z-[55] bg-background/40 print:hidden"
          />
          <CardSidePanel
            card={selectedCard}
            subjectLabelById={subjectLabelById}
            onClose={() => setSelectedId(null)}
            onUpdate={(patch) => updateCard(selectedCard.id, patch)}
            onDelete={() => deleteCard(selectedCard.id)}
          />
        </>
      ) : null}
    </div>
  );
}

interface StatusColumnProps {
  status: SequenceStatus;
  label: string;
  cards: PeriodCard[];
  dropTarget: { statut: SequenceStatus; index: number } | null;
  onDragStart: (event: DragEvent<HTMLDivElement>, id: string) => void;
  onDragOverSlot: (
    event: DragEvent<HTMLLIElement>,
    statut: SequenceStatus,
    index: number,
  ) => void;
  onDragOverColumn: (event: DragEvent<HTMLDivElement>, statut: SequenceStatus) => void;
  onDrop: (event: DragEvent<HTMLElement>) => void;
  onDragEnd: () => void;
  onSelect: (id: string) => void;
  subjectLabelById: Map<string, string>;
  formId: string;
}

function StatusColumn({
  status,
  label,
  cards,
  dropTarget,
  onDragStart,
  onDragOverSlot,
  onDragOverColumn,
  onDrop,
  onDragEnd,
  onSelect,
  subjectLabelById,
  formId,
}: StatusColumnProps) {
  return (
    <div
      onDragOver={(event) => onDragOverColumn(event, status)}
      onDrop={onDrop}
      className="flex flex-col gap-3 rounded-lg border border-white/10 bg-background/30 p-3 print:break-inside-avoid print:border-black print:bg-transparent"
    >
      <h3
        id={`${formId}-status-${status}`}
        className="flex items-center justify-between text-sm font-black uppercase tracking-wide text-foreground print:text-black"
      >
        <span>{label}</span>
        <span className="rounded-full border border-white/15 px-2 py-0.5 text-xs font-bold text-muted print:border-black print:text-black">
          {cards.length}
        </span>
      </h3>
      <ol
        className="flex flex-col gap-2"
        role="list"
        aria-labelledby={`${formId}-status-${status}`}
      >
        {cards.length === 0 ? (
          <li className="rounded-md border border-dashed border-white/15 p-3 text-xs text-muted print:hidden">
            Aucune carte.
          </li>
        ) : null}
        {cards.map((card, index) => (
          <li
            key={card.id}
            onDragOver={(event) => onDragOverSlot(event, status, index)}
            onDrop={onDrop}
            className={
              dropTarget?.statut === status && dropTarget.index === index
                ? "border-t-2 border-jade pt-1"
                : undefined
            }
          >
            <ProgressionCard
              card={card}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onSelect={onSelect}
              subjectLabelById={subjectLabelById}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

interface ProgressionCardProps {
  card: PeriodCard;
  onDragStart: (event: DragEvent<HTMLDivElement>, id: string) => void;
  onDragEnd: () => void;
  onSelect: (id: string) => void;
  subjectLabelById: Map<string, string>;
}

function ProgressionCard({
  card,
  onDragStart,
  onDragEnd,
  onSelect,
  subjectLabelById,
}: ProgressionCardProps) {
  const matiereLabel = subjectLabelById.get(card.matiere) ?? card.matiere;
  const statutLabel =
    SEQUENCE_STATUSES.find((option) => option.id === card.statut)?.label ?? card.statut;

  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, card.id)}
      onDragEnd={onDragEnd}
      onClick={() => onSelect(card.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(card.id);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Ouvrir la carte ${card.competenceLabel}`}
      className="cursor-pointer rounded-md border border-white/10 bg-background/50 p-3 text-sm transition hover:border-jade/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-jade/60 print:cursor-default print:border-black"
    >
      <p className="text-xs font-bold uppercase tracking-wide text-muted print:text-black">
        {matiereLabel}
      </p>
      <h4 className="mt-1 font-black leading-snug text-foreground print:text-black">
        {card.competenceLabel}
      </h4>
      <p className="mt-1 text-xs font-medium text-muted print:text-black">
        {card.dureeMinutes} min
        {card.sourceProgrammationId ? " · importée" : ""}
      </p>
      <span
        className={`mt-2 inline-block rounded-full border px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide ${statusClassName(card.statut)} print:border-black print:bg-transparent print:text-black`}
      >
        {statutLabel}
      </span>
      <p className="mt-2 text-xs text-muted print:text-black">
        {card.imprimablesDisponibles.length === 0
          ? "Aucun imprimable disponible"
          : `${card.imprimablesDisponibles.length} imprimable(s) disponible(s)`}
      </p>
    </div>
  );
}

interface CardSidePanelProps {
  card: PeriodCard;
  subjectLabelById: Map<string, string>;
  onClose: () => void;
  onUpdate: (patch: Partial<PeriodCard>) => void;
  onDelete: () => void;
}

function CardSidePanel({
  card,
  subjectLabelById,
  onClose,
  onUpdate,
  onDelete,
}: CardSidePanelProps) {
  const niveauLabel =
    schoolLevels.find((option) => option.id === card.niveau)?.label ?? card.niveau;
  const matiereLabel = subjectLabelById.get(card.matiere) ?? card.matiere;
  const canPrepareLogbook = Boolean(
    card.objectif?.trim() && card.competenceLabel.trim() && card.dureeMinutes > 0,
  );
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    function handlePointerDown(event: PointerEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <aside
      ref={panelRef}
      role="dialog"
      aria-label={`Détails de la carte ${card.competenceLabel}`}
      onClick={(event) => event.stopPropagation()}
      className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-sm flex-col gap-4 overflow-y-auto border-l border-white/10 bg-background p-6 shadow-2xl print:hidden"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-black text-foreground">Détails de la carte</h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer le panneau"
          className="min-h-9 min-w-9 rounded-md border border-white/15 px-2 text-sm font-bold text-foreground transition hover:border-ember/50 hover:text-ember"
        >
          ✕
        </button>
      </div>

      <dl className="space-y-3 text-sm">
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-muted">Niveau</dt>
          <dd className="font-bold text-foreground">{niveauLabel}</dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-muted">Matière</dt>
          <dd className="font-bold text-foreground">{matiereLabel}</dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-muted">Compétence</dt>
          <dd className="font-bold text-foreground">{card.competenceLabel}</dd>
        </div>
      </dl>

      <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
        Statut
        <select
          value={card.statut}
          onChange={(event) => onUpdate({ statut: event.target.value as SequenceStatus })}
          className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
        >
          {SEQUENCE_STATUSES.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
        Objectif
        <textarea
          defaultValue={card.objectif ?? ""}
          onBlur={(event) => onUpdate({ objectif: event.target.value })}
          rows={2}
          className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
        Durée estimée (minutes)
        <input
          type="number"
          min={5}
          step={5}
          value={card.dureeMinutes}
          onChange={(event) => onUpdate({ dureeMinutes: Number(event.target.value) || 0 })}
          className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
        Nombre de séances
        <input
          type="number"
          min={1}
          step={1}
          defaultValue={card.nombreSeances ?? 1}
          onBlur={(event) => onUpdate({ nombreSeances: Number(event.target.value) || 1 })}
          className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
        Traces prévues
        <input
          type="text"
          defaultValue={card.tracesPrevues ?? ""}
          onBlur={(event) => onUpdate({ tracesPrevues: event.target.value })}
          placeholder="Ex : cahier du jour, affichage"
          className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
        Évaluation prévue
        <input
          type="text"
          defaultValue={card.evaluationPrevue ?? ""}
          onBlur={(event) => onUpdate({ evaluationPrevue: event.target.value })}
          placeholder="Ex : exercices d'application, dictée"
          className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
        Différenciation
        <input
          type="text"
          defaultValue={card.differenciation ?? ""}
          onBlur={(event) => onUpdate({ differenciation: event.target.value })}
          placeholder="Ex : groupe de besoin, étayage"
          className="min-h-11 rounded-md border border-white/15 bg-background/60 px-3 text-sm font-medium text-foreground"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
        Note enseignant
        <textarea
          defaultValue={card.noteEnseignant ?? ""}
          onBlur={(event) => onUpdate({ noteEnseignant: event.target.value })}
          rows={2}
          className="rounded-md border border-white/15 bg-background/60 px-3 py-2 text-sm font-medium text-foreground"
        />
      </label>

      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-muted">
          Imprimables disponibles
        </p>
        {card.imprimablesDisponibles.length === 0 ? (
          <p className="mt-1 text-sm text-muted">Aucun imprimable disponible.</p>
        ) : (
          <ul className="mt-1 space-y-1 text-sm">
            {card.imprimablesDisponibles.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-bold text-jade underline-offset-2 hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
        <button
          type="button"
          disabled={!canPrepareLogbook}
          title={
            canPrepareLogbook
              ? undefined
              : "Renseigner au moins l'objectif pour préparer cette carte"
          }
          className="min-h-11 w-full rounded-md border border-white/15 px-4 text-sm font-bold text-muted opacity-60"
        >
          Préparer en cahier journal
        </button>
        <p className="mt-2 text-xs leading-5 text-muted">
          La liaison vers le cahier journal sera activée après validation de l&apos;import.
        </p>
      </div>

      <button
        type="button"
        onClick={onDelete}
        className="mt-auto min-h-11 rounded-md border border-ember/50 bg-ember/10 px-4 text-sm font-bold text-ember transition hover:bg-ember/20"
      >
        Supprimer la carte
      </button>
    </aside>
  );
}
