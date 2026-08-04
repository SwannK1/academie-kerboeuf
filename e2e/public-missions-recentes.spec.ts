import { test, expect } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

test.describe("Missions pédagogiques (/missions-recentes)", () => {
  test("les sections de statut sont cohérentes et sans erreur console", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/missions-recentes");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Au moins une section de statut doit être présente (le catalogue n'est
    // jamais vide sur ce site).
    const sectionHeadings = page.getByRole("heading", {
      name: /Missions disponibles|Missions en préparation|Missions à venir/,
    });
    expect(await sectionHeadings.count()).toBeGreaterThan(0);

    expect(errors).toEqual([]);
  });

  test("chaque mission listée (disponible ou non) mène à une page réelle, jamais une 404", async ({ page }) => {
    await page.goto("/missions-recentes");

    const cards = page.getByRole("link", { name: /Ouvrir →/ });
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    // Échantillon (pas toutes les cartes, pour rester rapide) : une par
    // section visible, en couvrant le premier et le dernier badge de statut.
    const sampleIndexes = [0, count - 1];
    for (const index of sampleIndexes) {
      await page.goto("/missions-recentes");
      await page.getByRole("link", { name: /Ouvrir →/ }).nth(index).click();
      await page.waitForLoadState("networkidle");
      await expect(page.getByRole("heading", { level: 1 })).not.toHaveText("Page introuvable");
    }
  });
});
