/**
 * GS · Domaine Langage · Sous-domaines structurés
 *
 * Intégration Mission K — réutilise le composant MaternelleSubdomainList.
 * Contient 3 sous-domaines, chacun avec 1 séquence légère et 1 atelier minimal.
 *
 * Règle centrale : Le site organise. Les PDF enseignent.
 * Aucun contenu pédagogique complet — titres, objectifs et structure seulement.
 */
import type { MaternelleSubdomain } from "@/content/levels/maternelle/types";

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
        title: "Raconter un événement vécu",
        levelSlug: "gs",
        domainSlug: "langage",
        subdomainSlug: "langage-oral",
        description:
          "Séquence centrée sur la production d'un récit oral organisé à partir d'un événement vécu.",
        objective: "Amener l'élève à produire un récit oral structuré sur un événement vécu.",
        objectives: ["Maintenir le fil d'un récit sur plusieurs phrases"],
        periodLabel: "Période 2",
        estimatedDuration: "4 séances × 25 min",
        sessionCount: 4,
        observableSkills: ["Raconte un événement vécu en 4 phrases cohérentes."],
        observationFocus:
          "Observer si l'élève maintient la cohérence du récit sans relance. Repérer les connecteurs spontanément produits.",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "gs-langage-oral-seq1-atelier1",
            slug: "le-journal-du-matin",
            title: "Le journal du matin",
            type: "dirige",
            objective:
              "Raconter à un petit groupe un événement vécu la veille en répondant aux questions : qui, quoi, quand, comment.",
            duration: "20 min",
            groupSize: "4 élèves",
            materials: [
              "Cartes questions illustrées (Qui ? Quoi ? Quand ? Comment ?)",
              "Jetons de parole",
            ],
            instruction:
              "Raconte quelque chose que tu as fait hier. Tes camarades vont te poser des questions.",
            expectedAction:
              "L'élève produit un récit d'au moins 3 phrases et répond à au moins 2 questions.",
            differentiation:
              "Allègement : l'enseignant pose lui-même les questions. Renforcement : l'élève pose les questions à son tour.",
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
            resources: [],
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
        title: "Identifier le son initial",
        levelSlug: "gs",
        domainSlug: "langage",
        subdomainSlug: "phonologie",
        description:
          "Séquence axée sur la discrimination auditive fine et la segmentation syllabique.",
        objective: "Identifier le son initial dans des mots courants.",
        objectives: ["Identifier le son initial d'un mot"],
        periodLabel: "Période 3",
        estimatedDuration: "5 séances × 20 min",
        sessionCount: 5,
        observableSkills: ["Identifie le son initial d'un mot donné."],
        observationFocus:
          "Observer si l'élève confond syllabe et phonème. Distinguer l'identification du son initial de la nomination de la lettre.",
        status: "in-progress",
        resources: [],
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
            instruction:
              "Dis le nom de l'image tout bas. Écoute bien le premier son. Place la carte dans la bonne colonne.",
            expectedAction:
              "L'élève nomme l'image, identifie le son initial et place la carte correctement dans au moins 3 cas sur 4.",
            differentiation:
              "Allègement : ne trier que des images dont le son initial est très contrasté. Renforcement : nommer d'autres mots commençant par ce son.",
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
            resources: [],
          },
        ],
      },
    ],
  },

  // ── 3. Premiers écrits ────────────────────────────────────────────────────
  {
    id: "gs-langage-premiers-ecrits",
    slug: "premiers-ecrits",
    label: "Premiers écrits",
    description:
      "Lettres, mots repères, premières tentatives d'écriture autonome. Entrée dans la culture de l'écrit.",
    status: "in-progress",
    sequences: [
      {
        id: "gs-langage-premiers-ecrits-seq1",
        slug: "ecrire-son-prenom",
        title: "Écrire son prénom",
        levelSlug: "gs",
        domainSlug: "langage",
        subdomainSlug: "premiers-ecrits",
        description:
          "Séquence autour du prénom comme modèle stable d'entrée dans l'écrit.",
        objective: "Écrire son prénom en capitales d'imprimerie de manière lisible.",
        objectives: ["Tracer les lettres de son prénom dans le bon ordre"],
        periodLabel: "Période 1–2",
        estimatedDuration: "5 séances × 15 min",
        sessionCount: 5,
        observableSkills: ["Écrit son prénom lisiblement en capitales."],
        observationFocus:
          "Observer la direction du tracé, la tenue de l'outil et l'organisation gauche-droite. Ne pas évaluer la vitesse.",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "gs-langage-premiers-ecrits-seq1-atelier1",
            slug: "modele-prenom",
            title: "Modèle prénom",
            type: "manipulation",
            objective: "Copier son prénom à partir d'un modèle stable.",
            duration: "15 min",
            groupSize: "4-6 élèves",
            materials: [
              "Étiquettes-prénoms en capitales",
              "Ardoises",
              "Feutres effaçables",
            ],
            instruction: "Regarde ton modèle et écris ton prénom sur l'ardoise.",
            expectedAction:
              "L'élève copie son prénom en respectant l'ordre des lettres.",
            differentiation:
              "Allègement : modèle placé juste au-dessus de la zone d'écriture. Renforcement : modèle éloigné puis masqué en fin d'essai.",
            status: "in-progress",
            observationGrid: {
              id: "gs-langage-premiers-ecrits-seq1-atelier1-grille",
              title: "Grille — Écrire son prénom",
              teacherUse:
                "Observer la stratégie de copie du prénom : l'élève regarde-t-il lettre par lettre ou par groupe ?",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-ecrit-1",
                  label: "Copie les lettres de son prénom dans l'ordre",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-ecrit-2",
                  label: "Respecte la forme globale des lettres capitales",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-ecrit-3",
                  label: "Écrit son prénom sans modèle sous les yeux",
                  levelDescriptor: "Dépassement GS",
                },
              ],
            },
            resources: [],
          },
        ],
      },
    ],
  },
];
