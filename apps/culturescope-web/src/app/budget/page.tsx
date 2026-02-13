import { prisma } from "@ojpp/db";
import { HeroSection, Card, FadeIn } from "@ojpp/ui";
import { unstable_noStore as noStore } from "next/cache";
import { BudgetCharts } from "./budget-charts";

export const dynamic = "force-dynamic";

/* ---------- Types ---------- */

interface BudgetData {
  id: string;
  fiscalYear: number;
  category: string;
  amount: bigint;
  description: string | null;
}

/* ---------- Data fetching ---------- */

async function getBudgets() {
  noStore();
  const budgets = await prisma.culturalBudget.findMany({
    orderBy: [{ fiscalYear: "asc" }, { category: "asc" }],
  });
  return budgets as unknown as BudgetData[];
}

/* ---------- Page ---------- */

export default async function BudgetPage() {
  let budgets: BudgetData[] = [];
  let fetchError: string | null = null;

  try {
    budgets = await getBudgets();
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[CultureScope] Failed to fetch budgets:", msg);
    fetchError = msg;
  }

  /* Serialize BigInt for client component */
  const serializedBudgets = budgets.map((b) => ({
    ...b,
    amount: Number(b.amount),
  }));

  if (budgets.length === 0) {
    return (
      <div>
        <HeroSection
          title="文化庁予算推移"
          subtitle="年度別・分野別の文化予算データをグラフで可視化"
          gradientFrom="from-amber-500"
          gradientTo="to-yellow-600"
        />
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Card>
            {fetchError ? (
              <div className="text-center">
                <p className="text-red-600 font-medium">データベース接続エラー</p>
                <code className="mt-2 inline-block rounded bg-red-50 px-3 py-1 text-xs font-mono text-red-700">
                  {fetchError}
                </code>
              </div>
            ) : (
              <p className="text-center text-gray-500">
                予算データがまだ投入されていません。
                <br />
                <code className="mt-1 inline-block rounded bg-gray-100 px-2 py-1 text-xs font-mono">
                  pnpm ingest:culture
                </code>{" "}
                を実行してデータを投入してください。
              </p>
            )}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeroSection
        title="文化庁予算推移"
        subtitle="年度別・分野別の文化予算データをグラフで可視化"
        gradientFrom="from-amber-500"
        gradientTo="to-yellow-600"
      >
        <div className="flex flex-wrap gap-4 text-sm text-white/70">
          <span>データ件数: {budgets.length}件</span>
          <span>
            対象期間: {serializedBudgets[0]?.fiscalYear}〜
            {serializedBudgets[serializedBudgets.length - 1]?.fiscalYear}年度
          </span>
        </div>
      </HeroSection>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <FadeIn>
          <BudgetCharts budgets={serializedBudgets} />
        </FadeIn>
      </div>
    </div>
  );
}
