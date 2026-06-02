// Arbre pedagogique CE2 - Cycle 2, primaire.
// Structure de catalogue : niveau -> matieres -> domaines -> sequences-competences.
// Une sequence correspond a une seule competence, sans lecon detaillee ni exercice.

import { ce2CurriculumLevelMap } from "@/content/levels/ce2-curriculum";
import type { CurriculumEntry } from "@/content/curriculum-map-types";
import type {
  AcademyLevelProgram,
  Lesson,
  LearningCompetency,
  LessonSession,
  ParentGuidance,
  PedagogicalResourceRef,
  ProgramDomain,
  ProgramStatus,
  ProgramSubdomain,
} from "@/content/program-types";

const emptyParentGuidance: ParentGuidance = {
  summary: "",
  quickTips: [],
  successSigns: [],
};

const PLANNED_PDF_RESOURCES: PedagogicalResourceRef[] = [
  { kind: "lesson-pdf", label: "PDF de leçon", status: "planned" },
  { kind: "exercises-pdf", label: "PDF d'exercices", status: "planned" },
  { kind: "correction-pdf", label: "PDF de correction", status: "planned" },
  { kind: "projectable-pdf", label: "PDF projetable", status: "planned" },
  { kind: "parent-sheet-pdf", label: "Fiche parent", status: "planned" },
];

function clonePlannedPdfResources(): PedagogicalResourceRef[] {
  return PLANNED_PDF_RESOURCES.map((resource) => ({ ...resource }));
}

// ── Séances — lot prioritaire 8 séquences (4 Français + 4 Mathématiques) ─────
// Statut "upcoming" : aucun PDF créé, aucun lien cliquable.

const CE2_SESSIONS: Record<string, LessonSession[]> = {
  "ce2-fr-lc-comprendre-texte-long": [
    {
      id: "ce2-fr-lc-comprendre-texte-long-s1",
      title: "Lire un texte et identifier le sujet",
      phase: "découvrir",
      objective: "L'élève lit un texte entier et dit de quoi il parle.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-lc-comprendre-texte-long-s2",
      title: "Répondre à des questions de compréhension",
      phase: "s'entraîner",
      objective: "L'élève retrouve des informations précises dans un texte.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-lc-comprendre-texte-long-s3",
      title: "Lire seul et restituer l'essentiel",
      phase: "réinvestir",
      objective: "L'élève lit un nouveau texte sans aide et en résume l'idée principale.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-lc-comprendre-texte-long-s4",
      title: "Évaluer sa compréhension sur un texte inconnu",
      phase: "évaluer",
      objective: "L'élève répond seul à des questions sur un texte qu'il n'a pas encore lu.",
      status: "upcoming",
    },
  ],

  "ce2-fr-lc-reperer-implicite": [
    {
      id: "ce2-fr-lc-reperer-implicite-s1",
      title: "Observer des indices dans un texte",
      phase: "découvrir",
      objective: "L'élève repère les mots et expressions qui laissent entendre quelque chose.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-lc-reperer-implicite-s2",
      title: "Formuler ce que le texte laisse comprendre",
      phase: "s'entraîner",
      objective: "L'élève formule une information implicite à partir des indices.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-lc-reperer-implicite-s3",
      title: "Justifier une déduction sur un texte court",
      phase: "réinvestir",
      objective: "L'élève justifie sa déduction en citant un indice précis du texte.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-lc-reperer-implicite-s4",
      title: "Retrouver une information implicite seul",
      phase: "évaluer",
      objective: "L'élève identifie et formule seul une information non écrite.",
      status: "upcoming",
    },
  ],

  "ce2-fr-edl-accord-groupe-nominal": [
    {
      id: "ce2-fr-edl-accord-groupe-nominal-s1",
      title: "Identifier le nom donneur d'accord",
      phase: "découvrir",
      objective: "L'élève reconnaît le nom dans un groupe nominal et comprend son rôle.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-edl-accord-groupe-nominal-s2",
      title: "Accorder déterminant et adjectif avec le nom",
      phase: "s'entraîner",
      objective: "L'élève applique les règles d'accord en genre et en nombre.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-edl-accord-groupe-nominal-s3",
      title: "Contrôler les accords dans une phrase",
      phase: "réinvestir",
      objective: "L'élève vérifie et corrige les accords dans une phrase complète.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-edl-accord-groupe-nominal-s4",
      title: "Vérifier les accords en relecture",
      phase: "consolider",
      objective: "L'élève relit un texte et corrige systématiquement les accords nominaux.",
      status: "upcoming",
    },
  ],

  "ce2-fr-edl-conjuguer-present-passe-compose": [
    {
      id: "ce2-fr-edl-conjuguer-present-passe-compose-s1",
      title: "Reconnaître présent et passé composé",
      phase: "découvrir",
      objective: "L'élève distingue des formes verbales au présent et au passé composé.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-edl-conjuguer-present-passe-compose-s2",
      title: "Conjuguer des verbes fréquents au présent",
      phase: "s'entraîner",
      objective: "L'élève choisit les terminaisons correctes au présent selon le sujet.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-edl-conjuguer-present-passe-compose-s3",
      title: "Former le passé composé avec avoir et être",
      phase: "s'entraîner",
      objective: "L'élève construit le passé composé en choisissant le bon auxiliaire.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-edl-conjuguer-present-passe-compose-s4",
      title: "Choisir le temps adapté dans un texte",
      phase: "réinvestir",
      objective: "L'élève complète un texte en utilisant le présent ou le passé composé.",
      status: "upcoming",
    },
  ],

  "ce2-ma-nc-lire-ecrire-ordonner-nombres": [
    {
      id: "ce2-ma-nc-lire-ecrire-ordonner-nombres-s1",
      title: "Lire et nommer des nombres jusqu'à 999",
      phase: "découvrir",
      objective: "L'élève lit des nombres entiers à l'oral et repère la valeur de chaque chiffre.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-nc-lire-ecrire-ordonner-nombres-s2",
      title: "Écrire des nombres en chiffres et en lettres",
      phase: "s'entraîner",
      objective: "L'élève transcrit des nombres entre les deux écritures.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-nc-lire-ecrire-ordonner-nombres-s3",
      title: "Comparer et ranger des nombres",
      phase: "réinvestir",
      objective: "L'élève utilise les symboles < et > et range une série de nombres.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-nc-lire-ecrire-ordonner-nombres-s4",
      title: "Exercices de rangement et de comparaison",
      phase: "consolider",
      objective: "L'élève résout des exercices variés sur la lecture et l'ordre des nombres.",
      status: "upcoming",
    },
  ],

  "ce2-ma-nc-utiliser-strategies-calcul-mental": [
    {
      id: "ce2-ma-nc-utiliser-strategies-calcul-mental-s1",
      title: "Explorer des décompositions de nombres",
      phase: "découvrir",
      objective: "L'élève décompose un nombre de plusieurs façons pour faciliter le calcul.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-nc-utiliser-strategies-calcul-mental-s2",
      title: "Utiliser doubles et compléments",
      phase: "s'entraîner",
      objective: "L'élève s'appuie sur les doubles et les compléments à 10 pour calculer.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-nc-utiliser-strategies-calcul-mental-s3",
      title: "Expliquer sa stratégie à voix haute",
      phase: "réinvestir",
      objective: "L'élève verbalise la décomposition choisie pour justifier son calcul.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-nc-utiliser-strategies-calcul-mental-s4",
      title: "Calcul mental avec justification",
      phase: "évaluer",
      objective: "L'élève calcule rapidement et note la stratégie utilisée.",
      status: "upcoming",
    },
  ],

  "ce2-ma-gm-mesurer-longueurs": [
    {
      id: "ce2-ma-gm-mesurer-longueurs-s1",
      title: "Comparer des longueurs sans instrument",
      phase: "découvrir",
      objective: "L'élève compare des longueurs par superposition ou par report.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-gm-mesurer-longueurs-s2",
      title: "Mesurer avec une règle graduée",
      phase: "s'entraîner",
      objective: "L'élève place correctement la règle et lit la mesure en cm et mm.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-gm-mesurer-longueurs-s3",
      title: "Convertir et comparer des mesures",
      phase: "réinvestir",
      objective: "L'élève convertit entre mm, cm et dm pour comparer des longueurs.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-gm-mesurer-longueurs-s4",
      title: "Mesurer des objets de la classe",
      phase: "consolider",
      objective: "L'élève mesure plusieurs objets et les range par ordre de longueur.",
      status: "upcoming",
    },
  ],

  "ce2-ma-eg-reconnaitre-figures": [
    {
      id: "ce2-ma-eg-reconnaitre-figures-s1",
      title: "Observer et nommer des figures planes",
      phase: "découvrir",
      objective: "L'élève reconnaît et nomme les figures usuelles à partir d'exemples.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-eg-reconnaitre-figures-s2",
      title: "Décrire des figures par leurs propriétés",
      phase: "s'entraîner",
      objective: "L'élève compte côtés et sommets et repère les angles droits.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-eg-reconnaitre-figures-s3",
      title: "Classer des figures selon leurs propriétés",
      phase: "réinvestir",
      objective: "L'élève trie un ensemble de figures en utilisant des critères géométriques.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-eg-reconnaitre-figures-s4",
      title: "Identifier et vérifier des angles droits",
      phase: "consolider",
      objective: "L'élève utilise l'équerre pour contrôler la présence d'angles droits.",
      status: "upcoming",
    },
  ],

  // ── Français — Langage oral ───────────────────────────────────────────────

  "ce2-fr-or-presenter-sujet-organise": [
    {
      id: "ce2-fr-or-presenter-sujet-organise-s1",
      title: "Observer des exposés organisés",
      phase: "découvrir",
      objective: "L'élève repère comment un exposé est structuré en plusieurs points clairs.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-or-presenter-sujet-organise-s2",
      title: "Préparer et présenter deux ou trois points",
      phase: "s'entraîner",
      objective: "L'élève organise ses idées à l'écrit avant de les présenter à voix haute.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-or-presenter-sujet-organise-s3",
      title: "Présenter un sujet en respectant l'ordre choisi",
      phase: "réinvestir",
      objective: "L'élève présente un sujet connu en suivant ses notes de préparation.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-or-presenter-sujet-organise-s4",
      title: "Évaluer la clarté d'une présentation orale",
      phase: "évaluer",
      objective: "L'élève présente seul et reçoit un retour sur l'ordre et la clarté.",
      status: "upcoming",
    },
  ],

  "ce2-fr-or-ecouter-reformuler": [
    {
      id: "ce2-fr-or-ecouter-reformuler-s1",
      title: "Écouter sans interrompre",
      phase: "découvrir",
      objective: "L'élève écoute un camarade jusqu'au bout avant de réagir.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-or-ecouter-reformuler-s2",
      title: "Reformuler fidèlement un propos court",
      phase: "s'entraîner",
      objective: "L'élève répète dans ses propres mots ce qu'un camarade vient d'expliquer.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-or-ecouter-reformuler-s3",
      title: "Distinguer reformulation et interprétation",
      phase: "réinvestir",
      objective: "L'élève reformule sans ajouter son avis ni déformer le propos.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-or-ecouter-reformuler-s4",
      title: "Reformuler un exposé devant la classe",
      phase: "évaluer",
      objective: "L'élève reformule un exposé entier de façon fidèle et vérifiée.",
      status: "upcoming",
    },
  ],

  "ce2-fr-or-argumenter-avis-simple": [
    {
      id: "ce2-fr-or-argumenter-avis-simple-s1",
      title: "Repérer un avis et sa raison dans un échange",
      phase: "découvrir",
      objective: "L'élève identifie les avis exprimés et les raisons données dans un dialogue.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-or-argumenter-avis-simple-s2",
      title: "Exprimer un avis avec parce que ou car",
      phase: "s'entraîner",
      objective: "L'élève formule un avis personnel en utilisant un connecteur de cause.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-or-argumenter-avis-simple-s3",
      title: "Défendre un avis face à un avis contraire",
      phase: "réinvestir",
      objective: "L'élève maintient ou adapte son avis lors d'un mini-débat guidé.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-or-argumenter-avis-simple-s4",
      title: "Donner un avis argumenté dans un débat court",
      phase: "évaluer",
      objective: "L'élève prend la parole et justifie seul son avis sur un sujet donné.",
      status: "upcoming",
    },
  ],

  // ── Français — Lecture et compréhension ──────────────────────────────────

  "ce2-fr-lc-distinguer-types-textes": [
    {
      id: "ce2-fr-lc-distinguer-types-textes-s1",
      title: "Observer des textes variés",
      phase: "découvrir",
      objective: "L'élève observe plusieurs textes et repère leur mise en page caractéristique.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-lc-distinguer-types-textes-s2",
      title: "Reconnaître le type d'un texte court",
      phase: "s'entraîner",
      objective: "L'élève dit si un texte raconte, informe, explique ou joue avec la langue.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-lc-distinguer-types-textes-s3",
      title: "Justifier le type d'un texte avec des indices",
      phase: "réinvestir",
      objective: "L'élève appuie son identification sur un indice précis de mise en page ou de contenu.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-lc-distinguer-types-textes-s4",
      title: "Classer des textes selon leur type",
      phase: "évaluer",
      objective: "L'élève trie plusieurs textes courts et justifie chacun de ses choix.",
      status: "upcoming",
    },
  ],

  // ── Français — Écriture ───────────────────────────────────────────────────

  "ce2-fr-ec-rediger-texte-structure": [
    {
      id: "ce2-fr-ec-rediger-texte-structure-s1",
      title: "Observer des textes courts bien structurés",
      phase: "découvrir",
      objective: "L'élève repère le début, le développement et la fin dans des textes modèles.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-ec-rediger-texte-structure-s2",
      title: "Rédiger en suivant un plan simple",
      phase: "s'entraîner",
      objective: "L'élève écrit un texte court à partir d'un canevas de deux ou trois idées.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-ec-rediger-texte-structure-s3",
      title: "Utiliser des connecteurs pour relier les idées",
      phase: "réinvestir",
      objective: "L'élève enrichit son texte avec des mots de liaison (d'abord, ensuite, enfin).",
      status: "upcoming",
    },
    {
      id: "ce2-fr-ec-rediger-texte-structure-s4",
      title: "Produire un texte structuré sans aide",
      phase: "évaluer",
      objective: "L'élève rédige un texte court autonome avec début, développement et fin.",
      status: "upcoming",
    },
  ],

  "ce2-fr-ec-reviser-texte": [
    {
      id: "ce2-fr-ec-reviser-texte-s1",
      title: "Repérer des erreurs dans un texte modèle",
      phase: "découvrir",
      objective: "L'élève lit un texte et identifie les passages peu clairs ou incorrects.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-ec-reviser-texte-s2",
      title: "Corriger un texte court avec une liste de vérification",
      phase: "s'entraîner",
      objective: "L'élève relit son texte en suivant une liste : sens, orthographe, ponctuation.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-ec-reviser-texte-s3",
      title: "Améliorer une phrase peu claire",
      phase: "réinvestir",
      objective: "L'élève reformule une phrase pour qu'elle soit plus précise ou plus lisible.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-ec-reviser-texte-s4",
      title: "Réviser son propre texte de façon autonome",
      phase: "évaluer",
      objective: "L'élève applique seul les corrections nécessaires à son texte de production.",
      status: "upcoming",
    },
  ],

  "ce2-fr-ec-copier-avec-soin": [
    {
      id: "ce2-fr-ec-copier-avec-soin-s1",
      title: "Observer les exigences d'une copie soignée",
      phase: "découvrir",
      objective: "L'élève compare une copie exacte et une copie avec erreurs pour identifier les écarts.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-ec-copier-avec-soin-s2",
      title: "Copier par groupes de mots",
      phase: "s'entraîner",
      objective: "L'élève copie un texte court en mémorisant de courtes séquences avant d'écrire.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-ec-copier-avec-soin-s3",
      title: "Vérifier sa copie mot à mot",
      phase: "réinvestir",
      objective: "L'élève relit sa copie en pointant chaque mot du modèle.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-ec-copier-avec-soin-s4",
      title: "Copier un texte court avec exactitude en autonomie",
      phase: "évaluer",
      objective: "L'élève copie seul un texte de cinq lignes sans erreur ni oubli.",
      status: "upcoming",
    },
  ],

  // ── Français — Étude de la langue ────────────────────────────────────────

  "ce2-fr-edl-identifier-nature-fonction": [
    {
      id: "ce2-fr-edl-identifier-nature-fonction-s1",
      title: "Reconnaître les natures de mots dans une phrase",
      phase: "découvrir",
      objective: "L'élève repère et nomme nom, verbe, adjectif et déterminant dans des phrases.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-edl-identifier-nature-fonction-s2",
      title: "Repérer le sujet du verbe",
      phase: "s'entraîner",
      objective: "L'élève identifie le sujet en posant la question : Qui est-ce qui…?",
      status: "upcoming",
    },
    {
      id: "ce2-fr-edl-identifier-nature-fonction-s3",
      title: "Repérer un complément dans une phrase simple",
      phase: "réinvestir",
      objective: "L'élève distingue le verbe, son sujet et un complément simple.",
      status: "upcoming",
    },
    {
      id: "ce2-fr-edl-identifier-nature-fonction-s4",
      title: "Analyser une phrase simple complète",
      phase: "évaluer",
      objective: "L'élève indique la nature et la fonction de plusieurs éléments dans une phrase.",
      status: "upcoming",
    },
  ],

  // ── Mathématiques — Nombres et calculs ───────────────────────────────────

  "ce2-ma-nc-poser-operations": [
    {
      id: "ce2-ma-nc-poser-operations-s1",
      title: "Découvrir l'alignement des chiffres par rang",
      phase: "découvrir",
      objective: "L'élève apprend à poser une addition en alignant unités, dizaines, centaines.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-nc-poser-operations-s2",
      title: "Poser et calculer des additions avec retenue",
      phase: "s'entraîner",
      objective: "L'élève réalise des additions posées en gérant la retenue correctement.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-nc-poser-operations-s3",
      title: "Poser et calculer des soustractions avec retenue",
      phase: "réinvestir",
      objective: "L'élève réalise des soustractions posées et vérifie par addition.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-nc-poser-operations-s4",
      title: "Poser une multiplication simple",
      phase: "consolider",
      objective: "L'élève pose une multiplication à un chiffre et vérifie la vraisemblance du résultat.",
      status: "upcoming",
    },
  ],

  // ── Mathématiques — Problèmes ─────────────────────────────────────────────

  "ce2-ma-pr-comprendre-enonce": [
    {
      id: "ce2-ma-pr-comprendre-enonce-s1",
      title: "Lire un énoncé et repérer la question",
      phase: "découvrir",
      objective: "L'élève lit l'énoncé, souligne la question et dit ce qu'il faut trouver.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-pr-comprendre-enonce-s2",
      title: "Sélectionner les données utiles",
      phase: "s'entraîner",
      objective: "L'élève distingue les données nécessaires des données inutiles dans un énoncé.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-pr-comprendre-enonce-s3",
      title: "Reformuler l'énoncé dans ses propres mots",
      phase: "réinvestir",
      objective: "L'élève reformule le problème avant de le résoudre pour vérifier sa compréhension.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-pr-comprendre-enonce-s4",
      title: "Comprendre seul des énoncés variés",
      phase: "évaluer",
      objective: "L'élève identifie question et données utiles dans trois problèmes courts.",
      status: "upcoming",
    },
  ],

  "ce2-ma-pr-choisir-operation": [
    {
      id: "ce2-ma-pr-choisir-operation-s1",
      title: "Associer une situation à une action mathématique",
      phase: "découvrir",
      objective: "L'élève reconnaît si la situation implique ajouter, enlever ou répéter.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-pr-choisir-operation-s2",
      title: "Choisir l'opération et la noter",
      phase: "s'entraîner",
      objective: "L'élève écrit l'opération correspondant à l'action du problème avant de calculer.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-pr-choisir-operation-s3",
      title: "Justifier le choix d'une opération",
      phase: "réinvestir",
      objective: "L'élève explique oralement pourquoi il a choisi une opération plutôt qu'une autre.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-pr-choisir-operation-s4",
      title: "Choisir l'opération dans des problèmes variés",
      phase: "évaluer",
      objective: "L'élève choisit seul l'opération adaptée dans des situations additives, soustractives et multiplicatives.",
      status: "upcoming",
    },
  ],

  "ce2-ma-pr-resoudre-probleme-etapes": [
    {
      id: "ce2-ma-pr-resoudre-probleme-etapes-s1",
      title: "Découvrir les problèmes à deux étapes",
      phase: "découvrir",
      objective: "L'élève observe un problème résolu en deux calculs et comprend la démarche.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-pr-resoudre-probleme-etapes-s2",
      title: "Planifier les étapes avant de calculer",
      phase: "s'entraîner",
      objective: "L'élève liste les calculs nécessaires dans l'ordre avant de les effectuer.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-pr-resoudre-probleme-etapes-s3",
      title: "Rédiger une réponse complète",
      phase: "réinvestir",
      objective: "L'élève calcule et rédige une phrase-réponse qui répond exactement à la question.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-pr-resoudre-probleme-etapes-s4",
      title: "Résoudre seul un problème à deux étapes",
      phase: "évaluer",
      objective: "L'élève réalise seul deux calculs enchaînés et rédige la réponse finale.",
      status: "upcoming",
    },
  ],

  // ── Mathématiques — Grandeurs et mesures ─────────────────────────────────

  "ce2-ma-gm-lire-heures-durees": [
    {
      id: "ce2-ma-gm-lire-heures-durees-s1",
      title: "Lire l'heure sur une horloge analogique et numérique",
      phase: "découvrir",
      objective: "L'élève lit l'heure sur différents supports et dit la même heure de deux façons.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-gm-lire-heures-durees-s2",
      title: "Repérer le début et la fin pour calculer une durée",
      phase: "s'entraîner",
      objective: "L'élève soustrait ou compte des minutes pour trouver une durée courte.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-gm-lire-heures-durees-s3",
      title: "Utiliser une frise horaire pour les durées",
      phase: "réinvestir",
      objective: "L'élève représente sur une frise un début, une fin et calcule la durée.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-gm-lire-heures-durees-s4",
      title: "Résoudre des problèmes de durée simples",
      phase: "évaluer",
      objective: "L'élève calcule seul des durées courtes en réponse à des questions de la vie quotidienne.",
      status: "upcoming",
    },
  ],

  "ce2-ma-gm-utiliser-monnaie": [
    {
      id: "ce2-ma-gm-utiliser-monnaie-s1",
      title: "Reconnaître et compter des pièces et des billets",
      phase: "découvrir",
      objective: "L'élève identifie les pièces et billets courants et compose des sommes simples.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-gm-utiliser-monnaie-s2",
      title: "Comparer deux prix et trouver la différence",
      phase: "s'entraîner",
      objective: "L'élève compare des prix et calcule combien il faut en plus ou en moins.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-gm-utiliser-monnaie-s3",
      title: "Calculer la monnaie à rendre",
      phase: "réinvestir",
      objective: "L'élève calcule la somme restante après un achat simple.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-gm-utiliser-monnaie-s4",
      title: "Résoudre des problèmes de monnaie simples",
      phase: "évaluer",
      objective: "L'élève compose des sommes, compare des prix et calcule la monnaie rendue de façon autonome.",
      status: "upcoming",
    },
  ],

  // ── Mathématiques — Espace et géométrie ──────────────────────────────────

  "ce2-ma-eg-se-reperer-decrire-deplacement": [
    {
      id: "ce2-ma-eg-se-reperer-decrire-deplacement-s1",
      title: "Localiser une case sur un quadrillage",
      phase: "découvrir",
      objective: "L'élève repère une case en utilisant les coordonnées colonne-ligne.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-eg-se-reperer-decrire-deplacement-s2",
      title: "Décrire un déplacement en utilisant le vocabulaire spatial",
      phase: "s'entraîner",
      objective: "L'élève décrit un trajet pas à pas en utilisant haut/bas, gauche/droite, cases.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-eg-se-reperer-decrire-deplacement-s3",
      title: "Suivre des instructions de déplacement",
      phase: "réinvestir",
      objective: "L'élève exécute un déplacement décrit par un camarade sur un quadrillage.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-eg-se-reperer-decrire-deplacement-s4",
      title: "Décrire et vérifier un déplacement",
      phase: "évaluer",
      objective: "L'élève décrit et fait vérifier un déplacement complet sur un plan simple.",
      status: "upcoming",
    },
  ],

  "ce2-ma-eg-tracer-avec-instruments": [
    {
      id: "ce2-ma-eg-tracer-avec-instruments-s1",
      title: "Prendre en main règle, équerre et compas",
      phase: "découvrir",
      objective: "L'élève explore chaque instrument et comprend son usage spécifique.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-eg-tracer-avec-instruments-s2",
      title: "Tracer des segments et vérifier un angle droit",
      phase: "s'entraîner",
      objective: "L'élève trace des segments de longueur donnée et contrôle les angles droits à l'équerre.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-eg-tracer-avec-instruments-s3",
      title: "Tracer un cercle au compas",
      phase: "réinvestir",
      objective: "L'élève trace un cercle de rayon donné et identifie le centre et le rayon.",
      status: "upcoming",
    },
    {
      id: "ce2-ma-eg-tracer-avec-instruments-s4",
      title: "Réaliser un tracé géométrique complet",
      phase: "évaluer",
      objective: "L'élève réalise une figure simple imposée en choisissant et utilisant les bons instruments.",
      status: "upcoming",
    },
  ],

  // ── Questionner le monde — Le temps ──────────────────────────────────────

  "ce2-qlm-tp-situer-evenements": [
    {
      id: "ce2-qlm-tp-situer-evenements-s1",
      title: "Découvrir la frise chronologique",
      phase: "découvrir",
      objective: "L'élève comprend comment une frise représente l'ordre des événements dans le temps.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-tp-situer-evenements-s2",
      title: "Placer des événements sur une frise",
      phase: "s'entraîner",
      objective: "L'élève positionne des événements en utilisant des dates et le vocabulaire temporel.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-tp-situer-evenements-s3",
      title: "Utiliser avant, après, pendant dans des phrases",
      phase: "réinvestir",
      objective: "L'élève décrit les relations temporelles entre deux événements.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-tp-situer-evenements-s4",
      title: "Compléter une frise historique simple",
      phase: "évaluer",
      objective: "L'élève place seul plusieurs événements sur une frise en respectant l'ordre chronologique.",
      status: "upcoming",
    },
  ],

  "ce2-qlm-tp-comparer-modes-vie": [
    {
      id: "ce2-qlm-tp-comparer-modes-vie-s1",
      title: "Observer une trace du passé",
      phase: "découvrir",
      objective: "L'élève décrit une image ou un objet ancien et repère ce qu'il nous apprend.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-tp-comparer-modes-vie-s2",
      title: "Comparer vie passée et vie actuelle",
      phase: "s'entraîner",
      objective: "L'élève repère les ressemblances et les différences entre deux modes de vie.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-tp-comparer-modes-vie-s3",
      title: "Identifier ce qui change et ce qui reste",
      phase: "réinvestir",
      objective: "L'élève distingue les évolutions liées au temps de ce qui demeure constant.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-tp-comparer-modes-vie-s4",
      title: "Présenter une comparaison historique",
      phase: "évaluer",
      objective: "L'élève explique deux ressemblances et deux différences entre une époque passée et aujourd'hui.",
      status: "upcoming",
    },
  ],

  "ce2-qlm-tp-utiliser-documents": [
    {
      id: "ce2-qlm-tp-utiliser-documents-s1",
      title: "Observer un document historique",
      phase: "découvrir",
      objective: "L'élève observe une image ou un texte court du passé et dit ce qu'il voit.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-tp-utiliser-documents-s2",
      title: "Prélever une information dans un document",
      phase: "s'entraîner",
      objective: "L'élève repère et note une information précise dans un document simple.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-tp-utiliser-documents-s3",
      title: "Distinguer observation et hypothèse",
      phase: "réinvestir",
      objective: "L'élève sépare ce qu'il voit avec certitude de ce qu'il suppose.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-tp-utiliser-documents-s4",
      title: "Utiliser un document pour répondre à une question",
      phase: "évaluer",
      objective: "L'élève prélève seul une information utile dans un document pour répondre à une question précise.",
      status: "upcoming",
    },
  ],

  // ── Questionner le monde — L'espace ──────────────────────────────────────

  "ce2-qlm-es-lire-plan-simple": [
    {
      id: "ce2-qlm-es-lire-plan-simple-s1",
      title: "Repérer le titre et la légende d'un plan",
      phase: "découvrir",
      objective: "L'élève identifie les éléments d'un plan simple : titre, légende, orientation.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-es-lire-plan-simple-s2",
      title: "Localiser un lieu sur un plan",
      phase: "s'entraîner",
      objective: "L'élève utilise la légende pour trouver un lieu demandé sur un plan.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-es-lire-plan-simple-s3",
      title: "Décrire un trajet sur un plan",
      phase: "réinvestir",
      objective: "L'élève décrit un chemin d'un point à un autre en utilisant les repères du plan.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-es-lire-plan-simple-s4",
      title: "Utiliser un plan pour répondre à des questions",
      phase: "évaluer",
      objective: "L'élève localise des lieux et décrit des trajets de façon autonome sur un plan.",
      status: "upcoming",
    },
  ],

  "ce2-qlm-es-decrire-milieu-proche": [
    {
      id: "ce2-qlm-es-decrire-milieu-proche-s1",
      title: "Observer et nommer les lieux d'un espace de vie",
      phase: "découvrir",
      objective: "L'élève liste les lieux qu'il connaît dans son environnement proche.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-es-decrire-milieu-proche-s2",
      title: "Décrire la fonction de chaque lieu",
      phase: "s'entraîner",
      objective: "L'élève explique à quoi sert chaque lieu observé dans l'espace de vie.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-es-decrire-milieu-proche-s3",
      title: "Repérer les déplacements entre les lieux",
      phase: "réinvestir",
      objective: "L'élève décrit les trajets possibles entre plusieurs points de l'espace.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-es-decrire-milieu-proche-s4",
      title: "Présenter un espace de vie avec ses fonctions",
      phase: "évaluer",
      objective: "L'élève décrit seul un espace proche en nommant lieux, fonctions et déplacements.",
      status: "upcoming",
    },
  ],

  "ce2-qlm-es-comparer-paysages": [
    {
      id: "ce2-qlm-es-comparer-paysages-s1",
      title: "Observer des paysages différents",
      phase: "découvrir",
      objective: "L'élève regarde des photos de paysages variés et note ce qu'il voit.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-es-comparer-paysages-s2",
      title: "Distinguer éléments naturels et aménagés",
      phase: "s'entraîner",
      objective: "L'élève classe les éléments de chaque paysage entre naturel et construit par l'humain.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-es-comparer-paysages-s3",
      title: "Relever ressemblances et différences entre paysages",
      phase: "réinvestir",
      objective: "L'élève compare deux paysages en notant au moins deux ressemblances et deux différences.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-es-comparer-paysages-s4",
      title: "Décrire et comparer des paysages de façon autonome",
      phase: "évaluer",
      objective: "L'élève observe deux paysages et produit seul une comparaison organisée.",
      status: "upcoming",
    },
  ],

  // ── Questionner le monde — Vivant, matière et objets ─────────────────────

  "ce2-qlm-vmo-decrire-cycle-vie": [
    {
      id: "ce2-qlm-vmo-decrire-cycle-vie-s1",
      title: "Observer les étapes de vie d'un être vivant",
      phase: "découvrir",
      objective: "L'élève observe des images montrant les étapes de développement d'un animal ou d'une plante.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-vmo-decrire-cycle-vie-s2",
      title: "Ordonner les étapes du cycle de vie",
      phase: "s'entraîner",
      objective: "L'élève place dans l'ordre les étapes du développement d'un être vivant.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-vmo-decrire-cycle-vie-s3",
      title: "Distinguer croissance et transformation",
      phase: "réinvestir",
      objective: "L'élève explique la différence entre grandir et se transformer (métamorphose).",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-vmo-decrire-cycle-vie-s4",
      title: "Présenter le cycle de vie d'un être vivant",
      phase: "évaluer",
      objective: "L'élève décrit seul les étapes du cycle de vie d'un être vivant à partir d'un schéma.",
      status: "upcoming",
    },
  ],

  "ce2-qlm-vmo-classer-matiere": [
    {
      id: "ce2-qlm-vmo-classer-matiere-s1",
      title: "Observer des matières et leurs propriétés",
      phase: "découvrir",
      objective: "L'élève touche, observe et décrit des matières en notant leurs propriétés.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-vmo-classer-matiere-s2",
      title: "Classer des objets selon une propriété choisie",
      phase: "s'entraîner",
      objective: "L'élève trie des objets en fonction d'une propriété observable (rigide/souple, lourd/léger).",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-vmo-classer-matiere-s3",
      title: "Justifier son classement avec des arguments",
      phase: "réinvestir",
      objective: "L'élève explique les critères utilisés pour trier ses objets.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-vmo-classer-matiere-s4",
      title: "Proposer et expliquer un classement autonome",
      phase: "évaluer",
      objective: "L'élève choisit seul une propriété, classe des objets et justifie son tri.",
      status: "upcoming",
    },
  ],

  "ce2-qlm-vmo-realiser-circuit-simple": [
    {
      id: "ce2-qlm-vmo-realiser-circuit-simple-s1",
      title: "Découvrir les éléments d'un circuit électrique",
      phase: "découvrir",
      objective: "L'élève identifie pile, lampe, fils et interrupteur et comprend leur rôle.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-vmo-realiser-circuit-simple-s2",
      title: "Assembler un circuit simple pour allumer une lampe",
      phase: "s'entraîner",
      objective: "L'élève relie les éléments correctement pour que la lampe s'allume.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-vmo-realiser-circuit-simple-s3",
      title: "Tester et corriger un circuit qui ne fonctionne pas",
      phase: "réinvestir",
      objective: "L'élève cherche et corrige l'erreur dans un circuit défectueux.",
      status: "upcoming",
    },
    {
      id: "ce2-qlm-vmo-realiser-circuit-simple-s4",
      title: "Expliquer pourquoi un circuit fonctionne ou non",
      phase: "évaluer",
      objective: "L'élève réalise un circuit et explique la condition nécessaire pour que la lampe s'allume.",
      status: "upcoming",
    },
  ],

  // ── Enseignements artistiques — Arts plastiques ───────────────────────────

  "ce2-art-ap-experimenter-outils": [
    {
      id: "ce2-art-ap-experimenter-outils-s1",
      title: "Explorer différents outils et leurs effets",
      phase: "découvrir",
      objective: "L'élève essaie pinceau, feutres, craies et décrit l'effet produit par chacun.",
      status: "upcoming",
    },
    {
      id: "ce2-art-ap-experimenter-outils-s2",
      title: "Combiner outils et matières pour un effet choisi",
      phase: "s'entraîner",
      objective: "L'élève sélectionne et combine un outil et une matière pour produire un effet précis.",
      status: "upcoming",
    },
    {
      id: "ce2-art-ap-experimenter-outils-s3",
      title: "Varier les gestes pour enrichir une production",
      phase: "réinvestir",
      objective: "L'élève utilise différents gestes (appuyer, frotter, étaler) pour modifier le rendu.",
      status: "upcoming",
    },
    {
      id: "ce2-art-ap-experimenter-outils-s4",
      title: "Présenter et expliquer ses choix d'outils",
      phase: "évaluer",
      objective: "L'élève montre sa production et explique les outils utilisés et les effets obtenus.",
      status: "upcoming",
    },
  ],

  "ce2-art-ap-composer-image": [
    {
      id: "ce2-art-ap-composer-image-s1",
      title: "Observer l'organisation d'une image",
      phase: "découvrir",
      objective: "L'élève repère comment des éléments sont répartis dans une image pour guider le regard.",
      status: "upcoming",
    },
    {
      id: "ce2-art-ap-composer-image-s2",
      title: "Organiser des formes et couleurs dans un espace",
      phase: "s'entraîner",
      objective: "L'élève place des éléments dans un cadre en faisant des choix de position et de couleur.",
      status: "upcoming",
    },
    {
      id: "ce2-art-ap-composer-image-s3",
      title: "Donner une intention à sa composition",
      phase: "réinvestir",
      objective: "L'élève choisit de produire un effet (calme, mouvement, contraste) et l'applique.",
      status: "upcoming",
    },
    {
      id: "ce2-art-ap-composer-image-s4",
      title: "Présenter et commenter sa composition",
      phase: "évaluer",
      objective: "L'élève montre son image, dit son intention et décrit ses choix plastiques.",
      status: "upcoming",
    },
  ],

  "ce2-art-ap-decrire-oeuvre": [
    {
      id: "ce2-art-ap-decrire-oeuvre-s1",
      title: "Observer une œuvre en silence",
      phase: "découvrir",
      objective: "L'élève regarde une œuvre attentivement et note mentalement ce qu'il voit.",
      status: "upcoming",
    },
    {
      id: "ce2-art-ap-decrire-oeuvre-s2",
      title: "Décrire formes, couleurs et composition",
      phase: "s'entraîner",
      objective: "L'élève formule des phrases pour décrire des éléments visibles de l'œuvre.",
      status: "upcoming",
    },
    {
      id: "ce2-art-ap-decrire-oeuvre-s3",
      title: "Distinguer description et interprétation",
      phase: "réinvestir",
      objective: "L'élève sépare ce qu'il voit objectivement de ce qu'il ressent ou imagine.",
      status: "upcoming",
    },
    {
      id: "ce2-art-ap-decrire-oeuvre-s4",
      title: "Présenter une œuvre à la classe",
      phase: "évaluer",
      objective: "L'élève décrit seul une œuvre en distinguant formes/couleurs et impressions personnelles.",
      status: "upcoming",
    },
  ],

  // ── Enseignements artistiques — Éducation musicale ───────────────────────

  "ce2-art-mus-chanter-ensemble": [
    {
      id: "ce2-art-mus-chanter-ensemble-s1",
      title: "Découvrir une chanson et son cadre collectif",
      phase: "découvrir",
      objective: "L'élève apprend les paroles et repère les moments clés (départ, refrain, fin).",
      status: "upcoming",
    },
    {
      id: "ce2-art-mus-chanter-ensemble-s2",
      title: "Respecter le tempo et le départ commun",
      phase: "s'entraîner",
      objective: "L'élève chante en respectant le départ donné et le tempo du groupe.",
      status: "upcoming",
    },
    {
      id: "ce2-art-mus-chanter-ensemble-s3",
      title: "Adapter son volume au chant collectif",
      phase: "réinvestir",
      objective: "L'élève ajuste sa voix pour s'intégrer à l'ensemble sans dominer.",
      status: "upcoming",
    },
    {
      id: "ce2-art-mus-chanter-ensemble-s4",
      title: "Interpréter une chanson en groupe",
      phase: "évaluer",
      objective: "L'élève chante avec le groupe en respectant tempo, départ et volume.",
      status: "upcoming",
    },
  ],

  "ce2-art-mus-ecouter-comparer": [
    {
      id: "ce2-art-mus-ecouter-comparer-s1",
      title: "Écouter un extrait musical et décrire ce qu'on entend",
      phase: "découvrir",
      objective: "L'élève écoute en silence et note un élément sonore remarqué.",
      status: "upcoming",
    },
    {
      id: "ce2-art-mus-ecouter-comparer-s2",
      title: "Repérer des éléments musicaux (tempo, hauteur, intensité)",
      phase: "s'entraîner",
      objective: "L'élève identifie si la musique est rapide/lente, forte/douce, aiguë/grave.",
      status: "upcoming",
    },
    {
      id: "ce2-art-mus-ecouter-comparer-s3",
      title: "Comparer deux extraits sur un critère précis",
      phase: "réinvestir",
      objective: "L'élève compare deux extraits en se concentrant sur un seul paramètre musical.",
      status: "upcoming",
    },
    {
      id: "ce2-art-mus-ecouter-comparer-s4",
      title: "Décrire et comparer deux extraits de façon autonome",
      phase: "évaluer",
      objective: "L'élève écoute deux extraits et note leurs ressemblances et différences.",
      status: "upcoming",
    },
  ],

  "ce2-art-mus-produire-rythme": [
    {
      id: "ce2-art-mus-produire-rythme-s1",
      title: "Reproduire une pulsation régulière",
      phase: "découvrir",
      objective: "L'élève frappe une pulsation régulière en suivant un modèle sonore.",
      status: "upcoming",
    },
    {
      id: "ce2-art-mus-produire-rythme-s2",
      title: "Reproduire un rythme court entendu",
      phase: "s'entraîner",
      objective: "L'élève reproduit une cellule rythmique simple après l'avoir entendue.",
      status: "upcoming",
    },
    {
      id: "ce2-art-mus-produire-rythme-s3",
      title: "Inventer un rythme court et le mémoriser",
      phase: "réinvestir",
      objective: "L'élève compose une petite cellule rythmique et la répète de façon identique.",
      status: "upcoming",
    },
    {
      id: "ce2-art-mus-produire-rythme-s4",
      title: "Présenter son rythme devant le groupe",
      phase: "évaluer",
      objective: "L'élève joue son rythme devant la classe en maintenant une pulsation régulière.",
      status: "upcoming",
    },
  ],

  // ── EPS — Produire une performance ────────────────────────────────────────

  "ce2-eps-perf-courir-lancer-sauter": [
    {
      id: "ce2-eps-perf-courir-lancer-sauter-s1",
      title: "Découvrir et tester une activité de performance",
      phase: "découvrir",
      objective: "L'élève essaie courir, lancer ou sauter et mesure sa première performance.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-perf-courir-lancer-sauter-s2",
      title: "Chercher à améliorer sa technique",
      phase: "s'entraîner",
      objective: "L'élève applique une consigne technique simple pour progresser.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-perf-courir-lancer-sauter-s3",
      title: "Mesurer et comparer ses performances",
      phase: "réinvestir",
      objective: "L'élève note ses résultats et repère sa progression sur plusieurs essais.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-perf-courir-lancer-sauter-s4",
      title: "Réaliser une performance individuelle",
      phase: "évaluer",
      objective: "L'élève réalise un essai officiel en respectant la sécurité et mesure son résultat.",
      status: "upcoming",
    },
  ],

  "ce2-eps-perf-regulariser-effort": [
    {
      id: "ce2-eps-perf-regulariser-effort-s1",
      title: "Ressentir son effort et l'ajuster",
      phase: "découvrir",
      objective: "L'élève explore différentes allures et ressent les effets sur son corps.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-perf-regulariser-effort-s2",
      title: "Maintenir un effort régulier sur une durée",
      phase: "s'entraîner",
      objective: "L'élève court ou pédale à une allure constante pendant une durée donnée.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-perf-regulariser-effort-s3",
      title: "Récupérer de façon adaptée",
      phase: "réinvestir",
      objective: "L'élève apprend à récupérer calmement (marche, respiration) après un effort.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-perf-regulariser-effort-s4",
      title: "Gérer son allure sur toute une activité",
      phase: "évaluer",
      objective: "L'élève maintient un effort régulier de la première à la dernière minute.",
      status: "upcoming",
    },
  ],

  // ── EPS — Adapter ses déplacements ───────────────────────────────────────

  "ce2-eps-dep-suivre-parcours": [
    {
      id: "ce2-eps-dep-suivre-parcours-s1",
      title: "Repérer un parcours balisé",
      phase: "découvrir",
      objective: "L'élève observe le parcours, repère le trajet et les contraintes à respecter.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-dep-suivre-parcours-s2",
      title: "Franchir les obstacles en adaptant ses gestes",
      phase: "s'entraîner",
      objective: "L'élève adapte sa vitesse et ses mouvements à chaque type d'obstacle.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-dep-suivre-parcours-s3",
      title: "Enchaîner les actions sans s'arrêter",
      phase: "réinvestir",
      objective: "L'élève réalise le parcours complet sans rupture entre les obstacles.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-dep-suivre-parcours-s4",
      title: "Réaliser le parcours en respectant toutes les règles",
      phase: "évaluer",
      objective: "L'élève parcourt le circuit complet en respectant les consignes de sécurité et les contraintes.",
      status: "upcoming",
    },
  ],

  "ce2-eps-dep-sorienter-espace-connu": [
    {
      id: "ce2-eps-dep-sorienter-espace-connu-s1",
      title: "Repérer des points de référence dans l'espace",
      phase: "découvrir",
      objective: "L'élève identifie des repères fixes dans un espace pour se localiser.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-dep-sorienter-espace-connu-s2",
      title: "Choisir un trajet pour atteindre un point",
      phase: "s'entraîner",
      objective: "L'élève anticipe et choisit un chemin pour aller d'un point à un autre.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-dep-sorienter-espace-connu-s3",
      title: "S'orienter en utilisant les repères",
      phase: "réinvestir",
      objective: "L'élève utilise les repères appris pour retrouver des points demandés.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-dep-sorienter-espace-connu-s4",
      title: "Retrouver un point sans aide dans un espace connu",
      phase: "évaluer",
      objective: "L'élève se déplace seul vers un point précis en utilisant ses repères.",
      status: "upcoming",
    },
  ],

  // ── EPS — Jeux collectifs ─────────────────────────────────────────────────

  "ce2-eps-jeux-cooperer-opposer": [
    {
      id: "ce2-eps-jeux-cooperer-opposer-s1",
      title: "Découvrir les règles d'un jeu collectif",
      phase: "découvrir",
      objective: "L'élève comprend les règles, les rôles et les buts du jeu.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-jeux-cooperer-opposer-s2",
      title: "Agir avec ses partenaires",
      phase: "s'entraîner",
      objective: "L'élève passe, reçoit et soutient ses partenaires pour avancer vers le but.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-jeux-cooperer-opposer-s3",
      title: "Tenir compte des adversaires",
      phase: "réinvestir",
      objective: "L'élève adapte ses actions en fonction de la position des adversaires.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-jeux-cooperer-opposer-s4",
      title: "Participer activement à un jeu collectif",
      phase: "évaluer",
      objective: "L'élève coopère avec ses partenaires tout en s'opposant aux adversaires.",
      status: "upcoming",
    },
  ],

  "ce2-eps-jeux-arbitrer-regle-simple": [
    {
      id: "ce2-eps-jeux-arbitrer-regle-simple-s1",
      title: "Comprendre la règle à observer en tant qu'arbitre",
      phase: "découvrir",
      objective: "L'élève apprend la règle précise qu'il devra faire respecter.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-jeux-arbitrer-regle-simple-s2",
      title: "Observer et signaler une situation simple",
      phase: "s'entraîner",
      objective: "L'élève observe le jeu et signale calmement une situation selon la règle.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-jeux-arbitrer-regle-simple-s3",
      title: "Rester impartial dans son rôle d'arbitre",
      phase: "réinvestir",
      objective: "L'élève applique la règle sans favoritisme même envers ses camarades.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-jeux-arbitrer-regle-simple-s4",
      title: "Assumer le rôle d'arbitre sur une phase de jeu",
      phase: "évaluer",
      objective: "L'élève arbitre seul une séquence courte en appliquant la règle observée.",
      status: "upcoming",
    },
  ],

  // ── EPS — Expression corporelle ───────────────────────────────────────────

  "ce2-eps-exp-enchainer-actions": [
    {
      id: "ce2-eps-exp-enchainer-actions-s1",
      title: "Explorer des actions corporelles variées",
      phase: "découvrir",
      objective: "L'élève expérimente différentes actions (glisser, tourner, se suspendre) et choisit celles qu'il maîtrise.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-exp-enchainer-actions-s2",
      title: "Assembler deux actions à la suite",
      phase: "s'entraîner",
      objective: "L'élève enchaîne deux actions choisies sans pause visible entre elles.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-exp-enchainer-actions-s3",
      title: "Composer une phrase corporelle avec une intention",
      phase: "réinvestir",
      objective: "L'élève crée une courte phrase corporelle avec un début, un milieu et une fin clairs.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-exp-enchainer-actions-s4",
      title: "Présenter sa phrase corporelle au groupe",
      phase: "évaluer",
      objective: "L'élève présente sa production devant les autres en la réalisant du début à la fin.",
      status: "upcoming",
    },
  ],

  "ce2-eps-exp-presenter-devant-groupe": [
    {
      id: "ce2-eps-exp-presenter-devant-groupe-s1",
      title: "Observer des présentations et identifier leurs points forts",
      phase: "découvrir",
      objective: "L'élève regarde des présentations de camarades et repère ce qui fonctionne bien.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-exp-presenter-devant-groupe-s2",
      title: "Se préparer à présenter devant un groupe",
      phase: "s'entraîner",
      objective: "L'élève répète sa production pour la mémoriser et la rendre fluide.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-exp-presenter-devant-groupe-s3",
      title: "Respecter l'espace et aller jusqu'au bout",
      phase: "réinvestir",
      objective: "L'élève présente sans s'arrêter ni sortir de l'espace de présentation.",
      status: "upcoming",
    },
    {
      id: "ce2-eps-exp-presenter-devant-groupe-s4",
      title: "Présenter et écouter les retours simples",
      phase: "évaluer",
      objective: "L'élève présente seul et accepte un retour bienveillant du groupe.",
      status: "upcoming",
    },
  ],

  // ── EMC — Règles et vie collective ────────────────────────────────────────

  "ce2-emc-rvc-respecter-regles": [
    {
      id: "ce2-emc-rvc-respecter-regles-s1",
      title: "Découvrir l'utilité des règles dans la vie collective",
      phase: "découvrir",
      objective: "L'élève comprend pourquoi des règles existent dans la classe et la société.",
      status: "upcoming",
    },
    {
      id: "ce2-emc-rvc-respecter-regles-s2",
      title: "Appliquer une règle en situation",
      phase: "s'entraîner",
      objective: "L'élève respecte une règle choisie lors d'une activité collective.",
      status: "upcoming",
    },
    {
      id: "ce2-emc-rvc-respecter-regles-s3",
      title: "Expliquer la conséquence d'un non-respect",
      phase: "réinvestir",
      objective: "L'élève décrit ce qui peut arriver quand une règle n'est pas respectée.",
      status: "upcoming",
    },
    {
      id: "ce2-emc-rvc-respecter-regles-s4",
      title: "Justifier l'utilité d'une règle commune",
      phase: "évaluer",
      objective: "L'élève dit à quoi sert une règle et explique l'importance de la respecter.",
      status: "upcoming",
    },
  ],

  "ce2-emc-rvc-cooperer-classe": [
    {
      id: "ce2-emc-rvc-cooperer-classe-s1",
      title: "Découvrir les rôles dans un travail collectif",
      phase: "découvrir",
      objective: "L'élève observe comment les rôles sont répartis dans un groupe pour atteindre un but.",
      status: "upcoming",
    },
    {
      id: "ce2-emc-rvc-cooperer-classe-s2",
      title: "Assumer un rôle dans une tâche collective",
      phase: "s'entraîner",
      objective: "L'élève prend en charge un rôle simple et le tient jusqu'au bout.",
      status: "upcoming",
    },
    {
      id: "ce2-emc-rvc-cooperer-classe-s3",
      title: "Aider le groupe à réussir",
      phase: "réinvestir",
      objective: "L'élève adapte ses actions pour que le groupe atteigne son objectif.",
      status: "upcoming",
    },
    {
      id: "ce2-emc-rvc-cooperer-classe-s4",
      title: "Évaluer sa participation dans un travail de groupe",
      phase: "évaluer",
      objective: "L'élève dit ce qu'il a apporté au groupe et ce qu'il pourrait améliorer.",
      status: "upcoming",
    },
  ],

  "ce2-emc-rvc-resoudre-conflit": [
    {
      id: "ce2-emc-rvc-resoudre-conflit-s1",
      title: "Repérer un désaccord et ses causes",
      phase: "découvrir",
      objective: "L'élève identifie ce qui a provoqué un désaccord dans une situation donnée.",
      status: "upcoming",
    },
    {
      id: "ce2-emc-rvc-resoudre-conflit-s2",
      title: "Décrire les faits sans accuser",
      phase: "s'entraîner",
      objective: "L'élève reformule un désaccord en décrivant les faits sans insulter.",
      status: "upcoming",
    },
    {
      id: "ce2-emc-rvc-resoudre-conflit-s3",
      title: "Écouter l'autre point de vue et chercher un accord",
      phase: "réinvestir",
      objective: "L'élève écoute son interlocuteur et propose une solution acceptable pour les deux.",
      status: "upcoming",
    },
    {
      id: "ce2-emc-rvc-resoudre-conflit-s4",
      title: "Résoudre un désaccord par la parole",
      phase: "évaluer",
      objective: "L'élève décrit les faits, écoute et propose seul une solution respectueuse.",
      status: "upcoming",
    },
  ],

  // ── EMC — Jugement et engagement ─────────────────────────────────────────

  "ce2-emc-je-distinguer-fait-opinion": [
    {
      id: "ce2-emc-je-distinguer-fait-opinion-s1",
      title: "Observer des affirmations et se demander si elles sont vérifiables",
      phase: "découvrir",
      objective: "L'élève lit des phrases et demande pour chacune : peut-on le vérifier ?",
      status: "upcoming",
    },
    {
      id: "ce2-emc-je-distinguer-fait-opinion-s2",
      title: "Distinguer un fait et un avis dans des exemples",
      phase: "s'entraîner",
      objective: "L'élève trie des phrases en deux colonnes : faits vérifiables / avis personnels.",
      status: "upcoming",
    },
    {
      id: "ce2-emc-je-distinguer-fait-opinion-s3",
      title: "Formuler soi-même un fait et un avis",
      phase: "réinvestir",
      objective: "L'élève écrit une phrase qui est un fait et une phrase qui est un avis.",
      status: "upcoming",
    },
    {
      id: "ce2-emc-je-distinguer-fait-opinion-s4",
      title: "Classer des affirmations en fait ou opinion",
      phase: "évaluer",
      objective: "L'élève trie seul plusieurs affirmations et justifie chaque classement.",
      status: "upcoming",
    },
  ],

  "ce2-emc-je-participer-debat-regle": [
    {
      id: "ce2-emc-je-participer-debat-regle-s1",
      title: "Découvrir les règles d'un débat",
      phase: "découvrir",
      objective: "L'élève apprend les règles : demander la parole, écouter, parler du sujet.",
      status: "upcoming",
    },
    {
      id: "ce2-emc-je-participer-debat-regle-s2",
      title: "Prendre la parole en respectant les tours",
      phase: "s'entraîner",
      objective: "L'élève demande la parole et attend son tour avant d'intervenir.",
      status: "upcoming",
    },
    {
      id: "ce2-emc-je-participer-debat-regle-s3",
      title: "Rester dans le sujet du débat",
      phase: "réinvestir",
      objective: "L'élève vérifie que son intervention est bien en lien avec le sujet discuté.",
      status: "upcoming",
    },
    {
      id: "ce2-emc-je-participer-debat-regle-s4",
      title: "Participer à un débat court en respectant toutes les règles",
      phase: "évaluer",
      objective: "L'élève prend la parole au moins une fois dans le respect des règles établies.",
      status: "upcoming",
    },
  ],

  "ce2-emc-je-agir-responsable": [
    {
      id: "ce2-emc-je-agir-responsable-s1",
      title: "Observer des besoins dans l'environnement proche",
      phase: "découvrir",
      objective: "L'élève repère un besoin concret dans sa classe ou son école.",
      status: "upcoming",
    },
    {
      id: "ce2-emc-je-agir-responsable-s2",
      title: "Proposer une action simple et réaliste",
      phase: "s'entraîner",
      objective: "L'élève imagine une action concrète et vérifie qu'elle est réalisable.",
      status: "upcoming",
    },
    {
      id: "ce2-emc-je-agir-responsable-s3",
      title: "Expliquer l'utilité de son action",
      phase: "réinvestir",
      objective: "L'élève dit à qui profite son action et pourquoi elle est utile.",
      status: "upcoming",
    },
    {
      id: "ce2-emc-je-agir-responsable-s4",
      title: "Présenter un projet d'action responsable",
      phase: "évaluer",
      objective: "L'élève présente seul un besoin repéré, une action proposée et son utilité.",
      status: "upcoming",
    },
  ],
};

function getAggregateStatus(statuses: ProgramStatus[]): ProgramStatus {
  if (statuses.some((status) => status === "available")) {
    return "available";
  }

  if (statuses.some((status) => status === "in-progress")) {
    return "in-progress";
  }

  return "upcoming";
}

function createCompetencySequence(
  entry: CurriculumEntry,
): { lesson: Lesson; competency: LearningCompetency } {
  const resources = clonePlannedPdfResources();

  const sessions = CE2_SESSIONS[entry.id];

  return {
    lesson: {
      id: entry.id,
      slug: entry.id,
      title: entry.title,
      objective: entry.observableObjective,
      skill: entry.title,
      parentGuidance: emptyParentGuidance,
      successCriteria: entry.successCriteria,
      exercises: [],
      resources,
      ...(sessions ? { sessions } : {}),
      competencyIds: [entry.id],
      status: entry.status,
    },
    competency: {
      id: entry.id,
      slug: entry.id,
      title: entry.title,
      levelSlug: "ce2",
      cycle: "cycle-2",
      stage: "primaire",
      domainSlug: entry.domainSlug,
      subdomainSlug: entry.subdomainSlug,
      objective: entry.observableObjective,
      status: entry.status,
      lessonIds: [entry.id],
      successCriteria: entry.successCriteria,
      resourceRefs: clonePlannedPdfResources(),
    },
  };
}

function createSubdomain(
  domainSlug: string,
  subdomainSlug: string,
  title: string,
  entries: CurriculumEntry[],
): ProgramSubdomain {
  const sequences = entries.map(createCompetencySequence);

  return {
    id: `ce2-${domainSlug}-${subdomainSlug}`,
    slug: subdomainSlug,
    title,
    description: `Catalogue de séquences-compétences CE2 pour ${title}.`,
    lessons: sequences.map((sequence) => sequence.lesson),
    competencies: sequences.map((sequence) => sequence.competency),
    status: getAggregateStatus(entries.map((entry) => entry.status)),
  };
}

function createDomain(
  domain: (typeof ce2CurriculumLevelMap.domains)[number],
): ProgramDomain {
  const subdomains = domain.subdomains.map((subdomain) =>
    createSubdomain(
      domain.domainSlug,
      subdomain.subdomainSlug,
      subdomain.label,
      subdomain.entries,
    ),
  );

  return {
    id: `ce2-${domain.domainSlug}`,
    slug: domain.domainSlug,
    title: domain.label,
    officialLabel: `${domain.subject} - Cycle 2`,
    description: `Progression CE2 par compétences pour ${domain.label}.`,
    subdomains,
    status: getAggregateStatus(
      subdomains.flatMap((subdomain) =>
        subdomain.lessons.map((lesson) => lesson.status),
      ),
    ),
  };
}

export const ce2LearningTree: AcademyLevelProgram = {
  levelSlug: "ce2",
  label: "CE2",
  cycle: "cycle-2",
  stage: "primaire",
  characterLink: {
    characterSlug: "esteban",
    name: "Esteban",
    roleHint:
      "Esteban accompagne les élèves de CE2 dans l'observation, la méthode et la justification.",
  },
  domains: ce2CurriculumLevelMap.domains.map(createDomain),
};

export function getCe2Domain(domainSlug: string): ProgramDomain | undefined {
  return ce2LearningTree.domains.find((domain) => domain.slug === domainSlug);
}

export function getCe2Subdomain(
  domainSlug: string,
  subdomainSlug: string,
): ProgramSubdomain | undefined {
  return getCe2Domain(domainSlug)?.subdomains.find(
    (subdomain) => subdomain.slug === subdomainSlug,
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
  for (const domain of ce2LearningTree.domains) {
    for (const subdomain of domain.subdomains) {
      const found = subdomain.lessons.find((lesson) => lesson.id === lessonId);
      if (found) return found;
    }
  }
  return undefined;
}

export type Ce2SubjectTree = {
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

export type Ce2SequenceEntry = {
  id: string;
  title: string;
  domain: string;
  subdomain: string;
  skill: string;
  status: ProgramStatus;
};

export function getCe2SubjectTree(subjectSlug: string): Ce2SubjectTree | undefined {
  const domain = ce2LearningTree.domains.find((d) => d.slug === subjectSlug);
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

export function getCe2Sequences(subjectSlug: string): Ce2SequenceEntry[] {
  const domain = ce2LearningTree.domains.find((d) => d.slug === subjectSlug);
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
