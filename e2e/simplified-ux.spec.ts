import { expect, test } from "@playwright/test";

test.describe("parcours UX simplifiés", () => {
  test("l’accueil présente deux décisions dominantes", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      /Que voulez-vous faire aujourd’hui|Que voulez-vous faire aujourd'hui/,
    );
    await expect(page.getByRole("link", { name: /Je cherche une ressource/ })).toHaveAttribute(
      "href",
      "/ressources",
    );
    await expect(page.getByRole("link", { name: /Je prépare ma classe/ })).toHaveAttribute(
      "href",
      "/enseignants",
    );
  });

  test("Ressources mène directement de CE1 à Français", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Je cherche une ressource/ }).click();
    await page.locator('main a[href="/primaire/ce1"]').click();
    await page.locator('main a[href="/primaire/ce1/matieres/francais"]').click();

    await expect(page).toHaveURL("/primaire/ce1/matieres/francais");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Français");
    await expect(page.getByText("CE1 · Cycle 2")).toBeVisible();
    await expect(page.getByText("CE1 · Cycle 3")).toHaveCount(0);
  });

  test("CE1 et CM2 partagent le même modèle matière", async ({ page }) => {
    for (const route of ["/primaire/ce1", "/primaire/cm2"]) {
      await page.goto(route);
      await expect(page.getByRole("link", { name: /Français/ }).first()).toBeVisible();
      await expect(page.getByRole("link", { name: /Mathématiques/ }).first()).toBeVisible();
    }
  });

  test("l’espace enseignants expose quatre entrées principales", async ({ page }) => {
    await page.goto("/enseignants");

    const hubs = ["Mon année", "Ma semaine", "Ma classe", "Tous les outils"];
    for (const hub of hubs) {
      await expect(page.getByRole("link", { name: new RegExp(hub) })).toBeVisible();
    }
    await expect(page.locator("main h2")).toHaveCount(4);
  });

  test("le parcours semaine conserve le cahier journal", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Je prépare ma classe/ }).click();
    await page.getByRole("link", { name: /Ma semaine/ }).click();
    await page.getByRole("link", { name: /Cahier journal/ }).click();

    await expect(page).toHaveURL("/enseignants/cahier-journal");
  });

  test("les titres utilisent une seule fois le nom du site", async ({ page }) => {
    for (const route of ["/enseignants", "/primaire/ce1", "/primaire/ce1/matieres/francais"]) {
      await page.goto(route);
      expect((await page.title()).match(/Académie Kerboeuf/g)).toHaveLength(1);
    }
  });
});
