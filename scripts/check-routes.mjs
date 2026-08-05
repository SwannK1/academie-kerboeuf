#!/usr/bin/env node
/**
 * Audit des routes et liens internes du site.
 *
 * --quick   : ne vérifie que la liste de routes critiques (rapide, ~15s).
 * (défaut)  : "quick" + crawl 1 niveau depuis les pages de seed (routes
 *             publiques importantes) pour vérifier tous les liens internes
 *             qu'elles exposent — sans visiter les ~420 routes une à une.
 * --no-build: réutilise le build .next existant au lieu d'en relancer un.
 * --base-url=<url> : réutilise un serveur déjà démarré (ignore build/serve).
 *
 * Arrête toujours le serveur qu'il a démarré, même en cas d'échec.
 */

import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const PORT = 3210;
const OWN_BASE_URL = `http://127.0.0.1:${PORT}`;
const args = process.argv.slice(2);
const isQuick = args.includes("--quick");
const noBuild = args.includes("--no-build");
const externalBaseArg = args.find((a) => a.startsWith("--base-url="));
const BASE_URL = externalBaseArg ? externalBaseArg.split("=")[1] : OWN_BASE_URL;
const reuseExternalServer = Boolean(externalBaseArg);

// Routes critiques — celles listées explicitement dans la validation
// fonctionnelle du chantier de tests (accueil, catalogues, outils
// enseignants, une mission disponible/non disponible, un parcours...).
const CRITICAL_ROUTES = [
  "/",
  "/ressources",
  "/missions-recentes",
  "/programmes",
  "/parcours",
  "/primaire",
  "/college",
  "/lycee",
  "/primaire/cm2/matieres/francais",
  "/college/6e",
  "/lycee/seconde/missions/equation-premier-degre",
  "/parcours/cm2-lire-comme-un-detective",
  "/enseignants",
  "/enseignants/programmation",
  "/enseignants/organisation-classe",
  "/enseignants/emploi-du-temps",
  "/enseignants/cahier-journal",
  "/professeurs",
  "/eleves",
  "/univers",
  "/carte",
  "/robots.txt",
  "/sitemap.xml",
];

// Pages "hub" dont on extrait les liens internes pour le mode complet.
const SEED_ROUTES = [
  "/",
  "/primaire",
  "/college",
  "/lycee",
  "/maternelle",
  "/ressources",
  "/missions-recentes",
  "/parcours",
  "/programmes",
  "/enseignants",
  "/professeurs",
  "/univers",
  "/carte",
];

const STATIC_FILE_EXTENSIONS = [".pdf", ".png", ".jpg", ".jpeg", ".svg", ".ico", ".webp"];

function isSkippable(href) {
  if (!href) return true;
  if (href.startsWith("#")) return true;
  if (href.startsWith("mailto:")) return true;
  if (href.startsWith("tel:")) return true;
  if (href.startsWith("javascript:")) return true;
  if (/^https?:\/\//i.test(href) && !href.startsWith(BASE_URL) && !href.startsWith(OWN_BASE_URL)) {
    return true; // lien externe
  }
  return false;
}

function normalizeHref(href) {
  const withoutHash = href.split("#")[0];
  if (!withoutHash) return null;
  if (withoutHash.startsWith(BASE_URL)) return withoutHash.slice(BASE_URL.length) || "/";
  if (withoutHash.startsWith("/")) return withoutHash;
  return null; // chemins relatifs non ancrés : ignorés (rares en Next.js App Router)
}

function extractLinks(html) {
  const links = new Set();
  const re = /<a\s[^>]*href="([^"]+)"/gi;
  let match;
  while ((match = re.exec(html))) {
    const normalized = normalizeHref(match[1]);
    if (normalized && !isSkippable(match[1])) {
      links.add(normalized);
    }
  }
  return links;
}

async function waitForServer(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { method: "GET" });
      if (res.ok || res.status < 500) return true;
    } catch {
      // pas encore prêt
    }
    await delay(500);
  }
  return false;
}

function startServer() {
  return new Promise((resolve, reject) => {
    const child = spawn(
      "npm",
      ["run", "start", "--", "-p", String(PORT)],
      { stdio: "pipe", detached: true },
    );
    let settled = false;
    child.stdout.on("data", (chunk) => {
      if (!settled && chunk.toString().includes("Ready")) {
        settled = true;
        resolve(child);
      }
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (!settled) reject(new Error(`Le serveur s'est arrêté (code ${code}) avant d'être prêt`));
    });
    // Filet de sécurité si le message "Ready" n'est jamais capturé.
    delay(15000).then(() => {
      if (!settled) {
        settled = true;
        resolve(child);
      }
    });
  });
}

async function checkUrl(path) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, { redirect: "manual" });
    return { path, status: res.status, contentType: res.headers.get("content-type") ?? "" };
  } catch (error) {
    return { path, status: 0, error: String(error) };
  }
}

function classify(status) {
  if (status === 0) return "error";
  if (status >= 200 && status < 300) return "ok";
  if (status >= 300 && status < 400) return "redirect";
  if (status === 404) return "not-found";
  if (status >= 500) return "server-error";
  return "other";
}

async function main() {
  let server = null;

  try {
    if (!reuseExternalServer) {
      if (!noBuild) {
        console.log("→ Build de production...");
        await new Promise((resolve, reject) => {
          const build = spawn("npm", ["run", "build"], { stdio: "inherit" });
          build.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`build a échoué (code ${code})`))));
        });
      }

      console.log(`→ Démarrage du serveur sur le port ${PORT}...`);
      server = await startServer();
      const ready = await waitForServer(BASE_URL, 60_000);
      if (!ready) throw new Error("Le serveur n'a jamais répondu.");
    }

    console.log(`→ Vérification de ${CRITICAL_ROUTES.length} routes critiques...`);
    const criticalResults = await Promise.all(CRITICAL_ROUTES.map(checkUrl));

    let discoveredResults = [];
    if (!isQuick) {
      console.log(`→ Extraction des liens depuis ${SEED_ROUTES.length} pages de seed...`);
      const discovered = new Set();
      for (const seed of SEED_ROUTES) {
        const res = await fetch(`${BASE_URL}${seed}`);
        if (!res.ok) continue;
        const html = await res.text();
        for (const link of extractLinks(html)) discovered.add(link);
      }
      console.log(`→ ${discovered.size} liens internes uniques trouvés, vérification...`);
      discoveredResults = await Promise.all([...discovered].map(checkUrl));
    }

    const allResults = [...criticalResults, ...discoveredResults];
    const byKind = { ok: [], redirect: [], "not-found": [], "server-error": [], error: [], other: [] };
    for (const result of allResults) {
      const isFile = STATIC_FILE_EXTENSIONS.some((ext) => result.path.endsWith(ext));
      byKind[classify(result.status)].push({ ...result, isFile });
    }

    console.log("\n=== Résultat ===");
    console.log(`OK (2xx)        : ${byKind.ok.length}`);
    console.log(`Redirections    : ${byKind.redirect.length}`);
    console.log(`404             : ${byKind["not-found"].length}`);
    console.log(`Erreurs serveur : ${byKind["server-error"].length}`);
    console.log(`Erreurs réseau  : ${byKind.error.length}`);

    const failures = [...byKind["not-found"], ...byKind["server-error"], ...byKind.error];
    if (failures.length > 0) {
      console.log("\n✗ Échecs :");
      for (const f of failures) {
        console.log(`  ${f.status || "ERR"}  ${f.path}${f.error ? ` (${f.error})` : ""}`);
      }
      process.exitCode = 1;
    } else {
      console.log("\n✓ Aucun lien mort détecté.");
    }

    if (byKind.redirect.length > 0) {
      console.log("\nℹ Redirections rencontrées (informatif, non bloquant) :");
      for (const r of byKind.redirect) console.log(`  ${r.status}  ${r.path}`);
    }
  } finally {
    if (server?.pid) {
      // `detached: true` donne au serveur (npm + next-server) son propre
      // groupe de processus : tuer -pid tue tout l'arbre, pas seulement
      // npm, pour ne jamais laisser next-server orphelin.
      try {
        process.kill(-server.pid, "SIGTERM");
      } catch {
        server.kill("SIGTERM");
      }
    }
  }
}

main()
  .catch((error) => {
    console.error("Échec de l'audit des routes :", error);
    process.exitCode = 1;
  })
  .finally(() => {
    // Sortie explicite : évite qu'un descripteur hérité (pipe stdio du
    // serveur tué) ne laisse le process Node ouvert indéfiniment.
    process.exit(process.exitCode ?? 0);
  });
