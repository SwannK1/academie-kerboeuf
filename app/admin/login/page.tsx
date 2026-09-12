import { LoginForm } from "@/app/admin/login/login-form";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-md border border-white/10 bg-panel p-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-jade">
          Espace administrateur
        </p>
        <h1 className="mt-2 text-2xl font-black text-foreground">Connexion</h1>
        <p className="mt-2 text-sm text-muted">
          Accès réservé à l’administrateur de contenus.
        </p>
        <LoginForm next={next ?? "/admin"} />
      </div>
    </main>
  );
}
