import { test } from "node:test";
import assert from "node:assert/strict";
import {
  publishedSubdomainPages,
  getPublishedSubdomainPage,
  isPublishedSubdomainPage,
} from "@/content/levels/published-subdomain-pages";

/**
 * Niveau 2 — registre content/levels/published-subdomain-pages.ts.
 * Ce registre pilote à la fois la route générique canonique
 * /primaire/[level]/programmes/[domain]/[subdomain] et le redirect de
 * compatibilité /primaire/cp/[domainSlug]/[subdomainSlug] (cf. AGENTS.md,
 * section "Standard catalogue CP / CE1 / CE2").
 */

test("chaque entrée publiée expose une route générique canonique cohérente avec ses champs", () => {
  assert.ok(publishedSubdomainPages.length > 0);
  for (const page of publishedSubdomainPages) {
    assert.equal(
      page.route,
      `/primaire/${page.level}/programmes/${page.domain}/${page.subdomain}`,
    );
  }
});

test("getPublishedSubdomainPage retrouve chaque entrée par ses trois clés", () => {
  for (const page of publishedSubdomainPages) {
    const found = getPublishedSubdomainPage(page.level, page.domain, page.subdomain);
    assert.deepEqual(found, page);
    assert.equal(isPublishedSubdomainPage(page.level, page.domain, page.subdomain), true);
  }
});

test("une combinaison level/domain/subdomain inconnue ne retourne rien", () => {
  assert.equal(getPublishedSubdomainPage("cp", "inconnu", "inconnu"), undefined);
  assert.equal(isPublishedSubdomainPage("cp", "inconnu", "inconnu"), false);
});

test("l'URL canonique CP publiée est /primaire/cp/programmes/francais/lecture-comprehension", () => {
  const cpPage = getPublishedSubdomainPage("cp", "francais", "lecture-comprehension");
  assert.ok(cpPage);
  assert.equal(cpPage!.route, "/primaire/cp/programmes/francais/lecture-comprehension");
});

test("aucune route publiée ne pointe vers l'ancienne route courte /primaire/cp/[domainSlug]/[subdomainSlug]", () => {
  for (const page of publishedSubdomainPages) {
    assert.ok(
      page.route.includes("/programmes/"),
      `la route publiée ${page.route} doit utiliser le format générique canonique`,
    );
  }
});
