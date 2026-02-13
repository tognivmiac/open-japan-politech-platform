import { prisma } from "@ojpp/db";
import { Card, HeroSection, Stat, FadeIn, StaggerGrid, StaggerItem } from "@ojpp/ui";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { BudgetOverviewChart } from "./budget-overview-chart";

export const dynamic = "force-dynamic";

/* ---------- Types ---------- */

interface BudgetRow {
  id: string;
  fiscalYear: number;
  category: string;
  amount: bigint;
  description: string | null;
}

interface ProgramRow {
  id: string;
  name: string;
  category: string;
  description: string;
  eligibility: string | null;
  benefit: string | null;
  budget: bigint | null;
  recipients: number | null;
  isActive: boolean;
}

/* ---------- Helpers ---------- */

const CATEGORY_LABELS: Record<string, string> = {
  PENSION: "年金",
  HEALTHCARE: "医療",
  LONG_TERM_CARE: "介護",
  WELFARE: "福祉",
  CHILD_SUPPORT: "子育て支援",
  EMPLOYMENT: "雇用・労働",
  DISABILITY: "障害福祉",
  TOTAL: "合計",
};

const CATEGORY_COLORS: Record<string, string> = {
  PENSION: "#059669",
  HEALTHCARE: "#0D9488",
  LONG_TERM_CARE: "#0891B2",
  WELFARE: "#6366F1",
  CHILD_SUPPORT: "#EC4899",
  EMPLOYMENT: "#F59E0B",
  DISABILITY: "#8B5CF6",
  TOTAL: "#374151",
};

function categoryLabel(cat: string): string {
  return CATEGORY_LABELS[cat] ?? cat;
}

function formatAmount(amount: bigint): string {
  const num = Number(amount);
  if (num >= 10000) return `${(num / 10000).toFixed(1)}兆円`;
  return `${num.toLocaleString()}億円`;
}

/* ---------- Data Fetching ---------- */

async function getData() {
  noStore();
  const [budgets, programs] = await Promise.all([
    prisma.socialSecurityBudget.findMany({ orderBy: { fiscalYear: "desc" } }),
    prisma.socialSecurityProgram.findMany({ orderBy: { name: "asc" } }),
  ]);
  return { budgets: budgets as unknown as BudgetRow[], programs: programs as unknown as ProgramRow[] };
}

/* ---------- Main Page ---------- */

export default async function Home() {
  let budgets: BudgetRow[] = [];
  let programs: ProgramRow[] = [];
  let fetchError: string | null = null;

  try {
    const data = await getData();
    budgets = data.budgets;
    programs = data.programs;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[SocialGuard] Failed to fetch data:", msg);
    fetchError = msg;
  }

  /* --- Compute stats --- */
  const latestYear = budgets.length > 0 ? Math.max(...budgets.map((b) => b.fiscalYear)) : null;
  const latestBudgets = latestYear ? budgets.filter((b) => b.fiscalYear === latestYear) : [];
  const totalBudget = latestBudgets.find((b) => b.category === "TOTAL");
  const categoryBudgets = latestBudgets.filter((b) => b.category !== "TOTAL");
  const activePrograms = programs.filter((p) => p.isActive);
  const totalRecipients = programs.reduce((sum, p) => sum + (p.recipients ?? 0), 0);
  const healthcareBudget = latestBudgets.find((b) => b.category === "HEALTHCARE");

  /* --- Chart data for budget overview --- */
  const budgetChartData = categoryBudgets
    .sort((a, b) => Number(b.amount) - Number(a.amount))
    .map((b) => ({
      category: categoryLabel(b.category),
      amount: Number(b.amount),
      color: CATEGORY_COLORS[b.category] ?? "#6B7280",
    }));

  /* --- Empty state --- */
  if (budgets.length === 0 && programs.length === 0) {
    return (
      <div>
        <HeroSection
          title="社会保障ダッシュボード"
          subtitle="年金・医療・介護・子育て支援を一目で把握"
          gradientFrom="from-emerald-500"
          gradientTo="to-teal-600"
        />
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Card>
            {fetchError ? (
              <div className="text-center">
                <p className="text-red-600 font-medium">データベース接続エラー</p>
                <p className="mt-2 text-sm text-gray-500">
                  PostgreSQLに接続できませんでした。Supabaseコンテナが起動しているか確認してください。
                </p>
                <code className="mt-2 inline-block rounded bg-red-50 px-3 py-1 text-xs font-mono text-red-700">
                  {fetchError}
                </code>
              </div>
            ) : (
              <p className="text-center text-gray-500">
                社会保障データがまだ投入されていません。
                <br />
                <code className="mt-1 inline-block rounded bg-gray-100 px-2 py-1 text-xs font-mono">
                  pnpm ingest:social-security
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
      {/* ====== Hero Section ====== */}
      <HeroSection
        title="社会保障ダッシュボード"
        subtitle="年金・医療・介護・子育て支援を一目で把握"
        gradientFrom="from-emerald-500"
        gradientTo="to-teal-600"
      >
        <div className="flex flex-wrap gap-4 text-sm text-white/70">
          {latestYear && <span>最新データ: {latestYear}年度</span>}
          <span>登録制度: {programs.length}件</span>
          <span>予算データ: {budgets.length}件</span>
        </div>
      </HeroSection>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* ====== Stats Row ====== */}
        <section className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            label="社会保障関係費"
            value={totalBudget ? formatAmount(totalBudget.amount) : "-"}
            change={latestYear ? `${latestYear}年度` : undefined}
            trend="neutral"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <Stat
            label="制度数"
            value={`${activePrograms.length}制度`}
            change="アクティブ"
            trend="neutral"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
          <Stat
            label="年金受給者数"
            value={totalRecipients > 0 ? `約${totalRecipients.toLocaleString()}万人` : "-"}
            change="概算"
            trend="neutral"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          />
          <Stat
            label="医療費"
            value={healthcareBudget ? formatAmount(healthcareBudget.amount) : "-"}
            change={latestYear ? `${latestYear}年度` : undefined}
            trend="neutral"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            }
          />
        </section>

        {/* ====== Budget Overview Chart ====== */}
        {budgetChartData.length > 0 && (
          <FadeIn>
            <section className="mb-12">
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
                <span className="inline-block h-6 w-1 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500" />
                {latestYear}年度 予算内訳
              </h2>
              <Card padding="lg">
                <BudgetOverviewChart data={budgetChartData} />
              </Card>
            </section>
          </FadeIn>
        )}

        {/* ====== Category Budget Cards ====== */}
        {categoryBudgets.length > 0 && (
          <FadeIn delay={0.1}>
            <section className="mb-12">
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
                <span className="inline-block h-6 w-1 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500" />
                分野別予算
              </h2>
              <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoryBudgets
                  .sort((a, b) => Number(b.amount) - Number(a.amount))
                  .map((b) => (
                    <StaggerItem key={b.id}>
                      <Card hover>
                        <div className="flex items-start justify-between">
                          <div>
                            <span
                              className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                              style={{ backgroundColor: CATEGORY_COLORS[b.category] ?? "#6B7280" }}
                            >
                              {categoryLabel(b.category)}
                            </span>
                            <p className="mt-3 text-2xl font-bold tracking-tight">
                              {formatAmount(b.amount)}
                            </p>
                            {b.description && (
                              <p className="mt-1 text-sm text-gray-500">{b.description}</p>
                            )}
                          </div>
                          <div className="text-right text-sm text-gray-400">
                            {totalBudget && (
                              <span className="text-lg font-semibold text-emerald-600">
                                {((Number(b.amount) / Number(totalBudget.amount)) * 100).toFixed(1)}%
                              </span>
                            )}
                          </div>
                        </div>
                      </Card>
                    </StaggerItem>
                  ))}
              </StaggerGrid>
            </section>
          </FadeIn>
        )}

        {/* ====== Programs Highlight ====== */}
        {activePrograms.length > 0 && (
          <FadeIn delay={0.2}>
            <section className="mb-12">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="flex items-center gap-3 text-2xl font-bold">
                  <span className="inline-block h-6 w-1 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500" />
                  主要制度
                </h2>
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  すべて見る
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
              <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {activePrograms.slice(0, 6).map((p) => (
                  <StaggerItem key={p.id}>
                    <Card hover className="h-full">
                      <div className="flex flex-col h-full">
                        <div className="mb-3">
                          <span
                            className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                            style={{ backgroundColor: CATEGORY_COLORS[p.category] ?? "#6B7280" }}
                          >
                            {categoryLabel(p.category)}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold">{p.name}</h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">
                          {p.description}
                        </p>
                        <div className="mt-4 flex items-center gap-4 border-t pt-3 text-xs text-gray-500">
                          {p.recipients != null && (
                            <span>受給者: 約{p.recipients.toLocaleString()}万人</span>
                          )}
                          {p.budget != null && (
                            <span>予算: {formatAmount(p.budget)}</span>
                          )}
                        </div>
                      </div>
                    </Card>
                  </StaggerItem>
                ))}
              </StaggerGrid>
            </section>
          </FadeIn>
        )}

        {/* ====== Quick Links ====== */}
        <FadeIn delay={0.3}>
          <section>
            <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <StaggerItem>
                <Link href="/budget" className="block">
                  <Card hover className="group text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="font-bold">予算推移</h3>
                    <p className="mt-1 text-sm text-gray-500">年度別の予算推移を可視化</p>
                  </Card>
                </Link>
              </StaggerItem>
              <StaggerItem>
                <Link href="/prefectures" className="block">
                  <Card hover className="group text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold">都道府県比較</h3>
                    <p className="mt-1 text-sm text-gray-500">地域ごとの福祉データを比較</p>
                  </Card>
                </Link>
              </StaggerItem>
              <StaggerItem>
                <Link href="/compare" className="block">
                  <Card hover className="group text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 transition-colors group-hover:bg-cyan-600 group-hover:text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <h3 className="font-bold">政党比較</h3>
                    <p className="mt-1 text-sm text-gray-500">社会保障への各党スタンス</p>
                  </Card>
                </Link>
              </StaggerItem>
            </StaggerGrid>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
