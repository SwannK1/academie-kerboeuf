/**
 * GS · Domaine Langage · Sous-domaines structurés
 *
 * Intégration Mission K — réutilise le composant MaternelleSubdomainList.
 * Contient 3 sous-domaines, chacun avec 1 séquence-compétence légère
 * et 1 atelier minimal.
 *
 * Règle centrale : Le site organise. Les PDF enseignent.
 * Aucun contenu pédagogique complet — titres, objectifs et structure seulement.
 */
import type {
  MaternelleResourceRef,
  MaternelleSubdomain,
} from "@/content/levels/maternelle/types";

const gsLanguageSequenceResources: MaternelleResourceRef[] = [
  {
    kind: "grille-observation",
    label: "Grille d'observation de la compétence",
    status: "upcoming",
  },
  {
    kind: "fiche-atelier",
    label: "Fiche atelier",
    status: "upcoming",
  },
  {
    kind: "fiche-parent",
    label: "Repère famille",
    status: "upcoming",
  },
];

export const gsLangageSubdomains: MaternelleSubdomain[] = [
  // ── 1. Langage oral ────────────────────────────────────────────────────────
  {
    id: "gs-langage-oral",
    slug: "langage-oral",
    label: "Langage oral",
    description:
      "Raconter, décrire, expliquer. Récits construits, consignes complexes et premiers débats guidés.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-langage-oral-seq1",
        slug: "raconter-un-evenement-vecu",
        title: "Raconter un événement vécu avec précision",
        levelSlug: "gs",
        domainSlug: "langage",
        subdomainSlug: "langage-oral",
        description:
          "Séquence-compétence centrée sur un récit oral organisé et compréhensible.",
        objective:
          "Raconter un événement vécu en enchaînant plusieurs phrases compréhensibles.",
        periodLabel: "Période 2",
        estimatedDuration: "4 séances × 25 min",
        sessionCount: 4,
        observableSkills: [
          "Raconte un événement vécu en plusieurs phrases",
          "Situe les personnes, les actions et le moment",
          "Répond à une question de précision",
        ],
        observationFocus:
          "Observer si l'élève maintient le fil du récit et ajoute une précision sur sollicitation.",
        status: "in-progress",
        resources: gsLanguageSequenceResources,
        workshops: [
          {
            id: "gs-langage-oral-seq1-atelier1",
            slug: "le-journal-du-matin",
            title: "Le journal du matin",
            type: "dirige",
            objective:
              "Raconter à un petit groupe un événement vécu récent.",
            duration: "20 min",
            groupSize: "4 élèves",
            materials: [
              "Cartes questions illustrées (Qui ? Quoi ? Quand ? Comment ?)",
              "Jetons de parole",
            ],
            status: "in-progress",
            observationGrid: {
              id: "gs-langage-oral-seq1-atelier1-grille",
              title: "Grille — Raconter et expliquer (GS)",
              teacherUse:
                "Cocher pendant la prise de parole. Un seul critère suffit pour valider la compétence de base.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-oral-1",
                  label: "Produit un récit d'au moins 3 phrases cohérentes",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-oral-2",
                  label: "Utilise un connecteur temporel ou logique spontanément",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-oral-3",
                  label: "Répond aux questions sans aide et développe sa réponse",
                  levelDescriptor: "Dépassement GS",
                },
              ],
            },
            resources: gsLanguageSequenceResources,
          },
        ],
      },
    ],
  },

  // ── 2. Phonologie ─────────────────────────────────────────────────────────
  {
    id: "gs-langage-phonologie",
    slug: "phonologie",
    label: "Phonologie",
    description:
      "Syllabes, sons et phonèmes. Segmentation, identification et manipulation des unités sonores de la langue.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-langage-phonologie-seq1",
        slug: "identifier-le-son-initial",
        title: "Identifier le son initial d'un mot",
        levelSlug: "gs",
        domainSlug: "langage",
        subdomainSlug: "phonologie",
        description:
          "Séquence-compétence centrée sur l'écoute du premier son dans des mots familiers.",
        objective: "Identifier le son initial d'un mot courant à l'oral.",
        periodLabel: "Période 3",
        estimatedDuration: "5 séances × 20 min",
        sessionCount: 5,
        observableSkills: [
          "Identifie le son initial d'un mot donné",
          "Trie des images selon leur son initial",
          "Produit un autre mot commençant par le même son",
        ],
        observationFocus:
          "Distinguer l'écoute du son initial de la nomination d'une lettre.",
        status: "in-progress",
        resources: gsLanguageSequenceResources,
        workshops: [
          {
            id: "gs-langage-phonologie-seq1-atelier1",
            slug: "le-jeu-du-son-commun",
            title: "Le jeu du son commun",
            type: "manipulation",
            objective:
              "Trier des images selon le son initial du mot qu'elles représentent.",
            duration: "20 min",
            groupSize: "4-5 élèves",
            materials: [
              "Images d'objets courants (12 à 16 cartes)",
              "Plateau de tri avec 2 colonnes",
              "Étiquettes sons (ex : [s] et [m])",
            ],
            status: "in-progress",
            observationGrid: {
              id: "gs-langage-phonologie-seq1-atelier1-grille",
              title: "Grille — Identification du son initial",
              teacherUse:
                "Observer sans intervenir pendant le tri. Noter les hésitations et les auto-corrections.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-phono-1",
                  label: "Identifie correctement le son initial dans 2 images sur 4",
                  levelDescriptor: "Attendu GS début",
                },
                {
                  id: "crit-gs-phono-2",
                  label: "Identifie correctement le son initial dans 3 images sur 4",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-phono-3",
                  label: "Produit spontanément un mot supplémentaire avec le même son",
                  levelDescriptor: "Dépassement GS",
                },
              ],
            },
            resources: gsLanguageSequenceResources,
          },
        ],
      },
    ],
  },

  // ── 3. Premiers écrits ────────────────────────────────────────────────────
  {
    id: "gs-langage-premiers-ecrits",
    slug: "premiers-ecrits",
    label: "Premiers gestes d'écriture",
    description:
      "Lettres, mots repères et premiers gestes d'écriture. Entrée progressive dans la culture de l'écrit.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-langage-premiers-ecrits-seq1",
        slug: "ecrire-son-prenom-en-capitales",
        title: "Écrire son prénom en capitales",
        levelSlug: "gs",
        domainSlug: "langage",
        subdomainSlug: "premiers-ecrits",
        description:
          "Séquence-compétence autour du prénom comme premier support d'écriture stabilisée.",
        objective:
          "Écrire son prénom en capitales d'imprimerie de manière lisible.",
        periodLabel: "Période 1–2",
        estimatedDuration: "5 séances × 15 min",
        sessionCount: 5,
        observableSkills: [
          "Écrit son prénom lisiblement en capitales",
          "Respecte l'ordre des lettres de son prénom",
          "Adapte la tenue de l'outil et l'espace d'écriture",
        ],
        observationFocus:
          "Observer la direction du tracé, la tenue de l'outil et l'organisation gauche-droite. Ne pas évaluer la vitesse.",
        status: "in-progress",
        resources: gsLanguageSequenceResources,
        workshops: [
          {
            id: "gs-langage-premiers-ecrits-seq1-atelier1",
            slug: "atelier-prenom",
            title: "Atelier prénom",
            type: "manipulation",
            objective: "Copier son prénom à partir d'un modèle stable.",
            duration: "15 min",
            groupSize: "4-6 élèves",
            materials: [
              "Étiquettes-prénoms",
              "Ardoises",
              "Feutres effaçables",
            ],
            status: "in-progress",
            observationGrid: {
              id: "gs-langage-premiers-ecrits-seq1-atelier1-grille",
              title: "Grille — Écrire son prénom en capitales",
              teacherUse:
                "Observer la tenue de l'outil, l'ordre des lettres et la lisibilité globale.",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-ecrit-1",
                  label: "Trace toutes les lettres de son prénom",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-ecrit-2",
                  label: "Respecte l'ordre des lettres",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-ecrit-3",
                  label: "Écrit son prénom sans modèle immédiat",
                  levelDescriptor: "Dépassement GS",
                },
              ],
            },
            resources: gsLanguageSequenceResources,
          },
        ],
      },
    ],
  },
];
