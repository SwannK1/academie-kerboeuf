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
      domains: [
        {
          slug: "langage-oral",
          label: "Langage oral",
          description: "Écouter, comprendre, s'exprimer à l'oral.",
          subdomains: [
            { slug: "comprendre-communiquer", label: "Comprendre et communiquer", description: "Participer à des échanges, répondre aux questions.", sequences: [] },
            { slug: "vocabulaire", label: "Vocabulaire", description: "Enrichir son vocabulaire en contexte.", sequences: [] },
          ],
        },
        {
          slug: "langage-ecrit",
          label: "Langage écrit",
          description: "Découvrir l'écrit, principe alphabétique.",
          subdomains: [
            { slug: "decouvrir-ecrit", label: "Découvrir l'écrit", description: "Distinguer dessin, écriture, alphabet.", sequences: [] },
            { slug: "principe-alphabetique", label: "Principe alphabétique", description: "Comprendre que l'écrit code des sons.", sequences: [] },
          ],
        },
      ] as AcademyDomain[],
    },
    {
      slug: "activite-physique",
      label: "Agir, s'exprimer, comprendre à travers l'activité physique",
      description: "Motricité globale, jeux collectifs, expression corporelle.",
      domains: [
        {
          slug: "motricite-globale",
          label: "Motricité globale",
          description: "Courir, sauter, lancer, grimper.",
          subdomains: [
            { slug: "locomotion", label: "Locomotion", description: "Maîtriser ses déplacements.", sequences: [] },
          ],
        },
        {
          slug: "jeux-collectifs",
          label: "Jeux collectifs",
          description: "Coopérer, respecter des règles simples.",
          subdomains: [
            { slug: "regles-jeu", label: "Règles du jeu", description: "Comprendre et respecter les règles.", sequences: [] },
          ],
        },
      ] as AcademyDomain[],
    },
    {
      slug: "activites-artistiques",
      label: "Agir, s'exprimer, comprendre à travers les activités artistiques",
      description: "Arts plastiques, musique, arts vivants.",
      domains: [
        {
          slug: "arts-plastiques",
          label: "Arts plastiques",
          description: "Dessiner, peindre, modeler, coller.",
          subdomains: [
            { slug: "pratique-plastique", label: "Pratique plastique", description: "Produire des images et des objets.", sequences: [] },
          ],
        },
        {
          slug: "education-musicale",
          label: "Éducation musicale",
          description: "Chanter, écouter, percuter.",
          subdomains: [
            { slug: "chant-rythme", label: "Chant et rythme", description: "Chanter en groupe et marquer le rythme.", sequences: [] },
          ],
        },
      ] as AcademyDomain[],
    },
    {
      slug: "structurer-pensee",
      label: "Construire les premiers outils pour structurer sa pensée",
      description: "Nombres, formes, grandeurs, résolution de problèmes simples.",
      domains: [
        {
          slug: "nombres",
          label: "Nombres",
          description: "Compter, dénombrer, comparer des quantités.",
          subdomains: [
            { slug: "denombrement", label: "Dénombrement", description: "Associer un nombre à une quantité.", sequences: [] },
            { slug: "comparaison-rangement", label: "Comparaison et rangement", description: "Ordonner des nombres et des quantités.", sequences: [] },
          ],
        },
        {
          slug: "formes-grandeurs",
          label: "Formes et grandeurs",
          description: "Identifier et comparer des formes géométriques simples.",
          subdomains: [
            { slug: "formes", label: "Formes", description: "Reconnaître cercle, carré, triangle, rectangle.", sequences: [] },
          ],
        },
      ] as AcademyDomain[],
    },
    {
      slug: "explorer-monde",
      label: "Explorer le monde",
      description: "Espace, temps, vivant, matière, objets.",
      domains: [
        {
          slug: "espace-temps",
          label: "Espace et temps",
          description: "Se repérer dans l'espace de la classe et dans la journée.",
          subdomains: [
            { slug: "reperes-temporels", label: "Repères temporels", description: "Avant/après, hier/aujourd'hui/demain.", sequences: [] },
            { slug: "reperes-spatiaux", label: "Repères spatiaux", description: "Dessus/dessous, devant/derrière, gauche/droite.", sequences: [] },
          ],
        },
        {
          slug: "vivant-matiere",
          label: "Le vivant et la matière",
          description: "Observer le vivant et les propriétés de la matière.",
          subdomains: [
            { slug: "observer-vivant", label: "Observer le vivant", description: "Distinguer les êtres vivants.", sequences: [] },
            { slug: "matiere-objets", label: "Matière et objets", description: "Explorer les propriétés des matières.", sequences: [] },
          ],
        },
      ] as AcademyDomain[],
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

// ── Élémentaire — blocs de matières réutilisables ────────────────────────────
// Domaines alignés sur curriculum-map.ts (cp/ce1/ce2/cm1-curriculum.ts).
// sequences: [] — pas de doublon avec curriculum-map, le modèle global est
// une couche de référence, pas de contenu pédagogique complet.

const francaisCycle2: AcademyDomain[] = [
  {
    slug: "lecture",
    label: "Lecture",
    description: "Décodage, compréhension de phrases et de textes.",
    subdomains: [
      { slug: "lecture-comprehension", label: "Lecture et compréhension", description: "Comprendre des phrases et des textes courts.", sequences: [] },
      { slug: "decodage", label: "Décodage et identification des mots", description: "Maîtriser le principe alphabétique.", sequences: [] },
    ],
  },
  {
    slug: "ecriture",
    label: "Écriture",
    description: "Encodage et production de phrases.",
    subdomains: [
      { slug: "encodage-production", label: "Encodage et production de phrases", description: "Écrire des phrases simples correctement.", sequences: [] },
    ],
  },
  {
    slug: "etude-de-la-langue",
    label: "Étude de la langue",
    description: "Grammaire, orthographe, vocabulaire.",
    subdomains: [
      { slug: "grammaire-phrase", label: "Grammaire de la phrase", description: "Identifier sujet, verbe, groupes de mots.", sequences: [] },
    ],
  },
  {
    slug: "oral",
    label: "Oral",
    description: "Écoute active et expression orale.",
    subdomains: [
      { slug: "ecoute-expression", label: "Écoute et expression", description: "Participer à des échanges, écouter l'autre.", sequences: [] },
    ],
  },
];

const mathematiquesCycle2: AcademyDomain[] = [
  {
    slug: "nombres-calcul",
    label: "Nombres et calcul",
    description: "Numération, calcul posé et calcul mental.",
    subdomains: [
      { slug: "numeration", label: "Numération", description: "Lire, écrire, comparer les entiers.", sequences: [] },
      { slug: "calcul", label: "Calcul", description: "Addition, soustraction, multiplication.", sequences: [] },
      { slug: "problemes", label: "Résolution de problèmes", description: "Choisir l'opération et vérifier le résultat.", sequences: [] },
    ],
  },
  {
    slug: "grandeurs-mesures",
    label: "Grandeurs et mesures",
    description: "Longueurs, masses, durées.",
    subdomains: [
      { slug: "longueurs", label: "Longueurs", description: "Mesurer et comparer des longueurs.", sequences: [] },
      { slug: "temps", label: "Temps", description: "Lire l'heure, calculer des durées.", sequences: [] },
    ],
  },
  {
    slug: "geometrie",
    label: "Géométrie",
    description: "Figures planes et repérage dans l'espace.",
    subdomains: [
      { slug: "figures-espace", label: "Figures planes et espace", description: "Reconnaître et tracer des figures simples.", sequences: [] },
    ],
  },
];

const questionnerMonde: AcademyDomain[] = [
  {
    slug: "vivant-environnement",
    label: "Le vivant et son environnement",
    description: "Observer le vivant, comprendre les milieux naturels.",
    subdomains: [
      { slug: "observer-vivant", label: "Observer le vivant", description: "Caractériser les êtres vivants.", sequences: [] },
    ],
  },
  {
    slug: "matiere-objets",
    label: "Matière, objets et techniques",
    description: "Propriétés de la matière et objets du quotidien.",
    subdomains: [
      { slug: "objets-techniques", label: "Objets techniques", description: "Identifier la fonction et les usages d'un objet.", sequences: [] },
    ],
  },
  {
    slug: "espace-temps",
    label: "Espace et temps",
    description: "Se repérer dans le temps et dans l'espace.",
    subdomains: [
      { slug: "reperes-temporels", label: "Repères temporels", description: "Utiliser une frise chronologique simple.", sequences: [] },
      { slug: "reperes-spatiaux", label: "Repères spatiaux", description: "Lire un plan simple, s'orienter.", sequences: [] },
    ],
  },
];

// ── Domaines partagés — élémentaire (Cycle 2 & 3 hors CM2) ──────────────────

const emcCycle2: AcademyDomain[] = [
  {
    slug: "respecter-autrui",
    label: "Respecter autrui",
    description: "Égale dignité, différences, empathie.",
    subdomains: [
      { slug: "vie-collective", label: "Vie collective", description: "Règles de la classe et de l'école.", sequences: [] },
      { slug: "empathie-solidarite", label: "Empathie et solidarité", description: "Se mettre à la place de l'autre, aider.", sequences: [] },
    ],
  },
  {
    slug: "valeurs-republique",
    label: "Valeurs de la République",
    description: "Liberté, égalité, fraternité — premières notions.",
    subdomains: [
      { slug: "regles-vie", label: "Règles de vie commune", description: "Comprendre pourquoi les règles existent.", sequences: [] },
    ],
  },
];

const emcCycle3Elem: AcademyDomain[] = [
  {
    slug: "respecter-autrui",
    label: "Respecter autrui",
    description: "Égale dignité, non-discrimination, empathie.",
    subdomains: [
      { slug: "discrimination", label: "Comprendre la discrimination", description: "Identifier et refuser la discrimination.", sequences: [] },
      { slug: "empathie", label: "Empathie", description: "Développer la sensibilité à autrui.", sequences: [] },
    ],
  },
  {
    slug: "valeurs-republique",
    label: "Valeurs de la République",
    description: "Liberté, égalité, fraternité — laïcité.",
    subdomains: [
      { slug: "laicite", label: "La laïcité", description: "Comprendre la laïcité à l'école et dans la société.", sequences: [] },
    ],
  },
  {
    slug: "culture-civique",
    label: "Culture civique",
    description: "Institutions, droits et devoirs du citoyen.",
    subdomains: [
      { slug: "institutions", label: "Les institutions", description: "Rôle de la mairie, du département, de l'État.", sequences: [] },
    ],
  },
];

const languesVivantesElem: AcademyDomain[] = [
  {
    slug: "comprendre-oral",
    label: "Comprendre à l'oral",
    description: "Identifier mots, expressions et phrases simples.",
    subdomains: [
      { slug: "vocabulaire-courant", label: "Vocabulaire courant", description: "Nombres, couleurs, animaux, famille, école.", sequences: [] },
      { slug: "consignes", label: "Consignes de classe", description: "Comprendre et exécuter des consignes simples.", sequences: [] },
    ],
  },
  {
    slug: "exprimer-oral",
    label: "S'exprimer à l'oral",
    description: "Se présenter, nommer, décrire en langue étrangère.",
    subdomains: [
      { slug: "se-presenter", label: "Se présenter", description: "Dire son prénom, son âge, sa ville.", sequences: [] },
    ],
  },
  {
    slug: "lire-ecrire",
    label: "Lire et écrire",
    description: "Déchiffrer et écrire des mots et phrases élémentaires.",
    subdomains: [
      { slug: "mots-courants", label: "Mots courants", description: "Lire et écrire le vocabulaire usuel.", sequences: [] },
    ],
  },
  {
    slug: "reperes-culturels",
    label: "Repères culturels",
    description: "Fêtes, traditions et personnages du pays étudié.",
    subdomains: [
      { slug: "fetes-traditions", label: "Fêtes et traditions", description: "Noël, Halloween, Thanksgiving, fêtes nationales.", sequences: [] },
    ],
  },
];

const artsPlastiquesElem: AcademyDomain[] = [
  {
    slug: "experimentation",
    label: "Expérimenter et produire",
    description: "Dessiner, peindre, modeler, coller.",
    subdomains: [
      { slug: "pratique-plastique", label: "Pratique plastique", description: "Produire des images et des objets.", sequences: [] },
      { slug: "outils-materiaux", label: "Outils et matériaux", description: "Explorer les propriétés des matériaux artistiques.", sequences: [] },
    ],
  },
  {
    slug: "culture-artistique",
    label: "Culture artistique",
    description: "Découvrir et comparer des œuvres.",
    subdomains: [
      { slug: "regarder-decrire", label: "Regarder et décrire", description: "Observer et décrire une œuvre d'art.", sequences: [] },
    ],
  },
];

const educationMusicaleElem: AcademyDomain[] = [
  {
    slug: "chant",
    label: "Chant choral",
    description: "Chanter en groupe, justesse, rythme.",
    subdomains: [
      { slug: "chant-groupe", label: "Chanter en groupe", description: "Pratiquer le chant collectif à l'unisson.", sequences: [] },
    ],
  },
  {
    slug: "ecoute",
    label: "Écoute musicale",
    description: "Percevoir, décrire et comparer la musique.",
    subdomains: [
      { slug: "percevoir-decrire", label: "Percevoir et décrire", description: "Identifier styles, instruments et caractères.", sequences: [] },
    ],
  },
];

const epsElem: AcademyDomain[] = [
  {
    slug: "produire-performance",
    label: "Produire une performance",
    description: "Athlétisme, natation — mesurer et améliorer sa performance.",
    subdomains: [
      { slug: "course", label: "Course", description: "Vitesse et endurance.", sequences: [] },
      { slug: "lancer-saut", label: "Lancer et saut", description: "Techniques d'athlétisme.", sequences: [] },
    ],
  },
  {
    slug: "adapter-deplacements",
    label: "Adapter ses déplacements",
    description: "Gym, danse, activités de pleine nature.",
    subdomains: [
      { slug: "motricite", label: "Motricité variée", description: "Maîtriser ses déplacements dans des espaces variés.", sequences: [] },
    ],
  },
  {
    slug: "jeux-collectifs",
    label: "Jeux collectifs",
    description: "Coopérer, respecter les règles, s'organiser.",
    subdomains: [
      { slug: "regles-roles", label: "Règles et rôles", description: "Jouer en équipe en respectant les règles.", sequences: [] },
    ],
  },
];

const domainsElemMap: Record<string, AcademyDomain[]> = {
  "langues-vivantes": languesVivantesElem,
  "arts-plastiques": artsPlastiquesElem,
  "education-musicale": educationMusicaleElem,
  "eps": epsElem,
};

const subjectsMuets = (slugs: string[]): Array<{ slug: string; label: string; description: string; domains: AcademyDomain[] }> =>
  slugs.map((s) => ({
    slug: s,
    label: s === "emc" ? "Enseignement moral et civique"
      : s === "langues-vivantes" ? "Langues vivantes"
      : s === "arts-plastiques" ? "Arts plastiques"
      : s === "education-musicale" ? "Éducation musicale"
      : "EPS",
    description: s === "emc" ? "Valeurs républicaines, vie collective, citoyenneté."
      : s === "langues-vivantes" ? "Anglais et autre langue vivante."
      : s === "arts-plastiques" ? "Pratique artistique, culture artistique."
      : s === "education-musicale" ? "Chant, écoute, pratique instrumentale."
      : "Activités physiques, sportives et artistiques.",
    domains: domainsElemMap[s] ?? [] as AcademyDomain[],
  }));

const cp: AcademyLevel = {
  slug: "cp",
  label: "CP",
  cycle: "cycle-2",
  stage: "elementaire",
  description: "Apprentissage fondamental de la lecture et du calcul.",
  subjects: [
    { slug: "francais", label: "Français", description: "Lecture, écriture, étude de la langue, oral.", domains: francaisCycle2 },
    { slug: "mathematiques", label: "Mathématiques", description: "Nombres, calcul, géométrie, grandeurs et mesures.", domains: mathematiquesCycle2 },
    { slug: "emc", label: "Enseignement moral et civique", description: "Valeurs républicaines, vie collective, citoyenneté.", domains: emcCycle2 },
    { slug: "questionner-monde", label: "Questionner le monde", description: "Espace, temps, matière, vivant, objets techniques.", domains: questionnerMonde },
    ...subjectsMuets(["langues-vivantes", "arts-plastiques", "education-musicale", "eps"]),
  ],
};

const ce1: AcademyLevel = {
  slug: "ce1",
  label: "CE1",
  cycle: "cycle-2",
  stage: "elementaire",
  description: "Consolidation de la lecture et entrée dans la numération.",
  subjects: [
    { slug: "francais", label: "Français", description: "Lecture, écriture, étude de la langue, oral.", domains: francaisCycle2 },
    { slug: "mathematiques", label: "Mathématiques", description: "Nombres, calcul, géométrie, grandeurs et mesures.", domains: mathematiquesCycle2 },
    { slug: "emc", label: "Enseignement moral et civique", description: "Valeurs républicaines, vie collective, citoyenneté.", domains: emcCycle2 },
    { slug: "questionner-monde", label: "Questionner le monde", description: "Espace, temps, matière, vivant, objets techniques.", domains: questionnerMonde },
    ...subjectsMuets(["langues-vivantes", "arts-plastiques", "education-musicale", "eps"]),
  ],
};

const ce2: AcademyLevel = {
  slug: "ce2",
  label: "CE2",
  cycle: "cycle-2",
  stage: "elementaire",
  description: "Fin du cycle 2. Maîtrise de la lecture courante et des opérations.",
  subjects: [
    { slug: "francais", label: "Français", description: "Lecture, écriture, étude de la langue, oral.", domains: francaisCycle2 },
    { slug: "mathematiques", label: "Mathématiques", description: "Nombres, calcul, géométrie, grandeurs et mesures.", domains: mathematiquesCycle2 },
    { slug: "emc", label: "Enseignement moral et civique", description: "Valeurs républicaines, vie collective, citoyenneté.", domains: emcCycle2 },
    { slug: "questionner-monde", label: "Questionner le monde", description: "Espace, temps, matière, vivant, objets techniques.", domains: questionnerMonde },
    ...subjectsMuets(["langues-vivantes", "arts-plastiques", "education-musicale", "eps"]),
  ],
};

const francaisCycle3Base: AcademyDomain[] = [
  {
    slug: "lecture",
    label: "Lecture",
    description: "Lecture de textes variés, littéraires et documentaires.",
    subdomains: [
      { slug: "lecture-comprehension", label: "Lecture et compréhension", description: "Comprendre et interpréter des textes complexes.", sequences: [] },
    ],
  },
  {
    slug: "ecriture",
    label: "Écriture",
    description: "Production de textes structurés et cohérents.",
    subdomains: [
      { slug: "ecriture", label: "Écriture", description: "Rédiger des textes narratifs, descriptifs et fonctionnels.", sequences: [] },
    ],
  },
  {
    slug: "etude-de-la-langue",
    label: "Étude de la langue",
    description: "Grammaire, conjugaison, orthographe.",
    subdomains: [
      { slug: "grammaire", label: "Grammaire", description: "Fonctions syntaxiques et analyse de la phrase.", sequences: [] },
      { slug: "conjugaison", label: "Conjugaison", description: "Les temps usuels du récit et de l'énonciation.", sequences: [] },
      { slug: "orthographe", label: "Orthographe", description: "Accords et règles orthographiques.", sequences: [] },
    ],
  },
  {
    slug: "oral",
    label: "Oral",
    description: "Exposé, débat, écoute active.",
    subdomains: [
      { slug: "langage-oral", label: "Langage oral", description: "Prendre la parole de façon organisée.", sequences: [] },
    ],
  },
];

const mathematiquesCycle3Base: AcademyDomain[] = [
  {
    slug: "nombres-calculs",
    label: "Nombres et calculs",
    description: "Grands nombres, fractions, opérations.",
    subdomains: [
      { slug: "numeration", label: "Numération", description: "Grands entiers et premiers décimaux.", sequences: [] },
      { slug: "calcul-pose", label: "Calcul posé", description: "Les quatre opérations posées.", sequences: [] },
      { slug: "problemes", label: "Résolution de problèmes", description: "Problèmes à une ou plusieurs étapes.", sequences: [] },
    ],
  },
  {
    slug: "grandeurs-mesures",
    label: "Grandeurs et mesures",
    description: "Longueurs, masses, durées, aires.",
    subdomains: [
      { slug: "grandeurs-mesures", label: "Mesures", description: "Calculer et convertir des mesures.", sequences: [] },
    ],
  },
  {
    slug: "geometrie",
    label: "Géométrie",
    description: "Figures planes, solides, symétrie.",
    subdomains: [
      { slug: "geometrie", label: "Figures et espace", description: "Tracer et reconnaître des figures géométriques.", sequences: [] },
    ],
  },
];

const cm1: AcademyLevel = {
  slug: "cm1",
  label: "CM1",
  cycle: "cycle-3",
  stage: "elementaire",
  description: "Début du cycle 3. Approfondissement et ouverture disciplinaire.",
  subjects: [
    { slug: "francais", label: "Français", description: "Lecture, écriture, étude de la langue, oral.", domains: francaisCycle3Base },
    { slug: "mathematiques", label: "Mathématiques", description: "Nombres, calcul, géométrie, grandeurs et mesures.", domains: mathematiquesCycle3Base },
    { slug: "emc", label: "Enseignement moral et civique", description: "Valeurs républicaines, vie collective, citoyenneté.", domains: emcCycle3Elem },
    {
      slug: "histoire-geographie",
      label: "Histoire-Géographie",
      description: "Repères chronologiques et géographiques de la France et du monde.",
      domains: [
        {
          slug: "histoire",
          label: "Histoire",
          description: "La France de l'Antiquité au XVIIIe siècle.",
          subdomains: [
            { slug: "antiquite", label: "L'Antiquité", description: "Grèce, Rome et les grandes civilisations.", sequences: [] },
          ],
        },
        {
          slug: "geographie",
          label: "Géographie",
          description: "La France et l'Europe : territoires et paysages.",
          subdomains: [
            { slug: "geographie", label: "Territoires", description: "Lire des cartes, identifier des paysages.", sequences: [] },
          ],
        },
      ],
    },
    {
      slug: "sciences-technologie",
      label: "Sciences et technologie",
      description: "Matière, vivant, environnement, objets techniques.",
      domains: [
        {
          slug: "vivant",
          label: "Le vivant",
          description: "Classification, nutrition, reproduction.",
          subdomains: [
            { slug: "vivant", label: "Le vivant", description: "Caractéristiques des êtres vivants.", sequences: [] },
          ],
        },
        {
          slug: "matiere-energie",
          label: "Matière et énergie",
          description: "États de la matière, mélanges, circuits simples.",
          subdomains: [
            { slug: "matiere", label: "Matière", description: "Propriétés et transformations de la matière.", sequences: [] },
          ],
        },
      ],
    },
    ...subjectsMuets(["langues-vivantes", "arts-plastiques", "education-musicale", "eps"]),
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

const francaisCollege: AcademyDomain[] = [
  {
    slug: "lecture-litterature",
    label: "Lecture et littérature",
    description: "Textes littéraires variés, œuvres intégrales.",
    subdomains: [
      { slug: "comprendre-interpreter", label: "Comprendre et interpréter", description: "Lire et analyser des textes littéraires.", sequences: [] },
      { slug: "histoire-litteraire", label: "Histoire littéraire", description: "Situer les textes dans leur contexte culturel.", sequences: [] },
    ],
  },
  {
    slug: "ecriture",
    label: "Écriture",
    description: "Textes narratifs, descriptifs, argumentatifs.",
    subdomains: [
      { slug: "ecriture-creative", label: "Écriture créative", description: "Imiter, détourner, inventer.", sequences: [] },
      { slug: "ecriture-argumentative", label: "Écriture argumentative", description: "Rédiger une argumentation simple.", sequences: [] },
    ],
  },
  {
    slug: "etude-de-la-langue",
    label: "Étude de la langue",
    description: "Grammaire, lexique, orthographe.",
    subdomains: [
      { slug: "grammaire", label: "Grammaire", description: "Analyse syntaxique et fonctions.", sequences: [] },
      { slug: "lexique", label: "Lexique", description: "Formation des mots, sens, registres.", sequences: [] },
    ],
  },
  {
    slug: "oral",
    label: "Oral",
    description: "Exposé, débat, lecture à voix haute.",
    subdomains: [
      { slug: "prise-de-parole", label: "Prise de parole", description: "S'exprimer avec clarté devant un auditoire.", sequences: [] },
    ],
  },
];

const mathematiquesCollege: AcademyDomain[] = [
  {
    slug: "nombres-calcul",
    label: "Nombres et calcul",
    description: "Entiers, rationnels, réels, calcul littéral.",
    subdomains: [
      { slug: "calcul-numerique", label: "Calcul numérique", description: "Opérations sur les différents types de nombres.", sequences: [] },
      { slug: "calcul-litteral", label: "Calcul littéral", description: "Développer, factoriser, résoudre des équations.", sequences: [] },
    ],
  },
  {
    slug: "geometrie",
    label: "Géométrie",
    description: "Figures planes, solides, transformations.",
    subdomains: [
      { slug: "figures-transformations", label: "Figures et transformations", description: "Propriétés des figures et transformations géométriques.", sequences: [] },
      { slug: "theoremes", label: "Théorèmes", description: "Pythagore, Thalès, trigonométrie.", sequences: [] },
    ],
  },
  {
    slug: "fonctions-statistiques",
    label: "Fonctions et statistiques",
    description: "Introduction aux fonctions, données statistiques.",
    subdomains: [
      { slug: "fonctions", label: "Fonctions", description: "Notion de fonction, représentation graphique.", sequences: [] },
      { slug: "statistiques-probabilites", label: "Statistiques et probabilités", description: "Analyser des données et calculer des fréquences.", sequences: [] },
    ],
  },
];

const histoireGeographieCollege: AcademyDomain[] = [
  {
    slug: "histoire",
    label: "Histoire",
    description: "De l'Antiquité au monde contemporain.",
    subdomains: [
      { slug: "monde-antique", label: "Le monde antique", description: "Grèce, Rome, Moyen-Orient ancien.", sequences: [] },
      { slug: "epoque-moderne-contemporaine", label: "Époque moderne et contemporaine", description: "Révolutions, guerres mondiales, décolonisation.", sequences: [] },
    ],
  },
  {
    slug: "geographie",
    label: "Géographie",
    description: "Espaces, territoires, développement durable.",
    subdomains: [
      { slug: "territoires-mondialisation", label: "Territoires et mondialisation", description: "Flux, métropoles, inégalités mondiales.", sequences: [] },
      { slug: "developpement-durable", label: "Développement durable", description: "Ressources, risques, environnement.", sequences: [] },
    ],
  },
  {
    slug: "emc",
    label: "EMC",
    description: "Droits, devoirs, citoyenneté.",
    subdomains: [
      { slug: "citoyennete", label: "Citoyenneté", description: "Droits de l'homme, institutions, démocratie.", sequences: [] },
    ],
  },
];

// ── Domaines partagés — collège ───────────────────────────────────────────────

const sciencesTechnoCollege6e: AcademyDomain[] = [
  {
    slug: "vivant",
    label: "Le vivant",
    description: "Cellule, biodiversité, nutrition, reproduction.",
    subdomains: [
      { slug: "biodiversite", label: "Biodiversité", description: "Observer et classer la diversité du vivant.", sequences: [] },
    ],
  },
  {
    slug: "matiere-energie",
    label: "Matière et énergie",
    description: "Mélanges, états de la matière, propriétés.",
    subdomains: [
      { slug: "melanges", label: "Mélanges et solutions", description: "Comprendre les mélanges homogènes et hétérogènes.", sequences: [] },
    ],
  },
  {
    slug: "technologie",
    label: "Technologie",
    description: "Objets techniques, systèmes simples, initiation au code.",
    subdomains: [
      { slug: "systemes-simples", label: "Systèmes techniques simples", description: "Identifier la fonction d'un objet technique.", sequences: [] },
      { slug: "algorithmique", label: "Algorithmique", description: "Écrire et exécuter des algorithmes simples.", sequences: [] },
    ],
  },
];

const languesVivantesCollege: AcademyDomain[] = [
  {
    slug: "comprendre",
    label: "Comprendre",
    description: "Compréhension écrite et orale en LV1 et LV2.",
    subdomains: [
      { slug: "comprehension-orale", label: "Compréhension orale", description: "Identifier le sens global d'un document sonore.", sequences: [] },
      { slug: "comprehension-ecrite", label: "Compréhension écrite", description: "Lire et comprendre des textes courants.", sequences: [] },
    ],
  },
  {
    slug: "s-exprimer",
    label: "S'exprimer et interagir",
    description: "Expression orale et écrite en LV1 et LV2.",
    subdomains: [
      { slug: "expression-orale", label: "Expression orale", description: "Présenter, raconter, débattre en langue étrangère.", sequences: [] },
      { slug: "expression-ecrite", label: "Expression écrite", description: "Rédiger des textes variés en langue étrangère.", sequences: [] },
    ],
  },
  {
    slug: "reperes-culturels",
    label: "Repères culturels et linguistiques",
    description: "Civilisation, culture et faits de langue.",
    subdomains: [
      { slug: "civilisation", label: "Civilisation", description: "Découvrir la culture et la société du pays étudié.", sequences: [] },
    ],
  },
];

const artsPlastiquesCollege: AcademyDomain[] = [
  {
    slug: "experimentation-production",
    label: "Expérimenter, produire, créer",
    description: "Pratiques bidimensionnelles et tridimensionnelles.",
    subdomains: [
      { slug: "pratiques-plastiques", label: "Pratiques plastiques", description: "Maîtriser divers outils et techniques.", sequences: [] },
      { slug: "demarche-projet", label: "Démarche de projet", description: "Concevoir et réaliser une œuvre.", sequences: [] },
    ],
  },
  {
    slug: "mettre-en-relation",
    label: "Mettre en relation",
    description: "Analyse d'œuvres et contextualisation culturelle.",
    subdomains: [
      { slug: "analyse-oeuvres", label: "Analyse d'œuvres", description: "Observer, décrire et interpréter des œuvres d'art.", sequences: [] },
    ],
  },
];

const educationMusicaleCollege: AcademyDomain[] = [
  {
    slug: "chanter-ecouter",
    label: "Chanter et écouter",
    description: "Pratique vocale, écoute active, analyse musicale.",
    subdomains: [
      { slug: "chant-choral", label: "Chant choral", description: "Interpréter des œuvres à une ou plusieurs voix.", sequences: [] },
      { slug: "ecoute-active", label: "Écoute active", description: "Identifier style, forme, instrumentation.", sequences: [] },
    ],
  },
  {
    slug: "culture-musicale",
    label: "Culture musicale",
    description: "Histoire de la musique et repères culturels.",
    subdomains: [
      { slug: "histoire-musique", label: "Histoire de la musique", description: "Situer des œuvres dans leur contexte historique.", sequences: [] },
    ],
  },
];

const epsCollege: AcademyDomain[] = [
  {
    slug: "produire-performance",
    label: "Produire une performance",
    description: "Athlétisme, natation — mesurer et améliorer sa performance.",
    subdomains: [
      { slug: "course", label: "Course", description: "Vitesse, haies, relais, endurance.", sequences: [] },
      { slug: "lancer-saut", label: "Lancer et saut", description: "Techniques d'athlétisme.", sequences: [] },
    ],
  },
  {
    slug: "adapter-deplacements",
    label: "Adapter ses déplacements",
    description: "Gym, danse, escalade, natation.",
    subdomains: [
      { slug: "motricite-variee", label: "Motricité variée", description: "Maîtriser ses déplacements dans des milieux variés.", sequences: [] },
    ],
  },
  {
    slug: "s-exprimer",
    label: "S'exprimer devant les autres",
    description: "Danse, arts du cirque, acrosport.",
    subdomains: [
      { slug: "activites-expression", label: "Activités d'expression", description: "Créer et présenter une production collective.", sequences: [] },
    ],
  },
  {
    slug: "conduire-affrontement",
    label: "Conduire et maîtriser un affrontement",
    description: "Sports collectifs, sports de raquette, sports de combat.",
    subdomains: [
      { slug: "sports-collectifs", label: "Sports collectifs", description: "Coopérer et s'opposer collectivement.", sequences: [] },
    ],
  },
];

function buildCollegeSubjects(cycle: "3" | "4"): Array<{ slug: string; label: string; description: string; domains: AcademyDomain[] }> {
  return [
    { slug: "francais", label: "Français", description: "Langue française, littérature, oral.", domains: francaisCollege },
    { slug: "mathematiques", label: "Mathématiques", description: "Algèbre, géométrie, statistiques.", domains: mathematiquesCollege },
    { slug: "histoire-geographie-emc", label: "Histoire-Géographie-EMC", description: "Histoire, géographie, éducation morale et civique.", domains: histoireGeographieCollege },
    { slug: "svt", label: "SVT", description: "Sciences de la vie et de la Terre.", domains: [
      { slug: "vivant", label: "Le vivant", description: "Cellule, évolution, biodiversité, corps humain.", subdomains: [{ slug: "biodiversite", label: "Biodiversité et évolution", description: "Comprendre les mécanismes de l'évolution.", sequences: [] }] },
      { slug: "planete-environnement", label: "Planète et environnement", description: "Géologie, écosystèmes, développement durable.", subdomains: [{ slug: "ecosystemes", label: "Écosystèmes", description: "Étudier les interactions dans un écosystème.", sequences: [] }] },
    ] },
    { slug: "physique-chimie", label: "Physique-Chimie", description: "Physique, chimie, démarche expérimentale.", domains: [
      { slug: "matiere", label: "Matière", description: "Atomes, molécules, réactions chimiques.", subdomains: [{ slug: "constituants-matiere", label: "Constituants de la matière", description: "Atomes, ions, molécules.", sequences: [] }] },
      { slug: "mouvements-forces", label: "Mouvements et forces", description: "Décrire et modéliser les mouvements.", subdomains: [{ slug: "forces", label: "Forces et mouvements", description: "Comprendre les lois du mouvement.", sequences: [] }] },
    ] },
    { slug: "technologie", label: "Technologie", description: "Conception, programmation, objets techniques.", domains: [
      { slug: "systemes-techniques", label: "Systèmes techniques", description: "Analyser et concevoir des objets techniques.", subdomains: [{ slug: "conception", label: "Conception", description: "Modéliser et prototyper.", sequences: [] }] },
      { slug: "programmation", label: "Programmation", description: cycle === "3" ? "Algorithmique et initiation au code." : "Programmation avancée et robotique.", subdomains: [{ slug: "algorithmique", label: "Algorithmique", description: "Écrire et lire des algorithmes simples.", sequences: [] }] },
    ] },
    { slug: "langues-vivantes", label: "Langues vivantes", description: "LV1 et LV2.", domains: languesVivantesCollege },
    { slug: "arts-plastiques", label: "Arts plastiques", description: "Pratique artistique et histoire de l'art.", domains: artsPlastiquesCollege },
    { slug: "education-musicale", label: "Éducation musicale", description: "Pratique vocale et instrumentale, écoute.", domains: educationMusicaleCollege },
    { slug: "eps", label: "EPS", description: "Activités physiques, sportives et artistiques.", domains: epsCollege },
  ];
}

const sixieme: AcademyLevel = {
  slug: "6e",
  label: "6e",
  cycle: "cycle-3",
  stage: "college",
  description: "Entrée au collège. Consolidation du cycle 3 et ouverture disciplinaire.",
  subjects: [
    ...buildCollegeSubjects("3").slice(0, 3),
    { slug: "sciences-technologie", label: "Sciences et technologie", description: "Sciences expérimentales et technologie en cycle 3.", domains: sciencesTechnoCollege6e },
    ...buildCollegeSubjects("3").slice(3),
  ],
};

const cinquieme: AcademyLevel = {
  slug: "5e",
  label: "5e",
  cycle: "cycle-4",
  stage: "college",
  description: "Début du cycle 4. Approfondissement disciplinaire.",
  subjects: buildCollegeSubjects("4"),
};

const quatrieme: AcademyLevel = {
  slug: "4e",
  label: "4e",
  cycle: "cycle-4",
  stage: "college",
  description: "Milieu du cycle 4. Montée en complexité.",
  subjects: buildCollegeSubjects("4"),
};

const troisieme: AcademyLevel = {
  slug: "3e",
  label: "3e",
  cycle: "cycle-4",
  stage: "college",
  description: "Fin du cycle 4. Préparation au Brevet.",
  subjects: buildCollegeSubjects("4"),
};

// ── Lycée ─────────────────────────────────────────────────────────────────────
// ── Domaines partagés — lycée ────────────────────────────────────────────────

const emcLycee: AcademyDomain[] = [
  {
    slug: "engagements-citoyens",
    label: "Engagements citoyens",
    description: "Formes d'engagement, droits et responsabilités.",
    subdomains: [
      { slug: "engagement-democratique", label: "Engagement démocratique", description: "Participer à la vie démocratique.", sequences: [] },
      { slug: "droits-devoirs", label: "Droits et devoirs", description: "Droits fondamentaux et responsabilités individuelles.", sequences: [] },
    ],
  },
  {
    slug: "democratie-institutions",
    label: "Démocratie et institutions",
    description: "Organisation de la République française et européenne.",
    subdomains: [
      { slug: "institutions-france", label: "Institutions françaises", description: "Les trois pouvoirs, la Ve République.", sequences: [] },
      { slug: "europe", label: "L'Europe et le monde", description: "Union européenne, organisations internationales.", sequences: [] },
    ],
  },
];

const languesVivantesLycee: AcademyDomain[] = [
  {
    slug: "comprendre-interpreter",
    label: "Comprendre et interpréter",
    description: "Documents authentiques complexes en LV1 et LV2.",
    subdomains: [
      { slug: "comprehension-orale", label: "Compréhension orale approfondie", description: "Analyser des documents sonores et vidéo.", sequences: [] },
      { slug: "comprehension-ecrite", label: "Compréhension écrite approfondie", description: "Lire des textes littéraires et documentaires.", sequences: [] },
    ],
  },
  {
    slug: "produire-interagir",
    label: "Produire et interagir",
    description: "Expression et interaction en langue étrangère.",
    subdomains: [
      { slug: "expression-orale", label: "Expression orale", description: "Exposer, argumenter, débattre.", sequences: [] },
      { slug: "expression-ecrite", label: "Expression écrite", description: "Rédiger essais, résumés et textes argumentatifs.", sequences: [] },
    ],
  },
  {
    slug: "culture-societe",
    label: "Culture et société",
    description: "Repères culturels et civilisationnels des pays étudiés.",
    subdomains: [
      { slug: "fait-societal", label: "Faits de société", description: "Analyser un fait culturel ou sociétal.", sequences: [] },
    ],
  },
];

const enseignementScientifiqueLycee: AcademyDomain[] = [
  {
    slug: "son-lumiere",
    label: "Son et lumière",
    description: "Physique des ondes, perception, applications.",
    subdomains: [
      { slug: "ondes", label: "Ondes", description: "Propriétés et applications des ondes sonores et lumineuses.", sequences: [] },
    ],
  },
  {
    slug: "planete-univers",
    label: "Terre et univers",
    description: "Structure de la Terre, histoire du vivant, cosmologie.",
    subdomains: [
      { slug: "histoire-terre", label: "Histoire de la Terre et du vivant", description: "Évolution, géologie, chronologie.", sequences: [] },
    ],
  },
  {
    slug: "corps-sante",
    label: "Corps humain et santé",
    description: "Immunologie, neurosciences, comportements alimentaires.",
    subdomains: [
      { slug: "immunologie", label: "Immunologie et santé", description: "Le système immunitaire et ses applications.", sequences: [] },
    ],
  },
  {
    slug: "mathematiques-modelisation",
    label: "Mathématiques et modélisation",
    description: "Modèles mathématiques en sciences.",
    subdomains: [
      { slug: "modelisation", label: "Modélisation", description: "Utiliser les mathématiques pour modéliser des phénomènes naturels.", sequences: [] },
    ],
  },
];

const specialitesLycee: AcademyDomain[] = [
  {
    slug: "sciences-humaines-sociales",
    label: "Sciences humaines et sociales",
    description: "Histoire-Géo approfondie, SES, HGGSP, HLP.",
    subdomains: [
      { slug: "hggsp", label: "HGGSP", description: "Histoire-Géographie, Géopolitique et Sciences Politiques.", sequences: [] },
      { slug: "ses", label: "SES", description: "Sciences économiques et sociales.", sequences: [] },
    ],
  },
  {
    slug: "sciences-experimentales",
    label: "Sciences expérimentales",
    description: "Physique-Chimie, SVT, Maths, NSI.",
    subdomains: [
      { slug: "physique-chimie", label: "Physique-Chimie", description: "Sciences expérimentales approfondies.", sequences: [] },
      { slug: "svt-spe", label: "SVT", description: "Sciences de la vie et de la Terre approfondies.", sequences: [] },
      { slug: "nsi", label: "NSI", description: "Numérique et Sciences Informatiques.", sequences: [] },
    ],
  },
  {
    slug: "arts-lettres-langues",
    label: "Arts, lettres et langues",
    description: "Arts plastiques, théâtre, littérature, LLCER.",
    subdomains: [
      { slug: "arts-spe", label: "Arts", description: "Arts plastiques ou éducation musicale approfondis.", sequences: [] },
      { slug: "llcer", label: "LLCER", description: "Langues, Littératures et Cultures Étrangères et Régionales.", sequences: [] },
    ],
  },
];

const francaisLycee: AcademyDomain[] = [
  {
    slug: "litterature",
    label: "Littérature",
    description: "Œuvres majeures des XVIIe–XXIe siècles.",
    subdomains: [
      { slug: "parcours-associes", label: "Parcours associés", description: "Lire une œuvre dans son contexte culturel.", sequences: [] },
    ],
  },
  {
    slug: "langue-rhetorique",
    label: "Langue et rhétorique",
    description: "Grammaire avancée, figures de style, argumentation.",
    subdomains: [
      { slug: "argumentation", label: "Argumentation", description: "Dissertation et commentaire composé.", sequences: [] },
    ],
  },
];

const mathematiquesLycee: AcademyDomain[] = [
  { slug: "analyse", label: "Analyse", description: "Fonctions, dérivation, intégration.", subdomains: [{ slug: "fonctions", label: "Fonctions", description: "Étude et représentation des fonctions.", sequences: [] }] },
  { slug: "algebre", label: "Algèbre", description: "Suites, équations, systèmes.", subdomains: [{ slug: "suites", label: "Suites", description: "Suites arithmétiques et géométriques.", sequences: [] }] },
  { slug: "probabilites-statistiques", label: "Probabilités et statistiques", description: "Variables aléatoires, lois de probabilités.", subdomains: [{ slug: "probabilites", label: "Probabilités", description: "Calculer des probabilités et interpréter.", sequences: [] }] },
];

const lyceeSubjectsBase = [
  { slug: "francais", label: "Français", description: "Humanités littéraires, rhétorique, EAF.", domains: francaisLycee },
  { slug: "mathematiques", label: "Mathématiques", description: "Analyse, algèbre, probabilités.", domains: mathematiquesLycee },
  { slug: "histoire-geographie", label: "Histoire-Géographie", description: "Grands repères mondiaux contemporains.", domains: [
    { slug: "histoire", label: "Histoire", description: "Du XIXe siècle au monde contemporain.", subdomains: [{ slug: "monde-contemporain", label: "Monde contemporain", description: "Guerres, décolonisation, mondialisation.", sequences: [] }] },
    { slug: "geographie", label: "Géographie", description: "Mondialisation, territoires, développement.", subdomains: [{ slug: "mondialisation", label: "Mondialisation", description: "Flux, puissances, inégalités mondiales.", sequences: [] }] },
  ] as AcademyDomain[] },
  { slug: "emc", label: "EMC", description: "Éducation morale et civique.", domains: emcLycee },
  { slug: "langues-vivantes", label: "Langues vivantes", description: "LV1 et LV2 approfondies.", domains: languesVivantesLycee },
  { slug: "enseignement-scientifique", label: "Enseignement scientifique", description: "Sciences pluridisciplinaires obligatoires.", domains: enseignementScientifiqueLycee },
  { slug: "specialites", label: "Spécialités", description: "Parcours personnalisé selon les choix de l'élève.", domains: specialitesLycee },
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
    {
      slug: "philosophie",
      label: "Philosophie",
      description: "Dissertation et explication de texte philosophique.",
      domains: [
        { slug: "grands-themes", label: "Grands thèmes", description: "La liberté, la vérité, l'État, la conscience…", subdomains: [{ slug: "conscience-sujet", label: "Conscience et sujet", description: "Identité, liberté, responsabilité.", sequences: [] }] },
        { slug: "textes-philosophiques", label: "Textes philosophiques", description: "Platon, Descartes, Kant, Nietzsche…", subdomains: [{ slug: "explication-texte", label: "Explication de texte", description: "Analyser et commenter un texte philosophique.", sequences: [] }] },
      ] as AcademyDomain[],
    },
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

export function getCm2Level(): AcademyLevel {
  const level = getAcademyLevelBySlug("elementaire", "cm2");
  if (!level) throw new Error("CM2 level missing from academyCurriculum");
  return level;
}
