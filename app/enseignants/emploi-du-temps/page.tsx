import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { OrganizerContextBand } from "@/components/academy/OrganizerContextBand";
import { TeacherWeeklyTimetable } from "@/components/academy/TeacherWeeklyTimetable";

export const metadata: Metadata = {
  title: "Emploi du temps hebdomadaire | Académie Kerboeuf",
  description:
    "Construisez une semaine type pour votre classe : choisissez un niveau, répartissez les matières par créneau et suivez le total d'heures.",
};

type SearchParams = Record<string, string | string[] | undefined>;

function asString(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function TeacherWeeklyTimetablePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const niveau = asString(params.niveau);

  return (
    <main className="pb-16 pt-10">
      <OrganizerContextBand current="emploi-du-temps" params={{ niveau }} />

      <div className="mx-auto max-w-5xl px-4 pt-14 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "Emploi du temps" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Emploi du temps hebdomadaire
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Choisissez un niveau, associez une matière à chaque créneau de la
            semaine et vérifiez le total d’heures par rapport au repère de 24 h
            hebdomadaires de l’école élémentaire. Votre emploi du temps est
            sauvegardé sur cet appareil.
          </p>
        </header>

        <TeacherWeeklyTimetable initialNiveau={niveau} />
      </div>
    </main>
  );
}
