import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { OrganizerContextBand } from "@/components/academy/OrganizerContextBand";
import { TeacherYearlyProgrammation } from "@/components/academy/TeacherYearlyProgrammationClient";

export const metadata: Metadata = {
  title: "Programmation annuelle | Espace enseignants | Académie Kerboeuf",
  description:
    "Choisissez un niveau, puis organisez les séquences de l'année par période.",
};

type SearchParams = Record<string, string | string[] | undefined>;

function asString(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function TeacherYearlyProgrammationPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const niveau = asString(params.niveau);

  return (
    <main className="pb-16 pt-10">
      <OrganizerContextBand current="annuelle" params={{ niveau }} />

      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Programmation", href: "/enseignants/programmation" },
            { label: "Programmation annuelle" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Programmation annuelle
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Choisissez un niveau, puis organisez les séquences par période.
          </p>
        </header>

        <div className="mt-10">
          <TeacherYearlyProgrammation initialNiveau={niveau} />
        </div>
      </div>
    </main>
  );
}
