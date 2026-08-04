// Audit rapide : teste un échantillon critique fixe (voir critical-routes.mjs)
// contre un serveur de production unique. Objectif : quelques secondes, pas
// un crawl complet des 420 routes (voir full-audit.mjs pour ça).
// Usage temporaire pour l'audit d'intégrité des routes/liens.
import { withServer, ensureBuild } from "./with-server.mjs";
import { CRITICAL_ROUTES } from "./critical-routes.mjs";

async function run(baseUrl) {
  const results = [];
  for (const route of CRITICAL_ROUTES) {
    try {
      const res = await fetch(baseUrl + route, { redirect: "manual" });
      results.push({ route, status: res.status });
    } catch (e) {
      results.push({ route, status: null, error: String(e) });
    }
  }

  const failed = results.filter(
    (r) => r.status === null || r.status === 404 || r.status >= 500,
  );

  console.log(`Échantillon critique : ${results.length} routes testées.`);
  for (const r of results) {
    const label = r.status === null ? `ERREUR (${r.error})` : r.status;
    console.log(`  ${r.status !== null && r.status < 400 ? "✓" : "✗"} ${label}  ${r.route}`);
  }

  if (failed.length) {
    console.log(`\n${failed.length} anomalie(s) sur l'échantillon critique.`);
    return false;
  }
  console.log("\nÉchantillon critique : OK.");
  return true;
}

ensureBuild();
const ok = await withServer(run);
if (!ok) process.exit(1);
