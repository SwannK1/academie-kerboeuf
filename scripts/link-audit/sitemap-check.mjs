// Teste chaque URL de /sitemap.xml contre un serveur réel : 200/3xx/404/5xx,
// et signale les doublons. Complète extract-links.mjs / verify-links.mjs /
// http-check.mjs (qui ne couvrent pas le contenu du sitemap lui-même).
// Usage temporaire pour l'audit d'intégrité des routes/liens.
import { writeFileSync } from "node:fs";
import path from "node:path";
import { withServer, ensureBuild } from "./with-server.mjs";

const ROOT = process.cwd();

async function run(baseUrl) {
  const res = await fetch(`${baseUrl}/sitemap.xml`);
  if (!res.ok) {
    throw new Error(`/sitemap.xml a répondu ${res.status}`);
  }
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const paths = urls.map((u) => {
    try {
      return new URL(u).pathname;
    } catch {
      return u;
    }
  });

  const seen = new Map();
  for (const p of paths) seen.set(p, (seen.get(p) ?? 0) + 1);
  const duplicates = [...seen.entries()].filter(([, count]) => count > 1);

  const results = { ok: [], redirect: [], notFound: [], serverError: [], networkError: [] };
  for (const p of paths) {
    try {
      const r = await fetch(baseUrl + p, { redirect: "manual" });
      const entry = { path: p, status: r.status };
      if (r.status >= 200 && r.status < 300) results.ok.push(entry);
      else if (r.status >= 300 && r.status < 400) results.redirect.push(entry);
      else if (r.status === 404) results.notFound.push(entry);
      else if (r.status >= 500) results.serverError.push(entry);
      else results.notFound.push(entry);
    } catch (e) {
      results.networkError.push({ path: p, error: String(e) });
    }
  }

  console.log("URL du sitemap :", paths.length);
  console.log("  200 OK :", results.ok.length);
  console.log("  3xx redirect :", results.redirect.length);
  console.log("  404 :", results.notFound.length);
  console.log("  5xx / erreur :", results.serverError.length);
  console.log("  erreur réseau :", results.networkError.length);
  console.log("  doublons :", duplicates.length);

  if (duplicates.length) {
    console.log("\n=== URL DUPLIQUÉES ===");
    duplicates.forEach(([p, count]) => console.log(" ", p, `(x${count})`));
  }
  if (results.notFound.length) {
    console.log("\n=== SITEMAP 404 ===");
    results.notFound.forEach((r) => console.log(" ", r.path));
  }
  if (results.serverError.length) {
    console.log("\n=== SITEMAP 5xx ===");
    results.serverError.forEach((r) => console.log(" ", r.path, r.status));
  }

  const out = {
    total: paths.length,
    ok: results.ok.length,
    redirect: results.redirect.length,
    notFound: results.notFound.length,
    serverError: results.serverError.length,
    networkError: results.networkError.length,
    duplicates: duplicates.map(([p, count]) => ({ path: p, count })),
    details: results,
  };
  writeFileSync(
    path.join(ROOT, "scripts/link-audit/sitemap-check-results.json"),
    JSON.stringify(out, null, 2),
  );

  const failed =
    results.notFound.length > 0 ||
    results.serverError.length > 0 ||
    results.networkError.length > 0 ||
    duplicates.length > 0;
  return !failed;
}

// Avec un argument : BASE d'un serveur déjà démarré (usage orchestré, cf.
// full-audit.mjs — un seul serveur pour toute la chaîne). Sans argument :
// démarre et arrête son propre serveur (usage autonome, `npm run test:routes:sitemap`).
const explicitBase = process.argv[2];
if (!explicitBase) ensureBuild();
const ok = explicitBase ? await run(explicitBase) : await withServer(run);

if (!ok) {
  console.error("\nÉchec : sitemap.xml contient au moins une anomalie (voir ci-dessus).");
  process.exit(1);
}
console.log("\nsitemap.xml : OK.");
