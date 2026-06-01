// Arbre pedagogique CE1 - Cycle 2, primaire.
// Structure de catalogue : niveau -> matieres -> domaines -> sequences-competences.
// Une sequence correspond a une seule competence, sans lecon detaillee ni exercice.

import type {
  AcademyLevelProgram,
  Lesson,
  LearningCompetency,
  ParentGuidance,
  ProgramDomain,
  ProgramStatus,
  ProgramSubdomain,
} from "@/content/program-types";

const emptyParentGuidance: ParentGuidance = {
  summary: "",
  quickTips: [],
  successSigns: [],
};

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
  title: "Francais",
  officialLabel: "Francais - Cycle 2",
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
          status: "upcoming",
        },
        {
          slug: "relire-pour-gagner-en-aisance",
          title: "Relire pour gagner en aisance",
          objective:
            "Ameliorer la precision et la fluidite par des relectures courtes.",
          status: "upcoming",
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
          status: "upcoming",
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
      "Grammaire simple",
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
  title: "Mathematiques",
  officialLabel: "Mathematiques - Cycle 2",
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
          status: "upcoming",
        },
        {
          slug: "comparer-et-ranger-des-nombres",
          title: "Comparer et ranger des nombres",
          objective:
            "Comparer et ordonner des nombres entiers en utilisant la valeur des chiffres.",
          status: "upcoming",
        },
        {
          slug: "calculer-mentalement-avec-des-petits-nombres",
          title: "Calculer mentalement avec des petits nombres",
          objective:
            "Mobiliser des doubles, complements et decompositions pour calculer rapidement.",
          status: "upcoming",
        },
        {
          slug: "poser-une-addition-sans-retenue",
          title: "Poser une addition sans retenue",
          objective:
            "Aligner les chiffres par rang et calculer une addition posee simple.",
          status: "upcoming",
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
  status: "upcoming",
};

const domainQuestionnerLeMonde: ProgramDomain = {
  id: "ce1-questionner-le-monde",
  slug: "questionner-le-monde",
  title: "Questionner le monde",
  officialLabel: "Questionner le monde - Cycle 2",
  description: "Observer le vivant, explorer la matiere, se reperer dans le temps et l'espace.",
  subdomains: [
    createSubdomain(
      "questionner-le-monde",
      "monde-vivant",
      "Le monde vivant",
      "Decrire les cycles de vie et les relations entre etres vivants.",
      [
        {
          slug: "decrire-le-cycle-dun-etre-vivant",
          title: "Decrire le cycle d'un etre vivant",
          objective:
            "L'eleve ordonne les etapes du developpement d'un etre vivant et les justifie.",
          status: "upcoming",
        },
        {
          slug: "observer-une-chaine-alimentaire-simple",
          title: "Observer une chaine alimentaire simple",
          objective:
            "L'eleve identifie producteurs et consommateurs dans une chaine alimentaire courte.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "questionner-le-monde",
      "espace-et-temps",
      "Espace et temps",
      "Lire une frise, situer des evenements et se reperer sur une carte simple.",
      [
        {
          slug: "lire-une-frise-chronologique",
          title: "Lire une frise chronologique",
          objective:
            "L'eleve place des evenements sur une frise et utilise un vocabulaire temporel adapte.",
          status: "upcoming",
        },
        {
          slug: "se-reperer-sur-une-carte-simple",
          title: "Se reperer sur une carte simple",
          objective:
            "L'eleve localise un lieu en utilisant la legende et les reperes d'une carte.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "questionner-le-monde",
      "matiere-et-energie",
      "Matiere et energie",
      "Classer des matieres et explorer des circuits simples.",
      [
        {
          slug: "classer-des-matieres-selon-leurs-proprietes",
          title: "Classer des matieres selon leurs proprietes",
          objective:
            "L'eleve observe et classe des matieres en s'appuyant sur des proprietes testees.",
          status: "upcoming",
        },
        {
          slug: "observer-un-circuit-electrique-simple",
          title: "Observer un circuit electrique simple",
          objective:
            "L'eleve identifie les elements d'un circuit simple et comprend pourquoi une lampe s'allume.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "upcoming",
};

const domainEnseignementsArtistiques: ProgramDomain = {
  id: "ce1-enseignements-artistiques",
  slug: "enseignements-artistiques",
  title: "Enseignements artistiques",
  officialLabel: "Enseignements artistiques - Cycle 2",
  description: "Composer avec des formes et des couleurs, chanter et ecouter de la musique.",
  subdomains: [
    createSubdomain(
      "enseignements-artistiques",
      "arts-plastiques",
      "Arts plastiques",
      "Composer avec des formes et des couleurs, decrire une oeuvre.",
      [
        {
          slug: "composer-avec-formes-et-couleurs",
          title: "Composer avec des formes et des couleurs",
          objective:
            "L'eleve organise des formes et des couleurs pour donner une intention a sa production.",
          status: "upcoming",
        },
        {
          slug: "decrire-une-oeuvre-plastique",
          title: "Decrire une oeuvre plastique",
          objective:
            "L'eleve decrit ce qu'il voit dans une oeuvre en distinguant observation et ressenti.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "enseignements-artistiques",
      "education-musicale",
      "Education musicale",
      "Chanter avec precision et ecouter des extraits musicaux.",
      [
        {
          slug: "chanter-en-groupe-avec-precision",
          title: "Chanter en groupe avec precision",
          objective:
            "L'eleve chante en respectant le tempo, les paroles et l'intensite collective.",
          status: "upcoming",
        },
        {
          slug: "ecouter-et-decrire-un-extrait-musical",
          title: "Ecouter et decrire un extrait musical",
          objective:
            "L'eleve identifie des elements sonores dans un extrait et les decrit avec des mots simples.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "upcoming",
};

const domainEPS: ProgramDomain = {
  id: "ce1-eps",
  slug: "eps",
  title: "EPS",
  officialLabel: "Education physique et sportive - Cycle 2",
  description: "Activites physiques, jeux collectifs et premiere expression corporelle.",
  subdomains: [
    createSubdomain(
      "eps",
      "activites-physiques",
      "Activites physiques",
      "Ameliorer une performance et adapter son effort.",
      [
        {
          slug: "ameliorer-une-performance-mesuree",
          title: "Ameliorer une performance mesuree",
          objective:
            "L'eleve realise une performance simple et cherche a progresser d'une seance a l'autre.",
          status: "upcoming",
        },
        {
          slug: "adapter-son-effort-a-la-duree",
          title: "Adapter son effort a la duree",
          objective:
            "L'eleve maintient un effort regulier sur une duree adaptee sans s'epuiser.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "eps",
      "jeux-collectifs",
      "Jeux collectifs",
      "Cooperer et assumer des roles varies dans un jeu collectif.",
      [
        {
          slug: "cooperer-dans-un-jeu-collectif",
          title: "Cooperer dans un jeu collectif",
          objective:
            "L'eleve agit avec ses partenaires et tient compte des adversaires.",
          status: "upcoming",
        },
        {
          slug: "respecter-des-roles-varies",
          title: "Respecter des roles varies",
          objective:
            "L'eleve assume les roles de joueur, d'arbitre ou d'observateur selon la situation.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "eps",
      "expression-corporelle",
      "Expression corporelle",
      "Enchainer des actions pour communiquer et presenter une production.",
      [
        {
          slug: "enchainer-des-actions-pour-communiquer",
          title: "Enchainer des actions pour communiquer",
          objective:
            "L'eleve compose une courte phrase corporelle avec un debut, un milieu et une fin.",
          status: "upcoming",
        },
        {
          slug: "presenter-une-production-corporelle",
          title: "Presenter une production corporelle",
          objective:
            "L'eleve presente sa production devant un groupe et accepte le regard des autres.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "upcoming",
};

const domainEMC: ProgramDomain = {
  id: "ce1-emc",
  slug: "emc",
  title: "EMC",
  officialLabel: "Enseignement moral et civique - Cycle 2",
  description: "Comprendre les regles, les droits, les devoirs et participer a la vie collective.",
  subdomains: [
    createSubdomain(
      "emc",
      "vie-collective",
      "Vie collective",
      "Comprendre l'utilite des regles et participer aux decisions collectives.",
      [
        {
          slug: "comprendre-l-utilite-d-une-regle",
          title: "Comprendre l'utilite d'une regle",
          objective:
            "L'eleve explique pourquoi une regle existe et ce qui se passerait sans elle.",
          status: "upcoming",
        },
        {
          slug: "participer-a-une-decision-collective",
          title: "Participer a une decision collective",
          objective:
            "L'eleve exprime son avis et prend part a une vote ou un choix de groupe.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "emc",
      "droits-et-devoirs",
      "Droits et devoirs",
      "Distinguer droits et devoirs et identifier des actions responsables.",
      [
        {
          slug: "distinguer-droit-et-devoir",
          title: "Distinguer un droit d'un devoir",
          objective:
            "L'eleve donne des exemples de droits et de devoirs dans la vie de la classe.",
          status: "upcoming",
        },
        {
          slug: "identifier-des-actions-responsables",
          title: "Identifier des actions responsables",
          objective:
            "L'eleve propose une action concrete utile au groupe ou a l'environnement proche.",
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
    domainEnseignementsArtistiques,
    domainEPS,
    domainEMC,
  ],
};

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

export type Ce1SubjectTree = {
  place: { label: string };
  guides: { id: string; name: string }[];
  domains: {
    id: string;
    title: string;
    subdomains: {
      id: string;
      title: string;
      items: {
        id: string;
        title: string;
        description?: string;
        status: ProgramStatus;
        href?: string;
      }[];
    }[];
  }[];
};

export type Ce1SequenceEntry = {
  id: string;
  title: string;
  domain: string;
  subdomain: string;
  skill: string;
  status: ProgramStatus;
};

export function getCe1SubjectTree(subjectSlug: string): Ce1SubjectTree | undefined {
  const domain = ce1LearningTree.domains.find((d) => d.slug === subjectSlug);
  if (!domain) return undefined;

  return {
    place: { label: "Cycle 2 · Primaire" },
    guides: [],
    domains: [
      {
        id: domain.id,
        title: domain.title,
        subdomains: domain.subdomains.map((subdomain) => ({
          id: subdomain.id,
          title: subdomain.title,
          items: subdomain.lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            description: lesson.objective,
            status: lesson.status,
          })),
        })),
      },
    ],
  };
}

export function getCe1Sequences(subjectSlug: string): Ce1SequenceEntry[] {
  const domain = ce1LearningTree.domains.find((d) => d.slug === subjectSlug);
  if (!domain) return [];

  return domain.subdomains.flatMap((subdomain) =>
    subdomain.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      domain: domain.title,
      subdomain: subdomain.title,
      skill: lesson.objective,
      status: lesson.status,
    })),
  );
}
