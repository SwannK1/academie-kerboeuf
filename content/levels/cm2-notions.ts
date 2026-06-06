// Registre des notions CM2 — Académie Kerboeuf.
//
// Architecture : 1 notion = 1 compétence cible.
// Chaque notion peut avoir jusqu'à 3 fiches (F1 / F2 / F3).
// Les champs PDF sont optionnels : tant qu'aucun fichier n'existe,
// resourceSlots reste absent. Aucun href fictif.
//
// Le mot "Séquence" n'apparaît pas dans les labels élève.
// Les `teacherIntent` sont réservés à l'espace enseignant.

import type { Notion } from "@/content/learning-architecture-types";

export const cm2Notions = [
  // ── Français — Étude de la langue ──────────────────────────────────────────

  {
    id: "cm2-fr-edl-passe-simple",
    slug: "passe-simple-formes-et-emploi",
    levelSlug: "cm2",
    cycle: "cycle-3",
    subject: "Français",
    subjectLabel: "Français",
    domainSlug: "francais",
    subdomainSlug: "etude-de-la-langue",
    title: "Le passé simple",
    observableObjective:
      "Reconnaître et conjuguer les verbes des trois groupes au passé simple dans un contexte narratif.",
    successCriteria: [
      "Je reconnais le passé simple dans un texte narratif.",
      "Je conjugue un verbe du 1er groupe au passé simple.",
      "Je conjugue un verbe du 3e groupe courant au passé simple.",
    ],
    competencyIds: ["cm2-fr-edl-passe-simple"],
    status: "upcoming",
    fiches: {
      f1: {
        kind: "f1",
        label: "F1 — Situation + mini-leçon + automatismes",
        teacherIntent:
          "Lire un extrait narratif contenant des verbes au passé simple. Observer les terminaisons et construire la règle. Exercices courts d'automatisation.",
        status: "upcoming",
        // resourceSlots absent : aucun PDF produit pour l'instant
      },
      f2: {
        kind: "f2",
        label: "F2 — Application + consolidation",
        teacherIntent:
          "Conjuguer des verbes variés au passé simple dans des phrases et courts textes. Consolidation par dictée de phrases.",
        status: "upcoming",
      },
      f3: {
        kind: "f3",
        label: "F3 — Évaluation courte",
        teacherIntent:
          "Reconnaître et produire des formes au passé simple dans un court texte narratif inconnu.",
        status: "upcoming",
      },
    },
  },

  {
    id: "cm2-fr-edl-accord-participe",
    slug: "accord-du-participe-passe-etre-avoir",
    levelSlug: "cm2",
    cycle: "cycle-3",
    subject: "Français",
    subjectLabel: "Français",
    domainSlug: "francais",
    subdomainSlug: "etude-de-la-langue",
    title: "L'accord du participe passé",
    observableObjective:
      "Appliquer la règle d'accord du participe passé avec être et avoir (cas de base).",
    successCriteria: [
      "Je distingue les auxiliaires être et avoir.",
      "J'accorde le participe passé avec le sujet quand l'auxiliaire est être.",
      "Je n'accorde pas le participe passé avec avoir (cas de base).",
    ],
    competencyIds: ["cm2-fr-edl-accord-participe"],
    status: "upcoming",
    fiches: {
      f1: {
        kind: "f1",
        label: "F1 — Situation + mini-leçon + automatismes",
        teacherIntent:
          "Comparer des phrases avec être et avoir. Construire la règle de base. Exercices flash d'accord.",
        status: "upcoming",
      },
      f2: {
        kind: "f2",
        label: "F2 — Application + consolidation",
        teacherIntent:
          "Appliquer la règle dans des phrases variées, puis dans un court texte.",
        status: "upcoming",
      },
      f3: {
        kind: "f3",
        label: "F3 — Évaluation courte",
        teacherIntent:
          "Accorder correctement le participe passé dans des phrases avec être et avoir.",
        status: "upcoming",
      },
    },
  },

  // ── Mathématiques — Numération ─────────────────────────────────────────────

  {
    id: "cm2-ma-num-decimaux",
    slug: "nombres-decimaux-lire-ecrire-comparer",
    levelSlug: "cm2",
    cycle: "cycle-3",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "numeration",
    title: "Les nombres décimaux",
    observableObjective:
      "Lire, écrire et comparer des nombres décimaux en s'appuyant sur la valeur positionnelle des chiffres.",
    successCriteria: [
      "Je lis un nombre décimal et je nomme chaque chiffre par sa position.",
      "J'écris en chiffres un nombre décimal dicté à l'oral.",
      "Je compare deux nombres décimaux et je justifie.",
    ],
    competencyIds: ["cm2-ma-num-decimaux"],
    status: "upcoming",
    fiches: {
      f1: {
        kind: "f1",
        label: "F1 — Situation + mini-leçon + automatismes",
        teacherIntent:
          "Situation de départ : prix et mesures. Mini-leçon sur la valeur positionnelle (unités, dixièmes, centièmes). Lecture flash de décimaux.",
        status: "upcoming",
      },
      f2: {
        kind: "f2",
        label: "F2 — Application + consolidation",
        teacherIntent:
          "Écrire des décimaux sous la dictée, les comparer, les placer sur une droite graduée.",
        status: "upcoming",
      },
      f3: {
        kind: "f3",
        label: "F3 — Évaluation courte",
        teacherIntent:
          "Lire, écrire et ordonner des décimaux dans une situation variée.",
        status: "upcoming",
      },
    },
  },

  {
    id: "cm2-ma-geo-symetrie-axiale",
    slug: "symetrie-axiale",
    levelSlug: "cm2",
    cycle: "cycle-3",
    subject: "Mathématiques",
    subjectLabel: "Mathématiques",
    domainSlug: "mathematiques",
    subdomainSlug: "geometrie",
    title: "La symétrie axiale",
    observableObjective:
      "Reconnaître et construire le symétrique d'une figure par rapport à un axe.",
    successCriteria: [
      "Je reconnais si une figure est symétrique par rapport à un axe donné.",
      "Je construis le symétrique d'un point par rapport à un axe.",
      "Je trace le symétrique d'une figure simple à l'aide de la règle et de l'équerre.",
    ],
    competencyIds: ["cm2-ma-geo-symetrie-axiale"],
    status: "upcoming",
    fiches: {
      f1: {
        kind: "f1",
        label: "F1 — Situation + mini-leçon + automatismes",
        teacherIntent:
          "Observation de figures symétriques dans l'environnement. Mini-leçon sur l'axe et le symétrique d'un point. Automatismes de reconnaissance.",
        status: "upcoming",
      },
      f2: {
        kind: "f2",
        label: "F2 — Application + consolidation",
        teacherIntent:
          "Tracer des symétriques de figures simples par rapport à des axes variés (vertical, horizontal, oblique).",
        status: "upcoming",
      },
      f3: {
        kind: "f3",
        label: "F3 — Évaluation courte",
        teacherIntent:
          "Reconnaître et construire un symétrique dans une situation nouvelle, avec justification.",
        status: "upcoming",
      },
    },
  },
] as const satisfies Notion[];
