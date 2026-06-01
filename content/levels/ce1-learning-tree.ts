// Arbre pedagogique CE1 - Cycle 2, primaire.
// Structure de catalogue : niveau -> matieres -> domaines -> sequences-competences.
// Une sequence correspond a une seule competence, sans lecon detaillee ni exercice.

import type {
  AcademyLevelProgram,
  Lesson,
  LearningCompetency,
  ParentGuidance,
  PedagogicalResourceRef,
  ProgramDomain,
  ProgramStatus,
  ProgramSubdomain,
} from "@/content/program-types";

export type Ce1SubjectSummary = {
  slug: string;
  title: string;
  shortDescription: string;
  domains: string[];
  status: ProgramStatus;
  accent: string;
};

export type Ce1SubjectNode = ProgramDomain;

const emptyParentGuidance: ParentGuidance = {
  summary: "",
  quickTips: [],
  successSigns: [],
};

const PLANNED_PDF_RESOURCES: PedagogicalResourceRef[] = [
  { kind: "lesson-pdf", label: "PDF de leçon", status: "planned" },
  { kind: "exercises-pdf", label: "PDF d'exercices", status: "planned" },
  { kind: "correction-pdf", label: "PDF de correction", status: "planned" },
  { kind: "projectable-pdf", label: "PDF projetable", status: "planned" },
  { kind: "parent-sheet-pdf", label: "Fiche parent", status: "planned" },
];

function clonePlannedPdfResources(): PedagogicalResourceRef[] {
  return PLANNED_PDF_RESOURCES.map((resource) => ({ ...resource }));
}

type CompetencyDefinition = {
  slug: string;
  title: string;
  objective: string;
  status: ProgramStatus;
};

function createCompetencySequence(
  domainSlug: string,
  subdomainSlug: string,
  definition: CompetencyDefinition,
): { lesson: Lesson; competency: LearningCompetency } {
  const id = `ce1-${domainSlug}-${subdomainSlug}-${definition.slug}`;

  return {
    lesson: {
      id,
      slug: definition.slug,
      title: definition.title,
      objective: definition.objective,
      skill: definition.title,
      parentGuidance: emptyParentGuidance,
      successCriteria: [],
      exercises: [],
      resources: clonePlannedPdfResources(),
      competencyIds: [id],
      status: definition.status,
    },
    competency: {
      id,
      slug: definition.slug,
      title: definition.title,
      levelSlug: "ce1",
      cycle: "cycle-2",
      stage: "primaire",
      domainSlug,
      subdomainSlug,
      objective: definition.objective,
      status: definition.status,
      lessonIds: [id],
      successCriteria: [],
      resourceRefs: clonePlannedPdfResources(),
    },
  };
}

function createSubdomain(
  domainSlug: string,
  slug: string,
  title: string,
  description: string,
  definitions: CompetencyDefinition[],
): ProgramSubdomain {
  const sequences = definitions.map((definition) =>
    createCompetencySequence(domainSlug, slug, definition),
  );
  const hasInProgress = definitions.some(
    (definition) => definition.status === "in-progress",
  );

  return {
    id: `ce1-${domainSlug}-${slug}`,
    slug,
    title,
    description,
    lessons: sequences.map((sequence) => sequence.lesson),
    competencies: sequences.map((sequence) => sequence.competency),
    status: hasInProgress ? "in-progress" : "upcoming",
  };
}

const domainFrancais: ProgramDomain = {
  id: "ce1-francais",
  slug: "francais",
  title: "Français",
  officialLabel: "Français - Cycle 2",
  description:
    "Lecture fluide, comprehension, productions ecrites, grammaire et orthographe frequente.",
  subdomains: [
    createSubdomain(
      "francais",
      "lecture-fluide",
      "Lecture fluide",
      "Consolider le decodage et automatiser la lecture.",
      [
        {
          slug: "lire-des-mots-frequents-rapidement",
          title: "Lire des mots frequents rapidement",
          objective:
            "Reconnaitre et lire sans hesitation les mots frequents rencontres en classe.",
          status: "in-progress",
        },
        {
          slug: "lire-un-texte-court-avec-fluidite",
          title: "Lire un texte court avec fluidite",
          objective:
            "Lire un texte court en respectant les groupes de sens et la ponctuation.",
          status: "in-progress",
        },
        {
          slug: "relire-pour-gagner-en-aisance",
          title: "Relire pour gagner en aisance",
          objective:
            "Ameliorer la precision et la fluidite par des relectures courtes.",
          status: "in-progress",
        },
      ],
    ),
    createSubdomain(
      "francais",
      "comprehension",
      "Comprehension",
      "Comprendre des textes courts lus seul ou entendus.",
      [
        {
          slug: "identifier-les-personnages-et-les-lieux",
          title: "Identifier les personnages et les lieux",
          objective:
            "Reperer les personnages, les lieux et les informations explicites d'un texte court.",
          status: "in-progress",
        },
        {
          slug: "repondre-a-une-question-par-une-information-du-texte",
          title: "Repondre a une question par une information du texte",
          objective:
            "Appuyer sa reponse sur une information lue ou entendue dans le texte.",
          status: "upcoming",
        },
        {
          slug: "remettre-les-evenements-dans-lordre",
          title: "Remettre les evenements dans l'ordre",
          objective: "Ordonner les principales etapes d'un recit court.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "francais",
      "production-ecrite",
      "Premieres productions ecrites",
      "Ecrire des phrases puis de courts textes avec guidage.",
      [
        {
          slug: "ecrire-une-phrase-complete",
          title: "Ecrire une phrase complete",
          objective:
            "Produire une phrase qui a du sens avec une majuscule et une ponctuation finale.",
          status: "upcoming",
        },
        {
          slug: "enchainer-deux-phrases-sur-un-meme-sujet",
          title: "Enchainer deux phrases sur un meme sujet",
          objective:
            "Ecrire deux phrases coherentes autour d'une idee ou d'une image.",
          status: "upcoming",
        },
        {
          slug: "ameliorer-une-phrase-par-un-detail",
          title: "Ameliorer une phrase par un detail",
          objective:
            "Ajouter une precision simple pour rendre une phrase plus informative.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "francais",
      "etude-de-la-langue",
      "Étude de la langue",
      "Observer la phrase et ses principaux constituants.",
      [
        {
          slug: "reconnaitre-une-phrase-correcte",
          title: "Reconnaitre une phrase correcte",
          objective:
            "Identifier une phrase qui a du sens, commence par une majuscule et se termine par un point.",
          status: "in-progress",
        },
        {
          slug: "identifier-le-verbe-dans-une-phrase-simple",
          title: "Identifier le verbe dans une phrase simple",
          objective:
            "Reperer le mot qui indique l'action dans une phrase courte.",
          status: "upcoming",
        },
        {
          slug: "identifier-le-sujet-dun-verbe-simple",
          title: "Identifier le sujet d'un verbe simple",
          objective: "Trouver qui fait l'action dans une phrase courte.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "francais",
      "orthographe",
      "Orthographe frequente",
      "Stabiliser les mots frequents et les accords simples.",
      [
        {
          slug: "orthographier-des-mots-outils-frequents",
          title: "Orthographier des mots outils frequents",
          objective:
            "Ecrire correctement des mots outils frequents travailles en classe.",
          status: "upcoming",
        },
        {
          slug: "marquer-le-pluriel-regulier-du-nom",
          title: "Marquer le pluriel regulier du nom",
          objective:
            "Ajouter la marque du pluriel sur des noms reguliers dans des groupes nominaux simples.",
          status: "upcoming",
        },
        {
          slug: "accorder-le-verbe-avec-il-ou-ils",
          title: "Accorder le verbe avec il ou ils",
          objective:
            "Choisir une forme verbale simple selon un sujet singulier ou pluriel.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "in-progress",
};

const domainMathematiques: ProgramDomain = {
  id: "ce1-mathematiques",
  slug: "mathematiques",
  title: "Mathématiques",
  officialLabel: "Mathématiques - Cycle 2",
  description: "Nombres, calculs, problemes, grandeurs, espace et geometrie.",
  subdomains: [
    createSubdomain(
      "mathematiques",
      "nombres-et-calculs",
      "Nombres et calculs",
      "Consolider la numeration et les calculs simples.",
      [
        {
          slug: "lire-et-ecrire-les-nombres-jusqua-1000",
          title: "Lire et ecrire les nombres jusqu'a 1000",
          objective:
            "Associer ecriture chiffree, nom oral et decomposition des nombres jusqu'a 1000.",
          status: "in-progress",
        },
        {
          slug: "comparer-et-ranger-des-nombres",
          title: "Comparer et ranger des nombres",
          objective:
            "Comparer et ordonner des nombres entiers en utilisant la valeur des chiffres.",
          status: "in-progress",
        },
        {
          slug: "calculer-mentalement-avec-des-petits-nombres",
          title: "Calculer mentalement avec des petits nombres",
          objective:
            "Mobiliser des doubles, complements et decompositions pour calculer rapidement.",
          status: "in-progress",
        },
        {
          slug: "poser-une-addition-sans-retenue",
          title: "Poser une addition sans retenue",
          objective:
            "Aligner les chiffres par rang et calculer une addition posee simple.",
          status: "in-progress",
        },
      ],
    ),
    createSubdomain(
      "mathematiques",
      "problemes",
      "Problemes",
      "Resoudre des problemes additifs, soustractifs et multiplicatifs tres simples.",
      [
        {
          slug: "choisir-loperation-dun-probleme-additif-ou-soustractif",
          title: "Choisir l'operation d'un probleme additif ou soustractif",
          objective:
            "Identifier si une situation demande d'ajouter ou de retirer.",
          status: "upcoming",
        },
        {
          slug: "resoudre-un-probleme-a-etapes-guidees",
          title: "Resoudre un probleme a etapes guidees",
          objective:
            "Suivre deux etapes explicites pour resoudre un probleme court.",
          status: "upcoming",
        },
        {
          slug: "expliquer-sa-demarche-de-resolution",
          title: "Expliquer sa demarche de resolution",
          objective:
            "Dire ou ecrire comment le calcul choisi repond a la question.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "mathematiques",
      "grandeurs-et-mesures",
      "Grandeurs et mesures",
      "Comparer, estimer et mesurer des grandeurs usuelles.",
      [
        {
          slug: "comparer-des-longueurs",
          title: "Comparer des longueurs",
          objective:
            "Comparer deux longueurs directement ou avec un instrument adapte.",
          status: "upcoming",
        },
        {
          slug: "lire-une-heure-simple",
          title: "Lire une heure simple",
          objective:
            "Lire l'heure pleine et la demi-heure sur une horloge a aiguilles.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "mathematiques",
      "espace-et-geometrie",
      "Espace et geometrie",
      "Se reperer, reconnaitre des figures et utiliser les premiers instruments.",
      [
        {
          slug: "se-reperer-sur-un-quadrillage",
          title: "Se reperer sur un quadrillage",
          objective:
            "Localiser une case ou un deplacement simple sur un quadrillage.",
          status: "upcoming",
        },
        {
          slug: "reconnaitre-les-figures-usuelles",
          title: "Reconnaitre les figures usuelles",
          objective:
            "Identifier carre, rectangle, triangle et cercle a partir de leurs proprietes visibles.",
          status: "upcoming",
        },
        {
          slug: "tracer-un-segment-a-la-regle",
          title: "Tracer un segment a la regle",
          objective:
            "Utiliser la regle pour tracer un segment propre entre deux points.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "in-progress",
};

const domainQuestionnerLeMonde: ProgramDomain = {
  id: "ce1-questionner-le-monde",
  slug: "questionner-le-monde",
  title: "Questionner le monde",
  officialLabel: "Questionner le monde - Cycle 2",
  description:
    "Temps, espace, vivant, matiere et objets techniques observes a hauteur de CE1.",
  subdomains: [
    createSubdomain(
      "questionner-le-monde",
      "temps",
      "Se situer dans le temps",
      "Construire des reperes temporels simples et ordonner des evenements.",
      [
        {
          slug: "ordonner-des-evenements-de-la-journee",
          title: "Ordonner des evenements de la journee",
          objective:
            "Placer des actions courtes dans l'ordre chronologique d'une journee.",
          status: "upcoming",
        },
        {
          slug: "utiliser-un-calendrier-simple",
          title: "Utiliser un calendrier simple",
          objective:
            "Lire une date et reperer une duree courte sur un calendrier de classe.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "questionner-le-monde",
      "espace",
      "Se situer dans l'espace",
      "Lire des representations simples et decrire un deplacement.",
      [
        {
          slug: "decrire-un-trajet-court",
          title: "Decrire un trajet court",
          objective:
            "Employer un vocabulaire spatial simple pour expliquer un deplacement.",
          status: "upcoming",
        },
        {
          slug: "lire-un-plan-de-classe",
          title: "Lire un plan de classe",
          objective:
            "Associer des elements reels de la classe a leur representation sur un plan.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "questionner-le-monde",
      "vivant-matiere-objets",
      "Vivant, matiere et objets",
      "Observer le vivant, les etats de la matiere et des objets techniques simples.",
      [
        {
          slug: "identifier-les-besoins-dune-plante",
          title: "Identifier les besoins d'une plante",
          objective:
            "Relier la croissance d'une plante a quelques besoins observables.",
          status: "upcoming",
        },
        {
          slug: "distinguer-solide-et-liquide",
          title: "Distinguer solide et liquide",
          objective:
            "Classer des matieres courantes selon leur etat solide ou liquide.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "upcoming",
};

const domainArts: ProgramDomain = {
  id: "ce1-arts",
  slug: "arts",
  title: "Arts",
  officialLabel: "Arts plastiques et education musicale - Cycle 2",
  description:
    "Pratiques plastiques, ecoute musicale et premiers reperes culturels.",
  subdomains: [
    createSubdomain(
      "arts",
      "arts-plastiques",
      "Arts plastiques",
      "Experimenter des gestes, des supports et des compositions simples.",
      [
        {
          slug: "composer-avec-des-formes-et-des-couleurs",
          title: "Composer avec des formes et des couleurs",
          objective:
            "Organiser formes et couleurs pour produire une composition lisible.",
          status: "upcoming",
        },
        {
          slug: "decrire-sa-production-artistique",
          title: "Decrire sa production artistique",
          objective:
            "Nommer les choix de gestes, de couleurs ou de materiaux utilises.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "arts",
      "education-musicale",
      "Education musicale",
      "Ecouter, reproduire et comparer des sons ou des chants courts.",
      [
        {
          slug: "reproduire-un-rythme-simple",
          title: "Reproduire un rythme simple",
          objective:
            "Repeter un motif rythmique court en gardant une pulsation reguliere.",
          status: "upcoming",
        },
        {
          slug: "decrire-une-ecoute-musicale",
          title: "Decrire une ecoute musicale",
          objective:
            "Exprimer ce que l'on entend avec quelques mots precis.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "upcoming",
};

const domainEps: ProgramDomain = {
  id: "ce1-eps",
  slug: "eps",
  title: "EPS",
  officialLabel: "Education physique et sportive - Cycle 2",
  description:
    "Agir, s'exprimer, cooperer et adapter ses deplacements en securite.",
  subdomains: [
    createSubdomain(
      "eps",
      "activites-athletiques",
      "Activites athletiques",
      "Courir, sauter et lancer avec des reperes simples de progression.",
      [
        {
          slug: "courir-longtemps-a-allure-reguliere",
          title: "Courir longtemps a allure reguliere",
          objective:
            "Adapter son allure pour courir pendant une duree courte annoncee.",
          status: "upcoming",
        },
        {
          slug: "lancer-avec-precision",
          title: "Lancer avec precision",
          objective:
            "Orienter son geste pour atteindre une zone cible definie.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "eps",
      "jeux-collectifs",
      "Jeux collectifs",
      "Cooperer, respecter des regles et tenir un role simple.",
      [
        {
          slug: "respecter-une-regle-de-jeu-collectif",
          title: "Respecter une regle de jeu collectif",
          objective:
            "Appliquer une regle commune pendant un jeu d'opposition ou de cooperation.",
          status: "upcoming",
        },
        {
          slug: "cooperer-pour-marquer-un-point",
          title: "Cooperer pour marquer un point",
          objective:
            "Faire une passe ou se placer pour aider son equipe a progresser.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "upcoming",
};

const domainEmc: ProgramDomain = {
  id: "ce1-emc",
  slug: "emc",
  title: "EMC",
  officialLabel: "Enseignement moral et civique - Cycle 2",
  description:
    "Regles communes, respect d'autrui, cooperation et expression d'un avis simple.",
  subdomains: [
    createSubdomain(
      "emc",
      "regles-et-responsabilites",
      "Regles et responsabilites",
      "Comprendre les regles de vie et les responsabilites dans la classe.",
      [
        {
          slug: "expliquer-une-regle-de-vie",
          title: "Expliquer une regle de vie",
          objective:
            "Dire a quoi sert une regle commune dans une situation de classe.",
          status: "upcoming",
        },
        {
          slug: "tenir-une-responsabilite-simple",
          title: "Tenir une responsabilite simple",
          objective:
            "Assumer un role de classe en respectant une consigne connue.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "emc",
      "respect-et-cooperation",
      "Respect et cooperation",
      "Ecouter, aider et formuler un avis dans un echange collectif.",
      [
        {
          slug: "ecouter-un-camarade-sans-linterrompre",
          title: "Ecouter un camarade sans l'interrompre",
          objective:
            "Attendre son tour de parole et reformuler une idee entendue.",
          status: "upcoming",
        },
        {
          slug: "exprimer-un-avis-simple",
          title: "Exprimer un avis simple",
          objective:
            "Formuler un accord ou un desaccord avec une raison courte.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "upcoming",
};

export const ce1LearningTree: AcademyLevelProgram = {
  levelSlug: "ce1",
  label: "CE1",
  cycle: "cycle-2",
  stage: "primaire",
  characterLink: {
    characterSlug: "gaston",
    name: "Gaston",
    roleHint:
      "Gaston accompagne la consolidation de la lecture, de l'ecriture et du raisonnement.",
  },
  domains: [
    domainFrancais,
    domainMathematiques,
    domainQuestionnerLeMonde,
    domainArts,
    domainEps,
    domainEmc,
  ],
};

const ce1SubjectAccents: Record<string, string> = {
  francais: "jade",
  mathematiques: "gold",
  "questionner-le-monde": "sky",
  arts: "ember",
  eps: "jade",
  emc: "sky",
};

export const ce1Subjects: Ce1SubjectSummary[] = ce1LearningTree.domains.map(
  (domain) => ({
    slug: domain.slug,
    title: domain.title,
    shortDescription: domain.description ?? "Programme CE1 en structuration.",
    domains: domain.subdomains.map((subdomain) => subdomain.title),
    status: domain.status,
    accent: ce1SubjectAccents[domain.slug] ?? "jade",
  }),
);

export function getCe1SubjectBySlug(
  slug: string,
): Ce1SubjectSummary | undefined {
  return ce1Subjects.find((subject) => subject.slug === slug);
}

export function getCe1SubjectTree(slug: string): Ce1SubjectNode | undefined {
  return getCe1Domain(slug);
}

export function getCe1Domain(domainSlug: string): ProgramDomain | undefined {
  return ce1LearningTree.domains.find((domain) => domain.slug === domainSlug);
}

export function getCe1Subdomain(
  domainSlug: string,
  subdomainSlug: string,
): ProgramSubdomain | undefined {
  return getCe1Domain(domainSlug)?.subdomains.find(
    (subdomain) => subdomain.slug === subdomainSlug,
  );
}

export function getCe1Lesson(
  domainSlug: string,
  subdomainSlug: string,
  lessonSlug: string,
): Lesson | undefined {
  return getCe1Subdomain(domainSlug, subdomainSlug)?.lessons.find(
    (lesson) => lesson.slug === lessonSlug,
  );
}

export function getCe1LessonById(lessonId: string): Lesson | undefined {
  for (const domain of ce1LearningTree.domains) {
    for (const subdomain of domain.subdomains) {
      const found = subdomain.lessons.find((lesson) => lesson.id === lessonId);
      if (found) return found;
    }
  }
  return undefined;
}
