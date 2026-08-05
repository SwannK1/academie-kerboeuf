import { test, expect } from "@playwright/test";
import sitemap from "@/app/sitemap";
import { BASE_URL } from "@/lib/seo";

/**
 * app/sitemap.ts agrège ~15 sources de contenu ; seul son statut HTTP et sa
 * forme XML globale sont vérifiés ailleurs (e2e/seo-technique.spec.ts). Ces
 * tests protègent le contenu structurel (dédoublonnage, segments non
 * résolus, cohérence des règles de routage déjà testées côté mission-registry).
 */

test.describe("sitemap() — structure des entrées", () => {
  test("plus de 100 entrées, toutes préfixées par BASE_URL", () => {
    const entries = sitemap();
    expect(entries.length).toBeGreaterThan(100);
    for (const entry of entries) {
      expect(entry.url.startsWith(BASE_URL)).toBe(true);
    }
  });

  test("aucune URL dupliquée", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  test("aucun segment de route dynamique non résolu ni 'undefined'", () => {
    const entries = sitemap();
    for (const entry of entries) {
      expect(entry.url).not.toContain("[");
      expect(entry.url).not.toContain("undefined");
    }
  });

  test("le slug CM2 sciences apparaît sous 'sciences', jamais 'sciences-technologie'", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls.some((u) => u.endsWith("/primaire/cm2/matieres/sciences"))).toBe(true);
    expect(urls.some((u) => u.includes("sciences-technologie"))).toBe(false);
  });

  test("aucune URL de détail de mission collège (route inexistante)", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls.some((u) => /\/college\/[^/]+\/missions\//.test(u))).toBe(false);
  });
});
