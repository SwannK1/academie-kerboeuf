import { expect, test, type Locator, type Page, type TestInfo } from "@playwright/test";
import { trackConsoleErrors } from "./utils/console-errors";

/**
 * Parcours UX A → K de la passe « productivité ». Chaque parcours compte ses
 * clics (décisions de l'utilisateur), ses champs texte et ses écrans ; les
 * compteurs sont joints au rapport (annotations) et bornés par des assertions.
 */

function iso(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function mondayOf(date: Date) {
  const d = new Date(date);
  const day = d.getDay() === 0 ? 7 : d.getDay();
  d.setDate(d.getDate() - day + 1);
  return d;
}

/** Lundi de la semaine affichée par défaut (semaine suivante le week-end). */
function currentMonday(): Date {
  const today = new Date();
  const monday = mondayOf(today);
  if (today.getDay() === 0 || today.getDay() === 6) monday.setDate(monday.getDate() + 7);
  return monday;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/** Prochain jour de classe (lundi, mardi, jeudi, vendredi), à partir de demain. */
function nextClassDay(): string {
  const d = new Date();
  do d.setDate(d.getDate() + 1);
  while (![1, 2, 4, 5].includes(d.getDay()));
  return iso(d);
}

class Journey {
  clicks = 0;
  fields = 0;
  screens = 1;
  constructor(private page: Page, private info: TestInfo, private name: string) {}
  async click(locator: Locator) {
    this.clicks += 1;
    const url = this.page.url();
    await locator.click();
    await this.page.waitForTimeout(50);
    if (this.page.url().split("?")[0] !== url.split("?")[0]) this.screens += 1;
  }
  async fill(locator: Locator, text: string) {
    this.fields += 1;
    await locator.fill(text);
  }
  async drag(from: Locator, to: Locator) {
    this.clicks += 1;
    await from.dragTo(to);
  }
  report(max: { clicks: number; fields?: number }) {
    this.info.annotations.push({
      type: "parcours",
      description: `${this.name} — ${this.clicks} clic(s), ${this.fields} champ(s) texte, ${this.screens} écran(s)`,
    });
    expect(this.clicks, `${this.name} : clics`).toBeLessThanOrEqual(max.clicks);
    expect(this.fields, `${this.name} : champs texte`).toBeLessThanOrEqual(max.fields ?? 0);
  }
}

const teachState = (level: string, sessions: unknown[] = [], slots?: unknown[]) => ({
  version: 1,
  schoolDays: [1, 2, 4, 5],
  slots: slots ?? [],
  sessions,
  templates: [],
  progress: {},
  favorites: [],
  dismissed: [],
  timetableReady: true,
});

async function seed(page: Page, values: Record<string, unknown>) {
  await page.addInitScript((entries) => {
    if (window.sessionStorage.getItem("__seeded")) return;
    window.sessionStorage.setItem("__seeded", "1");
    for (const [key, value] of Object.entries(entries)) window.localStorage.setItem(key, JSON.stringify(value));
  }, values);
}

const profile = (level: string, role = "enseignant") => ({ role, level, schoolType: "elementaire", zone: "A", lastPath: null, lastLabel: null });

/** Semaine type recommandée, recréée ici pour ne pas dépendre de l'interface. */
function slotsFor(days: number[]) {
  const slots: unknown[] = [];
  for (const day of days) {
    slots.push(
      { id: `s-${day}-1`, day, start: 510, duration: 60, subject: "francais" },
      { id: `s-${day}-2`, day, start: 570, duration: 45, subject: "francais" },
      { id: `s-${day}-3`, day, start: 630, duration: 75, subject: "mathematiques" },
      { id: `s-${day}-4`, day, start: 810, duration: 60, subject: "eps" },
    );
  }
  return slots;
}

test.describe("Professeur", () => {
  test("A · préparer une séance de maths dans un créneau existant", async ({ page }, info) => {
    const errors = trackConsoleErrors(page);
    await seed(page, { "ak-profil-v1": profile("ce2"), "ak-enseigner-v1": teachState("ce2", [], slotsFor([1, 2, 4, 5])) });
    await page.goto("/enseigner/semaine");
    const j = new Journey(page, info, "A");

    await j.click(page.getByRole("button", { name: "Préparer Mathématiques à 10h30" }).first());
    const panel = page.getByRole("dialog");
    // Matière, heure, durée, niveau : déjà connus, pas redemandés.
    await expect(panel).toContainText("10h30 · 75 min · Maths");
    await expect(panel.getByRole("radio", { name: /Poser et effectuer une soustraction/ })).toContainText("Fiche prête");
    await j.click(panel.getByRole("radio", { name: /Poser et effectuer une soustraction avec retenue/ }));
    await j.click(panel.getByRole("button", { name: /Poser et calculer une addition ou une soustraction/ }));
    await expect(panel.getByRole("button", { name: /Poser et calculer une addition ou une soustraction/ })).toHaveAttribute("aria-pressed", "true");
    await j.click(panel.getByRole("button", { name: "OK" }));

    await expect(page.getByRole("button", { name: /soustraction avec retenue/ }).first()).toBeVisible();
    j.report({ clicks: 4 });
    expect(errors).toEqual([]);
  });

  test("B · reprendre la structure d'une journée précédente", async ({ page }, info) => {
    const lastMonday = addDays(currentMonday(), -7);
    await seed(page, {
      "ak-profil-v1": profile("ce1"),
      "ak-enseigner-v1": teachState(
        "ce1",
        [510, 630, 810].map((start, i) => ({
          id: `old-${i}`,
          date: iso(lastMonday),
          start,
          duration: 45,
          level: "ce1",
          subject: i === 1 ? "mathematiques" : "francais",
          domainId: null,
          notionId: null,
          notionLabel: `Séance ${i + 1} de lundi dernier`,
          kind: null,
          organisation: null,
          resources: [],
          note: "",
          done: true,
        })),
      ),
    });
    await page.goto("/enseigner/semaine");
    const j = new Journey(page, info, "B");
    await j.click(page.getByRole("button", { name: /Comme lundi dernier/ }));
    const monday = page.getByRole("region", { name: /^Lundi/ });
    await expect(monday.getByText(/Séance [123] de lundi dernier/)).toHaveCount(3);
    j.report({ clicks: 1 });
  });

  test("C · trouver une fiche de soustraction et l'imprimer", async ({ page }, info) => {
    // Aucune fiche de mathématiques CE1 n'est publiée : le parcours est joué en CE2.
    await seed(page, { "ak-profil-v1": profile("ce2") });
    await page.goto("/");
    const j = new Journey(page, info, "C");
    await j.click(page.getByRole("link", { name: "Trouver un PDF" }));
    await j.click(page.getByRole("radio", { name: "Maths" }));
    const card = page.locator("main li").filter({ hasText: "Poser et calculer une addition ou une soustraction" });
    await card.hover();
    await j.click(card.getByRole("button", { name: /^Imprimer/ }));
    await j.click(page.getByRole("menuitem", { name: "Exercices" }));
    // Le PDF est chargé dans un cadre d'impression (la boîte d'impression du navigateur n'est pas pilotable).
    await expect(page.locator('body > iframe[src$="exercices.pdf"]')).toHaveCount(1);
    j.report({ clicks: 4 });
  });

  test("D · trouver une fiche et l'ajouter à une séance", async ({ page, isMobile }, info) => {
    const session = {
      id: "seance-d",
      date: nextClassDay(),
      start: 630,
      duration: 75,
      level: "ce2",
      subject: "mathematiques",
      domainId: null,
      notionId: null,
      notionLabel: "Calcul posé",
      kind: null,
      organisation: null,
      resources: [],
      note: "",
      done: false,
    };
    await seed(page, { "ak-profil-v1": profile("ce2"), "ak-enseigner-v1": teachState("ce2", [session], slotsFor([1, 2, 4, 5])) });

    // Par le menu (tous appareils).
    await page.goto("/ressources?matiere=maths");
    const j = new Journey(page, info, "D");
    await j.click(page.locator("main li").filter({ hasText: "Poser et calculer une addition" }).getByRole("button").first());
    await j.click(page.getByRole("dialog").getByRole("button", { name: /Ajouter à ma séance/ }));
    await j.click(page.getByRole("menuitem", { name: /Calcul posé/ }));
    await expect(page.getByText("Ressource ajoutée à la séance")).toBeVisible();
    j.report({ clicks: 3 });

    // Par glisser-déposer depuis le bac de la semaine (ordinateur).
    if (!isMobile) {
      await page.goto("/enseigner/semaine");
      const drag = new Journey(page, info, "D bis (glisser)");
      await drag.click(page.getByRole("button", { name: "Ressources", exact: true }));
      const tray = page.getByRole("complementary", { name: "Bac de ressources" });
      await drag.click(tray.getByRole("radio", { name: "Maths" }));
      await drag.drag(
        tray.getByRole("button", { name: /Multiplier par 2, 5 et 10/ }),
        page.getByRole("button", { name: "Préparer Mathématiques à 10h30" }).first(),
      );
      await expect(page.getByText(/Séance créée avec « Multiplier par 2, 5 et 10 »/)).toBeVisible();
      drag.report({ clicks: 3 });
    }
  });

  test("E · déplacer une séance de lundi vers mardi", async ({ page, isMobile }, info) => {
    const monday = iso(currentMonday());
    await seed(page, {
      "ak-profil-v1": profile("ce1"),
      "ak-enseigner-v1": teachState("ce1", [
        {
          id: "seance-e",
          date: monday,
          start: 510,
          duration: 45,
          level: "ce1",
          subject: "francais",
          domainId: null,
          notionId: null,
          notionLabel: "Dictée du lundi",
          kind: null,
          organisation: null,
          resources: [],
          note: "",
          done: false,
        },
      ]),
    });
    await page.goto("/enseigner/semaine");
    const j = new Journey(page, info, isMobile ? "E (menu)" : "E (glisser)");
    const tuesday = page.getByRole("region", { name: /^Mardi/ });
    if (isMobile) {
      await j.click(page.getByRole("button", { name: /^Actions : Dictée du lundi/ }));
      await j.click(page.getByRole("menuitem", { name: "Mardi" }).last());
    } else {
      await j.drag(page.getByRole("region", { name: /^Lundi/ }).getByText("Dictée du lundi"), tuesday.locator("h2"));
    }
    await expect(tuesday.getByText("Dictée du lundi")).toBeVisible();
    j.report({ clicks: 2 });
  });

  test("F · produire le cahier journal", async ({ page }, info) => {
    const errors = trackConsoleErrors(page);
    const monday = iso(currentMonday());
    await seed(page, {
      "ak-profil-v1": profile("ce1"),
      "ak-enseigner-v1": teachState("ce1", [
        {
          id: "seance-f",
          date: monday,
          start: 510,
          duration: 45,
          level: "ce1",
          subject: "francais",
          domainId: "grammaire",
          notionId: "ce1-francais-grammaire-1",
          notionLabel: "Distinguer nom, verbe, adjectif et déterminant dans une phrase",
          kind: "entrainement",
          organisation: null,
          resources: ["ce1-francais-reconnaitre-nom"],
          note: "",
          done: false,
        },
      ]),
    });
    await page.goto("/enseigner/semaine");
    const j = new Journey(page, info, "F");
    await j.click(page.getByRole("link", { name: /Cahier journal/ }));
    const sheet = page.locator("article").first();
    await expect(sheet.getByText(/Distinguer nom, verbe/)).toBeVisible();
    await expect(sheet.getByText("Reconnaître un nom").filter({ visible: true }).first()).toBeVisible();

    await page.emulateMedia({ media: "print" });
    await expect(page.getByRole("navigation", { name: "Enseigner" })).toBeHidden();
    await expect(page.getByRole("button", { name: "Imprimer" })).toBeHidden();
    await expect(page.locator("article header h2").first()).toBeVisible();
    j.report({ clicks: 1 });
    expect(errors).toEqual([]);
  });
});

test.describe("Direction", () => {
  test("G · H · I · créer un conseil d'école, choisir et réordonner, imprimer", async ({ page }, info) => {
    const errors = trackConsoleErrors(page);
    await seed(page, { "ak-profil-v1": profile("ce1", "direction") });
    await page.goto("/direction");

    const g = new Journey(page, info, "G");
    await g.click(page.getByRole("link", { name: /Préparer un conseil d'école/ }));
    await expect(page.getByRole("heading", { name: "Conseil d'école n°1" })).toBeVisible();
    g.report({ clicks: 1 });

    const h = new Journey(page, info, "H");
    await h.click(page.getByRole("checkbox", { name: "Inclure : Travaux et locaux" }));
    await h.click(page.getByRole("checkbox", { name: "Inclure : Restauration et périscolaire" }));
    const items = page.getByRole("list", { name: "Points de l'ordre du jour" }).getByRole("listitem");
    await h.click(items.nth(3).getByRole("button", { name: "Monter" }));
    await expect(items.nth(2)).toContainText("Projet d'école");
    await h.click(items.nth(2).getByRole("button", { name: /Durée : 10 minutes/ }));
    await expect(items.nth(2).getByRole("button", { name: /Durée : 15 minutes/ })).toBeVisible();
    h.report({ clicks: 4 });

    const i = new Journey(page, info, "I");
    await i.click(page.getByRole("button", { name: /Générer l'ordre du jour/ }));
    const sheet = page.locator("article");
    await expect(sheet).not.toContainText("Travaux et locaux");
    await expect(sheet.locator("li").nth(2)).toContainText("Projet d'école");
    await expect(sheet.locator("li").nth(2)).toContainText("15 min");
    await page.emulateMedia({ media: "print" });
    await expect(page.getByRole("button", { name: "Imprimer" })).toBeHidden();
    await expect(sheet.getByRole("heading", { name: "Conseil d'école n°1" })).toBeVisible();
    await page.emulateMedia({ media: "screen" });
    i.report({ clicks: 2 });

    // En réunion : une décision devient une action, sans texte.
    await page.getByRole("radio", { name: "2 · En réunion" }).click();
    const projet = page.getByRole("listitem").filter({ hasText: "Projet d'école" });
    await projet.getByRole("radio", { name: "Décidé" }).click();
    await projet.getByRole("button", { name: "Créer une action de suivi" }).click();
    await page.getByRole("menuitem", { name: "Cette semaine" }).click();
    await expect(projet.getByText("Action dans le tableau de bord")).toBeVisible();
    await page.goto("/direction");
    await expect(page.getByText("Suivi : Projet d'école")).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("J · préparer une sortie scolaire", async ({ page }, info) => {
    await page.goto("/direction/demarches/sortie");
    const j = new Journey(page, info, "J");
    await j.click(page.getByRole("radio", { name: "Non" }));
    await j.click(page.getByRole("radio", { name: "Car" }));
    await expect(page.getByText(/Réserver le car/)).toBeVisible();
    await expect(page.getByText(/Dossier transmis à l'IEN/)).toHaveCount(0);
    await j.click(page.getByRole("checkbox", { name: /Réserver le car/ }));
    await expect(page.getByText(/1 \/ \d+/)).toBeVisible();
    // Les sources restent disponibles, repliées.
    await page.getByText("Pourquoi ? · Sources officielles").click();
    await expect(page.getByRole("link", { name: /Sorties et voyages scolaires dans le premier degré/ })).toHaveAttribute("href", /eduscol/);
    j.report({ clicks: 3 });
  });

  test("K · reporter une tâche", async ({ page, isMobile }, info) => {
    const today = iso(new Date());
    await seed(page, {
      "ak-profil-v1": profile("ce1", "direction"),
      "ak-direction-v1": {
        version: 1,
        tasks: [{ id: "t-k", label: "Commander les manuels", due: today, done: false, origin: { kind: "manuel" } }],
        meetings: [],
        runs: [],
        milestonesDone: [],
      },
    });
    await page.goto("/direction");
    const todayColumn = page.locator("section").filter({ has: page.getByRole("heading", { name: "Aujourd'hui" }) });
    const weekColumn = page.locator("section").filter({ has: page.getByRole("heading", { name: "Cette semaine" }) });
    await expect(todayColumn.getByText("Commander les manuels")).toBeVisible();
    const j = new Journey(page, info, isMobile ? "K (menu)" : "K (glisser)");
    if (isMobile) {
      await j.click(page.getByRole("button", { name: "Actions : Commander les manuels" }));
      await j.click(page.getByRole("menuitem", { name: "Cette semaine" }));
    } else {
      await j.drag(todayColumn.getByText("Commander les manuels"), weekColumn.getByRole("heading", { name: "Cette semaine" }));
    }
    await expect(weekColumn.getByText("Commander les manuels")).toBeVisible();
    j.report({ clicks: 2 });
  });
});

test.describe("Accueil et bibliothèque", () => {
  test("l'accueil devient un cockpit une fois le profil connu", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Préparer sa classe/);
    await page.getByRole("radio", { name: "J'enseigne" }).click();
    await page.getByRole("radio", { name: "CE1" }).click();
    await page.getByRole("button", { name: "Entrer" }).click();
    await page.getByRole("button", { name: /Utiliser la semaine type CE1/ }).click();
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Bonjour|Bonsoir/);
    await expect(page.getByText(/CE1 · Période/)).toBeVisible();
    await expect(page.getByText(/créneaux? à préparer|séances?/).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Trouver un PDF" })).toBeVisible();
  });

  test("seules les ressources publiées sont listées et chaque PDF existe", async ({ page, request }) => {
    await page.goto("/ressources?niveau=ce1");
    const cards = page.locator("main ul li button").first();
    await expect(cards).toBeVisible();
    await expect(page.getByText(/En préparation|À venir|absent/)).toHaveCount(0);
    await cards.click();
    const src = await page.getByRole("dialog").locator("iframe").getAttribute("src");
    const res = await request.get((src as string).split("#")[0]);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("pdf");
  });
});
