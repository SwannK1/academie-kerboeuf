import type { ProgramStatus } from "@/content/program-types";

export type LyceeParcoursKind =
  | "tronc-commun"
  | "specialites"
  | "options";

export type LyceeSequenceCompetence = {
  id: string;
  slug: string;
  title: string;
  status: ProgramStatus;
};

export type LyceeSubdomain = {
  id: string;
  slug: string;
  title: string;
  status: ProgramStatus;
  sequences: LyceeSequenceCompetence[];
};

export type LyceeDomain = {
  id: string;
  slug: string;
  title: string;
  status: ProgramStatus;
  subdomains: LyceeSubdomain[];
};

export type LyceeSubject = {
  id: string;
  slug: string;
  title: string;
  status: ProgramStatus;
  domains: LyceeDomain[];
};

export type LyceeParcours = {
  id: string;
  slug: LyceeParcoursKind;
  title: string;
  status: ProgramStatus;
  subjects: LyceeSubject[];
};

export type LyceeCurriculumLevel = {
  id: string;
  slug: "seconde" | "premiere" | "terminale";
  title: string;
  status: ProgramStatus;
  parcours: LyceeParcours[];
};

function sequence(
  id: string,
  title: string,
  status: ProgramStatus = "upcoming",
): LyceeSequenceCompetence {
  return {
    id,
    slug: id,
    title,
    status,
  };
}

function subdomain(
  id: string,
  title: string,
  sequences: LyceeSequenceCompetence[],
  status: ProgramStatus = "upcoming",
): LyceeSubdomain {
  return {
    id,
    slug: id,
    title,
    status,
    sequences,
  };
}

function domain(
  id: string,
  title: string,
  subdomains: LyceeSubdomain[],
  status: ProgramStatus = "upcoming",
): LyceeDomain {
  return {
    id,
    slug: id,
    title,
    status,
    subdomains,
  };
}

function subject(
  id: string,
  title: string,
  domains: LyceeDomain[],
  status: ProgramStatus = "upcoming",
): LyceeSubject {
  return {
    id,
    slug: id,
    title,
    status,
    domains,
  };
}

const secondeTroncCommunSubjects: LyceeSubject[] = [
  subject(
    "francais",
    "Français",
    [
      domain(
        "litterature",
        "Littérature",
        [
          subdomain("roman-recit", "Roman et récit", [
            sequence(
              "analyser-la-construction-d-un-personnage",
              "Analyser la construction d'un personnage",
              "in-progress",
            ),
            sequence(
              "situer-un-recit-dans-son-contexte",
              "Situer un récit dans son contexte historique et littéraire",
            ),
          ]),
          subdomain("theatre", "Théâtre", [
            sequence(
              "identifier-les-enjeux-d-une-scene",
              "Identifier les enjeux d'une scène théâtrale",
            ),
            sequence(
              "analyser-la-parole-theatrale",
              "Analyser la parole théâtrale et ses effets",
            ),
          ]),
          subdomain("poesie", "Poésie", [
            sequence(
              "interpreter-les-images-poetiques",
              "Interpréter les images poétiques",
            ),
            sequence(
              "reperer-les-procedes-de-versification",
              "Repérer les procédés de versification utiles au sens",
            ),
          ]),
        ],
        "in-progress",
      ),
      domain("langue", "Langue", [
        subdomain("syntaxe", "Syntaxe", [
          sequence(
            "analyser-la-structure-d-une-phrase-complexe",
            "Analyser la structure d'une phrase complexe",
          ),
          sequence(
            "ameliorer-la-precision-syntaxique",
            "Améliorer la précision syntaxique d'un écrit",
          ),
        ]),
        subdomain("lexique", "Lexique", [
          sequence(
            "mobiliser-un-vocabulaire-d-analyse",
            "Mobiliser un vocabulaire d'analyse littéraire",
          ),
          sequence(
            "expliquer-la-formation-d-un-mot",
            "Expliquer la formation et les nuances d'un mot",
          ),
        ]),
      ]),
      domain("expression", "Expression écrite et orale", [
        subdomain("argumentation", "Argumentation", [
          sequence(
            "formuler-une-these",
            "Formuler une thèse claire",
            "in-progress",
          ),
          sequence(
            "organiser-un-paragraphe-argumente",
            "Organiser un paragraphe argumenté",
          ),
        ]),
        subdomain("oral", "Oral", [
          sequence(
            "presenter-une-lecture-de-facon-structuree",
            "Présenter une lecture de façon structurée",
          ),
          sequence(
            "repondre-a-une-question-a-l-oral",
            "Répondre à une question à l'oral avec précision",
          ),
        ]),
      ]),
    ],
    "in-progress",
  ),
  subject("mathematiques", "Mathématiques", [
    domain("nombres-calculs", "Nombres et calculs", [
      subdomain("calcul-litteral", "Calcul littéral", [
        sequence(
          "developper-et-factoriser-une-expression",
          "Développer et factoriser une expression",
        ),
        sequence(
          "resoudre-une-equation-du-premier-degre",
          "Résoudre une équation du premier degré",
        ),
      ]),
      subdomain("ensembles-de-nombres", "Ensembles de nombres", [
        sequence(
          "identifier-l-ensemble-d-appartenance-d-un-nombre",
          "Identifier l'ensemble d'appartenance d'un nombre",
        ),
        sequence(
          "utiliser-les-valeurs-approchees",
          "Utiliser les valeurs approchées avec discernement",
        ),
      ]),
    ]),
    domain("fonctions", "Fonctions", [
      subdomain("lecture-graphique", "Lecture graphique", [
        sequence(
          "lire-une-image-et-un-antecedent",
          "Lire une image et un antécédent sur une représentation",
        ),
        sequence(
          "decrire-les-variations-d-une-fonction",
          "Décrire les variations d'une fonction",
        ),
      ]),
      subdomain("fonctions-affines", "Fonctions affines", [
        sequence(
          "reconnaitre-une-fonction-affine",
          "Reconnaître une fonction affine",
        ),
        sequence(
          "determiner-l-expression-d-une-fonction-affine",
          "Déterminer l'expression d'une fonction affine",
        ),
      ]),
    ]),
    domain("geometrie", "Géométrie", [
      subdomain("reperage", "Repérage", [
        sequence(
          "calculer-une-distance-dans-un-repere",
          "Calculer une distance dans un repère",
        ),
        sequence(
          "determiner-les-coordonnees-d-un-milieu",
          "Déterminer les coordonnées d'un milieu",
        ),
      ]),
      subdomain("vecteurs", "Vecteurs", [
        sequence(
          "representer-un-vecteur",
          "Représenter un vecteur",
        ),
        sequence(
          "utiliser-la-relation-de-chasles",
          "Utiliser la relation de Chasles",
        ),
      ]),
    ]),
    domain("statistiques-probabilites", "Statistiques et probabilités", [
      subdomain("statistiques", "Statistiques", [
        sequence(
          "calculer-une-moyenne-et-une-mediane",
          "Calculer une moyenne et une médiane",
        ),
        sequence(
          "interpreter-une-serie-statistique",
          "Interpréter une série statistique",
        ),
      ]),
      subdomain("probabilites", "Probabilités", [
        sequence(
          "modeliser-une-experience-aleatoire",
          "Modéliser une expérience aléatoire",
        ),
        sequence(
          "calculer-une-probabilite-simple",
          "Calculer une probabilité simple",
        ),
      ]),
    ]),
  ]),
  subject("histoire-geographie", "Histoire-Géographie", [
    domain("histoire", "Histoire", [
      subdomain("mondes-anciens-et-medievaux", "Mondes anciens et médiévaux", [
        sequence(
          "situer-un-evenement-dans-une-chronologie",
          "Situer un événement dans une chronologie",
        ),
        sequence(
          "expliquer-une-transformation-politique",
          "Expliquer une transformation politique majeure",
        ),
      ]),
      subdomain("modernite", "Modernité", [
        sequence(
          "analyser-un-document-historique",
          "Analyser un document historique",
        ),
        sequence(
          "mettre-en-relation-des-causes-et-des-consequences",
          "Mettre en relation des causes et des conséquences",
        ),
      ]),
    ]),
    domain("geographie", "Géographie", [
      subdomain("territoires", "Territoires", [
        sequence(
          "decrire-l-organisation-d-un-territoire",
          "Décrire l'organisation d'un territoire",
        ),
        sequence(
          "utiliser-un-croquis-pour-expliquer-un-espace",
          "Utiliser un croquis pour expliquer un espace",
        ),
      ]),
      subdomain("transitions", "Transitions", [
        sequence(
          "identifier-les-acteurs-d-une-transition",
          "Identifier les acteurs d'une transition territoriale",
        ),
        sequence(
          "expliquer-un-enjeu-de-developpement-durable",
          "Expliquer un enjeu de développement durable",
        ),
      ]),
    ]),
  ]),
  subject("emc", "EMC", [
    domain("citoyennete", "Citoyenneté", [
      subdomain("libertes", "Libertés", [
        sequence(
          "distinguer-droit-liberte-et-responsabilite",
          "Distinguer droit, liberté et responsabilité",
        ),
        sequence(
          "argumenter-sur-une-situation-citoyenne",
          "Argumenter sur une situation citoyenne",
        ),
      ]),
      subdomain("debat-democratique", "Débat démocratique", [
        sequence(
          "formuler-un-argument-respectueux",
          "Formuler un argument respectueux dans un débat",
        ),
        sequence(
          "identifier-les-regles-d-un-debat",
          "Identifier les règles d'un débat démocratique",
        ),
      ]),
    ]),
  ]),
  subject("sciences", "Sciences", [
    domain("physique-chimie", "Physique-Chimie", [
      subdomain("mesures-et-modeles", "Mesures et modèles", [
        sequence(
          "exploiter-une-mesure-avec-unite",
          "Exploiter une mesure avec son unité",
        ),
        sequence(
          "relier-un-modele-a-une-observation",
          "Relier un modèle à une observation",
        ),
      ]),
      subdomain("matiere", "Matière", [
        sequence(
          "decrire-une-transformation-chimique",
          "Décrire une transformation chimique",
        ),
        sequence(
          "utiliser-la-conservation-de-la-masse",
          "Utiliser la conservation de la masse",
        ),
      ]),
    ]),
    domain("svt", "SVT", [
      subdomain("vivant", "Vivant", [
        sequence(
          "relier-structure-et-fonction-du-vivant",
          "Relier structure et fonction du vivant",
        ),
        sequence(
          "expliquer-un-mecanisme-biologique",
          "Expliquer un mécanisme biologique",
        ),
      ]),
      subdomain("terre-et-environnement", "Terre et environnement", [
        sequence(
          "interpreter-des-donnees-geologiques",
          "Interpréter des données géologiques",
        ),
        sequence(
          "identifier-un-risque-naturel",
          "Identifier un risque naturel",
        ),
      ]),
    ]),
  ]),
  subject("langues-vivantes", "Langues vivantes", [
    domain("comprehension", "Compréhension", [
      subdomain("oral", "Oral", [
        sequence(
          "identifier-le-sens-global-d-un-message-oral",
          "Identifier le sens global d'un message oral",
        ),
        sequence(
          "reperer-les-informations-cles-a-l-oral",
          "Repérer les informations clés à l'oral",
        ),
      ]),
      subdomain("ecrit", "Écrit", [
        sequence(
          "comprendre-un-texte-court-authentique",
          "Comprendre un texte court authentique",
        ),
        sequence(
          "inférer-le-sens-d-un-mot-en-contexte",
          "Inférer le sens d'un mot en contexte",
        ),
      ]),
    ]),
    domain("expression", "Expression", [
      subdomain("interaction", "Interaction", [
        sequence(
          "tenir-un-echange-court",
          "Tenir un échange court",
        ),
        sequence(
          "poser-des-questions-pour-preciser",
          "Poser des questions pour préciser une information",
        ),
      ]),
      subdomain("production", "Production", [
        sequence(
          "presenter-un-sujet-familier",
          "Présenter un sujet familier",
        ),
        sequence(
          "rediger-un-texte-court-organise",
          "Rédiger un texte court organisé",
        ),
      ]),
    ]),
  ]),
  subject("arts", "Arts", [
    domain("culture-artistique", "Culture artistique", [
      subdomain("analyse-d-oeuvre", "Analyse d'oeuvre", [
        sequence(
          "decrire-une-oeuvre-avec-un-vocabulaire-adapte",
          "Décrire une oeuvre avec un vocabulaire adapté",
        ),
        sequence(
          "situer-une-oeuvre-dans-un-contexte",
          "Situer une oeuvre dans un contexte",
        ),
      ]),
      subdomain("pratique", "Pratique artistique", [
        sequence(
          "choisir-un-procede-plastique-ou-sonore",
          "Choisir un procédé plastique ou sonore",
        ),
        sequence(
          "justifier-un-choix-de-creation",
          "Justifier un choix de création",
        ),
      ]),
    ]),
  ]),
  subject("eps", "EPS", [
    domain("performance", "Performance et santé", [
      subdomain("effort", "Gestion de l'effort", [
        sequence(
          "adapter-son-effort-a-une-situation",
          "Adapter son effort à une situation",
        ),
        sequence(
          "observer-des-indicateurs-de-progres",
          "Observer des indicateurs de progrès",
        ),
      ]),
      subdomain("cooperation", "Coopération", [
        sequence(
          "tenir-un-role-dans-un-collectif",
          "Tenir un rôle dans un collectif",
        ),
        sequence(
          "respecter-les-regles-de-securite",
          "Respecter les règles de sécurité",
        ),
      ]),
    ]),
  ]),
];

const premiereTroncCommunSubjects: LyceeSubject[] = [
  subject("francais", "Français", [
    domain("epreuves-anticipees", "Épreuves anticipées", [
      subdomain("lecture-lineaire", "Lecture linéaire", [
        sequence(
          "conduire-une-lecture-lineaire",
          "Conduire une lecture linéaire",
        ),
        sequence(
          "formuler-un-projet-de-lecture",
          "Formuler un projet de lecture",
        ),
      ]),
      subdomain("dissertation-commentaire", "Dissertation et commentaire", [
        sequence(
          "construire-une-problematique-litteraire",
          "Construire une problématique littéraire",
        ),
        sequence(
          "organiser-un-plan-d-analyse",
          "Organiser un plan d'analyse",
        ),
      ]),
    ]),
  ]),
  subject("histoire-geographie", "Histoire-Géographie", [
    domain("analyse-de-documents", "Analyse de documents", [
      subdomain("methode", "Méthode", [
        sequence(
          "contextualiser-un-document",
          "Contextualiser un document",
        ),
        sequence(
          "confronter-deux-documents",
          "Confronter deux documents",
        ),
      ]),
    ]),
  ]),
  subject("emc", "EMC", [
    domain("societe-democratique", "Société démocratique", [
      subdomain("engagement", "Engagement", [
        sequence(
          "analyser-une-forme-d-engagement",
          "Analyser une forme d'engagement",
        ),
      ]),
    ]),
  ]),
  subject("langues-vivantes", "Langues vivantes", [
    domain("communication", "Communication", [
      subdomain("argumentation", "Argumentation", [
        sequence(
          "defendre-un-point-de-vue-en-langue-vivante",
          "Défendre un point de vue en langue vivante",
        ),
      ]),
    ]),
  ]),
  subject("eps", "EPS", [
    domain("autonomie", "Autonomie et projet", [
      subdomain("entrainement", "Entraînement", [
        sequence(
          "construire-un-projet-d-entrainement",
          "Construire un projet d'entraînement",
        ),
      ]),
    ]),
  ]),
];

const premiereSpecialiteSubjects: LyceeSubject[] = [
  subject("mathematiques", "Mathématiques", [
    domain("algebre-analyse", "Algèbre et analyse", [
      subdomain("fonctions", "Fonctions", [
        sequence(
          "etudier-les-variations-d-une-fonction",
          "Étudier les variations d'une fonction",
        ),
      ]),
      subdomain("suites", "Suites", [
        sequence(
          "modeliser-une-situation-par-une-suite",
          "Modéliser une situation par une suite",
        ),
      ]),
    ]),
  ]),
  subject("sciences", "Sciences", [
    domain("specialites-scientifiques", "Spécialités scientifiques", [
      subdomain("physique-chimie", "Physique-Chimie", [
        sequence(
          "exploiter-un-protocole-experimental",
          "Exploiter un protocole expérimental",
        ),
      ]),
      subdomain("svt", "SVT", [
        sequence(
          "argumenter-a-partir-de-donnees-scientifiques",
          "Argumenter à partir de données scientifiques",
        ),
      ]),
    ]),
  ]),
  subject("humanites", "Humanités et sciences sociales", [
    domain("specialites-humanites", "Spécialités humanités", [
      subdomain("ses", "SES", [
        sequence(
          "expliquer-un-mecanisme-economique-ou-social",
          "Expliquer un mécanisme économique ou social",
        ),
      ]),
      subdomain("hggsp", "HGGSP", [
        sequence(
          "analyser-un-enjeu-geopolitique",
          "Analyser un enjeu géopolitique",
        ),
      ]),
    ]),
  ]),
];

const terminaleTroncCommunSubjects: LyceeSubject[] = [
  subject("philosophie", "Philosophie", [
    domain("problemes-philosophiques", "Problèmes philosophiques", [
      subdomain("notions", "Notions", [
        sequence(
          "formuler-un-probleme-philosophique",
          "Formuler un problème philosophique",
        ),
        sequence(
          "mobiliser-une-reference-philosophique",
          "Mobiliser une référence philosophique",
        ),
      ]),
      subdomain("dissertation", "Dissertation", [
        sequence(
          "construire-un-raisonnement-philosophique",
          "Construire un raisonnement philosophique",
        ),
        sequence(
          "rediger-une-transition-argumentative",
          "Rédiger une transition argumentative",
        ),
      ]),
    ]),
  ]),
  subject("histoire-geographie", "Histoire-Géographie", [
    domain("composition", "Composition", [
      subdomain("problematique-et-plan", "Problématique et plan", [
        sequence(
          "elaborer-un-plan-de-composition",
          "Élaborer un plan de composition",
        ),
      ]),
    ]),
  ]),
  subject("emc", "EMC", [
    domain("republique-et-citoyennete", "République et citoyenneté", [
      subdomain("deliberation", "Délibération", [
        sequence(
          "argumenter-dans-une-deliberation-citoyenne",
          "Argumenter dans une délibération citoyenne",
        ),
      ]),
    ]),
  ]),
  subject("langues-vivantes", "Langues vivantes", [
    domain("expression-avancee", "Expression avancée", [
      subdomain("oral", "Oral", [
        sequence(
          "presenter-une-idee-complexe-en-langue-vivante",
          "Présenter une idée complexe en langue vivante",
        ),
      ]),
    ]),
  ]),
  subject("eps", "EPS", [
    domain("projet-personnel", "Projet personnel", [
      subdomain("performance", "Performance", [
        sequence(
          "analyser-sa-performance-pour-progresser",
          "Analyser sa performance pour progresser",
        ),
      ]),
    ]),
  ]),
];

const terminaleSpecialiteSubjects: LyceeSubject[] = [
  subject("mathematiques", "Mathématiques", [
    domain("analyse", "Analyse", [
      subdomain("limites-et-continuite", "Limites et continuité", [
        sequence(
          "etudier-une-limite-de-fonction",
          "Étudier une limite de fonction",
        ),
      ]),
      subdomain("probabilites", "Probabilités", [
        sequence(
          "utiliser-une-loi-de-probabilite",
          "Utiliser une loi de probabilité",
        ),
      ]),
    ]),
  ]),
  subject("sciences", "Sciences", [
    domain("specialites-scientifiques", "Spécialités scientifiques", [
      subdomain("physique-chimie", "Physique-Chimie", [
        sequence(
          "modeliser-une-transformation-physique-ou-chimique",
          "Modéliser une transformation physique ou chimique",
        ),
      ]),
      subdomain("svt", "SVT", [
        sequence(
          "resoudre-un-probleme-scientifique-argumente",
          "Résoudre un problème scientifique argumenté",
        ),
      ]),
    ]),
  ]),
  subject("grand-oral", "Grand Oral", [
    domain("preparation-orale", "Préparation orale", [
      subdomain("question", "Question", [
        sequence(
          "formuler-une-question-de-grand-oral",
          "Formuler une question de Grand Oral",
        ),
      ]),
      subdomain("prise-de-parole", "Prise de parole", [
        sequence(
          "soutenir-un-expose-argumente",
          "Soutenir un exposé argumenté",
        ),
      ]),
    ]),
  ]),
];

export const lyceeCurriculumLevels = [
  {
    id: "lycee-seconde",
    slug: "seconde",
    title: "Seconde",
    status: "in-progress",
    parcours: [
      {
        id: "seconde-tronc-commun",
        slug: "tronc-commun",
        title: "Tronc commun",
        status: "in-progress",
        subjects: secondeTroncCommunSubjects,
      },
      {
        id: "seconde-options",
        slug: "options",
        title: "Options",
        status: "upcoming",
        subjects: [],
      },
    ],
  },
  {
    id: "lycee-premiere",
    slug: "premiere",
    title: "Première",
    status: "upcoming",
    parcours: [
      {
        id: "premiere-tronc-commun",
        slug: "tronc-commun",
        title: "Tronc commun",
        status: "upcoming",
        subjects: premiereTroncCommunSubjects,
      },
      {
        id: "premiere-specialites",
        slug: "specialites",
        title: "Enseignements de spécialité",
        status: "upcoming",
        subjects: premiereSpecialiteSubjects,
      },
      {
        id: "premiere-options",
        slug: "options",
        title: "Options",
        status: "upcoming",
        subjects: [],
      },
    ],
  },
  {
    id: "lycee-terminale",
    slug: "terminale",
    title: "Terminale",
    status: "upcoming",
    parcours: [
      {
        id: "terminale-tronc-commun",
        slug: "tronc-commun",
        title: "Tronc commun",
        status: "upcoming",
        subjects: terminaleTroncCommunSubjects,
      },
      {
        id: "terminale-specialites",
        slug: "specialites",
        title: "Enseignements de spécialité",
        status: "upcoming",
        subjects: terminaleSpecialiteSubjects,
      },
      {
        id: "terminale-options",
        slug: "options",
        title: "Options",
        status: "upcoming",
        subjects: [],
      },
    ],
  },
] satisfies LyceeCurriculumLevel[];

export function getLyceeCurriculumLevel(
  slug: LyceeCurriculumLevel["slug"],
): LyceeCurriculumLevel | undefined {
  return lyceeCurriculumLevels.find((level) => level.slug === slug);
}

export function countLyceeSequenceCompetences(
  levels: readonly LyceeCurriculumLevel[] = lyceeCurriculumLevels,
): number {
  return levels.reduce(
    (levelCount, level) =>
      levelCount +
      level.parcours.reduce(
        (parcoursCount, parcours) =>
          parcoursCount +
          parcours.subjects.reduce(
            (subjectCount, currentSubject) =>
              subjectCount +
              currentSubject.domains.reduce(
                (domainCount, currentDomain) =>
                  domainCount +
                  currentDomain.subdomains.reduce(
                    (subdomainCount, currentSubdomain) =>
                      subdomainCount + currentSubdomain.sequences.length,
                    0,
                  ),
                0,
              ),
            0,
          ),
        0,
      ),
    0,
  );
}
