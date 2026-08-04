import { test, expect } from "@playwright/test";
import {
  hasRealMissionContent,
  isMissionPubliclyAvailable,
  isMissionReadyForDetail,
} from "@/content/academy";
import { sanitizePublicPedagogicalItems } from "@/content/public-sanitization";
import { getProfessorBySlug, getAllProfessorSlugs } from "@/content/professors";
import { getPublicStatusKey } from "@/content/public-status";

/**
 * Garde-fous de publication : une mission ne doit jamais afficher de faux
 * contenu pédagogique, et un statut "disponible" seul ne suffit pas à
 * garantir qu'une page de détail a un contenu réel à montrer.
 */

function baseMission(overrides: Partial<Parameters<typeof hasRealMissionContent>[0]> = {}) {
  return {
    status: "disponible" as const,
    introduction: "Une mise en situation réelle et détaillée.",
    support: { label: "Support", content: "Contenu réel du support." },
    questions: ["Question 1 ?", "Question 2 ?"],
    correction: ["Élément de correction 1.", "Élément de correction 2."],
    methodTip: "Un conseil de méthode réel.",
    projectionHint: "Indication de projection réelle.",
    printHint: "Indication d'impression réelle.",
    ...overrides,
  };
}

test.describe("hasRealMissionContent / isMissionReadyForDetail", () => {
  test("1. statut disponible avec contenu réel complet : prête pour le détail", () => {
    const mission = baseMission();
    expect(hasRealMissionContent(mission)).toBe(true);
    expect(isMissionReadyForDetail(mission)).toBe(true);
  });

  test("2. statut disponible mais sans contenu réel (support/questions/correction absents) : pas prête", () => {
    const mission = baseMission({
      support: undefined,
      questions: undefined,
      correction: undefined,
    });
    expect(hasRealMissionContent(mission)).toBe(false);
  });

  test("statut disponible mais contenu placeholder ('sera rédigé...') : pas prête, malgré des champs non vides", () => {
    const mission = baseMission({
      introduction: "Cette section sera rédigée prochainement.",
    });
    expect(hasRealMissionContent(mission)).toBe(false);
  });

  test("4. statut partiel (synonyme 'en préparation') : jamais prête, même avec du contenu réel", () => {
    const mission = baseMission({ status: "en préparation" });
    expect(hasRealMissionContent(mission)).toBe(false);
    expect(isMissionPubliclyAvailable(mission)).toBe(false);
  });

  test("5. statut en préparation sans aucun contenu : pas prête, cohérent avec le cas 4", () => {
    const mission = baseMission({
      status: "en préparation",
      support: undefined,
      questions: undefined,
      correction: undefined,
    });
    expect(hasRealMissionContent(mission)).toBe(false);
  });

  test("6. statut à venir : jamais publiquement disponible ni prête pour le détail", () => {
    const mission = baseMission({ status: "bientôt" });
    expect(isMissionPubliclyAvailable(mission)).toBe(false);
    expect(hasRealMissionContent(mission)).toBe(false);
  });

  test("7. ancien statut normalisé (ex : 'draft') via getPublicStatusKey — même comportement que la clé canonique", () => {
    expect(getPublicStatusKey("draft")).toBe(getPublicStatusKey("en préparation"));
  });

  test("8. mission vide (aucun champ de contenu renseigné) : jamais prête, quel que soit le statut", () => {
    const empty = {
      status: "disponible" as const,
      introduction: undefined,
      support: undefined,
      questions: undefined,
      correction: undefined,
      methodTip: undefined,
      projectionHint: undefined,
      printHint: undefined,
    };
    expect(hasRealMissionContent(empty)).toBe(false);
  });

  test("9. mission avec contenu réel : isMissionReadyForDetail et hasRealMissionContent renvoient exactement le même résultat", () => {
    const mission = baseMission();
    expect(isMissionReadyForDetail(mission)).toBe(hasRealMissionContent(mission));

    const incomplete = baseMission({ correction: undefined });
    expect(isMissionReadyForDetail(incomplete)).toBe(hasRealMissionContent(incomplete));
  });

  test("10. isMissionPubliclyAvailable (wrapper) est strictement équivalent à getPublicStatusKey(status) === 'available'", () => {
    for (const status of ["disponible", "bientôt", "en préparation"] as const) {
      expect(isMissionPubliclyAvailable({ status })).toBe(
        getPublicStatusKey(status) === "available",
      );
    }
  });
});

test.describe("sanitizePublicPedagogicalItems — filtre 'à vérifier'", () => {
  test("filtre les entrées qui ne sont que 'à vérifier' (insensible à la casse)", () => {
    const result = sanitizePublicPedagogicalItems([
      "Compétence réelle",
      "à vérifier",
      "À vérifier",
      "Autre compétence réelle",
    ]);
    expect(result).toEqual(["Compétence réelle", "Autre compétence réelle"]);
  });

  test("filtre les chaînes vides ou uniquement composées d'espaces", () => {
    const result = sanitizePublicPedagogicalItems(["Compétence réelle", "", "   "]);
    expect(result).toEqual(["Compétence réelle"]);
  });

  test("remplace 'à vérifier' à l'intérieur d'un texte plus long par 'à confirmer', sans le filtrer", () => {
    const result = sanitizePublicPedagogicalItems([
      "Objectif à vérifier avec l'équipe pédagogique",
    ]);
    expect(result).toEqual(["Objectif à confirmer avec l'équipe pédagogique"]);
  });

  test("ne modifie pas un tableau déjà propre", () => {
    const clean = ["Compétence A", "Compétence B"];
    expect(sanitizePublicPedagogicalItems(clean)).toEqual(clean);
  });
});

test.describe("Félix — destination canonique", () => {
  test("le profil de Félix pointe directement vers /eleves/felix (pas de double redirection)", () => {
    const felix = getProfessorBySlug("felix");
    expect(felix).toBeTruthy();
    expect(felix?.profileHref).toBe("/eleves/felix");
  });

  test("Félix est exclu des slugs générés pour /professeurs/[slug] (route canonique = /eleves/felix)", () => {
    const slugs = getAllProfessorSlugs().map((s) => s.slug);
    expect(slugs).not.toContain("felix");
  });

  test("un professeur de matière ordinaire a un profileHref sous /professeurs/", () => {
    const oria = getProfessorBySlug("oria");
    expect(oria).toBeTruthy();
    expect(oria?.profileHref).toBe("/professeurs/oria");
  });
});
