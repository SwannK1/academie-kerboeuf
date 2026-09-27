/**
 * Sources officielles citées dans l'espace Direction.
 *
 * Règle : Académie Kerboeuf explique et guide, la source officielle fait foi.
 * Chaque source porte sa date de dernière vérification. Les sites
 * education.gouv.fr / eduscol / legifrance refusent la lecture automatisée :
 * la vérification du 27/09/2026 a porté sur l'existence de la page et les
 * extraits indexés, pas sur une relecture intégrale.
 */

export type OfficialSource = {
  id: string;
  label: string;
  publisher: string;
  href: string;
  verifiedAt: string;
};

export const SOURCES = {
  conseilEcole: {
    id: "conseil-ecole",
    label: "Le conseil d'école et les autres instances de l'école",
    publisher: "Éduscol",
    href: "https://eduscol.education.gouv.fr/5082/le-conseil-d-ecole-et-les-autres-instances-de-l-ecole",
    verifiedAt: "2026-09-27",
  },
  codeEducationEcoles: {
    id: "code-education-d411",
    label: "Code de l'éducation, articles D411-1 et suivants (fonctionnement des écoles)",
    publisher: "Légifrance",
    href: "https://www.legifrance.gouv.fr/codes/id/LEGISCTA000018380826",
    verifiedAt: "2026-09-27",
  },
  electionsParents: {
    id: "elections-parents",
    label: "Les représentants des parents d'élèves",
    publisher: "Ministère de l'Éducation nationale",
    href: "https://www.education.gouv.fr/les-representants-des-parents-d-eleves-8177",
    verifiedAt: "2026-09-27",
  },
  sortiesPage: {
    id: "sorties-premier-degre",
    label: "Sorties et voyages scolaires dans le premier degré",
    publisher: "Éduscol",
    href: "https://eduscol.education.gouv.fr/5061/sorties-et-voyages-scolaires-dans-le-premier-degre",
    verifiedAt: "2026-09-27",
  },
  sortiesGuide: {
    id: "guide-sorties",
    label: "Guide relatif à l'organisation des sorties et voyages scolaires dans le premier degré (PDF)",
    publisher: "Éduscol",
    href: "https://eduscol.education.gouv.fr/sites/default/files/document/guide-sorties-et-voyages-scolaires-premier-degre-101622.pdf",
    verifiedAt: "2026-09-27",
  },
  ppms: {
    id: "ppms",
    label: "Circulaire du 8 juin 2023 — Plan particulier de mise en sûreté (PPMS)",
    publisher: "Bulletin officiel",
    href: "https://www.education.gouv.fr/bo/2023/Hebdo26/MENE2307453C",
    verifiedAt: "2026-09-27",
  },
  securite: {
    id: "securite-ecoles",
    label: "Assurer la sécurité des écoles et des établissements",
    publisher: "Éduscol",
    href: "https://eduscol.education.fr/2651/securite-des-ecoles-et-des-etablissements",
    verifiedAt: "2026-09-27",
  },
  directionEcole: {
    id: "direction-ecole",
    label: "Direction d'école — guide pratique et film annuel",
    publisher: "Éduscol",
    href: "https://eduscol.education.gouv.fr/4398/direction-d-ecole",
    verifiedAt: "2026-09-27",
  },
  calendrier: {
    id: "calendrier-scolaire",
    label: "Calendrier scolaire",
    publisher: "Ministère de l'Éducation nationale",
    href: "https://www.education.gouv.fr/calendrier-scolaire-100148",
    verifiedAt: "2026-09-27",
  },
} satisfies Record<string, OfficialSource>;
