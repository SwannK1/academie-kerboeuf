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

const SHEET_FORMAT = [
  {
    title: "Feuille 1",
    description: "Situation initiale, mini-leçon, automatismes.",
  },
  {
    title: "Feuille 2",
    description: "Application, consolidation, entraînement autonome.",
  },
  {
    title: "Feuille 3",
    description: "Évaluation courte, critères de réussite, vérification.",
  },
] as const;

const DIFFERENTIATION_LEVELS = [
  {
    title: "Guidage fort",
    description: "Consignes relues, exemples donnés, étapes très visibles.",
  },
  {
    title: "Guidage moyen",
    description: "Aide ponctuelle, outils disponibles, correction intermédiaire.",
  },
  {
    title: "Autonomie",
    description: "Mission complète, justification, vérification et trace finale.",
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
      >
        <TeacherLink href="/enseignants/preparer-une-seance">
          Préparer une séance
        </TeacherLink>
      </TeacherCard>

      <TeacherCard
        title="Comprendre le format des fiches"
        description="Consultez le niveau, la matière, l'objectif et les ressources réellement publiées avant d'utiliser une fiche en classe. Chaque notion s'appuie sur un même modèle en trois feuilles :"
      >
        <ul className="grid gap-2 sm:grid-cols-3" role="list">
          {SHEET_FORMAT.map((sheet) => (
            <li
              key={sheet.title}
              className="rounded-md border border-white/10 bg-background/45 p-4"
            >
              <p className="text-sm font-bold text-foreground">{sheet.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {sheet.description}
              </p>
            </li>
          ))}
        </ul>
      </TeacherCard>

      <TeacherCard
        title="Différencier"
        description="Ajustez la quantité, le temps, les aides et le degré d'autonomie selon les besoins des élèves, sans changer l'objectif visé. Les fiches peuvent être utilisées à trois niveaux d'accompagnement :"
      >
        <ul className="grid gap-2 sm:grid-cols-3" role="list">
          {DIFFERENTIATION_LEVELS.map((level) => (
            <li
              key={level.title}
              className="rounded-md border border-white/10 bg-background/45 p-4"
            >
              <p className="text-sm font-bold text-foreground">{level.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {level.description}
              </p>
            </li>
          ))}
        </ul>
      </TeacherCard>

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
        title="Construire son emploi du temps"
        description="Choisissez un niveau, répartissez les matières par créneau sur la semaine et suivez le total d'heures par rapport au repère de 24 h."
      >
        <TeacherLink href="/enseignants/emploi-du-temps">
          Ouvrir l’emploi du temps
        </TeacherLink>
      </TeacherCard>

      <TeacherCard
        title="Programmation annuelle"
        description="Choisissez un niveau et une matière, puis placez les compétences du programme dans les périodes de l'année."
      >
        <TeacherLink href="/enseignants/programmation">
          Ouvrir la programmation annuelle
        </TeacherLink>
      </TeacherCard>

      <TeacherCard
        title="Progression de période"
        description="Répartissez par semaine les compétences déjà placées dans la programmation annuelle, période par période."
      >
        <TeacherLink href="/enseignants/progression">
          Ouvrir la progression de période
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
