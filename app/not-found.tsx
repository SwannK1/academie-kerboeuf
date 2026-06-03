import Link from "next/link";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f8f3e8] px-6 py-16 text-[#16213e]">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[#d8c7a3] bg-white/80 p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b7791f]">
          Académie Kerboeuf
        </p>

        <h1 className="mt-4 text-3xl font-bold">
          Page introuvable
        </h1>

        <p className="mt-4 text-base leading-7 text-[#334155]">
          Cette page n&apos;existe pas ou n&apos;est pas encore publiée.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#16213e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#24345f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b7791f] focus-visible:ring-offset-2"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
