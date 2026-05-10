import type { AcademySubject } from "@/content/academy";

type SubjectBadgesProps = {
  subjects: AcademySubject[];
};

export function SubjectBadges({ subjects }: SubjectBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {subjects.map((subject) => (
        <span
          key={subject}
          className="rounded-md border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-muted"
        >
          {subject}
        </span>
      ))}
    </div>
  );
}
