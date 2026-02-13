export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 h-10 w-48 animate-pulse rounded-lg bg-white/[0.06]" />
      <div className="mb-8 h-32 animate-pulse rounded-xl border border-white/[0.06] bg-white/[0.02]" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
            key={`skeleton-${i}`}
            className="h-18 animate-pulse rounded-xl border border-white/[0.06] bg-white/[0.03]"
            style={{ animationDelay: `${i * 50}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
