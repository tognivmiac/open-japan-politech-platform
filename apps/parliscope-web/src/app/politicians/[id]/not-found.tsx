export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 text-center">
      <h2 className="mb-3 text-xl font-bold text-white">議員が見つかりません</h2>
      <p className="mb-6 text-[#8b949e]">
        指定された議員は存在しないか、データが更新された可能性があります。
      </p>
      <a
        href="/politicians"
        className="rounded-lg bg-indigo-500/20 px-5 py-2.5 text-sm font-medium text-indigo-300 transition-colors hover:bg-indigo-500/30"
      >
        議員一覧に戻る
      </a>
    </div>
  );
}
