import { Card } from "@ojpp/ui";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">SocialGuard について</h1>

      <div className="space-y-6">
        <Card>
          <h2 className="mb-3 text-xl font-bold">SocialGuard とは</h2>
          <p className="leading-relaxed text-gray-700">
            SocialGuard は、日本の社会保障制度に関するデータを一元的に可視化するオープンソースプロジェクトです。
            年金・医療・介護・子育て支援など、暮らしに直結する社会保障関係費の推移や制度の全体像を、
            直感的なダッシュボードとして提供します。
          </p>
        </Card>

        <Card>
          <h2 className="mb-3 text-xl font-bold">何ができるか</h2>
          <ul className="ml-4 list-disc space-y-2 text-gray-700">
            <li>社会保障関係費の年度別推移をグラフで確認（分野別内訳付き）</li>
            <li>年金・医療・介護・福祉・子育て支援など主要制度を一覧表示</li>
            <li>都道府県別の福祉指標（受給率、一人あたり費用等）を比較</li>
            <li>各政党の社会保障政策に対するスタンスを横断比較</li>
            <li>API経由でのデータアクセス（AIエージェント対応）</li>
          </ul>
        </Card>

        <Card>
          <h2 className="mb-3 text-xl font-bold">データソース</h2>
          <p className="leading-relaxed text-gray-700">
            以下の公的機関が公開するデータに基づいています。
            データの正確性には十分注意していますが、公式発表との差異がある場合は公式データを参照してください。
          </p>
          <ul className="ml-4 mt-3 list-disc space-y-1 text-gray-700">
            <li>
              <strong>厚生労働省</strong> — 社会保障費用統計、各種白書、制度概要
            </li>
            <li>
              <strong>財務省</strong> — 一般会計歳出予算、社会保障関係費の推移
            </li>
            <li>
              <strong>総務省統計局</strong> — 都道府県別統計データ、人口統計
            </li>
          </ul>
        </Card>

        <Card>
          <h2 className="mb-3 text-xl font-bold">非党派性</h2>
          <p className="leading-relaxed text-gray-700">
            SocialGuard は Open Japan PoliTech Platform (OJPP) の一部として、完全な非党派性を維持しています。
            特定の政党・政治的立場を推進することなく、すべての政党のデータを公平に表示します。
            社会保障制度の透明性向上と市民の理解促進を目的としています。
          </p>
        </Card>

        <Card>
          <h2 className="mb-3 text-xl font-bold">技術スタック</h2>
          <ul className="ml-4 list-disc space-y-1 text-gray-700">
            <li>Next.js 15 (App Router)</li>
            <li>TypeScript / Tailwind CSS v4</li>
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
