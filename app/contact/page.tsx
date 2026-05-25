import type { Metadata } from "next";
import Link from "next/link";
import { restaurantInfo } from "@/content/restaurant-info";

export const metadata: Metadata = {
  title: { absolute: "Contact et accès — Restaurant Chez Juju & Fifi à Chelles" },
  description:
    "Adresse, téléphone, horaires et accès du restaurant Chez Juju & Fifi à Chelles.",
};

export default function ContactPage() {
  return (
    <main className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
          Contact et accès
        </p>
        <h1 className="mt-4 text-5xl font-black leading-tight text-foreground sm:text-6xl">
          Restaurant Chez Juju & Fifi à Chelles
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
          Retrouvez l’adresse, le téléphone et les informations pratiques pour
          venir au restaurant Chez Juju & Fifi à Chelles.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-black text-foreground">Adresse</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              {restaurantInfo.address.streetAddress}
              <br />
              {restaurantInfo.address.postalCode}{" "}
              {restaurantInfo.address.addressLocality}
            </p>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-black text-foreground">Téléphone</h2>
            <Link
              href={`tel:${restaurantInfo.telephone}`}
              className="mt-4 inline-flex text-sm font-black text-gold"
            >
              {restaurantInfo.displayPhone}
            </Link>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-black text-foreground">Horaires</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              Du lundi au samedi, midi et soir.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
