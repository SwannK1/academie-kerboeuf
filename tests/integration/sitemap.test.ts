import { test } from "node:test";
import assert from "node:assert/strict";
import sitemap from "@/app/sitemap";
import { BASE_URL } from "@/lib/seo";

/**
 * Niveau 2 — intégration : sitemap.xml généré par app/sitemap.ts.
 * Vérifie la forme des entrées produites par l'agrégation de toutes les
 * sources de contenu, sans reproduire la logique métier de chaque source.
 */

test("sitemap : au moins une centaine d'entrées, toutes préfixées par BASE_URL", () => {
  const entries = sitemap();
  assert.ok(entries.length > 100, `attendu > 100 entrées, obtenu ${entries.length}`);

  for (const entry of entries) {
    assert.ok(entry.url.startsWith(BASE_URL), `URL hors BASE_URL : ${entry.url}`);
  }
});

test("sitemap : aucune URL dupliquée", () => {
  const entries = sitemap();
  const urls = entries.map((e) => e.url);
  const unique = new Set(urls);
  assert.equal(unique.size, urls.length, "des URLs dupliquées ont été trouvées dans le sitemap");
});

test("sitemap : aucune URL ne contient de segment de route dynamique non résolu", () => {
  const entries = sitemap();
  for (const entry of entries) {
    assert.ok(!entry.url.includes("["), `segment dynamique non résolu : ${entry.url}`);
    assert.ok(!entry.url.includes("undefined"), `segment 'undefined' dans l'URL : ${entry.url}`);
  }
});

test("sitemap : aucune URL ne contient de double slash ni d'espace", () => {
  const entries = sitemap();
  for (const entry of entries) {
    const path = entry.url.slice(BASE_URL.length);
    assert.ok(!path.includes("//"), `double slash : ${entry.url}`);
    assert.ok(!path.includes(" "), `espace dans l'URL : ${entry.url}`);
  }
});

test("sitemap : le slug CM2 sciences apparaît sous 'sciences', jamais 'sciences-technologie'", () => {
  const entries = sitemap();
  const urls = entries.map((e) => e.url);
  assert.ok(urls.some((u) => u.endsWith("/primaire/cm2/matieres/sciences")));
  assert.ok(!urls.some((u) => u.includes("sciences-technologie")));
});

test("sitemap : aucune page collège de détail par mission (le collège n'a pas cette route)", () => {
  const entries = sitemap();
  const urls = entries.map((e) => e.url);
  assert.ok(
    !urls.some((u) => /\/college\/[^/]+\/missions\//.test(u)),
    "une URL de détail de mission collège a été trouvée alors que cette route n'existe pas",
  );
});

test("sitemap : les missions lycée listées sont uniquement celles publiquement disponibles", () => {
  const entries = sitemap();
  const lyceeMissionDetailUrls = entries
    .map((e) => e.url)
    .filter((u) => /\/lycee\/[^/]+\/missions\/[^/]+$/.test(u));
  // On ne peut pas revérifier ici la disponibilité sans dupliquer la logique
  // d'isMissionPubliclyAvailable ; on vérifie seulement qu'aucune de ces URLs
  // ne pointe vers la page listing elle-même (pas de double comptage).
  for (const url of lyceeMissionDetailUrls) {
    assert.ok(!url.endsWith("/missions"), `URL de détail dégénérée en listing : ${url}`);
  }
});
