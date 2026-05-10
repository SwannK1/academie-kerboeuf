import type { MissionAccessibility } from "@/content/felix-types";

type Props = {
  accessibility?: MissionAccessibility;
};

type AccessibilitySection = {
  label: string;
  text: string;
  color: string;
};

export function AccessibilityPanel({ accessibility }: Props) {
  if (!accessibility) return null;

  const sections: AccessibilitySection[] = [
    accessibility.dyslexia
      ? { label: "Adaptations DYS", text: accessibility.dyslexia, color: "text-sky" }
      : null,
    accessibility.ulis
      ? { label: "Dispositif ULIS", text: accessibility.ulis, color: "text-jade" }
      : null,
    accessibility.eip
      ? { label: "Élèves à haut potentiel", text: accessibility.eip, color: "text-gold" }
      : null,
  ].filter((s): s is AccessibilitySection => s !== null);

  const hasGeneral = accessibility.general && accessibility.general.length > 0;
  if (sections.length === 0 && !hasGeneral) return null;

  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
        Aides pédagogiques
      </p>

      <div className="mt-4 divide-y divide-white/10">
        {sections.map((section) => (
          <div key={section.label} className="py-4 first:pt-0">
            <p
              className={`text-xs font-bold uppercase tracking-[0.12em] ${section.color}`}
            >
              {section.label}
            </p>
            <p className="mt-1 text-xs leading-5 text-muted">{section.text}</p>
          </div>
        ))}

        {hasGeneral ? (
          <div className="py-4 first:pt-0 last:pb-0">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
              Aménagements généraux
            </p>
            <ul className="mt-2 space-y-1">
              {accessibility.general!.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs leading-5 text-muted"
                >
                  <span
                    className="mt-1.5 size-1 shrink-0 rounded-full bg-white/30"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
