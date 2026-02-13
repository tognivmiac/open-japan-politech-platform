export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 h-10 w-48 animate-pulse rounded-lg bg-white/[0.06]" />
      <div className="mb-8 h-32 animate-pulse rounded-xl border border-white/[0.06] bg-white/[0.02]" />
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
            key={`skeleton-${i}`}
            className="h-24 animate-pulse rounded-xl border border-white/[0.06] bg-white/[0.03]"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
