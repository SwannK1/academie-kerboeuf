import Link from "next/link";

type StepId =
  | "annuelle"
  | "periode"
  | "emploi-du-temps"
  | "seance"
  | "plan-classe"
  | "suivi";

const STEPS: { id: StepId; label: string; href: string }[] = [
  { id: "annuelle", label: "Programmation annuelle", href: "/enseignants/programmation/annuelle" },
  { id: "periode", label: "Progression de période", href: "/enseignants/programmation/periode" },
  { id: "emploi-du-temps", label: "Emploi du temps", href: "/enseignants/emploi-du-temps" },
  { id: "seance", label: "Préparation de séance", href: "/enseignants/preparer-une-seance" },
  { id: "plan-classe", label: "Plan de classe", href: "/enseignants/plan-de-classe" },
  { id: "suivi", label: "Suivi de classe", href: "/enseignants/suivi-classe" },
];

const CARRIED_PARAM_KEYS = [
  "niveau",
  "matiere",
  "periode",
  "semaine",
  "creneau",
  "jour",
] as const;

export type OrganizerContextParams = Partial<
  Record<(typeof CARRIED_PARAM_KEYS)[number], string>
>;

function buildSuffix(params: OrganizerContextParams): string {
  const query = new URLSearchParams();
  for (const key of CARRIED_PARAM_KEYS) {
    const value = params[key];
    if (value) query.set(key, value);
  }
  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
}

export function OrganizerContextBand({
  current,
  params = {},
}: {
  current: StepId;
  params?: OrganizerContextParams;
}) {
  const suffix = buildSuffix(params);

  return (
    <nav
      aria-label="Organisateur de classe"
      className="border-b border-white/10 bg-background/60 px-4 py-2 text-xs sm:px-6 lg:px-8"
    >
      <ol className="mx-auto flex max-w-5xl flex-wrap items-center gap-1.5">
        <li className="flex items-center gap-1.5">
          <Link
            href={`/enseignants${suffix}`}
            className="font-medium text-muted transition hover:text-foreground"
          >
            Ma classe
          </Link>
          <span aria-hidden="true" className="text-muted/50">
            ›
          </span>
        </li>
        {STEPS.map((step, index) => {
          const isCurrent = step.id === current;
          return (
            <li key={step.id} className="flex items-center gap-1.5">
              {isCurrent ? (
                <span aria-current="page" className="font-bold text-gold">
                  {step.label}
                </span>
              ) : (
                <Link
                  href={`${step.href}${suffix}`}
                  className="font-medium text-muted transition hover:text-foreground"
                >
                  {step.label}
                </Link>
              )}
              {index < STEPS.length - 1 ? (
                <span aria-hidden="true" className="text-muted/50">
                  ›
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
