import { test, expect } from "@playwright/test";
import {
  publishedSubdomainPages,
  getPublishedSubdomainPage,
  isPublishedSubdomainPage,
} from "@/content/levels/published-subdomain-pages";

/**
 * Registre pilotant la route générique canonique
 * /primaire/[level]/programmes/[domain]/[subdomain] et le redirect de
 * compatibilité /primaire/cp/[domainSlug]/[subdomainSlug] (cf. AGENTS.md,
 * "Standard catalogue CP / CE1 / CE2"). Non couvert ailleurs.
 */

test.describe("published-subdomain-pages — registre de routes canoniques", () => {
  test("chaque entrée expose une route cohérente avec ses champs", () => {
    expect(publishedSubdomainPages.length).toBeGreaterThan(0);
    for (const page of publishedSubdomainPages) {
      expect(page.route).toBe(
        `/primaire/${page.level}/programmes/${page.domain}/${page.subdomain}`,
      );
    }
  });

  test("getPublishedSubdomainPage retrouve chaque entrée par ses trois clés", () => {
    for (const page of publishedSubdomainPages) {
      const found = getPublishedSubdomainPage(page.level, page.domain, page.subdomain);
      expect(found).toEqual(page);
      expect(isPublishedSubdomainPage(page.level, page.domain, page.subdomain)).toBe(true);
    }
  });

  test("une combinaison inconnue ne retourne rien", () => {
    expect(getPublishedSubdomainPage("cp", "inconnu", "inconnu")).toBeUndefined();
    expect(isPublishedSubdomainPage("cp", "inconnu", "inconnu")).toBe(false);
  });

  test("l'URL canonique CP publiée est /primaire/cp/programmes/francais/lecture-comprehension", () => {
    const cpPage = getPublishedSubdomainPage("cp", "francais", "lecture-comprehension");
    expect(cpPage?.route).toBe("/primaire/cp/programmes/francais/lecture-comprehension");
  });
});
