import Image from "next/image";
import Link from "next/link";
import { PrimairePortalHoverZones } from "@/components/academy/PrimairePortalHoverZones";
import { PORTAL_ZONES } from "@/components/academy/primaire-portal-zones";

// ── Composant principal ─────────────────────────────────────────────────────
// Server Component : seule la superposition de zones survolables
// (PrimairePortalHoverZones) a besoin d'interactivité côté client.

export function PrimairePortalMap() {
  return (
    <>
      {/* ── Desktop : portail immersif plein écran ────────────────────────── */}
      <section
        className="relative hidden overflow-hidden md:block"
        style={{ height: "100svh" }}
        aria-label="Portail des niveaux — choisir un guide"
      >
        {/* Image de fond */}
        <Image
          src="/images/academie-kerboeuf/lieux/primaire/portail-primaire.png"
          alt="Les cinq guides des Lisières : Kiwi, Gaston, Esteban, Noisette et Félix"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />

        {/* Vignette haut/bas — renforce l'immersion sans cacher les personnages */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,8,7,0.35) 0%, transparent 18%, transparent 72%, rgba(5,8,7,0.55) 100%)",
          }}
        />

        {/* Zones interactives */}
        <PrimairePortalHoverZones />

        {/* Bouton retour — discret, positionné en bas à gauche de l'image */}
        <Link
          href="/"
          className="absolute bottom-6 left-5 z-10 rounded-md border border-white/18 bg-ink/45 px-3 py-2 text-xs font-bold text-white/70 backdrop-blur-sm transition-all duration-200 hover:bg-ink/65 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
        >
          ← Accueil
        </Link>
      </section>

      {/* ── Mobile : image simple + 5 cartes accessibles ─────────────────── */}
      {/* Les effets de silhouette sont désactivés sur mobile
          pour garantir stabilité et accessibilité tactile. */}
      <section className="md:hidden">
        {/* Image du portail — rapport 16:9, sans zones interactives */}
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src="/images/academie-kerboeuf/lieux/primaire/portail-primaire.png"
            alt="Les cinq guides des Lisières : Kiwi, Gaston, Esteban, Noisette et Félix"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 60%, rgba(5,8,7,0.6) 100%)",
            }}
          />
        </div>

        {/* Cartes de navigation */}
        <nav
          aria-label="Choisir un niveau"
          className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3"
        >
          {PORTAL_ZONES.map((zone) => (
            <Link
              key={zone.slug}
              href={zone.href}
              className="flex flex-col rounded-md border border-white/10 bg-white/[0.04] p-4 transition hover:bg-white/[0.07] active:bg-white/[0.10] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/40"
            >
              <span
                className="text-xs font-bold uppercase tracking-[0.18em]"
                style={{ color: `rgba(${zone.rgb}, 1)` }}
              >
                {zone.label}
              </span>
              <span className="mt-2 text-base font-black text-foreground">
                {zone.character}
              </span>
              <span className="mt-0.5 text-xs text-muted">{zone.animal}</span>
            </Link>
          ))}
        </nav>
      </section>
    </>
  );
}
