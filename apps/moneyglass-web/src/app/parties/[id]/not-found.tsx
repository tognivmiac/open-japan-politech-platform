export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <h2 className="mb-3 text-2xl font-bold text-white">政党が見つかりません</h2>
        <p className="mb-6 text-[#8b949e]">
          指定された政党は存在しないか、削除された可能性があります。
        </p>
        <a
          href="/parties"
          className="inline-block rounded-lg border border-[rgba(255,107,53,0.3)] bg-[rgba(255,107,53,0.1)] px-6 py-2.5 text-sm font-medium text-[#FF6B35] transition-colors hover:bg-[rgba(255,107,53,0.2)]"
        >
          政党一覧に戻る
        </a>
      </div>
    </div>
  );
}
