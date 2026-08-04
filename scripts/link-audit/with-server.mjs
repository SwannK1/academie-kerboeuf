// Démarre un unique serveur `next start` de production, exécute `run(baseUrl)`,
// puis arrête le serveur — y compris si `run` échoue ou lève. Usage temporaire
// pour l'audit d'intégrité des routes/liens : ne fait pas partie du build.
//
// Invoque le binaire local (node_modules/.bin/next) plutôt que `npx next`,
// qui peut tenter une résolution réseau même quand le paquet est déjà
// installé localement — inutile ici et source de blocages en environnement
// au réseau restreint.
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const DEFAULT_PORT = 3202;
const NEXT_BIN = path.join(process.cwd(), "node_modules", ".bin", "next");

/** Build de production uniquement si `.next` est absent — jamais à chaque exécution. */
export function ensureBuild() {
  const buildId = path.join(process.cwd(), ".next", "BUILD_ID");
  if (existsSync(buildId)) return;

  console.log("Aucun build de production trouvé (.next/BUILD_ID absent) : `npm run build`...");
  const result = spawnSync("npm", ["run", "build"], { stdio: "inherit" });
  if (result.status !== 0) {
    throw new Error("npm run build a échoué — impossible de lancer l'audit.");
  }
}

async function waitForServer(baseUrl, { timeoutMs, isAlive }) {
  const started = Date.now();
  while (true) {
    if (!isAlive()) {
      throw new Error("next start s'est arrêté prématurément.");
    }
    try {
      const res = await fetch(baseUrl, { signal: AbortSignal.timeout(2_000) });
      if (res.status < 500) return;
    } catch {
      // Pas encore prêt à accepter des connexions — on continue de sonder.
    }
    if (Date.now() - started > timeoutMs) {
      throw new Error(`next start n'a pas répondu dans les ${timeoutMs}ms impartis.`);
    }
    await new Promise((r) => setTimeout(r, 250));
  }
}

export async function withServer(run, { port = DEFAULT_PORT, timeoutMs = 60_000 } = {}) {
  const baseUrl = `http://127.0.0.1:${port}`;
  const child = spawn(NEXT_BIN, ["start", "-p", String(port)], {
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env,
  });

  let output = "";
  child.stdout.on("data", (chunk) => (output += chunk.toString()));
  child.stderr.on("data", (chunk) => (output += chunk.toString()));

  const stop = () =>
    new Promise((resolve) => {
      if (child.exitCode !== null) return resolve();
      child.once("exit", () => resolve());
      child.kill("SIGTERM");
      setTimeout(() => {
        if (child.exitCode === null) child.kill("SIGKILL");
      }, 5_000);
    });

  try {
    await waitForServer(baseUrl, {
      timeoutMs,
      isAlive: () => child.exitCode === null,
    }).catch((err) => {
      throw new Error(`${err.message}\n${output}`);
    });

    return await run(baseUrl);
  } finally {
    await stop();
  }
}
