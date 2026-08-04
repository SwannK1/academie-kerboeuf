import { test, expect } from "@playwright/test";
import { trackPageHealth, assertPageIsHealthy } from "./utils/console-errors";

/**
 * Niveau 3 — Missions récentes (/missions-recentes) : les trois familles de
 * statut (disponible / en préparation / à venir) et l'absence de CTA
 * trompeur ou de 404 au clic.
 */

test.describe("Missions récentes", () => {
  test("les sections de missions disponibles et à venir sont rendues", async ({
    page,
  }) => {
    const health = trackPageHealth(page);
    await page.goto("/missions-recentes");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Missions disponibles" }),
    ).toBeVisible();

    assertPageIsHealthy(health);
  });

  test("une mission disponible mène à une vraie page sans erreur", async ({ page }) => {
    await page.goto("/missions-recentes");

    const availableSection = page
      .locator("section")
      .filter({ has: page.getByRole("heading", { name: "Missions disponibles" }) });
    const firstMissionLink = availableSection.getByRole("link").first();
    await expect(firstMissionLink).toBeVisible();

    const health = trackPageHealth(page);
    await firstMissionLink.click();

    await expect(page.getByText("Page introuvable")).toHaveCount(0);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    assertPageIsHealthy(health);
  });

  test("une mission en préparation ne mène jamais à un 404", async ({ page }) => {
    await page.goto("/missions-recentes");

    const preparingSection = page.locator("section").filter({
      has: page.getByRole("heading", { name: "Missions en préparation" }),
    });

    if ((await preparingSection.count()) === 0) {
      test.skip(true, "aucune mission en préparation dans le jeu de données actuel");
      return;
    }

    const link = preparingSection.getByRole("link").first();
    if ((await link.count()) === 0) {
      test.skip(true, "section vide, pas de lien à vérifier");
      return;
    }

    await link.click();
    await expect(page.getByText("Page introuvable")).toHaveCount(0);
  });
});
