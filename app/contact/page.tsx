import type { Metadata } from "next";
import { Breadcrumb } from "@/components/navigation/breadcrumb";

export const metadata: Metadata = {
  title: "Contact — Académie Kerboeuf",
  description:
    "Contacter l'Académie Kerboeuf pour toute demande liée aux contenus pédagogiques, aux ressources et aux projets.",
};

export default function ContactPage() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Contact" },
            ]}
          />
        </div>
      </div>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded border border-jade/35 bg-jade/10 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-jade">
              Projet : Académie Kerboeuf
            </span>
            <span className="rounded border border-white/15 bg-white/[0.04] px-2.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-muted">
              Usage : pédagogique
            </span>
            <span className="rounded border border-white/15 bg-white/[0.04] px-2.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-muted">
              Page en préparation
            </span>
          </div>

          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-5xl">
            Contact
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">
            Contacter l&apos;Académie Kerboeuf
          </p>

          <p className="mt-8 text-base leading-8 text-muted">
            Cette page servira à centraliser les demandes liées aux contenus
            pédagogiques, aux ressources et aux projets de l&apos;Académie
            Kerboeuf.
          </p>
        </div>
      </section>
    </main>
  );
}
