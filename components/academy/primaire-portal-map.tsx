"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ── Zones cliquables ────────────────────────────────────────────────────────
// Coordonnées en % de l'image (left, top, width, height).
// Les zones couvrent les silhouettes de personnages sans se chevaucher.
// Ordre gauche → droite : Kiwi, Gaston, Esteban, Noisette, Félix.

const PORTAL_ZONES = [
  {
    slug: "cp",
    label: "CP",
    character: "Kiwi",
    animal: "la Grenouille",
    href: "/primaire/cp",
    ariaLabel: "Entrer dans le CP avec Kiwi la Grenouille",
    x: 0, y: 0, w: 22, h: 100,
    rgb: "80,200,164",   // jade
    accent: "jade" as const,
  },
  {
    slug: "ce1",
    label: "CE1",
    character: "Gaston",
    animal: "le Hérisson",
    href: "/primaire/ce1",
    ariaLabel: "Entrer dans le CE1 avec Gaston le Hérisson",
    x: 22, y: 0, w: 18, h: 100,
    rgb: "139,200,255",  // sky
    accent: "sky" as const,
  },
  {
    slug: "ce2",
    label: "CE2",
    character: "Esteban",
    animal: "le Manchot",
    href: "/primaire/ce2",
    ariaLabel: "Entrer dans le CE2 avec Esteban le Manchot",
    x: 40, y: 0, w: 21, h: 100,
    rgb: "222,104,72",   // ember
    accent: "ember" as const,
  },
  {
    slug: "cm1",
    label: "CM1",
    character: "Noisette",
    animal: "l'Écureuille",
    href: "/primaire/cm1",
    ariaLabel: "Entrer dans le CM1 avec Noisette l'Écureuille",
    x: 61, y: 0, w: 18, h: 100,
    rgb: "243,196,91",   // gold
    accent: "gold" as const,
  },
  {
    slug: "cm2",
    label: "CM2",
    character: "Félix",
    animal: "le Lynx",
    href: "/primaire/cm2",
    ariaLabel: "Entrer dans le CM2 avec Félix le Lynx",
    x: 79, y: 0, w: 21, h: 100,
    rgb: "243,196,91",   // gold
    accent: "gold" as const,
  },
] as const;

type ZoneSlug = (typeof PORTAL_ZONES)[number]["slug"];

// ── Composant principal ─────────────────────────────────────────────────────

export function PrimairePortalMap() {
  const [hovered, setHovered] = useState<ZoneSlug | null>(null);

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
        {PORTAL_ZONES.map((zone) => {
          const isHovered = hovered === zone.slug;
          const isDimmed = hovered !== null && !isHovered;

          return (
            <Link
              key={zone.slug}
              href={zone.href}
              aria-label={zone.ariaLabel}
              onMouseEnter={() => setHovered(zone.slug)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(zone.slug)}
              onBlur={() => setHovered(null)}
              className="absolute select-none focus:outline-none"
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                width: `${zone.w}%`,
                height: `${zone.h}%`,
              }}
            >
              {/* Voile sombre sur les colonnes non survolées.
                  Couvre la pleine hauteur sans border-radius supérieur
                  pour éviter des arches visibles au-dessus des personnages.
                  Assombri à ~48% : visible mais pas éteint. */}
              <span
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background: "rgba(5,8,7,0.48)",
                  opacity: isDimmed ? 1 : 0,
                  transition: "opacity 380ms ease",
                }}
              />

              {/* Double effet de contour au survol :
                  — contour interne net (inset 1.5px, opacité 0.80)
                  — lueur externe douce (spread 10px, opacité 0.16)
                  L'intensité reste basse pour un rendu premium, non flashy. */}
              <span
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  borderRadius: "50% 50% 50% 50% / 12% 12% 20% 20%",
                  boxShadow: `inset 0 0 0 1.5px rgba(${zone.rgb}, 0.80), 0 0 32px 10px rgba(${zone.rgb}, 0.16)`,
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 320ms ease",
                } as CSSProperties}
              />

              {/* Label personnage — glisse vers le haut au survol */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-5 flex flex-col items-center gap-1"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateY(0)" : "translateY(6px)",
                  transition: "opacity 300ms ease, transform 300ms ease",
                }}
              >
                <span
                  className="rounded-sm px-3 py-1 text-sm font-black text-white backdrop-blur-sm"
                  style={{
                    background: `rgba(${zone.rgb}, 0.22)`,
                    border: `1px solid rgba(${zone.rgb}, 0.48)`,
                  }}
                >
                  {zone.label} · {zone.character}
                </span>
                <span className="text-xs font-medium text-white/65">{zone.animal}</span>
              </span>
            </Link>
          );
        })}

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
