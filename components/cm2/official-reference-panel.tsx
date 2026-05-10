import type {
  OfficialReference,
  LsuDomain,
  CrossCurricularLink,
} from "@/content/felix-types";

type Props = {
  officialReference?: OfficialReference;
  lsuLinks?: LsuDomain[];
  crossCurricular?: CrossCurricularLink[];
};

const frameworkStyle: Record<string, string> = {
  CRCN: "border-sky/30 bg-sky/10 text-sky",
  EMI: "border-jade/30 bg-jade/10 text-jade",
  EMC: "border-gold/30 bg-gold/10 text-gold",
  EDD: "border-ember/30 bg-ember/10 text-ember",
};

export function OfficialReferencePanel({
  officialReference,
  lsuLinks,
  crossCurricular,
}: Props) {
  const hasContent =
    Boolean(officialReference) ||
    (lsuLinks && lsuLinks.length > 0) ||
    (crossCurricular && crossCurricular.length > 0);

  if (!hasContent) return null;

  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
        Ancrages officiels
      </p>

      {officialReference ? (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded border border-jade/30 bg-jade/10 px-2 py-0.5 text-xs font-bold text-jade">
              {officialReference.cycle}
            </span>
            <span className="rounded border border-jade/30 bg-jade/10 px-2 py-0.5 text-xs font-bold text-jade">
              {officialReference.level}
            </span>
            <span className="rounded border border-white/15 bg-white/[0.04] px-2 py-0.5 text-xs font-bold text-muted">
              {officialReference.domain}
            </span>
          </div>

          {officialReference.programReference ? (
            <p className="mt-3 text-xs leading-5 text-muted">
              {officialReference.programReference}
            </p>
          ) : null}

          {officialReference.competencyItems.length > 0 ? (
            <div className="mt-4">
              <p className="text-xs font-bold text-foreground">
                Compétences du socle
              </p>
              <ul className="mt-2 space-y-1">
                {officialReference.competencyItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs leading-5 text-muted"
                  >
                    <span
                      className="mt-1.5 size-1 shrink-0 rounded-full bg-jade/60"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      {lsuLinks && lsuLinks.length > 0 ? (
        <div className="mt-5 border-t border-white/10 pt-4">
          <p className="text-xs font-bold text-foreground">
            Livret Scolaire Unique (LSU)
          </p>
          <div className="mt-3 space-y-4">
            {lsuLinks.map((domain) => (
              <div key={domain.domain}>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                  {domain.domain}
                </p>
                <ul className="mt-1 space-y-1">
                  {domain.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs leading-5 text-muted"
                    >
                      <span
                        className="mt-1.5 size-1 shrink-0 rounded-full bg-white/25"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {crossCurricular && crossCurricular.length > 0 ? (
        <div className="mt-5 border-t border-white/10 pt-4">
          <p className="text-xs font-bold text-foreground">Liens transversaux</p>
          <div className="mt-3 space-y-3">
            {crossCurricular.map((link) => (
              <div key={link.framework} className="flex items-start gap-3">
                <span
                  className={`shrink-0 rounded border px-1.5 py-0.5 font-mono text-[10px] font-black uppercase ${frameworkStyle[link.framework] ?? "border-white/15 bg-white/[0.04] text-muted"}`}
                >
                  {link.framework}
                </span>
                <p className="text-xs leading-5 text-muted">{link.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
