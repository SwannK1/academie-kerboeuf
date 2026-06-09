export type FicheSheet = {
  href: string;
};

export type FicheNotion = {
  slug: string;
  title: string;
  domain: FicheDomain;
  sheets: {
    f1?: FicheSheet;
    f2?: FicheSheet;
    f3?: FicheSheet;
  };
};

export type FicheDomain =
  | "conjugaison"
  | "grammaire"
  | "orthographe"
  | "vocabulaire"
  | "lecture-comprehension";

export const FICHE_DOMAIN_LABELS: Record<FicheDomain, string> = {
  conjugaison: "Conjugaison",
  grammaire: "Grammaire",
  orthographe: "Orthographe",
  vocabulaire: "Vocabulaire",
  "lecture-comprehension": "Lecture et compréhension",
};

const BASE = "/fiches/cm2/francais";

export const cm2FrancaisFiches: FicheNotion[] = [
  // ── Conjugaison ────────────────────────────────────────────────────────────
  {
    slug: "futur-simple",
    title: "Le futur simple",
    domain: "conjugaison",
    sheets: {
      f1: { href: `${BASE}/conjugaison/futur-simple-f1.png` },
      f2: { href: `${BASE}/conjugaison/futur-simple-f2.png` },
      f3: { href: `${BASE}/conjugaison/futur-simple-f3.png` },
    },
  },
  {
    slug: "imparfait",
    title: "L'imparfait",
    domain: "conjugaison",
    sheets: {
      f2: { href: `${BASE}/conjugaison/imparfait-f2.png` },
      f3: { href: `${BASE}/conjugaison/imparfait-f3.png` },
    },
  },
  {
    slug: "passe-compose-avoir",
    title: "Le passé composé avec avoir",
    domain: "conjugaison",
    sheets: {
      f1: { href: `${BASE}/conjugaison/passe-compose-avoir-f1.png` },
      f2: { href: `${BASE}/conjugaison/passe-compose-avoir-f2.png` },
      f3: { href: `${BASE}/conjugaison/passe-compose-avoir-f3.png` },
    },
  },
  {
    slug: "passe-compose-etre",
    title: "Le passé composé avec être",
    domain: "conjugaison",
    sheets: {
      f1: { href: `${BASE}/conjugaison/passe-compose-etre-f1.png` },
      f2: { href: `${BASE}/conjugaison/passe-compose-etre-f2.png` },
      f3: { href: `${BASE}/conjugaison/passe-compose-etre-f3.png` },
    },
  },
  {
    slug: "distinguer-imparfait-passe-compose",
    title: "Distinguer imparfait et passé composé",
    domain: "conjugaison",
    sheets: {
      f2: { href: `${BASE}/conjugaison/distinguer-imparfait-passe-compose-f2.png` },
      f3: { href: `${BASE}/conjugaison/distinguer-imparfait-passe-compose-f3.png` },
    },
  },
  {
    slug: "imperatif",
    title: "L'impératif présent",
    domain: "conjugaison",
    sheets: {
      f1: { href: `${BASE}/conjugaison/imperatif-f1.png` },
      f2: { href: `${BASE}/conjugaison/imperatif-f2.png` },
      f3: { href: `${BASE}/conjugaison/imperatif-f3.png` },
    },
  },
  {
    slug: "infinitif",
    title: "L'infinitif",
    domain: "conjugaison",
    sheets: {
      f1: { href: `${BASE}/conjugaison/infinitif-f1.png` },
      f2: { href: `${BASE}/conjugaison/infinitif-f2.png` },
      f3: { href: `${BASE}/conjugaison/infinitif-f3.png` },
    },
  },

  // ── Grammaire ──────────────────────────────────────────────────────────────
  {
    slug: "phrase-correcte",
    title: "Reconnaître une phrase correcte",
    domain: "grammaire",
    sheets: {
      f1: { href: `${BASE}/grammaire/phrase-correcte-f1.png` },
      f2: { href: `${BASE}/grammaire/phrase-correcte-f2.png` },
    },
  },
  {
    slug: "identifier-verbe-conjugue",
    title: "Identifier le verbe conjugué",
    domain: "grammaire",
    sheets: {
      f1: { href: `${BASE}/grammaire/identifier-verbe-conjugue-f1.png` },
      f2: { href: `${BASE}/grammaire/identifier-verbe-conjugue-f2.png` },
    },
  },
  {
    slug: "identifier-sujet",
    title: "Identifier le sujet du verbe",
    domain: "grammaire",
    sheets: {
      f1: { href: `${BASE}/grammaire/identifier-sujet-f1.png` },
      f2: { href: `${BASE}/grammaire/identifier-sujet-f2.png` },
      f3: { href: `${BASE}/grammaire/identifier-sujet-f3.png` },
    },
  },
  {
    slug: "accorder-verbe-sujet",
    title: "Accorder le verbe avec son sujet",
    domain: "grammaire",
    sheets: {
      f3: { href: `${BASE}/grammaire/accorder-verbe-sujet-f3.png` },
    },
  },
  {
    slug: "nom-groupe-nominal",
    title: "Le nom et le groupe nominal",
    domain: "grammaire",
    sheets: {
      f1: { href: `${BASE}/grammaire/nom-groupe-nominal-f1.png` },
    },
  },
  {
    slug: "accorder-groupe-nominal",
    title: "Accorder dans le groupe nominal",
    domain: "grammaire",
    sheets: {
      f1: { href: `${BASE}/grammaire/accorder-groupe-nominal-f1.png` },
      f3: { href: `${BASE}/grammaire/accorder-groupe-nominal-f3.png` },
    },
  },
  {
    slug: "enrichir-groupe-nominal",
    title: "Enrichir un groupe nominal",
    domain: "grammaire",
    sheets: {
      f2: { href: `${BASE}/grammaire/enrichir-groupe-nominal-f2.png` },
      f3: { href: `${BASE}/grammaire/enrichir-groupe-nominal-f3.png` },
    },
  },
  {
    slug: "identifier-complements-verbe",
    title: "Identifier les compléments du verbe",
    domain: "grammaire",
    sheets: {
      f1: { href: `${BASE}/grammaire/identifier-complements-verbe-f1.png` },
    },
  },
  {
    slug: "verbes-frequents-present",
    title: "Les verbes fréquents au présent",
    domain: "grammaire",
    sheets: {
      f3: { href: `${BASE}/grammaire/verbes-frequents-present-f3.png` },
    },
  },
  {
    slug: "cod",
    title: "Le complément d'objet direct (COD)",
    domain: "grammaire",
    sheets: {
      f1: { href: `${BASE}/grammaire/cod-f1.png` },
      f2: { href: `${BASE}/grammaire/cod-f2.png` },
      f3: { href: `${BASE}/grammaire/cod-f3.png` },
    },
  },
  {
    slug: "coi",
    title: "Le complément d'objet indirect (COI)",
    domain: "grammaire",
    sheets: {
      f1: { href: `${BASE}/grammaire/coi-f1.png` },
      f2: { href: `${BASE}/grammaire/coi-f2.png` },
      f3: { href: `${BASE}/grammaire/coi-f3.png` },
    },
  },
  {
    slug: "distinguer-cod-coi",
    title: "Distinguer COD et COI",
    domain: "grammaire",
    sheets: {
      f1: { href: `${BASE}/grammaire/distinguer-cod-coi-f1.png` },
      f2: { href: `${BASE}/grammaire/distinguer-cod-coi-f2.png` },
      f3: { href: `${BASE}/grammaire/distinguer-cod-coi-f3.png` },
    },
  },
  {
    slug: "complements-circonstanciels",
    title: "Les compléments circonstanciels",
    domain: "grammaire",
    sheets: {
      f1: { href: `${BASE}/grammaire/complements-circonstanciels-f1.png` },
      f2: { href: `${BASE}/grammaire/complements-circonstanciels-f2.png` },
      f3: { href: `${BASE}/grammaire/complements-circonstanciels-f3.png` },
    },
  },
  {
    slug: "distinguer-cv-cc",
    title: "Distinguer compléments du verbe et CC",
    domain: "grammaire",
    sheets: {
      f1: { href: `${BASE}/grammaire/distinguer-cv-cc-f1.png` },
      f2: { href: `${BASE}/grammaire/distinguer-cv-cc-f2.png` },
      f3: { href: `${BASE}/grammaire/distinguer-cv-cc-f3.png` },
    },
  },
  {
    slug: "attribut-sujet",
    title: "L'attribut du sujet",
    domain: "grammaire",
    sheets: {
      f1: { href: `${BASE}/grammaire/attribut-sujet-f1.png` },
      f2: { href: `${BASE}/grammaire/attribut-sujet-f2.png` },
      f3: { href: `${BASE}/grammaire/attribut-sujet-f3.png` },
    },
  },
  {
    slug: "accord-attribut-sujet",
    title: "Accorder l'attribut du sujet",
    domain: "grammaire",
    sheets: {
      f1: { href: `${BASE}/grammaire/accord-attribut-sujet-f1.png` },
      f3: { href: `${BASE}/grammaire/accord-attribut-sujet-f3.png` },
    },
  },
  {
    slug: "nature-fonction",
    title: "Distinguer nature et fonction",
    domain: "grammaire",
    sheets: {
      f2: { href: `${BASE}/grammaire/nature-fonction-f2.png` },
      f3: { href: `${BASE}/grammaire/nature-fonction-f3.png` },
    },
  },
  {
    slug: "adverbes",
    title: "Les adverbes",
    domain: "grammaire",
    sheets: {
      f1: { href: `${BASE}/grammaire/adverbes-f1.png` },
      f2: { href: `${BASE}/grammaire/adverbes-f2.png` },
      f3: { href: `${BASE}/grammaire/adverbes-f3.png` },
    },
  },
  {
    slug: "adverbes-ment",
    title: "Les adverbes en -ment",
    domain: "grammaire",
    sheets: {
      f1: { href: `${BASE}/grammaire/adverbes-ment-f1.png` },
      f2: { href: `${BASE}/grammaire/adverbes-ment-f2.png` },
      f3: { href: `${BASE}/grammaire/adverbes-ment-f3.png` },
    },
  },
  {
    slug: "pronoms-personnels",
    title: "Les pronoms personnels",
    domain: "grammaire",
    sheets: {
      f1: { href: `${BASE}/grammaire/pronoms-personnels-f1.png` },
      f2: { href: `${BASE}/grammaire/pronoms-personnels-f2.png` },
      f3: { href: `${BASE}/grammaire/pronoms-personnels-f3.png` },
    },
  },
  {
    slug: "pronoms-repetitions",
    title: "Utiliser les pronoms pour éviter les répétitions",
    domain: "grammaire",
    sheets: {
      f1: { href: `${BASE}/grammaire/pronoms-repetitions-f1.png` },
      f2: { href: `${BASE}/grammaire/pronoms-repetitions-f2.png` },
      f3: { href: `${BASE}/grammaire/pronoms-repetitions-f3.png` },
    },
  },

  // ── Orthographe ────────────────────────────────────────────────────────────
  {
    slug: "a-et-a",
    title: "Distinguer a et à",
    domain: "orthographe",
    sheets: {
      f1: { href: `${BASE}/orthographe/a-et-a-f1.png` },
      f2: { href: `${BASE}/orthographe/a-et-a-f2.png` },
      f3: { href: `${BASE}/orthographe/a-et-a-f3.png` },
    },
  },
  {
    slug: "et-et-est",
    title: "Distinguer et et est",
    domain: "orthographe",
    sheets: {
      f1: { href: `${BASE}/orthographe/et-et-est-f1.png` },
      f2: { href: `${BASE}/orthographe/et-et-est-f2.png` },
      f3: { href: `${BASE}/orthographe/et-et-est-f3.png` },
    },
  },

  // ── Vocabulaire ────────────────────────────────────────────────────────────
  {
    slug: "synonymes",
    title: "Les synonymes",
    domain: "vocabulaire",
    sheets: {
      f1: { href: `${BASE}/vocabulaire/synonymes-f1.png` },
      f2: { href: `${BASE}/vocabulaire/synonymes-f2.png` },
      f3: { href: `${BASE}/vocabulaire/synonymes-f3.png` },
    },
  },
  {
    slug: "antonymes",
    title: "Les antonymes",
    domain: "vocabulaire",
    sheets: {
      f1: { href: `${BASE}/vocabulaire/antonymes-f1.png` },
      f2: { href: `${BASE}/vocabulaire/antonymes-f2.png` },
      f3: { href: `${BASE}/vocabulaire/antonymes-f3.png` },
    },
  },
  {
    slug: "homonymes",
    title: "Les homonymes",
    domain: "vocabulaire",
    sheets: {
      f1: { href: `${BASE}/vocabulaire/homonymes-f1.png` },
      f2: { href: `${BASE}/vocabulaire/homonymes-f2.png` },
      f3: { href: `${BASE}/vocabulaire/homonymes-f3.png` },
    },
  },
  {
    slug: "familles-mots",
    title: "Les familles de mots",
    domain: "vocabulaire",
    sheets: {
      f1: { href: `${BASE}/vocabulaire/familles-mots-f1.png` },
      f2: { href: `${BASE}/vocabulaire/familles-mots-f2.png` },
      f3: { href: `${BASE}/vocabulaire/familles-mots-f3.png` },
    },
  },
  {
    slug: "prefixes-suffixes",
    title: "Les préfixes et les suffixes",
    domain: "vocabulaire",
    sheets: {
      f1: { href: `${BASE}/vocabulaire/prefixes-suffixes-f1.png` },
      f2: { href: `${BASE}/vocabulaire/prefixes-suffixes-f2.png` },
      f3: { href: `${BASE}/vocabulaire/prefixes-suffixes-f3.png` },
    },
  },
  {
    slug: "dictionnaire",
    title: "Utiliser le dictionnaire",
    domain: "vocabulaire",
    sheets: {
      f1: { href: `${BASE}/vocabulaire/dictionnaire-f1.png` },
      f2: { href: `${BASE}/vocabulaire/dictionnaire-f2.png` },
      f3: { href: `${BASE}/vocabulaire/dictionnaire-f3.png` },
    },
  },

  // ── Lecture et compréhension ───────────────────────────────────────────────
  {
    slug: "comprendre-texte-narratif",
    title: "Comprendre un court texte narratif",
    domain: "lecture-comprehension",
    sheets: {
      f1: { href: `${BASE}/lecture-comprehension/comprendre-texte-narratif-f1.png` },
      f2: { href: `${BASE}/lecture-comprehension/comprendre-texte-narratif-f2.png` },
      f3: { href: `${BASE}/lecture-comprehension/comprendre-texte-narratif-f3.png` },
    },
  },
];

export function getFicheNotionBySlug(slug: string): FicheNotion | undefined {
  return cm2FrancaisFiches.find((n) => n.slug === slug);
}

export function isNotionComplete(notion: FicheNotion): boolean {
  return !!(notion.sheets.f1 && notion.sheets.f2 && notion.sheets.f3);
}

export const SHEET_LABELS: Record<"f1" | "f2" | "f3", string> = {
  f1: "Feuille 1",
  f2: "Feuille 2",
  f3: "Feuille 3",
};
