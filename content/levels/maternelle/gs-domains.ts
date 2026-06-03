import type { MaternelleDomainEntry } from "@/content/levels/maternelle/types";
import { maternelleCommonResourceSlots as commonResourceSlots } from "@/content/levels/maternelle/common-resource-slots";
import { gsLangageSubdomains } from "@/content/levels/maternelle/gs-langage-subdomains";
import { gsActivitePhysiqueSubdomains } from "@/content/levels/maternelle/gs-activite-physique-subdomains";
import { gsPremiersOutilsMathematiquesSubdomains } from "@/content/levels/maternelle/gs-premiers-outils-mathematiques-subdomains";
import { gsExplorerLeMondeSubdomains } from "@/content/levels/maternelle/gs-explorer-le-monde-subdomains";
import { gsActivitesArtistiquesSubdomains } from "@/content/levels/maternelle/gs-activites-artistiques-subdomains";

export const gsDomains: MaternelleDomainEntry[] = [
  {
    id: "gs-langage",
    slug: "langage",
    label: "Mobiliser le langage dans toutes ses dimensions",
    shortLabel: "Langage",
    levelSlug: "gs",
    officialReference:
      "Cycle 1 - Domaine 1 : Mobiliser le langage dans toutes ses dimensions",
    description: "Oral, écoute, phonologie et premières traces d'écrit.",
    href: "/maternelle/gs/domaines/langage",
    status: "in-progress",
    subdomains: gsLangageSubdomains,
    observables: [
      {
        id: "gs-langage-raconter",
        title: "Raconter un événement vécu",
        status: "in-progress",
      },
      {
        id: "gs-langage-consigne",
        title: "Comprendre une consigne collective",
        status: "in-progress",
      },
      {
        id: "gs-langage-sons",
        title: "Identifier des sons dans les mots",
        status: "upcoming",
      },
      {
        id: "gs-langage-lettres",
        title: "Reconnaître quelques lettres",
        status: "upcoming",
      },
    ],
    situations: [
      { label: "Regroupement oral" },
      { label: "Lecture d'album" },
      { label: "Jeux de syllabes et de sons" },
    ],
    traces: [
      { label: "Grille d'observation orale" },
      { label: "Carnet de langage" },
      { label: "Mots repères de la classe" },
    ],
    resourceSlots: commonResourceSlots,
  },
  {
    id: "gs-activite-physique",
    slug: "activite-physique",
    label: "Agir, s'exprimer, comprendre à travers l'activité physique",
    shortLabel: "Activité physique",
    levelSlug: "gs",
    officialReference:
      "Cycle 1 - Domaine 2 : Agir, s'exprimer, comprendre à travers l'activité physique",
    description: "Jeux, déplacements, coopération et règles simples.",
    href: "/maternelle/gs/domaines/activite-physique",
    status: "in-progress",
    subdomains: gsActivitePhysiqueSubdomains,
    observables: [
      {
        id: "gs-physique-cooperer",
        title: "Coopérer dans un jeu collectif",
        status: "upcoming",
      },
      {
        id: "gs-physique-deplacement",
        title: "Ajuster son déplacement",
        status: "upcoming",
      },
      {
        id: "gs-physique-regle",
        title: "Respecter une règle simple",
        status: "upcoming",
      },
    ],
    situations: [
      { label: "Jeu collectif court" },
      { label: "Parcours moteur" },
      { label: "Atelier d'équilibre" },
    ],
    traces: [
      { label: "Repères d'observation motrice" },
      { label: "Photo d'atelier" },
    ],
    resourceSlots: commonResourceSlots,
  },
  {
    id: "gs-activites-artistiques",
    slug: "activites-artistiques",
    label: "Agir, s'exprimer, comprendre à travers les activités artistiques",
    shortLabel: "Activités artistiques",
    levelSlug: "gs",
    officialReference:
      "Cycle 1 - Domaine 3 : Agir, s'exprimer, comprendre à travers les activités artistiques",
    description: "Productions, voix, écoute et regard sur les réalisations.",
    href: "/maternelle/gs/domaines/activites-artistiques",
    status: "in-progress",
    subdomains: gsActivitesArtistiquesSubdomains,
    observables: [
      {
        id: "gs-artistique-trace",
        title: "Produire une trace avec une intention",
        status: "upcoming",
      },
      {
        id: "gs-artistique-chanter",
        title: "Chanter avec le groupe",
        status: "upcoming",
      },
      {
        id: "gs-artistique-decrire",
        title: "Décrire une production",
        status: "upcoming",
      },
    ],
    situations: [
      { label: "Atelier de production plastique" },
      { label: "Chant collectif" },
      { label: "Observation d'oeuvres" },
    ],
    traces: [
      { label: "Production datée" },
      { label: "Répertoire de chants" },
    ],
    resourceSlots: commonResourceSlots,
  },
  {
    id: "gs-premiers-outils-mathematiques",
    slug: "premiers-outils-mathematiques",
    label: "Acquérir les premiers outils mathématiques",
    shortLabel: "Premiers outils mathématiques",
    levelSlug: "gs",
    officialReference:
      "Cycle 1 - Domaine 4 : Acquérir les premiers outils mathématiques",
    description: "Nombres, quantités, formes et suites organisées.",
    href: "/maternelle/gs/domaines/premiers-outils-mathematiques",
    status: "in-progress",
    subdomains: gsPremiersOutilsMathematiquesSubdomains,
    observables: [
      {
        id: "gs-maths-denombrer",
        title: "Dénombrer une collection",
        status: "upcoming",
      },
      {
        id: "gs-maths-comparer",
        title: "Comparer des quantités",
        status: "upcoming",
      },
      {
        id: "gs-maths-formes",
        title: "Reconnaître des formes simples",
        status: "upcoming",
      },
      {
        id: "gs-maths-suite",
        title: "Se repérer dans une suite organisée",
        status: "upcoming",
      },
    ],
    situations: [
      { label: "Atelier de dénombrement" },
      { label: "Jeu de comparaison" },
      { label: "Tri de formes" },
    ],
    traces: [
      { label: "Grille de repères numériques" },
      { label: "Photo de collection organisée" },
    ],
    resourceSlots: commonResourceSlots,
  },
  {
    id: "gs-explorer-le-monde",
    slug: "explorer-le-monde",
    label: "Explorer le monde",
    shortLabel: "Explorer le monde",
    levelSlug: "gs",
    officialReference: "Cycle 1 - Domaine 5 : Explorer le monde",
    description: "Temps, vivant, objets, matières et premiers repères.",
    href: "/maternelle/gs/domaines/explorer-le-monde",
    status: "in-progress",
    subdomains: gsExplorerLeMondeSubdomains,
    observables: [
      {
        id: "gs-monde-journee",
        title: "Se repérer dans la journée",
        status: "upcoming",
      },
      {
        id: "gs-monde-vivant",
        title: "Observer un être vivant",
        status: "upcoming",
      },
      {
        id: "gs-monde-objet",
        title: "Décrire un objet ou une matière",
        status: "upcoming",
      },
      {
        id: "gs-monde-temps",
        title: "Situer un événement dans le temps",
        status: "upcoming",
      },
    ],
    situations: [
      { label: "Rituel de la journée" },
      { label: "Observation du vivant" },
      { label: "Manipulation d'objets et matières" },
    ],
    traces: [
      { label: "Frise de la journée" },
      { label: "Carnet d'observation" },
    ],
    resourceSlots: commonResourceSlots,
  },
];

export function getGsDomainBySlug(
  slug: string,
): MaternelleDomainEntry | undefined {
  return gsDomains.find((domain) => domain.slug === slug);
}
