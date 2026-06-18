import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { HierarchyPage } from "@/app/personnages/_components/hierarchy";

export const metadata: Metadata = {
  title: "Espace enseignants | Académie Kerboeuf",
  description:
    "Préparez vos séances, consultez les fiches par matière et organisez votre programmation et votre progression.",
};

const subjectLinks = [
  {
    label: "Mathématiques CM2",
    href: "/primaire/cm2/matieres/mathematiques",
  },
  {
    label: "Français CM2",
    href: "/primaire/cm2/matieres/francais",
  },
  {
    label: "Sciences CM2",
    href: "/primaire/cm2/matieres/sciences",
  },
] as const;

export default function TeachersPage() {
  return (
    <HierarchyPage
      eyebrow="Espace enseignants"
      title="Préparer et organiser ses ressources"
      description="Un espace public pour repérer les ressources utiles, construire une séance et organiser les apprentissages."
      breadcrumb={[
        { label: "Accueil", href: "/" },
        { label: "Enseignants" },
      ]}
    >
      <TeacherCard
        title="Préparer une séance"
        description="Partez de l'objectif d'apprentissage, choisissez la ressource adaptée, puis prévoyez le temps de découverte, d'entraînement et de synthèse."
      />

      <TeacherCard
        title="Comprendre le format des fiches"
        description="Consultez le niveau, la matière, l'objectif et les ressources réellement publiées avant d'utiliser une fiche en classe."
      />

      <TeacherCard
        title="Différencier"
        description="Ajustez la quantité, le temps, les aides et le degré d'autonomie selon les besoins des élèves, sans changer l'objectif visé."
      />

      <TeacherCard
        title="Vérifier les statuts"
        description="Le statut affiché indique si une ressource est utilisable dès maintenant. Un bouton de téléchargement n'apparaît que lorsqu'un fichier est réellement disponible."
      />

      <TeacherCard
        title="Trouver une fiche dans les matières"
        description="Accédez aux matières CM2 pour consulter les fiches et ressources qui y sont effectivement publiées."
      >
        <div className="grid gap-2">
          {subjectLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center justify-between rounded-md border border-white/10 bg-background/45 px-4 text-sm font-bold text-foreground transition hover:border-sky/40 hover:bg-sky/[0.08]"
            >
              {link.label}
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </TeacherCard>

      <TeacherCard
        title="Programmation et progression"
        description="Répartissez les apprentissages dans l'année et ordonnez les notions selon votre classe, votre matière et vos périodes."
      >
        <div className="grid gap-2 sm:grid-cols-2">
          <TeacherLink href="/programmation">
            Créer sa programmation
          </TeacherLink>
          <TeacherLink href="/programmation">Créer sa progression</TeacherLink>
        </div>
      </TeacherCard>

      <TeacherCard
        title="Programmation annuelle"
        description="Répartissez les compétences du programme sur les périodes de l'année scolaire, matière par matière."
      >
        <TeacherLink href="/enseignants/programmation/annuelle">
          Ouvrir l&apos;outil
        </TeacherLink>
      </TeacherCard>

      <TeacherCard
        title="Progression de période"
        description="Ordonnez les séquences d'une période en respectant la logique : une séquence pour une compétence."
      >
        <TeacherLink href="/enseignants/programmation/periode">
          Ouvrir l&apos;outil
        </TeacherLink>
      </TeacherCard>

      <TeacherCard
        title="Emploi du temps"
        description="Construisez l'emploi du temps hebdomadaire de votre classe en respectant les horaires officiels."
      >
        <TeacherLink href="/enseignants/emploi-du-temps">
          Ouvrir l&apos;outil
        </TeacherLink>
      </TeacherCard>
    </HierarchyPage>
  );
}

function TeacherCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <article className="flex flex-col rounded-lg border border-sky/25 bg-sky/[0.05] p-5 sm:p-6">
      <h2 className="text-xl font-black text-foreground">{title}</h2>
      <p className="mt-3 flex-1 text-sm leading-7 text-muted">{description}</p>
      {children ? <div className="mt-5">{children}</div> : null}
    </article>
  );
}

function TeacherLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center justify-center rounded-md border border-sky/35 bg-sky/10 px-4 text-center text-sm font-black text-sky transition hover:bg-sky hover:text-ink"
    >
      {children}
    </Link>
  );
}
