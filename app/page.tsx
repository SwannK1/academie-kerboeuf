import Link from "next/link";

type Accent = "jade" | "gold" | "sky" | "ember";

const ACCENT: Record<
  Accent,
  { text: string; border: string; hoverBorder: string; hoverBg: string }
> = {
  jade:  { text: "text-jade",  border: "border-jade/30",  hoverBorder: "hover:border-jade/55",  hoverBg: "hover:bg-jade/[0.09]"  },
  gold:  { text: "text-gold",  border: "border-gold/30",  hoverBorder: "hover:border-gold/55",  hoverBg: "hover:bg-gold/[0.09]"  },
  sky:   { text: "text-sky",   border: "border-sky/30",   hoverBorder: "hover:border-sky/55",   hoverBg: "hover:bg-sky/[0.09]"   },
  ember: { text: "text-ember", border: "border-ember/30", hoverBorder: "hover:border-ember/55", hoverBg: "hover:bg-ember/[0.09]" },
};

const WORLDS = [
  {
    signal: "Découvrir",
    label: "École des petits",
    sub: "Maternelle · PS · MS · GS",
    text: "Rituels, jeux et premières quêtes pour entrer dans les apprentissages.",
    href: "/maternelle",
    accent: "jade" as Accent,
  },
  {
    signal: "Explorer",
    label: "École élémentaire",
    sub: "CP · CE1 · CE2 · CM1 · CM2",
    text: "Cinq niveaux, cinq personnages-guides : Kiwi, Gaston, Esteban, Noisette et Félix.",
    href: "/primaire",
    accent: "gold" as Accent,
  },
  {
    signal: "Enquêter",
    label: "Atelier du collège",
    sub: "6e · 5e · 4e · 3e",
    text: "Raisonner, argumenter et installer des méthodes transférables entre disciplines.",
    href: "/college",
    accent: "sky" as Accent,
  },
  {
    signal: "Maîtriser",
    label: "Campus des lycéens",
    sub: "Seconde · Première · Terminale",
    text: "Synthèse, autonomie et préparation aux examens dans un cadre ambitieux.",
    href: "/lycee",
    accent: "ember" as Accent,
  },
];

const QUICK_LINKS = [
  { label: "Ressources",  href: "/ressources"      },
  { label: "Programmes",  href: "/programmes"      },
  { label: "Parcours",    href: "/parcours"         },
  { label: "Professeurs", href: "/professeurs"      },
  { label: "Élèves",      href: "/eleves"           },
  { label: "Missions",    href: "/missions-recentes"},
  { label: "Univers",     href: "/univers"          },
];

export default function Home() {
  return (
    <main>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative isolate min-h-[92svh] overflow-hidden px-4 pt-28 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-30 opacity-45" />
        <div className="map-line absolute inset-x-[-10%] top-[40%] -z-20 h-56 rotate-[-7deg] opacity-35" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.12),rgba(9,16,15,0.96))]" />

        <div className="mx-auto flex min-h-[calc(92svh-7rem)] max-w-7xl flex-col items-start justify-center pb-12">
          <p className="mb-5 inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Plateforme éducative narrative
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl lg:text-7xl">
            Académie<br />Kerboeuf
          </h1>
          <p className="mt-5 text-2xl font-black text-gold sm:text-3xl">
            Un univers pour apprendre, de la maternelle au lycée.
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Des missions pédagogiques immersives portées par des personnages
            récurrents — sans compte, sans installation.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/primaire"
              className="inline-flex h-12 items-center justify-center rounded-md bg-gold px-6 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
            >
              Explorer le Primaire
            </Link>
            <Link
              href="/ressources"
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/15 bg-white/[0.05] px-6 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              Voir les ressources
            </Link>
          </div>
        </div>
      </section>

      {/* ── Quatre univers ────────────────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
              Choisir un univers
            </p>
            <h2 className="mt-4 text-3xl font-black text-foreground sm:text-5xl">
              De la maternelle au lycée.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              Chaque monde a ses personnages, ses niveaux et ses missions — un
              cadre cohérent du premier rituel de maternelle à la préparation
              du bac.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {WORLDS.map((world) => {
              const t = ACCENT[world.accent];
              return (
                <Link
                  key={world.href}
                  href={world.href}
                  className={`group flex min-h-52 flex-col justify-between rounded-md border ${t.border} bg-white/[0.04] p-7 transition hover:-translate-y-1 ${t.hoverBorder} ${t.hoverBg} focus:outline-none focus:ring-2 focus:ring-gold/60`}
                >
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-[0.22em] ${t.text}`}>
                      {world.signal}
                    </p>
                    <h3 className="mt-3 text-2xl font-black text-foreground sm:text-3xl">
                      {world.label}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-muted">{world.sub}</p>
                    <p className="mt-4 text-sm leading-7 text-muted">{world.text}</p>
                  </div>
                  <span className={`mt-6 inline-flex text-sm font-black transition group-hover:translate-x-1 ${t.text}`}>
                    Entrer →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Accès rapides ─────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 bg-panel/40 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-muted">
            Accès rapides
          </p>
          <div className="flex flex-wrap gap-3">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
