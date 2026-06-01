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

// ── Français ──────────────────────────────────────────────────────────────────

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
      "Décodage",
      "Entrer progressivement dans le code alphabetique.",
      [
        {
          slug: "reconnaitre-les-lettres-et-les-sons-frequents",
          title: "Reconnaître les lettres et les sons fréquents",
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
          title: "Lire des mots réguliers courts",
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
          title: "Lire des mots avec digraphes fréquents",
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
          title: "Lire des mots fréquents sans segmenter",
          objective:
            "Reconnaitre rapidement des mots tres frequents deja rencontres.",
          status: "upcoming",
        },
        {
          slug: "lire-une-phrase-courte-avec-fluidite",
          title: "Lire une phrase courte avec fluidité",
          objective:
            "Lire une phrase courte en respectant l'ordre des mots et une prosodie simple.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "francais",
      "comprehension",
      "Compréhension orale puis écrite",
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
          title: "Prélever une information dans une phrase lue",
          objective:
            "Repondre a une question simple a partir d'une phrase decodee.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "francais",
      "ecriture",
      "Écriture de mots et phrases",
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
          title: "Écrire une phrase simple guidée",
          objective:
            "Produire une phrase courte avec une structure donnee et un sens clair.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "francais",
      "langage-oral",
      "Langage oral",
      "Prendre la parole, ecouter, echanger.",
      [
        {
          slug: "prendre-la-parole-en-classe",
          title: "Prendre la parole en classe",
          objective:
            "S'exprimer de facon audible et comprehensible devant le groupe classe.",
          status: "upcoming",
        },
        {
          slug: "ecouter-et-reformuler",
          title: "Écouter et reformuler",
          objective:
            "Reformuler avec ses propres mots ce qu'un autre a dit ou lu.",
          status: "upcoming",
        },
        {
          slug: "raconter-un-evenement-vecu",
          title: "Raconter un événement vécu",
          objective:
            "Relater un fait en respectant un ordre chronologique simple.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "in-progress",
};

// ── Mathématiques ─────────────────────────────────────────────────────────────

const domainMathematiques: ProgramDomain = {
  id: "cp-mathematiques",
  slug: "mathematiques",
  title: "Mathématiques",
  officialLabel: "Mathématiques - Cycle 2",
  description: "Nombres, calculs simples et premiers problemes tres guides.",
  subdomains: [
    createSubdomain(
      "mathematiques",
      "nombres",
      "Nombres jusqu'à 100",
      "Construire progressivement la numeration jusqu'a 100.",
      [
        {
          slug: "denombrer-une-collection-jusqua-20",
          title: "Dénombrer une collection jusqu'à 20",
          objective:
            "Compter une collection en pointant chaque element une seule fois.",
          status: "upcoming",
        },
        {
          slug: "lire-et-ecrire-les-nombres-jusqua-100",
          title: "Lire et écrire les nombres jusqu'à 100",
          objective:
            "Associer l'ecriture chiffree, le nom oral et la quantite representee.",
          status: "upcoming",
        },
        {
          slug: "comparer-et-ordonner-des-nombres",
          title: "Comparer et ordonner des nombres",
          objective:
            "Placer des nombres sur une droite graduee et les ordonner du plus petit au plus grand.",
          status: "upcoming",
        },
        {
          slug: "comprendre-la-valeur-des-dizaines-et-unites",
          title: "Comprendre dizaines et unités",
          objective:
            "Identifier la valeur positionnelle d'un chiffre dans un nombre a deux chiffres.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "mathematiques",
      "calcul",
      "Calcul",
      "Installer les premiers calculs additifs et soustractifs.",
      [
        {
          slug: "composer-et-decomposer-les-petits-nombres",
          title: "Composer et décomposer les petits nombres",
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
        {
          slug: "memoriser-les-faits-numeriques-fondamentaux",
          title: "Mémoriser les faits numériques fondamentaux",
          objective:
            "Connaitre par coeur les decompositions de 10 et les doubles jusqu'a 10.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "mathematiques",
      "problemes",
      "Résolution de problèmes",
      "Entrer dans la resolution de problemes par des situations courtes.",
      [
        {
          slug: "resoudre-un-probleme-additif-guide",
          title: "Résoudre un problème additif guidé",
          objective:
            "Identifier une situation ou l'on ajoute et choisir un calcul adapte.",
          status: "upcoming",
        },
        {
          slug: "resoudre-un-probleme-de-retrait-guide",
          title: "Résoudre un problème de retrait guidé",
          objective:
            "Identifier une situation ou l'on enleve et choisir un calcul adapte.",
          status: "upcoming",
        },
        {
          slug: "resoudre-un-probleme-de-comparaison",
          title: "Résoudre un problème de comparaison",
          objective:
            "Trouver la difference entre deux quantites dans une situation concrete.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "mathematiques",
      "geometrie",
      "Géométrie et espace",
      "Reconnaitre des formes et se reperer dans l'espace.",
      [
        {
          slug: "reconnaitre-les-figures-simples",
          title: "Reconnaître les figures simples",
          objective:
            "Nommer et distinguer le carre, le rectangle, le triangle et le cercle.",
          status: "upcoming",
        },
        {
          slug: "se-reperer-dans-lespace",
          title: "Se repérer dans l'espace",
          objective:
            "Utiliser les termes devant, derriere, a gauche, a droite, dessus, dessous.",
          status: "upcoming",
        },
        {
          slug: "reproduire-un-trace-simple",
          title: "Reproduire un tracé simple",
          objective:
            "Copier un chemin ou un trace sur quadrillage en respectant la forme.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "mathematiques",
      "mesures",
      "Grandeurs et mesures",
      "Comparer, estimer et mesurer des grandeurs simples.",
      [
        {
          slug: "comparer-des-longueurs",
          title: "Comparer des longueurs",
          objective:
            "Ranger des objets du plus court au plus long par comparaison directe ou par report.",
          status: "upcoming",
        },
        {
          slug: "se-reperer-dans-le-temps-quotidien",
          title: "Se repérer dans le temps quotidien",
          objective:
            "Situer des moments de la journee et comprendre la succession matin, midi, soir.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "upcoming",
};

// ── Questionner le monde ──────────────────────────────────────────────────────

const domainQuestionnerLeMonde: ProgramDomain = {
  id: "cp-questionner-le-monde",
  slug: "questionner-le-monde",
  title: "Questionner le monde",
  officialLabel: "Questionner le monde - Cycle 2",
  description:
    "Observer le vivant, la matiere et les objets ; se reperer dans l'espace et le temps.",
  subdomains: [
    createSubdomain(
      "questionner-le-monde",
      "vivant",
      "Le vivant",
      "Observer et questionner les etres vivants.",
      [
        {
          slug: "distinguer-le-vivant-du-non-vivant",
          title: "Distinguer le vivant du non-vivant",
          objective:
            "Classer des objets et des etres selon qu'ils sont vivants ou non.",
          status: "upcoming",
        },
        {
          slug: "observer-la-croissance-dun-etre-vivant",
          title: "Observer la croissance d'un être vivant",
          objective:
            "Decrire les changements observes sur une plante ou un animal au fil du temps.",
          status: "upcoming",
        },
        {
          slug: "identifier-les-besoins-des-etres-vivants",
          title: "Identifier les besoins des êtres vivants",
          objective:
            "Nommer les besoins fondamentaux d'une plante ou d'un animal : eau, lumiere, nourriture.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "questionner-le-monde",
      "matiere-objets",
      "Matière et objets",
      "Explorer les proprietes de la matiere et le fonctionnement des objets.",
      [
        {
          slug: "observer-et-decrire-des-materiaux",
          title: "Observer et décrire des matériaux",
          objective:
            "Comparer des materiaux selon des proprietes observables : dur, mou, transparent, opaque.",
          status: "upcoming",
        },
        {
          slug: "comprendre-a-quoi-sert-un-objet-technique",
          title: "Comprendre à quoi sert un objet technique",
          objective:
            "Identifier la fonction principale d'un objet technique de la vie quotidienne.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "questionner-le-monde",
      "espace-temps",
      "Espace et temps",
      "Se reperer dans l'espace et dans le temps.",
      [
        {
          slug: "se-situer-dans-son-environnement-proche",
          title: "Se situer dans son environnement proche",
          objective:
            "Decrire le trajet entre la maison et l'ecole en nommant les lieux principaux.",
          status: "upcoming",
        },
        {
          slug: "situer-des-evenements-sur-une-frise-chronologique",
          title: "Situer des événements sur une frise chronologique",
          objective:
            "Placer des evenements de la vie quotidienne ou de la classe sur une frise simple.",
          status: "upcoming",
        },
        {
          slug: "comparer-le-passe-et-le-present",
          title: "Comparer le passé et le présent",
          objective:
            "Reperer des differences entre un objet, un lieu ou une pratique d'autrefois et d'aujourd'hui.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "upcoming",
};

// ── Enseignements artistiques ─────────────────────────────────────────────────

const domainArts: ProgramDomain = {
  id: "cp-arts",
  slug: "arts",
  title: "Enseignements artistiques",
  officialLabel: "Enseignements artistiques - Cycle 2",
  description: "Arts plastiques et education musicale.",
  subdomains: [
    createSubdomain(
      "arts",
      "arts-plastiques",
      "Arts plastiques",
      "Produire, observer et nommer des oeuvres.",
      [
        {
          slug: "produire-une-image-en-choisissant-des-couleurs",
          title: "Produire une image en choisissant des couleurs",
          objective:
            "Realiser une composition plastique en faisant des choix de couleurs intentionnels.",
          status: "upcoming",
        },
        {
          slug: "decrire-une-oeuvre-avec-des-mots-simples",
          title: "Décrire une œuvre avec des mots simples",
          objective:
            "Exprimer ce qu'on voit et ce que l'on ressent face a une image ou une oeuvre.",
          status: "upcoming",
        },
        {
          slug: "experimenter-differents-outils-et-techniques",
          title: "Expérimenter différents outils et techniques",
          objective:
            "Utiliser au moins deux outils ou supports differents pour creer une production.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "arts",
      "education-musicale",
      "Éducation musicale",
      "Ecouter, chanter et explorer les sons.",
      [
        {
          slug: "chanter-une-chanson-en-groupe",
          title: "Chanter une chanson en groupe",
          objective:
            "Memoriser et interpreter une courte chanson en respectant le rythme et les paroles.",
          status: "upcoming",
        },
        {
          slug: "distinguer-des-contrastes-sonores",
          title: "Distinguer des contrastes sonores",
          objective:
            "Percevoir et nommer les contrastes fort/doux, aigu/grave, rapide/lent dans une piece musicale.",
          status: "upcoming",
        },
        {
          slug: "produire-des-sons-avec-son-corps-ou-des-objets",
          title: "Produire des sons avec son corps ou des objets",
          objective:
            "Explorer les possibilites sonores de son corps et d'objets du quotidien.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "upcoming",
};

// ── EPS ───────────────────────────────────────────────────────────────────────

const domainEps: ProgramDomain = {
  id: "cp-eps",
  slug: "eps",
  title: "EPS",
  officialLabel: "Éducation physique et sportive - Cycle 2",
  description:
    "Developper ses habiletes motrices, cooperer et respecter les regles.",
  subdomains: [
    createSubdomain(
      "eps",
      "habiletes-motrices",
      "Habiletés motrices",
      "Maitriser les actions motrices fondamentales.",
      [
        {
          slug: "courir-sauter-lancer",
          title: "Courir, sauter, lancer",
          objective:
            "Realiser les actions de base en adaptant son deplacement a la situation.",
          status: "upcoming",
        },
        {
          slug: "se-deplacer-en-variant-les-appuis",
          title: "Se déplacer en variant les appuis",
          objective:
            "Ramper, rouler, grimper en controlant son corps dans differentes postures.",
          status: "upcoming",
        },
        {
          slug: "manipuler-un-engin-ou-un-objet",
          title: "Manipuler un engin ou un objet",
          objective:
            "Attraper, envoyer, faire rebondir un ballon avec une main ou les deux mains.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "eps",
      "cooperation-regles",
      "Coopération et règles",
      "Jouer ensemble en respectant les regles.",
      [
        {
          slug: "respecter-les-regles-dun-jeu-collectif",
          title: "Respecter les règles d'un jeu collectif",
          objective:
            "Participer a un jeu en appliquant les regles convenues avec la classe.",
          status: "upcoming",
        },
        {
          slug: "cooperer-avec-ses-camarades",
          title: "Coopérer avec ses camarades",
          objective:
            "Agir avec les autres pour atteindre un but commun dans un jeu ou un defi.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "upcoming",
};

// ── EMC ───────────────────────────────────────────────────────────────────────

const domainEmc: ProgramDomain = {
  id: "cp-emc",
  slug: "emc",
  title: "EMC",
  officialLabel: "Enseignement moral et civique - Cycle 2",
  description: "Vivre ensemble, comprendre ses droits et ses devoirs.",
  subdomains: [
    createSubdomain(
      "emc",
      "vivre-ensemble",
      "Vivre ensemble",
      "Comprendre et pratiquer les regles de la vie collective.",
      [
        {
          slug: "respecter-les-regles-de-vie-de-classe",
          title: "Respecter les règles de vie de classe",
          objective:
            "Identifier et appliquer les regles communes de la classe.",
          status: "upcoming",
        },
        {
          slug: "cooperer-et-aider",
          title: "Coopérer et aider",
          objective:
            "Proposer son aide, partager le materiel et travailler en groupe.",
          status: "upcoming",
        },
        {
          slug: "resoudre-un-conflit-par-le-dialogue",
          title: "Résoudre un conflit par le dialogue",
          objective:
            "Exprimer son desaccord avec des mots et chercher un arrangement.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "emc",
      "droits-devoirs",
      "Droits et devoirs",
      "Decouvrir ce qu'est la citoyennete a l'echelle de l'ecole.",
      [
        {
          slug: "connaitre-ses-droits-et-ses-devoirs-a-lecole",
          title: "Connaître ses droits et ses devoirs à l'école",
          objective:
            "Nommer au moins un droit et un devoir de l'eleve a l'ecole.",
          status: "upcoming",
        },
        {
          slug: "comprendre-la-notion-degalite",
          title: "Comprendre la notion d'égalité",
          objective:
            "Reconnaitre des situations justes ou injustes dans des cas simples de la vie scolaire.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "upcoming",
};

// ── Programme CP complet ──────────────────────────────────────────────────────

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
