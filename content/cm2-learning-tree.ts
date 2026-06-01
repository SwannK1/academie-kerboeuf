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
    status: "in-progress",
    domains: [
      {
        id: "francais-lecture",
        title: "Lecture et compréhension",
        status: "in-progress",
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
            status: "upcoming",
            lessons: [
              {
                id: "francais-lecture-inferences-reperer",
                title: "Repérer les indices dans le texte",
                status: "upcoming",
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
                status: "upcoming",
                resources: [
                  { type: "lesson",     label: "Leçon",      status: "upcoming" },
                  { type: "exercise",   label: "Exercices",  status: "upcoming" },
                  { type: "evaluation", label: "Évaluation", status: "upcoming" },
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
        title: "Écriture",
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
        id: "francais-grammaire",
        title: "Grammaire",
        status: "upcoming",
        linkedMissionSlugs: ["enquete-grammaticale"],
        subdomains: [
          {
            id: "francais-grammaire-phrase",
            title: "La phrase",
            status: "upcoming",
            lessons: [
              { id: "francais-grammaire-phrase-types", title: "Identifier les types et formes de phrase", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "francais-grammaire-phrase-constituants", title: "Repérer le sujet, le verbe et les compléments", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "francais-grammaire-nature",
            title: "Nature des mots",
            status: "upcoming",
            lessons: [
              { id: "francais-grammaire-nature-classes", title: "Reconnaître les classes grammaticales", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "francais-grammaire-nature-pronoms", title: "Identifier et utiliser les pronoms", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "francais-grammaire-conjugaison",
            title: "Conjugaison",
            status: "upcoming",
            lessons: [
              { id: "francais-grammaire-conjugaison-present", title: "Conjuguer au présent de l'indicatif", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "francais-grammaire-conjugaison-passe", title: "Conjuguer à l'imparfait et au passé composé", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "francais-grammaire-conjugaison-futur", title: "Conjuguer au futur simple", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
        ],
      },
      {
        id: "francais-orthographe",
        title: "Orthographe",
        status: "upcoming",
        subdomains: [
          {
            id: "francais-orthographe-accords",
            title: "Accords",
            status: "upcoming",
            lessons: [
              { id: "francais-orthographe-accords-gn", title: "Réaliser les accords dans le groupe nominal", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }], linkedMissionSlugs: ["enquete-grammaticale"] },
              { id: "francais-orthographe-accords-sv", title: "Réaliser l'accord sujet-verbe", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "francais-orthographe-accords-participe", title: "Accorder le participe passé avec être et avoir", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "francais-orthographe-usages",
            title: "Orthographe d'usage",
            status: "upcoming",
            lessons: [
              { id: "francais-orthographe-usages-homophones", title: "Distinguer les homophones grammaticaux", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "francais-orthographe-usages-doublement", title: "Mémoriser les mots avec consonne doublée", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
        ],
      },
      {
        id: "francais-lexique",
        title: "Lexique",
        status: "upcoming",
        subdomains: [
          {
            id: "francais-lexique-formation",
            title: "Formation des mots",
            status: "upcoming",
            lessons: [
              { id: "francais-lexique-formation-familles", title: "Identifier les familles de mots", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "francais-lexique-formation-prefixes", title: "Utiliser les préfixes et suffixes pour comprendre un mot inconnu", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "francais-lexique-sens",
            title: "Sens des mots",
            status: "upcoming",
            lessons: [
              { id: "francais-lexique-sens-polysemie", title: "Identifier les différents sens d'un mot polysémique", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "francais-lexique-sens-synonymes", title: "Utiliser des synonymes pour enrichir un texte", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
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
        title: "Nombres et calculs",
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
        title: "Problèmes",
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
              { id: "maths-grandeurs-durees-calculer", title: "Calculer une durée", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "maths-grandeurs-durees-convertir", title: "Convertir des unités de temps", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "maths-grandeurs-aires",
            title: "Aires et périmètres",
            status: "upcoming",
            lessons: [
              { id: "maths-grandeurs-aires-calculer", title: "Calculer l'aire et le périmètre d'une figure", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "maths-grandeurs-aires-distinguer", title: "Distinguer aire et périmètre", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "maths-grandeurs-masses-volumes",
            title: "Masses et volumes",
            status: "upcoming",
            lessons: [
              { id: "maths-grandeurs-masses-convertir", title: "Convertir des unités de masse", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "maths-grandeurs-volumes-convertir", title: "Convertir des unités de contenance", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
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
              { id: "maths-geometrie-figures-quadrilateres", title: "Reconnaître et tracer des quadrilatères", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "maths-geometrie-figures-cercle", title: "Tracer un cercle avec un compas", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "maths-geometrie-figures-agrandissement", title: "Reproduire une figure en l'agrandissant ou en la réduisant", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "maths-geometrie-symetrie",
            title: "Symétrie",
            status: "upcoming",
            lessons: [
              { id: "maths-geometrie-symetrie-axiale", title: "Construire le symétrique d'une figure par rapport à un axe", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "maths-geometrie-symetrie-reconnaitre", title: "Reconnaître si une figure est symétrique", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "maths-geometrie-espace",
            title: "Repérage dans l'espace",
            status: "upcoming",
            lessons: [
              { id: "maths-geometrie-espace-repere", title: "Se repérer sur un quadrillage avec des coordonnées", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
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
              { id: "maths-donnees-tableaux-lire", title: "Lire et compléter un tableau de données", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "maths-donnees-tableaux-graphique", title: "Construire et interpréter un graphique", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "maths-donnees-probabilites",
            title: "Probabilités et hasard",
            status: "upcoming",
            lessons: [
              { id: "maths-donnees-prob-possible", title: "Identifier des événements possibles, impossibles, certains", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
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
        id: "sciences-matiere-energie",
        title: "Matière, mouvement, énergie, information",
        status: "upcoming",
        place: { slug: "laboratoire", label: "Le Laboratoire", zone: "Paillasses d'essai" },
        subdomains: [
          {
            id: "sciences-matiere-etats",
            title: "États et changements de la matière",
            status: "upcoming",
            lessons: [
              { id: "sciences-matiere-etats-identifier", title: "Identifier les trois états de la matière", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "sciences-matiere-etats-changements", title: "Décrire les changements d'état de l'eau", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "sciences-matiere-energie",
            title: "Sources d'énergie",
            status: "upcoming",
            lessons: [
              { id: "sciences-energie-sources", title: "Distinguer les sources d'énergie renouvelables et non renouvelables", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "sciences-energie-electricite", title: "Décrire un circuit électrique simple", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "sciences-matiere-information",
            title: "Signaux et information",
            status: "upcoming",
            lessons: [
              { id: "sciences-info-signaux", title: "Reconnaître différents types de signaux (lumineux, sonores, numériques)", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
        ],
      },
      {
        id: "sciences-vivant",
        title: "Le vivant",
        status: "upcoming",
        subdomains: [
          {
            id: "sciences-vivant-classification",
            title: "Classification du vivant",
            status: "upcoming",
            lessons: [
              { id: "sciences-vivant-classer", title: "Classer les êtres vivants selon des critères communs", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "sciences-vivant-cellule", title: "Comprendre que tout être vivant est constitué de cellules", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "sciences-vivant-fonctions",
            title: "Fonctions vitales",
            status: "upcoming",
            lessons: [
              { id: "sciences-vivant-nutrition", title: "Décrire les besoins nutritionnels d'un être vivant", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "sciences-vivant-reproduction", title: "Distinguer les modes de reproduction chez les animaux et les végétaux", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
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
              { id: "sciences-technologie-objets-fonction", title: "Identifier la fonction d'un objet technique", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "sciences-technologie-objets-evolution", title: "Décrire l'évolution d'un objet technique dans le temps", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "sciences-technologie-materiaux",
            title: "Propriétés des matériaux",
            status: "upcoming",
            lessons: [
              { id: "sciences-technologie-materiaux-proprietes", title: "Classer des matériaux selon leurs propriétés physiques", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "sciences-technologie-materiaux-recyclage", title: "Comprendre l'intérêt du recyclage des matériaux", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
        ],
      },
      {
        id: "sciences-terre",
        title: "La planète Terre et l'environnement",
        status: "upcoming",
        subdomains: [
          {
            id: "sciences-terre-ecosystemes",
            title: "Les écosystèmes",
            status: "upcoming",
            lessons: [
              { id: "sciences-terre-ecosystemes-chaines", title: "Représenter et analyser une chaîne alimentaire", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "sciences-terre-ecosystemes-biodiversite", title: "Expliquer l'importance de la biodiversité", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "sciences-terre-phenomenes",
            title: "Phénomènes naturels et risques",
            status: "upcoming",
            lessons: [
              { id: "sciences-terre-phenomenes-meteo", title: "Décrire les phénomènes météorologiques et climatiques", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "sciences-terre-seismes", title: "Comprendre les séismes et volcans comme phénomènes naturels", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "sciences-terre-environnement",
            title: "Environnement et développement durable",
            status: "upcoming",
            lessons: [
              { id: "sciences-terre-impact-humain", title: "Identifier l'impact des activités humaines sur l'environnement", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
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
        title: "Repères historiques",
        status: "in-progress",
        linkedMissionSlugs: ["archives-historiques"],
        subdomains: [
          {
            id: "histoire-reperes-frise",
            title: "Situer dans le temps",
            status: "upcoming",
            lessons: [
              { id: "histoire-reperes-frise-lire", title: "Lire et compléter une frise chronologique", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "histoire-reperes-frise-periodes", title: "Nommer et caractériser les grandes périodes de l'histoire", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "histoire-reperes-documents",
            title: "Lire des documents historiques",
            status: "upcoming",
            lessons: [
              { id: "histoire-reperes-doc-analyser", title: "Analyser un document historique (nature, auteur, contexte)", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }], linkedMissionSlugs: ["archives-historiques"] },
            ],
          },
        ],
      },
      {
        id: "histoire-modernes",
        title: "Temps modernes",
        status: "upcoming",
        subdomains: [
          {
            id: "histoire-modernes-exploration",
            title: "Les grandes découvertes",
            status: "upcoming",
            lessons: [
              { id: "histoire-modernes-exploration-voyages", title: "Situer et comprendre les grands voyages d'exploration (XVe–XVIe s.)", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "histoire-modernes-roi",
            title: "La monarchie absolue",
            status: "upcoming",
            lessons: [
              { id: "histoire-modernes-roi-louis14", title: "Décrire le règne de Louis XIV et Versailles comme symbole du pouvoir royal", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
        ],
      },
      {
        id: "histoire-revolution",
        title: "Révolution et Empire",
        status: "upcoming",
        subdomains: [
          {
            id: "histoire-revolution-causes",
            title: "La Révolution française",
            status: "upcoming",
            lessons: [
              { id: "histoire-revolution-causes-1789", title: "Identifier les causes et le déclenchement de la Révolution de 1789", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }], linkedMissionSlugs: ["archives-historiques"] },
              { id: "histoire-revolution-ddhc", title: "Comprendre la Déclaration des droits de l'homme et du citoyen", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "histoire-revolution-napoleon",
            title: "L'Empire napoléonien",
            status: "upcoming",
            lessons: [
              { id: "histoire-revolution-napoleon-bilan", title: "Décrire le règne de Napoléon Bonaparte et ses conséquences en Europe", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
        ],
      },
      {
        id: "histoire-xixe",
        title: "XIXe siècle",
        status: "upcoming",
        subdomains: [
          {
            id: "histoire-xixe-industrie",
            title: "Révolution industrielle",
            status: "upcoming",
            lessons: [
              { id: "histoire-xixe-industrie-transformations", title: "Décrire les transformations économiques et sociales de la révolution industrielle", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "histoire-xixe-republique",
            title: "La IIIe République",
            status: "upcoming",
            lessons: [
              { id: "histoire-xixe-republique-ecole", title: "Comprendre les lois Ferry et la laïcisation de l'école", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "histoire-xixe-republique-valeurs", title: "Identifier les valeurs républicaines (Liberté, Égalité, Fraternité)", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
        ],
      },
      {
        id: "histoire-xxe",
        title: "XXe siècle",
        status: "upcoming",
        subdomains: [
          {
            id: "histoire-xxe-guerres",
            title: "Les deux guerres mondiales",
            status: "upcoming",
            lessons: [
              { id: "histoire-xxe-guerres-ww1", title: "Comprendre les causes et les conséquences de la Première Guerre mondiale", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "histoire-xxe-guerres-ww2", title: "Situer les étapes de la Seconde Guerre mondiale et comprendre la Résistance", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "histoire-xxe-decolonisation",
            title: "Décolonisation et construction européenne",
            status: "upcoming",
            lessons: [
              { id: "histoire-xxe-europe", title: "Comprendre la naissance de la construction européenne après 1945", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
        ],
      },
      {
        id: "geo-deplacements",
        title: "Se déplacer",
        status: "upcoming",
        place: { slug: "cartotheque-des-lisieres", label: "La Cartothèque des Lisières", zone: "Mur des cartes" },
        linkedMissionSlugs: ["cartographe-du-monde"],
        subdomains: [
          {
            id: "geo-deplacements-mobilites",
            title: "Les mobilités humaines",
            status: "upcoming",
            lessons: [
              { id: "geo-deplacements-mobilites-flux", title: "Identifier des flux de déplacements à différentes échelles", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "geo-deplacements-mobilites-migrations", title: "Comprendre les migrations comme phénomène mondial", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "geo-deplacements-transports",
            title: "Les réseaux de transport",
            status: "upcoming",
            lessons: [
              { id: "geo-deplacements-transports-france", title: "Décrire les grands réseaux de transport en France", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
        ],
      },
      {
        id: "geo-internet",
        title: "Communiquer grâce à Internet",
        status: "upcoming",
        subdomains: [
          {
            id: "geo-internet-fonctionnement",
            title: "Fonctionnement d'Internet",
            status: "upcoming",
            lessons: [
              { id: "geo-internet-fonctionnement-reseau", title: "Décrire Internet comme réseau mondial d'échange d'informations", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "geo-internet-inegalites",
            title: "Inégalités d'accès au numérique",
            status: "upcoming",
            lessons: [
              { id: "geo-internet-inegalites-fracture", title: "Identifier les inégalités d'accès à Internet dans le monde", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
        ],
      },
      {
        id: "geo-habiter",
        title: "Mieux habiter",
        status: "upcoming",
        subdomains: [
          {
            id: "geo-habiter-villes",
            title: "Les espaces urbains",
            status: "upcoming",
            lessons: [
              { id: "geo-habiter-villes-croissance", title: "Comprendre la croissance des villes et les défis urbains", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "geo-habiter-villes-durabilite", title: "Identifier des aménagements pour rendre une ville plus durable", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "geo-habiter-ruraux",
            title: "Les espaces ruraux",
            status: "upcoming",
            lessons: [
              { id: "geo-habiter-ruraux-caracteristiques", title: "Décrire les caractéristiques d'un espace rural et ses évolutions", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
        ],
      },
      {
        id: "geo-cartes",
        title: "Lire et produire des cartes",
        status: "in-progress",
        subdomains: [
          {
            id: "geo-cartes-lire",
            title: "Lire une carte",
            status: "in-progress",
            lessons: [
              { id: "geo-cartes-lire-legende", title: "Comprendre et utiliser une légende", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }], linkedMissionSlugs: ["cartographe-du-monde"] },
              { id: "geo-cartes-lire-localiser", title: "Localiser un lieu à l'aide de coordonnées géographiques", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "geo-cartes-lire-echelles", title: "Comparer des cartes à différentes échelles", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "geo-cartes-produire",
            title: "Produire une carte ou un croquis",
            status: "upcoming",
            lessons: [
              { id: "geo-cartes-produire-croquis", title: "Réaliser un croquis simple avec titre, légende et orientation", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
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
        id: "emc-respecter-autrui",
        title: "Respecter autrui",
        status: "upcoming",
        subdomains: [
          {
            id: "emc-respecter-differences",
            title: "Accueillir les différences",
            status: "upcoming",
            lessons: [
              { id: "emc-respecter-differences-discriminations", title: "Identifier et refuser les comportements discriminatoires", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "emc-respecter-differences-empathie", title: "Développer l'empathie envers l'autre", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "emc-respecter-regles",
            title: "Respecter les règles de la vie collective",
            status: "upcoming",
            lessons: [
              { id: "emc-respecter-regles-comprendre", title: "Comprendre la nécessité des règles dans un groupe", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "emc-respecter-consentement", title: "Comprendre le respect et le consentement dans les relations", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }], linkedMissionSlugs: ["corps-relations-consentement-internet"] },
            ],
          },
        ],
      },
      {
        id: "emc-valeurs-republique",
        title: "Acquérir et partager les valeurs de la République",
        status: "upcoming",
        subdomains: [
          {
            id: "emc-valeurs-laicite",
            title: "La laïcité",
            status: "upcoming",
            lessons: [
              { id: "emc-valeurs-laicite-principe", title: "Comprendre le principe de laïcité et son application à l'école", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "emc-valeurs-droits",
            title: "Les droits et les libertés",
            status: "upcoming",
            lessons: [
              { id: "emc-valeurs-droits-declaration", title: "Connaître la Déclaration des droits de l'homme et du citoyen", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "emc-valeurs-droits-enfant", title: "Connaître les droits fondamentaux de l'enfant (Convention ONU)", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "emc-valeurs-liberte-egalite-fraternite",
            title: "Liberté, Égalité, Fraternité",
            status: "upcoming",
            lessons: [
              { id: "emc-valeurs-lef-comprendre", title: "Expliquer le sens de chacune des trois valeurs républicaines", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
        ],
      },
      {
        id: "emc-culture-civique",
        title: "Construire une culture civique",
        status: "upcoming",
        subdomains: [
          {
            id: "emc-culture-institutions",
            title: "Les institutions françaises",
            status: "upcoming",
            lessons: [
              { id: "emc-culture-institutions-republique", title: "Identifier les principales institutions de la République française", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "emc-culture-institutions-vote", title: "Comprendre le principe du vote et de l'élection démocratique", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "emc-culture-numerique",
            title: "Citoyenneté numérique",
            status: "upcoming",
            lessons: [
              { id: "emc-culture-numerique-traces", title: "Comprendre la notion de traces numériques et leur impact", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "emc-culture-numerique-fiabilite", title: "Vérifier la fiabilité d'une information en ligne", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
        ],
      },
      {
        id: "emc-debattre-cooperer",
        title: "Débattre, coopérer, s'engager",
        status: "upcoming",
        subdomains: [
          {
            id: "emc-debattre-debat",
            title: "Pratiquer le débat",
            status: "upcoming",
            lessons: [
              { id: "emc-debattre-debat-exprimer", title: "Exprimer et justifier son point de vue dans un débat", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "emc-debattre-debat-ecouter", title: "Écouter activement et reformuler le point de vue de l'autre", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "emc-debattre-cooperer-engager",
            title: "Coopérer et s'engager",
            status: "upcoming",
            lessons: [
              { id: "emc-debattre-cooperer-groupe", title: "Travailler en groupe en respectant les rôles de chacun", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "emc-debattre-cooperer-projet", title: "Participer à un projet collectif en s'y engageant", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
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
        id: "anglais-se-presenter",
        title: "Se présenter",
        status: "upcoming",
        subdomains: [
          {
            id: "anglais-presenter-identite",
            title: "Dire son identité",
            status: "upcoming",
            lessons: [
              { id: "anglais-presenter-nom-age", title: "Se présenter en donnant son nom, son âge et sa nationalité", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "anglais-presenter-gouts", title: "Exprimer ses goûts avec like / don't like", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
        ],
      },
      {
        id: "anglais-consignes",
        title: "Comprendre des consignes simples",
        status: "upcoming",
        subdomains: [
          {
            id: "anglais-consignes-classe",
            title: "Consignes de classe",
            status: "upcoming",
            lessons: [
              { id: "anglais-consignes-imperatives", title: "Comprendre et exécuter des consignes impératives en anglais", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "anglais-consignes-questions", title: "Comprendre des questions simples du type What? Where? How many?", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
        ],
      },
      {
        id: "anglais-quotidien",
        title: "Parler de son quotidien",
        status: "upcoming",
        subdomains: [
          {
            id: "anglais-quotidien-activites",
            title: "Les activités du quotidien",
            status: "upcoming",
            lessons: [
              { id: "anglais-quotidien-activites-present", title: "Décrire ses activités habituelles au présent simple", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "anglais-quotidien-heure", title: "Dire l'heure et les moments de la journée", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "anglais-quotidien-famille",
            title: "La famille et l'environnement proche",
            status: "upcoming",
            lessons: [
              { id: "anglais-quotidien-famille-presenter", title: "Présenter les membres de sa famille", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "anglais-quotidien-maison", title: "Décrire les pièces de la maison", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
        ],
      },
      {
        id: "anglais-cultures",
        title: "Découvrir des éléments culturels",
        status: "upcoming",
        subdomains: [
          {
            id: "anglais-cultures-pays",
            title: "Pays et traditions anglophones",
            status: "upcoming",
            lessons: [
              { id: "anglais-cultures-pays-uk", title: "Découvrir des aspects culturels du Royaume-Uni", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "anglais-cultures-fetes", title: "Connaître les fêtes et traditions des pays anglophones", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
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
        id: "arts-observer",
        title: "Observer une œuvre",
        status: "upcoming",
        subdomains: [
          {
            id: "arts-observer-decrire",
            title: "Décrire et analyser une œuvre d'art",
            status: "upcoming",
            lessons: [
              { id: "arts-observer-decrire-elements", title: "Identifier les éléments visuels d'une œuvre (formes, couleurs, composition)", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "arts-observer-contexte", title: "Situer une œuvre dans son contexte historique et culturel", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
        ],
      },
      {
        id: "arts-experimenter",
        title: "Expérimenter des techniques",
        status: "upcoming",
        subdomains: [
          {
            id: "arts-experimenter-plastiques",
            title: "Techniques plastiques",
            status: "upcoming",
            lessons: [
              { id: "arts-experimenter-couleurs", title: "Maîtriser le mélange des couleurs et la composition chromatique", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "arts-experimenter-volume", title: "Travailler en volume (modelage, assemblage)", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
        ],
      },
      {
        id: "arts-produire",
        title: "Produire avec une intention",
        status: "upcoming",
        subdomains: [
          {
            id: "arts-produire-intention",
            title: "Créer en exprimant une idée",
            status: "upcoming",
            lessons: [
              { id: "arts-produire-intention-projet", title: "Formuler une intention artistique avant de créer", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "arts-produire-choix", title: "Justifier ses choix plastiques", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
        ],
      },
      {
        id: "arts-presenter",
        title: "Présenter sa production",
        status: "upcoming",
        subdomains: [
          {
            id: "arts-presenter-oral",
            title: "Présenter et défendre son travail",
            status: "upcoming",
            lessons: [
              { id: "arts-presenter-oral-decrire", title: "Décrire oralement sa production devant un groupe", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "arts-presenter-regard-autres", title: "Recevoir un regard critique sur son travail et en discuter", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
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
        id: "eps-cooperer-opposer",
        title: "Coopérer et s'opposer",
        status: "upcoming",
        subdomains: [
          {
            id: "eps-cooperer-equipe",
            title: "Jeux d'équipe",
            status: "upcoming",
            lessons: [
              { id: "eps-cooperer-equipe-strategie", title: "Élaborer et appliquer une stratégie collective", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "eps-cooperer-equipe-roles", title: "Accepter et tenir différents rôles dans une équipe", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "eps-cooperer-adversaires",
            title: "Activités d'opposition",
            status: "upcoming",
            lessons: [
              { id: "eps-cooperer-adversaires-regles", title: "Respecter les règles d'un jeu d'opposition", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
        ],
      },
      {
        id: "eps-performance",
        title: "Réaliser une performance",
        status: "upcoming",
        subdomains: [
          {
            id: "eps-performance-atletisme",
            title: "Athlétisme",
            status: "upcoming",
            lessons: [
              { id: "eps-performance-course-vitesse", title: "Courir vite sur une courte distance en optimisant sa foulée", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "eps-performance-course-endurance", title: "Maintenir une allure régulière sur la durée", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "eps-performance-lancer", title: "Réaliser un lancer (longueur, précision) en adoptant la bonne posture", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "eps-performance-natation",
            title: "Natation",
            status: "upcoming",
            lessons: [
              { id: "eps-performance-natation-nager", title: "Nager en adoptant une technique efficace sur 25 mètres", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
        ],
      },
      {
        id: "eps-deplacements",
        title: "Adapter ses déplacements",
        status: "upcoming",
        subdomains: [
          {
            id: "eps-deplacements-milieux",
            title: "Déplacements en milieux variés",
            status: "upcoming",
            lessons: [
              { id: "eps-deplacements-orientation", title: "Se déplacer en utilisant des repères (orientation, cartographie simple)", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "eps-deplacements-obstacles", title: "Adapter sa course à des obstacles ou un environnement changeant", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
        ],
      },
      {
        id: "eps-expression",
        title: "S'exprimer par une activité artistique ou corporelle",
        status: "upcoming",
        subdomains: [
          {
            id: "eps-expression-danse",
            title: "Danse et expression corporelle",
            status: "upcoming",
            lessons: [
              { id: "eps-expression-danse-composer", title: "Composer et mémoriser une phrase dansée", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
              { id: "eps-expression-danse-presenter", title: "Présenter une création devant les autres en tant que danseur et spectateur", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
          {
            id: "eps-expression-acrosport",
            title: "Acrosport et acrobaties",
            status: "upcoming",
            lessons: [
              { id: "eps-expression-acro-figure", title: "Réaliser et maintenir une figure acrobatique en sécurité", status: "upcoming", resources: [{ type: "lesson", label: "Leçon", status: "upcoming" }, { type: "exercise", label: "Exercices", status: "upcoming" }, { type: "evaluation", label: "Évaluation", status: "upcoming" }] },
            ],
          },
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
