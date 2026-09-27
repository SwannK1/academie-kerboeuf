import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "@/components/icons/Icon";

export const metadata: Metadata = { title: "Autres outils" };

const TOOLS: { group: string; items: { title: string; href: string; icon: IconName; text: string }[] }[] = [
  {
    group: "Autour de la période",
    items: [
      { title: "Calendrier", href: "/enseignants/calendrier", icon: "calendar", text: "Les échéances de l'année scolaire." },
      { title: "Fin de période", href: "/enseignants/fin-periode", icon: "check-circle", text: "Boucler avant les vacances." },
      { title: "Évaluations", href: "/enseignants/evaluations", icon: "clipboard", text: "Planifier les évaluations et leurs supports." },
      { title: "Ateliers", href: "/enseignants/ateliers", icon: "puzzle", text: "Organiser les rotations d'ateliers." },
    ],
  },
  {
    group: "Au quotidien",
    items: [
      { title: "APC", href: "/enseignants/apc", icon: "target", text: "Cycles et séances d'APC." },
      { title: "Rituels", href: "/enseignants/rituels", icon: "repeat", text: "Une bibliothèque de rituels." },
      { title: "Photocopies", href: "/enseignants/photocopies", icon: "printer", text: "La file des documents à reproduire." },
      { title: "Affichages", href: "/enseignants/affichages", icon: "image", text: "Préparer les affichages de classe." },
    ],
  },
  {
    group: "Liens et documents",
    items: [
      { title: "Liaison CM2 → 6e", href: "/enseignants/liaison-cm2-6e", icon: "graduation-cap", text: "Organiser la transition école-collège." },
      { title: "Réunion parents", href: "/enseignants/reunion-parents", icon: "users", text: "Préparer la réunion de rentrée." },
      { title: "Communications", href: "/enseignants/communications", icon: "envelope", text: "Modèles de messages aux familles." },
      { title: "Rendez-vous", href: "/enseignants/rendez-vous", icon: "message-circle", text: "Échanges professionnels et suivis." },
      { title: "Modèles de documents", href: "/enseignants/modeles", icon: "folder", text: "Documents réutilisables." },
      { title: "Dossier remplaçant", href: "/enseignants/dossier-remplacant", icon: "folder-open", text: "Tout ce qu'un remplaçant doit trouver." },
    ],
  },
];

export default function OutilsPage() {
  return (
    <div className="pt-7">
      <h1 className="font-serif text-3xl font-semibold">Autres outils</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Des outils ponctuels, en complément de la semaine et de l&apos;année. Leurs données restent sur cet appareil.
      </p>
      {TOOLS.map((group) => (
        <section key={group.group} className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{group.group}</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {group.items.map((tool) => (
              <li key={tool.href}>
                <Link href={tool.href} className="flex h-full items-start gap-3 rounded-xl border border-line bg-panel-soft p-4 transition hover:border-ink/25">
                  <Icon name={tool.icon} className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span>
                    <span className="block font-medium">{tool.title}</span>
                    <span className="text-sm text-muted">{tool.text}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
