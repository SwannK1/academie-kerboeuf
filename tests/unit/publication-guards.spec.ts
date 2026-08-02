import { test, expect } from "@playwright/test";
import { hasRealMissionContent, isMissionPubliclyAvailable } from "@/content/academy";
import {
  isPedagogicalResourceAbsent,
  isPedagogicalResourceLinkable,
} from "@/content/pedagogical-resources";
import { isPubliclyAvailable } from "@/content/public-status";
import type { PedagogicalResourceRef } from "@/content/program-types";

/**
 * Règle centrale : une ressource "available" sans contenu réel n'est pas
 * publiable. hasRealMissionContent() est le seul endroit qui vérifie le
 * CONTENU (pas seulement le statut déclaré) — c'est le garde-fou utilisé par
 * getPublicAcademyMission() pour rétrograder silencieusement un statut
 * "disponible" mensonger.
 */

const emptyMission = {
  status: "disponible" as const,
  introduction: undefined,
  support: undefined,
  questions: undefined,
  correction: undefined,
  methodTip: undefined,
  projectionHint: undefined,
  printHint: undefined,
};

const fullMission = {
  status: "disponible" as const,
  introduction: "Félix ouvre le dossier et explique la mission.",
  support: {
    label: "Texte support",
    content: "Un texte réel à lire pour la mission.",
  },
  questions: ["Que fait le personnage ?", "Pourquoi agit-il ainsi ?"],
  correction: ["Il agit par prudence.", "Il veut protéger le groupe."],
  methodTip: "Relire deux fois avant de répondre.",
  projectionHint: "Projeter le texte au tableau.",
  printHint: "Imprimer une copie par élève.",
};

test.describe("hasRealMissionContent — une mission vide n'est jamais 'terminée'", () => {
  test("une mission 'disponible' sans aucun contenu n'est pas prête", () => {
    expect(hasRealMissionContent(emptyMission)).toBe(false);
  });

  test("une mission 'disponible' avec un contenu réel complet est prête", () => {
    expect(hasRealMissionContent(fullMission)).toBe(true);
  });

  test("une mission non 'disponible' n'est jamais prête, même avec du contenu rempli", () => {
    expect(
      hasRealMissionContent({ ...fullMission, status: "en préparation" }),
    ).toBe(false);
  });

  test("un texte placeholder connu ('sera rédigé', 'à venir'...) invalide le contenu", () => {
    expect(
      hasRealMissionContent({
        ...fullMission,
        methodTip: "Le conseil de méthode sera rédigé prochainement.",
      }),
    ).toBe(false);
    expect(
      hasRealMissionContent({
        ...fullMission,
        support: { label: "Défi principal à venir", content: fullMission.support.content },
      }),
    ).toBe(false);
  });

  test("une correction ou des questions vides invalident le contenu", () => {
    expect(hasRealMissionContent({ ...fullMission, questions: [] })).toBe(false);
    expect(hasRealMissionContent({ ...fullMission, correction: [] })).toBe(false);
  });
});

test.describe("isMissionPubliclyAvailable — gate de statut seul (avant vérification de contenu)", () => {
  test("vrai dès que le statut est 'disponible', même sans contenu", () => {
    // Volontairement plus permissif que hasRealMissionContent : c'est le
    // gate d'URL, pas le gate d'affichage du détail complet.
    expect(isMissionPubliclyAvailable(emptyMission)).toBe(true);
  });

  test("faux pour tout autre statut", () => {
    expect(isMissionPubliclyAvailable({ status: "bientôt" })).toBe(false);
    expect(isMissionPubliclyAvailable({ status: "en préparation" })).toBe(false);
  });
});

test.describe("isPedagogicalResourceLinkable — wrapper rétrocompatible", () => {
  test("produit exactement le même résultat que le helper central isPubliclyAvailable", () => {
    const cases: (PedagogicalResourceRef | undefined)[] = [
      { kind: "lesson-pdf", label: "Leçon", status: "available", href: "/fiches/x.pdf" },
      { kind: "lesson-pdf", label: "Leçon", status: "planned" },
      { kind: "lesson-pdf", label: "Leçon", status: "in-preparation" },
      { kind: "lesson-pdf", label: "Leçon", status: "missing" },
      undefined,
    ];

    for (const resource of cases) {
      expect(isPedagogicalResourceLinkable(resource)).toBe(
        isPubliclyAvailable(resource?.status, resource?.href),
      );
    }
  });

  test("une ressource 'available' sans href réel n'est jamais linkable (type invalide en pratique, contrôlé à l'exécution)", () => {
    const resource = {
      kind: "lesson-pdf",
      status: "available",
    } as unknown as PedagogicalResourceRef;
    expect(isPedagogicalResourceLinkable(resource)).toBe(false);
  });
});

test.describe("isPedagogicalResourceAbsent", () => {
  test("une ressource non définie ou marquée 'missing' est absente", () => {
    expect(isPedagogicalResourceAbsent(undefined)).toBe(true);
    expect(
      isPedagogicalResourceAbsent({ kind: "lesson-pdf", label: "Leçon", status: "missing" }),
    ).toBe(true);
  });

  test("une ressource planifiée ou disponible n'est pas 'absente'", () => {
    expect(
      isPedagogicalResourceAbsent({ kind: "lesson-pdf", label: "Leçon", status: "planned" }),
    ).toBe(false);
    expect(
      isPedagogicalResourceAbsent({
        kind: "lesson-pdf",
        label: "Leçon",
        status: "available",
        href: "/fiches/x.pdf",
      }),
    ).toBe(false);
  });
});
