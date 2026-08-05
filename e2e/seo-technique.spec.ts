import { test, expect } from "@playwright/test";

/**
 * Anomalie réelle trouvée et corrigée pendant ce chantier : 97 pages
 * dupliquaient le suffixe de marque dans leur <title> (le layout racine
 * l'ajoute déjà via title.template). Ces tests empêchent son retour.
 *
 * canonical (lib/seo.ts, buildPageMetadata) et JSON-LD (Organization/WebSite
 * dans app/layout.tsx, BreadcrumbList dans components/navigation/breadcrumb.tsx)
 * ont été ajoutés par la finalisation SEO technique mais n'étaient pas
 * couverts par cette suite — corrigé ci-dessous.
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

test.describe("Canonical et JSON-LD", () => {
  for (const path of ["/", "/ressources", "/primaire/cm2/matieres/francais"]) {
    test(`${path} — balise canonical présente, unique et cohérente avec le chemin`, async ({ page }) => {
      await page.goto(path);
      const canonicalLinks = page.locator('link[rel="canonical"]');
      await expect(canonicalLinks).toHaveCount(1);
      const canonical = await canonicalLinks.getAttribute("href");
      expect(canonical).toBeTruthy();
      // "/" est normalisée sans slash final par la résolution de metadataBase
      // de Next.js ("https://academie-kerboeuf.fr", pas ".../").
      const expected =
        path === "/"
          ? "https://academie-kerboeuf.fr"
          : `https://academie-kerboeuf.fr${path}`;
      expect(canonical).toBe(expected);
    });
  }

  test("/ — title, description, OpenGraph et Twitter cohérents avec la marque", async ({ page }) => {
    await page.goto("/");

    const title = await page.locator("title").textContent();
    expect(title?.trim().length).toBeGreaterThan(0);

    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description?.trim().length).toBeGreaterThan(0);

    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
    expect(ogUrl).toBe("https://academie-kerboeuf.fr");

    await expect(page.locator('meta[name="twitter:card"]')).toHaveCount(1);
    await expect(page.locator('meta[name="twitter:title"]')).toHaveCount(1);
    await expect(page.locator('meta[name="twitter:description"]')).toHaveCount(1);
  });

  test("JSON-LD Organization/WebSite présent sur toutes les pages (layout racine)", async ({ page }) => {
    await page.goto("/");
    const scripts = page.locator('script[type="application/ld+json"]');
    const count = await scripts.count();
    const contents = await Promise.all(
      Array.from({ length: count }, (_, i) => scripts.nth(i).textContent()),
    );
    expect(contents.some((raw) => raw?.includes('"@type":"Organization"'))).toBe(true);
    expect(contents.some((raw) => raw?.includes('"@type":"WebSite"'))).toBe(true);
  });

  test("JSON-LD BreadcrumbList valide sur une page profonde utilisant le fil d'Ariane", async ({
    page,
  }) => {
    await page.goto("/primaire/cm2/matieres/francais");
    const scripts = page.locator('script[type="application/ld+json"]');
    const count = await scripts.count();
    const contents = await Promise.all(
      Array.from({ length: count }, (_, i) => scripts.nth(i).textContent()),
    );
    const breadcrumbRaw = contents.find((raw) => raw?.includes("BreadcrumbList"));
    expect(breadcrumbRaw).toBeTruthy();

    const parsed = JSON.parse(breadcrumbRaw ?? "{}");
    expect(parsed["@type"]).toBe("BreadcrumbList");
    expect(Array.isArray(parsed.itemListElement)).toBe(true);
    expect(parsed.itemListElement.length).toBeGreaterThan(0);
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
