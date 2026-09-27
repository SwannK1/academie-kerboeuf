import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProcedureView } from "@/components/direction/ProcedureView";
import { PROCEDURES, getProcedure } from "@/content/direction/catalog";

export function generateStaticParams() {
  return PROCEDURES.map((p) => ({ id: p.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return { title: getProcedure(id)?.title ?? "Démarche" };
}

export default async function DemarchePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!getProcedure(id)) notFound();
  return <ProcedureView id={id} />;
}
