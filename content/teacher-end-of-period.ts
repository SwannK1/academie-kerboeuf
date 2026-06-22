export type EndOfPeriodId = "p1" | "p2" | "p3" | "p4" | "p5";

export type EndOfPeriodCategoryId =
  | "evaluations"
  | "corrections"
  | "bilans"
  | "affichages"
  | "rangement"
  | "familles"
  | "projets"
  | "periode-suivante";

export type EndOfPeriodPriority = "importante" | "normale" | "secondaire";

export type EndOfPeriodTaskTemplate = {
  id: string;
  label: string;
  priority: EndOfPeriodPriority;
};

export type EndOfPeriodCategory = {
  id: EndOfPeriodCategoryId;
  label: string;
  tasks: EndOfPeriodTaskTemplate[];
};

export const END_OF_PERIOD_OPTIONS: { id: EndOfPeriodId; label: string }[] = [
  { id: "p1", label: "P1" },
  { id: "p2", label: "P2" },
  { id: "p3", label: "P3" },
  { id: "p4", label: "P4" },
  { id: "p5", label: "P5" },
];

export const END_OF_PERIOD_PRIORITY_LABELS: Record<
  EndOfPeriodPriority,
  string
> = {
  importante: "Importante",
  normale: "Normale",
  secondaire: "Secondaire",
};

export const endOfPeriodCategories: EndOfPeriodCategory[] = [
  {
    id: "evaluations",
    label: "Évaluations",
    tasks: [
      {
        id: "eval-terminer-evaluations",
        label: "Terminer les évaluations de la période",
        priority: "importante",
      },
      {
        id: "eval-saisir-resultats",
        label: "Saisir les résultats des évaluations",
        priority: "importante",
      },
      {
        id: "eval-verifier-competences",
        label: "Vérifier la couverture des compétences évaluées",
        priority: "normale",
      },
    ],
  },
  {
    id: "corrections",
    label: "Corrections",
    tasks: [
      {
        id: "correction-cahiers-jour",
        label: "Finir la correction des cahiers du jour",
        priority: "importante",
      },
      {
        id: "correction-evaluations",
        label: "Corriger les dernières évaluations",
        priority: "importante",
      },
      {
        id: "correction-classeurs",
        label: "Vérifier les classeurs et cahiers d'exercices",
        priority: "secondaire",
      },
    ],
  },
  {
    id: "bilans",
    label: "Bilans",
    tasks: [
      {
        id: "bilan-progression",
        label: "Faire le bilan de la progression de période",
        priority: "importante",
      },
      {
        id: "bilan-points-vigilance",
        label: "Identifier les points de vigilance pour la suite",
        priority: "normale",
      },
      {
        id: "bilan-ajuster-programmation",
        label: "Ajuster la programmation si besoin",
        priority: "normale",
      },
    ],
  },
  {
    id: "affichages",
    label: "Affichages",
    tasks: [
      {
        id: "affichage-mettre-a-jour",
        label: "Mettre à jour les affichages de classe",
        priority: "secondaire",
      },
      {
        id: "affichage-retirer-obsoletes",
        label: "Retirer les affichages devenus obsolètes",
        priority: "secondaire",
      },
    ],
  },
  {
    id: "rangement",
    label: "Rangement",
    tasks: [
      {
        id: "rangement-materiel",
        label: "Ranger le matériel pédagogique utilisé",
        priority: "secondaire",
      },
      {
        id: "rangement-classe",
        label: "Remettre la classe en ordre",
        priority: "secondaire",
      },
      {
        id: "rangement-documents",
        label: "Classer les documents de la période",
        priority: "normale",
      },
    ],
  },
  {
    id: "familles",
    label: "Familles",
    tasks: [
      {
        id: "familles-communication",
        label: "Préparer la communication de fin de période",
        priority: "normale",
      },
      {
        id: "familles-reponses-en-attente",
        label: "Répondre aux messages en attente",
        priority: "normale",
      },
    ],
  },
  {
    id: "projets",
    label: "Projets",
    tasks: [
      {
        id: "projets-faire-le-point",
        label: "Faire le point sur les projets en cours",
        priority: "normale",
      },
      {
        id: "projets-cloturer",
        label: "Clôturer les projets terminés",
        priority: "secondaire",
      },
    ],
  },
  {
    id: "periode-suivante",
    label: "Préparation de la période suivante",
    tasks: [
      {
        id: "suivante-programmation",
        label: "Préparer la programmation de la période suivante",
        priority: "importante",
      },
      {
        id: "suivante-materiel",
        label: "Anticiper le matériel nécessaire",
        priority: "normale",
      },
      {
        id: "suivante-emploi-du-temps",
        label: "Vérifier l'emploi du temps de la période suivante",
        priority: "secondaire",
      },
    ],
  },
];
