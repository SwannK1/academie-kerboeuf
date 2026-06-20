import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import {
  BackToSchoolClassSummary,
  BackToSchoolOverview,
} from "@/components/academy/TeacherBackToSchool";

export const metadata: Metadata = {
  title: "Préparer ma rentrée | Académie Kerboeuf",
  description:
    "Tableau de bord local pour préparer une rentrée scolaire : commandes, installation de la classe, premières semaines et réunion parents.",
};

const QUICK_LINKS = [
  { href: "/enseignants/rentree/commandes", label: "Commander et inventorier" },
  { href: "/enseignants/rentree/installation", label: "Installer ma classe" },
  {
    href: "/enseignants/rentree/premieres-semaines",
    label: "Préparer les premières semaines",
  },
  {
    href: "/enseignants/rentree/reunion-parents",
    label: "Préparer la réunion parents",
  },
] as const;

export default function BackToSchoolDashboardPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Préparer ma rentrée" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Préparer ma rentrée
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Un tableau de bord local pour ne rien oublier avant la rentrée.
            Toutes les données restent sur cet appareil.
          </p>
        </header>

        <div className="mt-10 grid gap-6">
          <DashboardSection id="ma-classe" title="Ma classe">
            <BackToSchoolClassSummary />
            <Link
              href="/enseignants/ma-classe"
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md border border-sky/35 bg-sky/10 px-4 text-sm font-black text-sky transition hover:bg-sky hover:text-ink"
            >
              Configurer ma classe
            </Link>
          </DashboardSection>

          <DashboardSection id="mes-blocs" title="Mes blocs de préparation">
            <div className="grid gap-2 sm:grid-cols-2">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex min-h-11 items-center justify-between rounded-md border border-white/10 bg-background/45 px-4 text-sm font-bold text-foreground transition hover:border-jade/40 hover:bg-jade/[0.08]"
                >
                  {link.label}
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </DashboardSection>

          <DashboardSection id="checklist" title="Premières semaines et réunion parents">
            <BackToSchoolOverview />
          </DashboardSection>
        </div>
      </div>
    </main>
  );
}

function DashboardSection({
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
