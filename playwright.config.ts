import { defineConfig, devices } from "@playwright/test";

/**
 * Suite minimale et isolée : panneaux latéraux enseignants uniquement.
 * Aucune dépendance à des données externes ni à Auth/Admin/Supabase.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    // Environnement d'exécution : Chromium pré-installé, potentiellement
    // d'une build différente de celle attendue par la version de
    // @playwright/test du dépôt. Sans ce chemin explicite, Playwright tente
    // de télécharger un nouveau binaire (bloqué hors ligne dans ce type
    // d'environnement). --no-sandbox : requis pour lancer Chromium en tant
    // que root dans ce conteneur (le projet tablet-chromium/iPad plantait
    // sinon au lancement — desktop-chromium n'est pas concerné par la même
    // combinaison de profil, mais le flag est sans risque dans ce
    // conteneur isolé à locataire unique).
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
      ? {
          executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
          args: ["--no-sandbox"],
        }
      : {},
  },
  webServer: {
    // Build de production uniquement si absent (jamais reconstruit à chaque
    // exécution de la suite) — E2E finaux toujours sur build de prod, jamais
    // sur `next dev`.
    command: "test -f .next/BUILD_ID || npm run build; npm run start -- -p 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "tablet-chromium",
      use: { ...devices["iPad (gen 7)"] },
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"] },
    },
  ],
});
