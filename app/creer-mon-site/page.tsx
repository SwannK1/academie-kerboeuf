import type { Metadata } from "next";
import { ProjectWizard } from "@/components/kerweb/ProjectWizard";

export const metadata: Metadata = {
  title: { absolute: "Créer mon site internet — KerWeb Studio" },
  description:
    "Répondez à quelques questions et recevez une première analyse de votre besoin. Questionnaire gratuit, sans engagement.",
};

export default function CreerMonSitePage() {
  return (
    <main className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <span className="soft-halo left-[4%] top-24 h-64 w-64" aria-hidden="true" />
      <span className="soft-halo right-[6%] top-16 h-80 w-80" aria-hidden="true" />

      <section className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-blue">
            KerWeb Studio
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Créer mon site internet
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted">
            Répondez à quelques questions et recevez une première analyse de
            votre besoin.
          </p>
        </div>

        <div className="glass-card-strong mx-auto mt-10 max-w-3xl rounded-md p-6 sm:p-8">
          <ProjectWizard />
        </div>

        <div className="mx-auto mt-6 max-w-3xl">
          <p className="text-center text-xs leading-6 text-muted">
            Questionnaire gratuit, sans engagement. Vos données sont utilisées
            uniquement pour vous répondre.
          </p>
        </div>
      </section>
    </main>
  );
}
