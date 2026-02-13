export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <h2 className="mb-3 text-xl font-bold text-white">ページが見つかりません</h2>
        <p className="mb-6 text-[#8b949e]">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <a
          href="/"
          className="rounded-lg bg-indigo-500/20 px-5 py-2.5 text-sm font-medium text-indigo-300 transition-colors hover:bg-indigo-500/30"
        >
          ダッシュボードに戻る
        </a>
      </div>
    </div>
  );
}
