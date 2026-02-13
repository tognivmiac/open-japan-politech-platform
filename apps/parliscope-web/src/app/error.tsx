"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <h2 className="mb-3 text-xl font-bold text-red-400">エラーが発生しました</h2>
        <p className="mb-6 text-[#8b949e]">ページの読み込み中に問題が発生しました。</p>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-indigo-500/20 px-5 py-2.5 text-sm font-medium text-indigo-300 transition-colors hover:bg-indigo-500/30"
        >
          再試行
        </button>
      </div>
    </div>
  );
}
