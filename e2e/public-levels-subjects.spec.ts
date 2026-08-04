import { test, expect } from "@playwright/test";
import { trackPageHealth, assertPageIsHealthy } from "./utils/console-errors";

/**
 * Niveau 3 — Un exemple représentatif par étage (primaire / collège / lycée)
 * et un exemple de matière disponible : rendu sans erreur, H1 unique.
 */

test.describe("Niveaux et matières — échantillon représentatif", () => {
  test("primaire : CM2", async ({ page }) => {
    const health = trackPageHealth(page);
    await page.goto("/primaire/cm2");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    assertPageIsHealthy(health);
  });

  test("collège : 6e", async ({ page }) => {
    const health = trackPageHealth(page);
    await page.goto("/college/6e");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    assertPageIsHealthy(health);
  });

  test("lycée : Seconde", async ({ page }) => {
    const health = trackPageHealth(page);
    await page.goto("/lycee/seconde");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    assertPageIsHealthy(health);
  });

  test("matière disponible : CM2 mathématiques", async ({ page }) => {
    const health = trackPageHealth(page);
    await page.goto("/primaire/cm2/matieres/mathematiques");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    assertPageIsHealthy(health);
  });

  test("matière disponible : CM2 sciences (slug canonique 'sciences')", async ({
    page,
  }) => {
    const health = trackPageHealth(page);
    const response = await page.goto("/primaire/cm2/matieres/sciences");
    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    assertPageIsHealthy(health);
  });
});
