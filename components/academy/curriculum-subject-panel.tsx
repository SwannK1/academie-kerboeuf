import { CurriculumMapSection } from "@/components/academy/curriculum-map-section";
import type { CurriculumLevelMap } from "@/content/curriculum-map-types";

type CurriculumSubjectPanelProps = {
  curriculumLevelMap: CurriculumLevelMap;
};

export function CurriculumSubjectPanel({
  curriculumLevelMap,
}: CurriculumSubjectPanelProps) {
  if (curriculumLevelMap.domains.length === 0) return null;

  const subjectGroups = groupBySubject(curriculumLevelMap);

  return (
    <div className="grid gap-7">
      {subjectGroups.map(({ subject, domains }) => (
        <section key={subject} aria-labelledby={`subject-${toSlug(subject)}`}>
          <h3
            id={`subject-${toSlug(subject)}`}
            className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-sky"
          >
            {subject}
          </h3>
          <div className="grid gap-4">
            {domains.map((domain) => (
              <CurriculumMapSection key={domain.domainSlug} domain={domain} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

type SubjectGroup = {
  subject: string;
  domains: CurriculumLevelMap["domains"];
};

function groupBySubject(map: CurriculumLevelMap): SubjectGroup[] {
  const groups: Map<string, CurriculumLevelMap["domains"]> = new Map();
  for (const domain of map.domains) {
    const existing = groups.get(domain.subject) ?? [];
    groups.set(domain.subject, [...existing, domain]);
  }
  return Array.from(groups.entries()).map(([subject, domains]) => ({
    subject,
    domains,
  }));
}

function toSlug(label: string): string {
  return label.toLowerCase().replace(/\s+/g, "-");
}
