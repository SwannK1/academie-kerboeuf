import Link from "next/link";
import { logoutAction } from "@/app/admin/login/actions";

const navItems = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/resources", label: "Ressources" },
  { href: "/admin/journal", label: "Journal" },
];

export function AdminShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
              Espace administrateur — V1
            </p>
            <h1 className="mt-2 text-2xl font-black text-foreground sm:text-3xl">{title}</h1>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
            >
              Se déconnecter
            </button>
          </form>
        </header>

        <nav className="mt-6 flex flex-wrap gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm font-bold text-muted transition hover:bg-white/[0.08] hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}
