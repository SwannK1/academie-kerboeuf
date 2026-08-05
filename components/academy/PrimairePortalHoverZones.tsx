"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import Link from "next/link";
import { PORTAL_ZONES, type ZoneSlug } from "@/components/academy/primaire-portal-zones";

/** Zones cliquables survolables du portail desktop — seule partie interactive de la carte. */
export function PrimairePortalHoverZones() {
  const [hovered, setHovered] = useState<ZoneSlug | null>(null);

  return (
    <>
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
    </>
  );
}
