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
  additionalLessons: Lesson[] = [],
): ProgramSubdomain {
  const sequences = definitions.map((definition) =>
    createCompetencySequence(domainSlug, slug, definition),
  );
  const hasInProgress = definitions.some(
    (definition) => definition.status === "in-progress",
  );
  const hasPartial =
    definitions.some((definition) => definition.status === "partial") ||
    additionalLessons.some((lesson) => lesson.status === "partial");

  return {
    id: `ce1-${domainSlug}-${slug}`,
    slug,
    title,
    description,
    lessons: [
      ...sequences.map((sequence) => sequence.lesson),
      ...additionalLessons,
    ],
    competencies: sequences.map((sequence) => ({
      ...sequence.competency,
      lessonIds: [
        ...sequence.competency.lessonIds,
        ...additionalLessons
          .filter((lesson) => lesson.competencyIds?.includes(sequence.competency.id))
          .map((lesson) => lesson.id),
      ],
    })),
    status: hasPartial ? "partial" : hasInProgress ? "in-progress" : "upcoming",
  };
}

const ce1ReadingTexts = [
  ["aventure-estivale", "Aventure estivale", "01_FRANCAIS_Litterature_Conte_Aventure-Estivale.pdf"],
  ["les-becs", "Les Becs", "01_FRANCAIS_Litterature_Conte_Becs.pdf"],
  ["belle-a-disparu", "Belle a disparu !", "01_FRANCAIS_Litterature_Conte_Belle-Disparu.pdf"],
  ["la-chasse-au-tresor", "La chasse au trésor", "01_FRANCAIS_Litterature_Conte_Chasse-Tresor.pdf"],
  ["eric-le-petit-porc-epic", "Éric, le petit porc-épic qui pique", "01_FRANCAIS_Litterature_Conte_Eric-Porc-Epic.pdf"],
  ["experiences-meteo-anna", "Les fabuleuses expériences météo d'Anna", "01_FRANCAIS_Litterature_Conte_Experiences-Meteo-Anna.pdf"],
  ["une-feuille-part-en-voyage", "Une feuille part en voyage", "01_FRANCAIS_Litterature_Conte_Feuille-Voyage.pdf"],
  ["les-griffes", "Les Griffes", "01_FRANCAIS_Litterature_Conte_Griffes.pdf"],
  ["premier-jour-ecole-ikru", "Premier jour d'école d'Ikru", "01_FRANCAIS_Litterature_Conte_Ikru-Premier-Jour.pdf"],
  ["le-jouet-casse", "Le jouet cassé", "01_FRANCAIS_Litterature_Conte_Jouet-Casse.pdf"],
  ["le-jouet-perdu", "Le jouet perdu", "01_FRANCAIS_Litterature_Conte_Jouet-Perdu.pdf"],
  ["les-maisons-des-animaux", "Les maisons des animaux", "01_FRANCAIS_Litterature_Conte_Maisons-Animaux.pdf"],
  ["mangouste-recherche-grenouille", "La petite mangouste recherche une grenouille", "01_FRANCAIS_Litterature_Conte_Mangouste-Grenouille.pdf"],
  ["mystere-chaussettes-manquantes", "Le Mystère des chaussettes manquantes", "01_FRANCAIS_Litterature_Conte_Mystere-Chaussettes.pdf"],
  ["grand-nettoyage-plage", "Le grand nettoyage de plage", "01_FRANCAIS_Litterature_Conte_Nettoyage-Plage.pdf"],
  ["nouveau-camarade-classe", "Le nouveau camarade de classe", "01_FRANCAIS_Litterature_Conte_Nouveau-Camarade.pdf"],
  ["la-petite-plante", "La petite plante", "01_FRANCAIS_Litterature_Conte_Petite-Plante.pdf"],
  ["les-plantes-sont-partout", "Les plantes sont partout", "01_FRANCAIS_Litterature_Conte_Plantes-Partout.pdf"],
  ["plastique-pas-chic", "Le plastique, c'est pas chic", "01_FRANCAIS_Litterature_Conte_Plastique-Chic.pdf"],
  ["poisson-ne-savait-pas-nager", "Le poisson qui ne savait pas nager", "01_FRANCAIS_Litterature_Conte_Poisson-Nager.pdf"],
  ["poochi-veut-des-amis", "Poochi veut se faire des amis", "01_FRANCAIS_Litterature_Conte_Poochi-Amis.pdf"],
  ["pranav-le-detective", "Pranav le Détective", "01_FRANCAIS_Litterature_Conte_Pranav-Detective.pdf"],
  ["une-rentree-de-reve", "Une rentrée de rêve", "01_FRANCAIS_Litterature_Conte_Rentree-Reve.pdf"],
  ["les-tresors-de-sam", "Les trésors de Sam", "01_FRANCAIS_Litterature_Conte_Tresors-Sam.pdf"],
  ["trier-reduire-reutiliser-recycler", "Trier ! Réduire, Réutiliser, Recycler", "01_FRANCAIS_Litterature_Conte_Trier-Recycler.pdf"],
] as const;

const ce1ReadingTextLessons: Lesson[] = ce1ReadingTexts.map(
  ([slug, title, filename]) => ({
    id: `ce1-francais-comprehension-lecture-${slug}`,
    slug: `lecture-${slug}`,
    title,
    objective:
      "Lire le texte intégral et repérer ses personnages, ses lieux et ses informations explicites.",
    skill: "Lire et comprendre un texte narratif ou documentaire",
    parentGuidance: emptyParentGuidance,
    successCriteria: [],
    exercises: [],
    competencyIds: [
      "ce1-francais-comprehension-identifier-les-personnages-et-les-lieux",
    ],
    resources: [
      {
        kind: "lesson-pdf",
        label: `Tapuscrit - ${title}`,
        status: "available",
        href: `/fiches/ce1/francais/lecture-comprehension/tapuscrits/${filename}`,
        audience: "student",
      },
    ],
    status: "partial",
  }),
);

const ce1LanguageAssessmentLessons: Lesson[] = [
  {
    id: "ce1-francais-etude-de-la-langue-evaluation-reconnaitre-un-nom",
    slug: "evaluation-reconnaitre-un-nom",
    title: "Évaluation : reconnaître un nom",
    objective: "Identifier les noms dans des phrases simples.",
    skill: "Identifier le nom dans une phrase",
    parentGuidance: emptyParentGuidance,
    successCriteria: [],
    exercises: [],
    competencyIds: ["ce1-francais-etude-de-la-langue-identifier-le-nom-dans-une-phrase"],
    resources: [{
      kind: "assessment-pdf",
      label: "Évaluation - Reconnaître un nom",
      status: "available",
      href: "/fiches/ce1/francais/etude-de-la-langue/evaluations/ce1-francais-reconnaitre-nom-evaluation.pdf",
      audience: "student",
    }],
    status: "partial",
  },
  {
    id: "ce1-francais-etude-de-la-langue-evaluation-nom-commun-propre",
    slug: "evaluation-nom-commun-propre",
    title: "Évaluation : nom commun et nom propre",
    objective: "Distinguer les noms communs des noms propres.",
    skill: "Identifier le nom dans une phrase",
    parentGuidance: emptyParentGuidance,
    successCriteria: [],
    exercises: [],
    competencyIds: ["ce1-francais-etude-de-la-langue-identifier-le-nom-dans-une-phrase"],
    resources: [{
      kind: "assessment-pdf",
      label: "Évaluation - Nom commun et nom propre",
      status: "available",
      href: "/fiches/ce1/francais/etude-de-la-langue/evaluations/ce1-francais-nom-commun-propre-evaluation.pdf",
      audience: "student",
    }],
    status: "partial",
  },
  {
    id: "ce1-francais-orthographe-evaluation-pluriel-regulier",
    slug: "evaluation-pluriel-regulier",
    title: "Évaluation : singulier et pluriel",
    objective: "Marquer le pluriel régulier des noms.",
    skill: "Marquer le pluriel régulier du nom",
    parentGuidance: emptyParentGuidance,
    successCriteria: [],
    exercises: [],
    competencyIds: ["ce1-francais-orthographe-marquer-le-pluriel-regulier-du-nom"],
    resources: [{
      kind: "assessment-pdf",
      label: "Évaluation - Singulier et pluriel",
      status: "available",
      href: "/fiches/ce1/francais/etude-de-la-langue/evaluations/ce1-francais-pluriel-regulier-evaluation.pdf",
      audience: "student",
    }],
    status: "partial",
  },
];

const domainFrancais: ProgramDomain = {
  id: "ce1-francais",
  slug: "francais",
  title: "Français",
  officialLabel: "Français - Cycle 2",
  description:
    "Lecture fluide, compréhension, productions écrites, grammaire et orthographe fréquente.",
  subdomains: [
    createSubdomain(
      "francais",
      "lecture-fluide",
      "Lecture fluide",
      "Consolider le décodage et automatiser la lecture.",
      [
        {
          slug: "lire-des-mots-frequents-rapidement",
          title: "Lire des mots fréquents rapidement",
          objective:
            "Reconnaître et lire sans hésitation les mots fréquents rencontrés en classe.",
          status: "in-progress",
        },
        {
          slug: "lire-un-texte-court-avec-fluidite",
          title: "Lire un texte court avec fluidité",
          objective:
            "Lire un texte court en respectant les groupes de sens et la ponctuation.",
          status: "upcoming",
        },
        {
          slug: "relire-pour-gagner-en-aisance",
          title: "Relire pour gagner en aisance",
          objective:
            "Améliorer la précision et la fluidité par des relectures courtes.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "francais",
      "comprehension",
      "Compréhension",
      "Comprendre des textes courts lus seul ou entendus.",
      [
        {
          slug: "identifier-les-personnages-et-les-lieux",
          title: "Identifier les personnages et les lieux",
          objective:
            "Repérer les personnages, les lieux et les informations explicites d'un texte court.",
          status: "partial",
        },
        {
          slug: "repondre-a-une-question-par-une-information-du-texte",
          title: "Répondre à une question par une information du texte",
          objective:
            "Appuyer sa réponse sur une information lue ou entendue dans le texte.",
          status: "upcoming",
        },
        {
          slug: "remettre-les-evenements-dans-lordre",
          title: "Remettre les événements dans l'ordre",
          objective: "Ordonner les principales étapes d'un récit court.",
          status: "upcoming",
        },
      ],
      ce1ReadingTextLessons,
    ),
    createSubdomain(
      "francais",
      "production-ecrite",
      "Premières productions écrites",
      "Écrire des phrases puis de courts textes avec guidage.",
      [
        {
          slug: "ecrire-une-phrase-complete",
          title: "Écrire une phrase complète",
          objective:
            "Produire une phrase qui a du sens avec une majuscule et une ponctuation finale.",
          status: "upcoming",
        },
        {
          slug: "enchainer-deux-phrases-sur-un-meme-sujet",
          title: "Enchaîner deux phrases sur un même sujet",
          objective:
            "Écrire deux phrases cohérentes autour d'une idée ou d'une image.",
          status: "upcoming",
        },
        {
          slug: "ameliorer-une-phrase-par-un-detail",
          title: "Améliorer une phrase par un détail",
          objective:
            "Ajouter une précision simple pour rendre une phrase plus informative.",
          status: "upcoming",
        },
        {
          slug: "copier-un-texte-court-sans-erreur",
          title: "Copier un texte court sans erreur",
          objective:
            "Recopier un texte court de façon lisible et sans erreur de copie.",
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
          title: "Reconnaître une phrase correcte",
          objective:
            "Identifier une phrase qui a du sens, commence par une majuscule et se termine par un point.",
          status: "in-progress",
        },
        {
          slug: "identifier-le-verbe-dans-une-phrase-simple",
          title: "Identifier le verbe dans une phrase simple",
          objective:
            "Repérer le mot qui indique l'action dans une phrase courte.",
          status: "upcoming",
        },
        {
          slug: "identifier-le-nom-dans-une-phrase",
          title: "Identifier le nom dans une phrase",
          objective:
            "Repérer les noms communs et propres dans une phrase simple.",
          status: "partial",
        },
        {
          slug: "identifier-le-sujet-dun-verbe-simple",
          title: "Identifier le sujet d'un verbe simple",
          objective: "Trouver qui fait l'action dans une phrase courte.",
          status: "upcoming",
        },
      ],
      ce1LanguageAssessmentLessons.filter((lesson) =>
        lesson.competencyIds?.some((id) => id.includes("etude-de-la-langue")),
      ),
    ),
    createSubdomain(
      "francais",
      "vocabulaire",
      "Vocabulaire",
      "Enrichir et mobiliser le lexique rencontré en classe.",
      [
        {
          slug: "enrichir-son-vocabulaire",
          title: "Enrichir son vocabulaire",
          objective:
            "Réutiliser des mots nouveaux rencontrés en classe dans des contextes variés.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "francais",
      "oral",
      "Langage oral",
      "Écouter, s'exprimer et participer aux échanges de la classe.",
      [
        {
          slug: "participer-a-un-echange-oral",
          title: "Participer à un échange oral",
          objective:
            "S'exprimer de façon audible, en attendant son tour et en restant dans le sujet.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "francais",
      "orthographe",
      "Orthographe fréquente",
      "Stabiliser les mots fréquents et les accords simples.",
      [
        {
          slug: "orthographier-des-mots-outils-frequents",
          title: "Orthographier des mots outils fréquents",
          objective:
            "Écrire correctement des mots outils fréquents travaillés en classe.",
          status: "upcoming",
        },
        {
          slug: "marquer-le-pluriel-regulier-du-nom",
          title: "Marquer le pluriel régulier du nom",
          objective:
            "Ajouter la marque du pluriel sur des noms réguliers dans des groupes nominaux simples.",
          status: "partial",
        },
        {
          slug: "accorder-le-verbe-avec-il-ou-ils",
          title: "Accorder le verbe avec il ou ils",
          objective:
            "Choisir une forme verbale simple selon un sujet singulier ou pluriel.",
          status: "upcoming",
        },
      ],
      ce1LanguageAssessmentLessons.filter((lesson) =>
        lesson.competencyIds?.some((id) => id.includes("orthographe")),
      ),
    ),
  ],
  status: "in-progress",
};

const domainMathematiques: ProgramDomain = {
  id: "ce1-mathematiques",
  slug: "mathematiques",
  title: "Mathématiques",
  officialLabel: "Mathématiques - Cycle 2",
  description: "Nombres, calculs, problèmes, grandeurs, espace et géométrie.",
  subdomains: [
    createSubdomain(
      "mathematiques",
      "nombres-et-calculs",
      "Nombres et calculs",
      "Consolider la numération et les calculs simples.",
      [
        {
          slug: "lire-et-ecrire-les-nombres-jusqua-1000",
          title: "Lire et écrire les nombres jusqu'à 1000",
          objective:
            "Associer écriture chiffrée, nom oral et décomposition des nombres jusqu'à 1000.",
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
            "Mobiliser des doubles, compléments et décompositions pour calculer rapidement.",
          status: "upcoming",
        },
        {
          slug: "calculer-mentalement-des-soustractions",
          title: "Calculer mentalement des soustractions",
          objective:
            "Trouver mentalement la différence entre deux petits nombres en utilisant des stratégies adaptées.",
          status: "upcoming",
        },
        {
          slug: "poser-une-addition-sans-retenue",
          title: "Poser une addition sans retenue",
          objective:
            "Aligner les chiffres par rang et calculer une addition posée simple.",
          status: "upcoming",
        },
        {
          slug: "poser-une-soustraction",
          title: "Poser une soustraction",
          objective:
            "Aligner les chiffres par rang et calculer une soustraction posée simple.",
          status: "upcoming",
        },
        {
          slug: "poser-une-addition-avec-retenue",
          title: "Additionner avec retenue",
          objective:
            "Poser une addition à deux chiffres en gérant la retenue et vérifier le résultat.",
          status: "upcoming",
        },
        {
          slug: "soustraire-avec-methode",
          title: "Soustraire avec méthode",
          objective:
            "Poser une soustraction simple et calculer le reste en suivant les étapes de l'algorithme.",
          status: "upcoming",
        },
        {
          slug: "comprendre-la-multiplication-comme-addition-repetee",
          title: "Comprendre la multiplication comme addition répétée",
          objective:
            "Reconnaître qu'une multiplication est l'addition d'un même nombre plusieurs fois.",
          status: "upcoming",
        },
        {
          slug: "utiliser-les-tables-simples",
          title: "Utiliser les tables simples (x2, x5, x10)",
          objective:
            "Mémoriser et utiliser les tables de 2, 5 et 10 pour calculer des produits simples.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "mathematiques",
      "problemes",
      "Problèmes",
      "Résoudre des problèmes additifs, soustractifs et multiplicatifs très simples.",
      [
        {
          slug: "choisir-loperation-dun-probleme-additif-ou-soustractif",
          title: "Choisir l'opération d'un problème additif ou soustractif",
          objective:
            "Identifier si une situation demande d'ajouter ou de retirer.",
          status: "upcoming",
        },
        {
          slug: "resoudre-un-probleme-a-etapes-guidees",
          title: "Résoudre un problème à étapes guidées",
          objective:
            "Suivre deux étapes explicites pour résoudre un problème court.",
          status: "upcoming",
        },
        {
          slug: "expliquer-sa-demarche-de-resolution",
          title: "Expliquer sa démarche de résolution",
          objective:
            "Dire ou écrire comment le calcul choisi répond à la question.",
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
            "Comparer deux longueurs directement ou avec un instrument adapté.",
          status: "upcoming",
        },
        {
          slug: "mesurer-une-longueur",
          title: "Mesurer une longueur",
          objective:
            "Utiliser une règle graduée pour mesurer une longueur et en exprimer le résultat en cm.",
          status: "upcoming",
        },
        {
          slug: "lire-une-heure-simple",
          title: "Lire une heure simple",
          objective:
            "Lire l'heure pleine et la demi-heure sur une horloge à aiguilles.",
          status: "upcoming",
        },
        {
          slug: "utiliser-la-monnaie",
          title: "Utiliser la monnaie",
          objective:
            "Reconnaître les pièces et billets courants et calculer un prix ou une monnaie simple.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "mathematiques",
      "espace-et-geometrie",
      "Espace et géométrie",
      "Se repérer, reconnaître des figures et utiliser les premiers instruments.",
      [
        {
          slug: "se-reperer-sur-un-quadrillage",
          title: "Se repérer sur un quadrillage",
          objective:
            "Localiser une case ou un déplacement simple sur un quadrillage.",
          status: "upcoming",
        },
        {
          slug: "reconnaitre-les-figures-usuelles",
          title: "Reconnaître les figures usuelles",
          objective:
            "Identifier carré, rectangle, triangle et cercle à partir de leurs propriétés visibles.",
          status: "upcoming",
        },
        {
          slug: "tracer-un-segment-a-la-regle",
          title: "Tracer un segment à la règle",
          objective:
            "Utiliser la règle pour tracer un segment propre entre deux points.",
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
  description: "Observer le vivant, explorer la matière, se repérer dans le temps et l'espace.",
  subdomains: [
    createSubdomain(
      "questionner-le-monde",
      "monde-vivant",
      "Le monde vivant",
      "Décrire les cycles de vie et les relations entre êtres vivants.",
      [
        {
          slug: "decrire-le-cycle-dun-etre-vivant",
          title: "Décrire le cycle d'un être vivant",
          objective:
            "L'élève ordonne les étapes du développement d'un être vivant et les justifie.",
          status: "upcoming",
        },
        {
          slug: "observer-une-chaine-alimentaire-simple",
          title: "Observer une chaîne alimentaire simple",
          objective:
            "L'élève identifie producteurs et consommateurs dans une chaîne alimentaire courte.",
          status: "upcoming",
        },
        {
          slug: "connaitre-les-besoins-des-animaux-et-vegetaux",
          title: "Connaître les besoins des animaux et des végétaux",
          objective:
            "L'élève nomme les besoins essentiels d'un animal ou d'une plante et les conditions de survie.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "questionner-le-monde",
      "espace-et-temps",
      "Espace et temps",
      "Lire une frise, situer des événements et se repérer sur une carte simple.",
      [
        {
          slug: "observer-les-saisons",
          title: "Observer les saisons",
          objective:
            "L'élève associe chaque saison à ses caractéristiques observables et les ordonne sur une année.",
          status: "upcoming",
        },
        {
          slug: "se-reperer-dans-le-calendrier",
          title: "Se repérer dans le calendrier",
          objective:
            "L'élève situe un jour, une semaine ou un mois dans le calendrier et utilise le vocabulaire du temps.",
          status: "upcoming",
        },
        {
          slug: "lire-une-frise-chronologique",
          title: "Lire une frise chronologique",
          objective:
            "L'élève place des événements sur une frise et utilise un vocabulaire temporel adapté.",
          status: "upcoming",
        },
        {
          slug: "se-reperer-sur-une-carte-simple",
          title: "Se repérer sur une carte simple",
          objective:
            "L'élève localise un lieu en utilisant la légende et les repères d'une carte.",
          status: "upcoming",
        },
        {
          slug: "identifier-des-paysages-proches",
          title: "Identifier des paysages proches",
          objective:
            "L'élève décrit les caractéristiques d'un paysage familier et le distingue d'un autre paysage.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "questionner-le-monde",
      "matiere-et-energie",
      "Matière et énergie",
      "Classer des matières et explorer des circuits simples.",
      [
        {
          slug: "reconnaitre-des-materiaux",
          title: "Reconnaître des matériaux",
          objective:
            "L'élève identifie les matériaux constituant des objets courants et les classe selon leurs propriétés.",
          status: "upcoming",
        },
        {
          slug: "classer-des-matieres-selon-leurs-proprietes",
          title: "Classer des matières selon leurs propriétés",
          objective:
            "L'élève observe et classe des matières en s'appuyant sur des propriétés testées.",
          status: "upcoming",
        },
        {
          slug: "observer-un-circuit-electrique-simple",
          title: "Observer un circuit électrique simple",
          objective:
            "L'élève identifie les éléments d'un circuit simple et comprend pourquoi une lampe s'allume.",
          status: "upcoming",
        },
        {
          slug: "adopter-des-comportements-responsables",
          title: "Adopter des comportements responsables",
          objective:
            "L'élève propose et met en œuvre un geste concret respectueux de l'environnement proche.",
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
  description: "Composer avec des formes et des couleurs, chanter et écouter de la musique.",
  subdomains: [
    createSubdomain(
      "enseignements-artistiques",
      "arts-plastiques",
      "Arts plastiques",
      "Composer avec des formes et des couleurs, décrire une œuvre.",
      [
        {
          slug: "experimenter-couleurs-formes-et-matieres",
          title: "Expérimenter couleurs, formes et matières",
          objective:
            "L'élève explore différents matériaux, outils et couleurs pour produire des effets variés.",
          status: "upcoming",
        },
        {
          slug: "composer-avec-formes-et-couleurs",
          title: "Composer avec des formes et des couleurs",
          objective:
            "L'élève organise des formes et des couleurs pour donner une intention à sa production.",
          status: "upcoming",
        },
        {
          slug: "realiser-une-production-personnelle",
          title: "Réaliser une production personnelle",
          objective:
            "L'élève réalise une production complète en faisant des choix artistiques qu'il est capable d'expliquer.",
          status: "upcoming",
        },
        {
          slug: "decrire-une-oeuvre-plastique",
          title: "Décrire une œuvre plastique",
          objective:
            "L'élève décrit ce qu'il voit dans une œuvre en distinguant observation et ressenti.",
          status: "upcoming",
        },
        {
          slug: "organiser-l-espace-d-une-page",
          title: "Organiser l'espace d'une page",
          objective:
            "L'élève occupe intentionnellement l'espace de la feuille en tenant compte du cadrage et de la composition.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "enseignements-artistiques",
      "education-musicale",
      "Éducation musicale",
      "Chanter avec précision et écouter des extraits musicaux.",
      [
        {
          slug: "chanter-avec-justesse",
          title: "Chanter avec justesse",
          objective:
            "L'élève chante une mélodie simple en respectant la hauteur des notes.",
          status: "upcoming",
        },
        {
          slug: "chanter-en-groupe-avec-precision",
          title: "Chanter en groupe avec précision",
          objective:
            "L'élève chante en respectant le tempo, les paroles et l'intensité collective.",
          status: "upcoming",
        },
        {
          slug: "memoriser-un-chant",
          title: "Mémoriser un chant",
          objective:
            "L'élève retient les paroles et la mélodie d'un chant court travaillé en classe.",
          status: "upcoming",
        },
        {
          slug: "reproduire-un-rythme",
          title: "Reproduire un rythme",
          objective:
            "L'élève reproduit un schéma rythmique entendu en frappant dans les mains ou avec un instrument.",
          status: "upcoming",
        },
        {
          slug: "ecouter-et-decrire-un-extrait-musical",
          title: "Écouter et décrire un extrait musical",
          objective:
            "L'élève identifie des éléments sonores dans un extrait et les décrit avec des mots simples.",
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
  officialLabel: "Éducation physique et sportive - Cycle 2",
  description: "Activités physiques, jeux collectifs et première expression corporelle.",
  subdomains: [
    createSubdomain(
      "eps",
      "activites-physiques",
      "Activités physiques",
      "Améliorer une performance et adapter son effort.",
      [
        {
          slug: "courir-sauter-lancer-avec-intention",
          title: "Courir, sauter, lancer avec intention",
          objective:
            "L'élève réalise des actions locomotrices et de lancer avec un objectif mesurable.",
          status: "upcoming",
        },
        {
          slug: "ameliorer-une-performance-mesuree",
          title: "Améliorer une performance mesurée",
          objective:
            "L'élève réalise une performance simple et cherche à progresser d'une séance à l'autre.",
          status: "upcoming",
        },
        {
          slug: "adapter-ses-deplacements",
          title: "Adapter ses déplacements",
          objective:
            "L'élève modifie sa vitesse, sa trajectoire ou son équilibre selon les contraintes de la situation.",
          status: "upcoming",
        },
        {
          slug: "adapter-son-effort-a-la-duree",
          title: "Adapter son effort à la durée",
          objective:
            "L'élève maintient un effort régulier sur une durée adaptée sans s'épuiser.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "eps",
      "jeux-collectifs",
      "Jeux collectifs",
      "Coopérer et assumer des rôles variés dans un jeu collectif.",
      [
        {
          slug: "participer-a-un-jeu-collectif",
          title: "Participer à un jeu collectif",
          objective:
            "L'élève prend part activement à un jeu collectif en cherchant à atteindre l'objectif.",
          status: "upcoming",
        },
        {
          slug: "respecter-les-regles-d-un-jeu",
          title: "Respecter les règles d'un jeu",
          objective:
            "L'élève applique les règles du jeu et accepte les décisions de l'arbitre.",
          status: "upcoming",
        },
        {
          slug: "cooperer-dans-un-jeu-collectif",
          title: "Coopérer dans un jeu collectif",
          objective:
            "L'élève agit avec ses partenaires et tient compte des adversaires.",
          status: "upcoming",
        },
        {
          slug: "respecter-des-roles-varies",
          title: "Respecter des rôles variés",
          objective:
            "L'élève assume les rôles de joueur, d'arbitre ou d'observateur selon la situation.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "eps",
      "expression-corporelle",
      "Expression corporelle",
      "Enchaîner des actions pour communiquer et présenter une production.",
      [
        {
          slug: "enchainer-des-actions-pour-communiquer",
          title: "Enchaîner des actions pour communiquer",
          objective:
            "L'élève compose une courte phrase corporelle avec un début, un milieu et une fin.",
          status: "upcoming",
        },
        {
          slug: "presenter-une-production-corporelle",
          title: "Présenter une production corporelle",
          objective:
            "L'élève présente sa production devant un groupe et accepte le regard des autres.",
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
  description: "Comprendre les règles, les droits, les devoirs et participer à la vie collective.",
  subdomains: [
    createSubdomain(
      "emc",
      "vie-collective",
      "Vie collective",
      "Comprendre l'utilité des règles et participer aux décisions collectives.",
      [
        {
          slug: "respecter-les-regles-collectives",
          title: "Respecter les règles collectives",
          objective:
            "L'élève applique les règles de la classe et en explique l'importance pour la vie du groupe.",
          status: "upcoming",
        },
        {
          slug: "comprendre-l-utilite-d-une-regle",
          title: "Comprendre l'utilité d'une règle",
          objective:
            "L'élève explique pourquoi une règle existe et ce qui se passerait sans elle.",
          status: "upcoming",
        },
        {
          slug: "cooperer-dans-un-groupe",
          title: "Coopérer dans un groupe",
          objective:
            "L'élève contribue à une tâche collective en écoutant les autres et en partageant.",
          status: "upcoming",
        },
        {
          slug: "prendre-soin-du-materiel-commun",
          title: "Prendre soin du matériel commun",
          objective:
            "L'élève utilise et range le matériel collectif avec soin et en rend compte si nécessaire.",
          status: "upcoming",
        },
        {
          slug: "participer-a-une-decision-collective",
          title: "Participer à une décision collective",
          objective:
            "L'élève exprime son avis et prend part à un vote ou un choix de groupe.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "emc",
      "vie-interieure-et-alterite",
      "Vie intérieure et altérité",
      "Reconnaître et exprimer ses émotions, respecter les différences.",
      [
        {
          slug: "exprimer-une-emotion",
          title: "Exprimer une émotion",
          objective:
            "L'élève identifie et nomme ce qu'il ressent dans une situation, en utilisant un vocabulaire adapté.",
          status: "upcoming",
        },
        {
          slug: "respecter-les-differences",
          title: "Respecter les différences",
          objective:
            "L'élève reconnaît et accepte les différences entre les élèves de la classe.",
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
            "L'élève donne des exemples de droits et de devoirs dans la vie de la classe.",
          status: "upcoming",
        },
        {
          slug: "identifier-des-actions-responsables",
          title: "Identifier des actions responsables",
          objective:
            "L'élève propose une action concrète utile au groupe ou à l'environnement proche.",
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
      "Gaston accompagne la consolidation de la lecture, de l'écriture et du raisonnement.",
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
