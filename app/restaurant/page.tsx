import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Le restaurant — Bistrot français à Chelles" },
  description:
    "Découvrez Chez Juju & Fifi, bistrot français à Chelles avec salle conviviale, terrasse et cuisine maison.",
};

export default function RestaurantPage() {
  return (
    <main className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
            Le restaurant
          </p>
          <h1 className="mt-4 text-5xl font-black leading-tight text-foreground sm:text-6xl">
            Bistrot français à Chelles
          </h1>
          <div className="mt-6 space-y-5 text-lg leading-8 text-muted">
            <p>
              Chez Juju & Fifi est un restaurant français à Chelles avec une
              salle conviviale, une terrasse et une cuisine traditionnelle.
            </p>
            <p>
              L’adresse convient aux repas du midi, aux dîners entre proches et
              aux repas de groupe, avec une ambiance bistrot simple et
              chaleureuse.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/reservation"
              className="inline-flex h-12 items-center justify-center rounded-md bg-gold px-6 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
            >
              Réserver
            </Link>
            <Link
              href="/menu-du-jour"
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/15 bg-white/[0.05] px-6 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              Menu du jour
            </Link>
          </div>
        </div>
        <Image
          src="/images/restaurant/sandwichs-comptoir.png"
          alt="Comptoir de restaurant français chez Chez Juju & Fifi à Chelles"
          width={900}
          height={720}
          className="aspect-[5/4] rounded-md border border-white/10 object-cover"
        />
      </section>
    </main>
  );
}
