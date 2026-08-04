import { test, expect } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

test.describe("Niveaux — pages d'index", () => {
  for (const route of ["/primaire", "/college", "/lycee"]) {
    test(`${route} charge sans erreur console et expose un h1`, async ({ page }) => {
      const errors = trackConsoleErrors(page);
      const res = await page.goto(route);
      expect(res?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(errors).toEqual([]);
    });
  }

  test("une page de matière (CM2 français) charge correctement", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/primaire/cm2/matieres/francais");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("une mission disponible (CM2) est ouvrable et affiche son contenu", async ({ page }) => {
    await page.goto("/primaire/cm2/missions/mission-inference");
    await expect(page.getByRole("heading", { level: 1 })).not.toHaveText("Page introuvable");
  });
});

test.describe("Catalogue de missions par niveau — cartes disponibles vs non disponibles", () => {
  test("/lycee/seconde/missions : une mission disponible est ouvrable, une mission à venir affiche 'Détail non disponible' et n'est pas un lien", async ({
    page,
  }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/lycee/seconde/missions");

    const availableCard = page.getByRole("link", { name: /Méthode Lycée/ });
    await expect(availableCard).toBeVisible();

    const unavailableCard = page.getByText("Lecture Analytique").locator("../..");
    await expect(unavailableCard.getByText("Détail non disponible")).toBeVisible();
    await expect(page.getByRole("link", { name: /Lecture Analytique/ })).toHaveCount(0);

    expect(errors).toEqual([]);
  });
});

test.describe("Régression — slug de matière 'sciences' (/programmation)", () => {
  test("le lien Sciences et technologie du CM2 pointe vers /primaire/cm2/matieres/sciences (jamais sciences-technologie)", async ({
    page,
  }) => {
    await page.goto("/programmation");

    const link = page.getByRole("link", { name: /Sciences et technologie/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", "/primaire/cm2/matieres/sciences");

    await link.click();
    await expect(page).toHaveURL(/\/primaire\/cm2\/matieres\/sciences$/);
    await expect(page.getByRole("heading", { level: 1 })).not.toHaveText("Page introuvable");
  });
});
