import type { ReactNode } from "react";
import Link from "next/link";
import {
  ClassSummaryCard,
  ConfigureClassButton,
  OrganizerTaskList,
} from "@/components/academy/TeacherOrganizerDashboardClient";

const TOOL_LINKS = [
  { href: "/enseignants/programmation", label: "Programmation annuelle" },
  { href: "/enseignants/progression", label: "Progression de période" },
  { href: "/enseignants/emploi-du-temps", label: "Emploi du temps" },
  { href: "/enseignants/preparer-une-seance", label: "Préparer une séance" },
  { href: "/enseignants/plan-de-classe", label: "Plan de classe" },
  { href: "/enseignants/suivi-classe", label: "Suivi de classe" },
] as const;

export function TeacherOrganizerDashboard() {
  return (
    <div className="mt-10 grid gap-6">
      <OrganizerSection id="ma-classe" title="Ma classe">
        <ClassSummaryCard />
        <ConfigureClassButton />
      </OrganizerSection>

      <OrganizerSection id="mes-outils" title="Mes outils">
        <div className="grid gap-2 sm:grid-cols-2">
          {TOOL_LINKS.map((tool) => (
            <OrganizerLink key={tool.href} href={tool.href}>
              {tool.label}
            </OrganizerLink>
          ))}
        </div>
      </OrganizerSection>

      <OrganizerSection id="a-faire" title="À faire">
        <OrganizerTaskList />
      </OrganizerSection>
    </div>
  );
}

function OrganizerSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titre`}
      className="rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6"
    >
      <h2 id={`${id}-titre`} className="text-xl font-black text-foreground">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function OrganizerLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex min-h-11 items-center justify-between rounded-md border border-white/10 bg-background/45 px-4 text-sm font-bold text-foreground transition hover:border-sky/40 hover:bg-sky/[0.08]"
    >
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}
