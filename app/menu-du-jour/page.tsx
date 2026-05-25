import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Menu du jour à Chelles — Chez Juju & Fifi" },
  description:
    "Menu du jour à Chelles : entrée, plat, dessert, cuisine traditionnelle et réservation possible.",
};

export default function MenuDuJourPage() {
  return (
    <main className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
          Menu du jour
        </p>
        <h1 className="mt-4 text-5xl font-black leading-tight text-foreground sm:text-6xl">
          Menu du jour à Chelles
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
          Chez Juju & Fifi propose un menu du jour à Chelles autour d’une
          cuisine traditionnelle. Selon l’ardoise, le repas peut s’organiser
          autour d’une entrée, d’un plat et d’un dessert.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {["Entrée", "Plat", "Dessert"].map((item) => (
            <div
              key={item}
              className="rounded-md border border-white/10 bg-white/[0.04] p-6"
            >
              <h2 className="text-2xl font-black text-foreground">{item}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                À retrouver directement auprès du restaurant selon le service.
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-base leading-8 text-muted">
          Pour connaître le menu du jour ou réserver une table, contactez le
          restaurant avant votre venue.
        </p>
        <Link
          href="/reservation"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-gold px-6 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
        >
          Réserver
        </Link>
      </section>
    </main>
  );
}
