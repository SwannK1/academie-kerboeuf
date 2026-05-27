import type { Metadata } from "next";
import Link from "next/link";
import { realization } from "@/content/kerweb";

export const metadata: Metadata = {
  title: { absolute: "Réalisations — KerWeb Studio" },
  description:
    "Chez Juju & Fifi, restaurant à Chelles : site moderne avec réservation, espace admin, emails automatiques et visibilité locale.",
};

export default function RealisationsPage() {
  return (
    <main className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="section-shell">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-blue">
            Réalisation réelle
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-foreground sm:text-6xl">
            {realization.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            {realization.description}
          </p>
        </div>

        <div className="glass-card-strong mt-10 overflow-hidden rounded-md p-5 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="rounded-md border border-white/75 bg-white/58 p-5 shadow-inner shadow-white/70">
              <div className="rounded-md bg-foreground p-5 text-white shadow-[0_24px_70px_rgba(8,35,61,0.22)]">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-200">
                  Restaurant à Chelles
                </p>
                <h2 className="mt-4 text-3xl font-black">
                  Chez Juju & Fifi
                </h2>
                <p className="mt-4 text-sm leading-7 text-sky-100">
                  Un site clair pour réserver, consulter les informations
                  pratiques et renforcer la visibilité locale.
                </p>
                <div className="mt-6 grid gap-3">
                  {["Réserver", "Voir la carte", "Appeler"].map((item) => (
                    <div key={item} className="rounded-md bg-white/12 px-4 py-3 text-sm font-black">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black text-foreground">
                Fonctionnalités
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {realization.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-md border border-sky/20 bg-white/64 px-4 py-2 text-sm font-black text-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={realization.href}
                  target="_blank"
                  rel="noreferrer"
                  className="light-button inline-flex h-12 items-center justify-center rounded-md bg-blue px-6 text-sm font-black text-white premium-transition hover:bg-[#0b5ee0]"
                >
                  Voir le site
                </Link>
                <Link
                  href="/creer-mon-site"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-sky/30 bg-sky/[0.07] px-6 text-sm font-black text-sky transition hover:bg-sky/[0.12]"
                >
                  Je veux un site comme celui-ci
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
