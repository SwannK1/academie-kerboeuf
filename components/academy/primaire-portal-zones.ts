// ── Zones cliquables du portail primaire ─────────────────────────────────────
// Coordonnées en % de l'image (left, top, width, height).
// Les zones couvrent les silhouettes de personnages sans se chevaucher.
// Ordre gauche → droite : Kiwi, Gaston, Esteban, Noisette, Félix.

export const PORTAL_ZONES = [
  {
    slug: "cp",
    label: "CP",
    character: "Kiwi",
    animal: "la Grenouille",
    href: "/primaire/cp",
    ariaLabel: "Entrer dans le CP avec Kiwi la Grenouille",
    x: 0, y: 0, w: 22, h: 100,
    rgb: "80,200,164",   // jade
    accent: "jade" as const,
  },
  {
    slug: "ce1",
    label: "CE1",
    character: "Gaston",
    animal: "le Hérisson",
    href: "/primaire/ce1",
    ariaLabel: "Entrer dans le CE1 avec Gaston le Hérisson",
    x: 22, y: 0, w: 18, h: 100,
    rgb: "139,200,255",  // sky
    accent: "sky" as const,
  },
  {
    slug: "ce2",
    label: "CE2",
    character: "Esteban",
    animal: "le Manchot",
    href: "/primaire/ce2",
    ariaLabel: "Entrer dans le CE2 avec Esteban le Manchot",
    x: 40, y: 0, w: 21, h: 100,
    rgb: "222,104,72",   // ember
    accent: "ember" as const,
  },
  {
    slug: "cm1",
    label: "CM1",
    character: "Noisette",
    animal: "l'Écureuille",
    href: "/primaire/cm1",
    ariaLabel: "Entrer dans le CM1 avec Noisette l'Écureuille",
    x: 61, y: 0, w: 18, h: 100,
    rgb: "243,196,91",   // gold
    accent: "gold" as const,
  },
  {
    slug: "cm2",
    label: "CM2",
    character: "Félix",
    animal: "le Lynx",
    href: "/primaire/cm2",
    ariaLabel: "Entrer dans le CM2 avec Félix le Lynx",
    x: 79, y: 0, w: 21, h: 100,
    rgb: "243,196,91",   // gold
    accent: "gold" as const,
  },
] as const;

export type ZoneSlug = (typeof PORTAL_ZONES)[number]["slug"];
