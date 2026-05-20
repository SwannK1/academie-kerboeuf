// Programme pilote 6e — Cycle 3, collège.
// Français : 4 domaines — lecture, écriture, étude de la langue, oral.
// Le site organise ; les PDF enseignent.
// Aucun href fictif, aucun PDF inventé.

import type { CurriculumLevelMap } from "@/content/curriculum-map-types";
import type { ProgramStatus } from "@/content/program-types";

// ── Métadonnées d'affichage des sous-domaines Français ────────────────────────
// Utilisées par la page portail matière /college/6e/francais.

export type CollegeSubdomainCard = {
  subdomainSlug: string;
  label: string;
  description: string;
  status: ProgramStatus;
  href?: string;
};

// ── Cartes matières du portail /college/6e ─────────────────────────────────────
// Affichées sur la page 6e. Seules les matières avec href ont une page existante.

export type CollegeMatiereCard = {
  slug: string;
  label: string;
  description: string;
  status: ProgramStatus;
  href?: string;
};

export const sixiemeMatieres: CollegeMatiereCard[] = [
  {
    slug: "francais",
    label: "Français",
    description: "Lecture, écriture, étude de la langue et oral.",
    status: "in-progress",
    href: "/college/6e/francais",
  },
  {
    slug: "mathematiques",
    label: "Mathématiques",
    description: "Nombres, calcul, géométrie et résolution de problèmes.",
    status: "in-progress",
    href: "/college/6e/mathematiques",
  },
  {
    slug: "histoire-geographie-emc",
    label: "Histoire-Géographie-EMC",
    description: "Repères chronologiques, géographiques et éducation civique.",
    status: "in-progress",
    href: "/college/6e/histoire-geographie-emc",
  },
  {
    slug: "sciences",
    label: "Sciences et technologie",
    description: "SVT, physique-chimie et technologie — regroupés pour la 6e.",
    status: "upcoming",
  },
  {
    slug: "anglais",
    label: "Anglais",
    description: "Compréhension, expression et interaction en langue vivante.",
    status: "upcoming",
  },
];

// ── Métadonnées d'affichage des sous-domaines Mathématiques ──────────────────
// Utilisées par la page portail matière /college/6e/mathematiques.

export const sixiemeMathematiquesSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "nombres-calcul",
    label: "Nombres et calcul",
    description:
      "Lire, écrire, comparer et calculer avec des nombres entiers et des fractions simples.",
    status: "in-progress",
    href: "/college/6e/mathematiques/nombres-calcul",
  },
  {
    subdomainSlug: "resolution-problemes",
    label: "Résolution de problèmes",
    description:
      "Analyser un problème, choisir une procédure et vérifier la vraisemblance du résultat.",
    status: "upcoming",
    href: "/college/6e/mathematiques/resolution-problemes",
  },
  {
    subdomainSlug: "grandeurs-mesures",
    label: "Grandeurs et mesures",
    description:
      "Longueurs, masses, durées, aires et volumes — utiliser les unités et convertir.",
    status: "upcoming",
    href: "/college/6e/mathematiques/grandeurs-mesures",
  },
  {
    subdomainSlug: "geometrie",
    label: "Géométrie",
    description:
      "Figures planes, constructions et transformations géométriques dans le plan.",
    status: "upcoming",
    href: "/college/6e/mathematiques/geometrie",
  },
  {
    subdomainSlug: "organisation-donnees",
    label: "Organisation et gestion de données",
    description:
      "Lire, interpréter et construire des tableaux et des graphiques simples.",
    status: "in-progress",
    href: "/college/6e/mathematiques/organisation-donnees",
  },
];

// ── Métadonnées d'affichage des sous-domaines Histoire-Géographie-EMC ───────
// Histoire et Géographie possèdent une page pilote.

export const sixiemeHistoireGeographieEmcSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "histoire",
    label: "Histoire",
    description:
      "Construire les premiers repères chronologiques, lire une frise et interroger des documents historiques simples.",
    status: "in-progress",
    href: "/college/6e/histoire-geographie-emc/histoire",
  },
  {
    subdomainSlug: "geographie",
    label: "Géographie",
    description:
      "Observer les espaces habités, lire des cartes simples et décrire l'organisation d'un territoire.",
    status: "in-progress",
    href: "/college/6e/histoire-geographie-emc/geographie",
  },
  {
    subdomainSlug: "emc",
    label: "EMC",
    description:
      "Identifier des règles communes, des droits, des responsabilités et des situations de vie collective.",
    status: "upcoming",
  },
  {
    subdomainSlug: "methodes-et-reperes",
    label: "Méthodes et repères",
    description:
      "Installer les outils de travail : se repérer, lire un document, mémoriser un vocabulaire précis.",
    status: "upcoming",
  },
];

export const sixiemeFrancaisSubdomains: CollegeSubdomainCard[] = [
  {
    subdomainSlug: "lecture",
    label: "Lecture",
    description:
      "Comprendre des textes narratifs et documentaires, repérer les informations explicites, inférer un sens implicite, identifier le point de vue d'un personnage.",
    status: "in-progress",
    href: "/college/6e/francais/lecture",
  },
  {
    subdomainSlug: "ecriture",
    label: "Écriture",
    description:
      "Produire un texte court organisé, argumenter une réponse et réviser sa copie avec méthode.",
    status: "in-progress",
    href: "/college/6e/francais/ecriture",
  },
  {
    subdomainSlug: "etude-de-la-langue",
    label: "Étude de la langue",
    description:
      "Grammaire, conjugaison, orthographe et vocabulaire mis au service de la lecture et de l'écriture.",
    status: "in-progress",
    href: "/college/6e/francais/etude-de-la-langue",
  },
  {
    subdomainSlug: "oral",
    label: "Oral",
    description:
      "Prendre la parole, écouter, reformuler une information et débattre avec des arguments simples.",
    status: "in-progress",
    href: "/college/6e/francais/oral",
  },
];

// ── Carte du programme 6e — CurriculumLevelMap ────────────────────────────────

export const sixiemeCurriculumLevelMap: CurriculumLevelMap = {
  levelSlug: "6e",
  domains: [
    {
      domainSlug: "francais",
      subject: "Français",
      label: "Français",
      subdomains: [
        {
          subdomainSlug: "lecture",
          label: "Lecture",
          entries: [
            {
              id: "6e-fr-lec-texte-narratif-entry",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture",
              title: "Comprendre un texte narratif court",
              officialReference: "Cycle 3 — Comprendre et interpréter des textes",
              observableObjective:
                "L'élève comprend un texte narratif court en identifiant les personnages, les lieux, les actions et la chronologie.",
              successCriteria: [
                "Je repère les personnages et leurs rôles.",
                "Je situe l'action dans le temps et dans l'espace.",
                "Je reconstitue la suite des événements.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-fr-lec-infos-explicites-entry",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture",
              title: "Repérer les informations explicites",
              officialReference: "Cycle 3 — Comprendre et interpréter des textes",
              observableObjective:
                "L'élève localise une information directement présente dans le texte et la reformule avec ses propres mots.",
              successCriteria: [
                "Je retrouve l'information dans le texte.",
                "Je la reformule sans recopier mot pour mot.",
                "J'indique la ligne ou le passage où je l'ai trouvée.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-fr-lec-inference-entry",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture",
              title: "Faire une inférence simple",
              officialReference: "Cycle 3 — Comprendre et interpréter des textes",
              observableObjective:
                "L'élève comprend une information non dite en combinant un indice du texte et ses connaissances.",
              successCriteria: [
                "Je repère l'indice dans le texte.",
                "Je formule ce que le texte suggère sans le dire.",
                "Je justifie mon inférence avec l'indice.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-fr-lec-point-vue-entry",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture",
              title: "Identifier le point de vue d'un personnage",
              officialReference: "Cycle 3 — Comprendre et interpréter des textes",
              observableObjective:
                "L'élève distingue ce que le personnage pense, ressent ou veut, en s'appuyant sur ses paroles et ses actes.",
              successCriteria: [
                "Je relève ce que le personnage dit ou pense.",
                "Je formule son point de vue en une phrase.",
                "Je le différencie du point de vue du narrateur.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-fr-lec-justifier-indice-entry",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture",
              title: "Justifier une réponse avec un indice du texte",
              officialReference: "Cycle 3 — Comprendre et interpréter des textes",
              observableObjective:
                "L'élève appuie sa réponse sur un passage précis du texte, qu'il cite ou désigne.",
              successCriteria: [
                "Je donne ma réponse clairement.",
                "Je la justifie avec un passage du texte.",
                "Je cite ou désigne l'indice précisément.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-fr-lec-documentaire-entry",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture",
              title: "Lire un texte documentaire court",
              officialReference: "Cycle 3 — Comprendre et interpréter des textes",
              observableObjective:
                "L'élève comprend un texte documentaire court en repérant son sujet, sa structure et les informations essentielles qu'il apporte.",
              successCriteria: [
                "Je repère le sujet principal du texte.",
                "Je distingue les idées importantes des exemples et des détails.",
                "Je reformule ce que le texte m'a appris en une ou deux phrases.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-fr-lec-vocabulaire-contexte-entry",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture",
              title: "Comprendre le sens d'un mot grâce au contexte",
              officialReference: "Cycle 3 — Comprendre et interpréter des textes",
              observableObjective:
                "L'élève déduit le sens probable d'un mot inconnu en s'appuyant sur le contexte de la phrase et du paragraphe.",
              successCriteria: [
                "Je repère le contexte autour du mot difficile.",
                "Je propose une définition approchée avec mes propres mots.",
                "Je vérifie que ma définition est cohérente avec la suite du texte.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "ecriture",
          label: "Écriture",
          entries: [
            {
              id: "6e-fr-ecr-planifier-entry",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "ecriture",
              title: "Planifier un court écrit",
              officialReference: "Cycle 3 — Écrire des textes en maîtrisant la langue",
              observableObjective:
                "L'élève réfléchit avant d'écrire : il identifie son destinataire, son intention et les idées principales qu'il veut exprimer.",
              successCriteria: [
                "Je sais dire ce que je veux écrire avant de commencer.",
                "Je repère les idées principales à mettre dans mon texte.",
                "Je pense à qui je m'adresse.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-fr-ecr-paragraphe-entry",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "ecriture",
              title: "Rédiger un paragraphe organisé",
              officialReference: "Cycle 3 — Écrire des textes en maîtrisant la langue",
              observableObjective:
                "L'élève écrit un paragraphe avec une idée principale, des exemples ou des détails, et une phrase de clôture.",
              successCriteria: [
                "Mon paragraphe a une idée principale claire.",
                "J'appuie mon idée avec un exemple ou un détail.",
                "Ma phrase de conclusion rappelle ou complète l'idée principale.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-fr-ecr-relecture-entry",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "ecriture",
              title: "Améliorer un texte après relecture",
              officialReference: "Cycle 3 — Écrire des textes en maîtrisant la langue",
              observableObjective:
                "L'élève relit son texte en cherchant à améliorer la clarté, la cohérence et l'orthographe, à l'aide d'une grille de relecture.",
              successCriteria: [
                "Je relis mon texte au moins une fois avant de le rendre.",
                "Je corrige les erreurs que je repère.",
                "Je vérifie que mes idées s'enchaînent.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-fr-ecr-connecteurs-entry",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "ecriture",
              title: "Utiliser des connecteurs simples",
              officialReference: "Cycle 3 — Écrire des textes en maîtrisant la langue",
              observableObjective:
                "L'élève relie ses phrases et ses idées avec des connecteurs logiques ou temporels adaptés au sens.",
              successCriteria: [
                "J'utilise des connecteurs comme « d'abord », « ensuite », « enfin ».",
                "Je varies mes connecteurs selon le sens (temps, cause, opposition).",
                "Mes phrases ne commencent pas toutes par « et ».",
              ],
              status: "upcoming",
            },
            {
              id: "6e-fr-ecr-expansions-entry",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "ecriture",
              title: "Enrichir une phrase avec des expansions du nom",
              officialReference: "Cycle 3 — Écrire des textes en maîtrisant la langue",
              observableObjective:
                "L'élève ajoute des compléments du nom — adjectifs, groupes nominaux prépositionnels ou relatives simples — pour préciser une information et améliorer la qualité de son texte.",
              successCriteria: [
                "J'ajoute un adjectif ou un groupe de mots pour préciser un nom.",
                "Ma phrase reste claire et lisible après enrichissement.",
                "Je vérifie les accords des expansions que j'ai ajoutées.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "etude-de-la-langue",
          label: "Étude de la langue",
          entries: [
            {
              id: "6e-fr-edl-classes-entry",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Identifier les classes grammaticales principales",
              officialReference: "Cycle 3 — Comprendre le fonctionnement de la langue",
              observableObjective:
                "L'élève reconnaît les noms, verbes, adjectifs, pronoms et déterminants dans une phrase simple.",
              successCriteria: [
                "Je reconnais les noms et les déterminants.",
                "Je repère les verbes conjugués.",
                "Je distingue les adjectifs qualificatifs des autres mots.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-fr-edl-sujet-verbe-entry",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Repérer le sujet et le verbe",
              officialReference: "Cycle 3 — Comprendre le fonctionnement de la langue",
              observableObjective:
                "L'élève identifie le verbe conjugué et son sujet dans une phrase simple ou complexe.",
              successCriteria: [
                "Je trouve le verbe en cherchant ce qui change avec le temps.",
                "Je trouve le sujet en posant la question « qui fait l'action ? ».",
                "Je relie correctement le sujet à son verbe.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-fr-edl-accord-entry",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Accorder le verbe avec son sujet",
              officialReference: "Cycle 3 — Comprendre le fonctionnement de la langue",
              observableObjective:
                "L'élève applique les règles d'accord sujet-verbe, y compris avec des sujets inversés ou éloignés.",
              successCriteria: [
                "Mon verbe s'accorde avec son sujet en personne et en nombre.",
                "Je repère le sujet même quand il est éloigné du verbe.",
                "Je vérifie l'accord dans ma relecture.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-fr-edl-groupes-entry",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Identifier les groupes dans la phrase",
              officialReference: "Cycle 3 — Comprendre le fonctionnement de la langue",
              observableObjective:
                "L'élève repère le groupe nominal sujet, le groupe verbal et les compléments dans une phrase simple.",
              successCriteria: [
                "Je délimite le groupe nominal sujet.",
                "Je repère le groupe verbal.",
                "Je distingue les compléments du verbe et les compléments de phrase.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-fr-edl-temps-recit-entry",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Conjuguer aux temps du récit",
              officialReference: "Cycle 3 — Comprendre le fonctionnement de la langue",
              observableObjective:
                "L'élève distingue et conjugue les formes de l'imparfait et du passé composé pour raconter ou décrire une situation passée.",
              successCriteria: [
                "Je conjugue un verbe à l'imparfait en choisissant la bonne terminaison.",
                "Je forme le passé composé avec l'auxiliaire et le participe passé adaptés.",
                "Je choisis le temps approprié selon la valeur à exprimer dans le récit.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "oral",
          label: "Oral",
          entries: [
            {
              id: "6e-fr-oral-reponse-entry",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "oral",
              title: "Présenter une réponse clairement",
              officialReference: "Cycle 3 — Comprendre et s'exprimer à l'oral",
              observableObjective:
                "L'élève formule une réponse complète à l'oral, en énonçant clairement son propos et en évitant les hésitations excessives.",
              successCriteria: [
                "Je réponds en phrase et pas seulement par un mot.",
                "Je parle assez fort pour être entendu.",
                "Ma réponse répond bien à la question posée.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-fr-oral-reformuler-entry",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "oral",
              title: "Écouter et reformuler une idée",
              officialReference: "Cycle 3 — Comprendre et s'exprimer à l'oral",
              observableObjective:
                "L'élève écoute un camarade ou un enseignant et reformule l'idée principale avec ses propres mots.",
              successCriteria: [
                "Je peux redire avec mes mots ce que quelqu'un vient de dire.",
                "Je ne recopie pas mot pour mot.",
                "Ma reformulation garde le sens de l'original.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-fr-oral-echange-entry",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "oral",
              title: "Participer à un échange organisé",
              officialReference: "Cycle 3 — Comprendre et s'exprimer à l'oral",
              observableObjective:
                "L'élève prend la parole à son tour dans un débat ou une discussion, sans couper la parole et en restant dans le sujet.",
              successCriteria: [
                "J'attends mon tour avant de parler.",
                "Mon intervention est en lien avec ce qui vient d'être dit.",
                "Je parle au groupe et pas seulement à l'enseignant.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-fr-oral-justifier-entry",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "oral",
              title: "Justifier brièvement son avis",
              officialReference: "Cycle 3 — Comprendre et s'exprimer à l'oral",
              observableObjective:
                "L'élève exprime un avis personnel et l'appuie sur un argument ou un exemple tiré du texte ou de la discussion.",
              successCriteria: [
                "Je dis ce que je pense et pourquoi.",
                "J'appuie mon avis sur un argument ou un exemple.",
                "Je reste respectueux si mon avis diffère de celui d'un camarade.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-fr-oral-lecture-voix-haute-entry",
              levelSlug: "6e",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "oral",
              title: "Lire un texte à voix haute de façon expressive",
              officialReference: "Cycle 3 — Comprendre et s'exprimer à l'oral",
              observableObjective:
                "L'élève lit un texte court à voix haute en respectant la ponctuation, le rythme et en variant l'intonation selon le sens.",
              successCriteria: [
                "Je marque les pauses aux virgules et aux points.",
                "Je module ma voix selon l'intention du texte.",
                "Je lis de façon fluide sans épeler les mots.",
              ],
              status: "upcoming",
            },
          ],
        },
      ],
    },
    {
      domainSlug: "mathematiques",
      subject: "Mathématiques",
      label: "Mathématiques",
      subdomains: [
        {
          subdomainSlug: "nombres-calcul",
          label: "Nombres et calcul",
          entries: [
            {
              id: "6e-ma-nc-entiers-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "nombres-calcul",
              title: "Lire, écrire et comparer des nombres entiers",
              officialReference: "Cycle 3 — Nombres et calculs",
              observableObjective:
                "L'élève lit, écrit, représente et compare des entiers jusqu'au milliard en utilisant la valeur positionnelle des chiffres.",
              successCriteria: [
                "Je lis et j'écris un entier en chiffres et en lettres.",
                "Je place un entier sur une droite graduée.",
                "Je compare deux entiers et j'utilise les symboles < et >.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-ma-nc-fractions-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "nombres-calcul",
              title: "Utiliser les fractions simples",
              officialReference: "Cycle 3 — Nombres et calculs",
              observableObjective:
                "L'élève comprend et utilise les fractions simples comme quotient et comme partage, en lien avec les décimaux.",
              successCriteria: [
                "Je relie une fraction à un partage d'un tout en parties égales.",
                "Je place une fraction simple sur une droite graduée.",
                "Je reconnais qu'un entier peut s'écrire sous forme de fraction.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-ma-nc-calcul-mental-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "nombres-calcul",
              title: "Calculer mentalement avec des procédures efficaces",
              officialReference: "Cycle 3 — Nombres et calculs",
              observableObjective:
                "L'élève mobilise des propriétés des opérations et des stratégies adaptées pour calculer mentalement de façon rapide et exacte.",
              successCriteria: [
                "Je décompose un calcul pour le simplifier.",
                "J'utilise la distributivité ou la commutativité quand c'est utile.",
                "Je vérifie mon résultat par un ordre de grandeur.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-ma-nc-operations-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "nombres-calcul",
              title: "Poser et effectuer une opération",
              officialReference: "Cycle 3 — Nombres et calculs",
              observableObjective:
                "L'élève choisit l'opération adaptée à une situation et la pose correctement pour obtenir un résultat exact.",
              successCriteria: [
                "Je choisis l'opération correspondant à la situation.",
                "Je pose l'addition, la soustraction et la multiplication en colonnes.",
                "Je pose et effectue une division euclidienne simple.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-ma-nc-vraisemblance-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "nombres-calcul",
              title: "Contrôler la vraisemblance d'un résultat",
              officialReference: "Cycle 3 — Nombres et calculs",
              observableObjective:
                "L'élève estime si un résultat est plausible en utilisant des arrondis ou des ordres de grandeur avant ou après le calcul.",
              successCriteria: [
                "J'estime un résultat avant de calculer.",
                "Je vérifie que mon résultat a du sens dans le contexte.",
                "Je repère et corrige une erreur de grandeur.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-ma-nc-decimaux-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "nombres-calcul",
              title: "Lire, écrire et comparer des nombres décimaux",
              officialReference: "Cycle 3 — Nombres et calculs",
              observableObjective:
                "L'élève lit, écrit et compare des décimaux en comprenant la valeur positionnelle des chiffres après la virgule.",
              successCriteria: [
                "Je lis et j'écris un décimal avec des dixièmes et des centièmes.",
                "Je place un décimal sur une droite graduée.",
                "Je compare deux décimaux et j'explique mon choix.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-ma-nc-calcul-decimaux-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "nombres-calcul",
              title: "Effectuer des calculs simples avec des décimaux",
              officialReference: "Cycle 3 — Nombres et calculs",
              observableObjective:
                "L'élève additionne et soustrait des nombres décimaux en posant les opérations en colonnes avec la virgule alignée.",
              successCriteria: [
                "J'aligne les virgules pour poser l'opération.",
                "J'effectue l'addition ou la soustraction en colonnes.",
                "Je vérifie l'ordre de grandeur de mon résultat.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "resolution-problemes",
          label: "Résolution de problèmes",
          entries: [
            {
              id: "6e-ma-rp-comprendre-situation-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "resolution-problemes",
              title: "Comprendre une situation problème",
              officialReference: "Cycle 3 — Résoudre des problèmes",
              observableObjective:
                "L'élève identifie les informations utiles, la question posée et les données à écarter dans une situation simple.",
              successCriteria: [
                "Je reformule la question du problème.",
                "Je repère les données utiles.",
                "J'écarte les informations inutiles.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-ma-rp-choisir-operation-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "resolution-problemes",
              title: "Choisir une opération adaptée",
              officialReference: "Cycle 3 — Résoudre des problèmes",
              observableObjective:
                "L'élève choisit l'opération qui correspond à la relation entre les données du problème.",
              successCriteria: [
                "Je repère ce que je cherche.",
                "Je choisis une opération cohérente.",
                "Je peux expliquer mon choix en une phrase.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-ma-rp-organiser-etapes-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "resolution-problemes",
              title: "Organiser les étapes de résolution",
              officialReference: "Cycle 3 — Résoudre des problèmes",
              observableObjective:
                "L'élève présente une résolution en étapes lisibles, avec calculs et réponse finale.",
              successCriteria: [
                "J'écris les calculs dans un ordre clair.",
                "Je sépare les étapes importantes.",
                "Je termine par une phrase réponse.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-ma-rp-verifier-coherence-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "resolution-problemes",
              title: "Vérifier la cohérence du résultat",
              officialReference: "Cycle 3 — Résoudre des problèmes",
              observableObjective:
                "L'élève contrôle si son résultat est plausible par rapport à la question et aux unités utilisées.",
              successCriteria: [
                "Je relis la question avant de valider.",
                "Je vérifie l'unité de ma réponse.",
                "Je repère un résultat impossible ou trop éloigné.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-ma-rp-phrase-reponse-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "resolution-problemes",
              title: "Rédiger une phrase-réponse complète",
              officialReference: "Cycle 3 — Résoudre des problèmes",
              observableObjective:
                "L'élève conclut la résolution par une phrase qui reprend la question posée et indique l'unité adaptée.",
              successCriteria: [
                "Ma phrase-réponse reprend l'objet de la question.",
                "J'indique l'unité correspondant au résultat.",
                "Ma réponse est compréhensible sans avoir lu les calculs.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-ma-rp-plusieurs-etapes-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "resolution-problemes",
              title: "Résoudre un problème à deux étapes",
              officialReference: "Cycle 3 — Résoudre des problèmes",
              observableObjective:
                "L'élève identifie les deux étapes d'une résolution et les traite dans l'ordre pour obtenir le résultat final.",
              successCriteria: [
                "Je repère qu'il faut effectuer deux calculs successifs.",
                "Je résous la première étape avant la seconde.",
                "Je vérifie que le résultat final répond bien à la question posée.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "grandeurs-mesures",
          label: "Grandeurs et mesures",
          entries: [
            {
              id: "6e-ma-gm-utiliser-unites-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "grandeurs-mesures",
              title: "Utiliser les unités usuelles",
              officialReference: "Cycle 3 — Grandeurs et mesures",
              observableObjective:
                "L'élève associe une longueur, une masse, une contenance ou une durée à une unité adaptée.",
              successCriteria: [
                "Je choisis une unité cohérente avec la grandeur.",
                "Je distingue longueur, masse, contenance et durée.",
                "J'écris l'unité avec le résultat.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-ma-gm-convertir-unites-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "grandeurs-mesures",
              title: "Convertir des unités simples",
              officialReference: "Cycle 3 — Grandeurs et mesures",
              observableObjective:
                "L'élève convertit des mesures simples dans une unité voisine ou familière.",
              successCriteria: [
                "Je repère l'unité de départ et l'unité d'arrivée.",
                "J'utilise une relation de conversion connue.",
                "Je vérifie que l'ordre de grandeur reste cohérent.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-ma-gm-calculer-perimetre-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "grandeurs-mesures",
              title: "Calculer un périmètre",
              officialReference: "Cycle 3 — Grandeurs et mesures",
              observableObjective:
                "L'élève calcule le périmètre d'une figure simple en additionnant les longueurs de ses côtés.",
              successCriteria: [
                "Je repère toutes les longueurs utiles.",
                "J'additionne les côtés de la figure.",
                "J'indique l'unité du périmètre.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-ma-gm-utiliser-mesure-probleme-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "grandeurs-mesures",
              title: "Utiliser une mesure dans un problème",
              officialReference: "Cycle 3 — Grandeurs et mesures",
              observableObjective:
                "L'élève lit une mesure dans un énoncé et l'utilise dans un calcul adapté à la situation.",
              successCriteria: [
                "Je repère la mesure utile.",
                "Je conserve la bonne unité.",
                "J'utilise la mesure dans le calcul attendu.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-ma-gm-calculer-aire-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "grandeurs-mesures",
              title: "Calculer l'aire d'un rectangle ou d'un carré",
              officialReference: "Cycle 3 — Grandeurs et mesures",
              observableObjective:
                "L'élève calcule l'aire d'un rectangle ou d'un carré en appliquant la formule adaptée et en exprimant le résultat avec une unité d'aire.",
              successCriteria: [
                "Je repère les dimensions utiles de la figure.",
                "J'applique la formule longueur × largeur pour le rectangle.",
                "J'exprime le résultat avec une unité d'aire cohérente (cm², m²).",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "geometrie",
          label: "Géométrie",
          entries: [
            {
              id: "6e-ma-geo-reconnaitre-figures-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "geometrie",
              title: "Reconnaître et décrire des figures",
              officialReference: "Cycle 3 — Espace et géométrie",
              observableObjective:
                "L'élève reconnaît des figures planes usuelles et décrit leurs côtés, sommets et angles.",
              successCriteria: [
                "Je nomme la figure correctement.",
                "Je repère les côtés et les sommets.",
                "J'utilise un vocabulaire géométrique précis.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-ma-geo-tracer-instruments-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "geometrie",
              title: "Tracer avec les instruments",
              officialReference: "Cycle 3 — Espace et géométrie",
              observableObjective:
                "L'élève réalise un tracé simple avec règle, équerre ou compas en respectant une consigne.",
              successCriteria: [
                "Je choisis l'instrument adapté.",
                "Je trace avec soin.",
                "Je respecte les mesures ou contraintes données.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-ma-geo-paralleles-perpendiculaires-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "geometrie",
              title: "Identifier parallèles et perpendiculaires",
              officialReference: "Cycle 3 — Espace et géométrie",
              observableObjective:
                "L'élève reconnaît et nomme des droites parallèles ou perpendiculaires dans une figure.",
              successCriteria: [
                "Je repère les droites qui se coupent à angle droit.",
                "Je repère les droites qui gardent le même écart.",
                "J'utilise les mots parallèle et perpendiculaire correctement.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-ma-geo-vocabulaire-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "geometrie",
              title: "Utiliser le vocabulaire géométrique",
              officialReference: "Cycle 3 — Espace et géométrie",
              observableObjective:
                "L'élève emploie les termes géométriques adaptés pour décrire une figure ou un tracé.",
              successCriteria: [
                "Je distingue point, segment, droite et demi-droite.",
                "Je nomme les éléments d'une figure.",
                "Je formule une description courte et précise.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-ma-geo-programme-construction-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "geometrie",
              title: "Construire une figure à partir d'un programme de construction",
              officialReference: "Cycle 3 — Espace et géométrie",
              observableObjective:
                "L'élève exécute étape par étape un programme de construction pour obtenir une figure plane précise avec les instruments adaptés.",
              successCriteria: [
                "Je lis chaque étape avant de tracer.",
                "Je choisis et utilise les instruments corrects (règle, compas, équerre).",
                "Ma figure finale correspond à la description du programme.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "organisation-donnees",
          label: "Organisation et gestion de données",
          entries: [
            {
              id: "6e-ma-ogd-lire-tableau-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "organisation-donnees",
              title: "Lire un tableau",
              officialReference: "Cycle 3 — Organisation et gestion de données",
              observableObjective:
                "L'élève retrouve une information dans un tableau simple à partir d'une ligne, d'une colonne ou d'un intitulé.",
              successCriteria: [
                "Je repère le titre du tableau.",
                "Je lis correctement les lignes et les colonnes.",
                "Je relève la donnée demandée.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-ma-ogd-lire-graphique-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "organisation-donnees",
              title: "Lire un graphique simple",
              officialReference: "Cycle 3 — Organisation et gestion de données",
              observableObjective:
                "L'élève lit une valeur ou une tendance dans un graphique simple avec axes ou légende.",
              successCriteria: [
                "Je repère ce que représente le graphique.",
                "Je lis les valeurs avec l'axe ou la légende.",
                "Je réponds à une question à partir du graphique.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-ma-ogd-completer-tableau-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "organisation-donnees",
              title: "Compléter un tableau",
              officialReference: "Cycle 3 — Organisation et gestion de données",
              observableObjective:
                "L'élève complète un tableau à partir de données fournies dans un texte court ou une liste.",
              successCriteria: [
                "Je repère les catégories à compléter.",
                "Je place chaque donnée au bon endroit.",
                "Je vérifie qu'aucune donnée utile ne manque.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-ma-ogd-interpreter-donnees-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "organisation-donnees",
              title: "Interpréter des données",
              officialReference: "Cycle 3 — Organisation et gestion de données",
              observableObjective:
                "L'élève utilise des données organisées pour comparer, conclure ou répondre à une question simple.",
              successCriteria: [
                "Je compare les données utiles.",
                "Je formule une conclusion courte.",
                "Je justifie ma réponse avec une donnée lue.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-ma-ogd-calculer-moyenne-entry",
              levelSlug: "6e",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "organisation-donnees",
              title: "Calculer une valeur moyenne",
              officialReference: "Cycle 3 — Organisation et gestion de données",
              observableObjective:
                "L'élève calcule une moyenne simple en additionnant les valeurs d'une série et en divisant par leur nombre.",
              successCriteria: [
                "J'additionne toutes les valeurs de la série.",
                "Je divise par le nombre de valeurs.",
                "J'interprète le résultat dans le contexte de la situation.",
              ],
              status: "upcoming",
            },
          ],
        },
      ],
    },
    {
      domainSlug: "histoire-geographie-emc",
      subject: "Histoire-Géographie-EMC",
      label: "Histoire-Géographie-EMC",
      subdomains: [
        {
          subdomainSlug: "histoire",
          label: "Histoire",
          entries: [
            {
              id: "6e-hgemc-hist-temps-long-entry",
              levelSlug: "6e",
              subject: "Histoire-Géographie-EMC",
              domainSlug: "histoire-geographie-emc",
              subdomainSlug: "histoire",
              title: "Se repérer dans le temps long",
              officialReference: "Cycle 3 — Se repérer dans le temps",
              observableObjective:
                "L'élève situe une période ou un événement dans un temps long en utilisant des repères chronologiques simples.",
              successCriteria: [
                "Je distingue une date, un siècle et une période.",
                "Je situe un événement avant ou après un autre.",
                "J'utilise un vocabulaire temporel précis.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-hgemc-hist-frise-simple-entry",
              levelSlug: "6e",
              subject: "Histoire-Géographie-EMC",
              domainSlug: "histoire-geographie-emc",
              subdomainSlug: "histoire",
              title: "Comprendre une frise chronologique simple",
              officialReference: "Cycle 3 — Se repérer dans le temps",
              observableObjective:
                "L'élève lit une frise chronologique courte pour retrouver l'ordre des événements et les intervalles représentés.",
              successCriteria: [
                "Je lis le sens de la frise.",
                "Je repère les dates importantes.",
                "Je replace un événement au bon endroit.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-hgemc-hist-source-entry",
              levelSlug: "6e",
              subject: "Histoire-Géographie-EMC",
              domainSlug: "histoire-geographie-emc",
              subdomainSlug: "histoire",
              title: "Identifier une source historique",
              officialReference: "Cycle 3 — Comprendre un document",
              observableObjective:
                "L'élève reconnaît la nature d'un document historique simple et repère ce qu'il peut apprendre grâce à lui.",
              successCriteria: [
                "Je nomme le type de document.",
                "Je repère l'auteur ou l'origine quand ils sont indiqués.",
                "Je dis ce que le document permet de comprendre.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-hgemc-hist-prelever-informations-entry",
              levelSlug: "6e",
              subject: "Histoire-Géographie-EMC",
              domainSlug: "histoire-geographie-emc",
              subdomainSlug: "histoire",
              title: "Prélever des informations dans un document",
              officialReference: "Cycle 3 — Raisonner et justifier",
              observableObjective:
                "L'élève extrait une information utile d'un texte, d'une image ou d'une carte historique pour répondre à une question.",
              successCriteria: [
                "Je lis la consigne avant le document.",
                "Je relève l'information utile.",
                "Je justifie ma réponse avec un indice du document.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-hgemc-hist-expliquer-fait-entry",
              levelSlug: "6e",
              subject: "Histoire-Géographie-EMC",
              domainSlug: "histoire-geographie-emc",
              subdomainSlug: "histoire",
              title: "Expliquer un fait historique avec des mots précis",
              officialReference: "Cycle 3 — Pratiquer différents langages",
              observableObjective:
                "L'élève formule une courte explication historique en utilisant quelques mots-clés adaptés.",
              successCriteria: [
                "J'explique le fait en une ou deux phrases.",
                "J'utilise les mots importants du chapitre.",
                "Je relie mon explication à un repère ou à un document.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-hgemc-hist-raconter-evenement-entry",
              levelSlug: "6e",
              subject: "Histoire-Géographie-EMC",
              domainSlug: "histoire-geographie-emc",
              subdomainSlug: "histoire",
              title: "Raconter un événement historique étudié",
              officialReference: "Cycle 3 — Pratiquer différents langages",
              observableObjective:
                "L'élève raconte avec ses propres mots un événement historique vu en classe, en précisant qui, quand, où et ce qui s'est passé.",
              successCriteria: [
                "Je précise quand l'événement s'est produit.",
                "Je nomme les acteurs principaux et le lieu.",
                "Je restitue les faits essentiels dans un ordre chronologique.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "geographie",
          label: "Géographie",
          entries: [
            {
              id: "6e-hgemc-geo-lire-paysage-entry",
              levelSlug: "6e",
              subject: "Histoire-Géographie-EMC",
              domainSlug: "histoire-geographie-emc",
              subdomainSlug: "geographie",
              title: "Lire un paysage et identifier ses éléments",
              officialReference: "Cycle 3 — Se repérer dans l'espace",
              observableObjective:
                "L'élève observe un paysage et distingue les éléments naturels, aménagés et construits par les habitants.",
              successCriteria: [
                "Je décris ce que je vois avec des mots précis.",
                "Je distingue les éléments naturels et humains.",
                "Je repère les éléments importants du paysage.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-hgemc-geo-carte-simple-entry",
              levelSlug: "6e",
              subject: "Histoire-Géographie-EMC",
              domainSlug: "histoire-geographie-emc",
              subdomainSlug: "geographie",
              title: "Se repérer sur une carte simple",
              officialReference: "Cycle 3 — Se repérer dans l'espace",
              observableObjective:
                "L'élève utilise le titre, la légende, l'orientation et les figurés pour comprendre une carte simple.",
              successCriteria: [
                "Je lis le titre de la carte.",
                "J'utilise la légende pour comprendre les symboles.",
                "Je repère un lieu avec l'aide de la carte.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-hgemc-geo-echelles-entry",
              levelSlug: "6e",
              subject: "Histoire-Géographie-EMC",
              domainSlug: "histoire-geographie-emc",
              subdomainSlug: "geographie",
              title: "Localiser un lieu à différentes échelles",
              officialReference: "Cycle 3 — Nommer et localiser les grands repères géographiques",
              observableObjective:
                "L'élève situe un lieu dans un espace proche, en France, en Europe ou dans le monde selon l'échelle demandée.",
              successCriteria: [
                "Je nomme l'échelle utilisée.",
                "Je situe le lieu du plus proche au plus vaste.",
                "J'utilise un repère géographique adapté.",
              ],
              status: "in-progress",
            },
            {
              id: "6e-hgemc-geo-document-entry",
              levelSlug: "6e",
              subject: "Histoire-Géographie-EMC",
              domainSlug: "histoire-geographie-emc",
              subdomainSlug: "geographie",
              title: "Prélever des informations dans un document géographique",
              officialReference: "Cycle 3 — Comprendre un document",
              observableObjective:
                "L'élève extrait une information utile d'une carte, d'une photographie, d'un graphique ou d'un court texte géographique.",
              successCriteria: [
                "Je repère la nature du document.",
                "Je relève l'information qui répond à la question.",
                "Je justifie ma réponse avec un élément du document.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-hgemc-geo-espace-habite-entry",
              levelSlug: "6e",
              subject: "Histoire-Géographie-EMC",
              domainSlug: "histoire-geographie-emc",
              subdomainSlug: "geographie",
              title: "Expliquer l'organisation d'un espace habité",
              officialReference: "Cycle 3 — Habiter un espace",
              observableObjective:
                "L'élève explique en quelques phrases comment un espace est organisé pour répondre aux besoins des habitants.",
              successCriteria: [
                "Je repère les lieux d'habitation, de circulation et d'activité.",
                "Je relie l'organisation de l'espace aux besoins des habitants.",
                "J'utilise un vocabulaire géographique précis.",
              ],
              status: "upcoming",
            },
            {
              id: "6e-hgemc-geo-croquis-entry",
              levelSlug: "6e",
              subject: "Histoire-Géographie-EMC",
              domainSlug: "histoire-geographie-emc",
              subdomainSlug: "geographie",
              title: "Réaliser un croquis simple d'un espace",
              officialReference: "Cycle 3 — Pratiquer différents langages",
              observableObjective:
                "L'élève réalise un croquis schématique d'un espace étudié en utilisant des figurés simples, une légende et un titre.",
              successCriteria: [
                "Mon croquis a un titre et une légende.",
                "J'utilise des figurés simples cohérents avec la légende.",
                "Mon croquis permet de comprendre l'organisation de l'espace.",
              ],
              status: "upcoming",
            },
          ],
        },
        {
          subdomainSlug: "emc",
          label: "EMC",
          entries: [],
        },
        {
          subdomainSlug: "methodes-et-reperes",
          label: "Méthodes et repères",
          entries: [],
        },
      ],
    },
  ],
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const sixiemeSubdomainCardsBySubject: Record<string, CollegeSubdomainCard[]> = {
  francais: sixiemeFrancaisSubdomains,
  mathematiques: sixiemeMathematiquesSubdomains,
  "histoire-geographie-emc": sixiemeHistoireGeographieEmcSubdomains,
};

export function getSixiemeDomainEntries(
  domainSlug: string,
  subdomainSlug: string,
) {
  const domain = sixiemeCurriculumLevelMap.domains.find(
    (d) => d.domainSlug === domainSlug,
  );
  const subdomain = domain?.subdomains.find(
    (s) => s.subdomainSlug === subdomainSlug,
  );
  return subdomain?.entries ?? [];
}

export function getSixiemeDomainStatus(
  domainSlug: string,
  subdomainSlug: string,
): ProgramStatus {
  const status = sixiemeSubdomainCardsBySubject[domainSlug]?.find(
    (subdomain) => subdomain.subdomainSlug === subdomainSlug,
  )?.status;

  if (!status) {
    throw new Error(
      `Statut de domaine 6e introuvable pour ${domainSlug}/${subdomainSlug}.`,
    );
  }

  return status;
}
