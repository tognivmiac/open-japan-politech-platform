import { prisma } from "@ojpp/db";
import { Card, HeroSection, Stat, FadeIn, StaggerGrid, StaggerItem, GradientCard } from "@ojpp/ui";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";

/* ---------- Types ---------- */

interface BudgetData {
  id: string;
  fiscalYear: number;
  category: string;
  amount: bigint;
  description: string | null;
}

interface ProgramData {
  id: string;
  name: string;
  category: string;
  description: string;
  budget: bigint | null;
  startYear: number;
  endYear: number | null;
  targetGroup: string | null;
  ministry: string;
  isActive: boolean;
}

/* ---------- Category display map ---------- */

const CATEGORY_LABELS: Record<string, string> = {
  ARTS_PROMOTION: "芸術文化振興",
  CULTURAL_PROPERTY: "文化財保護",
  MEDIA_ARTS: "メディア芸術",
  INTERNATIONAL: "国際文化交流",
  COPYRIGHT: "著作権",
  JAPANESE_LANGUAGE: "国語・日本語教育",
  RELIGIOUS_AFFAIRS: "宗務",
  CREATIVE_INDUSTRY: "文化産業",
  CULTURAL_FACILITY: "文化施設整備",
  DIGITAL_ARCHIVE: "デジタルアーカイブ",
  LOCAL_CULTURE: "地域文化振興",
  TOTAL: "合計",
};

const CATEGORY_COLORS: Record<string, { from: string; to: string; bg: string; text: string }> = {
  ARTS_PROMOTION: { from: "from-amber-400", to: "to-orange-500", bg: "bg-amber-50", text: "text-amber-700" },
  CULTURAL_PROPERTY: { from: "from-emerald-400", to: "to-teal-500", bg: "bg-emerald-50", text: "text-emerald-700" },
  MEDIA_ARTS: { from: "from-violet-400", to: "to-purple-500", bg: "bg-violet-50", text: "text-violet-700" },
  INTERNATIONAL: { from: "from-blue-400", to: "to-indigo-500", bg: "bg-blue-50", text: "text-blue-700" },
  COPYRIGHT: { from: "from-rose-400", to: "to-pink-500", bg: "bg-rose-50", text: "text-rose-700" },
  JAPANESE_LANGUAGE: { from: "from-cyan-400", to: "to-sky-500", bg: "bg-cyan-50", text: "text-cyan-700" },
  RELIGIOUS_AFFAIRS: { from: "from-stone-400", to: "to-gray-500", bg: "bg-stone-50", text: "text-stone-700" },
  CREATIVE_INDUSTRY: { from: "from-fuchsia-400", to: "to-pink-500", bg: "bg-fuchsia-50", text: "text-fuchsia-700" },
  CULTURAL_FACILITY: { from: "from-lime-400", to: "to-green-500", bg: "bg-lime-50", text: "text-lime-700" },
  DIGITAL_ARCHIVE: { from: "from-indigo-400", to: "to-blue-500", bg: "bg-indigo-50", text: "text-indigo-700" },
  LOCAL_CULTURE: { from: "from-orange-400", to: "to-red-500", bg: "bg-orange-50", text: "text-orange-700" },
  TOTAL: { from: "from-amber-500", to: "to-yellow-600", bg: "bg-amber-50", text: "text-amber-800" },
};

function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}

function getCategoryColor(category: string) {
  return CATEGORY_COLORS[category] ?? CATEGORY_COLORS.TOTAL;
}

/* ---------- Helpers ---------- */

function formatBudgetAmount(amount: bigint): string {
  const num = Number(amount);
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}兆円`;
  }
  if (num >= 100) {
    return `${(num / 100).toFixed(0)}億円`;
  }
  return `${num}百万円`;
}

function formatBudgetAmountShort(amount: bigint): string {
  const num = Number(amount);
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}兆`;
  }
  if (num >= 100) {
    return `${Math.round(num / 100)}億`;
  }
  return `${num}百万`;
}

/* ---------- Data fetching ---------- */

async function getData() {
  noStore();

  const [budgets, programs, budgetCount, programCount] = await Promise.all([
    prisma.culturalBudget.findMany({
      orderBy: [{ fiscalYear: "desc" }, { category: "asc" }],
    }),
    prisma.culturalProgram.findMany({
      where: { isActive: true },
      orderBy: { budget: "desc" },
      take: 5,
    }),
    prisma.culturalBudget.count(),
    prisma.culturalProgram.count(),
  ]);

  return {
    budgets: budgets as unknown as BudgetData[],
    programs: programs as unknown as ProgramData[],
    budgetCount,
    programCount,
  };
}

/* ---------- Main Page ---------- */

export default async function Home() {
  let data: Awaited<ReturnType<typeof getData>> | null = null;
  let fetchError: string | null = null;

  try {
    data = await getData();
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[CultureScope] Failed to fetch data:", msg);
    fetchError = msg;
  }

  const budgets = data?.budgets ?? [];
  const programs = data?.programs ?? [];

  /* --- Compute stats --- */
  const latestYear = budgets.length > 0 ? budgets[0].fiscalYear : null;
  const latestTotalBudget = budgets.find(
    (b) => b.fiscalYear === latestYear && b.category === "TOTAL"
  );
  const activeProgramCount = data?.programCount ?? 0;
  const culturalPropertyCount = budgets.filter(
    (b) => b.category === "CULTURAL_PROPERTY"
  ).length;
  const uniqueYears = new Set(budgets.map((b) => b.fiscalYear));

  /* --- Recent fiscal year budgets (non-TOTAL, latest year) --- */
  const latestYearBudgets = budgets.filter(
    (b) => b.fiscalYear === latestYear && b.category !== "TOTAL"
  );

  /* --- Budget trend: TOTAL by year --- */
  const totalByYear = budgets
    .filter((b) => b.category === "TOTAL")
    .sort((a, b) => a.fiscalYear - b.fiscalYear);

  /* --- Empty state --- */
  if (budgets.length === 0 && programs.length === 0) {
    return (
      <div>
        <HeroSection
          title="文化政策ダッシュボード"
          subtitle="日本の文化予算・芸術振興・文化財保護を一目で把握"
          gradientFrom="from-amber-500"
          gradientTo="to-yellow-600"
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
              <div className="text-center py-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                  <svg className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-700">データ未投入</p>
                <p className="mt-2 text-sm text-gray-500">
                  文化政策データがまだ投入されていません。
                </p>
                <code className="mt-3 inline-block rounded bg-amber-50 px-3 py-2 text-xs font-mono text-amber-800">
                  pnpm ingest:culture
                </code>
                <p className="mt-2 text-xs text-gray-400">
                  を実行して文化庁予算・文化プログラムデータを投入してください。
                </p>
              </div>
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
        title="文化政策ダッシュボード"
        subtitle="日本の文化予算・芸術振興・文化財保護を一目で把握"
        gradientFrom="from-amber-500"
        gradientTo="to-yellow-600"
      >
        <div className="flex flex-wrap gap-4 text-sm text-white/70">
          {latestYear && <span>最新データ: {latestYear}年度</span>}
          <span>予算データ: {data?.budgetCount ?? 0}件</span>
          <span>文化プログラム: {activeProgramCount}件</span>
        </div>
      </HeroSection>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* ====== Stats Row ====== */}
        <section className="mb-12">
          <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StaggerItem>
              <Stat
                label="文化庁予算総額"
                value={latestTotalBudget ? formatBudgetAmount(latestTotalBudget.amount) : "---"}
                change={latestYear ? `${latestYear}年度` : undefined}
                trend="neutral"
                icon={
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
            </StaggerItem>
            <StaggerItem>
              <Stat
                label="文化プログラム数"
                value={activeProgramCount}
                change="アクティブな施策"
                trend="neutral"
                icon={
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                }
              />
            </StaggerItem>
            <StaggerItem>
              <Stat
                label="予算カテゴリ数"
                value={culturalPropertyCount > 0 ? `${new Set(latestYearBudgets.map(b => b.category)).size}分野` : "---"}
                change="文化政策の分野"
                trend="neutral"
                icon={
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                }
              />
            </StaggerItem>
            <StaggerItem>
              <Stat
                label="年間データ件数"
                value={`${uniqueYears.size}年分`}
                change="時系列データ"
                trend="neutral"
                icon={
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
              />
            </StaggerItem>
          </StaggerGrid>
        </section>

        {/* ====== Budget Trend (TOTAL by year) ====== */}
        {totalByYear.length > 0 && (
          <section className="mb-12">
            <FadeIn>
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
                <span className="inline-block h-6 w-1 rounded-full bg-gradient-to-b from-amber-500 to-yellow-600" />
                文化庁予算の推移
              </h2>
            </FadeIn>
            <StaggerGrid className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {totalByYear.map((b) => {
                const maxAmount = Math.max(...totalByYear.map((t) => Number(t.amount)));
                const pct = maxAmount > 0 ? (Number(b.amount) / maxAmount) * 100 : 0;
                return (
                  <StaggerItem key={b.id}>
                    <div className="group relative overflow-hidden rounded-xl border bg-white p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:scale-[1.02]">
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-500" />
                      <p className="text-sm font-medium text-gray-500">{b.fiscalYear}年度</p>
                      <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
                        {formatBudgetAmountShort(b.amount)}
                      </p>
                      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-400">
                        {formatBudgetAmount(b.amount)}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerGrid>
            <FadeIn delay={0.3}>
              <div className="mt-4 text-right">
                <Link
                  href="/budget"
                  className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
                >
                  予算の詳細を見る
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </FadeIn>
          </section>
        )}

        {/* ====== Category Breakdown (latest year) ====== */}
        {latestYearBudgets.length > 0 && (
          <section className="mb-12">
            <FadeIn>
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
                <span className="inline-block h-6 w-1 rounded-full bg-gradient-to-b from-amber-500 to-yellow-600" />
                {latestYear}年度 分野別予算
              </h2>
            </FadeIn>
            <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latestYearBudgets
                .sort((a, b) => Number(b.amount) - Number(a.amount))
                .map((b) => {
                  const colors = getCategoryColor(b.category);
                  return (
                    <StaggerItem key={b.id}>
                      <GradientCard gradientFrom={colors.from} gradientTo={colors.to}>
                        <div className="flex items-start justify-between">
                          <div>
                            <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}>
                              {getCategoryLabel(b.category)}
                            </span>
                            <p className="mt-2 text-2xl font-bold tracking-tight">
                              {formatBudgetAmount(b.amount)}
                            </p>
                          </div>
                          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg}`}>
                            <svg className={`h-5 w-5 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                        </div>
                        {b.description && (
                          <p className="mt-2 text-sm text-gray-500 line-clamp-2">{b.description}</p>
                        )}
                      </GradientCard>
                    </StaggerItem>
                  );
                })}
            </StaggerGrid>
          </section>
        )}

        {/* ====== Top Programs ====== */}
        {programs.length > 0 && (
          <section className="mb-12">
            <FadeIn>
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
                <span className="inline-block h-6 w-1 rounded-full bg-gradient-to-b from-amber-500 to-yellow-600" />
                主な文化プログラム
              </h2>
            </FadeIn>
            <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((p) => {
                const colors = getCategoryColor(p.category);
                return (
                  <StaggerItem key={p.id}>
                    <Card hover>
                      <div className="mb-3 flex items-center justify-between">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}>
                          {getCategoryLabel(p.category)}
                        </span>
                        {p.isActive && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            実施中
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold tracking-tight">{p.name}</h3>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-3">{p.description}</p>
                      <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-500">
                        {p.budget && (
                          <span className="rounded-lg bg-amber-50 px-2 py-1 font-medium text-amber-700">
                            {formatBudgetAmount(p.budget)}
                          </span>
                        )}
                        <span className="rounded-lg bg-gray-100 px-2 py-1">
                          {p.startYear}年〜{p.endYear ? `${p.endYear}年` : "継続中"}
                        </span>
                        {p.targetGroup && (
                          <span className="rounded-lg bg-gray-100 px-2 py-1">
                            対象: {p.targetGroup}
                          </span>
                        )}
                      </div>
                    </Card>
                  </StaggerItem>
                );
              })}
            </StaggerGrid>
            <FadeIn delay={0.3}>
              <div className="mt-4 text-right">
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
                >
                  すべての文化施策を見る
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </FadeIn>
          </section>
        )}

        {/* ====== Quick Navigation ====== */}
        <section>
          <FadeIn>
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
              <span className="inline-block h-6 w-1 rounded-full bg-gradient-to-b from-amber-500 to-yellow-600" />
              もっと探る
            </h2>
          </FadeIn>
          <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StaggerItem>
              <Link href="/budget" className="block">
                <GradientCard gradientFrom="from-amber-400" gradientTo="to-orange-500">
                  <h3 className="text-lg font-bold">予算推移</h3>
                  <p className="mt-1 text-sm text-gray-600">年度別・分野別の文化庁予算をチャートで可視化</p>
                </GradientCard>
              </Link>
            </StaggerItem>
            <StaggerItem>
              <Link href="/programs" className="block">
                <GradientCard gradientFrom="from-emerald-400" gradientTo="to-teal-500">
                  <h3 className="text-lg font-bold">文化施策</h3>
                  <p className="mt-1 text-sm text-gray-600">文化庁の補助金・助成金プログラム一覧</p>
                </GradientCard>
              </Link>
            </StaggerItem>
            <StaggerItem>
              <Link href="/compare" className="block">
                <GradientCard gradientFrom="from-violet-400" gradientTo="to-purple-500">
                  <h3 className="text-lg font-bold">政党比較</h3>
                  <p className="mt-1 text-sm text-gray-600">各政党の文化政策スタンスを横断的に比較</p>
                </GradientCard>
              </Link>
            </StaggerItem>
          </StaggerGrid>
        </section>
      </div>
    </div>
  );
}
