/**
 * Source centrale du curriculum de programmation enseignant (CP à CM2).
 *
 * Décrit les compétences observables du programme, organisées par
 * matière puis par domaine. Sert de base à l'outil de programmation
 * annuelle dans /enseignants/programmation. Ne contient aucune référence
 * officielle inventée : les intitulés sont des formulations pédagogiques
 * usuelles, pas des citations de textes réglementaires.
 */

export type SchoolLevel = "cp" | "ce1" | "ce2" | "cm1" | "cm2";
export type Cycle = "cycle-2" | "cycle-3";

export type CurriculumCompetency = {
  id: string;
  label: string;
  level: SchoolLevel;
  cycle: Cycle;
  subjectId: string;
  domainId: string;
  suggestedPeriods?: number[];
  prerequisites?: string[];
  tags?: string[];
};

export type CurriculumDomain = {
  id: string;
  label: string;
  competencies: CurriculumCompetency[];
};

export type CurriculumSubject = {
  id: string;
  label: string;
  domains: CurriculumDomain[];
};

export const schoolLevels: { id: SchoolLevel; label: string; cycle: Cycle }[] = [
  { id: "cp", label: "CP", cycle: "cycle-2" },
  { id: "ce1", label: "CE1", cycle: "cycle-2" },
  { id: "ce2", label: "CE2", cycle: "cycle-2" },
  { id: "cm1", label: "CM1", cycle: "cycle-3" },
  { id: "cm2", label: "CM2", cycle: "cycle-3" },
];

const CYCLE_BY_LEVEL: Record<SchoolLevel, Cycle> = {
  cp: "cycle-2",
  ce1: "cycle-2",
  ce2: "cycle-2",
  cm1: "cycle-3",
  cm2: "cycle-3",
};

function buildCompetencies(
  level: SchoolLevel,
  subjectId: string,
  domainId: string,
  labels: string[],
): CurriculumCompetency[] {
  return labels.map((label, index) => ({
    id: `${level}-${subjectId}-${domainId}-${index + 1}`,
    label,
    level,
    cycle: CYCLE_BY_LEVEL[level],
    subjectId,
    domainId,
    suggestedPeriods: [(index % 5) + 1],
  }));
}

function buildDomain(
  id: string,
  label: string,
  groups: CurriculumCompetency[][],
): CurriculumDomain {
  return { id, label, competencies: groups.flat() };
}

// ---------------------------------------------------------------------------
// Français
// ---------------------------------------------------------------------------

const francaisSubject: CurriculumSubject = {
  id: "francais",
  label: "Français",
  domains: [
    buildDomain("lecture-comprehension", "Lecture et compréhension", [
      buildCompetencies("cp", "francais", "lecture-comprehension", [
        "Identifier les correspondances graphème-phonème pour les sons simples",
        "Décoder des syllabes simples (consonne-voyelle)",
        "Lire à voix haute des mots simples déjà déchiffrés",
        "Reconnaître les mots-outils les plus fréquents",
        "Répondre à une question simple sur un texte court entendu",
        "Comprendre les informations explicites d'une phrase lue",
        "Reconstituer l'ordre chronologique d'une histoire courte",
        "Lire un texte court avec fluidité et intonation",
      ]),
      buildCompetencies("ce1", "francais", "lecture-comprehension", [
        "Identifier les informations explicites dans un texte court",
        "Répondre à une question par une phrase complète",
        "Justifier une réponse à partir d'un indice du texte",
        "Lire silencieusement un texte court et en restituer le sens",
        "Identifier les personnages et le lieu d'un récit",
        "Mettre en relation deux informations d'un même texte",
        "Lire à voix haute un texte avec une intonation adaptée",
        "Distinguer un texte narratif d'un texte informatif",
      ]),
      buildCompetencies("ce2", "francais", "lecture-comprehension", [
        "Repérer les informations explicites et implicites d'un texte",
        "Formuler des hypothèses de lecture à partir du titre et des illustrations",
        "Identifier le sentiment d'un personnage à partir de ses actions",
        "Résumer un texte court en quelques phrases",
        "Identifier les substituts d'un personnage dans un texte",
        "Lire un texte documentaire et en extraire l'information utile",
        "Comprendre l'enchaînement chronologique et logique d'un récit",
        "Lire à voix haute un texte en respectant la ponctuation",
      ]),
      buildCompetencies("cm1", "francais", "lecture-comprehension", [
        "Repérer les informations explicites et implicites d'un récit long",
        "Identifier le point de vue narratif d'un texte",
        "Mettre en réseau plusieurs textes autour d'un même thème",
        "Distinguer les caractéristiques de différents genres littéraires",
        "Reformuler l'essentiel d'un texte lu silencieusement",
        "Lire à voix haute un texte long avec fluidité",
      ]),
      buildCompetencies("cm2", "francais", "lecture-comprehension", [
        "Comprendre un texte narratif long et en restituer la structure",
        "Repérer les indices implicites révélant l'intention d'un auteur",
        "Comparer plusieurs textes pour en dégager les points communs",
        "Analyser les caractéristiques d'un personnage à partir de ses actes et paroles",
        "Lire un texte argumentatif et identifier la thèse défendue",
        "Lire à voix haute avec fluidité, intonation et respect de la ponctuation",
      ]),
    ]),
    buildDomain("grammaire", "Grammaire", [
      buildCompetencies("cp", "francais", "grammaire", [
        "Distinguer un nom d'un verbe dans une phrase simple",
        "Repérer la ponctuation de fin de phrase (point, point d'interrogation)",
        "Identifier le sujet d'une phrase simple",
        "Reconnaître le singulier et le pluriel d'un nom",
      ]),
      buildCompetencies("ce1", "francais", "grammaire", [
        "Distinguer nom, verbe, adjectif et déterminant dans une phrase",
        "Identifier le groupe sujet et le groupe verbal d'une phrase",
        "Accorder le déterminant et le nom en genre et en nombre",
        "Reconnaître la phrase affirmative et la phrase négative",
        "Identifier les types de phrases (déclarative, interrogative, exclamative)",
      ]),
      buildCompetencies("ce2", "francais", "grammaire", [
        "Identifier la nature des mots dans une phrase",
        "Distinguer la fonction sujet, verbe et complément dans une phrase",
        "Accorder l'adjectif avec le nom qu'il qualifie",
        "Reconnaître les compléments essentiels et les compléments circonstanciels",
        "Utiliser la négation correctement dans une phrase",
        "Identifier les pronoms personnels sujets",
      ]),
      buildCompetencies("cm1", "francais", "grammaire", [
        "Identifier les classes de mots variables et invariables",
        "Distinguer COD et COI dans une phrase",
        "Reconnaître les propositions dans une phrase complexe",
        "Identifier les compléments du nom",
        "Accorder le participe passé employé avec être",
        "Reconnaître les différents types et formes de phrases",
      ]),
      buildCompetencies("cm2", "francais", "grammaire", [
        "Identifier les classes de mots dans une phrase complexe",
        "Analyser les fonctions des groupes de mots dans une phrase",
        "Distinguer phrase simple et phrase complexe",
        "Identifier les propositions subordonnées relatives",
        "Accorder le participe passé employé avec avoir",
        "Utiliser les pronoms relatifs pour éviter les répétitions",
        "Identifier les connecteurs logiques et chronologiques dans un texte",
      ]),
    ]),
    buildDomain("conjugaison", "Conjugaison", [
      buildCompetencies("ce1", "francais", "conjugaison", [
        "Conjuguer au présent les verbes du 1er groupe",
        "Conjuguer au présent être et avoir",
        "Reconnaître l'infinitif d'un verbe conjugué",
      ]),
      buildCompetencies("ce2", "francais", "conjugaison", [
        "Conjuguer au présent les verbes des trois groupes",
        "Conjuguer au futur simple les verbes du 1er groupe",
        "Conjuguer à l'imparfait les verbes du 1er groupe",
        "Identifier le radical et la terminaison d'un verbe conjugué",
      ]),
      buildCompetencies("cm1", "francais", "conjugaison", [
        "Conjuguer à l'imparfait les verbes des trois groupes",
        "Conjuguer au futur simple les verbes des trois groupes",
        "Conjuguer au passé composé avec être et avoir",
        "Distinguer temps simples et temps composés",
      ]),
      buildCompetencies("cm2", "francais", "conjugaison", [
        "Conjuguer au futur simple les verbes des trois groupes",
        "Conjuguer à l'imparfait les verbes des trois groupes",
        "Conjuguer au passé simple les verbes usuels",
        "Conjuguer au conditionnel présent",
        "Identifier la valeur d'un temps verbal dans un récit",
      ]),
    ]),
    buildDomain("orthographe", "Orthographe", [
      buildCompetencies("ce1", "francais", "orthographe", [
        "Écrire sans erreur les mots-outils mémorisés",
        "Marquer le pluriel des noms et adjectifs",
        "Utiliser à bon escient m devant m, b, p",
      ]),
      buildCompetencies("ce2", "francais", "orthographe", [
        "Orthographier les homophones a/à, et/est",
        "Accorder en genre et en nombre dans un groupe nominal",
        "Écrire sans erreur les mots invariables fréquents",
        "Appliquer la règle de l'accord sujet-verbe simple",
      ]),
      buildCompetencies("cm1", "francais", "orthographe", [
        "Distinguer les homophones grammaticaux son/sont, ont/on",
        "Accorder le verbe avec un sujet inversé ou éloigné",
        "Orthographier les mots invariables du niveau",
        "Appliquer les règles d'accord dans le groupe nominal complexe",
      ]),
      buildCompetencies("cm2", "francais", "orthographe", [
        "Accorder le participe passé selon l'auxiliaire employé",
        "Distinguer les homophones grammaticaux ces/ses, leur/leurs",
        "Orthographier les mots de vocabulaire spécifique aux disciplines",
        "Vérifier l'orthographe d'un texte à l'aide d'outils de référence",
      ]),
    ]),
    buildDomain("vocabulaire", "Vocabulaire", [
      buildCompetencies("cp", "francais", "vocabulaire", [
        "Utiliser des mots précis pour nommer ce qui entoure l'élève",
        "Classer des mots par catégories simples",
      ]),
      buildCompetencies("cm1", "francais", "vocabulaire", [
        "Utiliser des synonymes pour enrichir une production écrite",
        "Identifier le sens d'un mot inconnu à l'aide du contexte",
      ]),
      buildCompetencies("cm2", "francais", "vocabulaire", [
        "Utiliser des mots de la même famille pour comprendre un mot inconnu",
        "Distinguer sens propre et sens figuré d'une expression",
      ]),
    ]),
    buildDomain("ecriture-redaction", "Écriture et rédaction", [
      buildCompetencies("cp", "francais", "ecriture-redaction", [
        "Copier un mot ou une phrase courte sans erreur",
        "Écrire un mot en respectant le sens de l'écriture",
        "Produire une phrase simple à l'aide d'un modèle",
        "Raconter oralement une histoire avant de la dicter à l'adulte",
      ]),
      buildCompetencies("ce1", "francais", "ecriture-redaction", [
        "Écrire une phrase simple sous la dictée",
        "Produire un court texte narratif de deux à trois phrases",
        "Relire sa production pour corriger les erreurs évidentes",
      ]),
      buildCompetencies("ce2", "francais", "ecriture-redaction", [
        "Produire un texte narratif organisé en plusieurs phrases",
        "Rédiger une réponse argumentée à une question de lecture",
      ]),
      buildCompetencies("cm1", "francais", "ecriture-redaction", [
        "Rédiger un texte narratif structuré en paragraphes",
        "Produire un texte descriptif en utilisant des adjectifs précis",
      ]),
      buildCompetencies("cm2", "francais", "ecriture-redaction", [
        "Produire un récit cohérent avec situation initiale, péripéties et fin",
        "Rédiger un texte argumentatif court en justifiant un point de vue",
      ]),
    ]),
    buildDomain("oral", "Oral", [
      buildCompetencies("cp", "francais", "oral", [
        "Prendre la parole pour raconter un événement vécu",
        "Écouter un camarade et reformuler ce qu'il a dit",
      ]),
    ]),
  ],
};

// ---------------------------------------------------------------------------
// Mathématiques
// ---------------------------------------------------------------------------

const mathematiquesSubject: CurriculumSubject = {
  id: "mathematiques",
  label: "Mathématiques",
  domains: [
    buildDomain("nombres-et-calculs", "Nombres et calculs", [
      buildCompetencies("cp", "mathematiques", "nombres-et-calculs", [
        "Dénombrer une quantité jusqu'à 10",
        "Lire et écrire les nombres jusqu'à 20",
        "Comparer et ranger des nombres jusqu'à 20",
        "Décomposer un nombre en dizaines et unités jusqu'à 20",
        "Calculer des sommes simples jusqu'à 10",
        "Mémoriser les compléments à 10",
        "Résoudre une addition posée sans retenue",
        "Dénombrer une quantité jusqu'à 100 par groupements",
        "Reconnaître la suite des nombres jusqu'à 100",
        "Utiliser la file numérique pour se repérer parmi les nombres",
      ]),
      buildCompetencies("ce1", "mathematiques", "nombres-et-calculs", [
        "Comprendre la numération décimale jusqu'à 100",
        "Comparer et ranger des nombres jusqu'à 100",
        "Décomposer un nombre en dizaines et unités",
        "Poser et effectuer une addition sans retenue",
        "Poser et effectuer une addition avec retenue",
        "Mémoriser les tables d'addition",
        "Découvrir le sens de la multiplication",
        "Poser et effectuer une soustraction sans retenue",
        "Lire et écrire les nombres jusqu'à 1000",
        "Résoudre un problème additif simple",
      ]),
      buildCompetencies("ce2", "mathematiques", "nombres-et-calculs", [
        "Lire, écrire et décomposer les nombres jusqu'à 10 000",
        "Comparer et ranger des nombres jusqu'à 10 000",
        "Poser et effectuer une soustraction avec retenue",
        "Mémoriser les tables de multiplication",
        "Poser et effectuer une multiplication à un chiffre",
        "Découvrir la notion de division euclidienne",
        "Résoudre un problème à deux étapes",
        "Encadrer un nombre entre deux dizaines ou centaines",
        "Calculer mentalement une somme ou une différence",
        "Utiliser la demi-droite numérique",
      ]),
      buildCompetencies("cm1", "mathematiques", "nombres-et-calculs", [
        "Lire, écrire et décomposer les grands nombres",
        "Comparer et ranger les nombres jusqu'au million",
        "Poser et effectuer une multiplication à deux chiffres",
        "Poser et effectuer une division euclidienne",
        "Comprendre et utiliser les fractions simples",
        "Comparer des fractions de même dénominateur",
        "Comprendre la notion de nombre décimal",
        "Placer un nombre décimal sur une droite numérique",
        "Calculer mentalement avec des nombres entiers",
        "Résoudre un problème mobilisant plusieurs opérations",
      ]),
      buildCompetencies("cm2", "mathematiques", "nombres-et-calculs", [
        "Comparer et ranger des nombres décimaux",
        "Encadrer un nombre décimal entre deux entiers",
        "Additionner et soustraire des nombres décimaux",
        "Multiplier un nombre décimal par un entier",
        "Diviser un nombre décimal par un entier",
        "Résoudre un problème mobilisant des fractions simples",
        "Additionner et soustraire des fractions de même dénominateur",
        "Calculer un pourcentage simple",
        "Utiliser la proportionnalité dans un calcul",
        "Calculer mentalement avec des nombres décimaux",
      ]),
    ]),
    buildDomain("grandeurs-et-mesures", "Grandeurs et mesures", [
      buildCompetencies("cp", "mathematiques", "grandeurs-et-mesures", [
        "Comparer des longueurs par superposition",
        "Mesurer une longueur avec une unité non conventionnelle",
        "Lire l'heure juste sur une horloge",
        "Connaître les jours de la semaine et les mois de l'année",
      ]),
      buildCompetencies("ce1", "mathematiques", "grandeurs-et-mesures", [
        "Mesurer une longueur en centimètres avec une règle",
        "Utiliser les unités de masse usuelles (kg, g)",
        "Lire l'heure avec les minutes",
        "Connaître les unités de monnaie et résoudre un problème simple",
        "Comparer des contenances avec des unités usuelles",
      ]),
      buildCompetencies("ce2", "mathematiques", "grandeurs-et-mesures", [
        "Convertir des longueurs entre mètres et centimètres",
        "Mesurer un périmètre avec une règle",
        "Utiliser les unités de masse et de contenance dans un problème",
        "Calculer une durée simple",
        "Lire et utiliser un calendrier pour résoudre un problème",
        "Utiliser la monnaie pour rendre la monnaie sur un achat",
      ]),
      buildCompetencies("cm1", "mathematiques", "grandeurs-et-mesures", [
        "Convertir des mesures de longueur, masse et contenance",
        "Calculer le périmètre d'un polygone",
        "Calculer l'aire d'un rectangle par comptage d'unités",
        "Calculer une durée à partir de deux horaires",
        "Utiliser les unités de temps dans un problème complexe",
      ]),
      buildCompetencies("cm2", "mathematiques", "grandeurs-et-mesures", [
        "Calculer l'aire d'un rectangle et d'un carré",
        "Calculer le périmètre d'une figure complexe",
        "Convertir entre unités d'aire usuelles",
        "Résoudre un problème de conversion d'unités de mesure",
        "Calculer une vitesse moyenne simple",
        "Estimer un ordre de grandeur avant de calculer",
      ]),
    ]),
    buildDomain("espace-et-geometrie", "Espace et géométrie", [
      buildCompetencies("cp", "mathematiques", "espace-et-geometrie", [
        "Reconnaître et nommer les formes planes usuelles",
        "Se repérer dans l'espace de la feuille",
        "Reproduire une figure simple sur quadrillage",
        "Utiliser le vocabulaire spatial (dessus, dessous, devant, derrière)",
      ]),
      buildCompetencies("ce1", "mathematiques", "espace-et-geometrie", [
        "Reconnaître et nommer les figures planes et leurs propriétés",
        "Tracer un carré et un rectangle sur quadrillage",
        "Reconnaître les solides usuels",
        "Utiliser la règle pour tracer un trait",
        "Se repérer sur un quadrillage à l'aide de coordonnées simples",
      ]),
      buildCompetencies("ce2", "mathematiques", "espace-et-geometrie", [
        "Reconnaître et nommer les figures planes usuelles",
        "Tracer une figure à l'aide d'un gabarit ou d'une règle",
        "Reconnaître les côtés et les sommets d'un polygone",
        "Utiliser l'équerre pour vérifier un angle droit",
        "Reconnaître la symétrie d'une figure simple",
        "Compléter une figure par symétrie sur quadrillage",
      ]),
      buildCompetencies("cm1", "mathematiques", "espace-et-geometrie", [
        "Choisir l'instrument adapté à une construction géométrique",
        "Tracer un cercle à l'aide du compas",
        "Reconnaître et tracer des droites parallèles et perpendiculaires",
        "Construire la symétrie d'une figure par rapport à un axe",
        "Reconnaître les propriétés des quadrilatères usuels",
        "Identifier les solides et leurs patrons",
      ]),
      buildCompetencies("cm2", "mathematiques", "espace-et-geometrie", [
        "Construire une figure géométrique à partir d'un programme de construction",
        "Reconnaître les propriétés des triangles usuels",
        "Construire un patron de solide simple",
        "Calculer la mesure d'un angle avec un rapporteur",
        "Reproduire une figure complexe sur quadrillage",
        "Identifier les axes de symétrie d'une figure",
        "Utiliser le vocabulaire géométrique pour décrire une figure",
      ]),
    ]),
    buildDomain("problemes", "Problèmes", [
      buildCompetencies("cp", "mathematiques", "problemes", [
        "Résoudre un problème additif à l'aide de manipulations",
        "Résoudre un problème simple en choisissant l'opération adaptée",
      ]),
      buildCompetencies("ce1", "mathematiques", "problemes", [
        "Résoudre un problème à une étape avec addition ou soustraction",
        "Justifier la démarche utilisée pour résoudre un problème",
      ]),
      buildCompetencies("ce2", "mathematiques", "problemes", [
        "Résoudre un problème à deux étapes en mobilisant plusieurs opérations",
        "Identifier les données utiles et inutiles dans un énoncé",
      ]),
      buildCompetencies("cm1", "mathematiques", "problemes", [
        "Résoudre un problème mobilisant la proportionnalité",
        "Résoudre un problème à étapes avec des nombres décimaux",
        "Vérifier la vraisemblance d'un résultat obtenu",
      ]),
      buildCompetencies("cm2", "mathematiques", "problemes", [
        "Identifier et résoudre une situation de proportionnalité",
        "Résoudre un problème mobilisant des pourcentages",
        "Résoudre un problème ouvert en élaborant une démarche personnelle",
      ]),
    ]),
  ],
};

// ---------------------------------------------------------------------------
// Questionner le monde (CP, CE1, CE2)
// ---------------------------------------------------------------------------

const questionnerLeMondeSubject: CurriculumSubject = {
  id: "questionner-le-monde",
  label: "Questionner le monde",
  domains: [
    buildDomain("le-vivant", "Le vivant", [
      buildCompetencies("cp", "questionner-le-monde", "le-vivant", [
        "Distinguer le vivant du non-vivant",
        "Identifier les besoins vitaux d'une plante",
        "Décrire les grandes étapes de la croissance d'un être vivant",
      ]),
      buildCompetencies("ce1", "questionner-le-monde", "le-vivant", [
        "Identifier les caractéristiques communes des êtres vivants",
        "Comparer les modes de déplacement des animaux",
        "Identifier les stades de développement d'un animal",
        "Classer des animaux selon leur régime alimentaire",
      ]),
      buildCompetencies("ce2", "questionner-le-monde", "le-vivant", [
        "Identifier les besoins nutritifs des êtres vivants",
        "Décrire le cycle de vie d'un végétal",
        "Identifier les principales fonctions du corps humain",
        "Classer les êtres vivants selon des critères observables",
      ]),
    ]),
    buildDomain("la-matiere", "La matière", [
      buildCompetencies("cp", "questionner-le-monde", "la-matiere", [
        "Distinguer les états solide et liquide de la matière",
        "Reconnaître les effets de la chaleur sur un matériau",
      ]),
      buildCompetencies("ce1", "questionner-le-monde", "la-matiere", [
        "Distinguer les trois états de l'eau",
        "Identifier les changements d'état de l'eau",
        "Reconnaître les propriétés de quelques matériaux usuels",
      ]),
      buildCompetencies("ce2", "questionner-le-monde", "la-matiere", [
        "Identifier les propriétés physiques d'un matériau",
        "Réaliser une expérience simple sur les mélanges",
        "Distinguer mélange homogène et hétérogène",
        "Identifier le cycle de l'eau dans la nature",
      ]),
    ]),
    buildDomain("espace", "Espace", [
      buildCompetencies("cp", "questionner-le-monde", "espace", [
        "Se repérer dans l'espace proche de l'école",
        "Représenter l'espace de la classe par un plan simple",
      ]),
      buildCompetencies("ce1", "questionner-le-monde", "espace", [
        "Se repérer sur un plan simple du quartier",
        "Identifier les éléments d'un paysage local",
      ]),
      buildCompetencies("ce2", "questionner-le-monde", "espace", [
        "Se repérer sur une carte simple à l'aide de repères",
        "Comparer un paysage rural et un paysage urbain",
        "Identifier les grands repères géographiques de la France",
      ]),
    ]),
    buildDomain("temps", "Temps", [
      buildCompetencies("cp", "questionner-le-monde", "temps", [
        "Se repérer dans la journée, la semaine et l'année",
        "Utiliser un calendrier pour situer un événement",
        "Distinguer le temps qui passe au quotidien et le temps historique",
      ]),
      buildCompetencies("ce1", "questionner-le-monde", "temps", [
        "Situer des événements sur une frise chronologique simple",
        "Identifier les générations dans une famille",
        "Comparer des objets ou modes de vie d'hier et d'aujourd'hui",
      ]),
      buildCompetencies("ce2", "questionner-le-monde", "temps", [
        "Situer des grandes périodes historiques sur une frise chronologique",
        "Identifier les traces du passé dans son environnement proche",
        "Comparer des modes de vie à différentes époques",
      ]),
    ]),
  ],
};

// ---------------------------------------------------------------------------
// Enseignement moral et civique
// ---------------------------------------------------------------------------

const emcSubject: CurriculumSubject = {
  id: "emc",
  label: "Enseignement moral et civique",
  domains: [
    buildDomain("sensibilite", "La sensibilité", [
      buildCompetencies("cp", "emc", "sensibilite", [
        "Exprimer ses émotions avec des mots adaptés",
        "Identifier les émotions d'autrui à partir d'indices observables",
      ]),
      buildCompetencies("ce1", "emc", "sensibilite", [
        "Identifier et nommer ses émotions dans différentes situations",
        "Manifester de l'empathie envers un camarade en difficulté",
      ]),
      buildCompetencies("ce2", "emc", "sensibilite", [
        "Exprimer ses émotions en respectant celles des autres",
        "Identifier des situations d'exclusion et leurs conséquences",
      ]),
      buildCompetencies("cm1", "emc", "sensibilite", [
        "Identifier ses émotions et celles d'autrui dans des situations complexes",
        "Respecter la sensibilité et les différences d'autrui",
      ]),
      buildCompetencies("cm2", "emc", "sensibilite", [
        "Respecter les différences et lutter contre les discriminations",
        "Exprimer un désaccord de manière constructive",
      ]),
    ]),
    buildDomain("regle-et-droit", "La règle et le droit", [
      buildCompetencies("cp", "emc", "regle-et-droit", [
        "Respecter les règles de vie de la classe",
        "Identifier les conséquences du non-respect d'une règle commune",
      ]),
      buildCompetencies("ce1", "emc", "regle-et-droit", [
        "Comprendre l'utilité des règles de vie collective",
        "Distinguer une règle et une loi dans des exemples simples",
      ]),
      buildCompetencies("ce2", "emc", "regle-et-droit", [
        "Identifier les droits et les devoirs de l'élève",
        "Comprendre le rôle des règles dans la vie en société",
      ]),
      buildCompetencies("cm1", "emc", "regle-et-droit", [
        "Comprendre les principes de la démocratie à l'échelle de la classe",
        "Identifier les institutions garantissant les droits de l'enfant",
      ]),
      buildCompetencies("cm2", "emc", "regle-et-droit", [
        "Comprendre le fonctionnement des institutions de la République",
        "Identifier les valeurs de la République et leur application concrète",
      ]),
    ]),
    buildDomain("jugement", "Le jugement", [
      buildCompetencies("cp", "emc", "jugement", [
        "Distinguer ce qui est juste de ce qui est injuste dans une situation simple",
        "Donner son avis en respectant celui des autres",
      ]),
      buildCompetencies("ce1", "emc", "jugement", [
        "Argumenter un point de vue sur une situation de classe",
        "Distinguer un fait d'une opinion",
      ]),
      buildCompetencies("ce2", "emc", "jugement", [
        "Confronter son point de vue à celui d'autrui dans un débat",
        "Distinguer la règle, la loi et la morale",
      ]),
      buildCompetencies("cm1", "emc", "jugement", [
        "Participer à un débat argumenté en respectant les règles de prise de parole",
        "Distinguer un argument valable d'une opinion non justifiée",
      ]),
      buildCompetencies("cm2", "emc", "jugement", [
        "Construire un raisonnement argumenté sur une question de société",
        "Distinguer information vérifiée et rumeur",
      ]),
    ]),
    buildDomain("engagement", "L'engagement", [
      buildCompetencies("cp", "emc", "engagement", [
        "Participer à une tâche collective de la classe",
        "Proposer une solution simple à un conflit entre camarades",
      ]),
      buildCompetencies("ce1", "emc", "engagement", [
        "S'impliquer dans un projet collectif de la classe",
        "Proposer une action pour améliorer la vie de la classe",
      ]),
      buildCompetencies("ce2", "emc", "engagement", [
        "Coopérer dans un projet collectif en répartissant les rôles",
        "S'investir dans une action de solidarité de classe",
      ]),
      buildCompetencies("cm1", "emc", "engagement", [
        "S'engager dans un projet collectif sur la durée",
        "Identifier des actions de solidarité à l'échelle locale",
      ]),
      buildCompetencies("cm2", "emc", "engagement", [
        "Élaborer et conduire un projet collectif jusqu'à son terme",
        "S'engager dans une action de citoyenneté à l'échelle de l'école",
      ]),
    ]),
  ],
};

// ---------------------------------------------------------------------------
// Éducation physique et sportive
// ---------------------------------------------------------------------------

const epsSubject: CurriculumSubject = {
  id: "eps",
  label: "Éducation physique et sportive",
  domains: [
    buildDomain("activites-athletiques", "Activités athlétiques", [
      buildCompetencies("cp", "eps", "activites-athletiques", [
        "Courir vite sur une courte distance",
        "Sauter en longueur à partir d'une impulsion",
      ]),
      buildCompetencies("ce1", "eps", "activites-athletiques", [
        "Courir longtemps à allure régulière",
        "Lancer un objet loin avec précision",
      ]),
      buildCompetencies("ce2", "eps", "activites-athletiques", [
        "Courir en gérant son effort sur une distance moyenne",
        "Sauter en hauteur en optimisant son impulsion",
        "Lancer un objet en visant une cible",
      ]),
      buildCompetencies("cm1", "eps", "activites-athletiques", [
        "Courir en relais en respectant une zone de transmission",
        "Réaliser un saut en longueur mesuré",
        "Lancer un engin en optimisant la trajectoire",
      ]),
      buildCompetencies("cm2", "eps", "activites-athletiques", [
        "Courir un relais en optimisant la transmission du témoin",
        "Réaliser un triple bond en optimisant les appuis",
        "Lancer un engin pour battre sa propre performance",
      ]),
    ]),
    buildDomain("activites-aquatiques", "Activités aquatiques", [
      buildCompetencies("cp", "eps", "activites-aquatiques", [
        "Se déplacer dans l'eau en toute sécurité",
        "Accepter l'immersion du visage dans l'eau",
      ]),
      buildCompetencies("ce1", "eps", "activites-aquatiques", [
        "Se déplacer sur une courte distance sans appui",
        "Maîtriser sa respiration lors d'un déplacement dans l'eau",
      ]),
      buildCompetencies("ce2", "eps", "activites-aquatiques", [
        "Nager sur une courte distance en autonomie",
        "S'immerger pour réaliser une action sous l'eau",
      ]),
      buildCompetencies("cm1", "eps", "activites-aquatiques", [
        "Nager sur une distance de 15 à 25 mètres",
        "Plonger et se déplacer en immersion sur une courte distance",
      ]),
      buildCompetencies("cm2", "eps", "activites-aquatiques", [
        "Nager en autonomie sur une distance de 25 à 50 mètres",
        "Réaliser un sauvetage simple en milieu aquatique sécurisé",
      ]),
    ]),
    buildDomain("jeux-collectifs", "Jeux collectifs", [
      buildCompetencies("cp", "eps", "jeux-collectifs", [
        "Participer à un jeu collectif simple en respectant les règles",
        "Coopérer avec un camarade pour atteindre un but commun",
      ]),
      buildCompetencies("ce1", "eps", "jeux-collectifs", [
        "Respecter les règles d'un jeu collectif avec ballon",
        "Adapter son déplacement à une situation de jeu collectif",
      ]),
      buildCompetencies("ce2", "eps", "jeux-collectifs", [
        "Occuper une place définie dans un jeu collectif",
        "Adapter son jeu en fonction des actions adverses",
        "Respecter l'arbitrage dans un jeu collectif",
      ]),
      buildCompetencies("cm1", "eps", "jeux-collectifs", [
        "Élaborer une stratégie collective simple dans un jeu d'opposition",
        "Tenir un rôle d'attaquant ou de défenseur dans un jeu collectif",
        "Respecter un code arbitral dans une rencontre sportive",
      ]),
      buildCompetencies("cm2", "eps", "jeux-collectifs", [
        "Construire une stratégie d'équipe dans un jeu collectif",
        "Assurer un rôle d'arbitre dans un jeu collectif",
        "S'adapter à un changement de rôle au sein d'une équipe",
      ]),
    ]),
    buildDomain("activites-gymniques", "Activités gymniques", [
      buildCompetencies("cp", "eps", "activites-gymniques", [
        "Réaliser un enchaînement simple de rouleades",
        "Se déplacer en équilibre sur un banc",
      ]),
      buildCompetencies("ce1", "eps", "activites-gymniques", [
        "Réaliser un enchaînement de figures gymniques simples",
        "Franchir un obstacle en maîtrisant son équilibre",
      ]),
      buildCompetencies("ce2", "eps", "activites-gymniques", [
        "Réaliser un enchaînement gymnique avec une prise de risque maîtrisée",
        "Maintenir un équilibre statique sur un agrès",
      ]),
      buildCompetencies("cm1", "eps", "activites-gymniques", [
        "Réaliser un enchaînement gymnique enchaînant plusieurs éléments",
        "Assurer la réception d'un saut avec équilibre",
      ]),
      buildCompetencies("cm2", "eps", "activites-gymniques", [
        "Concevoir et présenter un enchaînement gymnique original",
        "Aider et parer un camarade lors d'un agrès",
      ]),
    ]),
  ],
};

// ---------------------------------------------------------------------------
// Arts plastiques
// ---------------------------------------------------------------------------

const artsPlastiquesSubject: CurriculumSubject = {
  id: "arts-plastiques",
  label: "Arts plastiques",
  domains: [
    buildDomain("pratiques-plastiques", "Pratiques plastiques", [
      buildCompetencies("cp", "arts-plastiques", "pratiques-plastiques", [
        "Utiliser des outils simples (pinceau, crayon, ciseaux) pour créer",
        "Explorer les couleurs primaires par le mélange",
        "Réaliser une production plastique à partir d'une consigne simple",
        "Observer et décrire une œuvre d'art simple",
      ]),
      buildCompetencies("ce1", "arts-plastiques", "pratiques-plastiques", [
        "Expérimenter différentes techniques de peinture",
        "Réaliser une composition à partir d'éléments de récupération",
        "Utiliser la couleur pour exprimer une émotion",
        "Observer et comparer deux œuvres d'art",
        "Réaliser une production en respectant un format donné",
      ]),
      buildCompetencies("ce2", "arts-plastiques", "pratiques-plastiques", [
        "Expérimenter des techniques mixtes (collage, peinture, dessin)",
        "Réaliser une production en respectant une intention artistique",
        "Utiliser la perspective simple dans un dessin",
        "Observer une œuvre et identifier ses éléments constitutifs",
        "Présenter sa production et expliquer ses choix",
      ]),
      buildCompetencies("cm1", "arts-plastiques", "pratiques-plastiques", [
        "Expérimenter différents matériaux pour réaliser une production en volume",
        "Utiliser la lumière et l'ombre pour donner du relief à un dessin",
        "Réaliser une production plastique en lien avec une œuvre de référence",
        "Analyser les choix plastiques d'un artiste dans une œuvre",
        "Réaliser une production collective autour d'un projet commun",
        "Utiliser le numérique pour créer une image",
        "Expérimenter la composition d'une image (cadrage, plan)",
        "Présenter et argumenter sur sa démarche de création",
      ]),
      buildCompetencies("cm2", "arts-plastiques", "pratiques-plastiques", [
        "Réaliser une production en explorant un geste artistique imposé",
        "Analyser une œuvre d'art en identifiant son contexte de création",
        "Réaliser une production en réinterprétant une œuvre de référence",
        "Utiliser les couleurs complémentaires pour créer un contraste",
        "Concevoir une production en trois dimensions à partir d'un projet personnel",
        "Présenter et débattre des choix esthétiques d'une production",
        "Utiliser des outils numériques pour retoucher une image",
        "Réaliser un carnet de recherche artistique personnel",
      ]),
    ]),
  ],
};

// ---------------------------------------------------------------------------
// Éducation musicale
// ---------------------------------------------------------------------------

const educationMusicaleSubject: CurriculumSubject = {
  id: "education-musicale",
  label: "Éducation musicale",
  domains: [
    buildDomain("pratiques-musicales", "Pratiques musicales", [
      buildCompetencies("cp", "education-musicale", "pratiques-musicales", [
        "Reconnaître et reproduire un rythme simple en frappant des mains",
        "Chanter une chanson simple avec le groupe",
        "Identifier des sons de l'environnement et les nommer",
        "Distinguer un son aigu d'un son grave",
      ]),
      buildCompetencies("ce1", "education-musicale", "pratiques-musicales", [
        "Chanter en respectant une intonation juste",
        "Reconnaître les paramètres du son (intensité, durée, hauteur)",
        "Reproduire une formule rythmique simple avec un instrument",
        "Identifier la voix et quelques instruments dans un extrait musical",
        "Participer à un projet musical collectif",
      ]),
      buildCompetencies("ce2", "education-musicale", "pratiques-musicales", [
        "Chanter à plusieurs voix une mélodie simple",
        "Identifier la structure d'une chanson (couplet, refrain)",
        "Coder et décoder un rythme simple",
        "Décrire les effets produits par une œuvre musicale écoutée",
        "Participer à une création musicale collective",
      ]),
      buildCompetencies("cm1", "education-musicale", "pratiques-musicales", [
        "Chanter un répertoire varié en respectant la justesse et le rythme",
        "Identifier les caractéristiques d'un genre musical",
        "Utiliser des instruments pour accompagner un chant",
        "Comparer deux œuvres musicales de styles différents",
        "Coder une production rythmique sur une partition simplifiée",
        "Participer à un projet musical en tenant un rôle précis",
      ]),
      buildCompetencies("cm2", "education-musicale", "pratiques-musicales", [
        "Interpréter un chant à plusieurs voix avec nuances",
        "Identifier l'évolution d'une œuvre musicale dans le temps",
        "Créer un accompagnement rythmique original pour un chant",
        "Analyser les éléments constitutifs d'une œuvre musicale écoutée",
        "Utiliser des outils numériques pour créer une production sonore",
        "Présenter et argumenter ses choix dans un projet musical collectif",
      ]),
    ]),
  ],
};

// ---------------------------------------------------------------------------
// Langue vivante
// ---------------------------------------------------------------------------

const langueVivanteSubject: CurriculumSubject = {
  id: "langue-vivante",
  label: "Langue vivante",
  domains: [
    buildDomain("comprehension-orale", "Compréhension orale", [
      buildCompetencies("cp", "langue-vivante", "comprehension-orale", [
        "Comprendre des consignes simples données en langue étrangère",
        "Reconnaître des mots familiers à l'oral",
      ]),
      buildCompetencies("ce1", "langue-vivante", "comprehension-orale", [
        "Comprendre des consignes de classe courantes",
        "Comprendre une question simple sur soi-même",
        "Repérer des mots connus dans une courte histoire entendue",
      ]),
      buildCompetencies("ce2", "langue-vivante", "comprehension-orale", [
        "Comprendre une consigne complexe à l'oral",
        "Comprendre les idées générales d'une courte histoire",
        "Comprendre une description simple d'un lieu ou d'une personne",
        "Identifier des informations chiffrées simples (âge, heure)",
      ]),
      buildCompetencies("cm1", "langue-vivante", "comprehension-orale", [
        "Comprendre l'essentiel d'un message oral sur un sujet familier",
        "Comprendre une description orale détaillée",
      ]),
      buildCompetencies("cm2", "langue-vivante", "comprehension-orale", [
        "Comprendre un message oral comportant plusieurs informations",
        "Comprendre les paroles d'une chanson simple",
        "Comprendre un court dialogue entre locuteurs natifs",
      ]),
    ]),
    buildDomain("expression-orale", "Expression orale", [
      buildCompetencies("cp", "langue-vivante", "expression-orale", [
        "Reproduire des sons et une intonation propres à la langue étrangère",
        "Se présenter en utilisant des mots simples appris",
      ]),
      buildCompetencies("ce1", "langue-vivante", "expression-orale", [
        "Se présenter en donnant son nom, son âge et ses goûts",
        "Poser une question simple à un camarade",
        "Répondre à une question simple par une phrase courte",
      ]),
      buildCompetencies("ce2", "langue-vivante", "expression-orale", [
        "Décrire un objet ou une personne avec un vocabulaire simple",
        "Raconter un événement simple au présent",
        "Participer à un dialogue simple sur un sujet familier",
      ]),
      buildCompetencies("cm1", "langue-vivante", "expression-orale", [
        "Raconter un événement passé avec un vocabulaire simple",
        "Exprimer une préférence et la justifier brièvement",
      ]),
      buildCompetencies("cm2", "langue-vivante", "expression-orale", [
        "Présenter un exposé court sur un sujet simple",
        "Donner son avis sur un sujet familier en le justifiant",
        "Participer à un échange oral suivi sur un sujet connu",
      ]),
    ]),
    buildDomain("culture-et-lexique", "Culture et lexique", [
      buildCompetencies("cp", "langue-vivante", "culture-et-lexique", [
        "Découvrir des comptines et chansons dans la langue étrangère",
        "Identifier quelques mots de civilisation simples (pays, drapeau)",
      ]),
      buildCompetencies("ce1", "langue-vivante", "culture-et-lexique", [
        "Identifier des éléments culturels simples du pays concerné",
        "Reconnaître des fêtes ou traditions du pays de la langue apprise",
      ]),
      buildCompetencies("ce2", "langue-vivante", "culture-et-lexique", [
        "Comparer des éléments culturels entre son pays et le pays de la langue apprise",
        "Identifier des spécialités culinaires du pays concerné",
        "Découvrir une légende ou un conte du pays concerné",
      ]),
      buildCompetencies("cm1", "langue-vivante", "culture-et-lexique", [
        "Identifier des repères géographiques du pays de la langue apprise",
        "Comparer des modes de vie scolaire entre deux pays",
      ]),
      buildCompetencies("cm2", "langue-vivante", "culture-et-lexique", [
        "Identifier des aspects de la vie quotidienne dans le pays de la langue apprise",
        "Comparer des fêtes et traditions entre plusieurs pays",
      ]),
    ]),
  ],
};

// ---------------------------------------------------------------------------
// Sciences et technologie (CM1, CM2)
// ---------------------------------------------------------------------------

const sciencesTechnologieSubject: CurriculumSubject = {
  id: "sciences-technologie",
  label: "Sciences et technologie",
  domains: [
    buildDomain("le-vivant", "Le vivant", [
      buildCompetencies("cm1", "sciences-technologie", "le-vivant", [
        "Identifier les besoins nutritifs des êtres vivants",
        "Décrire le fonctionnement du système digestif",
        "Identifier les modes de reproduction des êtres vivants",
        "Décrire une chaîne alimentaire simple",
      ]),
      buildCompetencies("cm2", "sciences-technologie", "le-vivant", [
        "Décrire le rôle de la reproduction dans le vivant",
        "Identifier les grandes fonctions du corps humain (respiration, circulation)",
        "Décrire les besoins des plantes pour leur croissance",
        "Identifier l'impact de l'activité humaine sur la biodiversité",
        "Classer les êtres vivants selon une clé de classification simple",
      ]),
    ]),
    buildDomain("la-matiere", "La matière", [
      buildCompetencies("cm1", "sciences-technologie", "la-matiere", [
        "Distinguer les états solide, liquide et gazeux de la matière",
        "Identifier les changements d'état de l'eau et leurs conditions",
        "Reconnaître les propriétés physiques de quelques matériaux",
        "Réaliser une expérience simple sur les mélanges et solutions",
      ]),
      buildCompetencies("cm2", "sciences-technologie", "la-matiere", [
        "Identifier le cycle de l'eau et ses transformations",
        "Distinguer mélange et corps pur dans une expérience",
        "Mesurer une masse et un volume avec les instruments adaptés",
        "Réaliser un protocole expérimental simple en respectant les consignes de sécurité",
      ]),
    ]),
    buildDomain("energie", "L'énergie", [
      buildCompetencies("cm1", "sciences-technologie", "energie", [
        "Reconnaître quelques sources d'énergie et leurs usages",
        "Identifier des situations de consommation d'énergie au quotidien",
        "Distinguer énergie renouvelable et énergie non renouvelable",
      ]),
      buildCompetencies("cm2", "sciences-technologie", "energie", [
        "Identifier les transformations d'énergie dans un objet du quotidien",
        "Comparer les sources d'énergie renouvelables et non renouvelables",
        "Proposer des gestes simples pour économiser l'énergie",
      ]),
    ]),
    buildDomain("objets-techniques", "Les objets techniques", [
      buildCompetencies("cm1", "sciences-technologie", "objets-techniques", [
        "Identifier les principales fonctions d'un objet technique simple",
        "Décrire le fonctionnement d'un objet technique à l'aide d'un schéma",
        "Démonter et remonter un objet technique simple pour comprendre son fonctionnement",
      ]),
      buildCompetencies("cm2", "sciences-technologie", "objets-techniques", [
        "Concevoir un objet technique simple répondant à un besoin",
        "Réaliser un schéma de fonctionnement d'un objet technique",
        "Identifier les évolutions techniques d'un objet dans le temps",
        "Utiliser un vocabulaire technique précis pour décrire un objet",
      ]),
    ]),
  ],
};

// ---------------------------------------------------------------------------
// Histoire (CM1, CM2)
// ---------------------------------------------------------------------------

const histoireSubject: CurriculumSubject = {
  id: "histoire",
  label: "Histoire",
  domains: [
    buildDomain("prehistoire-antiquite", "Préhistoire et Antiquité", [
      buildCompetencies("cm1", "histoire", "prehistoire-antiquite", [
        "Situer la Préhistoire et l'Antiquité sur une frise chronologique",
        "Identifier les grandes étapes de l'évolution humaine à la Préhistoire",
        "Décrire les apports de la civilisation gallo-romaine",
      ]),
    ]),
    buildDomain("moyen-age", "Moyen Âge", [
      buildCompetencies("cm1", "histoire", "moyen-age", [
        "Situer les grandes périodes du Moyen Âge sur une frise chronologique",
        "Décrire l'organisation de la société féodale",
        "Identifier le rôle de l'Église dans la société médiévale",
      ]),
    ]),
    buildDomain("temps-modernes", "Temps modernes", [
      buildCompetencies("cm1", "histoire", "temps-modernes", [
        "Situer les grandes découvertes et la Renaissance dans le temps",
        "Décrire les conséquences des grandes découvertes sur le monde",
      ]),
    ]),
    buildDomain("revolution-xixe", "Révolution et XIXe siècle", [
      buildCompetencies("cm1", "histoire", "revolution-xixe", [
        "Identifier les causes principales de la Révolution française",
        "Décrire les grands changements apportés par la Révolution française",
      ]),
    ]),
    buildDomain("revolution-empire", "Révolution et Empire", [
      buildCompetencies("cm2", "histoire", "revolution-empire", [
        "Situer la Révolution française et l'Empire sur une frise chronologique",
        "Identifier les grands principes de la Déclaration des droits de l'homme",
        "Décrire les transformations politiques de la période révolutionnaire",
      ]),
    ]),
    buildDomain("dix-neuvieme", "Le XIXe siècle", [
      buildCompetencies("cm2", "histoire", "dix-neuvieme", [
        "Décrire les transformations économiques et sociales du XIXe siècle",
        "Identifier les conséquences de la révolution industrielle",
        "Décrire la construction de la République et de ses symboles",
      ]),
    ]),
    buildDomain("guerres-mondiales", "Les guerres mondiales", [
      buildCompetencies("cm2", "histoire", "guerres-mondiales", [
        "Situer les deux guerres mondiales sur une frise chronologique",
        "Identifier les grandes causes et conséquences de la Première Guerre mondiale",
        "Décrire les grandes étapes et conséquences de la Seconde Guerre mondiale",
      ]),
    ]),
    buildDomain("monde-actuel", "Le monde actuel", [
      buildCompetencies("cm2", "histoire", "monde-actuel", [
        "Identifier les grandes étapes de la construction européenne",
        "Décrire les enjeux de la société française depuis 1945",
        "Identifier des questions mémorielles liées à l'histoire du XXe siècle",
      ]),
    ]),
  ],
};

// ---------------------------------------------------------------------------
// Géographie (CM1, CM2)
// ---------------------------------------------------------------------------

const geographieSubject: CurriculumSubject = {
  id: "geographie",
  label: "Géographie",
  domains: [
    buildDomain("espace-proche", "Mon espace proche", [
      buildCompetencies("cm1", "geographie", "espace-proche", [
        "Se repérer sur une carte à différentes échelles",
        "Identifier les éléments d'un paysage à partir d'une carte",
      ]),
    ]),
    buildDomain("se-deplacer", "Se déplacer", [
      buildCompetencies("cm1", "geographie", "se-deplacer", [
        "Identifier les différents modes de transport et leurs usages",
        "Décrire l'évolution des moyens de transport dans le temps",
      ]),
      buildCompetencies("cm2", "geographie", "se-deplacer", [
        "Décrire les réseaux de transport reliant les territoires français et européens",
        "Identifier les enjeux des mobilités quotidiennes",
      ]),
    ]),
    buildDomain("communiquer", "Communiquer", [
      buildCompetencies("cm1", "geographie", "communiquer", [
        "Identifier les moyens de communication et leur évolution",
        "Décrire l'impact des réseaux de communication sur les territoires",
      ]),
    ]),
    buildDomain("habiter", "Habiter un territoire", [
      buildCompetencies("cm1", "geographie", "habiter", [
        "Décrire les caractéristiques d'un espace urbain",
        "Décrire les caractéristiques d'un espace rural",
      ]),
    ]),
    buildDomain("produire", "Produire", [
      buildCompetencies("cm1", "geographie", "produire", [
        "Identifier les grands espaces de production agricole en France",
        "Décrire le fonctionnement d'une zone industrielle ou commerciale",
      ]),
    ]),
    buildDomain("habiter-france", "Habiter la France", [
      buildCompetencies("cm2", "geographie", "habiter-france", [
        "Identifier les grands repères géographiques de la France",
        "Décrire la répartition de la population sur le territoire français",
      ]),
    ]),
    buildDomain("habiter-europe", "Habiter l'Europe", [
      buildCompetencies("cm2", "geographie", "habiter-europe", [
        "Situer les grands repères géographiques de l'Europe",
        "Comparer des modes de vie entre pays européens",
      ]),
    ]),
    buildDomain("mieux-habiter", "Mieux habiter", [
      buildCompetencies("cm2", "geographie", "mieux-habiter", [
        "Identifier des solutions pour un aménagement durable du territoire",
        "Décrire les enjeux environnementaux liés à l'urbanisation",
      ]),
    ]),
    buildDomain("espace-mondial", "L'espace mondial", [
      buildCompetencies("cm2", "geographie", "espace-mondial", [
        "Situer les grands repères géographiques à l'échelle mondiale",
        "Identifier des espaces inégalement connectés à la mondialisation",
      ]),
    ]),
  ],
};

export const curriculumSubjects: CurriculumSubject[] = [
  francaisSubject,
  mathematiquesSubject,
  questionnerLeMondeSubject,
  emcSubject,
  epsSubject,
  artsPlastiquesSubject,
  educationMusicaleSubject,
  langueVivanteSubject,
  sciencesTechnologieSubject,
  histoireSubject,
  geographieSubject,
];

export function getAllCompetencies(): CurriculumCompetency[] {
  return curriculumSubjects.flatMap((subject) =>
    subject.domains.flatMap((domain) => domain.competencies),
  );
}

export function getCompetenciesByLevel(level: SchoolLevel): CurriculumCompetency[] {
  return getAllCompetencies().filter((competency) => competency.level === level);
}

/**
 * Retourne les matières et domaines applicables à un niveau, en ne
 * conservant que les compétences de ce niveau. Les matières et domaines
 * sans compétence pour ce niveau (ex: Histoire pour CP) sont retirés.
 */
export function getSubjectsForLevel(level: SchoolLevel): CurriculumSubject[] {
  return curriculumSubjects
    .map((subject) => {
      const domains = subject.domains
        .map((domain) => ({
          ...domain,
          competencies: domain.competencies.filter((c) => c.level === level),
        }))
        .filter((domain) => domain.competencies.length > 0);

      return { ...subject, domains };
    })
    .filter((subject) => subject.domains.length > 0);
}
