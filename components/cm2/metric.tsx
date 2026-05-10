type MetricProps = {
  value: number;
  label: string;
};

export function Metric({ value, label }: MetricProps) {
  return (
    <div className="rounded border border-white/10 bg-white/[0.04] p-4">
      <p className="font-mono text-3xl font-black text-gold">{value}</p>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
    </div>
  );
}
