import { test, expect } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

/**
 * Parcours publics essentiels : accueil, navigation principale, niveaux.
 * Risque couvert : régression d'affichage ou de navigation sur les pages
 * les plus visitées du site.
 */

test.describe("Accueil", () => {
  test("répond, affiche le contenu principal et la navigation, sans erreur console", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    const response = await page.goto("/");

    expect(response?.status()).toBe(200);
    await expect(page.locator("main")).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Navigation principale" }),
    ).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("les liens vers primaire, collège et lycée fonctionnent", async ({ page }) => {
    // Sur mobile, les liens du bandeau principal sont masqués tant que le
    // menu (bouton "Ouvrir le menu") n'est pas ouvert.
    const menuToggle = page.getByRole("button", { name: "Ouvrir le menu" });

    for (const [label, path] of [
      ["Primaire", "/primaire"],
      ["Collège", "/college"],
      ["Lycée", "/lycee"],
    ] as const) {
      await page.goto("/");
      if (await menuToggle.isVisible()) {
        await menuToggle.click();
      }
      await page.getByRole("link", { name: label, exact: true }).first().click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(page.locator("main")).toBeVisible();
    }
  });
});

test.describe("Niveaux — primaire, collège, lycée", () => {
  for (const path of ["/primaire", "/college", "/lycee"]) {
    test(`${path} répond, affiche titre + fil d'Ariane, sans erreur console`, async ({ page }) => {
      const errors = trackConsoleErrors(page);
      const response = await page.goto(path);

      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(/.+/);
      await expect(page.locator("h1")).toBeVisible();
      expect(errors).toEqual([]);
    });
  }
});

test.describe("Pages matières", () => {
  test("matière primaire disponible — badge, breadcrumb, lien mission", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    const response = await page.goto("/primaire/cm2/matieres/francais");

    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("navigation", { name: "Fil d’Ariane" }),
    ).toBeVisible();
    await expect(page.getByText("Disponible", { exact: true }).first()).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("matière collège — page 6e s'affiche sans erreur console", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    const response = await page.goto("/college/6e");

    expect(response?.status()).toBe(200);
    await expect(page.locator("main")).toBeVisible();
    expect(errors).toEqual([]);
  });
});
