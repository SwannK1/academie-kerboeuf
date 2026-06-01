// Arbre catalogue CE2 - Cycle 2, primaire.
// Structure : matiere -> domaine -> sous-domaine -> sequence-competence.
// Aucun PDF cree, aucun href fictif.

import type {
  AcademyLevelProgram,
  Lesson,
  PedagogicalResourceRef,
  ProgramDomain,
  ProgramStatus,
  ProgramSubdomain,
} from "@/content/program-types";

export type Ce2SubjectSummary = {
  slug: string;
  title: string;
  shortDescription: string;
  domains: string[];
  status: ProgramStatus;
  accent: string;
};

export type Ce2CompetencyDefinition = {
  slug: string;
  title: string;
  objective: string;
  criteria: string[];
};

export type Ce2SubdomainNode = {
  slug: string;
  title: string;
  description: string;
  competencies: Ce2CompetencyDefinition[];
};

export type Ce2DomainNode = {
  slug: string;
  title: string;
  description: string;
  subdomains: Ce2SubdomainNode[];
};

export type Ce2SubjectNode = {
  slug: string;
  title: string;
  description: string;
  domains: Ce2DomainNode[];
  status: ProgramStatus;
  accent: string;
};

type RawCompetency = readonly [string, string, string];
type RawSubdomain = Omit<Ce2SubdomainNode, "competencies"> & {
  competencies: readonly RawCompetency[];
};
type RawDomain = Omit<Ce2DomainNode, "subdomains"> & {
  subdomains: readonly RawSubdomain[];
};
type RawSubject = Omit<Ce2SubjectNode, "domains"> & {
  domains: readonly RawDomain[];
};

export const CE2_PLANNED_PDF_RESOURCES: PedagogicalResourceRef[] = [
  { kind: "lesson-pdf", label: "Leçon PDF", status: "planned" },
  { kind: "exercises-pdf", label: "Exercices PDF", status: "planned" },
  { kind: "correction-pdf", label: "Correction PDF", status: "planned" },
  { kind: "projectable-pdf", label: "Projection PDF", status: "planned" },
  { kind: "parent-sheet-pdf", label: "Fiche parent", status: "planned" },
];

export function cloneCe2PlannedPdfResources(): PedagogicalResourceRef[] {
  return CE2_PLANNED_PDF_RESOURCES.map((resource) => ({ ...resource }));
}

const DEFAULT_CRITERIA = [
  "Je comprends la consigne de la competence.",
  "J'utilise une methode adaptee.",
  "Je peux expliquer ma reponse ou mon action.",
];

const rawCe2Subjects = [
  subject("francais", "Français", "Lire, comprendre, ecrire, dire et observer la langue en fin de cycle 2.", "jade", [
    domain("langage", "Langage oral, lecture et ecriture", "Construire la comprehension et produire des ecrits courts.", [
      subdomain("lecture-comprehension", "Lecture et comprehension", "Comprendre des textes de plus en plus autonomement.", [
        ["identifier-les-informations-principales-dun-texte", "Identifier les informations principales d'un texte", "Reperer les informations essentielles d'un texte court."],
        ["reperer-une-information-implicite", "Reperer une information implicite", "Deduire une information simple a partir d'indices du texte."],
        ["lire-un-texte-documentaire-court", "Lire un texte documentaire court", "Utiliser titres, paragraphes et mots-cles pour s'informer."],
        ["reformuler-ce-quon-a-compris", "Reformuler ce qu'on a compris", "Redire l'idee principale d'un passage avec ses propres mots."],
      ]),
      subdomain("ecriture", "Ecriture", "Produire, organiser et reviser des textes courts.", [
        ["produire-un-court-texte-organise", "Produire un court texte organise", "Ecrire trois a cinq phrases liees a une consigne."],
        ["enrichir-une-phrase-par-des-details", "Enrichir une phrase par des details", "Ajouter des precisions utiles sans perdre le sens de la phrase."],
        ["reviser-son-texte-avec-une-aide", "Reviser son texte avec une aide", "Relire et corriger un point cible dans son propre texte."],
      ]),
      subdomain("oral", "Oral", "Ecouter, reformuler et presenter clairement.", [
        ["presenter-une-information-a-loral", "Presenter une information a l'oral", "Exposer brievement une information avec un vocabulaire precis."],
        ["ecouter-et-reformuler-un-propos", "Ecouter et reformuler un propos", "Reprendre l'idee d'un camarade sans la transformer."],
      ]),
    ]),
    domain("etude-de-la-langue", "Etude de la langue", "Observer la phrase, les accords et les verbes usuels.", [
      subdomain("grammaire-orthographe", "Grammaire et orthographe", "Stabiliser les accords et les reperes grammaticaux.", [
        ["accorder-dans-le-groupe-nominal", "Accorder dans le groupe nominal", "Marquer le genre et le nombre dans un groupe nominal simple."],
        ["identifier-le-sujet-et-le-verbe", "Identifier le sujet et le verbe", "Reperer le verbe conjugue et son sujet dans une phrase simple."],
        ["conjuguer-au-present-les-verbes-frequents", "Conjuguer au present les verbes frequents", "Employer les formes usuelles du present dans des phrases courtes."],
      ]),
    ]),
  ]),
  subject("mathematiques", "Mathematiques", "Nombres, calcul, problemes, grandeurs, mesures, espace et geometrie.", "gold", [
    domain("nombres-et-calculs", "Nombres et calculs", "Comprendre les nombres et choisir des procedures de calcul.", [
      subdomain("numeration", "Numeration", "Lire, ecrire, comparer et decomposer les nombres.", [
        ["lire-et-ecrire-les-nombres-jusqua-1000", "Lire et ecrire les nombres jusqu'a 1 000", "Associer ecriture chiffree, nom oral et decomposition."],
        ["comparer-et-ranger-des-nombres-jusqua-1000", "Comparer et ranger des nombres jusqu'a 1 000", "Ordonner les nombres avec centaines, dizaines et unites."],
        ["decomposer-un-nombre-en-centaines-dizaines-unites", "Decomposer un nombre en centaines, dizaines et unites", "Exprimer la valeur de chaque chiffre dans un nombre."],
      ]),
      subdomain("calcul-mental", "Calcul mental", "Construire des automatismes expliques.", [
        ["ajouter-9-19-29-rapidement", "Ajouter 9, 19 ou 29 rapidement", "Transformer un ajout proche d'une dizaine en calcul plus simple."],
        ["memoriser-les-tables-de-multiplication-2-a-5", "Memoriser les tables de multiplication 2 a 5", "Restituer rapidement les produits des premieres tables."],
        ["calculer-des-doubles-et-des-moities", "Calculer des doubles et des moities", "Utiliser doubles et moities dans des calculs courts."],
      ]),
      subdomain("problemes", "Problemes", "Modeliser et expliquer une demarche.", [
        ["resoudre-un-probleme-multiplicatif-simple", "Resoudre un probleme multiplicatif simple", "Utiliser addition repetee ou multiplication dans une situation courte."],
        ["expliquer-sa-demarche-de-resolution", "Expliquer sa demarche de resolution", "Relier les donnees, l'operation choisie et la phrase reponse."],
      ]),
    ]),
    domain("grandeurs-geometrie", "Grandeurs, mesures et geometrie", "Mesurer, comparer, tracer et se reperer.", [
      subdomain("grandeurs-mesures", "Grandeurs et mesures", "Utiliser les unites usuelles.", [
        ["mesurer-et-convertir-des-longueurs-simples", "Mesurer et convertir des longueurs simples", "Utiliser m, dm, cm et mm dans des conversions voisines."],
        ["comparer-et-mesurer-des-masses", "Comparer et mesurer des masses", "Utiliser kg et g pour peser et comparer des objets."],
      ]),
      subdomain("geometrie", "Espace et geometrie", "Utiliser les instruments et decrire des figures.", [
        ["tracer-une-figure-simple", "Tracer une figure simple", "Utiliser regle et equerre pour reproduire une figure guidee."],
        ["reconnaitre-angles-droits-et-alignements", "Reconnaitre angles droits et alignements", "Verifier un angle droit ou un alignement avec l'outil adapte."],
      ]),
    ]),
  ]),
  subject("questionner-le-monde", "Questionner le monde", "Se reperer dans le temps, l'espace et explorer le vivant et la matiere.", "sky", [
    domain("espace-temps", "Espace et temps", "Lire des reperes et organiser des evenements.", [
      subdomain("espace", "Se reperer dans l'espace", "Lire un plan et decrire un trajet.", [
        ["lire-un-plan-simple", "Lire un plan simple", "Orienter un plan et utiliser sa legende."],
        ["decrire-un-trajet-court", "Decrire un trajet court", "Employer des reperes spatiaux pour expliquer un deplacement."],
      ]),
      subdomain("temps", "Se reperer dans le temps", "Situer et comparer des evenements.", [
        ["situer-un-evenement-sur-une-frise-chronologique", "Situer un evenement sur une frise chronologique", "Placer et relier des evenements simples sur une frise."],
        ["comparer-des-durees-simples", "Comparer des durees simples", "Utiliser jour, semaine, mois et annee pour comparer des durees."],
      ]),
    ]),
    domain("vivant-matiere-objets", "Vivant, matiere et objets", "Observer, classer et decrire des phenomenes simples.", [
      subdomain("vivant", "Le vivant", "Identifier des besoins et cycles de vie.", [
        ["identifier-les-besoins-dun-etre-vivant", "Identifier les besoins d'un etre vivant", "Relier un etre vivant a ses besoins essentiels."],
        ["decrire-un-cycle-de-vie-simple", "Decrire un cycle de vie simple", "Ordonner les etapes visibles d'un developpement."],
      ]),
      subdomain("matiere-objets", "Matiere et objets", "Observer les materiaux et les objets techniques.", [
        ["classer-des-materiaux-selon-leurs-proprietes", "Classer des materiaux selon leurs proprietes", "Comparer des objets selon une propriete observable."],
        ["decrire-le-fonctionnement-dun-objet-simple", "Decrire le fonctionnement d'un objet simple", "Nommer les parties utiles et leur role."],
      ]),
    ]),
  ]),
  subject("emc", "EMC", "Comprendre les regles communes, exprimer un jugement et agir avec responsabilite.", "ember", [
    domain("vivre-ensemble", "Vivre ensemble", "Respecter les autres et cooperer.", [
      subdomain("regles-droits-devoirs", "Regles, droits et devoirs", "Comprendre le role des regles communes.", [
        ["expliquer-une-regle-de-vie-collective", "Expliquer une regle de vie collective", "Dire pourquoi une regle aide le groupe a fonctionner."],
        ["distinguer-droit-et-devoir", "Distinguer droit et devoir", "Associer un droit a une responsabilite simple."],
      ]),
      subdomain("jugement-respect", "Jugement et respect", "Argumenter simplement et respecter autrui.", [
        ["exprimer-un-avis-argumente", "Exprimer un avis argumente", "Donner son avis avec une raison comprehensible."],
        ["identifier-une-situation-de-respect-ou-dirrespect", "Identifier une situation de respect ou d'irrespect", "Reconnaitre les paroles ou gestes qui respectent autrui."],
      ]),
    ]),
    domain("engagement-responsabilite", "Engagement et responsabilite", "Participer et adopter des comportements protecteurs.", [
      subdomain("engagement", "Engagement", "Prendre une part utile dans un projet commun.", [
        ["participer-a-un-projet-collectif", "Participer a un projet collectif", "Tenir un role simple dans une action commune."],
      ]),
      subdomain("securite", "Securite", "Identifier des conduites responsables.", [
        ["adopter-un-comportement-responsable-en-ligne", "Adopter un comportement responsable en ligne", "Identifier une information personnelle a proteger."],
        ["reconnaitre-un-danger-du-quotidien", "Reconnaitre un danger du quotidien", "Nommer une conduite sure dans une situation simple."],
      ]),
    ]),
  ]),
  subject("arts", "Arts", "Pratiquer, ecouter, observer et exprimer un ressenti artistique.", "sky", [
    domain("arts-plastiques", "Arts plastiques", "Experimenter des gestes, des outils et des compositions.", [
      subdomain("pratiques-plastiques", "Pratiques plastiques", "Produire et decrire une realisation.", [
        ["composer-une-image-avec-des-formes-et-couleurs", "Composer une image avec des formes et couleurs", "Organiser formes et couleurs selon une intention simple."],
        ["experimenter-un-outil-ou-un-materiau", "Experimenter un outil ou un materiau", "Comparer les effets produits par deux gestes ou outils."],
        ["presenter-sa-production", "Presenter sa production", "Dire un choix realise dans son travail plastique."],
      ]),
    ]),
    domain("education-musicale-histoire-des-arts", "Education musicale et histoire des arts", "Ecouter, chanter et rencontrer des oeuvres.", [
      subdomain("musique", "Musique", "Chanter, ecouter et reperer des parametres sonores.", [
        ["chanter-en-respectant-un-rythme-simple", "Chanter en respectant un rythme simple", "Suivre une pulsation commune dans un chant court."],
        ["decrire-une-ecoute-musicale", "Decrire une ecoute musicale", "Nommer un element entendu : tempo, intensite ou instrument."],
      ]),
      subdomain("histoire-des-arts", "Histoire des arts", "Observer une oeuvre et exprimer un ressenti.", [
        ["observer-une-oeuvre-et-dire-ce-quon-voit", "Observer une oeuvre et dire ce qu'on voit", "Decrire des elements visibles avant de donner son avis."],
        ["relier-une-oeuvre-a-un-contexte-simple", "Relier une oeuvre a un contexte simple", "Associer une oeuvre a une epoque, un lieu ou un usage."],
      ]),
    ]),
  ]),
  subject("eps", "EPS", "Agir, s'exprimer, cooperer et adapter ses deplacements.", "jade", [
    domain("performance-adaptation", "Performance et adaptation", "Mesurer ses progres et adapter ses actions.", [
      subdomain("courses-sauts-lancers", "Courses, sauts et lancers", "Stabiliser des actions motrices simples.", [
        ["courir-avec-une-allure-reguliere", "Courir avec une allure reguliere", "Maintenir une allure adaptee sur une duree courte."],
        ["ameliorer-un-lancer-mesure", "Ameliorer un lancer mesure", "Adapter son geste pour lancer plus loin ou plus precisement."],
      ]),
      subdomain("activites-gymniques", "Activites gymniques", "Enchainer des actions en securite.", [
        ["realiser-un-enchainement-gymnique-simple", "Realiser un enchainement gymnique simple", "Enchainer deux ou trois actions controlees."],
        ["tenir-un-equilibre-court", "Tenir un equilibre court", "Stabiliser une posture pendant quelques secondes."],
      ]),
    ]),
    domain("cooperation-expression", "Cooperation et expression", "Jouer ensemble et s'exprimer par le corps.", [
      subdomain("jeux-collectifs", "Jeux collectifs", "Cooperer et respecter une regle de jeu.", [
        ["cooperer-dans-un-jeu-collectif", "Cooperer dans un jeu collectif", "Agir avec ses partenaires pour atteindre un but commun."],
        ["respecter-un-role-dans-un-jeu", "Respecter un role dans un jeu", "Tenir attaquant, defenseur ou arbitre selon la situation."],
      ]),
      subdomain("danse-expression", "Danse et expression", "Produire une phrase corporelle courte.", [
        ["creer-une-phrase-dansee-courte", "Creer une phrase dansee courte", "Enchainer quelques gestes avec un debut et une fin identifiables."],
      ]),
    ]),
  ]),
] satisfies RawSubject[];

export const ce2SubjectTree: Ce2SubjectNode[] = rawCe2Subjects.map((item) => ({
  ...item,
  domains: item.domains.map((domainItem) => ({
    ...domainItem,
    subdomains: domainItem.subdomains.map((subdomainItem) => ({
      ...subdomainItem,
      competencies: subdomainItem.competencies.map(([slug, title, objective]) => ({
        slug,
        title,
        objective,
        criteria: [...DEFAULT_CRITERIA],
      })),
    })),
  })),
}));

export const ce2Subjects: Ce2SubjectSummary[] = ce2SubjectTree.map((item) => ({
  slug: item.slug,
  title: item.title,
  shortDescription: item.description,
  domains: item.domains.map((domainItem) => domainItem.title),
  status: item.status,
  accent: item.accent,
}));

export const ce2LearningTree: AcademyLevelProgram = {
  levelSlug: "ce2",
  label: "CE2",
  cycle: "cycle-2",
  stage: "primaire",
  characterLink: {
    characterSlug: "esteban",
    name: "Esteban",
    roleHint:
      "Esteban accompagne l'organisation des apprentissages CE2, sans remplacer les contenus PDF futurs.",
  },
  domains: ce2SubjectTree.map((item): ProgramDomain => ({
    id: `ce2-${item.slug}`,
    slug: item.slug,
    title: item.title,
    officialLabel: `${item.title} - Cycle 2`,
    description: item.description,
    subdomains: item.domains.flatMap((domainItem) =>
      domainItem.subdomains.map((subdomainItem) =>
        createLegacySubdomain(item, domainItem, subdomainItem),
      ),
    ),
    status: "upcoming",
  })),
};

function subject(
  slug: string,
  title: string,
  description: string,
  accent: string,
  domains: readonly RawDomain[],
): RawSubject {
  return { slug, title, description, accent, domains, status: "upcoming" };
}

function domain(
  slug: string,
  title: string,
  description: string,
  subdomains: readonly RawSubdomain[],
): RawDomain {
  return { slug, title, description, subdomains };
}

function subdomain(
  slug: string,
  title: string,
  description: string,
  competencies: readonly RawCompetency[],
): RawSubdomain {
  return { slug, title, description, competencies };
}

function createLesson(
  subjectItem: Ce2SubjectNode,
  domainItem: Ce2DomainNode,
  subdomainItem: Ce2SubdomainNode,
  definition: Ce2CompetencyDefinition,
): Lesson {
  const id = getCe2CompetencyId(subjectItem, domainItem, subdomainItem, definition);

  return {
    id,
    slug: definition.slug,
    title: definition.title,
    objective: definition.objective,
    skill: definition.title,
    parentGuidance: { summary: "", quickTips: [], successSigns: [] },
    successCriteria: definition.criteria,
    exercises: [],
    resources: cloneCe2PlannedPdfResources(),
    competencyIds: [id],
    status: "upcoming",
  };
}

function createLegacySubdomain(
  subjectItem: Ce2SubjectNode,
  domainItem: Ce2DomainNode,
  subdomainItem: Ce2SubdomainNode,
): ProgramSubdomain {
  return {
    id: `ce2-${subjectItem.slug}-${domainItem.slug}-${subdomainItem.slug}`,
    slug: `${domainItem.slug}-${subdomainItem.slug}`,
    title: `${domainItem.title} - ${subdomainItem.title}`,
    description: subdomainItem.description,
    lessons: subdomainItem.competencies.map((definition) =>
      createLesson(subjectItem, domainItem, subdomainItem, definition),
    ),
    status: "upcoming",
  };
}

export function getCe2CompetencyId(
  subjectItem: Ce2SubjectNode,
  domainItem: Ce2DomainNode,
  subdomainItem: Ce2SubdomainNode,
  definition: Ce2CompetencyDefinition,
) {
  return `ce2-${subjectItem.slug}-${domainItem.slug}-${subdomainItem.slug}-${definition.slug}`;
}

export function getCe2SubjectBySlug(
  slug: string,
): Ce2SubjectSummary | undefined {
  return ce2Subjects.find((subjectItem) => subjectItem.slug === slug);
}

export function getCe2SubjectTree(slug: string): Ce2SubjectNode | undefined {
  return ce2SubjectTree.find((subjectItem) => subjectItem.slug === slug);
}

export function getCe2Domain(domainSlug: string): ProgramDomain | undefined {
  return ce2LearningTree.domains.find((domainItem) => domainItem.slug === domainSlug);
}

export function getCe2Subdomain(
  domainSlug: string,
  subdomainSlug: string,
): ProgramSubdomain | undefined {
  return getCe2Domain(domainSlug)?.subdomains.find(
    (subdomainItem) => subdomainItem.slug === subdomainSlug,
  );
}

export function getCe2Lesson(
  domainSlug: string,
  subdomainSlug: string,
  lessonSlug: string,
): Lesson | undefined {
  return getCe2Subdomain(domainSlug, subdomainSlug)?.lessons.find(
    (lesson) => lesson.slug === lessonSlug,
  );
}

export function getCe2LessonById(lessonId: string): Lesson | undefined {
  for (const domainItem of ce2LearningTree.domains) {
    for (const subdomainItem of domainItem.subdomains) {
      const found = subdomainItem.lessons.find((lesson) => lesson.id === lessonId);
      if (found) return found;
    }
  }
  return undefined;
}
