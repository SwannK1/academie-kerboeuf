import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { TeacherApcPlanner } from "@/components/teacher-apc-planner/TeacherApcPlanner";

export const metadata: Metadata = {
  title: "Préparer mes APC | Académie Kerboeuf",
  description:
    "Préparez vos séances et cycles d'APC : axe, objectif, période, durée, matériel, déroulé et bilan collectif. Aucun nom d'élève, aucun suivi individuel.",
};

export default function TeacherApcPlannerPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Enseignants", href: "/enseignants" },
            { label: "APC" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Espace enseignants
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Préparer mes APC
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Organisez vos séances et cycles d&apos;activités pédagogiques
            complémentaires par axe, période et statut. Cet outil ne stocke
            aucun nom d&apos;élève, aucune difficulté individuelle et aucun
            diagnostic. Vos données restent sur cet appareil.
          </p>
        </header>

        <div className="mt-10">
          <TeacherApcPlanner />
        </div>
      </div>
    </main>
  );
}
