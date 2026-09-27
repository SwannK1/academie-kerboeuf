import type { Metadata } from "next";
import { EnseignerTabs } from "@/components/enseigner/EnseignerShell";

export const metadata: Metadata = {
  title: { default: "Enseigner", template: "%s · Enseigner | Académie Kerboeuf" },
  description: "Préparer sa journée, sa semaine et son année en quelques clics, à partir de son emploi du temps.",
};

export default function EnseignerLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="contenu-principal" className="px-4 pb-24 pt-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <EnseignerTabs />
        {children}
      </div>
    </main>
  );
}
