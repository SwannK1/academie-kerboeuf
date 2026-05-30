"use client";

export function AuditForm() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm">
      <h2 className="text-2xl font-bold">Audit gratuit</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Le formulaire d’audit est en cours de stabilisation. Pour une demande, vous pouvez contacter directement le projet.
      </p>
      <a
        href="mailto:swann.kerboeuf@gmail.com"
        className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
      >
        Écrire par email
      </a>
    </div>
  );
}
