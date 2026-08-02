import { existsSync } from "node:fs";
import { defineConfig, devices } from "@playwright/test";

/**
 * Suite E2E : parcours publics, gouvernance de statuts/CTA, SEO technique,
 * accessibilité automatisée et outils enseignants (panneaux latéraux,
 * plan de classe, emploi du temps, cahier journal).
 */

// Certains environnements locaux fournissent un binaire Chromium
// pré-installé dont la révision ne correspond pas à celle attendue par la
// version de @playwright/test épinglée (le téléchargement automatique est
// alors indisponible/à éviter). Si présent, on le réutilise explicitement ;
// sinon Playwright résout le binaire normalement (CI avec
// `playwright install`).
const LOCAL_CHROMIUM_PATH = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const usingLocalChromium = existsSync(LOCAL_CHROMIUM_PATH);
const executablePath = usingLocalChromium ? LOCAL_CHROMIUM_PATH : undefined;
// Ce binaire local tourne dans un conteneur en root : le sandbox Chromium
// refuse de démarrer sans --no-sandbox dans ce cas précis (cause fréquente
// d'échecs "Target page, context or browser has been closed" sous charge).
// N'appliqué que pour ce binaire local de secours, jamais pour un
// environnement CI avec un Chromium correctement installé.
const launchArgs = usingLocalChromium ? ["--no-sandbox"] : [];

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // Marge de sécurité au-delà du défaut (30s) : sous charge, avec les 3
  // profils d'appareil lancés en parallèle, une navigation peut ponctuellement
  // dépasser 30s sans que ce soit une régression applicative.
  timeout: 45_000,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run build && npm run start -- -p 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"], launchOptions: { executablePath, args: launchArgs } },
    },
    {
      name: "tablet-chromium",
      use: {
        ...devices["iPad (gen 7)"],
        // Le preset "iPad (gen 7)" cible WebKit par défaut ; le nom du
        // projet ("tablet-chromium") indique l'intention réelle : garder le
        // viewport/UA/tactile de l'iPad mais avec le moteur Chromium.
        defaultBrowserType: "chromium",
        launchOptions: { executablePath, args: launchArgs },
      },
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"], launchOptions: { executablePath, args: launchArgs } },
    },
  ],
});
