import { test, expect } from "@playwright/test";

/**
 * Niveau 3 — SEO : titre unique sans double suffixe, description, canonical,
 * OpenGraph, Twitter, JSON-LD, robots.txt, sitemap.xml, page 404.
 */

const SAMPLE_PAGES = [
  { path: "/", canonical: undefined },
  { path: "/ressources", canonical: "/ressources" },
  { path: "/missions-recentes", canonical: "/missions-recentes" },
  { path: "/primaire/cm2", canonical: "/primaire/cm2" },
  { path: "/parcours/cm2-lire-comme-un-detective", canonical: "/parcours/cm2-lire-comme-un-detective" },
];

test.describe("SEO — pages publiques", () => {
  for (const { path } of SAMPLE_PAGES) {
    test(`${path} : titre unique, sans double suffixe "Académie Kerboeuf"`, async ({
      page,
    }) => {
      await page.goto(path);
      const title = await page.title();

      expect(title.length).toBeGreaterThan(0);
      const suffixOccurrences = title.split("Académie Kerboeuf").length - 1;
      expect(suffixOccurrences).toBe(1);
    });

    test(`${path} : description meta non vide`, async ({ page }) => {
      await page.goto(path);
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(description?.trim().length ?? 0).toBeGreaterThan(0);
    });

    test(`${path} : OpenGraph et Twitter renseignés`, async ({ page }) => {
      await page.goto(path);
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
      const twitterTitle = await page
        .locator('meta[name="twitter:title"]')
        .getAttribute("content");

      expect(ogTitle?.trim().length ?? 0).toBeGreaterThan(0);
      expect(twitterTitle?.trim().length ?? 0).toBeGreaterThan(0);
    });
  }

  test("/ressources : canonical correspond au chemin réel", async ({ page }) => {
    await page.goto("/ressources");
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toMatch(/\/ressources$/);
  });

  test("page avec fil d'Ariane : JSON-LD BreadcrumbList présent et valide", async ({
    page,
  }) => {
    await page.goto("/ressources");
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

  test("/robots.txt : autorise le crawl et référence le sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("Allow: /");
    expect(body).toContain("sitemap.xml");
  });

  test("/sitemap.xml : XML valide avec de nombreuses URLs", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("<urlset");
    const urlCount = (body.match(/<loc>/g) ?? []).length;
    expect(urlCount).toBeGreaterThan(100);
  });

  test("page 404 : titre dédié et noindex", async ({ page }) => {
    const response = await page.goto("/cette-page-n-existe-vraiment-pas-xyz");
    expect(response?.status()).toBe(404);

    await expect(page.getByRole("heading", { name: "Page introuvable" })).toBeVisible();
    // Next.js peut injecter plusieurs balises <meta name="robots"> pour une
    // route 404 (celle du framework + celle de la page) : on vérifie qu'au
    // moins une empêche l'indexation, pas qu'il y en a exactement une.
    const robotsMetas = page.locator('meta[name="robots"]');
    const contents = await robotsMetas.evaluateAll((elements) =>
      elements.map((el) => el.getAttribute("content") ?? ""),
    );
    expect(contents.length).toBeGreaterThan(0);
    expect(contents.some((content) => content.includes("noindex"))).toBe(true);
  });
});
