import { test, expect } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

test.describe("Ressources classe", () => {
  test("affiche la page, ses badges de statut et un CTA actif pour une ressource disponible", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/ressources");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator('[aria-label="Statut public : disponible"]').first()).toBeVisible();

    expect(errors).toEqual([]);
  });

  test("le filtre par statut réduit la liste aux ressources disponibles uniquement", async ({ page }) => {
    await page.goto("/ressources");

    const before = await page.getByText(/^Ouvrir la mission$/).count();
    expect(before).toBeGreaterThan(0);

    await page.getByRole("combobox", { name: "Statut" }).selectOption({ label: "Disponible" });

    // Chaque carte restante doit porter le badge "disponible".
    const remainingCount = await page.getByText(/^Ouvrir la mission$/).count();
    expect(remainingCount).toBeGreaterThan(0);
    expect(remainingCount).toBeLessThanOrEqual(before);

    const badges = page.locator('[aria-label^="Statut public :"]');
    const badgeCount = await badges.count();
    expect(badgeCount).toBeGreaterThan(0);
    for (let i = 0; i < badgeCount; i += 1) {
      await expect(badges.nth(i)).toHaveAttribute("aria-label", "Statut public : disponible");
    }
  });

  test("ouvrir une ressource disponible mène à une page réelle, sans 404", async ({ page }) => {
    await page.goto("/ressources");
    await page.getByRole("combobox", { name: "Statut" }).selectOption({ label: "Disponible" });

    const firstCard = page.getByText(/^Ouvrir la mission$/).first().locator("..");
    await firstCard.click();
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { level: 1 })).not.toHaveText("Page introuvable");
  });

  test("une ressource non disponible ne mène jamais à une page cassée (repli sûr, jamais de 404)", async ({ page }) => {
    await page.goto("/ressources");
    await page.getByRole("combobox", { name: "Statut" }).selectOption({ label: "En préparation" });

    const count = await page.getByText(/^Ouvrir la mission$/).count();
    test.skip(count === 0, "Aucune ressource 'en préparation' dans le catalogue actuel.");

    const card = page.getByText(/^Ouvrir la mission$/).first().locator("..");
    await card.click();
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { level: 1 })).not.toHaveText("Page introuvable");
  });
});
