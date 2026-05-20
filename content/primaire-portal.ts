// Coordonnées en % du conteneur image — PROVISOIRES jusqu'au calibrage sur l'image finale

export type PrimairePortalZone = {
  slug: "cp" | "ce1" | "ce2" | "cm1" | "cm2";
  label: string;
  href: string;
  character: string;
  animal: string;
  colorKey: "jade" | "sky" | "ember" | "gold";
  ariaLabel: string;
  coords: { x: number; y: number; width: number; height: number };
};

export const PRIMAIRE_PORTAL_ZONES: PrimairePortalZone[] = [
  {
    slug: "cp",
    label: "CP",
    href: "/primaire/cp",
    character: "Kiwi",
    animal: "la grenouille",
    colorKey: "jade",
    ariaLabel: "Accéder au CP avec Kiwi la grenouille",
    coords: { x: 5, y: 30, width: 18, height: 40 }, // PROVISOIRE
  },
  {
    slug: "ce1",
    label: "CE1",
    href: "/primaire/ce1",
    character: "Gaston",
    animal: "le hérisson",
    colorKey: "sky",
    ariaLabel: "Accéder au CE1 avec Gaston le hérisson",
    coords: { x: 24, y: 28, width: 18, height: 40 }, // PROVISOIRE
  },
  {
    slug: "ce2",
    label: "CE2",
    href: "/primaire/ce2",
    character: "Esteban",
    animal: "le manchot",
    colorKey: "ember",
    ariaLabel: "Accéder au CE2 avec Esteban le manchot",
    coords: { x: 42, y: 25, width: 18, height: 42 }, // PROVISOIRE
  },
  {
    slug: "cm1",
    label: "CM1",
    href: "/primaire/cm1",
    character: "Noisette",
    animal: "l'écureuil",
    colorKey: "gold",
    ariaLabel: "Accéder au CM1 avec Noisette l'écureuil",
    coords: { x: 61, y: 28, width: 18, height: 40 }, // PROVISOIRE
  },
  {
    slug: "cm2",
    label: "CM2",
    href: "/primaire/cm2",
    character: "Félix",
    animal: "le lynx",
    colorKey: "gold", // cohérent avec LEVEL_ACCENT de app/primaire/page.tsx
    ariaLabel: "Accéder au CM2 avec Félix le lynx",
    coords: { x: 79, y: 30, width: 18, height: 40 }, // PROVISOIRE
  },
];
