export type GlobalNavigationItemId =
  | "home"
  | "resources"
  | "primary"
  | "teachers"
  | "universe"
  | "maternelle"
  | "college"
  | "lycee"
  | "map"
  | "method"
  | "characters"
  | "professors"
  | "recent-missions";

export type GlobalNavigationItem = {
  id: GlobalNavigationItemId;
  label: string;
  href: string;
  order: number;
  inHeader: boolean;
  inMobileMenu: boolean;
  inFooter: boolean;
};

export const globalNavigationItems = [
  { id: "home", label: "Accueil", href: "/", order: 10, inHeader: true, inMobileMenu: true, inFooter: true },
  { id: "resources", label: "Ressources", href: "/ressources", order: 20, inHeader: true, inMobileMenu: true, inFooter: true },
  { id: "primary", label: "Primaire", href: "/primaire", order: 30, inHeader: true, inMobileMenu: true, inFooter: true },
  { id: "teachers", label: "Enseignants", href: "/enseignants", order: 40, inHeader: true, inMobileMenu: true, inFooter: true },
  { id: "universe", label: "Univers", href: "/univers", order: 50, inHeader: true, inMobileMenu: true, inFooter: true },
  { id: "maternelle", label: "Maternelle", href: "/maternelle", order: 60, inHeader: false, inMobileMenu: false, inFooter: true },
  { id: "college", label: "Collège", href: "/college", order: 70, inHeader: false, inMobileMenu: false, inFooter: true },
  { id: "lycee", label: "Lycée", href: "/lycee", order: 80, inHeader: false, inMobileMenu: false, inFooter: true },
  { id: "map", label: "Carte", href: "/carte", order: 90, inHeader: false, inMobileMenu: false, inFooter: true },
  { id: "method", label: "Méthode", href: "/methode", order: 100, inHeader: false, inMobileMenu: false, inFooter: true },
  { id: "characters", label: "Personnages", href: "/personnages", order: 110, inHeader: false, inMobileMenu: false, inFooter: true },
  { id: "professors", label: "Professeurs", href: "/professeurs", order: 120, inHeader: false, inMobileMenu: false, inFooter: true },
  { id: "recent-missions", label: "Missions récentes", href: "/missions-recentes", order: 130, inHeader: false, inMobileMenu: false, inFooter: true },
] as const satisfies readonly GlobalNavigationItem[];

function byOrder(a: GlobalNavigationItem, b: GlobalNavigationItem) {
  return a.order - b.order;
}

export const headerNavigationItems = [...globalNavigationItems]
  .filter((item) => item.inHeader)
  .sort(byOrder);

export const mobileNavigationItems = [...globalNavigationItems]
  .filter((item) => item.inMobileMenu)
  .sort(byOrder);

export const footerNavigationItems = [...globalNavigationItems]
  .filter((item) => item.inFooter)
  .sort(byOrder);

export const mainNavigationItems = headerNavigationItems;

export type LegalNavigationItem = {
  label: string;
  href: string;
};

export const legalNavigationItems = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
  { label: "Cookies", href: "/cookies" },
  { label: "Contact", href: "/contact" },
  { label: "Plan du site", href: "/plan-du-site" },
] as const satisfies readonly LegalNavigationItem[];

export function isGlobalNavItemActive(
  pathname: string,
  item: Pick<GlobalNavigationItem, "href">,
) {
  if (item.href === "/") {
    return pathname === "/";
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}
