import { defineConfig } from "@playwright/test";

/**
 * Configuration séparée pour les tests unitaires (fonctions pures).
 * Aucun serveur, aucun navigateur : exécution en quelques secondes.
 * Les tests E2E (navigateur + serveur) restent dans playwright.config.ts.
 */
export default defineConfig({
  testDir: "./tests/unit",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? "github" : "list",
});
