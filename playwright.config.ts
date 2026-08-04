import { defineConfig, devices } from "@playwright/test";

/**
 * Suite de non-régression : panneaux latéraux enseignants, hydratation,
 * intégrité des liens/routes, parcours publics et accessibilité.
 * Aucune dépendance à des données externes ni à Auth/Admin/Supabase.
 *
 * PLAYWRIGHT_CHROMIUM_PATH permet de pointer vers un exécutable Chromium
 * pré-installé (utile dans les environnements sandbox où la révision
 * embarquée par @playwright/test n'est pas celle pré-téléchargée).
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "retain-on-failure",
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_PATH
      ? {
          executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH,
          args: ["--no-sandbox"],
        }
      : undefined,
  },
  webServer: {
    // build:if-needed évite un rebuild redondant quand `validate` (ou un
    // audit de routes) a déjà buildé juste avant.
    command: "npm run build:if-needed && npm run start -- -p 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "tablet-chromium",
      // Le préréglage iPad vise WebKit par défaut ; ce projet veut
      // explicitement le moteur Chromium (cf. son nom) avec la forme
      // d'écran/le toucher d'une tablette.
      use: { ...devices["iPad (gen 7)"], browserName: "chromium" },
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"] },
    },
  ],
});
