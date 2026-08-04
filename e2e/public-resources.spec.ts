import { test, expect } from "@playwright/test";
import { trackPageHealth, assertPageIsHealthy } from "./utils/console-errors";

/**
 * Niveau 3 — Ressources (/ressources) : filtres, statut visible, CTA cohérent
 * avec la disponibilité réelle (jamais de lien mort ni de 404).
 */

test.describe("Ressources", () => {
  test("catalogue rendu avec filtres et au moins une ressource", async ({ page }) => {
    const health = trackPageHealth(page);
    await page.goto("/ressources");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("combobox", { name: "Niveau" })).toBeVisible();
    await expect(page.getByRole("combobox", { name: "Matière" })).toBeVisible();
    await expect(page.getByRole("combobox", { name: "Statut" })).toBeVisible();

    const cards = page.getByRole("link", { name: /Ouvrir la mission/ });
    await expect(cards.first()).toBeVisible();

    assertPageIsHealthy(health);
  });

  test("filtrer par statut Disponible : chaque carte affichée est bien disponible", async ({
    page,
  }) => {
    await page.goto("/ressources");

    await page.getByRole("combobox", { name: "Statut" }).selectOption("available");

    const badges = page.locator('[aria-label="Statut public : disponible"]');
    const count = await badges.count();
    expect(count).toBeGreaterThan(0);

    // Aucun badge "à venir" ni "en préparation" ne doit rester visible dans le filtre.
    await expect(
      page.locator('[aria-label="Statut public : à venir"]'),
    ).toHaveCount(0);
    await expect(
      page.locator('[aria-label="Statut public : en préparation"]'),
    ).toHaveCount(0);
  });

  test("réinitialiser les filtres restaure le catalogue complet", async ({ page }) => {
    await page.goto("/ressources");
    const heading = page.getByRole("heading", { level: 2, name: /ressources?$/ });
    const initialText = await heading.textContent();

    await page.getByRole("combobox", { name: "Statut" }).selectOption("available");
    await page.getByRole("button", { name: "Réinitialiser" }).click();

    await expect(heading).toHaveText(initialText ?? "");
  });

  test("une ressource disponible mène à une vraie page, jamais à un 404", async ({
    page,
  }) => {
    await page.goto("/ressources");
    await page.getByRole("combobox", { name: "Statut" }).selectOption("available");

    const firstCard = page.getByRole("link", { name: /Ouvrir la mission/ }).first();
    const health = trackPageHealth(page);
    await firstCard.click();

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Page introuvable")).toHaveCount(0);
    assertPageIsHealthy(health);
  });
});
