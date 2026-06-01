// Arbre pedagogique CP - Cycle 2, primaire.
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

export type CpSubjectSummary = {
  slug: string;
  title: string;
  shortDescription: string;
  domains: string[];
  status: ProgramStatus;
  accent: string;
};

export type CpSubjectNode = ProgramDomain;

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
  const id = `cp-${domainSlug}-${subdomainSlug}-${definition.slug}`;

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
      levelSlug: "cp",
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
    id: `cp-${domainSlug}-${slug}`,
    slug,
    title,
    description,
    lessons: sequences.map((sequence) => sequence.lesson),
    competencies: sequences.map((sequence) => sequence.competency),
    status: hasInProgress ? "in-progress" : "upcoming",
  };
}

const domainFrancais: ProgramDomain = {
  id: "cp-francais",
  slug: "francais",
  title: "Français",
  officialLabel: "Français - Cycle 2",
  description:
    "Decodage, combinatoire, fluence, comprehension et premieres ecritures.",
  subdomains: [
    createSubdomain(
      "francais",
      "decodage",
      "Decodage",
      "Entrer progressivement dans le code alphabetique.",
      [
        {
          slug: "reconnaitre-les-lettres-et-les-sons-frequents",
          title: "Reconnaitre les lettres et les sons frequents",
          objective:
            "Associer les lettres et graphies etudiees a leur son le plus frequent.",
          status: "in-progress",
        },
        {
          slug: "lire-des-syllabes-simples",
          title: "Lire des syllabes simples",
          objective:
            "Decoder des syllabes consonne-voyelle et voyelle-consonne avec appui oral.",
          status: "upcoming",
        },
        {
          slug: "lire-des-mots-reguliers-courts",
          title: "Lire des mots reguliers courts",
          objective:
            "Assembler les syllabes pour lire des mots reguliers d'une ou deux syllabes.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "francais",
      "combinatoire",
      "Combinatoire",
      "Construire la lecture par assemblage progressif.",
      [
        {
          slug: "combiner-consonnes-et-voyelles",
          title: "Combiner consonnes et voyelles",
          objective:
            "Former et lire des syllabes en combinant une consonne et une voyelle connues.",
          status: "upcoming",
        },
        {
          slug: "lire-des-mots-avec-digraphes-frequents",
          title: "Lire des mots avec digraphes frequents",
          objective:
            "Decoder des mots contenant des graphemes frequents comme ou, on, an ou ch.",
          status: "upcoming",
        },
        {
          slug: "encoder-des-syllabes-entendues",
          title: "Encoder des syllabes entendues",
          objective:
            "Ecrire une syllabe simple en choisissant les lettres correspondant aux sons entendus.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "francais",
      "fluence",
      "Fluence",
      "Automatiser progressivement la lecture.",
      [
        {
          slug: "lire-des-mots-frequents-sans-segmenter",
          title: "Lire des mots frequents sans segmenter",
          objective:
            "Reconnaitre rapidement des mots tres frequents deja rencontres.",
          status: "upcoming",
        },
        {
          slug: "lire-une-phrase-courte-avec-fluidite",
          title: "Lire une phrase courte avec fluidite",
          objective:
            "Lire une phrase courte en respectant l'ordre des mots et une prosodie simple.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "francais",
      "lecture-comprehension",
      "Lecture et compréhension",
      "Comprendre des enonces entendus puis lus.",
      [
        {
          slug: "comprendre-une-consigne-orale-simple",
          title: "Comprendre une consigne orale simple",
          objective:
            "Reformuler ou executer une consigne courte donnee oralement.",
          status: "upcoming",
        },
        {
          slug: "identifier-les-personnages-dun-texte-entendu",
          title: "Identifier les personnages d'un texte entendu",
          objective:
            "Nommer les personnages principaux apres l'ecoute d'un recit court.",
          status: "upcoming",
        },
        {
          slug: "prelever-une-information-dans-une-phrase-lue",
          title: "Prelever une information dans une phrase lue",
          objective:
            "Repondre a une question simple a partir d'une phrase decodee.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "francais",
      "ecriture",
      "Ecriture de mots et phrases",
      "Passer de l'encodage de mots simples a l'ecriture de phrases tres courtes.",
      [
        {
          slug: "copier-des-mots-courts-lisiblement",
          title: "Copier des mots courts lisiblement",
          objective:
            "Copier des mots courts en respectant l'ordre des lettres et la lisibilite.",
          status: "upcoming",
        },
        {
          slug: "encoder-un-mot-simple-entendu",
          title: "Encoder un mot simple entendu",
          objective: "Ecrire un mot regulier court a partir des sons entendus.",
          status: "upcoming",
        },
        {
          slug: "ecrire-une-phrase-simple-guidee",
          title: "Ecrire une phrase simple guidee",
          objective:
            "Produire une phrase courte avec une structure donnee et un sens clair.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "in-progress",
};

const domainMathematiques: ProgramDomain = {
  id: "cp-mathematiques",
  slug: "mathematiques",
  title: "Mathematiques",
  officialLabel: "Mathematiques - Cycle 2",
  description: "Nombres, calculs simples et premiers problemes tres guides.",
  subdomains: [
    createSubdomain(
      "mathematiques",
      "nombres",
      "Nombres",
      "Construire progressivement la numeration.",
      [
        {
          slug: "denombrer-une-collection-jusqua-20",
          title: "Denombrer une collection jusqu'a 20",
          objective:
            "Compter une collection en pointant chaque element une seule fois.",
          status: "upcoming",
        },
        {
          slug: "lire-et-ecrire-les-nombres-jusqua-100",
          title: "Lire et ecrire les nombres jusqu'a 100",
          objective:
            "Associer l'ecriture chiffree, le nom oral et la quantite representee.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "mathematiques",
      "calculs",
      "Calculs simples",
      "Installer les premiers calculs additifs et soustractifs.",
      [
        {
          slug: "composer-et-decomposer-les-petits-nombres",
          title: "Composer et decomposer les petits nombres",
          objective:
            "Decomposer un nombre jusqu'a 10 en deux parties complementaires.",
          status: "upcoming",
        },
        {
          slug: "calculer-une-addition-simple",
          title: "Calculer une addition simple",
          objective:
            "Trouver la somme de deux petits nombres avec dessin, materiel ou surcomptage.",
          status: "upcoming",
        },
        {
          slug: "calculer-une-soustraction-simple",
          title: "Calculer une soustraction simple",
          objective:
            "Resoudre un retrait simple avec dessin, materiel ou comptage en arriere.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "mathematiques",
      "problemes-guides",
      "Problemes tres guides",
      "Entrer dans la resolution de problemes par des situations courtes.",
      [
        {
          slug: "resoudre-un-probleme-additif-guide",
          title: "Resoudre un probleme additif guide",
          objective:
            "Identifier une situation ou l'on ajoute et choisir un calcul adapte.",
          status: "upcoming",
        },
        {
          slug: "resoudre-un-probleme-de-retrait-guide",
          title: "Resoudre un probleme de retrait guide",
          objective:
            "Identifier une situation ou l'on enleve et choisir un calcul adapte.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "upcoming",
};

const domainQuestionnerLeMonde: ProgramDomain = {
  id: "cp-questionner-le-monde",
  slug: "questionner-le-monde",
  title: "Questionner le monde",
  officialLabel: "Questionner le monde - Cycle 2",
  description:
    "Observer le vivant, se reperer dans le temps et l'espace, et commencer a decrire le monde proche.",
  subdomains: [
    createSubdomain(
      "questionner-le-monde",
      "vivant",
      "Le vivant",
      "Observer et decrire quelques caracteristiques du vivant.",
      [
        {
          slug: "observer-et-decrire-un-animal-ou-une-plante",
          title: "Observer et decrire un animal ou une plante",
          objective:
            "Nommer et decrire quelques caracteristiques visibles d'un etre vivant.",
          status: "upcoming",
        },
        {
          slug: "reconnaitre-les-besoins-dun-etre-vivant",
          title: "Reconnaitre les besoins d'un etre vivant",
          objective:
            "Identifier quelques besoins simples d'un animal ou d'une plante.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "questionner-le-monde",
      "temps",
      "Temps",
      "Construire les premiers reperes temporels de la journee et de la semaine.",
      [
        {
          slug: "ordonner-des-evenements-de-la-journee",
          title: "Ordonner des evenements de la journee",
          objective:
            "Placer quelques moments de la journee dans un ordre chronologique.",
          status: "upcoming",
        },
        {
          slug: "se-reperer-dans-la-semaine",
          title: "Se reperer dans la semaine",
          objective:
            "Nommer les jours et situer hier, aujourd'hui et demain.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "questionner-le-monde",
      "espace",
      "Espace",
      "Se situer et situer des objets dans l'espace proche.",
      [
        {
          slug: "utiliser-le-vocabulaire-de-position",
          title: "Utiliser le vocabulaire de position",
          objective:
            "Employer devant, derriere, entre, a gauche et a droite dans une situation simple.",
          status: "upcoming",
        },
        {
          slug: "decrire-un-deplacement-court",
          title: "Decrire un deplacement court",
          objective:
            "Dire un court trajet avec des reperes spatiaux simples.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "upcoming",
};

const domainArts: ProgramDomain = {
  id: "cp-arts",
  slug: "arts",
  title: "Arts",
  officialLabel: "Enseignements artistiques - Cycle 2",
  description:
    "Explorer des gestes plastiques, ecouter, chanter et exprimer un ressenti artistique.",
  subdomains: [
    createSubdomain(
      "arts",
      "arts-plastiques",
      "Arts plastiques",
      "Experimenter des gestes, des outils et des matieres.",
      [
        {
          slug: "experimenter-des-traces-et-des-couleurs",
          title: "Experimenter des traces et des couleurs",
          objective:
            "Produire des traces variees avec un outil choisi et nommer l'effet obtenu.",
          status: "upcoming",
        },
        {
          slug: "composer-une-image-simple",
          title: "Composer une image simple",
          objective:
            "Organiser quelques formes ou couleurs pour produire une image lisible.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "arts",
      "education-musicale",
      "Education musicale",
      "Ecouter, chanter et reperer quelques parametres sonores.",
      [
        {
          slug: "chanter-avec-le-groupe",
          title: "Chanter avec le groupe",
          objective:
            "Participer a un chant collectif en respectant le depart et l'arret.",
          status: "upcoming",
        },
        {
          slug: "decrire-un-son-entendu",
          title: "Decrire un son entendu",
          objective:
            "Dire si un son est fort ou doux, long ou court, aigu ou grave.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "upcoming",
};

const domainEps: ProgramDomain = {
  id: "cp-eps",
  slug: "eps",
  title: "EPS",
  officialLabel: "Education physique et sportive - Cycle 2",
  description:
    "Agir, s'exprimer avec son corps, cooperer et respecter des regles simples.",
  subdomains: [
    createSubdomain(
      "eps",
      "motricite",
      "Motricite",
      "Developper les actions motrices fondamentales.",
      [
        {
          slug: "courir-sauter-lancer-dans-un-parcours",
          title: "Courir, sauter, lancer dans un parcours",
          objective:
            "Enchainer des actions motrices simples en respectant un parcours.",
          status: "upcoming",
        },
        {
          slug: "adapter-son-equilibre",
          title: "Adapter son equilibre",
          objective:
            "Maintenir son equilibre dans une situation motrice simple.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "eps",
      "jeux-collectifs",
      "Jeux collectifs",
      "Cooperer et respecter les premieres regles de jeu.",
      [
        {
          slug: "respecter-une-regle-de-jeu-simple",
          title: "Respecter une regle de jeu simple",
          objective:
            "Appliquer une regle courte pendant un jeu collectif.",
          status: "upcoming",
        },
        {
          slug: "cooperer-avec-un-partenaire",
          title: "Cooperer avec un partenaire",
          objective:
            "Agir avec un camarade pour atteindre un but commun simple.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "upcoming",
};

const domainEmc: ProgramDomain = {
  id: "cp-emc",
  slug: "emc",
  title: "EMC",
  officialLabel: "Enseignement moral et civique - Cycle 2",
  description:
    "Comprendre la vie de classe, identifier les emotions et adopter des gestes citoyens simples.",
  subdomains: [
    createSubdomain(
      "emc",
      "vie-de-classe",
      "Vie de classe",
      "Prendre sa place dans le collectif et respecter les regles communes.",
      [
        {
          slug: "respecter-une-regle-de-classe",
          title: "Respecter une regle de classe",
          objective:
            "Identifier une regle commune et l'appliquer dans une situation de classe.",
          status: "in-progress",
        },
        {
          slug: "ecouter-la-parole-dun-camarade",
          title: "Ecouter la parole d'un camarade",
          objective:
            "Attendre son tour et tenir compte de ce qu'un camarade exprime.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "emc",
      "sensibilite",
      "Sensibilite",
      "Nommer les emotions et reconnaitre celles des autres.",
      [
        {
          slug: "nommer-une-emotion-simple",
          title: "Nommer une emotion simple",
          objective:
            "Associer une emotion a une situation vecue ou observee.",
          status: "upcoming",
        },
        {
          slug: "demander-de-laide-avec-des-mots",
          title: "Demander de l'aide avec des mots",
          objective:
            "Formuler un besoin ou une demande d'aide de maniere claire.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "in-progress",
};

export const cpLearningTree: AcademyLevelProgram = {
  levelSlug: "cp",
  label: "CP",
  cycle: "cycle-2",
  stage: "primaire",
  characterLink: {
    characterSlug: "kiwi",
    name: "Kiwi",
    roleHint:
      "Kiwi accompagne les premiers pas dans le decodage, l'ecriture et les nombres.",
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

const cpSubjectAccents: Record<string, string> = {
  francais: "jade",
  mathematiques: "gold",
  "questionner-le-monde": "sky",
  arts: "ember",
  eps: "jade",
  emc: "sky",
};

export const cpSubjects: CpSubjectSummary[] = cpLearningTree.domains.map(
  (domain) => ({
    slug: domain.slug,
    title: domain.title,
    shortDescription: domain.description ?? "Programme CP en structuration.",
    domains: domain.subdomains.map((subdomain) => subdomain.title),
    status: domain.status,
    accent: cpSubjectAccents[domain.slug] ?? "jade",
  }),
);

export function getCpSubjectBySlug(slug: string): CpSubjectSummary | undefined {
  return cpSubjects.find((subject) => subject.slug === slug);
}

export function getCpSubjectTree(slug: string): CpSubjectNode | undefined {
  return getCpDomain(slug);
}

export function getCpDomain(domainSlug: string): ProgramDomain | undefined {
  return cpLearningTree.domains.find((domain) => domain.slug === domainSlug);
}

export function getCpSubdomain(
  domainSlug: string,
  subdomainSlug: string,
): ProgramSubdomain | undefined {
  return getCpDomain(domainSlug)?.subdomains.find(
    (subdomain) => subdomain.slug === subdomainSlug,
  );
}

export function getCpLesson(
  domainSlug: string,
  subdomainSlug: string,
  lessonSlug: string,
): Lesson | undefined {
  return getCpSubdomain(domainSlug, subdomainSlug)?.lessons.find(
    (lesson) => lesson.slug === lessonSlug,
  );
}

export function getCpLessonById(lessonId: string): Lesson | undefined {
  for (const domain of cpLearningTree.domains) {
    for (const subdomain of domain.subdomains) {
      const found = subdomain.lessons.find((lesson) => lesson.id === lessonId);
      if (found) return found;
    }
  }
  return undefined;
}
