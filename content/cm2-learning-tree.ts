// Modèle opérationnel leçons CM2 — source pour les pages /matieres/[slug] et plus.
// Arbre pédagogique CM2 : Matière → Domaine → Sous-domaine → Leçon.
// Lieux et personnages-guides accompagnent la structure, sans la remplacer.

// ── Types ─────────────────────────────────────────────────────────────────────

// Sémantique de Cm2LearningStatus par niveau de nœud :
//   "available"   — au niveau leçon : contenu réel dans cm2-lesson-content.ts + routeSlug actif.
//                   au niveau domaine/sous-domaine : au moins 1 leçon "available" à l'intérieur.
//   "in-progress" — structure définie, leçons planifiées, aucune leçon "available".
//   "upcoming"    — structure prévue, aucun contenu réel, aucune leçon planifiée.
export type Cm2LearningStatus = "available" | "in-progress" | "upcoming";

export type Cm2GuideReference = {
  id: "felix" | "chouette" | "hector" | "melina" | "max" | "naia" | "pablo" | "rosa";
  name: string;
  role?: string;
};

export type Cm2PedagogicalPlaceReference = {
  slug: string;   // slug de pedagogical-places.ts
  label: string;
  zone?: string;  // zone précise dans le lieu (ex. "Rayonnage des indices")
};

export type Cm2LessonResource = {
  type: "lesson" | "exercise" | "evaluation";
  slug?: string;  // défini uniquement si la route page existe
  label: string;
  status: Cm2LearningStatus;
};

export type Cm2LessonNode = {
  id: string;
  title: string;
  description?: string;
  status: Cm2LearningStatus;
  /** When defined, this lesson has a routed page at `…/[lessonId]` using this slug. */
  routeSlug?: string;
  resources: Cm2LessonResource[];
  linkedMissionSlugs?: string[];
};

export type Cm2SubdomainNode = {
  id: string;
  title: string;
  description?: string;
  status: Cm2LearningStatus;
  place?: Cm2PedagogicalPlaceReference;
  lessons: Cm2LessonNode[];
};

export type Cm2DomainNode = {
  id: string;
  title: string;
  description?: string;
  status: Cm2LearningStatus;
  place?: Cm2PedagogicalPlaceReference;
  subdomains: Cm2SubdomainNode[];
  linkedMissionSlugs?: string[];
};

export type Cm2SubjectNode = {
  subjectSlug: string;  // matches content/cm2-subjects.ts slug
  title: string;
  place: Cm2PedagogicalPlaceReference;
  guides: Cm2GuideReference[];
  status: Cm2LearningStatus;
  domains: Cm2DomainNode[];
};

export type Cm2LearningTree = Cm2SubjectNode[];

// ── Données ───────────────────────────────────────────────────────────────────

export const cm2LearningTree: Cm2LearningTree = [

  // ── Français ────────────────────────────────────────────────────────────────
  {
    subjectSlug: "francais",
    title: "Français",
    place: { slug: "bibliotheque-des-explorateurs", label: "La Bibliothèque des Explorateurs" },
    guides: [
      { id: "felix",   name: "Félix le Lynx",  role: "Guide CM2"     },
      { id: "chouette", name: "Chouette",        role: "Guide Français" },
    ],
    status: "available",
    domains: [
      {
        id: "francais-lecture",
        title: "Lecture et compréhension",
        status: "available",
        place: {
          slug: "bibliotheque-des-explorateurs",
          label: "La Bibliothèque des Explorateurs",
          zone: "Rayonnage des indices",
        },
        linkedMissionSlugs: ["mission-inference", "lecture-strategique"],
        subdomains: [
          {
            id: "francais-lecture-inferences",
            title: "Inférences",
            description: "Repérer des indices dans le texte et en déduire ce qui n'est pas dit.",
            status: "available",
            lessons: [
              {
                id: "francais-lecture-inferences-reperer",
                title: "Repérer les indices dans le texte",
                status: "available",
                routeSlug: "reperer-les-indices",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "available" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming"  },
                  { type: "evaluation", label: "Évaluation", status: "upcoming"  },
                ],
                linkedMissionSlugs: ["mission-inference"],
              },
              {
                id: "francais-lecture-inferences-explicite-implicite",
                title: "Distinguer une information explicite et une information implicite",
                description: "Comprendre la différence entre ce qui est écrit directement dans un texte et ce qu'il faut déduire à partir d'indices.",
                status: "available",
                routeSlug: "explicite-implicite",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "available" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming"  },
                  { type: "evaluation", label: "Évaluation", status: "upcoming"  },
                ],
                linkedMissionSlugs: ["mission-inference"],
              },
              {
                id: "francais-lecture-inferences-formuler-hypothese",
                title: "Relier des indices pour formuler une hypothèse de lecture",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
              {
                id: "francais-lecture-inferences-justifier",
                title: "Justifier son interprétation",
                status: "available",
                routeSlug: "justifier-son-interpretation",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "available" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming"  },
                  { type: "evaluation", label: "Évaluation", status: "upcoming"  },
                ],
              },
            ],
          },
          {
            id: "francais-lecture-implicite",
            title: "Lecture approfondie",
            description: "Lire un texte au-delà de la surface : stratégies de lecture, rythme et organisation narrative.",
            status: "upcoming",
            lessons: [
              {
                id: "francais-lecture-implicite-non-dit",
                title: "Repérer ce que le texte ne dit pas explicitement",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
                linkedMissionSlugs: ["lecture-strategique"],
              },
            ],
          },
          {
            id: "francais-lecture-justifier",
            title: "Justifier avec le texte",
            status: "upcoming",
            lessons: [
              {
                id: "francais-lecture-justifier-extrait",
                title: "Sélectionner un extrait pertinent",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "francais-production",
        title: "Production d'écrit",
        status: "in-progress",
        place: {
          slug: "bibliotheque-des-explorateurs",
          label: "La Bibliothèque des Explorateurs",
          zone: "Table des carnets",
        },
        linkedMissionSlugs: ["production-ecrit"],
        subdomains: [
          {
            id: "francais-production-organiser",
            title: "Organiser un texte",
            status: "upcoming",
            lessons: [
              {
                id: "francais-production-organiser-plan",
                title: "Construire un plan",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
                linkedMissionSlugs: ["production-ecrit"],
              },
              {
                id: "francais-production-organiser-connecteurs",
                title: "Utiliser les connecteurs logiques",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
          {
            id: "francais-production-enrichir",
            title: "Enrichir ses phrases",
            status: "upcoming",
            lessons: [
              {
                id: "francais-production-enrichir-adj",
                title: "Ajouter des expansions du nom",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "francais-langue",
        title: "Étude de la langue",
        status: "in-progress",
        linkedMissionSlugs: ["enquete-grammaticale"],
        subdomains: [
          {
            id: "francais-langue-accords",
            title: "Accords",
            status: "upcoming",
            lessons: [
              {
                id: "francais-langue-accords-gn",
                title: "Accord dans le groupe nominal",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
                linkedMissionSlugs: ["enquete-grammaticale"],
              },
              {
                id: "francais-langue-accords-sujet-verbe",
                title: "Accord sujet-verbe",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
          {
            id: "francais-langue-conjugaison",
            title: "Conjugaison",
            status: "upcoming",
            lessons: [
              {
                id: "francais-langue-conjugaison-present",
                title: "Conjuguer un verbe au présent de l'indicatif",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
              {
                id: "francais-langue-conjugaison-imparfait-passe-compose",
                title: "Distinguer imparfait et passé composé dans un récit",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
          {
            id: "francais-langue-lexique",
            title: "Lexique",
            status: "upcoming",
            lessons: [
              {
                id: "francais-langue-lexique-familles",
                title: "Familles de mots",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "francais-oral",
        title: "Oral",
        status: "upcoming",
        subdomains: [
          {
            id: "francais-oral-ecoute",
            title: "Écoute active",
            status: "upcoming",
            lessons: [
              {
                id: "francais-oral-ecoute-prendre-notes",
                title: "Prendre des notes à l'oral",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
          {
            id: "francais-oral-expression",
            title: "Expression orale",
            status: "upcoming",
            lessons: [
              {
                id: "francais-oral-expression-exposer",
                title: "Présenter un exposé court",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ── Mathématiques ────────────────────────────────────────────────────────────
  {
    subjectSlug: "mathematiques",
    title: "Mathématiques",
    place: { slug: "atelier-des-mathematiques", label: "L'Atelier des Mathématiques" },
    guides: [
      { id: "felix",  name: "Félix le Lynx",     role: "Guide CM2"          },
      { id: "hector", name: "Hector le Castor",  role: "Guide Mathématiques" },
    ],
    status: "available",
    domains: [
      {
        id: "maths-nombres",
        title: "Nombres et calcul",
        status: "in-progress",
        place: {
          slug: "atelier-des-mathematiques",
          label: "L'Atelier des Mathématiques",
          zone: "Table des manipulations",
        },
        linkedMissionSlugs: ["mission-calcul"],
        subdomains: [
          {
            id: "maths-nombres-fractions",
            title: "Fractions",
            status: "upcoming",
            lessons: [
              {
                id: "maths-nombres-fractions-lire",
                title: "Lire et écrire une fraction",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
              {
                id: "maths-nombres-fractions-comparer",
                title: "Comparer des fractions",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
          {
            id: "maths-nombres-calcul-mental",
            title: "Calcul mental",
            status: "in-progress",
            lessons: [
              {
                id: "maths-nombres-calcul-mental-strategies",
                title: "Choisir une stratégie de calcul",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
                linkedMissionSlugs: ["mission-calcul"],
              },
            ],
          },
          {
            id: "maths-nombres-calcul-pose",
            title: "Calcul posé",
            status: "upcoming",
            lessons: [
              {
                id: "maths-nombres-calcul-pose-multiplication",
                title: "Poser et calculer une multiplication (2 chiffres × 2 chiffres)",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
              {
                id: "maths-nombres-calcul-pose-division",
                title: "Poser et calculer une division euclidienne",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "maths-problemes",
        title: "Résolution de problèmes",
        status: "in-progress",
        place: {
          slug: "atelier-des-mathematiques",
          label: "L'Atelier des Mathématiques",
          zone: "Mur des stratégies",
        },
        linkedMissionSlugs: ["defis-mathematiques"],
        subdomains: [
          {
            id: "maths-problemes-etapes",
            title: "Problèmes à étapes",
            status: "upcoming",
            lessons: [
              {
                id: "maths-problemes-etapes-identifier",
                title: "Identifier les données utiles",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
                linkedMissionSlugs: ["defis-mathematiques"],
              },
              {
                id: "maths-problemes-etapes-verifier",
                title: "Vérifier sa réponse",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
          {
            id: "maths-problemes-operations",
            title: "Choisir les opérations",
            status: "upcoming",
            lessons: [
              {
                id: "maths-problemes-operations-choisir",
                title: "Associer une situation à une opération",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "maths-grandeurs",
        title: "Grandeurs et mesures",
        status: "upcoming",
        subdomains: [
          {
            id: "maths-grandeurs-durees",
            title: "Durées",
            status: "upcoming",
            lessons: [
              {
                id: "maths-grandeurs-durees-calculer",
                title: "Calculer une durée",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
          {
            id: "maths-grandeurs-aires",
            title: "Aires et périmètres",
            status: "upcoming",
            lessons: [
              {
                id: "maths-grandeurs-perimetre-calculer",
                title: "Calculer le périmètre d'un polygone",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
              {
                id: "maths-grandeurs-aire-calculer",
                title: "Calculer l'aire d'un carré et d'un rectangle",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "maths-geometrie",
        title: "Espace et géométrie",
        status: "upcoming",
        subdomains: [
          {
            id: "maths-geometrie-figures",
            title: "Figures planes",
            status: "upcoming",
            lessons: [
              {
                id: "maths-geometrie-figures-quadrilateres",
                title: "Reconnaître et tracer des quadrilatères",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
          {
            id: "maths-geometrie-symetrie",
            title: "Symétrie",
            status: "upcoming",
            lessons: [
              {
                id: "maths-geometrie-symetrie-identifier-axe",
                title: "Identifier un axe de symétrie dans une figure",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
              {
                id: "maths-geometrie-symetrie-reproduire",
                title: "Reproduire une figure par symétrie axiale",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
              {
                id: "maths-geometrie-symetrie-construire-symetrique",
                title: "Construire le symétrique d'un point ou d'une figure",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "maths-donnees",
        title: "Organisation et gestion de données",
        status: "upcoming",
        subdomains: [
          {
            id: "maths-donnees-tableaux",
            title: "Tableaux et graphiques",
            status: "upcoming",
            lessons: [
              {
                id: "maths-donnees-tableaux-lire",
                title: "Lire et compléter un tableau de données",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ── Sciences et technologie ──────────────────────────────────────────────────
  {
    subjectSlug: "sciences",
    title: "Sciences et technologie",
    place: { slug: "laboratoire", label: "Le Laboratoire" },
    guides: [
      { id: "felix",  name: "Félix le Lynx",    role: "Guide CM2"     },
      { id: "melina", name: "Mélina l'Abeille", role: "Guide Sciences" },
    ],
    status: "available",
    domains: [
      {
        id: "sciences-demarche",
        title: "Démarche scientifique",
        status: "in-progress",
        place: { slug: "laboratoire", label: "Le Laboratoire", zone: "Mur des hypothèses" },
        linkedMissionSlugs: ["laboratoire-scientifique"],
        subdomains: [
          {
            id: "sciences-demarche-observer",
            title: "Observer et décrire",
            status: "in-progress",
            lessons: [
              {
                id: "sciences-demarche-observer-protocole",
                title: "Suivre un protocole d'observation",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
                linkedMissionSlugs: ["laboratoire-scientifique"],
              },
            ],
          },
          {
            id: "sciences-demarche-hypothese",
            title: "Formuler une hypothèse",
            status: "upcoming",
            lessons: [
              {
                id: "sciences-demarche-hypothese-formuler",
                title: "Énoncer et justifier une hypothèse",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
          {
            id: "sciences-demarche-conclure",
            title: "Conclure et transmettre",
            status: "upcoming",
            lessons: [
              {
                id: "sciences-demarche-conclure-compte-rendu",
                title: "Rédiger un compte rendu court",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "sciences-observation",
        title: "Observation et expérimentation",
        status: "upcoming",
        place: { slug: "laboratoire", label: "Le Laboratoire", zone: "Paillasses d'essai" },
        subdomains: [
          {
            id: "sciences-observation-vivant",
            title: "Le vivant",
            status: "upcoming",
            lessons: [
              {
                id: "sciences-observation-vivant-classer",
                title: "Classer les êtres vivants",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
          {
            id: "sciences-observation-matiere",
            title: "Matière et énergie",
            status: "upcoming",
            lessons: [
              {
                id: "sciences-observation-matiere-etats",
                title: "Distinguer les états solide, liquide et gazeux d'un matériau",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "sciences-technologie",
        title: "Matériaux et objets techniques",
        status: "upcoming",
        subdomains: [
          {
            id: "sciences-technologie-objets",
            title: "Objets techniques",
            status: "upcoming",
            lessons: [
              {
                id: "sciences-technologie-objets-fonction",
                title: "Identifier la fonction d'un objet technique",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
          {
            id: "sciences-technologie-materiaux",
            title: "Propriétés des matériaux",
            status: "upcoming",
            lessons: [
              {
                id: "sciences-technologie-materiaux-proprietes",
                title: "Classer des matériaux selon leurs propriétés",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "sciences-terre",
        title: "La planète Terre et les êtres vivants",
        status: "upcoming",
        subdomains: [
          {
            id: "sciences-terre-ecosystemes",
            title: "Les écosystèmes",
            status: "upcoming",
            lessons: [
              {
                id: "sciences-terre-ecosystemes-chaines",
                title: "Identifier les niveaux d'une chaîne alimentaire simple",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
          {
            id: "sciences-terre-phenomenes",
            title: "Phénomènes naturels",
            status: "upcoming",
            lessons: [
              {
                id: "sciences-terre-phenomenes-meteo",
                title: "Décrire le cycle de l'eau comme phénomène météorologique",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ── Histoire-Géographie ──────────────────────────────────────────────────────
  {
    subjectSlug: "histoire-geographie",
    title: "Histoire-Géographie",
    place: { slug: "cartotheque-des-lisieres", label: "La Cartothèque des Lisières" },
    guides: [
      { id: "felix", name: "Félix le Lynx", role: "Guide CM2" },
    ],
    status: "available",
    domains: [
      {
        id: "histoire-reperes",
        title: "Histoire · Repères chronologiques",
        status: "in-progress",
        linkedMissionSlugs: ["archives-historiques"],
        subdomains: [
          {
            id: "histoire-reperes-revolution",
            title: "La Révolution française",
            status: "upcoming",
            lessons: [
              {
                id: "histoire-reperes-revolution-conditions-ordres",
                title: "Identifier les conditions de vie des différents ordres avant 1789",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
                linkedMissionSlugs: ["archives-historiques"],
              },
              {
                id: "histoire-reperes-revolution-crise-monarchie",
                title: "Relier la crise financière de la monarchie aux événements de 1789",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
          {
            id: "histoire-reperes-republique",
            title: "La République",
            status: "upcoming",
            lessons: [
              {
                id: "histoire-reperes-republique-devise",
                title: "Expliquer le sens des trois valeurs de la devise républicaine",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "geo-espaces",
        title: "Géographie · Lire des espaces habités",
        status: "in-progress",
        place: {
          slug: "cartotheque-des-lisieres",
          label: "La Cartothèque des Lisières",
          zone: "Mur des cartes",
        },
        linkedMissionSlugs: ["cartographe-du-monde"],
        subdomains: [
          {
            id: "geo-espaces-carte",
            title: "Lire une carte",
            status: "in-progress",
            lessons: [
              {
                id: "geo-espaces-carte-legende",
                title: "Comprendre une légende",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
                linkedMissionSlugs: ["cartographe-du-monde"],
              },
              {
                id: "geo-espaces-carte-localiser",
                title: "Localiser un lieu sur une carte à l'aide des points cardinaux",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
          {
            id: "geo-espaces-territoire",
            title: "Comprendre un territoire",
            status: "upcoming",
            lessons: [
              {
                id: "geo-espaces-territoire-ressources",
                title: "Identifier les ressources d'un territoire à partir d'un document",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "hg-documents",
        title: "Lecture de documents",
        status: "upcoming",
        subdomains: [
          {
            id: "hg-documents-historiques",
            title: "Documents historiques",
            status: "upcoming",
            lessons: [
              {
                id: "hg-documents-historiques-identifier-nature",
                title: "Identifier la nature, la date et l'auteur d'un document historique",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
                linkedMissionSlugs: ["archives-historiques"],
              },
              {
                id: "hg-documents-historiques-extraire-contexte",
                title: "Extraire des informations d'un document historique et les relier à un contexte",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
          {
            id: "hg-documents-geographiques",
            title: "Documents géographiques",
            status: "upcoming",
            lessons: [
              {
                id: "hg-documents-geographiques-paysage",
                title: "Décrire et interpréter un paysage géographique",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
              {
                id: "hg-documents-geographiques-photographie",
                title: "Analyser une photographie aérienne ou satellitaire",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ── EMC ─────────────────────────────────────────────────────────────────────
  {
    subjectSlug: "emc",
    title: "EMC",
    place: { slug: "cour-des-explorateurs", label: "La Cour des Explorateurs" },
    guides: [
      { id: "felix", name: "Félix le Lynx", role: "Guide CM2" },
    ],
    status: "upcoming",
    domains: [
      {
        id: "emc-vie-collective",
        title: "Vie collective",
        status: "upcoming",
        subdomains: [
          {
            id: "emc-vie-collective-regles",
            title: "Règles de vie",
            status: "upcoming",
            lessons: [
              {
                id: "emc-vie-collective-regles-comprendre",
                title: "Comprendre les règles de la classe et de l'école",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
          {
            id: "emc-vie-collective-cooperer",
            title: "Coopérer",
            status: "upcoming",
            lessons: [
              {
                id: "emc-vie-collective-cooperer-travail-groupe",
                title: "Travailler en groupe et respecter les rôles",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "emc-jugement",
        title: "Jugement moral et civique",
        status: "upcoming",
        subdomains: [
          {
            id: "emc-jugement-argumenter",
            title: "Argumenter",
            status: "upcoming",
            lessons: [
              {
                id: "emc-jugement-argumenter-exprimer-avis",
                title: "Exprimer et justifier un avis",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
          {
            id: "emc-jugement-respecter",
            title: "Respecter l'autre",
            status: "upcoming",
            lessons: [
              {
                id: "emc-jugement-respecter-differences",
                title: "Reconnaître et respecter les différences entre les personnes",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
              {
                id: "emc-jugement-respecter-discriminations",
                title: "Définir une discrimination et identifier les formes qu'elle peut prendre",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "emc-republique",
        title: "Valeurs et institutions républicaines",
        status: "upcoming",
        subdomains: [
          {
            id: "emc-republique-laicite",
            title: "Laïcité",
            status: "upcoming",
            lessons: [
              {
                id: "emc-republique-laicite-principe",
                title: "Définir la laïcité et illustrer son application à l'école",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
          {
            id: "emc-republique-droits-enfant",
            title: "Droits de l'enfant",
            status: "upcoming",
            lessons: [
              {
                id: "emc-republique-droits-enfant-convention",
                title: "Identifier les droits fondamentaux de l'enfant à partir de la CIDE",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
          {
            id: "emc-republique-democratie",
            title: "Vie démocratique",
            status: "upcoming",
            lessons: [
              {
                id: "emc-republique-democratie-vote",
                title: "Comprendre l'élection et le vote",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "emc-numerique",
        title: "Vie affective et numérique",
        status: "upcoming",
        subdomains: [
          {
            id: "emc-numerique-identite",
            title: "Identité numérique",
            status: "upcoming",
            lessons: [
              {
                id: "emc-numerique-identite-traces",
                title: "Comprendre les traces numériques",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
              },
            ],
          },
          {
            id: "emc-numerique-relations",
            title: "Relations et consentement",
            status: "upcoming",
            lessons: [
              {
                id: "emc-numerique-relations-consentement",
                title: "Le respect et le consentement dans les relations",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
                linkedMissionSlugs: ["corps-relations-consentement-internet"],
              },
            ],
          },
        ],
      },
    ],
  },

  // ── Anglais ─────────────────────────────────────────────────────────────────
  {
    subjectSlug: "anglais",
    title: "Anglais",
    place: { slug: "voyage-decouverte", label: "Le Voyage Découverte" },
    guides: [
      { id: "felix", name: "Félix le Lynx",          role: "Guide CM2"   },
      { id: "rosa",  name: "Rosa le Flamant rose",   role: "Guide Anglais" },
    ],
    status: "upcoming",
    domains: [
      {
        id: "anglais-oral",
        title: "Oral",
        status: "upcoming",
        subdomains: [
          { id: "anglais-oral-comprendre",  title: "Comprendre à l'oral", status: "upcoming", lessons: [] },
          { id: "anglais-oral-sexprimer",   title: "S'exprimer à l'oral", status: "upcoming", lessons: [] },
        ],
      },
      {
        id: "anglais-cultures",
        title: "Cultures anglophones",
        status: "upcoming",
        subdomains: [
          { id: "anglais-cultures-pays", title: "Pays et habitudes", status: "upcoming", lessons: [] },
        ],
      },
    ],
  },

  // ── Arts ─────────────────────────────────────────────────────────────────────
  {
    subjectSlug: "arts",
    title: "Arts",
    place: { slug: "salle-arts", label: "La Salle d'Arts" },
    guides: [
      { id: "felix", name: "Félix le Lynx",        role: "Guide CM2"  },
      { id: "pablo", name: "Pablo l'Orang-outan",  role: "Guide Arts" },
    ],
    status: "upcoming",
    domains: [
      {
        id: "arts-plastiques",
        title: "Arts plastiques",
        status: "upcoming",
        subdomains: [
          { id: "arts-plastiques-produire", title: "Créer une production",  status: "upcoming", lessons: [] },
          { id: "arts-plastiques-analyser", title: "Analyser une œuvre",    status: "upcoming", lessons: [] },
        ],
      },
      {
        id: "arts-expression",
        title: "Expression artistique",
        status: "upcoming",
        subdomains: [
          { id: "arts-expression-volume",  title: "Volume et espace",  status: "upcoming", lessons: [] },
          { id: "arts-expression-couleur", title: "Couleur et lumière", status: "upcoming", lessons: [] },
        ],
      },
    ],
  },

  // ── EPS ─────────────────────────────────────────────────────────────────────
  {
    subjectSlug: "eps",
    title: "EPS",
    place: { slug: "gymnase", label: "Le Gymnase" },
    guides: [
      { id: "felix", name: "Félix le Lynx",     role: "Guide CM2" },
      { id: "max",   name: "Max le Kangourou",  role: "Guide EPS"  },
    ],
    status: "upcoming",
    domains: [
      {
        id: "eps-collectif",
        title: "Activités collectives",
        status: "upcoming",
        subdomains: [
          { id: "eps-collectif-cooperer", title: "Coopérer en équipe",       status: "upcoming", lessons: [] },
          { id: "eps-collectif-regles",   title: "Respecter une règle de jeu", status: "upcoming", lessons: [] },
        ],
      },
      {
        id: "eps-maitrise",
        title: "Maîtrise corporelle",
        status: "upcoming",
        subdomains: [
          { id: "eps-maitrise-equilibre",    title: "Équilibre et stabilité",  status: "upcoming", lessons: [] },
          { id: "eps-maitrise-coordination", title: "Coordination des gestes", status: "upcoming", lessons: [] },
        ],
      },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getCm2SubjectTree(subjectSlug: string): Cm2SubjectNode | undefined {
  return cm2LearningTree.find((s) => s.subjectSlug === subjectSlug);
}

export function getCm2DomainById(
  subjectSlug: string,
  domainId: string,
): Cm2DomainNode | undefined {
  return getCm2SubjectTree(subjectSlug)?.domains.find((d) => d.id === domainId);
}

export function getCm2SubdomainById(
  subjectSlug: string,
  domainId: string,
  subdomainId: string,
): Cm2SubdomainNode | undefined {
  return getCm2DomainById(subjectSlug, domainId)?.subdomains.find(
    (s) => s.id === subdomainId,
  );
}

export function getCm2LessonById(
  subjectSlug: string,
  domainId: string,
  subdomainId: string,
  lessonId: string,
): Cm2LessonNode | undefined {
  return getCm2SubdomainById(subjectSlug, domainId, subdomainId)?.lessons.find(
    (l) => l.id === lessonId,
  );
}

export type Cm2LessonPath = {
  subjectSlug: string;
  domainId: string;
  subdomainId: string;
  lessonId: string;
};

export function getAllCm2LessonPaths(): Cm2LessonPath[] {
  const paths: Cm2LessonPath[] = [];
  for (const subject of cm2LearningTree) {
    for (const domain of subject.domains) {
      for (const subdomain of domain.subdomains) {
        for (const lesson of subdomain.lessons) {
          if (!lesson.routeSlug) continue;
          paths.push({
            subjectSlug: subject.subjectSlug,
            domainId: domain.id,
            subdomainId: subdomain.id,
            lessonId: lesson.routeSlug,
          });
        }
      }
    }
  }
  return paths;
}

export function getCm2LessonByRouteSlug(
  subjectSlug: string,
  domainId: string,
  subdomainId: string,
  routeSlug: string,
): Cm2LessonNode | undefined {
  const subject = cm2LearningTree.find((s) => s.subjectSlug === subjectSlug);
  if (!subject) return undefined;
  const domain = subject.domains.find((d) => d.id === domainId);
  if (!domain) return undefined;
  const subdomain = domain.subdomains.find((sd) => sd.id === subdomainId);
  if (!subdomain) return undefined;
  return subdomain.lessons.find((l) => l.routeSlug === routeSlug);
}
