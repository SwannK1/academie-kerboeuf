import { defineConfig } from "@playwright/test";

/**
 * Suite unitaire : logique pure (statuts publics, générateurs d'URL,
 * sanitization). Aucun navigateur, aucun serveur — ne doit dépendre que
 * des modules de `content/` et `lib/`. Séparée de playwright.config.ts
 * (E2E, qui a besoin d'un serveur de production) pour rester rapide et
 * exécutable sans build préalable.
 */
export default defineConfig({
  testDir: "./tests/unit",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? "github" : "list",
  workers: undefined,
});
