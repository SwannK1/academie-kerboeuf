import { test, expect } from "@playwright/test";

/**
 * Anomalie réelle trouvée et corrigée pendant ce chantier : 97 pages
 * dupliquaient le suffixe de marque dans leur <title> (le layout racine
 * l'ajoute déjà via title.template). Ces tests empêchent son retour.
 *
 * Remarque : ni balise canonical ni JSON-LD ne sont implémentés sur le site
 * à ce jour (vérifié à l'inspection) — ces tests ne portent donc que sur ce
 * qui existe réellement (title, description, robots, OpenGraph, Twitter).
 */

const REPRESENTATIVE_PAGES = [
  "/",
  "/ressources",
  "/missions-recentes",
  "/primaire/cm2/matieres/francais",
  "/lycee/seconde/missions/equation-premier-degre",
];

test.describe("Titres de page", () => {
  for (const path of REPRESENTATIVE_PAGES) {
    test(`${path} — un seul <title>, pas de suffixe de marque dupliqué`, async ({ page }) => {
      await page.goto(path);
      const titles = await page.locator("title").allTextContents();
      expect(titles).toHaveLength(1);

      const title = titles[0];
      expect(title.trim().length).toBeGreaterThan(0);
      // Le suffixe " | Académie Kerboeuf" ne doit apparaître qu'une fois.
      const occurrences = title.split("Académie Kerboeuf").length - 1;
      expect(occurrences).toBeLessThanOrEqual(1);
    });
  }
});

test.describe("Métadonnées principales", () => {
  for (const path of ["/", "/ressources", "/primaire/cm2/matieres/francais"]) {
    test(`${path} — description non vide, robots, OpenGraph et Twitter présents`, async ({ page }) => {
      await page.goto(path);

      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(description?.trim().length).toBeGreaterThan(0);

      const robots = await page.locator('meta[name="robots"]').first().getAttribute("content");
      expect(robots).toContain("index");

      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
      await expect(page.locator('meta[name="twitter:card"]')).toHaveCount(1);
    });
  }

  test("un fil d'Ariane structuré (nav sémantique) est présent sur une page profonde", async ({ page }) => {
    await page.goto("/primaire/cm2/matieres/francais");
    const breadcrumb = page.getByRole("navigation", { name: "Fil d’Ariane" });
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb.locator("li")).not.toHaveCount(0);
  });
});

test.describe("Fichiers techniques et page 404", () => {
  test("/robots.txt répond et référence le sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("Sitemap:");
  });

  test("/sitemap.xml répond avec un contenu XML non vide", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("<loc>");
  });

  test("une page inexistante renvoie un 404 propre, sans instruction d'indexation contradictoire", async ({ page }) => {
    const response = await page.goto("/cette-page-n-existe-vraiment-pas");
    expect(response?.status()).toBe(404);
    await expect(page.locator("main")).toBeVisible();

    const robotsTags = await page.locator('meta[name="robots"]').allTextContents();
    const robotsContents = await page
      .locator('meta[name="robots"]')
      .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("content")));
    // Toutes les directives robots présentes doivent aller dans le même
    // sens (noindex) — aucune ne doit autoriser l'indexation.
    for (const content of robotsContents) {
      expect(content?.toLowerCase()).toContain("noindex");
    }
    expect(robotsTags.length + robotsContents.length).toBeGreaterThan(0);
  });
});
