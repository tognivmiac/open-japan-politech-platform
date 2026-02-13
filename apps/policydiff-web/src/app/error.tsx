"use client";

export default function ErrorPage({
  error: err,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="glass-card p-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-red-400">エラーが発生しました</h2>
          <p className="mb-6 text-slate-400">{err.message || "予期しないエラーが発生しました。"}</p>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
          >
            再試行
          </button>
        </div>
      </div>
    </div>
  );
}
