export type PublishedPrimaryLevelSlug = "cp" | "ce1" | "ce2";

export type PublishedSubdomainPage = {
  level: PublishedPrimaryLevelSlug;
  domain: string;
  subdomain: string;
  route: string;
  label: string;
};

export const publishedSubdomainPages = [
  {
    level: "cp",
    domain: "francais",
    subdomain: "lecture-comprehension",
    route: "/primaire/cp/programmes/francais/lecture-comprehension",
    label: "CP — Français — Lecture-compréhension",
  },
  {
    level: "ce1",
    domain: "francais",
    subdomain: "etude-de-la-langue",
    route: "/primaire/ce1/programmes/francais/etude-de-la-langue",
    label: "CE1 — Français — Étude de la langue",
  },
  // ── CE2 — Français ─────────────────────────────────────────────────────────
  {
    level: "ce2",
    domain: "francais",
    subdomain: "lecture-voix-haute",
    route: "/primaire/ce2/programmes/francais/lecture-voix-haute",
    label: "CE2 — Français — Lecture à voix haute",
  },
  {
    level: "ce2",
    domain: "francais",
    subdomain: "langage-oral",
    route: "/primaire/ce2/programmes/francais/langage-oral",
    label: "CE2 — Français — Langage oral",
  },
  {
    level: "ce2",
    domain: "francais",
    subdomain: "lecture-comprehension",
    route: "/primaire/ce2/programmes/francais/lecture-comprehension",
    label: "CE2 — Français — Lecture et compréhension",
  },
  {
    level: "ce2",
    domain: "francais",
    subdomain: "ecriture",
    route: "/primaire/ce2/programmes/francais/ecriture",
    label: "CE2 — Français — Écriture",
  },
  {
    level: "ce2",
    domain: "francais",
    subdomain: "etude-de-la-langue",
    route: "/primaire/ce2/programmes/francais/etude-de-la-langue",
    label: "CE2 — Français — Étude de la langue",
  },
  {
    level: "ce2",
    domain: "francais",
    subdomain: "vocabulaire",
    route: "/primaire/ce2/programmes/francais/vocabulaire",
    label: "CE2 — Français — Vocabulaire",
  },
  // ── CE2 — Mathématiques ─────────────────────────────────────────────────────
  {
    level: "ce2",
    domain: "mathematiques",
    subdomain: "nombres-calcul",
    route: "/primaire/ce2/programmes/mathematiques/nombres-calcul",
    label: "CE2 — Mathématiques — Nombres et calculs",
  },
  {
    level: "ce2",
    domain: "mathematiques",
    subdomain: "problemes",
    route: "/primaire/ce2/programmes/mathematiques/problemes",
    label: "CE2 — Mathématiques — Problèmes",
  },
  {
    level: "ce2",
    domain: "mathematiques",
    subdomain: "grandeurs-mesures",
    route: "/primaire/ce2/programmes/mathematiques/grandeurs-mesures",
    label: "CE2 — Mathématiques — Grandeurs et mesures",
  },
  {
    level: "ce2",
    domain: "mathematiques",
    subdomain: "espace-geometrie",
    route: "/primaire/ce2/programmes/mathematiques/espace-geometrie",
    label: "CE2 — Mathématiques — Espace et géométrie",
  },
  // ── CE2 — Questionner le monde ──────────────────────────────────────────────
  {
    level: "ce2",
    domain: "questionner-le-monde",
    subdomain: "temps",
    route: "/primaire/ce2/programmes/questionner-le-monde/temps",
    label: "CE2 — Questionner le monde — Le temps",
  },
  {
    level: "ce2",
    domain: "questionner-le-monde",
    subdomain: "espace",
    route: "/primaire/ce2/programmes/questionner-le-monde/espace",
    label: "CE2 — Questionner le monde — L'espace",
  },
  {
    level: "ce2",
    domain: "questionner-le-monde",
    subdomain: "vivant-matiere-objets",
    route: "/primaire/ce2/programmes/questionner-le-monde/vivant-matiere-objets",
    label: "CE2 — Questionner le monde — Vivant, matière et objets",
  },
  // ── CE2 — Enseignements artistiques ─────────────────────────────────────────
  {
    level: "ce2",
    domain: "enseignements-artistiques",
    subdomain: "arts-plastiques",
    route: "/primaire/ce2/programmes/enseignements-artistiques/arts-plastiques",
    label: "CE2 — Enseignements artistiques — Arts plastiques",
  },
  {
    level: "ce2",
    domain: "enseignements-artistiques",
    subdomain: "education-musicale",
    route: "/primaire/ce2/programmes/enseignements-artistiques/education-musicale",
    label: "CE2 — Enseignements artistiques — Éducation musicale",
  },
  // ── CE2 — EPS ───────────────────────────────────────────────────────────────
  {
    level: "ce2",
    domain: "eps",
    subdomain: "performance",
    route: "/primaire/ce2/programmes/eps/performance",
    label: "CE2 — EPS — Produire une performance",
  },
  {
    level: "ce2",
    domain: "eps",
    subdomain: "deplacements-adaptes",
    route: "/primaire/ce2/programmes/eps/deplacements-adaptes",
    label: "CE2 — EPS — Adapter ses déplacements",
  },
  {
    level: "ce2",
    domain: "eps",
    subdomain: "jeux-collectifs",
    route: "/primaire/ce2/programmes/eps/jeux-collectifs",
    label: "CE2 — EPS — Jeux collectifs",
  },
  {
    level: "ce2",
    domain: "eps",
    subdomain: "expression-corporelle",
    route: "/primaire/ce2/programmes/eps/expression-corporelle",
    label: "CE2 — EPS — Expression corporelle",
  },
  // ── CE2 — EMC ───────────────────────────────────────────────────────────────
  {
    level: "ce2",
    domain: "emc",
    subdomain: "regles-vie-collective",
    route: "/primaire/ce2/programmes/emc/regles-vie-collective",
    label: "CE2 — EMC — Règles et vie collective",
  },
  {
    level: "ce2",
    domain: "emc",
    subdomain: "jugement-engagement",
    route: "/primaire/ce2/programmes/emc/jugement-engagement",
    label: "CE2 — EMC — Jugement et engagement",
  },
] as const satisfies readonly PublishedSubdomainPage[];

export function isPublishedSubdomainPage(
  level: string,
  domain: string,
  subdomain: string,
): boolean {
  return Boolean(getPublishedSubdomainPage(level, domain, subdomain));
}

export function getPublishedSubdomainPage(
  level: string,
  domain: string,
  subdomain: string,
): PublishedSubdomainPage | undefined {
  return publishedSubdomainPages.find(
    (page) =>
      page.level === level &&
      page.domain === domain &&
      page.subdomain === subdomain,
  );
}
