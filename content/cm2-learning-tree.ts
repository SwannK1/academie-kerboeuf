// Arbre pédagogique CM2 : Matière → Domaine → Sous-domaine → Leçon.
// Lieux et personnages-guides accompagnent la structure, sans la remplacer.
// Les pages de leçon/exercice/évaluation ne sont pas encore créées :
// tous les Cm2LessonNode sont status "upcoming" dans ce premier socle.

// ── Types ─────────────────────────────────────────────────────────────────────

// Sémantique de Cm2LearningStatus par niveau de nœud :
//   "available"   — structure exploitable, reliée à au moins une ressource ou
//                   mission existante (la page ou le contenu peut être affiché).
//   "in-progress" — structure partiellement préparée, visible mais incomplète.
//   "upcoming"    — structure prévue mais pas encore exploitable
//                   (pas de page route, pas de contenu finalisé).
// Note : au niveau domaine/sous-domaine, "available" signifie que des missions
// existantes y sont reliées — cela ne garantit pas encore l'existence de pages
// leçon. La présence de pages leçon se vérifie via Cm2LessonResource.slug.
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
                status: "upcoming",
                routeSlug: "reperer-les-indices",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
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
                id: "francais-lecture-inferences-faire",
                title: "Faire une inférence",
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
            id: "francais-lecture-implicite",
            title: "Comprendre l'implicite",
            status: "upcoming",
            lessons: [
              {
                id: "francais-lecture-implicite-non-dit",
                title: "Identifier ce qui n'est pas dit directement",
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
        status: "available",
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
        status: "available",
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
                id: "francais-langue-conjugaison-temps",
                title: "Temps du passé et du présent",
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
        status: "available",
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
            status: "available",
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
        ],
      },
      {
        id: "maths-problemes",
        title: "Résolution de problèmes",
        status: "available",
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
                id: "maths-grandeurs-aires-calculer",
                title: "Calculer l'aire et le périmètre d'une figure",
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
        status: "available",
        place: { slug: "laboratoire", label: "Le Laboratoire", zone: "Mur des hypothèses" },
        linkedMissionSlugs: ["laboratoire-scientifique"],
        subdomains: [
          {
            id: "sciences-demarche-observer",
            title: "Observer et décrire",
            status: "available",
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
                title: "Les états de la matière",
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
        status: "available",
        linkedMissionSlugs: ["archives-historiques"],
        subdomains: [
          {
            id: "histoire-reperes-revolution",
            title: "La Révolution française",
            status: "upcoming",
            lessons: [
              {
                id: "histoire-reperes-revolution-causes",
                title: "Les causes de la Révolution",
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
                linkedMissionSlugs: ["archives-historiques"],
              },
            ],
          },
          {
            id: "histoire-reperes-republique",
            title: "La République",
            status: "upcoming",
            lessons: [
              {
                id: "histoire-reperes-republique-valeurs",
                title: "Les valeurs républicaines",
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
        status: "available",
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
            status: "available",
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
                title: "Localiser et situer",
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
                title: "Les ressources d'un territoire",
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
          { id: "emc-vie-collective-regles",    title: "Règles de vie", status: "upcoming", lessons: [] },
          { id: "emc-vie-collective-cooperer",  title: "Coopérer",      status: "upcoming", lessons: [] },
        ],
      },
      {
        id: "emc-jugement",
        title: "Jugement moral et civique",
        status: "upcoming",
        subdomains: [
          { id: "emc-jugement-argumenter", title: "Argumenter",        status: "upcoming", lessons: [] },
          { id: "emc-jugement-respecter",  title: "Respecter l'autre", status: "upcoming", lessons: [] },
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
