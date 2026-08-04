import { test, expect } from "@playwright/test";
import { trackPageHealth, assertPageIsHealthy } from "./utils/console-errors";

/**
 * Niveau 3 — Accueil : premier point d'entrée public. Vérifie le rendu
 * principal, le H1 unique, la navigation primaire/collège/lycée, et
 * l'absence d'erreur d'hydratation/console/réseau interne.
 */

test.describe("Accueil", () => {
  test("rendu principal : H1 unique et zone <main>", async ({ page }) => {
    const health = trackPageHealth(page);
    await page.goto("/");

    await expect(page.locator("main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);

    assertPageIsHealthy(health);
  });

  test("navigation principale : liens primaire, collège et lycée présents et fonctionnels", async ({
    page,
  }, testInfo) => {
    // Les liens de navigation desktop (SiteHeader.tsx) sont dans un conteneur
    // `hidden lg:flex` : invisibles (donc absents de l'arbre d'accessibilité)
    // en dessous du breakpoint lg. Le menu mobile équivalent est couvert par
    // le test dédié dans accessibility.spec.ts.
    testInfo.skip(
      testInfo.project.name !== "desktop-chromium",
      "navigation desktop masquée sous le breakpoint lg (couverte par le menu mobile ailleurs)",
    );

    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Navigation principale" });

    await expect(nav.getByRole("link", { name: "Primaire" })).toHaveAttribute(
      "href",
      "/primaire",
    );
    await expect(nav.getByRole("link", { name: "Collège" })).toHaveAttribute(
      "href",
      "/college",
    );
    await expect(nav.getByRole("link", { name: "Lycée" })).toHaveAttribute(
      "href",
      "/lycee",
    );

    const health = trackPageHealth(page);
    await nav.getByRole("link", { name: "Primaire" }).click();
    await expect(page).toHaveURL(/\/primaire$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    assertPageIsHealthy(health);
  });

  test("aucune erreur console ni d'hydratation au chargement", async ({ page }) => {
    const health = trackPageHealth(page);
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    assertPageIsHealthy(health);
  });
});
