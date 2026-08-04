// Audit complet : routes générées, liens internes, fichiers publics, sitemap.
// Orchestre les scripts existants (extract-links / verify-links / http-check,
// créés pendant le chantier d'intégrité des liens) + sitemap-check (nouveau),
// avec un unique serveur de production démarré puis arrêté une seule fois.
// Usage temporaire pour l'audit d'intégrité des routes/liens : ne fait pas
// partie du build.
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { withServer, ensureBuild } from "./with-server.mjs";

const ROOT = process.cwd();

function runNode(script, args = []) {
  const result = spawnSync("node", [script, ...args], { stdio: "inherit", cwd: ROOT });
  if (result.status !== 0) {
    throw new Error(`${script} a échoué (code ${result.status}).`);
  }
}

function readJson(file) {
  return JSON.parse(readFileSync(path.join(ROOT, file), "utf8"));
}

ensureBuild();

console.log("=== 1/4 — Extraction des liens internes (HTML statique du build) ===");
runNode("scripts/link-audit/extract-links.mjs");

console.log("\n=== 2/4 — Vérification routes/fichiers vs build ===");
runNode("scripts/link-audit/verify-links.mjs");

const verifyResults = readJson("scripts/link-audit/verify-results.json");
const routesCount = Object.keys(
  JSON.parse(readFileSync(path.join(ROOT, ".next/prerender-manifest.json"), "utf8")).routes,
).length;

let httpOk = true;
let sitemapOk = true;

await withServer(async (baseUrl) => {
  console.log("\n=== 3/4 — Tests HTTP réels sur les routes internes référencées ===");
  runNode("scripts/link-audit/http-check.mjs", [baseUrl]);
  const httpResults = readJson("scripts/link-audit/http-check-results.json");
  httpOk = httpResults.notFound.length === 0 && httpResults.serverError.length === 0;

  console.log("\n=== 4/4 — Sitemap ===");
  try {
    runNode("scripts/link-audit/sitemap-check.mjs", [baseUrl]);
  } catch {
    sitemapOk = false;
  }
});

console.log("\n=== RÉSUMÉ ===");
console.log("Routes générées :", routesCount);
console.log("Fichiers publics référencés :", verifyResults.totalFileLinks, "  -> absents :", verifyResults.brokenFiles.length);
console.log("Routes internes référencées :", verifyResults.totalRouteLinks, "  -> sans correspondance :", verifyResults.brokenRoutes.length);

const ok =
  verifyResults.brokenFiles.length === 0 &&
  verifyResults.brokenRoutes.length === 0 &&
  httpOk &&
  sitemapOk;

if (!ok) {
  console.error("\nAudit complet : ANOMALIE(S) DÉTECTÉE(S) (voir détails ci-dessus).");
  process.exit(1);
}
console.log("\nAudit complet : OK.");
