import type { Metadata } from "next";
import { DirectionTabs } from "@/components/direction/DirectionShell";

export const metadata: Metadata = {
  title: { default: "Direction", template: "%s · Direction | Académie Kerboeuf" },
  description: "Savoir quoi préparer, anticiper et ne pas oublier : échéances, conseils, démarches guidées et sources officielles.",
};

export default function DirectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="contenu-principal" className="px-4 pb-24 pt-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <DirectionTabs />
        {children}
      </div>
    </main>
  );
}
