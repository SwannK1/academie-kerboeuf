import Link from "next/link";
import type { TeacherDashboardSection } from "@/content/teacher-dashboard";

export function TeacherDashboard({
  sections,
}: {
  sections: TeacherDashboardSection[];
}) {
  return (
    <div className="mt-10 space-y-10">
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="text-lg font-black text-foreground">
            {section.title}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {section.cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="flex flex-col rounded-lg border border-sky/25 bg-sky/[0.05] p-4 transition hover:border-sky/45 hover:bg-sky/[0.09]"
              >
                <span aria-hidden="true" className="text-2xl">
                  {card.icon}
                </span>
                <p className="mt-3 text-base font-bold text-foreground">
                  {card.title}
                </p>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-muted">
                  {card.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
