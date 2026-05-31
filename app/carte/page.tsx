import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";
import { lieuxTransversaux } from "@/content/lieux-transversaux";
import type { AccentKey } from "@/content/universe";

export const metadata: Metadata = {
  title: "Carte de l'Académie | Académie Kerboeuf",
  description:
    "Vue d'ensemble de l'Académie Kerboeuf — les quatre univers, les lieux transversaux et toutes les portes d'entrée.",
};

// ─── Données des univers ───────────────────────────────────────────────────────

type UniversEntry = {
  id: string;
  nom: string;
  sousTitre: string;
  description: string;
  publicsConcernes: string[];
  cycleLabel: string;
  lieuxPrincipaux: string[];
  statut: string;
  href: string;
  accentColor: AccentKey;
  missionsHref?: string;
};

const universEntries: UniversEntry[] = [
  {
    id: "maternelle",
    nom: "Maternelle",
    sousTitre: "Jardin des Premières Découvertes",
    description:
      "Un espace d'entrée dans l'Académie où le langage, le geste, le jeu et l'exploration préparent les premiers apprentissages.",
    publicsConcernes: ["PS", "MS", "GS"],
    cycleLabel: "Cycle 1",
    lieuxPrincipaux: ["Jardin des Premières Découvertes"],
    statut: "disponible",
    href: "/maternelle",
    accentColor: "jade",
  },
  {
    id: "primaire",
    nom: "Élémentaire",
    sousTitre: "Aile Primaire",
    description:
      "Du CP au CM2, chaque niveau possède son professeur référent, ses matières, ses missions et son ambiance pédagogique unique.",
    publicsConcernes: ["CP", "CE1", "CE2", "CM1", "CM2"],
    cycleLabel: "Cycles 2 & 3",
    lieuxPrincipaux: [
      "Salle des lanternes",
      "Galerie des indices",
      "Observatoire des notions",
      "Cartothèque secrète",
      "Quartier général de Félix",
    ],
    statut: "disponible",
    href: "/primaire",
    accentColor: "gold",
    missionsHref: "/primaire/cm2/missions",
  },
  {
    id: "college",
    nom: "Collège",
    sousTitre: "Aile Collège",
    description:
      "De la 6e à la 3e, les méthodes s'approfondissent, les raisonnements se structurent et la synthèse prépare les grandes échéances.",
    publicsConcernes: ["6e", "5e", "4e", "3e"],
    cycleLabel: "Cycles 3 & 4",
    lieuxPrincipaux: [
      "Passerelle du collège",
      "Salle des mécanismes",
      "Bureau des enquêtes",
      "Salle du conseil final",
    ],
    statut: "disponible",
    href: "/college",
    accentColor: "sky",
  },
  {
    id: "lycee",
    nom: "Lycée",
    sousTitre: "Aile Lycée",
    description:
      "De la Seconde à la Terminale, les spécialités s'approfondissent et les synthèses décisives préparent les grandes étapes du baccalauréat.",
    publicsConcernes: ["Seconde", "Première", "Terminale"],
    cycleLabel: "Lycée",
    lieuxPrincipaux: [
      "Grande passerelle du lycée",
      "Archives des spécialités",
      "Conseil des synthèses",
    ],
    statut: "disponible",
    href: "/lycee",
    accentColor: "ember",
  },
];

// ─── Helpers de style ─────────────────────────────────────────────────────────

const accentText: Record<AccentKey, string> = {
  gold: "text-gold",
  jade: "text-jade",
  sky: "text-sky",
  ember: "text-ember",
};

const accentBorder: Record<AccentKey, string> = {
  gold: "border-gold/35",
  jade: "border-jade/35",
  sky: "border-sky/35",
  ember: "border-ember/35",
};

const accentBg: Record<AccentKey, string> = {
  gold: "bg-gold/10",
  jade: "bg-jade/10",
  sky: "bg-sky/10",
  ember: "bg-ember/10",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CartePage() {
  const lieuxAvecRoute = lieuxTransversaux.filter(
    (lieu) => lieu.route && lieu.route !== "/carte",
  );
  const lieuxSansRoute = lieuxTransversaux.filter((lieu) => !lieu.route);

  return (
    <main>
      {/* ── Breadcrumb ── */}
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[{ label: "Accueil", href: "/" }, { label: "Carte" }]}
          />
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,7,0.04),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-jade/35 bg-jade/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-jade">
            Vue d&rsquo;ensemble
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            La Carte de l&rsquo;Académie
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            Tous les univers, tous les niveaux et tous les lieux transversaux de
            l&rsquo;Académie Kerboeuf réunis sur une seule carte. Choisissez une
            aile, explorez un lieu ou entrez directement dans les missions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/univers"
              className="rounded-md bg-jade px-5 py-3 text-sm font-black text-ink transition hover:bg-jade/90"
            >
              Lire l&rsquo;univers complet
            </Link>
            <Link
              href="/missions-recentes"
              className="rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-black text-foreground transition hover:bg-white/[0.08]"
            >
              Missions récentes
            </Link>
          </div>
        </div>
      </section>

      {/* ── Les quatre univers ── */}
      <section className="px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-jade">
              Les quatre ailes
            </p>
            <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">
              Choisissez votre univers
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Chaque aile possède ses niveaux, ses professeurs référents et ses
              missions. Les statuts indiquent ce qui est disponible maintenant.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {universEntries.map((univers) => (
              <UniversCard key={univers.id} univers={univers} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Lieux transversaux ── */}
      <section className="border-y border-white/10 bg-panel/40 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
              Lieux transversaux
            </p>
            <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">
              Ce qui relie tous les univers
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Les lieux transversaux ne sont pas attachés à un seul cycle. Ils
              traversent toute l&rsquo;Académie et relient les ailes entre elles.
            </p>
          </div>

          {/* Lieux avec route */}
          {lieuxAvecRoute.length > 0 && (
            <div className="mb-8">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-muted">
                Accessibles maintenant
              </p>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {lieuxAvecRoute.map((lieu) => (
                  <LieuCard
                    key={lieu.id}
                    lieu={lieu}
                    linked
                  />
                ))}
              </div>
            </div>
          )}

          {/* Lieux sans route — affichés sans lien */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-muted">
              En cours de construction
            </p>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {lieuxSansRoute.map((lieu) => (
                <LieuCard key={lieu.id} lieu={lieu} linked={false} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Accès directs par niveau ── */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky">
              Niveaux
            </p>
            <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">
              Accès directs par classe
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Chaque niveau possède sa propre page avec ses ressources, ses
              missions et son professeur référent.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Maternelle */}
            <div className={`rounded-md border ${accentBorder.jade} bg-white/[0.04] p-4`}>
              <p className={`mb-3 text-xs font-black uppercase tracking-[0.18em] ${accentText.jade}`}>
                Maternelle
              </p>
              <div className="grid gap-1.5">
                {(
                  [
                    { label: "Petite Section (PS)", href: "/maternelle/ps" },
                    { label: "Moyenne Section (MS)", href: "/maternelle/ms" },
                    { label: "Grande Section (GS)", href: "/maternelle/gs" },
                  ] as const
                ).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded px-3 py-2 text-xs font-bold transition ${accentText.jade} hover:bg-jade/10`}
                  >
                    {item.label} →
                  </Link>
                ))}
              </div>
            </div>

            {/* Primaire */}
            <div className={`rounded-md border ${accentBorder.gold} bg-white/[0.04] p-4`}>
              <p className={`mb-3 text-xs font-black uppercase tracking-[0.18em] ${accentText.gold}`}>
                Primaire
              </p>
              <div className="grid gap-1.5">
                {(
                  [
                    { label: "CP", href: "/primaire/cp" },
                    { label: "CE1", href: "/primaire/ce1" },
                    { label: "CE2", href: "/primaire/ce2" },
                    { label: "CM1", href: "/primaire/cm1" },
                    { label: "CM2", href: "/primaire/cm2" },
                  ] as const
                ).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded px-3 py-2 text-xs font-bold transition ${accentText.gold} hover:bg-gold/10`}
                  >
                    {item.label} →
                  </Link>
                ))}
              </div>
            </div>

            {/* Collège */}
            <div className={`rounded-md border ${accentBorder.sky} bg-white/[0.04] p-4`}>
              <p className={`mb-3 text-xs font-black uppercase tracking-[0.18em] ${accentText.sky}`}>
                Collège
              </p>
              <div className="grid gap-1.5">
                {(
                  [
                    { label: "6e", href: "/college/6e" },
                    { label: "5e", href: "/college/5e" },
                    { label: "4e", href: "/college/4e" },
                    { label: "3e", href: "/college/3e" },
                  ] as const
                ).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded px-3 py-2 text-xs font-bold transition ${accentText.sky} hover:bg-sky/10`}
                  >
                    {item.label} →
                  </Link>
                ))}
              </div>
            </div>

            {/* Lycée */}
            <div className={`rounded-md border ${accentBorder.ember} bg-white/[0.04] p-4`}>
              <p className={`mb-3 text-xs font-black uppercase tracking-[0.18em] ${accentText.ember}`}>
                Lycée
              </p>
              <div className="grid gap-1.5">
                {(
                  [
                    { label: "Seconde", href: "/lycee/seconde" },
                    { label: "Première", href: "/lycee/premiere" },
                    { label: "Terminale", href: "/lycee/terminale" },
                  ] as const
                ).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded px-3 py-2 text-xs font-bold transition ${accentText.ember} hover:bg-ember/10`}
                  >
                    {item.label} →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Navigation globale ── */}
      <section className="border-t border-white/10 bg-panel/40 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-ember">
              Explorer l&rsquo;Académie
            </p>
            <h2 className="mt-3 text-3xl font-black text-foreground sm:text-4xl">
              Toutes les entrées
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <NavCard
              href="/missions-recentes"
              label="Missions récentes"
              detail="Les dernières missions disponibles dans tous les niveaux"
              color="gold"
            />
            <NavCard
              href="/parcours"
              label="Parcours"
              detail="Séquences guidées de missions progressives"
              color="jade"
            />
            <NavCard
              href="/professeurs"
              label="Professeurs"
              detail="Les guides référents de chaque niveau de l'Académie"
              color="sky"
            />
            <NavCard
              href="/eleves"
              label="Élèves"
              detail="Les élèves emblématiques du Cycle 1 à la Terminale"
              color="ember"
            />
            <NavCard
              href="/ressources"
              label="Ressources"
              detail="Fiches à projeter, imprimer ou corriger en classe"
              color="jade"
            />
            <NavCard
              href="/programmes"
              label="Programmes"
              detail="Repères pédagogiques et compétences par cycle"
              color="sky"
            />
            <NavCard
              href="/univers"
              label="Univers"
              detail="La bible narrative et pédagogique complète de l'Académie"
              color="gold"
            />
            <NavCard
              href="/primaire/cm2/missions"
              label="Missions CM2"
              detail="Catalogue complet des missions de Félix en CM2"
              color="ember"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── Composants locaux ────────────────────────────────────────────────────────

function UniversCard({ univers }: { univers: UniversEntry }) {
  const color = univers.accentColor;

  return (
    <Link
      href={univers.href}
      className={`group rounded-md border p-6 transition hover:-translate-y-1 hover:bg-white/[0.06] ${accentBorder[color]} bg-white/[0.04]`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`rounded px-2.5 py-1 font-mono text-xs font-bold ${accentBg[color]} ${accentText[color]}`}
        >
          {univers.cycleLabel}
        </span>
        <PublicStatusBadge status={univers.statut} />
      </div>

      <h3 className="mt-4 text-2xl font-black text-foreground">
        {univers.nom}
      </h3>
      <p className={`mt-1 text-sm font-bold ${accentText[color]}`}>
        {univers.sousTitre}
      </p>
      <p className="mt-3 text-sm leading-7 text-muted">{univers.description}</p>

      {/* Publics concernés */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {univers.publicsConcernes.map((pub) => (
          <span
            key={pub}
            className={`rounded border px-2 py-0.5 font-mono text-xs font-semibold ${accentBorder[color]} ${accentText[color]}`}
          >
            {pub}
          </span>
        ))}
      </div>

      {/* Lieux principaux */}
      <div className="mt-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-muted">
          Lieux
        </p>
        <ul className="grid gap-1">
          {univers.lieuxPrincipaux.slice(0, 3).map((lieu) => (
            <li key={lieu} className="flex items-center gap-2 text-xs text-muted">
              <span
                className={`size-1.5 shrink-0 rounded-full ${accentBg[color]} border ${accentBorder[color]}`}
              />
              {lieu}
            </li>
          ))}
          {univers.lieuxPrincipaux.length > 3 && (
            <li className="text-xs text-muted/60">
              +{univers.lieuxPrincipaux.length - 3} autres lieux
            </li>
          )}
        </ul>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className={`text-sm font-bold ${accentText[color]} transition group-hover:translate-x-1`}>
          Explorer l&rsquo;aile →
        </p>
        {univers.missionsHref && (
          <span
            className={`rounded border px-2.5 py-1 text-xs font-bold ${accentBorder[color]} ${accentText[color]}`}
          >
            Missions disponibles
          </span>
        )}
      </div>
    </Link>
  );
}

function LieuCard({
  lieu,
  linked,
}: {
  lieu: (typeof lieuxTransversaux)[number];
  linked: boolean;
}) {
  const color = lieu.accentColor;

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <PublicStatusBadge status={lieu.statut} />
        <span
          className={`rounded px-2 py-0.5 font-mono text-xs font-semibold ${accentBg[color]} ${accentText[color]}`}
        >
          Transversal
        </span>
      </div>
      <h3 className="mt-3 text-base font-black text-foreground">{lieu.nom}</h3>
      <p className="mt-2 text-xs leading-6 text-muted">{lieu.descriptionCourte}</p>
      <p className={`mt-1 text-xs italic ${accentText[color]}`}>
        {lieu.fonctionUX}
      </p>
      <div className="mt-3 flex flex-wrap gap-1">
        {lieu.cyclesConcernes.slice(0, 3).map((cycle) => (
          <span
            key={cycle}
            className="rounded bg-white/[0.04] px-2 py-0.5 text-xs font-medium text-muted"
          >
            {cycle}
          </span>
        ))}
        {lieu.cyclesConcernes.length > 3 && (
          <span className="rounded bg-white/[0.04] px-2 py-0.5 text-xs font-medium text-muted/60">
            +{lieu.cyclesConcernes.length - 3}
          </span>
        )}
      </div>
      {linked && lieu.route && (
        <p className={`mt-4 text-xs font-bold ${accentText[color]}`}>
          Accéder →
        </p>
      )}
    </>
  );

  const cardClass = `rounded-md border p-4 ${accentBorder[color]} bg-white/[0.04] ${
    linked ? "transition hover:-translate-y-1 hover:bg-white/[0.06]" : "opacity-80"
  }`;

  if (linked && lieu.route) {
    return (
      <Link href={lieu.route} className={cardClass}>
        {content}
      </Link>
    );
  }

  return <article className={cardClass}>{content}</article>;
}

function NavCard({
  href,
  label,
  detail,
  color,
}: {
  href: string;
  label: string;
  detail: string;
  color: AccentKey;
}) {
  return (
    <Link
      href={href}
      className={`group rounded-md border p-4 transition hover:-translate-y-1 hover:bg-white/[0.06] ${accentBorder[color]} bg-white/[0.04]`}
    >
      <p className={`text-sm font-black ${accentText[color]}`}>{label}</p>
      <p className="mt-1 text-xs leading-5 text-muted">{detail}</p>
      <p className={`mt-3 text-xs font-bold ${accentText[color]} transition group-hover:translate-x-1`}>
        Explorer →
      </p>
    </Link>
  );
}
