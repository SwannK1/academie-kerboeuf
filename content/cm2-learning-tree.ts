// Arbre pédagogique CM2 : Matière → Domaine → Sous-domaine → Leçon.
// Lieux et personnages-guides accompagnent la structure, sans la remplacer.
// Les pages de leçon/exercice/évaluation ne sont pas encore créées :
// tous les Cm2LessonNode sont status "upcoming" dans ce premier socle.

import type {
  LearningNotion,
  LearningSession,
  LearningSessionType,
} from "@/content/elementary-learning-model";

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

export type Cm2LearningSessionType = LearningSessionType;
export type Cm2LearningSession = LearningSession;

export type Cm2LessonNode = Pick<LearningNotion, "id" | "title" | "status"> &
  Partial<Pick<LearningNotion, "objective" | "successCriteria" | "sessions">> & {
  description?: string;
  /** When defined, this lesson has a routed page at `…/[lessonId]` using this slug. */
  routeSlug?: string;
  resources: Cm2LessonResource[];
  linkedMissionSlugs?: string[];
};

export type Cm2LearningNotion = Cm2LessonNode;
export type { LearningNotion, LearningSession };

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
            description: "Comprendre l'implicite, identifier les inférences et justifier ses réponses avec des indices du texte.",
            status: "available",
            lessons: [
              {
                id: "francais-lecture-implicite-comprendre",
                title: "Comprendre l'implicite dans un texte",
                description: "Apprendre à comprendre ce que le texte suggère sans le dire directement.",
                objective: "Déduire une information implicite à partir d'indices simples.",
                successCriteria: [
                  "Je repère une information qui n'est pas écrite directement.",
                  "Je cite au moins un indice du texte.",
                  "Je formule une déduction cohérente.",
                ],
                status: "upcoming",
                routeSlug: "comprendre-l-implicite",
                sessions: [
                  {
                    id: "francais-lecture-implicite-comprendre-s1",
                    title: "Une phrase qui cache une information",
                    type: "problem-situation",
                    order: 1,
                    duration: "30 min",
                    goal: "Faire émerger le besoin de lire au-delà de ce qui est écrit.",
                    summary: "Les élèves lisent un court texte volontairement incomplet, proposent ce qu'ils comprennent, puis comparent les indices utilisés.",
                    status: "upcoming",
                  },
                  {
                    id: "francais-lecture-implicite-comprendre-s2",
                    title: "La méthode des indices",
                    type: "lesson",
                    order: 2,
                    duration: "35 min",
                    goal: "Formaliser la différence entre information explicite et information implicite.",
                    summary: "La classe construit une trace courte : je lis, je repère les indices, je relie les informations, je déduis.",
                    status: "upcoming",
                  },
                  {
                    id: "francais-lecture-implicite-comprendre-s3",
                    title: "Chercher ensemble ce qui est suggéré",
                    type: "guided-practice",
                    order: 3,
                    duration: "40 min",
                    goal: "S'entraîner collectivement à verbaliser chaque étape de la déduction.",
                    summary: "Sur plusieurs mini-textes, les élèves repèrent les indices au tableau et formulent une déduction guidée.",
                    status: "upcoming",
                  },
                  {
                    id: "francais-lecture-implicite-comprendre-s4",
                    title: "Déduire avec moins d'aide",
                    type: "consolidation",
                    order: 4,
                    duration: "40 min",
                    goal: "Réinvestir la méthode sur des textes courts de difficulté progressive.",
                    summary: "Les élèves travaillent seuls ou en binômes, avec un parcours différencié et un court défi de transfert.",
                    status: "upcoming",
                  },
                  {
                    id: "francais-lecture-implicite-comprendre-s5",
                    title: "Évaluation de l'implicite",
                    type: "assessment",
                    order: 5,
                    duration: "25 min",
                    goal: "Vérifier que l'élève déduit une information implicite et justifie sa réponse.",
                    summary: "Consigne courte : lis le texte, écris ce que tu comprends sans que ce soit dit, puis entoure l'indice qui t'a aidé.",
                    status: "upcoming",
                  },
                ],
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
                ],
                linkedMissionSlugs: ["mission-inference"],
              },
              {
                id: "francais-lecture-inferences-identifier",
                title: "Identifier les inférences",
                description: "Reconnaître qu'une réponse peut venir d'un raisonnement entre plusieurs indices du texte.",
                objective: "Identifier l'inférence nécessaire pour répondre à une question de lecture.",
                successCriteria: [
                  "Je distingue une réponse copiée du texte d'une réponse déduite.",
                  "Je relie deux indices pour construire ma réponse.",
                  "J'explique rapidement mon raisonnement.",
                ],
                status: "upcoming",
                routeSlug: "identifier-les-inferences",
                sessions: [
                  {
                    id: "francais-lecture-inferences-identifier-s1",
                    title: "La question impossible à copier",
                    type: "problem-situation",
                    order: 1,
                    duration: "30 min",
                    goal: "Faire comprendre qu'une réponse peut demander un raisonnement.",
                    summary: "Les élèves répondent à une question dont la réponse n'est pas copiée dans le texte, puis expliquent leurs tentatives.",
                    status: "upcoming",
                  },
                  {
                    id: "francais-lecture-inferences-identifier-s2",
                    title: "Reconnaître une inférence",
                    type: "lesson",
                    order: 2,
                    duration: "35 min",
                    goal: "Formaliser l'inférence comme une déduction construite avec des indices.",
                    summary: "La classe établit une méthode guidée : question, indices, lien logique, réponse formulée.",
                    status: "upcoming",
                  },
                  {
                    id: "francais-lecture-inferences-identifier-s3",
                    title: "Trier les réponses",
                    type: "guided-practice",
                    order: 3,
                    duration: "40 min",
                    goal: "S'entraîner à classer les questions selon le type de réponse attendu.",
                    summary: "Collectivement, les élèves distinguent réponses écrites dans le texte et réponses à inférer.",
                    status: "upcoming",
                  },
                  {
                    id: "francais-lecture-inferences-identifier-s4",
                    title: "Construire ses propres inférences",
                    type: "consolidation",
                    order: 4,
                    duration: "40 min",
                    goal: "Appliquer la méthode sur des questions de difficulté croissante.",
                    summary: "Les élèves répondent à des questions différenciées, puis rédigent une question qui oblige à faire une inférence.",
                    status: "upcoming",
                  },
                  {
                    id: "francais-lecture-inferences-identifier-s5",
                    title: "Évaluation des inférences",
                    type: "assessment",
                    order: 5,
                    duration: "25 min",
                    goal: "Vérifier que l'élève identifie une inférence et la formule clairement.",
                    summary: "Consigne courte : réponds à deux questions, puis indique si ta réponse est écrite dans le texte ou déduite.",
                    status: "upcoming",
                  },
                ],
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming"  },
                  { type: "evaluation", label: "Évaluation", status: "upcoming"  },
                ],
                linkedMissionSlugs: ["mission-inference"],
              },
              {
                id: "francais-lecture-justifier-indices",
                title: "Justifier sa réponse avec des indices du texte",
                description: "Apprendre à appuyer une réponse de lecture sur des éléments précis du texte.",
                objective: "Répondre à une question en citant ou en reformulant les indices utiles.",
                successCriteria: [
                  "Je donne une réponse claire.",
                  "Je choisis un indice pertinent dans le texte.",
                  "Je relie l'indice à ma réponse avec une phrase simple.",
                ],
                status: "upcoming",
                routeSlug: "justifier-avec-indices",
                sessions: [
                  {
                    id: "francais-lecture-justifier-indices-s1",
                    title: "Deux réponses, une seule convaincante",
                    type: "problem-situation",
                    order: 1,
                    duration: "30 min",
                    goal: "Faire émerger le besoin de prouver une réponse avec le texte.",
                    summary: "Les élèves comparent deux réponses à la même question et cherchent celle qui s'appuie vraiment sur un indice.",
                    status: "upcoming",
                  },
                  {
                    id: "francais-lecture-justifier-indices-s2",
                    title: "Réponse, indice, justification",
                    type: "lesson",
                    order: 2,
                    duration: "35 min",
                    goal: "Construire une méthode courte pour justifier une réponse.",
                    summary: "La trace écrite fixe trois étapes : je réponds, je cite ou reformule l'indice, j'explique le lien.",
                    status: "upcoming",
                  },
                  {
                    id: "francais-lecture-justifier-indices-s3",
                    title: "Justifier à voix haute",
                    type: "guided-practice",
                    order: 3,
                    duration: "40 min",
                    goal: "S'entraîner ensemble à choisir et verbaliser un indice pertinent.",
                    summary: "La classe travaille sur des réponses guidées, complète des justifications et améliore des formulations.",
                    status: "upcoming",
                  },
                  {
                    id: "francais-lecture-justifier-indices-s4",
                    title: "Répondre et prouver seul",
                    type: "consolidation",
                    order: 4,
                    duration: "40 min",
                    goal: "Réinvestir la méthode avec moins d'aide.",
                    summary: "Les élèves rédigent des réponses justifiées sur plusieurs textes courts, avec aides graduées selon les besoins.",
                    status: "upcoming",
                  },
                  {
                    id: "francais-lecture-justifier-indices-s5",
                    title: "Évaluation de la justification",
                    type: "assessment",
                    order: 5,
                    duration: "25 min",
                    goal: "Vérifier que l'élève sait justifier une réponse avec un indice du texte.",
                    summary: "Consigne courte : réponds à la question, copie ou reformule l'indice, puis écris pourquoi il prouve ta réponse.",
                    status: "upcoming",
                  },
                ],
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
