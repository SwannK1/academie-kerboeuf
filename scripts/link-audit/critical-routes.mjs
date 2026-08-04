// Échantillon critique partagé entre l'audit rapide (quick-check.mjs) et,
// potentiellement, d'autres scripts. Une seule liste : ne pas dupliquer.
export const CRITICAL_ROUTES = [
  "/",
  "/ressources",
  "/missions-recentes",
  "/programmes",
  "/parcours",
  "/primaire",
  "/college",
  "/lycee",
  "/enseignants",
  // une mission
  "/primaire/cm2/missions/mission-inference",
  // un parcours
  "/parcours/seconde-reussir-son-entree-au-lycee",
  // un PDF
  "/fiches/cm2/mathematiques-pdf/choisir-le-bon-outil-geometrique/f1.pdf",
  "/robots.txt",
  "/sitemap.xml",
];
