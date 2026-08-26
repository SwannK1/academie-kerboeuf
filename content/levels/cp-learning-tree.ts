// Arbre pédagogique CP — Cycle 2, primaire.
// Structure de catalogue : niveau -> matières -> domaines -> séquences-compétences.
// Une séquence correspond à une seule compétence, sans leçon détaillée ni exercice.

import type {
  AcademyLevelProgram,
  Lesson,
  LearningCompetency,
  ParentGuidance,
  ProgramDomain,
  ProgramStatus,
  ProgramSubdomain,
} from "@/content/program-types";
import { createPrimaryPdfResources } from "@/content/levels/primary-pdf-resources";

const availablePdfCompetencies = new Set([
  "associer-une-lettre-et-son-son",
  "combiner-consonnes-et-voyelles",
  "identifier-les-lettres-de-l-alphabet",
  "lire-des-mots-avec-digraphes-frequents",
  "lire-des-mots-reguliers-courts",
  "lire-des-syllabes-simples",
  "reconnaitre-les-lettres-en-differentes-ecritures",
  "comparer-des-nombres",
  "denombrer-une-collection-jusqua-20",
  "lire-et-ecrire-les-nombres-jusqua-100",
  "ranger-des-nombres",
]);

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
  const hasPdfResources = availablePdfCompetencies.has(definition.slug);
  const resources = hasPdfResources
    ? createPrimaryPdfResources({
        level: "cp",
        subject: domainSlug,
        competencySlug: definition.slug,
      })
    : undefined;
  const status = hasPdfResources ? "available" : definition.status;

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
      resources,
      competencyIds: [id],
      status,
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
      status,
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
  const statuses = sequences.map((sequence) => sequence.lesson.status);

  return {
    id: `cp-${domainSlug}-${slug}`,
    slug,
    title,
    description,
    lessons: sequences.map((sequence) => sequence.lesson),
    competencies: sequences.map((sequence) => sequence.competency),
    status: statuses.every((status) => status === "available")
      ? "available"
      : statuses.some((status) => status === "available" || status === "in-progress")
        ? "in-progress"
        : "upcoming",
  };
}

const domainFrancais: ProgramDomain = {
  id: "cp-francais",
  slug: "francais",
  title: "Français",
  officialLabel: "Français - Cycle 2",
  description:
    "Décodage, combinatoire, fluence, compréhension et premières écritures.",
  subdomains: [
    createSubdomain(
      "francais",
      "decodage",
      "Décodage",
      "Entrer progressivement dans le code alphabétique.",
      [
        {
          slug: "reconnaitre-les-lettres-en-differentes-ecritures",
          title: "Reconnaître les lettres dans différentes écritures",
          objective:
            "Identifier une même lettre écrite en script, cursive, majuscule et minuscule.",
          status: "upcoming",
        },
        {
          slug: "associer-une-lettre-et-son-son",
          title: "Associer une lettre et son son",
          objective:
            "Dire le son correspondant à une lettre isolée ou à une graphie étudiée.",
          status: "upcoming",
        },
        {
          slug: "identifier-les-lettres-de-l-alphabet",
          title: "Identifier les lettres de l'alphabet",
          objective:
            "Nommer les lettres de l'alphabet et les distinguer en minuscules et majuscules.",
          status: "upcoming",
        },
        {
          slug: "reconnaitre-les-lettres-et-les-sons-frequents",
          title: "Reconnaître les lettres et les sons fréquents",
          objective:
            "Associer les lettres et graphies étudiées à leur son le plus fréquent.",
          status: "in-progress",
        },
        {
          slug: "lire-des-syllabes-simples",
          title: "Lire des syllabes simples",
          objective:
            "Décoder des syllabes consonne-voyelle et voyelle-consonne avec appui oral.",
          status: "upcoming",
        },
        {
          slug: "lire-des-mots-reguliers-courts",
          title: "Lire des mots réguliers courts",
          objective:
            "Assembler les syllabes pour lire des mots réguliers d'une ou deux syllabes.",
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
            "Décoder des mots contenant des graphèmes fréquents comme ou, on, an ou ch.",
          status: "upcoming",
        },
        {
          slug: "encoder-des-syllabes-entendues",
          title: "Encoder des syllabes entendues",
          objective:
            "Écrire une syllabe simple en choisissant les lettres correspondant aux sons entendus.",
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
            "Reconnaître rapidement des mots très fréquents déjà rencontrés.",
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
      "lecture-comprehension",
      "Compréhension orale puis écrite",
      "Comprendre des énoncés entendus puis lus.",
      [
        {
          slug: "comprendre-une-consigne-orale-simple",
          title: "Comprendre une consigne orale simple",
          objective:
            "Reformuler ou exécuter une consigne courte donnée oralement.",
          status: "upcoming",
        },
        {
          slug: "identifier-les-personnages-dun-texte-entendu",
          title: "Identifier les personnages d'un texte entendu",
          objective:
            "Nommer les personnages principaux après l'écoute d'un récit court.",
          status: "upcoming",
        },
        {
          slug: "prelever-une-information-dans-une-phrase-lue",
          title: "Prélever une information dans une phrase lue",
          objective:
            "Répondre à une question simple à partir d'une phrase décodée.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "francais",
      "ecriture",
      "Écriture de mots et phrases",
      "Passer de l'encodage de mots simples à l'écriture de phrases très courtes.",
      [
        {
          slug: "copier-des-mots-courts-lisiblement",
          title: "Copier des mots courts lisiblement",
          objective:
            "Copier des mots courts en respectant l'ordre des lettres et la lisibilité.",
          status: "upcoming",
        },
        {
          slug: "encoder-un-mot-simple-entendu",
          title: "Encoder un mot simple entendu",
          objective: "Écrire un mot régulier court à partir des sons entendus.",
          status: "upcoming",
        },
        {
          slug: "ecrire-une-phrase-simple-guidee",
          title: "Écrire une phrase simple guidée",
          objective:
            "Produire une phrase courte avec une structure donnée et un sens clair.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "francais",
      "vocabulaire",
      "Vocabulaire",
      "Enrichir le lexique courant et comprendre les mots nouveaux.",
      [
        {
          slug: "enrichir-le-vocabulaire-courant",
          title: "Enrichir le vocabulaire courant",
          objective:
            "Comprendre et utiliser des mots nouveaux rencontrés dans des textes ou des situations de classe.",
          status: "upcoming",
        },
        {
          slug: "categoriser-des-mots-par-theme",
          title: "Catégoriser des mots par thème",
          objective:
            "Regrouper des mots appartenant à un même domaine sémantique (animaux, aliments, vêtements...).",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "francais",
      "oral",
      "Langage oral",
      "S'exprimer clairement et écouter les autres.",
      [
        {
          slug: "dire-clairement-une-phrase-a-l-oral",
          title: "Dire clairement une phrase à l'oral",
          objective:
            "Prononcer une phrase complète, audible et compréhensible devant la classe.",
          status: "upcoming",
        },
        {
          slug: "ecouter-et-comprendre-un-enonce-oral",
          title: "Écouter et comprendre un énoncé oral",
          objective:
            "Exécuter une consigne ou reformuler une information entendue sans demander répétition.",
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
  title: "Mathématiques",
  officialLabel: "Mathématiques - Cycle 2",
  description: "Nombres, calculs simples et premiers problèmes très guidés.",
  subdomains: [
    createSubdomain(
      "mathematiques",
      "nombres",
      "Nombres",
      "Construire progressivement la numération.",
      [
        {
          slug: "denombrer-une-collection-jusqua-20",
          title: "Dénombrer une collection jusqu'à 20",
          objective:
            "Compter une collection en pointant chaque élément une seule fois.",
          status: "upcoming",
        },
        {
          slug: "lire-et-ecrire-les-nombres-jusqua-100",
          title: "Lire et écrire les nombres jusqu'à 100",
          objective:
            "Associer l'écriture chiffrée, le nom oral et la quantité représentée.",
          status: "upcoming",
        },
        {
          slug: "comparer-des-nombres",
          title: "Comparer des nombres",
          objective:
            "Dire lequel de deux nombres est le plus grand ou le plus petit en justifiant.",
          status: "upcoming",
        },
        {
          slug: "ranger-des-nombres",
          title: "Ranger des nombres dans l'ordre",
          objective:
            "Placer une liste de nombres dans l'ordre croissant ou décroissant.",
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
          title: "Composer et décomposer les petits nombres",
          objective:
            "Décomposer un nombre jusqu'à 10 en deux parties complémentaires.",
          status: "upcoming",
        },
        {
          slug: "calculer-une-addition-simple",
          title: "Calculer une addition simple",
          objective:
            "Trouver la somme de deux petits nombres avec dessin, matériel ou surcomptage.",
          status: "upcoming",
        },
        {
          slug: "calculer-une-soustraction-simple",
          title: "Calculer une soustraction simple",
          objective:
            "Résoudre un retrait simple avec dessin, matériel ou comptage en arrière.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "mathematiques",
      "problemes-guides",
      "Problèmes très guidés",
      "Entrer dans la résolution de problèmes par des situations courtes.",
      [
        {
          slug: "resoudre-un-probleme-additif-guide",
          title: "Résoudre un problème additif guidé",
          objective:
            "Identifier une situation où l'on ajoute et choisir un calcul adapté.",
          status: "upcoming",
        },
        {
          slug: "resoudre-un-probleme-de-retrait-guide",
          title: "Résoudre un problème de retrait guidé",
          objective:
            "Identifier une situation où l'on enlève et choisir un calcul adapté.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "mathematiques",
      "geometrie",
      "Géométrie",
      "Reconnaître des formes et se repérer dans l'espace.",
      [
        {
          slug: "reconnaitre-des-formes-simples",
          title: "Reconnaître des formes simples",
          objective:
            "Nommer et identifier le carré, le rectangle, le triangle et le cercle dans son environnement.",
          status: "upcoming",
        },
        {
          slug: "se-reperer-sur-un-quadrillage",
          title: "Se repérer sur un quadrillage",
          objective:
            "Localiser une case ou décrire un déplacement sur un quadrillage simple.",
          status: "upcoming",
        },
        {
          slug: "utiliser-le-vocabulaire-spatial",
          title: "Utiliser le vocabulaire spatial",
          objective:
            "Décrire la position d'un objet avec les mots devant, derrière, à gauche, à droite, dessus, dessous.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "mathematiques",
      "grandeurs-mesures",
      "Grandeurs et mesures",
      "Comparer des longueurs, utiliser la monnaie et lire l'heure.",
      [
        {
          slug: "comparer-des-longueurs",
          title: "Comparer des longueurs",
          objective:
            "Dire lequel de deux objets est le plus long en utilisant une bande ou une règle.",
          status: "upcoming",
        },
        {
          slug: "utiliser-la-monnaie-simplement",
          title: "Utiliser la monnaie simplement",
          objective:
            "Reconnaître les pièces et les billets courants et calculer un total très simple.",
          status: "upcoming",
        },
        {
          slug: "lire-l-heure-exacte",
          title: "Lire l'heure exacte",
          objective:
            "Lire l'heure juste sur une horloge analogique et numérique.",
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
  description: "Premiers questionnements sur le vivant, la matière, le temps et l'espace.",
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
            "L'élève classe des éléments en vivants ou non-vivants en s'appuyant sur des critères simples.",
          status: "upcoming",
        },
        {
          slug: "connaitre-les-besoins-des-etres-vivants",
          title: "Connaître les besoins des êtres vivants",
          objective:
            "L'élève nomme les besoins essentiels d'un animal ou d'une plante : nourriture, eau, lumière.",
          status: "upcoming",
        },
        {
          slug: "observer-une-croissance-vegetale",
          title: "Observer une croissance végétale",
          objective:
            "L'élève observe et décrit les étapes de la pousse d'une plante au fil du temps.",
          status: "upcoming",
        },
        {
          slug: "observer-les-saisons",
          title: "Observer les saisons",
          objective:
            "L'élève associe des caractéristiques observables de la nature à chacune des quatre saisons.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "questionner-le-monde",
      "matiere-et-objets",
      "Matière et objets",
      "Explorer les propriétés simples des matières et des objets.",
      [
        {
          slug: "classer-des-matieres",
          title: "Classer des matières selon leurs propriétés",
          objective:
            "L'élève observe des matières et les classe selon un critère simple (dur, souple, transparent...).",
          status: "upcoming",
        },
        {
          slug: "decrire-un-objet-technique",
          title: "Décrire un objet technique simple",
          objective:
            "L'élève nomme les parties d'un objet simple et explique à quoi chacune sert.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "questionner-le-monde",
      "temps-et-espace",
      "Temps et espace",
      "Se repérer dans le temps de la semaine et dans l'espace proche.",
      [
        {
          slug: "se-reperer-dans-la-journee",
          title: "Se repérer dans la journée",
          objective:
            "L'élève distingue le matin, l'après-midi et le soir et situe ses activités dans la journée.",
          status: "upcoming",
        },
        {
          slug: "se-reperer-dans-la-semaine",
          title: "Se repérer dans la semaine",
          objective:
            "L'élève nomme les jours de la semaine dans l'ordre et situe une activité dans la journée.",
          status: "upcoming",
        },
        {
          slug: "identifier-les-espaces-proches",
          title: "Identifier les espaces proches",
          objective:
            "L'élève décrit les espaces qu'il fréquente (école, quartier, maison) et les situe les uns par rapport aux autres.",
          status: "upcoming",
        },
        {
          slug: "situer-son-ecole-dans-l-espace",
          title: "Situer son école dans l'espace proche",
          objective:
            "L'élève indique où se trouve son école par rapport à des repères connus.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "questionner-le-monde",
      "hygiene-securite",
      "Hygiène et sécurité",
      "Adopter des gestes simples pour sa santé et sa sécurité.",
      [
        {
          slug: "adopter-des-gestes-d-hygiene",
          title: "Adopter des gestes d'hygiène",
          objective:
            "L'élève applique les règles d'hygiène corporelle de base : se laver les mains, se moucher, tousser dans son coude.",
          status: "upcoming",
        },
        {
          slug: "reconnaitre-les-situations-de-danger",
          title: "Reconnaître des situations de danger",
          objective:
            "L'élève identifie des situations dangereuses simples et dit ce qu'il faut faire ou ne pas faire.",
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
  description: "Premiers gestes artistiques : arts plastiques et éducation musicale.",
  subdomains: [
    createSubdomain(
      "enseignements-artistiques",
      "arts-plastiques",
      "Arts plastiques",
      "Explorer les couleurs, les matières et les outils pour créer.",
      [
        {
          slug: "utiliser-differents-outils-pour-tracer",
          title: "Utiliser différents outils pour tracer",
          objective:
            "L'élève trace des lignes et des formes avec des outils variés : crayon, pinceau, feutre, doigt.",
          status: "upcoming",
        },
        {
          slug: "explorer-couleurs-et-matieres",
          title: "Explorer les couleurs et les matières",
          objective:
            "L'élève expérimente différents outils et matières pour produire des effets plastiques variés.",
          status: "upcoming",
        },
        {
          slug: "composer-une-image-simple",
          title: "Composer une image simple",
          objective:
            "L'élève organise des formes et des couleurs dans un espace de production.",
          status: "upcoming",
        },
        {
          slug: "observer-une-oeuvre",
          title: "Observer une œuvre",
          objective:
            "L'élève regarde une œuvre d'art, la décrit avec ses mots et dit ce qu'elle lui évoque.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "enseignements-artistiques",
      "education-musicale",
      "Éducation musicale",
      "Chanter, écouter et reproduire des rythmes simples.",
      [
        {
          slug: "chanter-avec-le-groupe",
          title: "Chanter avec le groupe",
          objective:
            "L'élève chante une chanson apprise en respectant le rythme et le tempo collectif.",
          status: "upcoming",
        },
        {
          slug: "ecouter-un-extrait-musical",
          title: "Écouter un extrait musical",
          objective:
            "L'élève écoute un extrait musical court et exprime ce qu'il ressent ou ce qu'il entend.",
          status: "upcoming",
        },
        {
          slug: "reproduire-un-rythme-simple",
          title: "Reproduire un rythme simple",
          objective:
            "L'élève reproduit en frappant dans les mains ou sur une table un rythme entendu.",
          status: "upcoming",
        },
        {
          slug: "memoriser-une-courte-chanson",
          title: "Mémoriser une courte chanson",
          objective:
            "L'élève retient les paroles et la mélodie d'une chanson courte.",
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
  officialLabel: "Éducation physique et sportive - Cycle 2",
  description: "Premiers apprentissages moteurs : courir, lancer, jouer ensemble.",
  subdomains: [
    createSubdomain(
      "eps",
      "activites-motrices",
      "Activités motrices de base",
      "Courir, lancer, sauter et réaliser un parcours en sécurité.",
      [
        {
          slug: "courir-sauter-lancer",
          title: "Courir, sauter et lancer",
          objective:
            "L'élève court, saute et lance un engin en contrôlant ses déplacements.",
          status: "upcoming",
        },
        {
          slug: "courir-et-sarreter-en-securite",
          title: "Courir et s'arrêter en sécurité",
          objective:
            "L'élève court, change de direction et s'arrête sur un signal sans mettre en danger.",
          status: "upcoming",
        },
        {
          slug: "realiser-un-parcours-moteur",
          title: "Réaliser un parcours moteur",
          objective:
            "L'élève enchaîne plusieurs actions motrices dans un parcours en respectant l'ordre des obstacles.",
          status: "upcoming",
        },
        {
          slug: "lancer-et-attraper",
          title: "Lancer et attraper un engin",
          objective:
            "L'élève lance un engin vers une cible et tente de l'attraper.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "eps",
      "jeux-collectifs",
      "Jeux collectifs",
      "Jouer ensemble en respectant des règles simples.",
      [
        {
          slug: "respecter-les-regles-d-un-jeu",
          title: "Respecter les règles d'un jeu simple",
          objective:
            "L'élève comprend et applique les règles d'un jeu collectif simple.",
          status: "upcoming",
        },
        {
          slug: "cooperer-dans-un-jeu-collectif",
          title: "Coopérer dans un jeu collectif",
          objective:
            "L'élève aide ses partenaires et cherche à coopérer pour réussir le jeu.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "eps",
      "expression-corporelle",
      "Expression corporelle",
      "S'exprimer et communiquer avec son corps.",
      [
        {
          slug: "s-exprimer-avec-son-corps",
          title: "S'exprimer avec son corps",
          objective:
            "L'élève utilise des gestes et des postures pour communiquer une émotion ou raconter une situation simple.",
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
  description: "Premiers repères pour vivre ensemble et connaître la République.",
  subdomains: [
    createSubdomain(
      "emc",
      "vie-collective",
      "Vie collective",
      "Comprendre et respecter les règles de la vie de classe.",
      [
        {
          slug: "respecter-les-regles-de-classe",
          title: "Respecter les règles de la classe",
          objective:
            "L'élève connaît les règles de la classe et les applique en situation.",
          status: "upcoming",
        },
        {
          slug: "ecouter-les-autres",
          title: "Écouter les autres",
          objective:
            "L'élève écoute sans couper la parole et attend son tour pour s'exprimer.",
          status: "upcoming",
        },
        {
          slug: "cooperer-dans-une-activite",
          title: "Coopérer dans une activité",
          objective:
            "L'élève participe à une tâche commune en partageant le travail et en aidant ses camarades.",
          status: "upcoming",
        },
        {
          slug: "identifier-une-emotion",
          title: "Identifier une émotion",
          objective:
            "L'élève nomme ce qu'il ressent et reconnaît les émotions de ses camarades dans une situation simple.",
          status: "upcoming",
        },
        {
          slug: "respecter-le-materiel-commun",
          title: "Respecter le matériel commun",
          objective:
            "L'élève utilise et range le matériel collectif avec soin et le restitue en bon état.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "emc",
      "premiers-reperes-civiques",
      "Premiers repères civiques",
      "Connaître quelques symboles et valeurs de la République.",
      [
        {
          slug: "reconnaitre-les-symboles-de-la-republique",
          title: "Reconnaître les symboles de la République",
          objective:
            "L'élève nomme quelques symboles de la République française (drapeau, hymne, devise).",
          status: "upcoming",
        },
        {
          slug: "distinguer-droits-et-devoirs-simples",
          title: "Distinguer droits et devoirs simples",
          objective:
            "L'élève donne un exemple de droit et un exemple de devoir dans la vie de classe.",
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
      "Kiwi accompagne les premiers pas dans le décodage, l'écriture et les nombres.",
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
