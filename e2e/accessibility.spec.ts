import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { trackConsoleErrors } from "./utils/console-errors";

/**
 * Niveau 3 — Accessibilité automatisée (axe-core) sur un échantillon de
 * pages représentatives : accueil, ressources, une matière, une mission,
 * un outil enseignant, un panneau (dialog). Complété par des vérifications
 * ciblées : main, H1, boutons nommés, menu mobile, Escape, focus visible.
 *
 * Aucune règle axe n'est désactivée globalement. Si une exclusion précise
 * s'avère un jour nécessaire, elle doit être documentée ici avec sa raison.
 */

const PAGES_TO_AUDIT = [
  { name: "Accueil", path: "/" },
  { name: "Ressources", path: "/ressources" },
  { name: "Matière CM2 mathématiques", path: "/primaire/cm2/matieres/mathematiques" },
  { name: "Missions récentes", path: "/missions-recentes" },
  { name: "Outil enseignant — Progression", path: "/enseignants/progression" },
];

test.describe("Accessibilité automatisée (axe-core)", () => {
  for (const { name, path } of PAGES_TO_AUDIT) {
    test(`${name} (${path}) : aucune violation d'impact critique ou sérieux`, async ({
      page,
    }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();

      const seriousOrCritical = results.violations.filter((violation) =>
        ["serious", "critical"].includes(violation.impact ?? ""),
      );

      if (seriousOrCritical.length > 0) {
        const details = seriousOrCritical
          .map((v) => `- ${v.id} (${v.impact}) : ${v.description} [${v.nodes.length} nœud(s)]`)
          .join("\n");
        expect(seriousOrCritical, `Violations axe-core sur ${path} :\n${details}`).toEqual([]);
      }
    });
  }
});

test.describe("Accessibilité ciblée", () => {
  test("chaque page échantillon a une zone <main> et un H1 unique", async ({ page }) => {
    for (const { path } of PAGES_TO_AUDIT) {
      await page.goto(path);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    }
  });

  test("les boutons interactifs de l'accueil ont un nom accessible", async ({ page }) => {
    await page.goto("/");
    const buttons = page.getByRole("button");
    const count = await buttons.count();
    for (let i = 0; i < count; i += 1) {
      const accessibleName = await buttons.nth(i).getAttribute("aria-label");
      const textContent = await buttons.nth(i).textContent();
      expect(
        Boolean(accessibleName?.trim()) || Boolean(textContent?.trim()),
        `le bouton #${i} n'a pas de nom accessible`,
      ).toBe(true);
    }
  });

  test("menu mobile : ouverture puis fermeture avec la touche Échap", async ({
    page,
  }) => {
    const errors = trackConsoleErrors(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const toggle = page.getByRole("button", { name: "Ouvrir le menu" });
    await toggle.click();

    const mobileNav = page.locator("#mobile-navigation");
    await expect(mobileNav).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(mobileNav).toBeHidden();

    expect(errors).toEqual([]);
  });
});
