import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { menuHighlights, restaurantInfo } from "@/content/restaurant-info";

export const metadata: Metadata = {
  title: { absolute: "Chez Juju & Fifi — Restaurant français à Chelles" },
  description:
    "Restaurant français à Chelles, cuisine traditionnelle, menu du jour, terrasse, groupes et réservation en ligne.",
};

export default function Home() {
  return (
    <main>
      <section className="relative isolate overflow-hidden px-4 pt-28 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-30 opacity-35" />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(5,8,7,0.16),rgba(9,16,15,0.96))]" />
        <div className="mx-auto grid min-h-[calc(92svh-7rem)] max-w-7xl items-center gap-10 pb-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Restaurant à Chelles
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl lg:text-7xl">
              Chez Juju & Fifi
            </h1>
            <p className="mt-5 text-2xl font-black text-jade sm:text-3xl">
              Restaurant français, ambiance bistrot et cuisine traditionnelle.
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Chez Juju & Fifi est un restaurant français situé à Chelles,
              pensé pour les repas du midi, les dîners conviviaux et les repas
              de groupe. Le restaurant propose un menu du jour, une carte simple
              et une terrasse pour les beaux jours.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/reservation"
                className="inline-flex h-12 items-center justify-center rounded-md bg-gold px-6 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
              >
                Réserver une table
              </Link>
              <Link
                href="/carte"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/15 bg-white/[0.05] px-6 text-sm font-bold text-foreground transition hover:bg-white/10"
              >
                Voir la carte
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-md border border-white/10 bg-white/[0.04]">
            <Image
              src="/images/restaurant/table-bistrot-terrasse.png"
              alt="Table de bistrot en terrasse chez Chez Juju & Fifi à Chelles"
              width={900}
              height={720}
              priority
              className="aspect-[5/4] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">
          {menuHighlights.map((item) => (
            <div
              key={item}
              className="rounded-md border border-white/10 bg-white/[0.04] p-5"
            >
              <p className="text-sm font-black text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-panel/40 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
              Cuisine et accueil
            </p>
            <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">
              Un bistrot français pour Chelles et les environs.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-muted">
            <p>
              La maison accueille les clients pour un déjeuner rapide, une pause
              plus tranquille ou un repas entre collègues. La réservation en
              ligne permet aussi de préparer les repas de groupe.
            </p>
            <p>
              Le vendredi soir, le couscous complète l’offre du restaurant pour
              les habitués et les nouveaux clients. Les informations pratiques
              sont disponibles sur la page contact.
            </p>
            <p>
              {restaurantInfo.address.streetAddress},{" "}
              {restaurantInfo.address.postalCode}{" "}
              {restaurantInfo.address.addressLocality} ·{" "}
              {restaurantInfo.displayPhone}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
