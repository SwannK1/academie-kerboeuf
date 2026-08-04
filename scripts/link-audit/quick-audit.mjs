// Audit rapide : vérifie qu'un échantillon de routes critiques répond
// correctement (200/3xx) sur un serveur réel. Complète http-check.mjs
// (audit complet, sur toutes les routes extraites du build) sans dupliquer
// sa logique d'extraction : cette liste est courte, fixe, et choisie à la
// main parmi les parcours publics et outils enseignants les plus utilisés.
const BASE = process.argv[2] ?? "http://127.0.0.1:3100";

const CRITICAL_ROUTES = [
  "/",
  "/ressources",
  "/missions-recentes",
  "/parcours",
  "/parcours/cm2-lire-comme-un-detective",
  "/primaire",
  "/primaire/cm2",
  "/primaire/cm2/matieres/mathematiques",
  "/primaire/cm2/matieres/sciences",
  "/college",
  "/college/6e",
  "/lycee",
  "/lycee/seconde",
  "/enseignants",
  "/enseignants/progression",
  "/enseignants/programmation/annuelle",
  "/enseignants/organisation-classe",
  "/eleves/felix",
  "/sitemap.xml",
  "/robots.txt",
];

let failed = 0;

for (const route of CRITICAL_ROUTES) {
  const url = BASE + route;
  try {
    const res = await fetch(url, { redirect: "manual" });
    const ok = res.status >= 200 && res.status < 400;
    console.log(`${ok ? "OK  " : "FAIL"} ${res.status}  ${route}`);
    if (!ok) failed += 1;
  } catch (error) {
    console.log(`FAIL ERROR ${route} (${error})`);
    failed += 1;
  }
}

console.log(
  `\n${CRITICAL_ROUTES.length - failed}/${CRITICAL_ROUTES.length} routes critiques OK`,
);

if (failed > 0) {
  process.exit(1);
}
