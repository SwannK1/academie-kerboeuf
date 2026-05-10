import { isPublishable } from "@/lib/publishable";
import type { MissionTeacherUse } from "@/content/missions";

type CurriculumLinkPanelProps = {
  curriculumDomain?: string;
  curriculumCompetency?: string;
  cycle?: string;
  skillTags?: string[];
  teacherUse?: MissionTeacherUse[];
  studentUse?: string;
};

const teacherUseLabels: Record<MissionTeacherUse, string> = {
  projection: "Projection",
  impression: "Impression",
  "entraînement": "Entraînement",
  "révision": "Révision",
};

export function CurriculumLinkPanel({
  curriculumDomain,
  curriculumCompetency,
  cycle,
  skillTags,
  teacherUse,
  studentUse,
}: CurriculumLinkPanelProps) {
  const domain = isPublishable(curriculumDomain) ? curriculumDomain : null;
  const competency = isPublishable(curriculumCompetency) ? curriculumCompetency : null;
  const resolvedCycle = cycle ?? null;
  const resolvedSkillTags = skillTags?.length ? skillTags : null;
  const resolvedTeacherUse = teacherUse?.length ? teacherUse : null;
  const resolvedStudentUse = isPublishable(studentUse) ? studentUse : null;

  if (
    !domain &&
    !competency &&
    !resolvedCycle &&
    !resolvedSkillTags &&
    !resolvedTeacherUse &&
    !resolvedStudentUse
  ) {
    return null;
  }

  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky">
        Lien au programme
      </p>
      <dl className="mt-4 space-y-3 text-sm">
        {domain ? (
          <div className="flex items-start justify-between gap-4">
            <dt className="shrink-0 text-xs font-bold uppercase tracking-[0.14em] text-muted">
              Domaine
            </dt>
            <dd className="text-right text-foreground">{domain}</dd>
          </div>
        ) : null}
        {competency ? (
          <div className="flex items-start justify-between gap-4">
            <dt className="shrink-0 text-xs font-bold uppercase tracking-[0.14em] text-muted">
              Compétence
            </dt>
            <dd className="text-right text-foreground">{competency}</dd>
          </div>
        ) : null}
        {resolvedCycle ? (
          <div className="flex items-start justify-between gap-4">
            <dt className="shrink-0 text-xs font-bold uppercase tracking-[0.14em] text-muted">
              Cycle
            </dt>
            <dd className="text-right text-foreground">{resolvedCycle}</dd>
          </div>
        ) : null}
        {resolvedSkillTags ? (
          <div>
            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              Habiletés
            </dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {resolvedSkillTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-xs font-bold uppercase tracking-[0.1em] text-muted"
                >
                  {tag}
                </span>
              ))}
            </dd>
          </div>
        ) : null}
        {resolvedTeacherUse ? (
          <div>
            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              Usage prof
            </dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {resolvedTeacherUse.map((use) => (
                <span
                  key={use}
                  className="rounded border border-sky/30 bg-sky/10 px-2 py-0.5 text-xs font-bold uppercase tracking-[0.1em] text-sky"
                >
                  {teacherUseLabels[use]}
                </span>
              ))}
            </dd>
          </div>
        ) : null}
        {resolvedStudentUse ? (
          <div>
            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              Consigne élève
            </dt>
            <dd className="mt-1 leading-6 text-muted">{resolvedStudentUse}</dd>
          </div>
        ) : null}
      </dl>
    </div>
  );
}
