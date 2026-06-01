import type { MaternelleDomainEntry } from "@/content/levels/maternelle/types";
import { psActivitePhysiqueSubdomains } from "@/content/levels/maternelle/ps-activite-physique-subdomains";
import { psPremiersOutilsMathematiquesSubdomains } from "@/content/levels/maternelle/ps-premiers-outils-mathematiques-subdomains";
import { psExplorerLeMondeSubdomains } from "@/content/levels/maternelle/ps-explorer-le-monde-subdomains";
import { psActivitesArtistiquesSubdomains } from "@/content/levels/maternelle/ps-activites-artistiques-subdomains";
import { psLangageSubdomains } from "@/content/levels/maternelle/ps-langage-subdomains";

const psResourceSlots: MaternelleDomainEntry["resourceSlots"] = [
  {
    kind: "grille-observation",
    label: "Grille d'observation",
    status: "upcoming",
  },
  {
    kind: "fiche-atelier",
    label: "Fiche atelier",
    status: "upcoming",
  },
  {
    kind: "fiche-parent",
    label: "Fiche parent",
    status: "upcoming",
  },
];

export const psDomains: MaternelleDomainEntry[] = [
  {
    id: "ps-langage",
    slug: "langage",
    label: "Mobiliser le langage dans toutes ses dimensions",
    shortLabel: "Langage",
    levelSlug: "ps",
    officialReference:
      "Cycle 1 - Domaine 1 : Mobiliser le langage dans toutes ses dimensions",
    description: "Ecoute, premiers mots, consignes simples et échanges courts.",
    href: "/maternelle/ps/domaines/langage",
    status: "in-progress",
    subdomains: psLangageSubdomains,
    observables: [
      {
        id: "ps-langage-histoire",
        title: "Écouter une histoire courte",
        status: "in-progress",
      },
      {
        id: "ps-langage-objet",
        title: "Nommer un objet familier",
        status: "in-progress",
      },
      {
        id: "ps-langage-repondre",
        title: "Répondre par un mot ou une phrase courte",
        status: "in-progress",
      },
      {
        id: "ps-langage-consigne",
        title: "Comprendre une consigne simple",
        status: "in-progress",
      },
    ],
    situations: [
      { label: "Rituel d'accueil" },
      { label: "Lecture très courte" },
      { label: "Jeu de nomination" },
    ],
    traces: [
      { label: "Repères d'écoute" },
      { label: "Photos d'objets nommés" },
    ],
    resourceSlots: psResourceSlots,
  },
  {
    id: "ps-activite-physique",
    slug: "activite-physique",
    label: "Agir, s'exprimer, comprendre à travers l'activité physique",
    shortLabel: "Activité physique",
    levelSlug: "ps",
    officialReference:
      "Cycle 1 - Domaine 2 : Agir, s'exprimer, comprendre à travers l'activité physique",
    description: "Déplacements, jeux simples et premières règles communes.",
    href: "/maternelle/ps/domaines/activite-physique",
    status: "in-progress",
    subdomains: psActivitePhysiqueSubdomains,
    observables: [
      {
        id: "ps-physique-espace",
        title: "Se déplacer dans un espace aménagé",
        status: "in-progress",
      },
      {
        id: "ps-physique-jeu",
        title: "Participer à un jeu simple",
        status: "in-progress",
      },
      {
        id: "ps-physique-materiel",
        title: "Manipuler un petit matériel",
        status: "in-progress",
      },
      {
        id: "ps-physique-regle",
        title: "Accepter une règle courte",
        status: "in-progress",
      },
    ],
    situations: [
      { label: "Parcours aménagé" },
      { label: "Jeu de déplacement" },
      { label: "Atelier avec balles ou cerceaux" },
    ],
    traces: [
      { label: "Repères de participation" },
      { label: "Photo de parcours" },
    ],
    resourceSlots: psResourceSlots,
  },
  {
    id: "ps-activites-artistiques",
    slug: "activites-artistiques",
    label: "Agir, s'exprimer, comprendre à travers les activités artistiques",
    shortLabel: "Activités artistiques",
    levelSlug: "ps",
    officialReference:
      "Cycle 1 - Domaine 3 : Agir, s'exprimer, comprendre à travers les activités artistiques",
    description: "Traces, matières, voix et observation de productions.",
    href: "/maternelle/ps/domaines/activites-artistiques",
    status: "in-progress",
    subdomains: psActivitesArtistiquesSubdomains,
    observables: [
      {
        id: "ps-artistique-trace",
        title: "Laisser une trace avec un outil",
        status: "in-progress",
      },
      {
        id: "ps-artistique-matiere",
        title: "Explorer une matière",
        status: "in-progress",
      },
      {
        id: "ps-artistique-chanter",
        title: "Chanter avec le groupe",
        status: "in-progress",
      },
      {
        id: "ps-artistique-observer",
        title: "Observer une production",
        status: "in-progress",
      },
    ],
    situations: [
      { label: "Atelier trace et outil" },
      { label: "Manipulation de matière" },
      { label: "Comptine collective" },
    ],
    traces: [
      { label: "Production datée" },
      { label: "Photo d'atelier" },
    ],
    resourceSlots: psResourceSlots,
  },
  {
    id: "ps-premiers-outils-mathematiques",
    slug: "premiers-outils-mathematiques",
    label: "Acquérir les premiers outils mathématiques",
    shortLabel: "Premiers outils mathématiques",
    levelSlug: "ps",
    officialReference:
      "Cycle 1 - Domaine 4 : Acquérir les premiers outils mathématiques",
    description: "Petites quantités, tris, associations et formes simples.",
    href: "/maternelle/ps/domaines/premiers-outils-mathematiques",
    status: "in-progress",
    subdomains: psPremiersOutilsMathematiquesSubdomains,
    observables: [
      {
        id: "ps-maths-quantite",
        title: "Reconnaître une petite quantité",
        status: "in-progress",
      },
      {
        id: "ps-maths-trier",
        title: "Trier selon une propriété",
        status: "in-progress",
      },
      {
        id: "ps-maths-associer",
        title: "Associer deux objets identiques",
        status: "in-progress",
      },
      {
        id: "ps-maths-formes",
        title: "Manipuler des formes simples",
        status: "in-progress",
      },
    ],
    situations: [
      { label: "Boîtes de tri" },
      { label: "Jeu d'association" },
      { label: "Manipulation de formes" },
    ],
    traces: [
      { label: "Photo de tri réalisé" },
      { label: "Repères de manipulation" },
    ],
    resourceSlots: psResourceSlots,
  },
  {
    id: "ps-explorer-le-monde",
    slug: "explorer-le-monde",
    label: "Explorer le monde",
    shortLabel: "Explorer le monde",
    levelSlug: "ps",
    officialReference: "Cycle 1 - Domaine 5 : Explorer le monde",
    description: "Journée, lieux de l'école, vivant et objets proches.",
    href: "/maternelle/ps/domaines/explorer-le-monde",
    status: "in-progress",
    subdomains: psExplorerLeMondeSubdomains,
    observables: [
      {
        id: "ps-monde-journee",
        title: "Repérer un moment de la journée",
        status: "in-progress",
      },
      {
        id: "ps-monde-vivant",
        title: "Observer un animal ou une plante",
        status: "in-progress",
      },
      {
        id: "ps-monde-objet",
        title: "Manipuler un objet simple",
        status: "in-progress",
      },
      {
        id: "ps-monde-lieu",
        title: "Identifier un lieu de l'école",
        status: "in-progress",
      },
    ],
    situations: [
      { label: "Rituel du matin" },
      { label: "Visite d'un lieu de l'école" },
      { label: "Observation du vivant" },
    ],
    traces: [
      { label: "Photos des lieux repérés" },
      { label: "Carnet d'observation simple" },
    ],
    resourceSlots: psResourceSlots,
  },
];

export function getPsDomainBySlug(
  slug: string,
): MaternelleDomainEntry | undefined {
  return psDomains.find((domain) => domain.slug === slug);
}
