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
          slug: "reconnaitre-les-lettres-en-differentes-ecritures",
          title: "Reconnaitre les lettres dans differentes ecritures",
          objective:
            "Identifier une meme lettre ecrite en script, cursive, majuscule et minuscule.",
          status: "upcoming",
        },
        {
          slug: "associer-une-lettre-et-son-son",
          title: "Associer une lettre et son son",
          objective:
            "Dire le son correspondant a une lettre isolee ou a une graphie etudiee.",
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
            "Comprendre et utiliser des mots nouveaux rencontres dans des textes ou des situations de classe.",
          status: "upcoming",
        },
        {
          slug: "categoriser-des-mots-par-theme",
          title: "Categoriser des mots par theme",
          objective:
            "Regrouper des mots appartenant a un meme domaine semantique (animaux, aliments, vetements...).",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "francais",
      "oral",
      "Langage oral",
      "S'exprimer clairement et ecouter les autres.",
      [
        {
          slug: "dire-clairement-une-phrase-a-l-oral",
          title: "Dire clairement une phrase a l'oral",
          objective:
            "Prononcer une phrase complete, audible et comprehensible devant la classe.",
          status: "upcoming",
        },
        {
          slug: "ecouter-et-comprendre-un-enonce-oral",
          title: "Ecouter et comprendre un enonce oral",
          objective:
            "Executer une consigne ou reformuler une information entendue sans demander repetition.",
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
            "Placer une liste de nombres dans l'ordre croissant ou decroissant.",
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
      "Reconnaitre des formes et se reperer dans l'espace.",
      [
        {
          slug: "reconnaitre-des-formes-simples",
          title: "Reconnaitre des formes simples",
          objective:
            "Nommer et identifier le carre, le rectangle, le triangle et le cercle dans son environnement.",
          status: "upcoming",
        },
        {
          slug: "se-reperer-sur-un-quadrillage",
          title: "Se reperer sur un quadrillage",
          objective:
            "Localiser une case ou decrire un deplacement sur un quadrillage simple.",
          status: "upcoming",
        },
        {
          slug: "utiliser-le-vocabulaire-spatial",
          title: "Utiliser le vocabulaire spatial",
          objective:
            "Decrire la position d'un objet avec les mots devant, derriere, a gauche, a droite, dessus, dessous.",
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
            "Dire lequel de deux objets est le plus long en utilisant une bande ou une regle.",
          status: "upcoming",
        },
        {
          slug: "utiliser-la-monnaie-simplement",
          title: "Utiliser la monnaie simplement",
          objective:
            "Reconnaitre les pieces et les billets courants et calculer un total tres simple.",
          status: "upcoming",
        },
        {
          slug: "lire-l-heure-exacte",
          title: "Lire l'heure exacte",
          objective:
            "Lire l'heure juste sur une horloge analogique et numerique.",
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
          slug: "connaitre-les-besoins-des-etres-vivants",
          title: "Connaitre les besoins des etres vivants",
          objective:
            "L'eleve nomme les besoins essentiels d'un animal ou d'une plante : nourriture, eau, lumiere.",
          status: "upcoming",
        },
        {
          slug: "observer-une-croissance-vegetale",
          title: "Observer une croissance vegetale",
          objective:
            "L'eleve observe et decrit les etapes de la pousse d'une plante au fil du temps.",
          status: "upcoming",
        },
        {
          slug: "observer-les-saisons",
          title: "Observer les saisons",
          objective:
            "L'eleve associe des caracteristiques observables de la nature a chacune des quatre saisons.",
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
          slug: "se-reperer-dans-la-journee",
          title: "Se reperer dans la journee",
          objective:
            "L'eleve distingue le matin, l'apres-midi et le soir et situe ses activites dans la journee.",
          status: "upcoming",
        },
        {
          slug: "se-reperer-dans-la-semaine",
          title: "Se reperer dans la semaine",
          objective:
            "L'eleve nomme les jours de la semaine dans l'ordre et situe une activite dans la journee.",
          status: "upcoming",
        },
        {
          slug: "identifier-les-espaces-proches",
          title: "Identifier les espaces proches",
          objective:
            "L'eleve decrit les espaces qu'il frequente (ecole, quartier, maison) et les situe les uns par rapport aux autres.",
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
    createSubdomain(
      "questionner-le-monde",
      "hygiene-securite",
      "Hygiene et securite",
      "Adopter des gestes simples pour sa sante et sa securite.",
      [
        {
          slug: "adopter-des-gestes-d-hygiene",
          title: "Adopter des gestes d'hygiene",
          objective:
            "L'eleve applique les regles d'hygiene corporelle de base : se laver les mains, se moucher, tousser dans son coude.",
          status: "upcoming",
        },
        {
          slug: "reconnaitre-les-situations-de-danger",
          title: "Reconnaitre des situations de danger",
          objective:
            "L'eleve identifie des situations dangereuses simples et dit ce qu'il faut faire ou ne pas faire.",
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
          slug: "utiliser-differents-outils-pour-tracer",
          title: "Utiliser differents outils pour tracer",
          objective:
            "L'eleve trace des lignes et des formes avec des outils varies : crayon, pinceau, feutre, doigt.",
          status: "upcoming",
        },
        {
          slug: "explorer-couleurs-et-matieres",
          title: "Explorer les couleurs et les matieres",
          objective:
            "L'eleve experimente differents outils et matieres pour produire des effets plastiques varies.",
          status: "upcoming",
        },
        {
          slug: "composer-une-image-simple",
          title: "Composer une image simple",
          objective:
            "L'eleve organise des formes et des couleurs dans un espace de production.",
          status: "upcoming",
        },
        {
          slug: "observer-une-oeuvre",
          title: "Observer une oeuvre",
          objective:
            "L'eleve regarde une oeuvre d'art, la decrit avec ses mots et dit ce qu'elle lui evoque.",
          status: "upcoming",
        },
      ],
    ),
    createSubdomain(
      "enseignements-artistiques",
      "education-musicale",
      "Education musicale",
      "Chanter, ecouter et reproduire des rythmes simples.",
      [
        {
          slug: "chanter-avec-le-groupe",
          title: "Chanter avec le groupe",
          objective:
            "L'eleve chante une chanson apprise en respectant le rythme et le tempo collectif.",
          status: "upcoming",
        },
        {
          slug: "ecouter-un-extrait-musical",
          title: "Ecouter un extrait musical",
          objective:
            "L'eleve ecoute un extrait musical court et exprime ce qu'il ressent ou ce qu'il entend.",
          status: "upcoming",
        },
        {
          slug: "reproduire-un-rythme-simple",
          title: "Reproduire un rythme simple",
          objective:
            "L'eleve reproduit par frapper dans les mains ou sur une table un rythme entendu.",
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
      "Courir, lancer, sauter et realiser un parcours en securite.",
      [
        {
          slug: "courir-sauter-lancer",
          title: "Courir, sauter et lancer",
          objective:
            "L'eleve court, saute et lance un engin en controlant ses deplacements.",
          status: "upcoming",
        },
        {
          slug: "courir-et-sarreter-en-securite",
          title: "Courir et s'arreter en securite",
          objective:
            "L'eleve court, change de direction et s'arrete sur un signal sans mettre en danger.",
          status: "upcoming",
        },
        {
          slug: "realiser-un-parcours-moteur",
          title: "Realiser un parcours moteur",
          objective:
            "L'eleve enchaine plusieurs actions motrices dans un parcours en respectant l'ordre des obstacles.",
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
          slug: "cooperer-dans-un-jeu-collectif",
          title: "Cooperer dans un jeu collectif",
          objective:
            "L'eleve aide ses partenaires et cherche a cooperer pour reussir le jeu.",
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
            "L'eleve utilise des gestes et des postures pour communiquer une emotion ou raconter une situation simple.",
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
          slug: "ecouter-les-autres",
          title: "Ecouter les autres",
          objective:
            "L'eleve ecoute sans couper la parole et attend son tour pour s'exprimer.",
          status: "upcoming",
        },
        {
          slug: "cooperer-dans-une-activite",
          title: "Cooperer dans une activite",
          objective:
            "L'eleve participe a une tache commune en partageant le travail et en aidant ses camarades.",
          status: "upcoming",
        },
        {
          slug: "identifier-une-emotion",
          title: "Identifier une emotion",
          objective:
            "L'eleve nomme ce qu'il ressent et reconnait les emotions de ses camarades dans une situation simple.",
          status: "upcoming",
        },
        {
          slug: "respecter-le-materiel-commun",
          title: "Respecter le materiel commun",
          objective:
            "L'eleve utilise et range le materiel collectif avec soin et le restitue en bon etat.",
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
      "Kiwi accompagne les premiers pas dans le decodage, l'ecriture et les nombres.",
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
