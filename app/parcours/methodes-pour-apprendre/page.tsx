import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { PublicStatusBadge } from "@/components/academy/PublicStatusBadge";

export const metadata: Metadata = {
  title: "Méthodes pour apprendre | Académie Kerboeuf",
  description:
    "Six étapes pour apprendre à apprendre : comprendre une consigne, chercher les informations importantes, organiser son travail, s'entraîner progressivement, corriger ses erreurs et expliquer sa méthode.",
};

type Step = {
  number: number;
  title: string;
  objective: string;
  skill: string;
  level: string;
  status: string;
};

const steps: Step[] = [
  {
    number: 1,
    title: "Comprendre une consigne",
    objective:
      "Identifier ce qui est demandé avant de commencer, repérer les mots-clés et reformuler avec ses propres mots.",
    skill: "Lecture fonctionnelle et compréhension des attentes",
    level: "CP · CE1 · CE2",
    status: "bientôt",
  },
  {
    number: 2,
    title: "Chercher les informations importantes",
    objective:
      "Distinguer l'essentiel de l'accessoire dans un texte ou une situation, sélectionner les données utiles.",
    skill: "Traitement de l'information et tri des données",
    level: "CE1 · CE2",
    status: "bientôt",
  },
  {
    number: 3,
    title: "Organiser son travail",
    objective:
      "Planifier les étapes d'une tâche, gérer son temps et structurer sa réponse avant d'écrire.",
    skill: "Planification et organisation cognitive",
    level: "CE1 · CE2",
    status: "bientôt",
  },
  {
    number: 4,
    title: "S'entraîner progressivement",
    objective:
      "Répéter une compétence en augmentant la difficulté par paliers pour consolider les acquis.",
    skill: "Mémorisation et pratique espacée",
    level: "CP · CE1 · CE2",
    status: "bientôt",
  },
  {
    number: 5,
    title: "Corriger ses erreurs",
    objective:
      "Identifier l'erreur, comprendre sa cause et réécrire correctement plutôt que de simplement barrer.",
    skill: "Métacognition et régulation des apprentissages",
    level: "CE1 · CE2",
    status: "bientôt",
  },
  {
    number: 6,
    title: "Expliquer sa méthode",
    objective:
      "Verbaliser les étapes suivies pour résoudre un problème, afin de renforcer la compréhension et aider les autres.",
    skill: "Expression orale et transfert des connaissances",
    level: "CE1 · CE2",
    status: "bientôt",
  },
];

export default function MethodesPourApprendrePage() {
  return (
    <main>
      <div className="px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Parcours", href: "/parcours" },
              { label: "Méthodes pour apprendre" },
            ]}
          />
        </div>
      </div>

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mission-grid absolute inset-0 -z-20 opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(243,196,91,0.18),transparent_34%),linear-gradient(180deg,rgba(5,8,7,0.06),rgba(9,16,15,0.94))]" />
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex rounded-md border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
            Parcours méthodologique
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] text-foreground sm:text-6xl">
            Méthodes pour apprendre
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
            Six étapes pour développer des stratégies d&apos;apprentissage durables.
            Chaque étape cible une compétence transversale, applicable dans
            toutes les disciplines.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/parcours"
              className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              Tous les parcours
            </Link>
            <Link
              href="/ressources"
              className="rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-bold text-foreground transition hover:bg-white/10"
            >
              Voir les ressources
            </Link>
            <Link
              href="/ressources/methodologie"
              className="rounded-md bg-gold px-5 py-3 text-sm font-extrabold text-ink transition hover:bg-[#ffd778]"
            >
              Ressources méthodologie
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <StepCard key={step.number} step={step} />
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}

function StepCard({ step }: { step: Step }) {
  return (
    <li className="flex flex-col rounded-md border border-white/10 bg-panel/60 p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-3xl font-black text-gold/60">
          {String(step.number).padStart(2, "0")}
        </span>
        <PublicStatusBadge status={step.status} />
      </div>
      <h2 className="mt-4 text-lg font-bold text-foreground">{step.title}</h2>
      <dl className="mt-4 flex flex-col gap-3 text-sm">
        <div>
          <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
            Objectif
          </dt>
          <dd className="mt-1 text-foreground/80">{step.objective}</dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
            Compétence travaillée
          </dt>
          <dd className="mt-1 text-foreground/80">{step.skill}</dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
            Niveau
          </dt>
          <dd className="mt-1 text-foreground/80">{step.level}</dd>
        </div>
      </dl>
      <p className="mt-auto pt-5 text-xs text-muted/60 italic">
        Ressource en préparation
      </p>
    </li>
  );
}
