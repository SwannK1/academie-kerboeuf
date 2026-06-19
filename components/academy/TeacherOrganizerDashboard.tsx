import type { ReactNode } from "react";
import Link from "next/link";
import {
  ClassSummaryCard,
  ConfigureClassButton,
  OrganizerTaskList,
} from "@/components/academy/TeacherOrganizerDashboardClient";

export function TeacherOrganizerDashboard() {
  return (
    <div className="mt-10 grid gap-6">
      <OrganizerSection id="ma-classe" title="Ma classe">
        <ClassSummaryCard />
        <ConfigureClassButton />
      </OrganizerSection>

      <OrganizerSection id="preparer-aujourdhui" title="Préparer aujourd’hui">
        <div className="grid gap-2 sm:grid-cols-2">
          <OrganizerLink href="/enseignants/preparer-une-seance">
            Préparer une séance
          </OrganizerLink>
          <OrganizerLink href="/enseignants/emploi-du-temps">
            Consulter l’emploi du temps
          </OrganizerLink>
          <OrganizerLink href="/enseignants/plan-de-classe">
            Ouvrir le plan de classe
          </OrganizerLink>
          <OrganizerLink href="/enseignants/suivi-classe">
            Consulter les observations
          </OrganizerLink>
        </div>
      </OrganizerSection>

      <OrganizerSection id="organiser-annee" title="Organiser l’année">
        <div className="grid gap-2 sm:grid-cols-3">
          <OrganizerLink href="/enseignants/programmation">
            Programmation annuelle
          </OrganizerLink>
          <OrganizerLink href="/enseignants/progression">
            Progression de période
          </OrganizerLink>
          <OrganizerLink href="/enseignants/emploi-du-temps">
            Emploi du temps hebdomadaire
          </OrganizerLink>
        </div>
      </OrganizerSection>

      <OrganizerSection id="quotidien" title="Ma classe au quotidien">
        <div className="grid gap-2 sm:grid-cols-2">
          <OrganizerLink href="/enseignants/plan-de-classe">
            Plan de classe
          </OrganizerLink>
          <OrganizerLink href="/enseignants/suivi-classe">
            Suivi de classe
          </OrganizerLink>
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
