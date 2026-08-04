import { test, expect } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

test.describe("Accueil", () => {
  test("charge sans erreur, expose un h1 et un point d'entrée principal", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    const res = await page.goto("/");
    expect(res?.status()).toBe(200);

    await expect(page.locator("main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    expect(errors).toEqual([]);
  });

  // La page d'accueil a trois zones de navigation vers chaque niveau (menu
  // principal, cartes "Univers", pied de page) : on cible explicitement la
  // carte "Univers" (le parcours principal) plutôt qu'un nom de lien ambigu.
  async function clickUniverseCard(page: import("@playwright/test").Page, label: string) {
    await page
      .getByRole("heading", { name: label, level: 2 })
      .locator("xpath=ancestor::a[1]")
      .click();
  }

  test("navigation vers Primaire, Collège et Lycée", async ({ page }) => {
    await page.goto("/");

    await clickUniverseCard(page, "Primaire");
    await expect(page).toHaveURL(/\/primaire$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await page.goto("/");
    await clickUniverseCard(page, "Collège");
    await expect(page).toHaveURL(/\/college$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await page.goto("/");
    await clickUniverseCard(page, "Lycée");
    await expect(page).toHaveURL(/\/lycee$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
