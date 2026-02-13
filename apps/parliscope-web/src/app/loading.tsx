export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-white/10 border-t-indigo-500" />
        <p className="text-sm text-[#8b949e]">読み込み中...</p>
      </div>
    </div>
  );
}
