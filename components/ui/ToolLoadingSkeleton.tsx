/**
 * Reserves roughly the height of the client-only tool it precedes, so the
 * dynamic(() => import(...), { ssr: false }) swap doesn't shift the footer
 * and everything below it once the real component mounts.
 */
export function ToolLoadingSkeleton({ minHeight }: { minHeight: number }) {
  return (
    <div aria-hidden="true" className="mt-10 animate-pulse space-y-4 print:hidden">
      <div className="h-10 w-64 rounded-md border border-white/10 bg-white/[0.04]" />
      <div
        className="rounded-lg border border-white/10 bg-white/[0.03]"
        style={{ height: minHeight }}
      />
    </div>
  );
}
