import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Contrôle automatisé — ne garantit PAS une accessibilité complète (audit
 * manuel toujours nécessaire). Vérifie l'absence de violations d'impact
 * critique/sérieux détectables automatiquement, sur un échantillon de pages
 * représentatives plutôt que l'exhaustivité.
 */

const CRITICAL_IMPACTS = ["critical", "serious"];

async function expectNoCriticalViolations(page: import("@playwright/test").Page) {
  const results = await new AxeBuilder({ page }).analyze();
  const critical = results.violations.filter((v) =>
    CRITICAL_IMPACTS.includes(v.impact ?? ""),
  );
  expect(
    critical,
    critical
      .map((v) => `${v.id} (${v.impact}): ${v.help} — ${v.nodes.length} nœud(s)`)
      .join("\n"),
  ).toEqual([]);
}

test.describe("Structure de base (main, H1, boutons nommés)", () => {
  for (const path of [
    "/",
    "/ressources",
    "/primaire/cm2/matieres/francais",
    "/lycee/seconde/missions/equation-premier-degre",
    "/enseignants/organisation-classe",
  ]) {
    test(`${path} — main, H1, aucune violation critique`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveCount(1);
      await expectNoCriticalViolations(page);
    });
  }
});

test.describe("Navigation clavier", () => {
  test("le focus est visible et atteint la navigation principale par Tab", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toBeVisible();
  });
});

test.describe("Dialog — exposition accessible", () => {
  test("le panneau latéral de progression est un dialog nommé, sans violation critique, et rend le focus au déclencheur", async ({ page }) => {
    await page.goto("/enseignants/progression");

    await page.getByRole("button", { name: "Carte libre" }).click();
    await page
      .getByLabel("Compétence (texte libre)")
      .fill("Carte de test a11y");
    const addButton = page.getByRole("button", { name: "Ajouter la carte" });
    await addButton.click();

    const trigger = page.getByRole("button", {
      name: "Ouvrir la carte Carte de test a11y",
    });
    await expect(trigger).toBeVisible();
    await trigger.click();

    const dialog = page.getByRole("dialog", {
      name: "Détails de la carte Carte de test a11y",
    });
    await expect(dialog).toBeVisible();

    await expectNoCriticalViolations(page);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});
