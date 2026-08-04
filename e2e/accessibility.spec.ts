import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { trackConsoleErrors } from "./utils/console-errors";

/**
 * Accessibilité automatisée (axe-core) sur un échantillon représentatif :
 * accueil, ressources, une matière, une mission, un outil enseignant, une
 * page avec dialog. Aucune règle axe n'est désactivée globalement — toute
 * exception doit être documentée ici, avec sa justification.
 */

const PAGES = [
  { name: "accueil", path: "/" },
  { name: "ressources", path: "/ressources" },
  { name: "matière (CM2 français)", path: "/primaire/cm2/matieres/francais" },
  { name: "mission (CM2 disponible)", path: "/primaire/cm2/missions/mission-inference" },
  { name: "outil enseignant (programmation annuelle)", path: "/enseignants/programmation/annuelle" },
];

for (const { name, path } of PAGES) {
  test(`axe : ${name} (${path}) — 0 violation`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();

    expect(
      results.violations,
      results.violations
        .map((v) => `${v.id} (${v.impact}): ${v.help} — ${v.nodes.length} nœud(s)`)
        .join("\n"),
    ).toEqual([]);
  });
}

test.describe("Structure de base", () => {
  for (const { name, path } of PAGES) {
    test(`${name} : main, h1 unique, boutons nommés`, async ({ page }) => {
      await page.goto(path);

      await expect(page.locator("main")).toBeVisible();
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);

      const buttons = page.getByRole("button");
      const count = await buttons.count();
      for (let i = 0; i < count; i += 1) {
        const accessibleName = await buttons.nth(i).evaluate((el) => el.textContent?.trim() || el.getAttribute("aria-label"));
        expect(accessibleName, `bouton sans nom accessible (index ${i})`).toBeTruthy();
      }
    });
  }
});

test.describe("Menu mobile", () => {
  test("le menu mobile s'ouvre, expose son état via aria-expanded, et se ferme au clic sur un lien", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    const errors = trackConsoleErrors(page);
    await page.goto("/");

    const toggle = page.getByRole("button", { name: "Ouvrir le menu" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    const mobileNav = page.locator("#mobile-navigation");
    await expect(mobileNav).toBeVisible();

    await mobileNav.getByRole("link", { name: "Primaire" }).click();
    await expect(page).toHaveURL(/\/primaire$/);

    expect(errors).toEqual([]);
  });
});

test.describe("Dialog — gestion du focus", () => {
  test("le panneau 'Détails de la carte' expose role=dialog, déplace le focus à l'ouverture et le restitue au déclencheur à la fermeture", async ({
    page,
  }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/progression");

    await page.getByRole("button", { name: "Carte libre" }).click();
    await page.getByLabel("Compétence (texte libre)").fill("Carte focus e2e");
    const trigger = page.getByRole("button", { name: "Ajouter la carte" });
    await trigger.click();

    const card = page.getByRole("button", { name: "Ouvrir la carte Carte focus e2e" });
    await card.click();

    const panel = page.getByRole("dialog", { name: "Détails de la carte Carte focus e2e" });
    await expect(panel).toBeVisible();

    // Le focus doit être entré dans le dialog à l'ouverture (pas resté sur
    // la page derrière, ni sur <body>).
    await expect(panel.locator(":focus")).toHaveCount(1);

    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();

    // Le focus doit revenir sur l'élément qui a ouvert le dialog (la carte),
    // pas se perdre sur <body>.
    await expect(card).toBeFocused();

    expect(errors).toEqual([]);
  });

  test("le panneau 'Modifier la carte' (programmation annuelle) gère le focus de la même façon", async ({
    page,
  }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/programmation/annuelle");

    const freeCardSection = page.locator("section", {
      has: page.getByRole("heading", { name: "Carte libre" }),
    });
    await freeCardSection.getByRole("button", { name: "Ajouter une carte" }).click();
    await freeCardSection.getByLabel("Titre").fill("Carte focus annuelle e2e");
    await freeCardSection.getByLabel("Matière").selectOption({ index: 1 });
    await page.getByRole("button", { name: "Ajouter la carte" }).click();

    const cardRow = page.locator("li", { hasText: "Carte focus annuelle e2e" }).first();
    const editButton = cardRow.getByRole("button", { name: "Modifier" });
    await editButton.click();

    const panel = page.getByRole("dialog", { name: "Modifier la carte Carte focus annuelle e2e" });
    await expect(panel).toBeVisible();
    await expect(panel.locator(":focus")).toHaveCount(1);

    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    await expect(editButton).toBeFocused();

    expect(errors).toEqual([]);
  });
});
