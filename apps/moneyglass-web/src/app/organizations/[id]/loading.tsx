export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-8 py-12">
      <div className="mb-8 h-10 w-64 animate-pulse rounded-lg bg-[rgba(255,255,255,0.06)]" />
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
            key={`skeleton-${i}`}
            className="h-24 animate-pulse rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)]"
          />
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)]" />
    </div>
  );
}
