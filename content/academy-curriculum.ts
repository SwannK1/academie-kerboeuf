// Curriculum global — Académie Kerboeuf.
// Structure : Palier → Niveau → Matière → Domaine → Sous-domaine → Séquence.
//
// Règles :
// - Aucun href fictif. href uniquement si la ressource existe réellement.
// - resources: [] si aucune ressource réelle disponible.
// - Le CM2 est le niveau le plus détaillé (Félix + professeurs référents).
// - Les autres niveaux ont leurs matières déclarées, sous-domaines à compléter.
// - characterGuide: "felix" sur les séquences CM2 pertinentes.
// - teacherReference correspond aux slugs de content/professors.ts.

import type { AcademyDomain, AcademyLevel, AcademySchoolStage } from "@/content/academy-curriculum.types";

// ── Maternelle ────────────────────────────────────────────────────────────────

function buildMaternelleSubjects() {
  return [
    {
      slug: "langage",
      label: "Mobiliser le langage dans toutes ses dimensions",
      description: "Oral, écrit, découverte du principe alphabétique.",
      domains: [] as AcademyDomain[],
    },
    {
      slug: "activite-physique",
      label: "Agir, s'exprimer, comprendre à travers l'activité physique",
      description: "Motricité globale, jeux collectifs, expression corporelle.",
      domains: [] as AcademyDomain[],
    },
    {
      slug: "activites-artistiques",
      label: "Agir, s'exprimer, comprendre à travers les activités artistiques",
      description: "Arts plastiques, musique, arts vivants.",
      domains: [] as AcademyDomain[],
    },
    {
      slug: "structurer-pensee",
      label: "Construire les premiers outils pour structurer sa pensée",
      description: "Nombres, formes, grandeurs, résolution de problèmes simples.",
      domains: [] as AcademyDomain[],
    },
    {
      slug: "explorer-monde",
      label: "Explorer le monde",
      description: "Espace, temps, vivant, matière, objets.",
      domains: [] as AcademyDomain[],
    },
  ];
}

const ps: AcademyLevel = {
  slug: "ps",
  label: "Petite Section",
  cycle: "cycle-1",
  stage: "maternelle",
  description: "Première année de maternelle. Entrée dans le langage oral et la vie collective.",
  subjects: buildMaternelleSubjects(),
};

const ms: AcademyLevel = {
  slug: "ms",
  label: "Moyenne Section",
  cycle: "cycle-1",
  stage: "maternelle",
  description: "Consolidation des acquis de PS. Développement de l'autonomie et du langage.",
  subjects: buildMaternelleSubjects(),
};

const gs: AcademyLevel = {
  slug: "gs",
  label: "Grande Section",
  cycle: "cycle-1",
  stage: "maternelle",
  description: "Préparation au CP. Entrée dans l'écrit et le principe alphabétique.",
  subjects: buildMaternelleSubjects(),
};

// ── Élémentaire — matières communes ──────────────────────────────────────────

const elementaireSubjectsBase = [
  {
    slug: "francais",
    label: "Français",
    description: "Lecture, écriture, étude de la langue, oral.",
    domains: [],
  },
  {
    slug: "mathematiques",
    label: "Mathématiques",
    description: "Nombres, calcul, géométrie, grandeurs et mesures.",
    domains: [],
  },
  {
    slug: "emc",
    label: "Enseignement moral et civique",
    description: "Valeurs républicaines, vie collective, citoyenneté.",
    domains: [],
  },
  {
    slug: "langues-vivantes",
    label: "Langues vivantes",
    description: "Anglais et autre langue vivante selon l'école.",
    domains: [],
  },
  {
    slug: "arts-plastiques",
    label: "Arts plastiques",
    description: "Pratique artistique, culture artistique.",
    domains: [],
  },
  {
    slug: "education-musicale",
    label: "Éducation musicale",
    description: "Chant, écoute, pratique instrumentale.",
    domains: [],
  },
  {
    slug: "eps",
    label: "EPS",
    description: "Activités physiques, sportives et artistiques.",
    domains: [],
  },
];

const cp: AcademyLevel = {
  slug: "cp",
  label: "CP",
  cycle: "cycle-2",
  stage: "elementaire",
  description: "Apprentissage fondamental de la lecture et du calcul.",
  subjects: [
    ...elementaireSubjectsBase.slice(0, 3),
    {
      slug: "questionner-monde",
      label: "Questionner le monde",
      description: "Espace, temps, matière, vivant, objets techniques.",
      domains: [],
    },
    ...elementaireSubjectsBase.slice(3),
  ],
};

const ce1: AcademyLevel = {
  slug: "ce1",
  label: "CE1",
  cycle: "cycle-2",
  stage: "elementaire",
  description: "Consolidation de la lecture et entrée dans la numération.",
  subjects: [
    ...elementaireSubjectsBase.slice(0, 3),
    {
      slug: "questionner-monde",
      label: "Questionner le monde",
      description: "Espace, temps, matière, vivant, objets techniques.",
      domains: [],
    },
    ...elementaireSubjectsBase.slice(3),
  ],
};

const ce2: AcademyLevel = {
  slug: "ce2",
  label: "CE2",
  cycle: "cycle-2",
  stage: "elementaire",
  description: "Fin du cycle 2. Maîtrise de la lecture courante et des opérations.",
  subjects: [
    ...elementaireSubjectsBase.slice(0, 3),
    {
      slug: "questionner-monde",
      label: "Questionner le monde",
      description: "Espace, temps, matière, vivant, objets techniques.",
      domains: [],
    },
    ...elementaireSubjectsBase.slice(3),
  ],
};

const cm1: AcademyLevel = {
  slug: "cm1",
  label: "CM1",
  cycle: "cycle-3",
  stage: "elementaire",
  description: "Début du cycle 3. Approfondissement et ouverture disciplinaire.",
  subjects: [
    ...elementaireSubjectsBase.slice(0, 3),
    {
      slug: "histoire-geographie",
      label: "Histoire-Géographie",
      description: "Repères chronologiques et géographiques de la France et du monde.",
      domains: [],
    },
    {
      slug: "sciences-technologie",
      label: "Sciences et technologie",
      description: "Matière, vivant, environnement, objets techniques.",
      domains: [],
    },
    ...elementaireSubjectsBase.slice(3),
  ],
};

// ── CM2 — niveau détaillé ─────────────────────────────────────────────────────

const cm2: AcademyLevel = {
  slug: "cm2",
  label: "CM2",
  cycle: "cycle-3",
  stage: "elementaire",
  description: "Fin du cycle 3. Consolidation avant l'entrée au collège. Félix guide les élèves.",
  subjects: [
    // ── Français ────────────────────────────────────────────────────────────
    {
      slug: "francais",
      label: "Français",
      description: "Lecture, écriture, étude de la langue, oral, lexique.",
      domains: [
        {
          slug: "lecture-comprehension",
          label: "Lecture et compréhension",
          description: "Lire, comprendre et interpréter des textes variés.",
          subdomains: [
            {
              slug: "inferences",
              label: "Inférences",
              description: "Comprendre ce qui n'est pas dit explicitement.",
              sequences: [
                {
                  slug: "reperer-les-indices",
                  title: "Repérer les indices dans un texte",
                  description: "Identifier les éléments implicites à partir d'indices textuels.",
                  status: "a-venir",
                  objectives: [
                    "Repérer les indices qui permettent de comprendre ce qui n'est pas dit",
                    "Formuler une inférence à l'oral puis à l'écrit",
                  ],
                  estimatedDuration: "2 séances de 45 min",
                  teacherReference: "agathe",
                  characterGuide: "felix",
                  resources: [],
                },
                {
                  slug: "distinguer-explicite-implicite",
                  title: "Distinguer explicite et implicite",
                  description: "Différencier ce qui est écrit de ce que le texte sous-entend.",
                  status: "a-venir",
                  objectives: [
                    "Identifier une information explicite dans un texte court",
                    "Construire une inférence à partir du contexte",
                  ],
                  estimatedDuration: "2 séances de 45 min",
                  teacherReference: "agathe",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
            {
              slug: "comprehension-globale",
              label: "Compréhension globale",
              description: "Dégager l'idée principale et la structure d'un texte.",
              sequences: [
                {
                  slug: "identifier-idee-principale",
                  title: "Identifier l'idée principale d'un texte",
                  description: "Résumer un texte en une phrase.",
                  status: "a-venir",
                  objectives: ["Distinguer idée principale et détails secondaires"],
                  teacherReference: "agathe",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "ecriture",
          label: "Écriture",
          description: "Produire des écrits variés, soignés et structurés.",
          subdomains: [
            {
              slug: "recit",
              label: "Récit narratif",
              description: "Écrire un récit cohérent avec un début, un milieu et une fin.",
              sequences: [
                {
                  slug: "ecrire-recit-court",
                  title: "Écrire un récit court",
                  description: "Planifier et rédiger un texte narratif de 10 à 15 lignes.",
                  status: "a-venir",
                  objectives: [
                    "Organiser son récit en trois parties",
                    "Utiliser des connecteurs temporels",
                  ],
                  teacherReference: "selena",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
            {
              slug: "ecrits-fonctionnels",
              label: "Écrits fonctionnels",
              description: "Lettre, compte rendu, description, message.",
              sequences: [
                {
                  slug: "ecrire-une-lettre",
                  title: "Écrire une lettre formelle simple",
                  description: "Respecter la structure et le registre d'une lettre.",
                  status: "a-venir",
                  objectives: ["Identifier les composantes d'une lettre formelle"],
                  teacherReference: "selena",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "etude-de-la-langue",
          label: "Étude de la langue",
          description: "Grammaire, conjugaison, orthographe, vocabulaire.",
          subdomains: [
            {
              slug: "orthographe-grammaticale",
              label: "Orthographe grammaticale",
              description: "Accords dans le groupe nominal et verbal.",
              sequences: [
                {
                  slug: "accorder-verbe-sujet",
                  title: "Accorder le verbe avec le sujet",
                  description: "Identifier le sujet et appliquer l'accord sujet-verbe.",
                  status: "a-venir",
                  objectives: [
                    "Identifier le sujet d'un verbe conjugué",
                    "Appliquer les règles d'accord sujet-verbe aux temps usuels",
                  ],
                  estimatedDuration: "3 séances de 45 min",
                  teacherReference: "rosa",
                  characterGuide: "felix",
                  resources: [],
                },
                {
                  slug: "accord-groupe-nominal",
                  title: "Accord dans le groupe nominal",
                  description: "Accorder déterminant, nom et adjectif en genre et en nombre.",
                  status: "a-venir",
                  objectives: [
                    "Identifier les constituants du GN",
                    "Appliquer les règles d'accord en genre et en nombre",
                  ],
                  teacherReference: "rosa",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
            {
              slug: "conjugaison",
              label: "Conjugaison",
              description: "Les temps du récit et de l'énonciation au CM2.",
              sequences: [
                {
                  slug: "present-indicatif",
                  title: "Le présent de l'indicatif",
                  description: "Conjuguer les verbes des groupes 1, 2 et auxiliaires au présent.",
                  status: "a-venir",
                  objectives: ["Conjuguer au présent les verbes fréquents"],
                  teacherReference: "selena",
                  characterGuide: "felix",
                  resources: [],
                },
                {
                  slug: "futur-simple",
                  title: "Le futur simple",
                  description: "Conjuguer et employer le futur simple.",
                  status: "a-venir",
                  objectives: ["Distinguer futur simple et futur proche"],
                  teacherReference: "selena",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
            {
              slug: "grammaire",
              label: "Grammaire",
              description: "Fonctions grammaticales et analyse de la phrase.",
              sequences: [
                {
                  slug: "identifier-nature-fonction",
                  title: "Identifier la nature et la fonction des mots",
                  description: "Distinguer sujet, verbe, compléments dans une phrase simple.",
                  status: "a-venir",
                  objectives: ["Analyser la structure d'une phrase simple"],
                  teacherReference: "selena",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "oral",
          label: "Oral",
          description: "Prendre la parole, écouter, participer à un débat.",
          subdomains: [
            {
              slug: "prise-de-parole",
              label: "Prise de parole",
              description: "Exposé oral structuré devant la classe.",
              sequences: [
                {
                  slug: "preparer-expose-oral",
                  title: "Préparer et présenter un exposé oral",
                  description: "Structurer une prise de parole et la présenter devant la classe.",
                  status: "a-venir",
                  objectives: [
                    "Organiser ses idées avant de parler",
                    "Adapter son registre à l'audience",
                  ],
                  teacherReference: "rosa",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "lexique",
          label: "Lexique",
          description: "Enrichissement du vocabulaire, familles de mots, sens des mots.",
          subdomains: [
            {
              slug: "familles-de-mots",
              label: "Familles de mots",
              description: "Regrouper les mots selon leur radical.",
              sequences: [
                {
                  slug: "construire-famille-mots",
                  title: "Construire une famille de mots",
                  description: "Identifier le radical et les dérivés d'un mot.",
                  status: "a-venir",
                  objectives: ["Reconnaître préfixes, suffixes, radical"],
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
      ],
    },
    // ── Mathématiques ────────────────────────────────────────────────────────
    {
      slug: "mathematiques",
      label: "Mathématiques",
      description: "Nombres, calcul, problèmes, géométrie, grandeurs.",
      domains: [
        {
          slug: "nombres-calculs",
          label: "Nombres et calculs",
          description: "Maîtriser les quatre opérations et la numération décimale.",
          subdomains: [
            {
              slug: "numeration",
              label: "Numération décimale",
              description: "Lire, écrire, comparer les grands nombres.",
              sequences: [
                {
                  slug: "grands-nombres",
                  title: "Lire et écrire les grands nombres",
                  description: "Comprendre la valeur positionnelle jusqu'au million.",
                  status: "a-venir",
                  objectives: ["Lire et écrire les entiers jusqu'à 1 000 000"],
                  estimatedDuration: "2 séances de 50 min",
                  teacherReference: "leo",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
            {
              slug: "operations",
              label: "Opérations",
              description: "Addition, soustraction, multiplication, division.",
              sequences: [
                {
                  slug: "multiplication-posee",
                  title: "La multiplication posée",
                  description: "Multiplier par un nombre à deux chiffres.",
                  status: "a-venir",
                  objectives: ["Poser et effectuer une multiplication à deux chiffres"],
                  teacherReference: "leo",
                  characterGuide: "felix",
                  resources: [],
                },
                {
                  slug: "division-euclidienne",
                  title: "La division euclidienne",
                  description: "Comprendre et calculer quotient et reste.",
                  status: "a-venir",
                  objectives: ["Calculer une division posée avec reste"],
                  teacherReference: "leo",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
            {
              slug: "fractions",
              label: "Fractions",
              description: "Introduire les fractions simples.",
              sequences: [
                {
                  slug: "introduire-fractions",
                  title: "Comprendre les fractions simples",
                  description: "Représenter et nommer des fractions courantes.",
                  status: "a-venir",
                  objectives: ["Représenter 1/2, 1/4, 3/4 sur une droite graduée"],
                  teacherReference: "leo",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "resolution-problemes",
          label: "Résolution de problèmes",
          description: "Mobiliser les connaissances pour résoudre des situations-problèmes.",
          subdomains: [
            {
              slug: "problemes-multiplicatifs",
              label: "Problèmes multiplicatifs",
              description: "Problèmes faisant intervenir multiplication et division.",
              sequences: [
                {
                  slug: "probleme-partage",
                  title: "Résoudre un problème de partage",
                  description: "Identifier la situation et choisir l'opération.",
                  status: "a-venir",
                  objectives: ["Modéliser une situation de partage équitable"],
                  teacherReference: "leo",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "grandeurs-mesures",
          label: "Grandeurs et mesures",
          description: "Longueurs, masses, contenance, durées, aire, périmètre.",
          subdomains: [
            {
              slug: "perimetre-aire",
              label: "Périmètre et aire",
              description: "Calculer périmètre et aire de figures simples.",
              sequences: [
                {
                  slug: "calculer-perimetre",
                  title: "Calculer le périmètre d'une figure",
                  description: "Additionner les longueurs des côtés.",
                  status: "a-venir",
                  objectives: ["Calculer le périmètre de polygones simples"],
                  teacherReference: "leo",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "espace-geometrie",
          label: "Espace et géométrie",
          description: "Figures planes, solides, symétrie, coordonnées.",
          subdomains: [
            {
              slug: "figures-planes",
              label: "Figures planes",
              description: "Triangles, quadrilatères, cercle.",
              sequences: [
                {
                  slug: "tracer-triangle",
                  title: "Tracer et reconnaître les triangles",
                  description: "Identifier et construire triangle isocèle, équilatéral, rectangle.",
                  status: "a-venir",
                  objectives: ["Reconnaître et tracer les différents types de triangles"],
                  teacherReference: "leo",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "organisation-donnees",
          label: "Organisation et gestion de données",
          description: "Lire et produire des tableaux et graphiques.",
          subdomains: [
            {
              slug: "tableaux-graphiques",
              label: "Tableaux et graphiques",
              description: "Lire un tableau à double entrée et un diagramme.",
              sequences: [
                {
                  slug: "lire-tableau-double-entree",
                  title: "Lire un tableau à double entrée",
                  description: "Extraire une information d'un tableau croisé.",
                  status: "a-venir",
                  objectives: ["Lire et renseigner un tableau à double entrée"],
                  teacherReference: "leo",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
      ],
    },
    // ── Histoire-Géographie ──────────────────────────────────────────────────
    {
      slug: "histoire-geographie",
      label: "Histoire-Géographie",
      description: "Repères chronologiques, géographiques et lecture de documents.",
      domains: [
        {
          slug: "histoire",
          label: "Histoire",
          description: "La France et l'Europe du Moyen Âge à la Révolution.",
          subdomains: [
            {
              slug: "revolution-francaise",
              label: "La Révolution française",
              description: "Causes, événements majeurs et conséquences.",
              sequences: [
                {
                  slug: "causes-revolution",
                  title: "Les causes de la Révolution française",
                  description: "Comprendre le contexte social et politique de 1789.",
                  status: "a-venir",
                  objectives: ["Identifier les principales causes de la Révolution"],
                  teacherReference: "elias",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "geographie",
          label: "Géographie",
          description: "Les espaces français et européens, développement durable.",
          subdomains: [
            {
              slug: "territoires-francais",
              label: "Les territoires français",
              description: "Métropole et outre-mer, organisation du territoire.",
              sequences: [
                {
                  slug: "carte-france",
                  title: "Lire et compléter une carte de France",
                  description: "Localiser régions, fleuves, reliefs principaux.",
                  status: "a-venir",
                  objectives: ["Situer les principaux repères géographiques de France"],
                  teacherReference: "nadia",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "reperes-documents",
          label: "Repères et documents",
          description: "Frise chronologique, carte, iconographie, source.",
          subdomains: [
            {
              slug: "frise-chronologique",
              label: "La frise chronologique",
              description: "Placer des événements sur une frise.",
              sequences: [
                {
                  slug: "construire-frise",
                  title: "Construire et lire une frise chronologique",
                  description: "Situer des événements et mesurer des durées.",
                  status: "a-venir",
                  objectives: ["Placer des événements clés sur une frise chronologique"],
                  teacherReference: "elias",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
      ],
    },
    // ── Sciences et technologie ──────────────────────────────────────────────
    {
      slug: "sciences-technologie",
      label: "Sciences et technologie",
      description: "Matière, vivant, environnement, objets et systèmes techniques.",
      domains: [
        {
          slug: "matiere-energie",
          label: "Matière, mouvement, énergie, information",
          description: "Propriétés de la matière, forces, énergie et circuits simples.",
          subdomains: [
            {
              slug: "circuit-electrique",
              label: "Le circuit électrique simple",
              description: "Construire et comprendre un circuit électrique.",
              sequences: [
                {
                  slug: "construire-circuit",
                  title: "Construire un circuit électrique simple",
                  description: "Associer pile, fil conducteur et ampoule.",
                  status: "a-venir",
                  objectives: ["Réaliser un circuit électrique simple en série"],
                  teacherReference: "hector",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "vivant",
          label: "Le vivant, sa diversité et les fonctions qui le caractérisent",
          description: "Classification du vivant, nutrition, reproduction.",
          subdomains: [
            {
              slug: "classification-vivant",
              label: "Classification du vivant",
              description: "Classer les êtres vivants selon leurs caractéristiques.",
              sequences: [
                {
                  slug: "classer-etres-vivants",
                  title: "Classer les êtres vivants",
                  description: "Utiliser des critères morphologiques pour construire un classement.",
                  status: "a-venir",
                  objectives: ["Construire une clé de détermination simple"],
                  teacherReference: "melina",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "materiaux-objets",
          label: "Matériaux et objets techniques",
          description: "Propriétés des matériaux, conception d'objets.",
          subdomains: [
            {
              slug: "proprietes-materiaux",
              label: "Propriétés des matériaux",
              description: "Rigidité, conductivité, solubilité.",
              sequences: [
                {
                  slug: "tester-materiaux",
                  title: "Tester les propriétés de différents matériaux",
                  description: "Comparer rigidité et conductivité électrique de divers matériaux.",
                  status: "a-venir",
                  objectives: ["Associer un matériau à ses propriétés principales"],
                  teacherReference: "hector",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "planete-environnement",
          label: "La planète Terre, les êtres vivants dans leur environnement",
          description: "Biodiversité, développement durable, changement climatique.",
          subdomains: [
            {
              slug: "biodiversite",
              label: "Biodiversité locale",
              description: "Observer et décrire les êtres vivants du quartier ou du jardin.",
              sequences: [
                {
                  slug: "observer-biodiversite",
                  title: "Observer la biodiversité locale",
                  description: "Mener une observation de terrain et en rendre compte.",
                  status: "a-venir",
                  objectives: ["Identifier au moins cinq espèces végétales ou animales locales"],
                  teacherReference: "soa",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
      ],
    },
    // ── EMC ──────────────────────────────────────────────────────────────────
    {
      slug: "emc",
      label: "Enseignement moral et civique",
      description: "Valeurs, règles de la vie collective, citoyenneté.",
      domains: [
        {
          slug: "respecter-autrui",
          label: "Respecter autrui",
          description: "Égale dignité, non-discrimination, empathie.",
          subdomains: [
            {
              slug: "discrimination",
              label: "Comprendre et refuser la discrimination",
              description: "Identifier des situations discriminatoires et y répondre.",
              sequences: [
                {
                  slug: "identifier-discrimination",
                  title: "Identifier une situation de discrimination",
                  description: "Analyser des cas réels ou fictifs de discrimination.",
                  status: "a-venir",
                  objectives: ["Définir la discrimination et en donner des exemples"],
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "valeurs-republique",
          label: "Acquérir et partager les valeurs de la République",
          description: "Liberté, égalité, fraternité — laïcité.",
          subdomains: [
            {
              slug: "laicite",
              label: "La laïcité",
              description: "Comprendre le principe de laïcité en France.",
              sequences: [
                {
                  slug: "comprendre-laicite",
                  title: "Comprendre la laïcité",
                  description: "Définir la laïcité et ses implications à l'école.",
                  status: "a-venir",
                  objectives: ["Expliquer la laïcité avec ses propres mots"],
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "culture-civique",
          label: "Construire une culture civique",
          description: "Institutions, droits et devoirs du citoyen.",
          subdomains: [
            {
              slug: "institutions",
              label: "Les institutions françaises",
              description: "Le Président, le Parlement, la Justice.",
              sequences: [
                {
                  slug: "organigramme-institutions",
                  title: "Les grandes institutions françaises",
                  description: "Situer les pouvoirs législatif, exécutif et judiciaire.",
                  status: "a-venir",
                  objectives: ["Nommer les trois pouvoirs et leur rôle"],
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "vie-affective-numerique",
          label: "Vie affective, relationnelle et numérique",
          description: "Relations, émotions, usage responsable du numérique.",
          subdomains: [
            {
              slug: "usage-numerique",
              label: "Usage responsable du numérique",
              description: "Droits, devoirs et risques liés au numérique.",
              sequences: [
                {
                  slug: "droits-numerique",
                  title: "Mes droits et devoirs en ligne",
                  description: "Identifier les comportements responsables sur internet.",
                  status: "a-venir",
                  objectives: ["Lister trois règles d'un usage responsable d'internet"],
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
      ],
    },
    // ── Langues vivantes ─────────────────────────────────────────────────────
    {
      slug: "langues-vivantes",
      label: "Langues vivantes",
      description: "Compréhension et expression orale, lecture, repères culturels.",
      domains: [
        {
          slug: "comprendre-oral",
          label: "Comprendre à l'oral",
          description: "Identifier des mots, expressions et phrases simples.",
          subdomains: [
            {
              slug: "vocabulaire-courant",
              label: "Vocabulaire courant",
              description: "Nombres, couleurs, famille, école, animaux.",
              sequences: [
                {
                  slug: "comprendre-consignes-simples",
                  title: "Comprendre des consignes simples en anglais",
                  description: "Réagir à des ordres et questions de classe.",
                  status: "a-venir",
                  objectives: ["Comprendre et exécuter cinq consignes de classe en anglais"],
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "exprimer-oral",
          label: "S'exprimer à l'oral",
          description: "Se présenter, décrire, raconter en langue étrangère.",
          subdomains: [
            {
              slug: "se-presenter",
              label: "Se présenter",
              description: "Dire son prénom, son âge, sa nationalité.",
              sequences: [
                {
                  slug: "se-presenter-anglais",
                  title: "Se présenter en anglais",
                  description: "Produire un court discours de présentation.",
                  status: "a-venir",
                  objectives: ["Dire son nom, son âge et sa ville en anglais"],
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "lire-ecrire",
          label: "Lire et écrire des mots ou phrases simples",
          description: "Déchiffrer et écrire des mots et phrases élémentaires.",
          subdomains: [
            {
              slug: "lecture-mots",
              label: "Lecture de mots courants",
              description: "Associer graphème et phonème en langue étrangère.",
              sequences: [
                {
                  slug: "lire-mots-anglais",
                  title: "Lire des mots courants en anglais",
                  description: "Identifier la correspondance graphème-phonème pour l'anglais.",
                  status: "a-venir",
                  objectives: ["Lire à haute voix dix mots courants en anglais"],
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "reperes-culturels",
          label: "Découvrir des repères culturels",
          description: "Fêtes, traditions, personnages célèbres du pays étudié.",
          subdomains: [
            {
              slug: "fetes-traditions",
              label: "Fêtes et traditions",
              description: "Noël, Halloween, Thanksgiving, fêtes nationales.",
              sequences: [
                {
                  slug: "halloween-anglais",
                  title: "Halloween : vocabulaire et traditions",
                  description: "Découvrir le vocabulaire de Halloween en contexte culturel.",
                  status: "a-venir",
                  objectives: ["Mémoriser dix mots liés à Halloween en anglais"],
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
      ],
    },
    // ── Arts ─────────────────────────────────────────────────────────────────
    {
      slug: "arts",
      label: "Arts",
      description: "Arts plastiques, éducation musicale, histoire des arts.",
      domains: [
        {
          slug: "arts-plastiques",
          label: "Arts plastiques",
          description: "Pratique artistique bidimensionnelle et tridimensionnelle.",
          subdomains: [
            {
              slug: "representation",
              label: "Représentation",
              description: "Dessin, peinture, collage.",
              sequences: [
                {
                  slug: "autoportrait",
                  title: "Réaliser un autoportrait",
                  description: "Observer et représenter son visage.",
                  status: "a-venir",
                  objectives: ["Produire un autoportrait en intégrant proportions et expression"],
                  teacherReference: "pablo",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "education-musicale",
          label: "Éducation musicale",
          description: "Chant, écoute musicale, pratique rythmique.",
          subdomains: [
            {
              slug: "chant",
              label: "Chant choral",
              description: "Chanter en groupe, travailler la justesse et le rythme.",
              sequences: [
                {
                  slug: "apprentissage-chanson",
                  title: "Apprendre une chanson en groupe",
                  description: "Mémoriser les paroles et travailler la mise en voix.",
                  status: "a-venir",
                  objectives: ["Chanter une chanson à deux voix"],
                  teacherReference: "edgar",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "histoire-arts",
          label: "Histoire des arts",
          description: "Découverte d'œuvres majeures dans leur contexte historique.",
          subdomains: [
            {
              slug: "oeuvres-reference",
              label: "Œuvres de référence",
              description: "Étudier et situer des œuvres clés.",
              sequences: [
                {
                  slug: "analyser-oeuvre",
                  title: "Analyser une œuvre d'art",
                  description: "Observer, décrire et interpréter une œuvre.",
                  status: "a-venir",
                  objectives: ["Décrire une œuvre en utilisant le vocabulaire plastique"],
                  teacherReference: "naia",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
      ],
    },
    // ── EPS ──────────────────────────────────────────────────────────────────
    {
      slug: "eps",
      label: "EPS",
      description: "Activités physiques, sportives et artistiques.",
      domains: [
        {
          slug: "produire-performance",
          label: "Produire une performance",
          description: "Athlétisme, natation — mesurer et améliorer sa performance.",
          subdomains: [
            {
              slug: "course",
              label: "Course",
              description: "Course de vitesse et course d'endurance.",
              sequences: [
                {
                  slug: "course-endurance",
                  title: "Course d'endurance — gérer son effort",
                  description: "Courir longtemps à allure régulière.",
                  status: "a-venir",
                  objectives: ["Maintenir une allure régulière pendant 6 minutes"],
                  teacherReference: "alix",
                  characterGuide: "felix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "adapter-deplacements",
          label: "Adapter ses déplacements",
          description: "Gymnastique, escalade, danse, natation.",
          subdomains: [
            {
              slug: "gymnastique",
              label: "Gymnastique",
              description: "Rouleaux, équilibres, enchaînements.",
              sequences: [
                {
                  slug: "enchaînement-gym",
                  title: "Construire un enchaînement gymnique",
                  description: "Assembler trois éléments gymniques.",
                  status: "a-venir",
                  objectives: ["Réaliser un enchaînement de trois éléments gymniques"],
                  teacherReference: "alix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "exprimer-devant",
          label: "S'exprimer devant les autres",
          description: "Danse, arts du cirque, activités d'expression.",
          subdomains: [
            {
              slug: "danse",
              label: "Danse",
              description: "Créer et présenter une courte chorégraphie.",
              sequences: [
                {
                  slug: "creer-choregraphie",
                  title: "Créer et présenter une chorégraphie",
                  description: "Composer et exécuter une danse de groupe.",
                  status: "a-venir",
                  objectives: ["Présenter une chorégraphie de groupe de 2 minutes"],
                  teacherReference: "alix",
                  resources: [],
                },
              ],
            },
          ],
        },
        {
          slug: "conduire-affrontement",
          label: "Conduire et maîtriser un affrontement collectif ou interindividuel",
          description: "Jeux collectifs, sports de raquette, sports de combat.",
          subdomains: [
            {
              slug: "jeux-collectifs",
              label: "Jeux collectifs",
              description: "Football, handball, basketball scolaire.",
              sequences: [
                {
                  slug: "jeu-collectif-regles",
                  title: "Comprendre et respecter les règles d'un jeu collectif",
                  description: "Jouer en respectant les rôles et les règles.",
                  status: "a-venir",
                  objectives: ["Jouer en respectant les règles et les rôles défenseur/attaquant"],
                  teacherReference: "alix",
                  resources: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// ── Collège ───────────────────────────────────────────────────────────────────

const collegeSubjectsBase = [
  { slug: "francais", label: "Français", description: "Langue française, littérature, oral.", domains: [] },
  { slug: "mathematiques", label: "Mathématiques", description: "Algèbre, géométrie, statistiques.", domains: [] },
  { slug: "histoire-geographie-emc", label: "Histoire-Géographie-EMC", description: "Histoire, géographie, éducation morale et civique.", domains: [] },
  { slug: "svt", label: "SVT", description: "Sciences de la vie et de la Terre.", domains: [] },
  { slug: "physique-chimie", label: "Physique-Chimie", description: "Physique, chimie, démarche expérimentale.", domains: [] },
  { slug: "technologie", label: "Technologie", description: "Conception, programmation, objets techniques.", domains: [] },
  { slug: "langues-vivantes", label: "Langues vivantes", description: "LV1 et LV2.", domains: [] },
  { slug: "arts-plastiques", label: "Arts plastiques", description: "Pratique artistique et histoire de l'art.", domains: [] },
  { slug: "education-musicale", label: "Éducation musicale", description: "Pratique vocale et instrumentale, écoute.", domains: [] },
  { slug: "eps", label: "EPS", description: "Activités physiques, sportives et artistiques.", domains: [] },
];

const sixieme: AcademyLevel = {
  slug: "6e",
  label: "6e",
  cycle: "cycle-3",
  stage: "college",
  description: "Entrée au collège. Consolidation du cycle 3 et ouverture disciplinaire.",
  subjects: [
    ...collegeSubjectsBase.slice(0, 3),
    { slug: "sciences-technologie", label: "Sciences et technologie", description: "Sciences expérimentales et technologie en cycle 3.", domains: [] },
    ...collegeSubjectsBase.slice(3),
  ],
};

const cinquieme: AcademyLevel = {
  slug: "5e",
  label: "5e",
  cycle: "cycle-4",
  stage: "college",
  description: "Début du cycle 4. Approfondissement disciplinaire.",
  subjects: collegeSubjectsBase,
};

const quatrieme: AcademyLevel = {
  slug: "4e",
  label: "4e",
  cycle: "cycle-4",
  stage: "college",
  description: "Milieu du cycle 4. Montée en complexité.",
  subjects: collegeSubjectsBase,
};

const troisieme: AcademyLevel = {
  slug: "3e",
  label: "3e",
  cycle: "cycle-4",
  stage: "college",
  description: "Fin du cycle 4. Préparation au Brevet.",
  subjects: collegeSubjectsBase,
};

// ── Lycée ─────────────────────────────────────────────────────────────────────

const lyceeSubjectsBase = [
  { slug: "francais", label: "Français", description: "Humanités littéraires, rhétorique, EAF.", domains: [] },
  { slug: "mathematiques", label: "Mathématiques", description: "Analyse, algèbre, probabilités.", domains: [] },
  { slug: "histoire-geographie", label: "Histoire-Géographie", description: "Grands repères mondiaux contemporains.", domains: [] },
  { slug: "emc", label: "EMC", description: "Éducation morale et civique.", domains: [] },
  { slug: "langues-vivantes", label: "Langues vivantes", description: "LV1 et LV2 approfondies.", domains: [] },
  { slug: "enseignement-scientifique", label: "Enseignement scientifique", description: "Sciences pluridisciplinaires obligatoires.", domains: [] },
  { slug: "specialites", label: "Spécialités", description: "Parcours personnalisé selon les choix de l'élève.", domains: [] },
];

const seconde: AcademyLevel = {
  slug: "seconde",
  label: "Seconde",
  cycle: "lycee",
  stage: "lycee",
  description: "Année de détermination. Tronc commun et exploration des spécialités.",
  subjects: lyceeSubjectsBase,
};

const premiere: AcademyLevel = {
  slug: "premiere",
  label: "Première",
  cycle: "lycee",
  stage: "lycee",
  description: "Spécialités confirmées. Épreuve anticipée de Français.",
  subjects: lyceeSubjectsBase,
};

const terminale: AcademyLevel = {
  slug: "terminale",
  label: "Terminale",
  cycle: "lycee",
  stage: "lycee",
  description: "Baccalauréat. Philosophie obligatoire.",
  subjects: [
    ...lyceeSubjectsBase,
    { slug: "philosophie", label: "Philosophie", description: "Dissertation et explication de texte philosophique.", domains: [] },
  ],
};

// ── Curriculum global ─────────────────────────────────────────────────────────

export const academyCurriculum: Record<AcademySchoolStage, AcademyLevel[]> = {
  maternelle: [ps, ms, gs],
  elementaire: [cp, ce1, ce2, cm1, cm2],
  college: [sixieme, cinquieme, quatrieme, troisieme],
  lycee: [seconde, premiere, terminale],
};

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getAcademyLevelBySlug(
  stage: AcademySchoolStage,
  levelSlug: string,
): AcademyLevel | undefined {
  return academyCurriculum[stage].find((l) => l.slug === levelSlug);
}

export function getAcademyLevelBySlugOnly(levelSlug: string): AcademyLevel | undefined {
  for (const levels of Object.values(academyCurriculum)) {
    const found = levels.find((l) => l.slug === levelSlug);
    if (found) return found;
  }
  return undefined;
}

export function getCurriculumSubject(
  level: AcademyLevel,
  subjectSlug: string,
) {
  return level.subjects.find((s) => s.slug === subjectSlug);
}
