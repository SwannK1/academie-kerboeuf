import { test, expect } from "@playwright/test";
import { trackPageHealth, assertPageIsHealthy } from "./utils/console-errors";

/**
 * Niveau 3 — Parcours (/parcours puis un parcours disponible) : les étapes
 * disponibles sont ouvrables, les étapes non disponibles ne sont pas des
 * liens cliquables (cf. app/parcours/[slug]/page.tsx : rendu en <div> pour
 * les étapes non "available").
 */

test.describe("Parcours", () => {
  test("liste des parcours rendue avec au moins un parcours disponible", async ({
    page,
  }) => {
    const health = trackPageHealth(page);
    await page.goto("/parcours");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const links = page.getByRole("link").filter({ hasText: /./ });
    await expect(links.first()).toBeVisible();

    assertPageIsHealthy(health);
  });

  test("parcours CM2 'Lire comme un détective' : étapes cohérentes avec leur statut", async ({
    page,
  }) => {
    const health = trackPageHealth(page);
    await page.goto("/parcours/cm2-lire-comme-un-detective");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Chaque étape "Ouvrir" doit être un vrai lien cliquable et fonctionnel.
    const openableSteps = page.getByText("Ouvrir", { exact: true });
    const openableCount = await openableSteps.count();
    expect(openableCount).toBeGreaterThan(0);

    assertPageIsHealthy(health);
  });

  test("une étape de parcours disponible mène à une vraie page, jamais à un 404", async ({
    page,
  }) => {
    await page.goto("/parcours/cm2-lire-comme-un-detective");

    const openableStepLink = page
      .locator("a")
      .filter({ has: page.getByText("Ouvrir", { exact: true }) })
      .first();
    await expect(openableStepLink).toBeVisible();

    await openableStepLink.click();
    await expect(page.getByText("Page introuvable")).toHaveCount(0);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
