import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { OrganizerContextBand } from "@/components/academy/OrganizerContextBand";
import { TeacherSessionPrepClient } from "@/components/academy/TeacherSessionPrepClient";

export const metadata: Metadata = {
  title: "Préparer une séance | Espace enseignants | Académie Kerboeuf",
  description:
    "Préparez une séance concrète : objectif, découverte, entraînement et synthèse, à partir du niveau, de la matière, de la période et de la semaine.",
};

type SearchParams = Record<string, string | string[] | undefined>;

function asString(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function TeacherSessionPrepPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const niveau = asString(params.niveau);
  const matiere = asString(params.matiere);
  const periode = asString(params.periode);
  const semaine = asString(params.semaine);
  const creneau = asString(params.creneau);

  return (
    <main>
      <OrganizerContextBand
        current="seance"
        params={{ niveau, matiere, periode, semaine, creneau }}
      />

      <div className="px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Enseignants", href: "/enseignants" },
              { label: "Préparer une séance" },
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
            Préparer une séance
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
            Partez du niveau, de la matière, de la période et de la semaine
            pour construire le déroulé d&apos;une séance concrète. La séance
            est enregistrée uniquement sur cet appareil.
          </p>

          <TeacherSessionPrepClient
            initialNiveau={niveau}
            initialMatiere={matiere}
            initialPeriode={periode}
            initialSemaine={semaine}
            initialCreneau={creneau}
          />
        </div>
      </section>
    </main>
  );
}
