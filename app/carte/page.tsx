import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Carte du restaurant — Chez Juju & Fifi à Chelles" },
  description:
    "Consultez la carte de Chez Juju & Fifi : plats français, menu du jour, desserts et couscous du vendredi soir.",
};

const sections = [
  {
    title: "Cuisine française",
    text: "Une carte de restaurant français avec des plats traditionnels et une ambiance bistrot.",
  },
  {
    title: "Menu du jour",
    text: "Une proposition du jour pour le déjeuner, à retrouver selon le service.",
  },
  {
    title: "Couscous du vendredi soir",
    text: "Le vendredi soir, le couscous complète l’offre du restaurant.",
  },
  {
    title: "Desserts",
    text: "Des desserts pour terminer le repas sur une note simple et conviviale.",
  },
];

export default function CartePage() {
  return (
    <main className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
            Carte
          </p>
          <h1 className="mt-4 text-5xl font-black leading-tight text-foreground sm:text-6xl">
            Carte du restaurant à Chelles
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            Consultez l’esprit de la carte de Chez Juju & Fifi : une cuisine
            traditionnelle, un menu du jour, des desserts et le couscous du
            vendredi soir.
          </p>
        </div>
        <Image
          src="/images/restaurant/plat-maison.png"
          alt="Plat maison de restaurant français à Chelles"
          width={900}
          height={720}
          className="aspect-[5/4] rounded-md border border-white/10 object-cover"
        />
      </section>

      <section className="mx-auto mt-12 grid max-w-7xl gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-md border border-white/10 bg-white/[0.04] p-6"
          >
            <h2 className="text-2xl font-black text-foreground">
              {section.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-muted">{section.text}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-12 max-w-7xl rounded-md border border-jade/30 bg-jade/10 p-6">
        <p className="text-base leading-8 text-foreground">
          Pour connaître les propositions disponibles aujourd’hui, contactez le
          restaurant ou réservez votre table avant votre venue.
        </p>
        <Link
          href="/reservation"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-md bg-gold px-6 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
        >
          Réserver
        </Link>
      </section>
    </main>
  );
}
