import { expect, test, type Page } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

/**
 * Parcours de la refonte « espace de travail » : enseignant CE1, direction,
 * bibliothèque. Toutes les données sont locales (localStorage).
 */

function iso(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/** Prochain jour de classe (lundi, mardi, jeudi, vendredi) à partir de demain. */
function nextClassDay(): string {
  const d = new Date();
  do d.setDate(d.getDate() + 1);
  while (![1, 2, 4, 5].includes(d.getDay()));
  return iso(d);
}

async function seed(page: Page, values: Record<string, unknown>) {
  await page.addInitScript((entries) => {
    for (const [key, value] of Object.entries(entries)) {
      if (!window.localStorage.getItem(key)) window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, values);
}

test.describe("Enseigner", () => {
  test("un enseignant CE1 prépare, déplace, duplique et imprime sa semaine", async ({ page, isMobile }) => {
    const errors = trackConsoleErrors(page);

    await page.goto("/");
    await page.getByRole("radio", { name: "J'enseigne" }).click();
    await page.getByRole("radio", { name: "CE1" }).click();
    await page.getByRole("button", { name: "Entrer" }).click();
    await expect(page).toHaveURL(/\/enseigner$/);

    await page.getByRole("button", { name: /Utiliser la semaine type CE1/ }).click();
    await page.getByRole("link", { name: "Ma semaine", exact: true }).first().click();
    await expect(page).toHaveURL(/\/enseigner\/semaine/);

    // Créneau prérempli : date, heure et matière ne sont pas redemandées.
    await page.getByRole("button", { name: "Préparer Français à 8h30" }).first().click();
    const panel = page.getByRole("dialog");
    await expect(panel.getByRole("radio", { name: "Français", exact: true })).toHaveAttribute("aria-checked", "true");
    await panel.getByRole("radio", { name: "Grammaire" }).click();
    await panel.getByRole("radiogroup", { name: "Notion" }).getByRole("radio").first().click();
    await panel.getByRole("radio", { name: "Entraînement" }).click();
    await panel.getByRole("radio", { name: "30 min" }).click();

    // Ressource suggérée, ajoutée en un clic.
    const suggestion = panel.locator("button.border-dashed").first();
    await expect(suggestion).toBeVisible();
    await suggestion.click();
    await expect(panel.getByRole("button", { name: /^Retirer / })).toHaveCount(1);
    await panel.getByRole("button", { name: "OK" }).click();

    const card = page.getByRole("button", { name: /Distinguer nom, verbe/ }).first();
    await expect(card).toBeVisible();

    // Déplacer par menu (accessible partout, mobile compris).
    await page.getByRole("button", { name: /^Actions : Distinguer nom, verbe/ }).first().click();
    await page.getByRole("menuitem", { name: "Jeudi" }).last().click();
    await expect(page.getByRole("region", { name: /^Jeudi/ }).getByText(/Distinguer nom, verbe/)).toBeVisible();

    // Glisser-déposer sur ordinateur.
    if (!isMobile) {
      await page
        .getByRole("region", { name: /^Jeudi/ })
        .getByText(/Distinguer nom, verbe/)
        .dragTo(page.getByRole("region", { name: /^Vendredi/ }).locator("h2"));
      await expect(page.getByRole("region", { name: /^Vendredi/ }).getByText(/Distinguer nom, verbe/)).toBeVisible();
    }

    // Dupliquer la semaine prochaine.
    await page.getByRole("button", { name: /^Actions : Distinguer nom, verbe/ }).first().click();
    await page.getByRole("menuitem", { name: "Semaine prochaine" }).first().click();
    await expect(page.getByText("Séance dupliquée la semaine prochaine")).toBeVisible();

    // Le cahier journal se construit tout seul.
    await page.getByRole("link", { name: "Cahier journal" }).click();
    await expect(page).toHaveURL(/cahier-journal\?semaine=/);
    await expect(page.locator("article").getByText(/Distinguer nom, verbe/).first()).toBeVisible();
    await expect(page.locator("article").getByText(/Entraînement/).first()).toBeVisible();

    // Impression : aucune UI parasite.
    await page.emulateMedia({ media: "print" });
    await expect(page.getByRole("navigation", { name: "Enseigner" })).toBeHidden();
    await expect(page.getByRole("button", { name: "Imprimer" })).toBeHidden();
    await expect(page.locator("article").first()).toBeVisible();
    await expect(page.locator("article header h2").first()).toBeVisible();

    expect(errors).toEqual([]);
  });
});

test.describe("Direction", () => {
  test("préparer un conseil d'école itemisé et suivre une décision", async ({ page }) => {
    const errors = trackConsoleErrors(page);
    await page.goto("/direction");
    await page.getByRole("link", { name: /Préparer un conseil d'école/ }).click();
    await expect(page).toHaveURL(/reunions\?id=/);
    await expect(page.getByRole("heading", { name: "Conseil d'école n°1" })).toBeVisible();

    await page.getByRole("checkbox", { name: "Inclure : Travaux et locaux" }).uncheck();

    const items = page.getByRole("list", { name: "Points de l'ordre du jour" }).getByRole("listitem");
    await expect(items.nth(5)).toContainText("Coopérative scolaire");
    await items.nth(5).getByRole("button", { name: "Monter" }).click();
    await expect(items.nth(4)).toContainText("Coopérative scolaire");

    await page.getByRole("textbox", { name: "Ajouter un point libre" }).fill("Kermesse de juin");
    await page.getByRole("button", { name: "Ajouter", exact: true }).click();

    await page.getByRole("button", { name: /Générer l'ordre du jour/ }).click();
    const sheet = page.locator("article");
    await expect(sheet).toContainText("Kermesse de juin");
    await expect(sheet).not.toContainText("Travaux et locaux");

    await page.getByRole("radio", { name: "2 · En réunion" }).click();
    const projet = page.getByRole("listitem").filter({ hasText: "Projet d'école" });
    await projet.getByRole("radio", { name: "Décision prise" }).click();
    await projet.getByRole("textbox", { name: "Décision ou suivi" }).fill("Lancer le projet jardin");
    await projet.getByRole("button", { name: "Créer une action de suivi" }).click();
    await page.getByRole("menuitem", { name: "Cette semaine" }).click();
    await expect(projet.getByText("Action dans le tableau de bord")).toBeVisible();

    await page.goto("/direction");
    await expect(page.getByText("Lancer le projet jardin")).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("une démarche charge la checklist adaptée et cite ses sources", async ({ page }) => {
    await page.goto("/direction/demarches/sortie");
    await page.getByRole("radio", { name: "Séjour avec nuitée" }).click();
    await page.getByRole("radio", { name: "Sur temps scolaire" }).click();
    await expect(page.getByText(/Dossier transmis à l'IEN/)).toBeVisible();
    await expect(page.getByText(/Autorisation de la direction/)).toHaveCount(0);
    await expect(page.getByRole("link", { name: /Sorties et voyages scolaires dans le premier degré/ })).toHaveAttribute("href", /eduscol/);
  });
});

test.describe("Ressources", () => {
  test("chercher, filtrer, prévisualiser, télécharger et ajouter à une séance", async ({ page, request }) => {
    const errors = trackConsoleErrors(page);
    const date = nextClassDay();
    await seed(page, {
      "ak-profil-v1": { role: "enseignant", level: "cm2", schoolType: null, zone: "A", lastPath: null, lastLabel: null },
      "ak-enseigner-v1": {
        version: 1,
        schoolDays: [1, 2, 4, 5],
        slots: [],
        sessions: [
          {
            id: "seance-test",
            date,
            start: 510,
            duration: 45,
            level: "cm2",
            subject: "francais",
            domainId: "conjugaison",
            notionId: null,
            notionLabel: "Réviser l'imparfait",
            kind: null,
            organisation: null,
            resources: [],
            note: "",
            done: false,
          },
        ],
        templates: [],
        progress: {},
        favorites: [],
        dismissed: [],
        timetableReady: true,
      },
    });

    await page.goto("/ressources");
    // Niveau du profil proposé par défaut.
    await expect(page.getByRole("radio", { name: "CM2" })).toHaveAttribute("aria-checked", "true");
    await page.getByRole("searchbox", { name: "Que cherchez-vous ?" }).fill("imparfait");
    await expect(page).toHaveURL(/q=imparfait/);
    await page.getByRole("radio", { name: "Exercices" }).click();

    const first = page.locator("main ul li button").first();
    await expect(first).toContainText(/imparfait/i);
    await first.click();

    const panel = page.getByRole("dialog");
    await expect(panel.locator("iframe")).toHaveAttribute("src", /\.pdf/);
    const href = await panel.getByRole("link", { name: /^Télécharger/ }).getAttribute("href");
    expect(href).toBeTruthy();
    const pdf = await request.get(href as string);
    expect(pdf.status()).toBe(200);
    expect(pdf.headers()["content-type"]).toContain("pdf");

    await panel.getByRole("button", { name: /Ajouter à ma séance/ }).click();
    await page.getByRole("menuitem", { name: /Réviser l'imparfait/ }).click();
    await expect(page.getByText("Ressource ajoutée à la séance")).toBeVisible();

    await panel.getByRole("button", { name: "Ajouter aux favoris" }).click();
    await page.goto("/mes-favoris");
    await expect(page.getByRole("main").getByRole("link").filter({ hasText: /imparfait/i }).first()).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("seules les ressources publiées sont listées et chaque PDF existe", async ({ page, request }) => {
    await page.goto("/ressources?niveau=ce1");
    const cards = page.locator("main ul li button");
    await expect(cards.first()).toBeVisible();
    await expect(page.getByText(/En préparation|À venir|absent/)).toHaveCount(0);
    await cards.first().click();
    const src = await page.getByRole("dialog").locator("iframe").getAttribute("src");
    const res = await request.get((src as string).split("#")[0]);
    expect(res.status()).toBe(200);
  });
});
