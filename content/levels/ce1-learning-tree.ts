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
  description:
    "Explorer le vivant, la matiere, les objets, l'espace et le temps.",
  subdomains: [
    createSubdomain(
      "questionner-le-monde",
      "vivant",
      "Le vivant",
      "Observer et comprendre les etres vivants et leurs milieux.",
      [
        {
          slug: "distinguer-vivant-et-non-vivant",
          title: "Distinguer le vivant du non-vivant",
          objective:
            "Classer des objets ou des etres en utilisant les criteres du vivant : nutrition, croissance, reproduction.",
          status: "upcoming",
        },
        {
          slug: "decrire-un-cycle-de-vie-simple",
          title: "Decrire un cycle de vie simple",
          objective:
            "Remettre en ordre les etapes de vie d'un animal ou d'une plante familier.",
          status: "upcoming",
        },
        {
          slug: "identifier-les-besoins-des-etres-vivants",
          title: "Identifier les besoins des etres vivants",
          objective:
            "Nommer les besoins en eau, lumiere et nourriture d'un etre vivant observe.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "questionner-le-monde",
      "matiere-et-objets",
      "Matiere et objets",
      "Explorer les proprietes des materiaux et les etats de la matiere.",
      [
        {
          slug: "distinguer-les-etats-de-la-matiere",
          title: "Distinguer les etats de la matiere",
          objective:
            "Classer une substance comme solide, liquide ou gazeux a partir de ses proprietes observables.",
          status: "upcoming",
        },
        {
          slug: "identifier-les-materiaux-et-leurs-proprietes",
          title: "Identifier les materiaux et leurs proprietes",
          objective:
            "Nommer des materiaux courants et associer une propriete utile : rigide, souple, transparent, conducteur.",
          status: "upcoming",
        },
        {
          slug: "decrire-un-changement-d-etat-simple",
          title: "Decrire un changement d'etat simple",
          objective:
            "Nommer la fusion ou la solidification et les relier a une variation de temperature.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "questionner-le-monde",
      "espace-et-temps",
      "Espace et temps",
      "Se situer dans l'espace et dans le temps.",
      [
        {
          slug: "se-situer-dans-la-journee-et-la-semaine",
          title: "Se situer dans la journee et la semaine",
          objective:
            "Utiliser les notions de matin, midi, apres-midi, hier, aujourd'hui, demain pour se reperer.",
          status: "upcoming",
        },
        {
          slug: "utiliser-une-frise-chronologique-simple",
          title: "Utiliser une frise chronologique simple",
          objective:
            "Placer des evenements dans l'ordre sur une frise et lire une date simple.",
          status: "upcoming",
        },
        {
          slug: "se-reperer-sur-un-plan-simple",
          title: "Se reperer sur un plan simple",
          objective:
            "Localiser un lieu sur un plan de salle de classe ou d'ecole en utilisant des reperes.",
          status: "upcoming",
        },
      ],
    ),
  ],
  status: "upcoming",
};

const domainEnseignementsArtistiques: ProgramDomain = {
  id: "ce1-arts",
  slug: "arts",
  title: "Enseignements artistiques",
  officialLabel: "Enseignements artistiques - Cycle 2",
  description:
    "Arts plastiques et education musicale : percevoir, produire, partager.",
  subdomains: [
    createSubdomain(
      "arts",
      "arts-plastiques",
      "Arts plastiques",
      "Produire et observer des images, des objets et des volumes.",
      [
        {
          slug: "utiliser-les-couleurs-primaires-et-secondaires",
          title: "Utiliser les couleurs primaires et secondaires",
          objective:
            "Melanges et identifier les couleurs primaires et produire des couleurs secondaires simples.",
          status: "upcoming",
        },
        {
          slug: "decrire-une-oeuvre-avec-un-vocabulaire-simple",
          title: "Decrire une oeuvre avec un vocabulaire simple",
          objective:
            "Nommer ce que l'on voit dans une image en utilisant les mots : couleur, forme, ligne, personnage.",
          status: "upcoming",
        },
        {
          slug: "realiser-une-composition-plastique",
          title: "Realiser une composition plastique",
          objective:
            "Organiser des elements visuels dans un espace pour produire une image intentionnelle.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "arts",
      "education-musicale",
      "Education musicale",
      "Ecouter, chanter et explorer les sons.",
      [
        {
          slug: "distinguer-les-parametres-du-son",
          title: "Distinguer les parametres du son",
          objective:
            "Identifier des differences de hauteur, de duree et d'intensite dans des sons ecoutes.",
          status: "upcoming",
        },
        {
          slug: "memoriser-et-interpreter-un-chant-simple",
          title: "Memoriser et interpreter un chant simple",
          objective:
            "Chanter un chant court en respectant le texte, la melodie et le tempo.",
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
  description:
    "Developper les habiletes motrices, la cooperation et la connaissance de soi.",
  subdomains: [
    createSubdomain(
      "eps",
      "habiletes-motrices",
      "Habiletes motrices",
      "Maitriser des actions motrices fondamentales.",
      [
        {
          slug: "courir-sauter-lancer-avec-aisance",
          title: "Courir, sauter, lancer avec aisance",
          objective:
            "Realiser des actions de locomotion et de manipulation avec une technique adaptee.",
          status: "upcoming",
        },
        {
          slug: "s-equilibrer-et-se-deplacer-de-facon-variee",
          title: "S'equilibrer et se deplacer de facon variee",
          objective:
            "Adapter son deplacement aux contraintes de l'espace et du rythme.",
          status: "upcoming",
        },
        {
          slug: "enchainer-deux-actions-motrices",
          title: "Enchainer deux actions motrices",
          objective:
            "Realiser une sequence motrice simple en coordonnant deux gestes consecutifs.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "eps",
      "jeux-et-sports-collectifs",
      "Jeux et sports collectifs",
      "Cooperer, s'opposer et respecter les regles du jeu.",
      [
        {
          slug: "cooperer-avec-des-partenaires",
          title: "Cooperer avec des partenaires",
          objective:
            "Jouer avec d'autres en partageant le ballon ou le role pour atteindre un but commun.",
          status: "upcoming",
        },
        {
          slug: "respecter-les-regles-d-un-jeu-collectif",
          title: "Respecter les regles d'un jeu collectif",
          objective:
            "Jouer en acceptant les regles, les roles et la decision de l'arbitre.",
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
  description:
    "Construire le respect de soi et des autres, comprendre les regles de vie commune.",
  subdomains: [
    createSubdomain(
      "emc",
      "respect-et-regles-de-vie",
      "Respect et regles de vie",
      "Comprendre et appliquer les regles de vie en collectivite.",
      [
        {
          slug: "identifier-et-respecter-les-regles-de-la-classe",
          title: "Identifier et respecter les regles de la classe",
          objective:
            "Nommer les regles de vie de la classe et expliquer pourquoi elles existent.",
          status: "upcoming",
        },
        {
          slug: "exprimer-son-desaccord-sans-violence",
          title: "Exprimer son desaccord sans violence",
          objective:
            "Dire ce qui ne va pas avec des mots plutot qu'avec des gestes.",
          status: "upcoming",
        },
        {
          slug: "participer-a-une-decision-collective-simple",
          title: "Participer a une decision collective simple",
          objective:
            "Proposer, ecouter et accepter le resultat d'une decision prise en groupe.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "emc",
      "identite-et-citoyennete",
      "Identite et citoyennete",
      "Se decouvrir comme membre d'un groupe et d'une communaute.",
      [
        {
          slug: "decrire-ses-droits-et-ses-devoirs-d-eleve",
          title: "Decrire ses droits et ses devoirs d'eleve",
          objective:
            "Associer un droit (apprendre, etre respecte) a un devoir correspondant (travailler, respecter l'autre).",
          status: "upcoming",
        },
        {
          slug: "reconnaitre-les-symboles-de-la-republique",
          title: "Reconnaitre les symboles de la Republique",
          objective:
            "Nommer le drapeau, la Marseillaise et la devise et expliquer leur sens simplement.",
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
