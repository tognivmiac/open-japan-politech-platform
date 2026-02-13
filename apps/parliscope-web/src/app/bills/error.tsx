"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 text-center">
      <h2 className="mb-3 text-xl font-bold text-red-400">法案データの読み込みに失敗しました</h2>
      <p className="mb-6 text-[#8b949e]">データの取得中に問題が発生しました。</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-indigo-500/20 px-5 py-2.5 text-sm font-medium text-indigo-300 transition-colors hover:bg-indigo-500/30"
      >
        再試行
      </button>
    </div>
  );
}
