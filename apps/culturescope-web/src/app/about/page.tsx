import { Card } from "@ojpp/ui";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">CultureScope について</h1>

      <div className="space-y-6">
        <Card>
          <h2 className="mb-3 text-xl font-bold">CultureScope とは</h2>
          <p className="leading-relaxed text-gray-700">
            CultureScope は、日本の文化政策に関するデータを可視化するオープンソースプロジェクトです。
            文化庁予算の推移、芸術振興プログラム、文化財保護施策、各政党の文化政策スタンスを
            透明性のある形で提示します。
          </p>
        </Card>

        <Card>
          <h2 className="mb-3 text-xl font-bold">何ができるか</h2>
          <ul className="ml-4 list-disc space-y-2 text-gray-700">
            <li>文化庁予算の年度別・分野別推移をチャートで可視化</li>
            <li>芸術文化振興、文化財保護、メディア芸術など分野別の予算配分を把握</li>
            <li>文化庁の補助金・助成金プログラムを一覧表示</li>
            <li>各政党の文化政策スタンスを横断的に比較</li>
            <li>API経由でのデータアクセス（AIエージェント対応）</li>
          </ul>
        </Card>

        <Card>
          <h2 className="mb-3 text-xl font-bold">データソース</h2>
          <ul className="ml-4 list-disc space-y-2 text-gray-700">
            <li>
              <span className="font-medium">文化庁予算概要</span> —
              文化庁が毎年度公開する予算概要資料に基づく分野別予算データ
            </li>
            <li>
              <span className="font-medium">各党マニフェスト</span> —
              各政党が公開するマニフェスト・政策集から文化政策に関するスタンスを抽出
            </li>
            <li>
              <span className="font-medium">文化庁公開資料</span> —
              文化プログラム・補助金制度の詳細情報
            </li>
          </ul>
          <p className="mt-3 text-sm text-gray-500">
            データの正確性には十分注意していますが、公式発表との差異がある場合は公式データを参照してください。
          </p>
        </Card>

        <Card>
          <h2 className="mb-3 text-xl font-bold">文化政策の分野</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[
              { label: "芸術文化振興", color: "bg-amber-50 text-amber-700" },
              { label: "文化財保護", color: "bg-emerald-50 text-emerald-700" },
              { label: "メディア芸術", color: "bg-violet-50 text-violet-700" },
              { label: "国際文化交流", color: "bg-blue-50 text-blue-700" },
              { label: "著作権", color: "bg-rose-50 text-rose-700" },
              { label: "国語・日本語教育", color: "bg-cyan-50 text-cyan-700" },
              { label: "文化産業", color: "bg-fuchsia-50 text-fuchsia-700" },
              { label: "文化施設整備", color: "bg-lime-50 text-lime-700" },
              { label: "デジタルアーカイブ", color: "bg-indigo-50 text-indigo-700" },
              { label: "地域文化振興", color: "bg-orange-50 text-orange-700" },
            ].map((item) => (
              <span
                key={item.label}
                className={`inline-block rounded-full px-3 py-1.5 text-xs font-medium ${item.color}`}
              >
                {item.label}
              </span>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="mb-3 text-xl font-bold">非党派性</h2>
          <p className="leading-relaxed text-gray-700">
            CultureScope は Open Japan PoliTech Platform (OJPP) の一部として、完全な非党派性を維持しています。
            特定の政党・政治的立場を推進することなく、すべての政党の文化政策データを公平に表示します。
          </p>
        </Card>

        <Card>
          <h2 className="mb-3 text-xl font-bold">技術スタック</h2>
          <ul className="ml-4 list-disc space-y-1 text-gray-700">
            <li>Next.js 15 (App Router)</li>
            <li>TypeScript / Tailwind CSS</li>
            <li>Prisma / PostgreSQL</li>
            <li>Recharts（チャート描画）</li>
            <li>Motion（アニメーション）</li>
          </ul>
        </Card>

        <Card>
          <h2 className="mb-3 text-xl font-bold">ライセンス</h2>
          <p className="leading-relaxed text-gray-700">
            AGPL-3.0 ライセンスの下で公開されています。
            コードの利用・改変・再配布は自由ですが、派生物も同じライセンスで公開する必要があります。
          </p>
        </Card>
      </div>
    </div>
  );
}
