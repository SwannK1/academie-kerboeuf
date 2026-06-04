import type { ProgramStatus } from "@/content/program-types";

export type LyceeLevelSlug = "seconde" | "premiere" | "terminale";
export type LyceeParcoursKind = "tronc-commun" | "specialites" | "options";

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
  slug: LyceeLevelSlug;
  title: string;
  status: ProgramStatus;
  parcours: LyceeParcours[];
};

const competence = (
  id: string,
  title: string,
  status: ProgramStatus = "upcoming",
): LyceeSequenceCompetence => ({ id, slug: id, title, status });

const subdomain = (
  id: string,
  title: string,
  sequences: LyceeSequenceCompetence[],
  status: ProgramStatus = "upcoming",
): LyceeSubdomain => ({ id, slug: id, title, status, sequences });

const domain = (
  id: string,
  title: string,
  subdomains: LyceeSubdomain[],
  status: ProgramStatus = "upcoming",
): LyceeDomain => ({ id, slug: id, title, status, subdomains });

const subject = (
  id: string,
  title: string,
  domains: LyceeDomain[],
  status: ProgramStatus = "upcoming",
): LyceeSubject => ({ id, slug: id, title, status, domains });

const secondeTroncCommun: LyceeSubject[] = [
  subject("methodologie", "Méthodologie lycée", [
    domain("methodes-travail", "Méthodes de travail", [
      subdomain("organisation", "Organisation et autonomie", [
        competence("prendre-notes-efficacement", "Prendre des notes efficacement", "in-progress"),
        competence("organiser-travail-personnel", "Organiser son travail personnel", "in-progress"),
        competence("gerer-temps-revisions", "Gérer son temps et ses révisions", "in-progress"),
      ], "in-progress"),
    ], "in-progress"),
  ], "in-progress"),
  subject("francais", "Français", [
    domain("litterature", "Littérature", [
      subdomain("roman-recit", "Roman et récit", [
        competence("analyser-un-personnage", "Analyser la construction d'un personnage", "in-progress"),
        competence("situer-un-recit", "Situer un récit dans son contexte"),
      ]),
      subdomain("theatre-poesie", "Théâtre et poésie", [
        competence("identifier-les-enjeux-d-une-scene", "Identifier les enjeux d'une scène théâtrale"),
        competence("interpreter-une-image-poetique", "Interpréter une image poétique"),
      ]),
    ], "in-progress"),
    domain("langue-expression", "Langue et expression", [
      subdomain("syntaxe-lexique", "Syntaxe et lexique", [
        competence("analyser-une-phrase-complexe", "Analyser une phrase complexe"),
        competence("mobiliser-un-lexique-d-analyse", "Mobiliser un lexique d'analyse littéraire"),
      ]),
      subdomain("argumentation-oral", "Argumentation et oral", [
        competence("formuler-une-these", "Formuler une thèse claire", "in-progress"),
        competence("organiser-un-paragraphe-argumente", "Organiser un paragraphe argumenté", "in-progress"),
      ]),
    ]),
  ], "in-progress"),
  subject("mathematiques", "Mathématiques", [
    domain("nombres-calculs", "Nombres et calculs", [
      subdomain("calcul-litteral", "Calcul littéral", [
        competence("developper-factoriser", "Développer et factoriser une expression", "in-progress"),
        competence("resoudre-equation-premier-degre", "Résoudre une équation du premier degré", "in-progress"),
      ], "in-progress"),
      subdomain("ensembles-de-nombres", "Ensembles de nombres", [
        competence("identifier-ensemble-nombre", "Identifier l'ensemble d'appartenance d'un nombre"),
        competence("utiliser-valeurs-approchees", "Utiliser les valeurs approchées avec discernement"),
      ]),
    ], "in-progress"),
    domain("fonctions-geometrie", "Fonctions et géométrie", [
      subdomain("fonctions", "Fonctions", [
        competence("lire-image-antecedent", "Lire une image et un antécédent", "in-progress"),
        competence("decrire-variations-fonction", "Décrire les variations d'une fonction"),
      ]),
      subdomain("vecteurs-reperage", "Vecteurs et repérage", [
        competence("calculer-distance-repere", "Calculer une distance dans un repère"),
        competence("utiliser-relation-chasles", "Utiliser la relation de Chasles"),
      ]),
    ]),
    domain("statistiques-probabilites", "Statistiques et probabilités", [
      subdomain("donnees", "Données", [
        competence("interpreter-serie-statistique", "Interpréter une série statistique"),
        competence("calculer-probabilite-simple", "Calculer une probabilité simple"),
      ]),
    ]),
  ], "in-progress"),
  subject("histoire-geographie", "Histoire-Géographie", [
    domain("histoire", "Histoire", [
      subdomain("chronologie-documents", "Chronologie et documents", [
        competence("situer-evenement-chronologie", "Situer un événement dans une chronologie"),
        competence("analyser-document-historique", "Analyser un document historique"),
      ]),
    ]),
    domain("geographie", "Géographie", [
      subdomain("territoires-transitions", "Territoires et transitions", [
        competence("decrire-organisation-territoire", "Décrire l'organisation d'un territoire"),
        competence("expliquer-enjeu-developpement-durable", "Expliquer un enjeu de développement durable"),
      ]),
    ]),
  ]),
  subject("emc", "EMC", [
    domain("citoyennete", "Citoyenneté", [
      subdomain("libertes-debat", "Libertés et débat", [
        competence("distinguer-droit-liberte-responsabilite", "Distinguer droit, liberté et responsabilité"),
        competence("formuler-argument-respectueux", "Formuler un argument respectueux dans un débat"),
      ]),
    ]),
  ]),
  subject("sciences", "Sciences", [
    domain("physique-chimie", "Physique-Chimie", [
      subdomain("mesures-matiere", "Mesures et matière", [
        competence("exploiter-mesure-avec-unite", "Exploiter une mesure avec son unité"),
        competence("decrire-transformation-chimique", "Décrire une transformation chimique"),
      ]),
    ]),
    domain("svt", "SVT", [
      subdomain("vivant-environnement", "Vivant et environnement", [
        competence("relier-structure-et-fonction-du-vivant", "Relier structure et fonction du vivant"),
        competence("interpreter-donnees-geologiques", "Interpréter des données géologiques"),
      ]),
    ]),
  ]),
  subject("langues-vivantes", "Langues vivantes", [
    domain("comprehension", "Compréhension", [
      subdomain("oral-ecrit", "Oral et écrit", [
        competence("identifier-sens-global-message-oral", "Identifier le sens global d'un message oral"),
        competence("comprendre-texte-court-authentique", "Comprendre un texte court authentique"),
      ]),
    ]),
    domain("expression", "Expression", [
      subdomain("interaction-production", "Interaction et production", [
        competence("tenir-echange-court", "Tenir un échange court"),
        competence("rediger-texte-court-organise", "Rédiger un texte court organisé"),
      ]),
    ]),
  ]),
  subject("arts", "Arts", [
    domain("culture-pratique", "Culture et pratique artistiques", [
      subdomain("analyse-creation", "Analyse et création", [
        competence("decrire-oeuvre-vocabulaire-adapte", "Décrire une oeuvre avec un vocabulaire adapté"),
        competence("justifier-choix-creation", "Justifier un choix de création"),
      ]),
    ]),
  ]),
  subject("eps", "EPS", [
    domain("performance-cooperation", "Performance et coopération", [
      subdomain("effort-roles", "Effort et rôles", [
        competence("adapter-effort-situation", "Adapter son effort à une situation"),
        competence("tenir-role-collectif", "Tenir un rôle dans un collectif"),
      ]),
    ]),
  ]),
];

const premiereTroncCommun: LyceeSubject[] = [
  subject("francais", "Français", [
    domain("epreuves-anticipees", "Épreuves anticipées", [
      subdomain("lecture-ecriture", "Lecture et écriture", [
        competence("conduire-lecture-lineaire", "Conduire une lecture linéaire"),
        competence("construire-problematique-litteraire", "Construire une problématique littéraire"),
      ]),
    ]),
  ]),
  subject("histoire-geographie", "Histoire-Géographie", [
    domain("documents-composition", "Documents et composition", [
      subdomain("methode", "Méthode", [
        competence("contextualiser-document", "Contextualiser un document"),
        competence("confronter-deux-documents", "Confronter deux documents"),
      ]),
    ]),
  ]),
  subject("emc", "EMC", [
    domain("societe-democratique", "Société démocratique", [
      subdomain("engagement", "Engagement", [
        competence("analyser-forme-engagement", "Analyser une forme d'engagement"),
      ]),
    ]),
  ]),
  subject("langues-vivantes", "Langues vivantes", [
    domain("communication", "Communication", [
      subdomain("argumentation", "Argumentation", [
        competence("defendre-point-de-vue-langue-vivante", "Défendre un point de vue en langue vivante"),
      ]),
    ]),
  ]),
  subject("eps", "EPS", [
    domain("autonomie", "Autonomie et projet", [
      subdomain("entrainement", "Entraînement", [
        competence("construire-projet-entrainement", "Construire un projet d'entraînement"),
      ]),
    ]),
  ]),
];

const premiereSpecialites: LyceeSubject[] = [
  subject("mathematiques", "Mathématiques", [
    domain("algebre-analyse", "Algèbre et analyse", [
      subdomain("fonctions-suites", "Fonctions et suites", [
        competence("etudier-variations-fonction", "Étudier les variations d'une fonction"),
        competence("modeliser-situation-suite", "Modéliser une situation par une suite"),
      ]),
    ]),
  ]),
  subject("sciences", "Sciences", [
    domain("specialites-scientifiques", "Spécialités scientifiques", [
      subdomain("physique-chimie-svt", "Physique-Chimie et SVT", [
        competence("exploiter-protocole-experimental", "Exploiter un protocole expérimental"),
        competence("argumenter-donnees-scientifiques", "Argumenter à partir de données scientifiques"),
      ]),
    ]),
  ]),
  subject("humanites-sciences-sociales", "Humanités et sciences sociales", [
    domain("specialites-humanites", "Spécialités humanités", [
      subdomain("ses-hggsp", "SES et HGGSP", [
        competence("expliquer-mecanisme-economique-social", "Expliquer un mécanisme économique ou social"),
        competence("analyser-enjeu-geopolitique", "Analyser un enjeu géopolitique"),
      ]),
    ]),
  ]),
];

const terminaleTroncCommun: LyceeSubject[] = [
  subject("philosophie", "Philosophie", [
    domain("problemes-philosophiques", "Problèmes philosophiques", [
      subdomain("notions-dissertation", "Notions et dissertation", [
        competence("formuler-probleme-philosophique", "Formuler un problème philosophique"),
        competence("construire-raisonnement-philosophique", "Construire un raisonnement philosophique"),
      ]),
    ]),
  ]),
  subject("histoire-geographie", "Histoire-Géographie", [
    domain("composition", "Composition", [
      subdomain("problematique-plan", "Problématique et plan", [
        competence("elaborer-plan-composition", "Élaborer un plan de composition"),
      ]),
    ]),
  ]),
  subject("emc", "EMC", [
    domain("republique-citoyennete", "République et citoyenneté", [
      subdomain("deliberation", "Délibération", [
        competence("argumenter-deliberation-citoyenne", "Argumenter dans une délibération citoyenne"),
      ]),
    ]),
  ]),
  subject("langues-vivantes", "Langues vivantes", [
    domain("expression-avancee", "Expression avancée", [
      subdomain("oral", "Oral", [
        competence("presenter-idee-complexe-langue-vivante", "Présenter une idée complexe en langue vivante"),
      ]),
    ]),
  ]),
  subject("eps", "EPS", [
    domain("projet-personnel", "Projet personnel", [
      subdomain("performance", "Performance", [
        competence("analyser-performance-progresser", "Analyser sa performance pour progresser"),
      ]),
    ]),
  ]),
];

const terminaleSpecialites: LyceeSubject[] = [
  subject("mathematiques", "Mathématiques", [
    domain("analyse-probabilites", "Analyse et probabilités", [
      subdomain("limites-lois", "Limites et lois", [
        competence("etudier-limite-fonction", "Étudier une limite de fonction"),
        competence("utiliser-loi-probabilite", "Utiliser une loi de probabilité"),
      ]),
    ]),
  ]),
  subject("sciences", "Sciences", [
    domain("specialites-scientifiques", "Spécialités scientifiques", [
      subdomain("physique-chimie-svt", "Physique-Chimie et SVT", [
        competence("modeliser-transformation-scientifique", "Modéliser une transformation physique ou chimique"),
        competence("resoudre-probleme-scientifique-argumente", "Résoudre un problème scientifique argumenté"),
      ]),
    ]),
  ]),
  subject("grand-oral", "Grand Oral", [
    domain("preparation-orale", "Préparation orale", [
      subdomain("question-expose", "Question et exposé", [
        competence("formuler-question-grand-oral", "Formuler une question de Grand Oral"),
        competence("soutenir-expose-argumente", "Soutenir un exposé argumenté"),
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
        subjects: secondeTroncCommun,
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
        subjects: premiereTroncCommun,
      },
      {
        id: "premiere-specialites",
        slug: "specialites",
        title: "Enseignements de spécialité",
        status: "upcoming",
        subjects: premiereSpecialites,
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
        subjects: terminaleTroncCommun,
      },
      {
        id: "terminale-specialites",
        slug: "specialites",
        title: "Enseignements de spécialité",
        status: "upcoming",
        subjects: terminaleSpecialites,
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
  slug: LyceeLevelSlug,
): LyceeCurriculumLevel | undefined {
  return lyceeCurriculumLevels.find((level) => level.slug === slug);
}

export function countLyceeSequenceCompetences(
  levels: readonly LyceeCurriculumLevel[] = lyceeCurriculumLevels,
): number {
  return levels.reduce(
    (levelTotal, level) =>
      levelTotal +
      level.parcours.reduce(
        (parcoursTotal, parcours) =>
          parcoursTotal +
          parcours.subjects.reduce(
            (subjectTotal, currentSubject) =>
              subjectTotal +
              currentSubject.domains.reduce(
                (domainTotal, currentDomain) =>
                  domainTotal +
                  currentDomain.subdomains.reduce(
                    (subdomainTotal, currentSubdomain) =>
                      subdomainTotal + currentSubdomain.sequences.length,
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
