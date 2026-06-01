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
  domains: [domainFrancais, domainMathematiques],
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
