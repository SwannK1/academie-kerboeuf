import { expect, test, type Page } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

async function expectHealthyPage(page: Page, heading: string) {
  await expect(page.getByRole("heading", { name: heading, exact: true }).first()).toBeVisible();
  await expect(page.locator("body")).not.toContainText("Application error");
  const viewport = page.viewportSize();
  if (viewport && viewport.width < 600) {
    const sizes = await page.evaluate(() => ({
      body: document.body.scrollWidth,
      viewport: document.documentElement.clientWidth,
    }));
    expect(sizes.body).toBeLessThanOrEqual(sizes.viewport + 1);
  }
}

function expectNoAppErrors(errors: string[]) {
  // WebKit/iPad can report speculative Next.js prefetches cancelled by its
  // cross-origin checks. They do not originate from the teacher tool page.
  expect(errors.filter((error) => !error.includes("due to access control checks"))).toEqual([]);
}

test.describe("Outils enseignants — fiabilité annuelle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("programmation : création accentuée, refresh et impression", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/programmation/annuelle");
    await expectHealthyPage(page, "Programmation annuelle");

    const section = page.locator("section", { has: page.getByRole("heading", { name: "Carte libre" }) });
    await section.getByRole("button", { name: "Ajouter une carte" }).click();
    await section.getByLabel("Titre").fill("Écriture créative — récit très détaillé");
    await section.getByLabel("Matière").selectOption({ index: 1 });
    await page.getByRole("button", { name: "Ajouter la carte" }).click();
    await expect(page.getByText("Écriture créative — récit très détaillé").first()).toBeVisible();
    await page.reload();
    await expect(page.getByText("Écriture créative — récit très détaillé").first()).toBeVisible();
    await page.emulateMedia({ media: "print" });
    await expect(page.getByText("Écriture créative — récit très détaillé").first()).toBeVisible();
    expectNoAppErrors(errors);
  });

  test("progression : création, édition persistée et donnée invalide signalée", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/progression");
    await expectHealthyPage(page, "Progression de période");
    await page.getByRole("button", { name: "Carte libre" }).click();
    await page.getByLabel("Compétence (texte libre)").fill("Résoudre un problème à étapes");
    await page.getByRole("button", { name: "Ajouter la carte" }).click();
    await page.reload();
    await expect(page.getByRole("button", { name: "Ouvrir la carte Résoudre un problème à étapes" })).toBeVisible();
    expectNoAppErrors(errors);

    await page.evaluate(() => localStorage.setItem("progression-periode-kanban-v3", JSON.stringify({ cards: [{ id: 42 }] })));
    await page.reload();
    await expect(page.getByText(/cartes enregistrées étaient illisibles/i)).toBeVisible();
  });

  test("emploi du temps : refresh, conflit disponible et horaires invalides refusés", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/emploi-du-temps");
    await expectHealthyPage(page, "Emploi du temps hebdomadaire");
    await expect(page.getByLabel("Semaine affichée")).toContainText("Semaine réelle");
    await page.reload();
    await expect(page.getByLabel("Semaine affichée")).toContainText("Semaine réelle");
    await page.getByLabel("Fin de journée").fill("08:00");
    await expect(page.getByText(/Horaires non modifiés/)).toBeVisible();
    await page.emulateMedia({ media: "print" });
    await expect(page.getByText("Emploi du temps hebdomadaire").first()).toBeVisible();
    expectNoAppErrors(errors);
  });

  test("cahier journal : séance vide éditable, accents et conservation", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/cahier-journal");
    await expectHealthyPage(page, "Cahier journal");
    await page.getByRole("button", { name: /Ajouter une séance/i }).first().click();
    await page.getByLabel("Titre court").fill("Poésie — récitation à voix haute");
    await page.getByRole("button", { name: "Enregistrer" }).click();
    await expect(page.getByText("Poésie — récitation à voix haute").first()).toBeVisible();
    await page.reload();
    await expect(page.getByText("Poésie — récitation à voix haute").first()).toBeVisible();
    await page.emulateMedia({ media: "print" });
    await expect(page.getByText("Poésie — récitation à voix haute").first()).toBeVisible();
    expectNoAppErrors(errors);
  });

  test("cahier journal : envoyer une séance imprimable vers Photocopies pré-remplit la demande", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/cahier-journal");
    await expectHealthyPage(page, "Cahier journal");
    await page.getByRole("button", { name: /Ajouter une séance/i }).first().click();
    await page.getByLabel("Titre court").fill("Fiche exercices fractions");
    await page.getByLabel("Matière").selectOption("mathematiques");
    await page.getByLabel("Niveau").selectOption("ce1");
    await page.getByLabel("Support imprimable réellement disponible").check();
    await page.getByLabel("Nom du support").fill("Fiche fractions CE1");
    await page.getByLabel("Exemplaires").fill("26");
    await page.getByRole("button", { name: "Enregistrer" }).click();

    await expect(page.getByText("À imprimer cette semaine")).toBeVisible();
    await page.getByRole("link", { name: "Envoyer vers Photocopies →" }).click();

    await expectHealthyPage(page, "Préparer mes photocopies");
    await expect(page).toHaveURL("/enseignants/photocopies");
    await expect(page.getByLabel("Titre")).toHaveValue("Fiche fractions CE1");
    await expect(page.getByLabel("Matière (facultatif)")).toHaveValue("Mathématiques");
    await expect(page.getByLabel("Niveau (facultatif)")).toHaveValue("CE1");
    await expect(page.getByLabel("Nombre d’exemplaires")).toHaveValue("26");
    await expect(page.getByLabel("Nombre de pages")).toBeFocused();
    expectNoAppErrors(errors);
  });

  test("cahier journal : dupliquer une journée vers une nouvelle date", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/cahier-journal");
    await expectHealthyPage(page, "Cahier journal");

    // Séance d'origine, le lundi de la semaine affichée.
    await page.getByRole("button", { name: /Ajouter une séance/i }).first().click();
    await page.getByLabel("Titre court").fill("Séance originale — lecture");
    await page.getByRole("button", { name: "Enregistrer" }).click();
    await expect(page.getByText("Séance originale — lecture").first()).toBeVisible();

    const sourceWeekHeading = await page.getByRole("heading", { level: 2 }).filter({ hasText: "Semaine du" }).textContent();

    // Duplication : les valeurs par défaut ciblent déjà "lundi, semaine suivante".
    await page.getByRole("button", { name: "Dupliquer vers cette date" }).click();

    // La navigation vers la copie est automatique.
    await expect(async () => {
      const heading = await page.getByRole("heading", { level: 2 }).filter({ hasText: "Semaine du" }).textContent();
      expect(heading).not.toEqual(sourceWeekHeading);
    }).toPass();
    await expect(page.getByText("Séance originale — lecture").first()).toBeVisible();
    await expect(page.getByText(/séance.*dupliquée.*vers Lundi/i)).toBeVisible();

    // L'original reste intact sur la semaine source.
    await page.getByRole("button", { name: "← Semaine précédente" }).click();
    await expect(page.getByText("Séance originale — lecture").first()).toBeVisible();

    // Modifier la copie ne doit pas modifier l'original.
    await page.getByRole("button", { name: "Semaine suivante →" }).click();
    await page.getByText("Séance originale — lecture").first().click();
    await page.getByLabel("Titre court").fill("Copie modifiée — lecture");
    await page.getByRole("button", { name: "Enregistrer" }).click();
    await expect(page.getByText("Copie modifiée — lecture").first()).toBeVisible();
    await page.getByRole("button", { name: "← Semaine précédente" }).click();
    await expect(page.getByText("Séance originale — lecture").first()).toBeVisible();
    await expect(page.getByText("Copie modifiée — lecture", { exact: true })).toHaveCount(0);

    // Persistance après rafraîchissement, des deux côtés.
    await page.reload();
    await expect(page.getByText("Séance originale — lecture").first()).toBeVisible();
    await page.getByRole("button", { name: "Semaine suivante →" }).click();
    await expect(page.getByText("Copie modifiée — lecture").first()).toBeVisible();
    await page.getByRole("button", { name: "← Semaine précédente" }).click();

    // Dupliquer à nouveau vers une date qui contient déjà une séance :
    // avertissement, jamais d'écrasement silencieux.
    await page.getByRole("button", { name: "Dupliquer vers cette date" }).click();
    await expect(page.getByRole("alertdialog", { name: "Confirmer la duplication" })).toBeVisible();
    await expect(page.getByText(/contient déjà 1 séance/i)).toBeVisible();
    await page.getByRole("button", { name: "Confirmer" }).click();
    // La confirmation duplique et navigue directement vers la copie.
    await expect(page.getByText("Séance originale — lecture", { exact: true })).toHaveCount(1);
    await expect(page.getByText("Copie modifiée — lecture", { exact: true })).toHaveCount(1);

    // La vue imprimable fonctionne immédiatement sur la copie.
    await page.getByRole("button", { name: "Voir mon cahier journal (imprimable)" }).click();
    await expect(page.getByText("Copie modifiée — lecture").first()).toBeVisible();
    await page.emulateMedia({ media: "print" });
    await expect(page.getByText("Copie modifiée — lecture").first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Dupliquer vers cette date" })).not.toBeVisible();

    expectNoAppErrors(errors);
  });

  test("liste et plan de classe : ajout clavier, renommage, sauvegarde et refresh", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/organisation-classe");
    await expectHealthyPage(page, "Plan de classe et groupes");
    const input = page.getByLabel("Prénom ou code");
    await input.fill("Éléonore-Alexandrine");
    await input.press("Enter");
    const rename = page.getByLabel("Modifier Éléonore-Alexandrine");
    await rename.fill("Éléonore-Alexandrine du groupe A");
    await rename.blur();
    await page.getByRole("button", { name: "Enregistrer comme nouvelle" }).click();
    await page.reload();
    await expect(page.getByText("Éléonore-Alexandrine du groupe A").first()).toBeVisible();
    await page.emulateMedia({ media: "print" });
    await expect(page.getByText("Surface de la salle")).toBeVisible();
    expectNoAppErrors(errors);
  });

  test("sauvegarde locale : export global contient les quatre outils", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/enseignants/sauvegardes");
    await expectHealthyPage(page, "Sauvegardes locales");
    await page.evaluate(() => {
      localStorage.setItem("academie-kerboeuf-curriculum-planning-v2", JSON.stringify({ assignments: {}, freeItems: [] }));
      localStorage.setItem("progression-periode-kanban-v3", JSON.stringify({ cards: [] }));
      localStorage.setItem("academie-kerboeuf-emploi-du-temps-v3", JSON.stringify({ marker: "emploi" }));
      localStorage.setItem("academie-kerboeuf-cahier-journal-v1", JSON.stringify({ marker: "journal" }));
    });
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Exporter tout (JSON)" }).click();
    const download = await downloadPromise;
    const stream = await download.createReadStream();
    const chunks: Buffer[] = [];
    for await (const chunk of stream) chunks.push(Buffer.from(chunk));
    const backup = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    expect(backup.tools).toEqual([
      "programmation-annuelle",
      "progression-periode",
      "emploi-du-temps",
      "cahier-journal",
    ]);
    expect(backup.data["cahier-journal"]).toContain("journal");
    expectNoAppErrors(errors);
  });
});
