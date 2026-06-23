import { ce1Subjects } from "@/content/ce1-subjects";

export type Ce1GastonZoneId =
  | "bibliotheque-rosa"
  | "atelier-hector"
  | "laboratoire-melina"
  | "atelier-pablo"
  | "terrain-max"
  | "jardin-gaston";

export type Ce1GastonZone = {
  id: Ce1GastonZoneId;
  placeName: string;
  character: string;
  mainSubject: string;
  tagline: string;
  domains: string[];
  status: unknown;
  href: string;
};

function subjectDomains(slug: string, max = 3): string[] {
  const subject = ce1Subjects.find((entry) => entry.slug === slug);
  return subject ? subject.domains.slice(0, max) : [];
}

export const ce1GastonZones: Ce1GastonZone[] = [
  {
    id: "bibliotheque-rosa",
    placeName: "La Bibliothèque de Rosa",
    character: "Rosa le Flamant Rose",
    mainSubject: "Français",
    tagline: "Lire, comprendre et écrire avec plaisir.",
    domains: subjectDomains("francais"),
    status: ce1Subjects.find((s) => s.slug === "francais")?.status ?? "in-progress",
    href: "/primaire/ce1/matieres/francais",
  },
  {
    id: "atelier-hector",
    placeName: "L'Atelier d'Hector",
    character: "Hector le Castor",
    mainSubject: "Mathématiques",
    tagline: "Calculer, mesurer et résoudre des problèmes.",
    domains: subjectDomains("mathematiques"),
    status: ce1Subjects.find((s) => s.slug === "mathematiques")?.status ?? "upcoming",
    href: "/primaire/ce1/matieres/mathematiques",
  },
  {
    id: "laboratoire-melina",
    placeName: "Le Laboratoire de Mélina",
    character: "Mélina l'Abeille",
    mainSubject: "Questionner le monde",
    tagline: "Observer le vivant, la matière, le temps et l'espace.",
    domains: subjectDomains("questionner-le-monde"),
    status: ce1Subjects.find((s) => s.slug === "questionner-le-monde")?.status ?? "upcoming",
    href: "/primaire/ce1/matieres/questionner-le-monde",
  },
  {
    id: "atelier-pablo",
    placeName: "L'Atelier de Pablo",
    character: "Pablo l'Orang-outan",
    mainSubject: "Arts",
    tagline: "Créer, composer et présenter une production.",
    domains: subjectDomains("enseignements-artistiques"),
    status: ce1Subjects.find((s) => s.slug === "enseignements-artistiques")?.status ?? "upcoming",
    href: "/primaire/ce1/matieres/enseignements-artistiques",
  },
  {
    id: "terrain-max",
    placeName: "Le Terrain de Max",
    character: "Max le Kangourou",
    mainSubject: "EPS",
    tagline: "Bouger, coopérer et relever des défis physiques.",
    domains: subjectDomains("eps"),
    status: ce1Subjects.find((s) => s.slug === "eps")?.status ?? "upcoming",
    href: "/primaire/ce1/matieres/eps",
  },
  {
    id: "jardin-gaston",
    placeName: "Le Jardin de Gaston",
    character: "Gaston le Hérisson",
    mainSubject: "Méthode et autonomie",
    tagline: "Organiser son travail et relever de petits défis.",
    domains: ["Méthode de travail", "Autonomie", "Défis courts"],
    status: "in-progress",
    href: "/primaire/ce1/lecons",
  },
];
