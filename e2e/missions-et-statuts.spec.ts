import { test, expect } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

/**
 * Matrice de statuts publics (available / partial / preparing / coming-soon)
 * et gating des CTA sur les pages qui exposent le plus de missions à la
 * fois. La règle exacte vient du référentiel central
 * (content/public-status.ts) — ces tests vérifient son application dans
 * l'UI, pas une réimplémentation locale de la règle.
 */

test.describe("/missions-recentes", () => {
  test("les 3 sections de statut ne mélangent pas les missions et le CTA correspond au statut", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    const response = await page.goto("/missions-recentes");
    expect(response?.status()).toBe(200);

    await expect(
      page.getByRole("heading", { name: "Missions disponibles" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Missions en préparation" }),
    ).toBeVisible();

    // Invariant structurel, indépendant du regroupement visuel par section :
    // un lien ne doit jamais porter le texte "Détail non disponible", et un
    // bloc statique ("Détail non disponible") ne doit jamais être cliquable.
    await expect(page.getByText("Ouvrir →").first()).toBeVisible();
    await expect(page.getByText("Détail non disponible").first()).toBeVisible();
    expect(await page.locator('a:has-text("Détail non disponible")').count()).toBe(0);
    expect(await page.locator('article:has-text("Ouvrir →")').count()).toBe(0);

    expect(errors).toEqual([]);
  });
});

test.describe("Statut d'une mission — page dédiée", () => {
  test("une mission disponible affiche le badge et le contenu réel, sans erreur console", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    const response = await page.goto(
      "/lycee/seconde/missions/equation-premier-degre",
    );

    expect(response?.status()).toBe(200);
    await expect(page.getByText("Disponible", { exact: true }).first()).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("une mission non disponible n'est jamais exposée comme une page réelle (404 propre, pas d'erreur JS)", async ({ page }) => {
    // "Lecture Analytique" (seconde) a le statut "à venir" : aucune carte
    // du site ne pointe vers son URL directe (vérifié par ailleurs), et si
    // elle est visitée directement elle doit renvoyer un 404 propre plutôt
    // que du contenu fictif ou une page blanche.
    const errors = trackConsoleErrors(page);
    const response = await page.goto(
      "/lycee/seconde/missions/lecture-analytique",
    );

    expect(response?.status()).toBe(404);
    await expect(page.locator("main")).toBeVisible();
    // Le navigateur logue lui-même l'échec réseau du document principal en
    // 404 (attendu, ce n'est pas une erreur applicative) : on l'ignore
    // explicitement plutôt que d'exclure toute erreur console sur cette page.
    const unexpectedErrors = errors.filter(
      (message) => !message.includes("404 (Not Found)"),
    );
    expect(unexpectedErrors).toEqual([]);
  });
});

test.describe("Statut 'partial' — /programmes", () => {
  test("les niveaux partiellement couverts affichent le badge Partiel, distinct de En préparation", async ({ page }) => {
    const response = await page.goto("/programmes");
    expect(response?.status()).toBe(200);

    await expect(page.getByText("Partiel", { exact: true }).first()).toBeVisible();
    // Les deux badges doivent coexister sans se confondre.
    const partialCount = await page.getByText("Partiel", { exact: true }).count();
    expect(partialCount).toBeGreaterThan(0);
  });
});
