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
        slug: "raconter-et-expliquer",
        title: "Raconter et expliquer",
        levelSlug: "gs",
        domainSlug: "langage",
        subdomainSlug: "langage-oral",
        description:
          "Séquence centrée sur la production de récits organisés et l'explication d'une démarche simple.",
        objective:
          "Amener l'élève à produire un récit oral structuré et à expliquer une action en plusieurs étapes.",
        objectives: [
          "Utiliser des connecteurs temporels et logiques (d'abord, ensuite, parce que)",
          "Maintenir le fil d'un récit sur plusieurs phrases",
          "Répondre aux questions d'un auditoire",
        ],
        periodLabel: "Période 2",
        estimatedDuration: "4 séances × 25 min",
        sessionCount: 4,
        observableSkills: [
          "Raconte un événement vécu en 4 phrases minimum",
          "Utilise au moins un connecteur logique",
          "Reformule la question de l'enseignant",
        ],
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
        slug: "identifier-les-sons-dans-les-mots",
        title: "Identifier les sons dans les mots",
        levelSlug: "gs",
        domainSlug: "langage",
        subdomainSlug: "phonologie",
        description:
          "Séquence axée sur la discrimination auditive fine et la segmentation syllabique.",
        objective:
          "Identifier et manipuler les syllabes et les phonèmes dans des mots courants.",
        objectives: [
          "Segmenter un mot en syllabes oralement",
          "Identifier le son initial d'un mot",
          "Trouver des mots commençant par le même son",
        ],
        periodLabel: "Période 3",
        estimatedDuration: "5 séances × 20 min",
        sessionCount: 5,
        observableSkills: [
          "Frappe les syllabes d'un mot de 2 ou 3 syllabes",
          "Identifie le son initial d'un mot donné",
          "Produit un mot commençant par un son donné",
        ],
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
        slug: "ecrire-son-prenom-et-des-mots-reperes",
        title: "Écrire son prénom et des mots repères",
        levelSlug: "gs",
        domainSlug: "langage",
        subdomainSlug: "premiers-ecrits",
        description:
          "Séquence autour du prénom et des premiers mots de la classe comme modèles d'écriture.",
        objective:
          "Écrire son prénom en capitales d'imprimerie de manière lisible et reconnaître quelques mots de la classe.",
        objectives: [
          "Tracer les lettres de son prénom dans le bon ordre",
          "Reconnaître son prénom parmi d'autres",
          "Copier un mot repère de la classe (ex : CHAT, LION)",
        ],
        periodLabel: "Période 1–2",
        estimatedDuration: "5 séances × 15 min",
        sessionCount: 5,
        observableSkills: [
          "Écrit son prénom lisiblement en capitales",
          "Reconnaît et copie un mot repère de la classe",
          "Nomme 3 lettres de l'alphabet",
        ],
        observationFocus:
          "Observer la direction du tracé, la tenue de l'outil et l'organisation gauche-droite. Ne pas évaluer la vitesse.",
        status: "in-progress",
        resources: [],
        workshops: [
          {
            id: "gs-langage-premiers-ecrits-seq1-atelier1",
            slug: "la-boite-aux-mots",
            title: "La boîte aux mots",
            type: "manipulation",
            objective:
              "Associer une image à son mot écrit, puis copier le mot sur son ardoise.",
            duration: "15 min",
            groupSize: "4-6 élèves",
            materials: [
              "Boîte avec cartes image-mot (10 paires)",
              "Ardoises",
              "Feutres effaçables",
            ],
            instruction:
              "Prends une carte image. Trouve la carte avec le mot. Puis copie le mot sur ton ardoise.",
            expectedAction:
              "L'élève associe correctement image et mot, puis copie le mot en respectant la forme des lettres.",
            differentiation:
              "Allègement : mots de 3 lettres seulement. Renforcement : l'élève écrit le mot de mémoire sans la carte modèle.",
            status: "in-progress",
            observationGrid: {
              id: "gs-langage-premiers-ecrits-seq1-atelier1-grille",
              title: "Grille — Copier un mot repère",
              teacherUse:
                "Observer la stratégie de copie : l'élève regarde-t-il lettre par lettre ou par groupe ?",
              status: "upcoming",
              criteria: [
                {
                  id: "crit-gs-ecrit-1",
                  label: "Associe correctement l'image à son mot écrit",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-ecrit-2",
                  label: "Copie le mot avec toutes les lettres dans le bon ordre",
                  levelDescriptor: "Attendu GS",
                },
                {
                  id: "crit-gs-ecrit-3",
                  label: "Écrit le mot de mémoire sans modèle sous les yeux",
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
