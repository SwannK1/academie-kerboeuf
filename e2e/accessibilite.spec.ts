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

  test("le plan de classe : la confirmation de remplacement d'un plan est un alertdialog modal, se ferme avec Échap et rend le focus", async ({ page }) => {
    await page.goto("/enseignants/organisation-classe");

    // La confirmation n'apparaît que s'il existe déjà des tables à remplacer.
    await page.getByRole("button", { name: "+ Ajouter une table" }).click();

    const trigger = page.getByRole("button", { name: "Rangées" });
    await trigger.click();

    const dialog = page.getByRole("alertdialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");

    await expectNoCriticalViolations(page);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("formations : la confirmation de suppression est un alertdialog modal, se ferme avec Échap et rend le focus", async ({ page }) => {
    await page.goto("/enseignants/formations");

    await page.getByRole("button", { name: "Créer une entrée" }).click();
    // La nouvelle entrée s'ouvre en édition : la fermer pour révéler le
    // bouton "Supprimer" de la fiche récapitulative.
    await page.getByRole("button", { name: "Terminer" }).click();
    const trigger = page.getByRole("button", { name: "Supprimer" }).first();
    await trigger.click();

    const dialog = page.getByRole("alertdialog", { name: "Confirmer la suppression" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");

    await expectNoCriticalViolations(page);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("photocopies : la confirmation de suppression est un alertdialog modal, se ferme avec Échap et rend le focus", async ({ page }) => {
    await page.goto("/enseignants/photocopies");

    await page.getByLabel("Titre").fill("Fiche de test a11y");
    await page.getByRole("button", { name: "Ajouter à la liste" }).click();

    const trigger = page.getByRole("button", { name: "Supprimer" }).first();
    await trigger.click();

    const dialog = page.getByRole("alertdialog", { name: "Confirmer la suppression" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");

    await expectNoCriticalViolations(page);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});
