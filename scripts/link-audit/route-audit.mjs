// Orchestrateur d'audit de routes/liens, réutilisant extract-links.mjs,
// verify-links.mjs et http-check.mjs (aucune logique de crawl recréée ici).
//
// Modes :
//   quick — échantillon de routes critiques (quick-audit.mjs) sur un
//           serveur de prod déjà buildé (build uniquement si absent).
//   full  — pipeline complet : extraction depuis le HTML généré,
//           vérification contre le manifest + public/, puis vérification
//           HTTP réelle de toutes les routes internes trouvées.
//
// Dans les deux cas : build seulement si nécessaire (pas de rebuild
// redondant), démarrage/arrêt propre du serveur, code de sortie non nul si
// une anomalie est détectée.
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import net from "node:net";

const ROOT = process.cwd();
const PORT = 3100;
const BASE = `http://127.0.0.1:${PORT}`;
const mode = process.argv[2] === "quick" ? "quick" : "full";

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", shell: false, ...options });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} a échoué (code ${code})`));
    });
    child.on("error", reject);
  });
}

async function ensureBuild() {
  if (existsSync(path.join(ROOT, ".next", "server"))) {
    console.log("Build .next déjà présent — pas de rebuild.");
    return;
  }
  console.log("Aucun build trouvé, exécution de `npm run build`...");
  await run("npm", ["run", "build"]);
}

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const res = await fetch(BASE);
      if (res.status < 500) return;
    } catch {
      // serveur pas encore prêt
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error("Le serveur n'a pas répondu après 60s.");
}

function isPortFree(port) {
  return new Promise((resolve) => {
    const socket = net.connect({ port, host: "127.0.0.1" });
    socket.once("connect", () => {
      socket.destroy();
      resolve(false);
    });
    socket.once("error", () => resolve(true));
  });
}

/**
 * Attend que le port soit réellement libre avant de démarrer un nouveau
 * serveur. `next start` peut démarrer des processus enfants qui survivent
 * un court instant à l'arrêt du process parent (cf. stopServer) : sonder le
 * port directement est plus fiable que se fier uniquement à l'événement
 * "exit" de l'ancien serveur, notamment quand deux audits s'enchaînent
 * immédiatement (test:quick puis test:routes).
 */
async function waitForPortFree(port, maxAttempts = 15) {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    if (await isPortFree(port)) return;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

function startServer() {
  // `next start` démarre un processus "next-server" enfant qui survit à
  // l'arrêt du process `next` CLI de premier niveau (il est réattaché à
  // PID 1 et continue d'écouter sur le port). `detached: true` fait de ce
  // process le chef d'un nouveau groupe de processus, ce qui permet à
  // stopServer() de terminer tout le groupe (donc aussi le "next-server"
  // enfant) via `process.kill(-pid, signal)` plutôt que le seul CLI.
  const server = spawn(
    path.join(ROOT, "node_modules", ".bin", "next"),
    ["start", "-p", String(PORT)],
    { stdio: "inherit", shell: false, detached: true },
  );
  return server;
}

function killProcessGroup(server, signal) {
  try {
    process.kill(-server.pid, signal);
  } catch {
    // Le groupe n'existe peut-être déjà plus, ou plus de permission : au
    // pire on retente sur le seul process direct.
    try {
      server.kill(signal);
    } catch {
      // process déjà mort
    }
  }
}

/** Termine le serveur (et tout son groupe de processus) et attend réellement sa sortie. */
function stopServer(server) {
  return new Promise((resolve) => {
    if (!server || server.exitCode !== null || server.signalCode !== null) {
      resolve();
      return;
    }
    server.once("exit", () => resolve());
    killProcessGroup(server, "SIGTERM");
    setTimeout(() => {
      if (server.exitCode === null && server.signalCode === null) {
        killProcessGroup(server, "SIGKILL");
      }
    }, 3000);
  });
}

async function main() {
  await ensureBuild();
  await waitForPortFree(PORT);

  const server = startServer();
  let exitCode = 0;

  // Filet de sécurité pour une sortie anormale (Ctrl+C, exception non
  // rattrapée) : best-effort, synchrone, ne remplace pas stopServer().
  const killSync = () => {
    if (server && server.exitCode === null && server.signalCode === null) {
      killProcessGroup(server, "SIGKILL");
    }
  };
  process.on("exit", killSync);
  process.on("SIGINT", () => {
    killSync();
    process.exit(130);
  });

  try {
    await waitForServer();

    if (mode === "quick") {
      await run("node", ["scripts/link-audit/quick-audit.mjs", BASE]);
    } else {
      await run("node", ["scripts/link-audit/extract-links.mjs"]);
      await run("node", ["scripts/link-audit/verify-links.mjs"]);
      await run("node", ["scripts/link-audit/http-check.mjs", BASE]);

      const verifyResults = JSON.parse(
        readFileSync(path.join(ROOT, "scripts/link-audit/verify-results.json"), "utf8"),
      );
      const httpResults = JSON.parse(
        readFileSync(path.join(ROOT, "scripts/link-audit/http-check-results.json"), "utf8"),
      );

      const brokenFiles = verifyResults.brokenFiles?.length ?? 0;
      const brokenRoutes = verifyResults.brokenRoutes?.length ?? 0;
      const notFound = httpResults.notFound?.length ?? 0;
      const serverErrors = httpResults.serverError?.length ?? 0;

      if (brokenFiles > 0 || brokenRoutes > 0 || notFound > 0 || serverErrors > 0) {
        console.log(
          `\nAudit complet en échec : ${brokenFiles} fichier(s) absent(s), ${brokenRoutes} route(s) sans correspondance, ${notFound} 404, ${serverErrors} erreur(s) serveur.`,
        );
        exitCode = 1;
      } else {
        console.log("\nAudit complet OK : aucun fichier absent, aucune route ni 404 ni erreur serveur.");
      }
    }
  } catch (error) {
    console.error(error.message ?? error);
    exitCode = 1;
  } finally {
    await stopServer(server);
  }

  process.exitCode = exitCode;
}

main();
