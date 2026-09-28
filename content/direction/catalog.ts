/**
 * Catalogues de l'espace Direction : points de réunion proposés, démarches
 * guidées (checklists) et repères de l'année.
 *
 * Les formulations sont des aides à l'organisation, pas des règles. Quand un
 * item s'appuie sur un texte, il porte sa source ; en cas de doute, c'est la
 * source officielle qui fait foi.
 */

import { SOURCES, type OfficialSource } from "@/content/direction/sources";

// ── Réunions ────────────────────────────────────────────────────────────────

export type MeetingKind = "conseil-ecole" | "conseil-maitres" | "conseil-cycle";

export const MEETING_KINDS: {
  id: MeetingKind;
  label: string;
  short: string;
  hint: string;
  sources: OfficialSource[];
  items: string[];
}[] = [
  {
    id: "conseil-ecole",
    label: "Conseil d'école",
    short: "Conseil d'école",
    hint: "Au moins une réunion par trimestre, la première dans le mois qui suit les élections ; ordre du jour adressé au moins huit jours avant.",
    sources: [SOURCES.codeEducationEcoles, SOURCES.conseilEcole],
    items: [
      "Effectifs et organisation de l'école",
      "Règlement intérieur",
      "Sécurité : exercices et PPMS",
      "Projet d'école",
      "Sorties et projets de classe",
      "Coopérative scolaire",
      "Restauration et périscolaire",
      "Travaux et locaux",
      "Questions des représentants de parents",
      "Questions diverses",
    ],
  },
  {
    id: "conseil-maitres",
    label: "Conseil des maîtres",
    short: "Conseil des maîtres",
    hint: "Réunion de l'équipe enseignante de l'école, présidée par la direction.",
    sources: [SOURCES.conseilEcole],
    items: [
      "Organisation du service et surveillances",
      "Organisation des APC",
      "Projets de classe et sorties",
      "Évaluations communes",
      "Sécurité : dates des exercices",
      "Préparation du conseil d'école",
      "Commandes et budget",
      "Questions diverses",
    ],
  },
  {
    id: "conseil-cycle",
    label: "Conseil de cycle",
    short: "Conseil de cycle",
    hint: "Réunion des enseignants d'un même cycle autour des apprentissages.",
    sources: [SOURCES.conseilEcole],
    items: [
      "Progressions de cycle",
      "Évaluations communes",
      "Aides et différenciation",
      "Liaison GS-CP ou CM2-6e",
      "Projets de cycle",
      "Outils communs (cahiers, affichages)",
      "Questions diverses",
    ],
  },
];

export function getMeetingKind(id: MeetingKind) {
  return MEETING_KINDS.find((k) => k.id === id) ?? MEETING_KINDS[0];
}

// ── Démarches guidées ──────────────────────────────────────────────────────

export type ChecklistItem = {
  id: string;
  label: string;
  /** l'item n'apparaît que si toutes ces options sont choisies */
  when?: string[];
  /** l'item n'apparaît pas si l'une de ces options est choisie */
  unless?: string[];
};

export type ProcedureQuestion = { id: string; label: string; optional?: boolean; options: { id: string; label: string }[] };

export type Procedure = {
  id: string;
  title: string;
  summary: string;
  icon: "map-pin" | "target" | "calendar" | "box" | "check-circle";
  questions: ProcedureQuestion[];
  items: ChecklistItem[];
  sources: OfficialSource[];
};

export const PROCEDURES: Procedure[] = [
  {
    id: "sortie",
    title: "Organiser une sortie",
    summary: "Deux clics, la liste adaptée se charge.",
    icon: "map-pin",
    questions: [
      {
        id: "nuitee",
        label: "Avec nuitée ?",
        options: [
          { id: "sejour", label: "Oui" },
          { id: "sans-nuitee", label: "Non" },
        ],
      },
      {
        id: "transport",
        label: "Transport ?",
        options: [
          { id: "pied", label: "À pied" },
          { id: "car", label: "Car" },
          { id: "public", label: "Transport public" },
        ],
      },
      {
        id: "activite",
        label: "Activité",
        optional: true,
        options: [
          { id: "musee", label: "Musée, spectacle" },
          { id: "piscine", label: "Activité sportive" },
        ],
      },
    ],
    items: [
      { id: "projet", label: "Relier la sortie au projet de classe ou d'école" },
      { id: "autorisation-directeur", label: "Autorisation de la direction (sortie sans nuitée)", unless: ["sejour"] },
      { id: "autorisation-ien", label: "Dossier transmis à l'IEN pour autorisation, après accord de la direction", when: ["sejour"] },
      { id: "encadrement", label: "Vérifier le taux d'encadrement dans le guide officiel" },
      { id: "accompagnateurs", label: "Liste des accompagnateurs et, si besoin, leur agrément" },
      { id: "transport", label: "Réserver le car et vérifier les conditions du transporteur", when: ["car"] },
      { id: "transport-public", label: "Vérifier les horaires et les titres de transport", when: ["public"] },
      { id: "itineraire", label: "Préparer l'itinéraire et les points de traversée", when: ["pied"] },
      { id: "reservation", label: "Réserver le lieu et confirmer par écrit", when: ["musee"] },
      { id: "agrement-intervenant", label: "Vérifier l'agrément des intervenants extérieurs", when: ["piscine"] },
      { id: "hebergement", label: "Vérifier l'hébergement et le programme du séjour", when: ["sejour"] },
      { id: "familles-info", label: "Informer les familles ; autorisation écrite si la sortie dépasse les horaires", unless: ["sejour"] },
      { id: "familles-autorisation-sejour", label: "Recueillir les autorisations des familles", when: ["sejour"] },
      { id: "financement", label: "Budget : coopérative, mairie, participation limitée des familles" },
      { id: "trousse", label: "Trousse de secours et numéros utiles" },
      { id: "liste", label: "Liste des élèves présents, emportée le jour J" },
    ],
    sources: [SOURCES.sortiesPage, SOURCES.sortiesGuide],
  },
  {
    id: "exercice-securite",
    title: "Exercice de sécurité",
    summary: "Préparer, conduire et consigner un exercice.",
    icon: "target",
    questions: [
      {
        id: "type",
        label: "Exercice",
        options: [
          { id: "incendie", label: "Évacuation incendie" },
          { id: "risques", label: "PPMS risques majeurs" },
          { id: "intrusion", label: "PPMS attentat-intrusion" },
        ],
      },
    ],
    items: [
      { id: "date", label: "Fixer la date avec l'équipe" },
      { id: "ppms-a-jour", label: "Vérifier que le PPMS de l'école est à jour", unless: ["incendie"] },
      { id: "consignes", label: "Rappeler les consignes à l'équipe" },
      { id: "maternelle", label: "Adapter l'exercice aux plus jeunes élèves (voir guide officiel)" },
      { id: "prevenir", label: "Prévenir la mairie et les personnels non enseignants si nécessaire" },
      { id: "chronometre", label: "Chronométrer et observer le déroulement" },
      { id: "bilan", label: "Faire le bilan avec l'équipe" },
      { id: "registre", label: "Consigner l'exercice dans le registre de sécurité", when: ["incendie"] },
      { id: "remontee", label: "Transmettre le compte rendu selon les consignes académiques", unless: ["incendie"] },
      { id: "conseil", label: "Présenter le bilan au prochain conseil d'école" },
    ],
    sources: [SOURCES.ppms, SOURCES.securite],
  },
  {
    id: "rentree",
    title: "Préparer la rentrée",
    summary: "Les étapes de la fin août à la mi-septembre.",
    icon: "calendar",
    questions: [],
    items: [
      { id: "repartition", label: "Répartition des classes validée en conseil des maîtres" },
      { id: "service", label: "Tableau de service et surveillances" },
      { id: "listes", label: "Listes de classe affichées" },
      { id: "fournitures", label: "Listes de fournitures transmises aux familles" },
      { id: "reglement", label: "Règlement intérieur distribué, en attente du vote au premier conseil d'école" },
      { id: "reunion-parents", label: "Réunions de rentrée avec les familles planifiées" },
      { id: "elections", label: "Calendrier des élections de parents lancé" },
      { id: "exercice", label: "Premier exercice incendie planifié" },
      { id: "apc", label: "Organisation des APC arrêtée" },
    ],
    sources: [SOURCES.directionEcole, SOURCES.electionsParents],
  },
  {
    id: "commandes",
    title: "Passer les commandes",
    summary: "Fournitures, manuels, matériel : ne rien oublier.",
    icon: "box",
    questions: [],
    items: [
      { id: "besoins", label: "Recueillir les besoins de chaque classe" },
      { id: "budget", label: "Vérifier le budget alloué par la commune" },
      { id: "devis", label: "Comparer les devis ou le marché de la commune" },
      { id: "validation", label: "Faire valider le bon de commande" },
      { id: "reception", label: "Réceptionner et vérifier la livraison" },
      { id: "repartition", label: "Répartir dans les classes" },
    ],
    sources: [SOURCES.directionEcole],
  },
  {
    id: "fin-annee",
    title: "Fin d'année et préparation de rentrée",
    summary: "Clore l'année et préparer la suivante.",
    icon: "check-circle",
    questions: [],
    items: [
      { id: "conseil3", label: "Troisième conseil d'école tenu" },
      { id: "structure", label: "Structure pédagogique de l'année suivante préparée" },
      { id: "liaison", label: "Liaison GS-CP et CM2-6e réalisée" },
      { id: "livrets", label: "Livrets scolaires finalisés dans l'outil officiel" },
      { id: "inventaire", label: "Inventaire du matériel et des manuels" },
      { id: "cooperative", label: "Comptes de la coopérative arrêtés" },
      { id: "calendrier", label: "Calendrier de rentrée communiqué aux familles" },
    ],
    sources: [SOURCES.directionEcole],
  },
];

export function getProcedure(id: string): Procedure | undefined {
  return PROCEDURES.find((p) => p.id === id);
}

/** Items visibles pour les options choisies. */
export function visibleItems(procedure: Procedure, choices: string[]): ChecklistItem[] {
  return procedure.items.filter(
    (item) =>
      (!item.when || item.when.some((w) => choices.includes(w))) &&
      (!item.unless || !item.unless.some((u) => choices.includes(u))),
  );
}

// ── Repères de l'année 2026-2027 ───────────────────────────────────────────

export type Milestone = {
  id: string;
  date: string;
  label: string;
  /** ferme = date officielle ; repere = échéance indicative à caler localement */
  kind: "ferme" | "repere";
  action?: { label: string; href: string };
  source?: OfficialSource;
};

export const MILESTONES_2026_2027: Milestone[] = [
  {
    id: "exercice-incendie-1",
    date: "2026-09-30",
    label: "Premier exercice d'évacuation de l'année",
    kind: "repere",
    action: { label: "Préparer", href: "/direction/demarches/exercice-securite" },
    source: SOURCES.securite,
  },
  {
    id: "elections-parents",
    date: "2026-10-09",
    label: "Élections des représentants de parents (9 ou 10 octobre)",
    kind: "ferme",
    source: SOURCES.electionsParents,
  },
  {
    id: "ppms-1",
    date: "2026-10-16",
    label: "Exercice PPMS du premier trimestre",
    kind: "repere",
    action: { label: "Préparer", href: "/direction/demarches/exercice-securite" },
    source: SOURCES.ppms,
  },
  {
    id: "conseil-ecole-1-convocation",
    date: "2026-10-30",
    label: "Envoyer l'ordre du jour du 1er conseil d'école (8 jours avant)",
    kind: "repere",
    action: { label: "Préparer l'ordre du jour", href: "/direction/reunions?nouveau=conseil-ecole" },
    source: SOURCES.codeEducationEcoles,
  },
  {
    id: "conseil-ecole-1",
    date: "2026-11-09",
    label: "1er conseil d'école, dans le mois qui suit les élections",
    kind: "repere",
    action: { label: "Préparer", href: "/direction/reunions?nouveau=conseil-ecole" },
    source: SOURCES.codeEducationEcoles,
  },
  {
    id: "conseil-ecole-2",
    date: "2027-02-05",
    label: "2e conseil d'école (un par trimestre)",
    kind: "repere",
    action: { label: "Préparer", href: "/direction/reunions?nouveau=conseil-ecole" },
    source: SOURCES.codeEducationEcoles,
  },
  {
    id: "ppms-2",
    date: "2027-02-05",
    label: "Second exercice PPMS de l'année",
    kind: "repere",
    action: { label: "Préparer", href: "/direction/demarches/exercice-securite" },
    source: SOURCES.ppms,
  },
  {
    id: "conseil-ecole-3",
    date: "2027-06-11",
    label: "3e conseil d'école",
    kind: "repere",
    action: { label: "Préparer", href: "/direction/reunions?nouveau=conseil-ecole" },
    source: SOURCES.codeEducationEcoles,
  },
  {
    id: "fin-annee",
    date: "2027-06-18",
    label: "Clôture de l'année et préparation de rentrée",
    kind: "repere",
    action: { label: "Ouvrir la liste", href: "/direction/demarches/fin-annee" },
    source: SOURCES.directionEcole,
  },
];
