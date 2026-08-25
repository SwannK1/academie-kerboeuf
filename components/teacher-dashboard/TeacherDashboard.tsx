import Link from "next/link";
import type { TeacherDashboardSection } from "@/content/teacher-dashboard";

const cardClassByTier: Record<string, string> = {
  essentiels:
    "flex flex-col rounded-lg border border-gold/35 bg-gold/[0.06] p-5 transition hover:border-gold/55 hover:bg-gold/[0.1]",
  classe:
    "flex flex-col rounded-lg border border-sky/25 bg-sky/[0.05] p-4 transition hover:border-sky/45 hover:bg-sky/[0.09]",
  plus: "flex flex-col rounded-lg border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20 hover:bg-white/[0.06]",
};

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
          {section.description ? (
            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">
              {section.description}
            </p>
          ) : null}
          <div
            className={`mt-4 grid gap-3 sm:grid-cols-2 ${
              section.tier === "essentiels" ? "lg:grid-cols-3" : "lg:grid-cols-4"
            }`}
          >
            {section.cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className={cardClassByTier[section.tier] ?? cardClassByTier.classe}
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
