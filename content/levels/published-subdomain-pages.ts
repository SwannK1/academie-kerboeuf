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
