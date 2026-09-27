export type GlobalNavigationItemId =
  | "teach"
  | "direction"
  | "resources"
  | "search"
  | "workspace"
  | "maternelle"
  | "primary"
  | "college"
  | "method";

export type NavigationItem = {
  label: string;
  href: string;
};

export type GlobalNavigationItem = NavigationItem & {
  id: GlobalNavigationItemId;
  order: number;
  inHeader: boolean;
  inMobileMenu: boolean;
  inFooter: boolean;
};

/**
 * Navigation de la plateforme de travail : trois univers (Enseigner,
 * Direction, Ressources), la recherche et Mon espace. Les niveaux sont
 * accessibles depuis Ressources ; l'ancien univers narratif et le lycée
 * sont archivés (voir docs/refonte-2026/inventaire.md).
 */
export const globalNavigationItems = [
  { id: "teach", label: "Enseigner", href: "/enseigner", order: 10, inHeader: true, inMobileMenu: true, inFooter: true },
  { id: "direction", label: "Direction", href: "/direction", order: 20, inHeader: true, inMobileMenu: true, inFooter: true },
  { id: "resources", label: "Ressources", href: "/ressources", order: 30, inHeader: true, inMobileMenu: true, inFooter: true },
  { id: "search", label: "Recherche", href: "/recherche", order: 40, inHeader: false, inMobileMenu: false, inFooter: false },
  { id: "workspace", label: "Mon espace", href: "/mon-espace", order: 50, inHeader: false, inMobileMenu: true, inFooter: true },
  { id: "maternelle", label: "Maternelle", href: "/maternelle", order: 60, inHeader: false, inMobileMenu: false, inFooter: true },
  { id: "primary", label: "Élémentaire", href: "/primaire", order: 70, inHeader: false, inMobileMenu: false, inFooter: true },
  { id: "college", label: "Collège", href: "/college", order: 80, inHeader: false, inMobileMenu: false, inFooter: true },
  { id: "method", label: "À propos", href: "/methode", order: 90, inHeader: false, inMobileMenu: false, inFooter: true },
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

export const footerPrimaryNavigationItems = footerNavigationItems.filter(
  (item) => item.inHeader || item.id === "workspace",
);

export const footerSecondaryNavigationItems = footerNavigationItems.filter(
  (item) => !item.inHeader && item.id !== "workspace",
);

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
