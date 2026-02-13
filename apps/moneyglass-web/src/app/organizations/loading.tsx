export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-8 py-12">
      <div className="mb-8 h-8 w-48 animate-pulse rounded-lg bg-[rgba(255,255,255,0.06)]" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
            key={`skeleton-${i}`}
            className="h-32 animate-pulse rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)]"
          />
        ))}
      </div>
    </div>
  );
}
