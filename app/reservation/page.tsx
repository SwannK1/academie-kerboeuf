import type { Metadata } from "next";
import Link from "next/link";
import { restaurantInfo } from "@/content/restaurant-info";

export const metadata: Metadata = {
  title: { absolute: "Réserver un restaurant à Chelles — Chez Juju & Fifi" },
  description:
    "Réservez votre table chez Chez Juju & Fifi, restaurant français à Chelles pour le midi, le soir ou les repas de groupe.",
};

export default function ReservationPage() {
  return (
    <main className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
          Réservation
        </p>
        <h1 className="mt-4 text-5xl font-black leading-tight text-foreground sm:text-6xl">
          Réserver un restaurant à Chelles
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
          Réservez votre table chez Chez Juju & Fifi pour un repas du midi, un
          dîner ou un repas de groupe. Le restaurant français accueille les
          clients à Chelles dans une ambiance bistrot.
        </p>
        <div className="mt-10 rounded-md border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-black text-foreground">
            Contacter le restaurant
          </h2>
          <p className="mt-4 text-base leading-8 text-muted">
            Pour réserver ou préparer un repas de groupe, appelez directement le
            restaurant.
          </p>
          <Link
            href={`tel:${restaurantInfo.telephone}`}
            className="mt-6 inline-flex h-12 items-center justify-center rounded-md bg-gold px-6 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
          >
            {restaurantInfo.displayPhone}
          </Link>
        </div>
      </section>
    </main>
  );
}
