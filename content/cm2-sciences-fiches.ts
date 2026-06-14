// Registre des fiches CM2 Sciences et technologie.
// Les fiches sans `href` restent non cliquables côté UI (cf. PublicStatusBadge).

export type Cm2SciencesFiche = {
  id: string;
  slug: string;
  title: string;
  domain: string;
  skill: string;
  status: "available" | "upcoming";
  sheets?: { id: string; label: string; href?: string }[];
};

export const cm2SciencesFiches: Cm2SciencesFiche[] = [
  {
    id: "etats-de-la-matiere",
    slug: "etats-de-la-matiere",
    title: "Les états de la matière",
    domain: "Matière, mouvement, énergie, information",
    skill: "Décrire les états solide, liquide et gazeux et leurs changements.",
    status: "upcoming",
  },
  {
    id: "le-vivant-classification",
    slug: "le-vivant-classification",
    title: "Classer le vivant",
    domain: "Le vivant",
    skill: "Identifier des critères de classification des êtres vivants.",
    status: "upcoming",
  },
  {
    id: "objets-techniques",
    slug: "objets-techniques",
    title: "Fonctionnement des objets techniques",
    domain: "Matériaux et objets techniques",
    skill: "Décrire le fonctionnement d'un objet technique simple.",
    status: "upcoming",
  },
  {
    id: "environnement-et-planete",
    slug: "environnement-et-planete",
    title: "Protéger l'environnement",
    domain: "La planète Terre et l'environnement",
    skill: "Identifier des actions favorables à la protection de l'environnement.",
    status: "upcoming",
  },
];

export function getCm2SciencesFicheBySlug(slug: string): Cm2SciencesFiche | undefined {
  return cm2SciencesFiches.find((f) => f.slug === slug);
}
