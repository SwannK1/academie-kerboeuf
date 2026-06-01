// Carte du programme CM2 — Cycle 3, primaire.
// Le site organise ; les PDF enseignent.
// Aucun contenu pédagogique complet : uniquement objectifs observables,
// critères courts et ressources PDF prévues sans href.

import type { CurriculumLevelMap } from "@/content/curriculum-map-types";
import type { ResourceSlot } from "@/content/learning-architecture-types";

const PLANNED_PDF_RESOURCES: ResourceSlot[] = [
  {
    kind: "lesson-pdf",
    label: "Leçon PDF",
    resource: { kind: "lesson-pdf", label: "Leçon PDF", status: "planned" },
  },
  {
    kind: "exercises-pdf",
    label: "Exercices PDF",
    resource: {
      kind: "exercises-pdf",
      label: "Exercices PDF",
      status: "planned",
    },
  },
  {
    kind: "correction-pdf",
    label: "Correction PDF",
    resource: {
      kind: "correction-pdf",
      label: "Correction PDF",
      status: "planned",
    },
  },
  {
    kind: "assessment-pdf",
    label: "Évaluation PDF",
    resource: {
      kind: "assessment-pdf",
      label: "Évaluation PDF",
      status: "planned",
    },
  },
  {
    kind: "projectable-pdf",
    label: "Support projetable",
    resource: {
      kind: "projectable-pdf",
      label: "Support projetable",
      status: "planned",
    },
  },
];

export const cm2CurriculumLevelMap: CurriculumLevelMap = {
  levelSlug: "cm2",
  domains: [
    {
      domainSlug: "francais",
      subject: "Français",
      label: "Français",
      subdomains: [
        {
          subdomainSlug: "etude-de-la-langue",
          label: "Étude de la langue",
          entries: [
            {
              id: "cm2-fr-edl-passe-simple-entry",
              levelSlug: "cm2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Passé simple — formes et emploi",
              officialReference: "Cycle 3 — Étude de la langue",
              observableObjective:
                "L'élève reconnaît et conjugue les verbes du 1er, 2e et 3e groupe au passé simple.",
              successCriteria: [
                "Je reconnais le passé simple dans un texte narratif.",
                "Je conjugue un verbe du 1er groupe au passé simple.",
                "Je conjugue un verbe du 3e groupe courant (être, avoir, venir) au passé simple.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-fr-edl-passe-simple",
            },
            {
              id: "cm2-fr-edl-accord-participe-entry",
              levelSlug: "cm2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Accord du participe passé avec être et avoir",
              officialReference: "Cycle 3 — Étude de la langue",
              observableObjective:
                "L'élève accorde le participe passé avec l'auxiliaire être ou n'accorde pas avec avoir selon la règle de base.",
              successCriteria: [
                "Je distingue les auxiliaires être et avoir.",
                "J'accorde le participe passé avec le sujet quand l'auxiliaire est être.",
                "Je n'accorde pas le participe passé avec avoir (cas de base, sans COD antéposé).",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-fr-edl-accord-participe",
            },
            {
              id: "cm2-fr-edl-nature-fonction-entry",
              levelSlug: "cm2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "etude-de-la-langue",
              title: "Nature et fonction : GN, COD, COI",
              officialReference: "Cycle 3 — Étude de la langue",
              observableObjective:
                "L'élève identifie la nature (GN) et la fonction (COD, COI) d'un groupe nominal dans la phrase.",
              successCriteria: [
                "Je repère un groupe nominal dans une phrase.",
                "Je distingue le COD du COI à l'aide des questions (quoi ? / à qui ?).",
                "Je justifie la fonction en posant la question appropriée.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-fr-edl-nature-fonction",
            },
          ],
        },
        {
          subdomainSlug: "lecture-comprehension",
          label: "Lecture et compréhension",
          entries: [
            {
              id: "cm2-fr-lc-implicite-entry",
              levelSlug: "cm2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "lecture-comprehension",
              title: "Comprendre l'implicite et les sous-entendus",
              officialReference: "Cycle 3 — Lecture et compréhension de l'écrit",
              observableObjective:
                "L'élève interprète ce qu'un texte laisse entendre sans le dire et justifie avec des indices précis.",
              successCriteria: [
                "Je repère une information non dite dans le texte.",
                "Je cite les indices qui me permettent de l'inférer.",
                "Je formule le sous-entendu en une phrase justifiée.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-fr-lc-implicite",
            },
          ],
        },
        {
          subdomainSlug: "ecriture",
          label: "Écriture",
          entries: [
            {
              id: "cm2-fr-ec-texte-argumentatif-entry",
              levelSlug: "cm2",
              subject: "Français",
              domainSlug: "francais",
              subdomainSlug: "ecriture",
              title: "Rédiger un texte argumentatif court",
              officialReference: "Cycle 3 — Écriture",
              observableObjective:
                "L'élève rédige un texte court qui défend un point de vue avec au moins deux arguments illustrés d'exemples.",
              successCriteria: [
                "J'annonce clairement mon point de vue.",
                "Je donne au moins deux arguments distincts.",
                "J'illustre chaque argument par un exemple.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-fr-ec-texte-argumentatif",
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
          subdomainSlug: "numeration",
          label: "Numération",
          entries: [
            {
              id: "cm2-ma-num-decimaux-entry",
              levelSlug: "cm2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "numeration",
              title: "Nombres décimaux — lire, écrire, comparer",
              officialReference: "Cycle 3 — Nombres et calculs",
              observableObjective:
                "L'élève lit, écrit et compare des nombres décimaux en s'appuyant sur la valeur positionnelle des chiffres.",
              successCriteria: [
                "Je lis un nombre décimal et je nomme chaque chiffre par sa position.",
                "J'écris en chiffres un nombre décimal dicté à l'oral.",
                "Je compare deux nombres décimaux et je justifie.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-ma-num-decimaux",
            },
            {
              id: "cm2-ma-num-fractions-decimaux-entry",
              levelSlug: "cm2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "numeration",
              title: "Fractions et décimaux — équivalences",
              officialReference: "Cycle 3 — Nombres et calculs",
              observableObjective:
                "L'élève passe d'une fraction simple à l'écriture décimale et inversement.",
              successCriteria: [
                "Je convertis une fraction à dénominateur 10 ou 100 en décimal.",
                "J'écris un décimal simple sous forme de fraction.",
                "Je place une fraction ou un décimal sur une droite graduée.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-ma-num-fractions-decimaux",
            },
          ],
        },
        {
          subdomainSlug: "calcul-pose",
          label: "Calcul posé",
          entries: [
            {
              id: "cm2-ma-cal-operations-decimaux-entry",
              levelSlug: "cm2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "calcul-pose",
              title: "Opérations sur les décimaux",
              officialReference: "Cycle 3 — Nombres et calculs",
              observableObjective:
                "L'élève pose et calcule des additions, soustractions et multiplications impliquant des nombres décimaux.",
              successCriteria: [
                "J'aligne les virgules lors de la pose de l'opération.",
                "Je calcule une addition ou soustraction de décimaux posée.",
                "Je pose et calcule une multiplication par un entier avec un résultat décimal.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-ma-cal-operations-decimaux",
            },
          ],
        },
        {
          subdomainSlug: "grandeurs-mesures",
          label: "Grandeurs et mesures",
          entries: [
            {
              id: "cm2-ma-gm-aires-entry",
              levelSlug: "cm2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "grandeurs-mesures",
              title: "Aire du rectangle et du triangle",
              officialReference: "Cycle 3 — Grandeurs et mesures",
              observableObjective:
                "L'élève calcule l'aire d'un rectangle et d'un triangle en appliquant les formules.",
              successCriteria: [
                "J'identifie la base et la hauteur d'un rectangle ou d'un triangle.",
                "J'applique la formule de l'aire du rectangle (L × l).",
                "J'applique la formule de l'aire du triangle (base × hauteur ÷ 2).",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-ma-gm-aires",
            },
          ],
        },
        {
          subdomainSlug: "geometrie",
          label: "Géométrie",
          entries: [
            {
              id: "cm2-ma-geo-symetrie-axiale-entry",
              levelSlug: "cm2",
              subject: "Mathématiques",
              domainSlug: "mathematiques",
              subdomainSlug: "geometrie",
              title: "Symétrie axiale",
              officialReference: "Cycle 3 — Espace et géométrie",
              observableObjective:
                "L'élève reconnaît et construit le symétrique d'une figure par rapport à un axe.",
              successCriteria: [
                "Je reconnais si une figure est symétrique par rapport à un axe donné.",
                "Je construis le symétrique d'un point par rapport à un axe.",
                "Je trace le symétrique d'une figure simple à l'aide de la règle et de l'équerre.",
              ],
              status: "upcoming",
              resourceSlots: PLANNED_PDF_RESOURCES,
              competencyId: "cm2-ma-geo-symetrie-axiale",
            },
          ],
        },
      ],
    },
  ],
};
