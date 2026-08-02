// Vérifie chaque href interne extrait par extract-links.mjs :
//  - si l'href ressemble à un fichier (extension), vérifie sa présence sous public/
//  - sinon, vérifie qu'il correspond à une route du prerender-manifest.json
// Usage temporaire pour l'audit d'intégrité des routes/liens.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const extracted = JSON.parse(
  readFileSync(path.join(ROOT, "scripts/link-audit/extracted-links.json"), "utf8"),
);
const manifest = JSON.parse(
  readFileSync(path.join(ROOT, ".next/prerender-manifest.json"), "utf8"),
);
const routeSet = new Set(Object.keys(manifest.routes));

const isFileLike = (href) => /\.[a-zA-Z0-9]{2,5}$/.test(href.split("?")[0].split("#")[0]);

const results = { fileLinks: [], routeLinks: [] };

for (const { href, pages } of extracted.internal) {
  if (href.startsWith("/_next/")) continue; // build assets, not content
  const [pathname] = href.split(/[?#]/);
  const cleanPath = decodeURIComponent(pathname);

  if (isFileLike(cleanPath)) {
    const filePath = path.join(ROOT, "public", cleanPath);
    const exists = existsSync(filePath);
    results.fileLinks.push({ href, cleanPath, exists, pages });
  } else {
    const exists = routeSet.has(cleanPath) || cleanPath === "/robots.txt" || cleanPath === "/sitemap.xml";
    results.routeLinks.push({ href, cleanPath, exists, pages });
  }
}

const brokenFiles = results.fileLinks.filter((f) => !f.exists);
const brokenRoutes = results.routeLinks.filter((r) => !r.exists);

console.log("Fichiers publics référencés (hors /_next/):", results.fileLinks.length);
console.log("  -> absents:", brokenFiles.length);
console.log("Routes internes référencées:", results.routeLinks.length);
console.log("  -> ne correspondant à aucune route générée:", brokenRoutes.length);

if (brokenFiles.length) {
  console.log("\n=== FICHIERS ABSENTS ===");
  brokenFiles.forEach((f) => console.log(" ", f.cleanPath, "  (référencé depuis:", f.pages.slice(0, 3).join(", "), ")"));
}
if (brokenRoutes.length) {
  console.log("\n=== ROUTES SANS CORRESPONDANCE ===");
  brokenRoutes.forEach((r) => console.log(" ", r.cleanPath, "  (référencé depuis:", r.pages.slice(0, 3).join(", "), ")"));
}

writeFileSync(
  path.join(ROOT, "scripts/link-audit/verify-results.json"),
  JSON.stringify({ brokenFiles, brokenRoutes, totalFileLinks: results.fileLinks.length, totalRouteLinks: results.routeLinks.length }, null, 2),
);
