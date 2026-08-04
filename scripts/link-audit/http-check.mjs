// Teste chaque route interne trouvée (extract-links.mjs) contre un serveur
// réel, distingue 200/3xx/404/500. Usage temporaire pour l'audit.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const BASE = process.argv[2] ?? "http://localhost:3000";
const extracted = JSON.parse(
  readFileSync(path.join(ROOT, "scripts/link-audit/extracted-links.json"), "utf8"),
);

const routeHrefs = extracted.internal
  .map((h) => h.href)
  .filter((h) => !h.startsWith("/_next/"))
  .filter((h) => !/\.[a-zA-Z0-9]{2,5}$/.test(h.split("?")[0].split("#")[0]));

const uniquePaths = [...new Set(routeHrefs)];

const results = { 200: [], redirect: [], notFound: [], serverError: [], other: [] };

for (const p of uniquePaths) {
  const url = BASE + p;
  try {
    const res = await fetch(url, { redirect: "manual" });
    const entry = { path: p, status: res.status };
    if (res.status >= 200 && res.status < 300) results["200"].push(entry);
    else if (res.status >= 300 && res.status < 400) {
      entry.location = res.headers.get("location");
      results.redirect.push(entry);
    } else if (res.status === 404) results.notFound.push(entry);
    else if (res.status >= 500) results.serverError.push(entry);
    else results.other.push(entry);
  } catch (e) {
    results.serverError.push({ path: p, status: "fetch-error", error: String(e) });
  }
}

console.log("Total routes testées:", uniquePaths.length);
console.log("  200 OK:", results["200"].length);
console.log("  3xx redirect:", results.redirect.length);
console.log("  404:", results.notFound.length);
console.log("  5xx / erreur:", results.serverError.length);
console.log("  autre:", results.other.length);

if (results.notFound.length) {
  console.log("\n=== 404 ===");
  results.notFound.forEach((r) => console.log(" ", r.path));
}
if (results.serverError.length) {
  console.log("\n=== ERREURS SERVEUR ===");
  results.serverError.forEach((r) => console.log(" ", r.path, r.status));
}
if (results.redirect.length) {
  console.log("\n=== REDIRECTS (via lien interne — voir si évitable) ===");
  results.redirect.forEach((r) => console.log(" ", r.path, "->", r.location));
}

writeFileSync(
  path.join(ROOT, "scripts/link-audit/http-check-results.json"),
  JSON.stringify(results, null, 2),
);
