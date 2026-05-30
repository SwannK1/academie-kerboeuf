import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24">
      <div className="mx-auto w-full max-w-xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
          Académie Kerboeuf · Erreur 404
        </p>

        <h1 className="mt-4 text-4xl font-black text-foreground sm:text-5xl">
          Page introuvable
        </h1>

        <p className="mt-5 text-base leading-7 text-muted">
          Cette page n&apos;existe pas ou n&apos;est pas encore publiée.
          <br />
          Retrouvez votre chemin depuis les sections ci-dessous.
        </p>

        <nav
          aria-label="Liens de secours"
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <Link
            href="/"
            className="rounded-md border border-gold/35 bg-gold/10 px-5 py-2.5 text-sm font-bold text-gold transition hover:bg-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/60"
          >
            Accueil
          </Link>
          <Link
            href="/carte"
            className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-2.5 text-sm font-bold text-foreground transition hover:bg-white/[0.10] focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            Carte de l&apos;Académie
          </Link>
          <Link
            href="/primaire"
            className="rounded-md border border-jade/30 bg-jade/[0.07] px-5 py-2.5 text-sm font-bold text-jade transition hover:bg-jade/[0.14] focus:outline-none focus:ring-2 focus:ring-jade/60"
          >
            Primaire
          </Link>
          <Link
            href="/college"
            className="rounded-md border border-sky/30 bg-sky/[0.07] px-5 py-2.5 text-sm font-bold text-sky transition hover:bg-sky/[0.14] focus:outline-none focus:ring-2 focus:ring-sky/60"
          >
            Collège
          </Link>
        </nav>
      </div>
    </main>
  );
}
