// Arbre pedagogique CP - Cycle 2, primaire.
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
  title: "Francais",
  officialLabel: "Francais - Cycle 2",
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
      "Comprehension orale puis ecrite",
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
        {
          slug: "comparer-deux-quantites",
          title: "Comparer deux quantites",
          objective:
            "Dire quelle collection contient le plus ou le moins d'objets.",
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
    createSubdomain(
      "mathematiques",
      "geometrie",
      "Geometrie",
      "Se reperer dans l'espace et reconnaitre les premieres figures.",
      [
        {
          slug: "se-reperer-dans-lespace-de-la-feuille",
          title: "Se reperer dans l'espace de la feuille",
          objective: "Utiliser haut, bas, gauche, droite, milieu.",
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
  description: "Premiers questionnements sur le vivant, la matiere, le temps et l'espace.",
  subdomains: [
    createSubdomain(
      "questionner-le-monde",
      "monde-vivant",
      "Le monde vivant",
      "Observer et distinguer le vivant du non-vivant.",
      [
        {
          slug: "distinguer-vivant-et-non-vivant",
          title: "Distinguer le vivant du non-vivant",
          objective:
            "L'eleve classe des elements en vivants ou non-vivants en s'appuyant sur des criteres simples.",
          status: "upcoming",
        },
        {
          slug: "observer-une-croissance-vegetale",
          title: "Observer une croissance vegetale",
          objective:
            "L'eleve observe et decrit les etapes de la pousse d'une plante au fil du temps.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "questionner-le-monde",
      "matiere-et-objets",
      "Matiere et objets",
      "Explorer les proprietes simples des matieres et des objets.",
      [
        {
          slug: "classer-des-matieres",
          title: "Classer des matieres selon leurs proprietes",
          objective:
            "L'eleve observe des matieres et les classe selon un critere simple (dur, souple, transparent...).",
          status: "upcoming",
        },
        {
          slug: "decrire-un-objet-technique",
          title: "Decrire un objet technique simple",
          objective:
            "L'eleve nomme les parties d'un objet simple et explique a quoi chacune sert.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "questionner-le-monde",
      "temps-et-espace",
      "Temps et espace",
      "Se reperer dans le temps de la semaine et dans l'espace proche.",
      [
        {
          slug: "se-reperer-dans-la-semaine",
          title: "Se reperer dans la semaine",
          objective:
            "L'eleve nomme les jours de la semaine dans l'ordre et situe une activite dans la journee.",
          status: "upcoming",
        },
        {
          slug: "situer-son-ecole-dans-l-espace",
          title: "Situer son ecole dans l'espace proche",
          objective:
            "L'eleve indique ou se trouve son ecole par rapport a des reperes connus.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "upcoming",
};

const domainEnseignementsArtistiques: ProgramDomain = {
  id: "cp-enseignements-artistiques",
  slug: "enseignements-artistiques",
  title: "Enseignements artistiques",
  officialLabel: "Enseignements artistiques - Cycle 2",
  description: "Premiers gestes artistiques : arts plastiques et education musicale.",
  subdomains: [
    createSubdomain(
      "enseignements-artistiques",
      "arts-plastiques",
      "Arts plastiques",
      "Explorer les couleurs, les matieres et les outils pour creer.",
      [
        {
          slug: "explorer-couleurs-et-matieres",
          title: "Explorer les couleurs et les matieres",
          objective:
            "L'eleve experimente differents outils et matieres pour produire des effets plastiques varies.",
          status: "upcoming",
        },
        {
          slug: "creer-une-composition-simple",
          title: "Creer une composition simple",
          objective:
            "L'eleve organise des formes et des couleurs dans un espace de production.",
          status: "upcoming",
        },
        {
          slug: "decrire-une-production",
          title: "Decrire une production plastique",
          objective:
            "L'eleve dit ce qu'il voit dans une image ou une production en utilisant des mots simples.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "enseignements-artistiques",
      "education-musicale",
      "Education musicale",
      "Chanter et ecouter des extraits musicaux.",
      [
        {
          slug: "chanter-en-respectant-le-tempo",
          title: "Chanter en respectant le tempo",
          objective:
            "L'eleve chante une chanson apprise en respectant le rythme et le tempo collectif.",
          status: "upcoming",
        },
        {
          slug: "memoriser-une-courte-chanson",
          title: "Memoriser une courte chanson",
          objective:
            "L'eleve retient les paroles et la melodie d'une chanson courte.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "upcoming",
};

const domainEPS: ProgramDomain = {
  id: "cp-eps",
  slug: "eps",
  title: "EPS",
  officialLabel: "Education physique et sportive - Cycle 2",
  description: "Premiers apprentissages moteurs : courir, lancer, jouer ensemble.",
  subdomains: [
    createSubdomain(
      "eps",
      "activites-motrices",
      "Activites motrices de base",
      "Courir, lancer et sauter en securite.",
      [
        {
          slug: "courir-et-sarreter-en-securite",
          title: "Courir et s'arreter en securite",
          objective:
            "L'eleve court, change de direction et s'arrete sur un signal sans mettre en danger.",
          status: "upcoming",
        },
        {
          slug: "lancer-et-attraper",
          title: "Lancer et attraper un engin",
          objective:
            "L'eleve lance un engin vers une cible et tente de l'attraper.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "eps",
      "jeux-collectifs",
      "Jeux collectifs",
      "Jouer ensemble en respectant des regles simples.",
      [
        {
          slug: "respecter-les-regles-d-un-jeu",
          title: "Respecter les regles d'un jeu simple",
          objective:
            "L'eleve comprend et applique les regles d'un jeu collectif simple.",
          status: "upcoming",
        },
        {
          slug: "agir-avec-ses-partenaires",
          title: "Agir avec ses partenaires",
          objective:
            "L'eleve aide ses partenaires et cherche a cooperer pour reussir le jeu.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "upcoming",
};

const domainEMC: ProgramDomain = {
  id: "cp-emc",
  slug: "emc",
  title: "EMC",
  officialLabel: "Enseignement moral et civique - Cycle 2",
  description: "Premiers reperes pour vivre ensemble et connaitre la Republique.",
  subdomains: [
    createSubdomain(
      "emc",
      "vie-collective",
      "Vie collective",
      "Comprendre et respecter les regles de la vie de classe.",
      [
        {
          slug: "respecter-les-regles-de-classe",
          title: "Respecter les regles de la classe",
          objective:
            "L'eleve connait les regles de la classe et les applique en situation.",
          status: "upcoming",
        },
        {
          slug: "ecouter-et-attendre-son-tour",
          title: "Ecouter et attendre son tour",
          objective:
            "L'eleve ecoute sans couper la parole et attend son tour pour s'exprimer.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "emc",
      "premiers-reperes-civiques",
      "Premiers reperes civiques",
      "Connaitre quelques symboles et valeurs de la Republique.",
      [
        {
          slug: "reconnaitre-les-symboles-de-la-republique",
          title: "Reconnaitre les symboles de la Republique",
          objective:
            "L'eleve nomme quelques symboles de la Republique francaise (drapeau, hymne, devise).",
          status: "upcoming",
        },
        {
          slug: "distinguer-droits-et-devoirs-simples",
          title: "Distinguer droits et devoirs simples",
          objective:
            "L'eleve donne un exemple de droit et un exemple de devoir dans la vie de classe.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "upcoming",
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
      "Kiwi accompagne les premiers pas dans le decodage, l'ecriture, les nombres et le reperage.",
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

export type CpSubjectTree = {
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

export type CpSequenceEntry = {
  id: string;
  title: string;
  domain: string;
  subdomain: string;
  skill: string;
  status: ProgramStatus;
};

export function getCpSubjectTree(subjectSlug: string): CpSubjectTree | undefined {
  const domain = cpLearningTree.domains.find((d) => d.slug === subjectSlug);
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

export function getCpSequences(subjectSlug: string): CpSequenceEntry[] {
  const domain = cpLearningTree.domains.find((d) => d.slug === subjectSlug);
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
