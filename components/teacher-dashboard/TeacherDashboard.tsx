import Link from "next/link";
import type {
  TeacherDashboardCard,
  TeacherDashboardSection,
} from "@/content/teacher-dashboard";

export function TeacherDashboard({
  priorityCards,
  sections,
}: {
  priorityCards: TeacherDashboardCard[];
  sections: TeacherDashboardSection[];
}) {
  return (
    <div className="mt-10 space-y-10">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {priorityCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="flex flex-col rounded-lg border-2 border-gold/40 bg-gold/[0.07] p-5 transition hover:border-gold/70 hover:bg-gold/[0.12]"
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

      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-muted">
            {section.title}
          </h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {section.cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="flex items-start gap-2 rounded-lg border border-sky/25 bg-sky/[0.05] p-3 transition hover:border-sky/45 hover:bg-sky/[0.09]"
              >
                <span aria-hidden="true" className="text-lg">
                  {card.icon}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-bold text-foreground">
                    {card.title}
                  </span>
                  <span className="text-xs leading-snug text-muted">
                    {card.description}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
