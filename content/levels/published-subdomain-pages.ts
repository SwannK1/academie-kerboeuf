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
  {
    level: "ce1",
    domain: "francais",
    subdomain: "lecture-fluide",
    route: "/primaire/ce1/programmes/francais/lecture-fluide",
    label: "CE1 — Français — Lecture fluide",
  },
  {
    level: "ce1",
    domain: "francais",
    subdomain: "comprehension",
    route: "/primaire/ce1/programmes/francais/comprehension",
    label: "CE1 — Français — Compréhension",
  },
  {
    level: "ce1",
    domain: "francais",
    subdomain: "production-ecrite",
    route: "/primaire/ce1/programmes/francais/production-ecrite",
    label: "CE1 — Français — Production écrite",
  },
  {
    level: "ce1",
    domain: "francais",
    subdomain: "orthographe",
    route: "/primaire/ce1/programmes/francais/orthographe",
    label: "CE1 — Français — Orthographe",
  },
  {
    level: "ce1",
    domain: "mathematiques",
    subdomain: "nombres-et-calculs",
    route: "/primaire/ce1/programmes/mathematiques/nombres-et-calculs",
    label: "CE1 — Mathématiques — Nombres et calculs",
  },
  {
    level: "ce1",
    domain: "mathematiques",
    subdomain: "problemes",
    route: "/primaire/ce1/programmes/mathematiques/problemes",
    label: "CE1 — Mathématiques — Problèmes",
  },
  {
    level: "ce1",
    domain: "mathematiques",
    subdomain: "grandeurs-et-mesures",
    route: "/primaire/ce1/programmes/mathematiques/grandeurs-et-mesures",
    label: "CE1 — Mathématiques — Grandeurs et mesures",
  },
  {
    level: "ce1",
    domain: "mathematiques",
    subdomain: "espace-et-geometrie",
    route: "/primaire/ce1/programmes/mathematiques/espace-et-geometrie",
    label: "CE1 — Mathématiques — Espace et géométrie",
  },
  {
    level: "ce1",
    domain: "questionner-le-monde",
    subdomain: "vivant",
    route: "/primaire/ce1/programmes/questionner-le-monde/vivant",
    label: "CE1 — Questionner le monde — Le vivant",
  },
  {
    level: "ce1",
    domain: "questionner-le-monde",
    subdomain: "matiere-et-objets",
    route: "/primaire/ce1/programmes/questionner-le-monde/matiere-et-objets",
    label: "CE1 — Questionner le monde — Matière et objets",
  },
  {
    level: "ce1",
    domain: "questionner-le-monde",
    subdomain: "espace-et-temps",
    route: "/primaire/ce1/programmes/questionner-le-monde/espace-et-temps",
    label: "CE1 — Questionner le monde — Espace et temps",
  },
  {
    level: "ce2",
    domain: "mathematiques",
    subdomain: "nombres-calcul",
    route: "/primaire/ce2/programmes/mathematiques/nombres-calcul",
    label: "CE2 — Mathématiques — Nombres et calculs",
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
