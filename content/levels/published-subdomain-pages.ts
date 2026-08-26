export type PublishedPrimaryLevelSlug = "cp" | "ce1" | "ce2" | "cm1";

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
    level: "cp",
    domain: "francais",
    subdomain: "decodage",
    route: "/primaire/cp/programmes/francais/decodage",
    label: "CP — Français — Décodage",
  },
  {
    level: "cp",
    domain: "francais",
    subdomain: "combinatoire",
    route: "/primaire/cp/programmes/francais/combinatoire",
    label: "CP — Français — Combinatoire",
  },
  {
    level: "cp",
    domain: "mathematiques",
    subdomain: "nombres",
    route: "/primaire/cp/programmes/mathematiques/nombres",
    label: "CP — Mathématiques — Nombres",
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
  {
    level: "ce2",
    domain: "francais",
    subdomain: "lecture-comprehension",
    route: "/primaire/ce2/programmes/francais/lecture-comprehension",
    label: "CE2 — Français — Lecture et compréhension",
  },
  {
    level: "cm1",
    domain: "francais",
    subdomain: "lecture-comprehension",
    route: "/primaire/cm1/programmes/francais/lecture-comprehension",
    label: "CM1 — Français — Lecture et compréhension",
  },
  {
    level: "cm1",
    domain: "mathematiques",
    subdomain: "calcul-pose",
    route: "/primaire/cm1/programmes/mathematiques/calcul-pose",
    label: "CM1 — Mathématiques — Calcul posé",
  },
  ...[
    ["francais", "lecture-documentaire", "Français — Lecture documentaire"],
    ["francais", "lecture-croiser-sources", "Français — Croiser des sources"],
    ["francais", "ecriture-planifier", "Français — Préparer son écrit"],
    ["francais", "ecriture-rediger", "Français — Rédiger et améliorer"],
    ["francais", "etude-langue-grammaire", "Français — Grammaire de phrase"],
    ["francais", "etude-langue-orthographe", "Français — Orthographe grammaticale"],
    ["francais", "oral-participer", "Français — Participer à un échange"],
    ["mathematiques", "numeration", "Mathématiques — Numération"],
    ["mathematiques", "calcul-mental", "Mathématiques — Calcul mental"],
    ["mathematiques", "demarche", "Mathématiques — Démarche de résolution"],
    ["mathematiques", "donnees", "Mathématiques — Lire et interpréter des données"],
    ["mathematiques", "longueurs-aires", "Mathématiques — Longueurs, périmètres et aires"],
    ["mathematiques", "durees", "Mathématiques — Durées"],
    ["mathematiques", "figures", "Mathématiques — Figures planes"],
    ["mathematiques", "espace", "Mathématiques — Repérage dans l'espace"],
  ].map(([domain, subdomain, label]) => ({
    level: "cm1" as const,
    domain,
    subdomain,
    route: `/primaire/cm1/programmes/${domain}/${subdomain}`,
    label: `CM1 — ${label}`,
  })),
] as const satisfies readonly PublishedSubdomainPage[];

export function getPublishedSubdomainPagesForDomain(
  level: string,
  domain: string,
): readonly PublishedSubdomainPage[] {
  return publishedSubdomainPages.filter(
    (page) => page.level === level && page.domain === domain,
  );
}

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
