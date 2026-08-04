import { test, expect } from "@playwright/test";

/**
 * SEO technique sur un échantillon représentatif. Ne fige aucune
 * description mot pour mot — vérifie uniquement les propriétés
 * structurelles (non-vide, absence de double suffixe, présence des
 * balises), pas leur contenu exact.
 */

const PAGES = [
  "/",
  "/ressources",
  "/college",
  "/primaire/cm2/matieres/francais",
  "/primaire/cm2/missions/mission-inference",
  "/parcours/seconde-reussir-son-entree-au-lycee",
  "/enseignants/programmation/annuelle",
];

for (const path of PAGES) {
  test(`SEO — ${path} : titre unique, description, canonical, OG/Twitter, robots`, async ({
    page,
  }) => {
    await page.goto(path);

    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    // Pas de double suffixe : "X | Académie Kerboeuf" ne doit apparaître
    // qu'une seule fois dans le titre.
    expect(title.match(/Académie Kerboeuf/g)?.length ?? 0).toBeLessThanOrEqual(1);

    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description?.trim().length ?? 0).toBeGreaterThan(0);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toBeTruthy();
    expect(canonical).toContain(path === "/" ? "academie-kerboeuf.fr" : path);

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
    const ogDescription = await page
      .locator('meta[property="og:description"]')
      .getAttribute("content");
    expect(ogTitle?.trim().length ?? 0).toBeGreaterThan(0);
    expect(ogDescription?.trim().length ?? 0).toBeGreaterThan(0);

    const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute("content");
    expect(twitterTitle?.trim().length ?? 0).toBeGreaterThan(0);

    const robots = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robots).toContain("index");
    expect(robots).toContain("follow");
  });
}

test("JSON-LD Organization + WebSite sur la page d'accueil, syntaxiquement valide", async ({
  page,
}) => {
  await page.goto("/");
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(scripts.length).toBeGreaterThanOrEqual(2);

  const parsed = scripts.map((s) => JSON.parse(s));
  expect(parsed.some((p) => p["@type"] === "Organization")).toBe(true);
  expect(parsed.some((p) => p["@type"] === "WebSite")).toBe(true);
  for (const entry of parsed) {
    expect(entry["@context"]).toBe("https://schema.org");
  }
});

test("JSON-LD BreadcrumbList présent et valide sur une page avec fil d'Ariane", async ({
  page,
}) => {
  await page.goto("/ressources");
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  const breadcrumb = scripts.map((s) => JSON.parse(s)).find((p) => p["@type"] === "BreadcrumbList");

  expect(breadcrumb, "aucun script JSON-LD BreadcrumbList trouvé").toBeTruthy();
  expect(Array.isArray(breadcrumb.itemListElement)).toBe(true);
  expect(breadcrumb.itemListElement.length).toBeGreaterThan(0);
  for (const [index, item] of breadcrumb.itemListElement.entries()) {
    expect(item["@type"]).toBe("ListItem");
    expect(item.position).toBe(index + 1);
  }
});

test("robots.txt et sitemap.xml sont accessibles et cohérents", async ({ request }) => {
  const robotsRes = await request.get("/robots.txt");
  expect(robotsRes.status()).toBe(200);
  const robotsBody = await robotsRes.text();
  expect(robotsBody).toContain("Sitemap:");
  expect(robotsBody.toLowerCase()).toContain("user-agent");

  const sitemapRes = await request.get("/sitemap.xml");
  expect(sitemapRes.status()).toBe(200);
  const sitemapBody = await sitemapRes.text();
  const urls = [...sitemapBody.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  expect(urls.length).toBeGreaterThan(0);

  const uniqueUrls = new Set(urls);
  expect(uniqueUrls.size, "le sitemap ne doit contenir aucune URL dupliquée").toBe(urls.length);
});

test("page 404 : aucune contradiction d'indexation (noindex explicite, jamais index,follow)", async ({
  page,
}) => {
  const res = await page.goto("/cette-page-nexiste-vraiment-pas");
  expect(res?.status()).toBe(404);

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  // Next.js peut émettre plusieurs balises robots pour une 404 (la sienne +
  // celle explicite de la page) : aucune ne doit jamais dire "index".
  const robotsValues = await page.locator('meta[name="robots"]').evaluateAll((els) =>
    els.map((el) => el.getAttribute("content")),
  );
  expect(robotsValues.length).toBeGreaterThan(0);
  for (const value of robotsValues) {
    expect(value).toContain("noindex");
    expect(value).not.toMatch(/(?<!no)index/);
  }
});
