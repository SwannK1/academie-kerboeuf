import { auth } from "@/lib/auth/config";

export default async function AdminPage() {
  const session = await auth();

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-semibold">Administration</h1>
      <p className="mt-4 text-sm text-neutral-600">
        Connecté en tant que {session?.user?.email}.
      </p>
    </main>
  );
}
