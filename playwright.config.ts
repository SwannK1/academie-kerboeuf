import { defineConfig, devices } from "@playwright/test";

/**
 * Suite minimale et isolée : panneaux latéraux enseignants uniquement.
 * Aucune dépendance à des données externes ni à Auth/Admin/Supabase.
 */
// Port surchargeable : un autre projet local peut déjà occuper 3100
// (reuseExistingServer réutiliserait alors son serveur).
const PORT = process.env.E2E_PORT ?? "3100";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: "retain-on-failure",
  },
  webServer: {
    command: `npm run build && npm run start -- -p ${PORT}`,
    url: `http://127.0.0.1:${PORT}`,
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
      use: { ...devices["iPad (gen 7)"] },
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"] },
    },
  ],
});
