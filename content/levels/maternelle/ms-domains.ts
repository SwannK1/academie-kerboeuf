import type { MaternelleDomainEntry } from "@/content/levels/maternelle/types";
import { maternelleCommonResourceSlots as commonResourceSlots } from "@/content/levels/maternelle/common-resource-slots";
import { msActivitePhysiqueSubdomains } from "@/content/levels/maternelle/ms-activite-physique-subdomains";
import { msPremiersOutilsMathematiquesSubdomains } from "@/content/levels/maternelle/ms-premiers-outils-mathematiques-subdomains";
import { msExplorerLeMondeSubdomains } from "@/content/levels/maternelle/ms-explorer-le-monde-subdomains";
import { msActivitesArtistiquesSubdomains } from "@/content/levels/maternelle/ms-activites-artistiques-subdomains";
import { msLangageSubdomains } from "@/content/levels/maternelle/ms-langage-subdomains";

export const msDomains: MaternelleDomainEntry[] = [
  {
    id: "ms-langage",
    slug: "langage",
    label: "Mobiliser le langage dans toutes ses dimensions",
    shortLabel: "Langage",
    levelSlug: "ms",
    officialReference:
      "Cycle 1 - Domaine 1 : Mobiliser le langage dans toutes ses dimensions",
    description: "Récits courts, consignes, sons proches et premiers écrits.",
    href: "/maternelle/ms/domaines/langage",
    status: "in-progress",
    subdomains: msLangageSubdomains,
    observables: [
      {
        id: "ms-langage-raconter",
        title: "Raconter une action vécue",
        status: "in-progress",
      },
      {
        id: "ms-langage-reformuler",
        title: "Reformuler une consigne simple",
        status: "in-progress",
      },
      {
        id: "ms-langage-sons",
        title: "Reconnaître des sons proches",
        status: "upcoming",
      },
      {
        id: "ms-langage-prenom",
        title: "Identifier son prénom ou quelques lettres",
        status: "upcoming",
      },
    ],
    situations: [
      { label: "Retour sur une activité vécue" },
      { label: "Consigne reformulée en petit groupe" },
      { label: "Jeu d'écoute de sons" },
    ],
    traces: [
      { label: "Repères de langage oral" },
      { label: "Étiquettes prénoms" },
    ],
    resourceSlots: commonResourceSlots,
  },
  {
    id: "ms-activite-physique",
    slug: "activite-physique",
    label: "Agir, s'exprimer, comprendre à travers l'activité physique",
    shortLabel: "Activité physique",
    levelSlug: "ms",
    officialReference:
      "Cycle 1 - Domaine 2 : Agir, s'exprimer, comprendre à travers l'activité physique",
    description: "Parcours, coopération simple et règles de jeu stabilisées.",
    href: "/maternelle/ms/domaines/activite-physique",
    status: "in-progress",
    subdomains: msActivitePhysiqueSubdomains,
    observables: [
      {
        id: "ms-physique-deplacement",
        title: "Adapter son déplacement",
        status: "upcoming",
      },
      {
        id: "ms-physique-cooperer",
        title: "Coopérer dans une action simple",
        status: "upcoming",
      },
      {
        id: "ms-physique-parcours",
        title: "Suivre un parcours",
        status: "upcoming",
      },
      {
        id: "ms-physique-regle",
        title: "Respecter une règle de jeu",
        status: "upcoming",
      },
    ],
    situations: [
      { label: "Parcours moteur balisé" },
      { label: "Jeu collectif simple" },
      { label: "Atelier de lancer ou d'équilibre" },
    ],
    traces: [
      { label: "Repères d'autonomie motrice" },
      { label: "Photo de parcours réussi" },
    ],
    resourceSlots: commonResourceSlots,
  },
  {
    id: "ms-activites-artistiques",
    slug: "activites-artistiques",
    label: "Agir, s'exprimer, comprendre à travers les activités artistiques",
    shortLabel: "Activités artistiques",
    levelSlug: "ms",
    officialReference:
      "Cycle 1 - Domaine 3 : Agir, s'exprimer, comprendre à travers les activités artistiques",
    description: "Intentions, choix d'outils, chant et description simple.",
    href: "/maternelle/ms/domaines/activites-artistiques",
    status: "upcoming",
    subdomains: msActivitesArtistiquesSubdomains,
    observables: [
      {
        id: "ms-artistique-intention",
        title: "Produire une trace avec une intention",
        status: "upcoming",
      },
      {
        id: "ms-artistique-outil",
        title: "Choisir un outil adapté",
        status: "upcoming",
      },
      {
        id: "ms-artistique-chant",
        title: "Chanter avec précision",
        status: "upcoming",
      },
      {
        id: "ms-artistique-decrire",
        title: "Décrire une production simplement",
        status: "upcoming",
      },
    ],
    situations: [
      { label: "Atelier de production guidée" },
      { label: "Choix d'outils" },
      { label: "Chant repris en groupe" },
    ],
    traces: [
      { label: "Production commentée" },
      { label: "Répertoire de chants" },
    ],
    resourceSlots: commonResourceSlots,
  },
  {
    id: "ms-premiers-outils-mathematiques",
    slug: "premiers-outils-mathematiques",
    label: "Acquérir les premiers outils mathématiques",
    shortLabel: "Premiers outils mathématiques",
    levelSlug: "ms",
    officialReference:
      "Cycle 1 - Domaine 4 : Acquérir les premiers outils mathématiques",
    description: "Petites collections, comparaisons, classements et suites.",
    href: "/maternelle/ms/domaines/premiers-outils-mathematiques",
    status: "upcoming",
    subdomains: msPremiersOutilsMathematiquesSubdomains,
    observables: [
      {
        id: "ms-maths-denombrer",
        title: "Dénombrer une petite collection",
        status: "upcoming",
      },
      {
        id: "ms-maths-comparer",
        title: "Comparer deux quantités",
        status: "upcoming",
      },
      {
        id: "ms-maths-classer",
        title: "Classer selon une propriété",
        status: "upcoming",
      },
      {
        id: "ms-maths-suite",
        title: "Poursuivre une suite simple",
        status: "upcoming",
      },
    ],
    situations: [
      { label: "Collections à compter" },
      { label: "Jeu de comparaison" },
      { label: "Suite à compléter" },
    ],
    traces: [
      { label: "Photo de classement" },
      { label: "Repères de dénombrement" },
    ],
    resourceSlots: commonResourceSlots,
  },
  {
    id: "ms-explorer-le-monde",
    slug: "explorer-le-monde",
    label: "Explorer le monde",
    shortLabel: "Explorer le monde",
    levelSlug: "ms",
    officialReference: "Cycle 1 - Domaine 5 : Explorer le monde",
    description: "Temps proche, vivant, objets et comparaisons concrètes.",
    href: "/maternelle/ms/domaines/explorer-le-monde",
    status: "upcoming",
    subdomains: msExplorerLeMondeSubdomains,
    observables: [
      {
        id: "ms-monde-journee",
        title: "Ordonner deux moments de la journée",
        status: "upcoming",
      },
      {
        id: "ms-monde-vivant",
        title: "Observer le vivant",
        status: "upcoming",
      },
      {
        id: "ms-monde-objets",
        title: "Comparer deux objets",
        status: "upcoming",
      },
      {
        id: "ms-monde-temps",
        title: "Situer un événement proche dans le temps",
        status: "upcoming",
      },
    ],
    situations: [
      { label: "Rituel avant-après" },
      { label: "Observation du vivant" },
      { label: "Comparaison de deux objets" },
    ],
    traces: [
      { label: "Frise très courte" },
      { label: "Carnet d'observation" },
    ],
    resourceSlots: commonResourceSlots,
  },
];

export function getMsDomainBySlug(
  slug: string,
): MaternelleDomainEntry | undefined {
  return msDomains.find((domain) => domain.slug === slug);
}
