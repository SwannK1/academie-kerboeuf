import Link from "next/link";
import type { AccentKey } from "@/content/universe";

function Metric({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded border border-white/10 bg-white/[0.04] p-3">
      <p className="font-mono text-2xl font-black text-gold">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-muted">
        {label}
      </p>
    </div>
  );
}

function CtaLink({
  href,
  children,
  color,
}: {
  href: string;
  children: React.ReactNode;
  color: AccentKey;
}) {
  const base =
    "inline-flex h-11 items-center justify-center rounded-md border px-5 text-sm font-bold transition";
  const variants: Record<AccentKey, string> = {
    gold: "border-gold/35 bg-gold/10 text-gold hover:bg-gold hover:text-ink",
    jade: "border-jade/35 bg-jade/10 text-jade hover:bg-jade hover:text-ink",
    sky: "border-sky/35 bg-sky/10 text-sky hover:bg-sky hover:text-ink",
    ember: "border-ember/35 bg-ember/10 text-ember hover:bg-ember hover:text-ink",
  };
  return (
    <Link href={href} className={`${base} ${variants[color]}`}>
      {children}
    </Link>
  );
}

export function UniversHero({
  cyclesCount,
  levelsCount,
  referentProfessorsCount,
  personalitiesCount,
  studentsCount,
  missionsCount,
  subjectsCount,
  pathsCount,
}: {
  cyclesCount: number;
  levelsCount: number;
  referentProfessorsCount: number;
  personalitiesCount: number;
  studentsCount: number;
  missionsCount: number;
  subjectsCount: number;
  pathsCount: number;
}) {
  return (
    <section className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="mission-grid absolute inset-0 -z-20 opacity-30" />
      <div className="map-line absolute inset-x-[-12%] top-[45%] -z-10 h-56 rotate-[-7deg] opacity-30" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.06),rgba(9,16,15,0.97))]" />

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.68fr] lg:items-end">
        <div>
          <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
            Bible narrative & pédagogique
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl lg:text-7xl">
            Bienvenue dans l&apos;univers de l&apos;Académie Kerboeuf
          </h1>
          <p className="mt-5 text-2xl font-black text-jade sm:text-3xl">
            Une école secrète où chaque savoir devient une porte à ouvrir.
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            Cette page est la bible publique de l&apos;Académie Kerboeuf — son
            histoire, ses territoires, ses guides, ses élèves et les valeurs
            qui font de chaque mission un acte pédagogique sérieux.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CtaLink href="/professeurs" color="gold">
              Rencontrer les professeurs
            </CtaLink>
            <CtaLink href="/primaire" color="jade">
              Explorer le primaire
            </CtaLink>
          </div>
        </div>

        {/* Métriques */}
        <div className="rounded-md border border-white/12 bg-panel/75 p-5 shadow-2xl shadow-black/35">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
            État du monde
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Metric value={cyclesCount} label="cycles" />
            <Metric value={levelsCount} label="niveaux" />
            <Metric value={referentProfessorsCount} label="professeurs référents" />
            <Metric value={personalitiesCount} label="personnalités" />
            <Metric value={studentsCount} label="élèves" />
            <Metric value={missionsCount} label="missions" />
            <Metric value={subjectsCount} label="matières" />
            <Metric value={pathsCount} label="parcours" />
          </div>
        </div>
      </div>
    </section>
  );
}
