export const siteUrl = "https://www.chezjujuetfifi.fr";

export const restaurantInfo = {
  url: siteUrl,
  name: "Chez Juju & Fifi",
  alternateName: "Chez Juju et Fifi",
  description:
    "Restaurant français à Chelles, cuisine traditionnelle, menu du jour, terrasse, groupes et réservation en ligne.",
  address: {
    streetAddress: "18 Rue de l'Ormeteau",
    postalCode: "77500",
    addressLocality: "Chelles",
    addressCountry: "FR",
  },
  telephone: "+33160085000",
  phoneInternational: "+33160085000",
  displayPhone: "01 60 08 50 00",
  phoneDisplay: "01 60 08 50 00",
  priceRange: "€€",
  cuisine: "French",
  cuisineLabel: "Cuisine française",
  servesCuisine: "French",
  menuPath: "/carte",
  reservationPath: "/reservation",
  acceptsReservations: true,
  openingHours: ["Mo-Sa"],
  openingSummary: "Ouvert du lundi au samedi, au déjeuner et au dîner.",
  highlights: [
    "restaurant français à Chelles",
    "menu du jour",
    "terrasse",
    "repas de groupe",
    "couscous du vendredi soir",
  ],
  sameAs: [],
} as const;

export const publicPages = [
  { path: "/", priority: 1.0 },
  { path: "/restaurant", priority: 0.9 },
  { path: "/carte", priority: 0.9 },
  { path: "/menu-du-jour", priority: 0.85 },
  { path: "/reservation", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
] as const;

export const navLinks = [
  { label: "Restaurant", href: "/restaurant" },
  { label: "Carte", href: "/carte" },
  { label: "Menu du jour", href: "/menu-du-jour" },
  { label: "Réservation", href: "/reservation" },
  { label: "Contact", href: "/contact" },
] as const;

export const mainNavigation = navLinks;

export const menuHighlights = [
  "Cuisine traditionnelle française",
  "Menu du jour le midi",
  "Couscous du vendredi soir",
  "Terrasse et repas de groupe",
] as const;
