import { test, expect } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

const PATH_SLUG = "seconde-reussir-son-entree-au-lycee";
const AVAILABLE_STEP = "Méthode Lycée";
const UNAVAILABLE_STEP = "Lecture Analytique";

test.describe("Parcours pédagogique — étapes disponibles vs non disponibles", () => {
  test("un parcours réel affiche ses étapes sans erreur console", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto(`/parcours/${PATH_SLUG}`);

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Titres d'étape (h2) : le même titre apparaît aussi dans les panneaux
    // latéraux "À projeter" / "À imprimer" (simples <li>), d'où le filtre
    // par niveau de titre pour cibler l'étape elle-même.
    await expect(page.getByRole("heading", { name: AVAILABLE_STEP, level: 2 })).toBeVisible();
    await expect(page.getByRole("heading", { name: UNAVAILABLE_STEP, level: 2 })).toBeVisible();

    expect(errors).toEqual([]);
  });

  test("une étape disponible est un lien ouvrable, avec un badge de statut cohérent", async ({ page }) => {
    await page.goto(`/parcours/${PATH_SLUG}`);

    const availableStep = page.getByRole("link", { name: new RegExp(AVAILABLE_STEP) });
    await expect(availableStep).toBeVisible();
    await expect(availableStep.getByText("Ouvrir")).toBeVisible();

    await availableStep.click();
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { level: 1 })).not.toHaveText("Page introuvable");
  });

  test("une étape non disponible n'est pas cliquable et affiche son statut public", async ({ page }) => {
    await page.goto(`/parcours/${PATH_SLUG}`);

    // L'étape non disponible ne doit exister qu'en tant que bloc statique,
    // jamais comme lien.
    const unavailableLink = page.getByRole("link", { name: new RegExp(UNAVAILABLE_STEP) });
    await expect(unavailableLink).toHaveCount(0);

    // h2 -> div englobant (titre + objectif) -> bloc de l'étape (contient le badge).
    const unavailableStep = page
      .getByRole("heading", { name: UNAVAILABLE_STEP, level: 2 })
      .locator("xpath=ancestor::div[.//span[@aria-label]][1]");
    await expect(unavailableStep.locator("[aria-label^='Statut public :']")).toBeVisible();
  });
});
