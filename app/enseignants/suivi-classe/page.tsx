import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { OrganizerContextBand } from "@/components/academy/OrganizerContextBand";
import { TeacherClassroomTrackingClient } from "@/components/academy/TeacherClassroomTrackingClient";

export const metadata: Metadata = {
  title: "Suivi de classe | Espace enseignants | Académie Kerboeuf",
  description:
    "Gardez des observations pédagogiques par niveau, conservées uniquement sur cet appareil.",
};

type SearchParams = Record<string, string | string[] | undefined>;

function asString(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function TeacherClassroomTrackingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const niveau = asString(params.niveau);

  return (
    <main>
      <OrganizerContextBand current="suivi" params={{ niveau }} />

      <div className="px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Enseignants", href: "/enseignants" },
              { label: "Suivi de classe" },
            ]}
          />
        </div>
      </div>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Outil enseignant
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Suivi de classe
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
            Choisissez un niveau et notez des observations pédagogiques par
            élève et par date. Ces données restent uniquement sur cet
            appareil et ne sont jamais transmises dans l&apos;URL.
          </p>

          <TeacherClassroomTrackingClient initialNiveau={niveau} />
        </div>
      </section>
    </main>
  );
}
