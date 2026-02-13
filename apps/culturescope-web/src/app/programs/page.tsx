import { prisma } from "@ojpp/db";
import { HeroSection, Card, FadeIn, StaggerGrid, StaggerItem, GradientCard } from "@ojpp/ui";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";

/* ---------- Types ---------- */

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
  sourceUrl: string | null;
  isActive: boolean;
}

/* ---------- Constants ---------- */

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

function formatBudgetAmount(amount: bigint): string {
  const num = Number(amount);
  if (num >= 10000) return `${(num / 10000).toFixed(1)}兆円`;
  if (num >= 100) return `${Math.round(num / 100)}億円`;
  return `${num}百万円`;
}

/* ---------- Data fetching ---------- */

async function getPrograms() {
  noStore();
  const programs = await prisma.culturalProgram.findMany({
    orderBy: [{ isActive: "desc" }, { budget: "desc" }],
  });
  return programs as unknown as ProgramData[];
}

/* ---------- Page ---------- */

export default async function ProgramsPage() {
  let programs: ProgramData[] = [];
  let fetchError: string | null = null;

  try {
    programs = await getPrograms();
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[CultureScope] Failed to fetch programs:", msg);
    fetchError = msg;
  }

  /* Group by category */
  const categories = [...new Set(programs.map((p) => p.category))];
  const activeCount = programs.filter((p) => p.isActive).length;

  if (programs.length === 0) {
    return (
      <div>
        <HeroSection
          title="文化施策一覧"
          subtitle="文化庁の補助金・助成金プログラムと文化政策を網羅"
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
                文化プログラムデータがまだ投入されていません。
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
        title="文化施策一覧"
        subtitle="文化庁の補助金・助成金プログラムと文化政策を網羅"
        gradientFrom="from-amber-500"
        gradientTo="to-yellow-600"
      >
        <div className="flex flex-wrap gap-4 text-sm text-white/70">
          <span>全{programs.length}件</span>
          <span>実施中: {activeCount}件</span>
          <span>分野数: {categories.length}</span>
        </div>
      </HeroSection>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* ====== Category Filter Summary ====== */}
        <FadeIn>
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => {
              const colors = getCategoryColor(cat);
              const count = programs.filter((p) => p.category === cat).length;
              return (
                <a
                  key={cat}
                  href={`#category-${cat}`}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all hover:scale-105 ${colors.bg} ${colors.text}`}
                >
                  {getCategoryLabel(cat)}
                  <span className="rounded-full bg-white/60 px-1.5 py-0.5 text-[10px]">{count}</span>
                </a>
              );
            })}
          </div>
        </FadeIn>

        {/* ====== Programs by Category ====== */}
        {categories.map((cat) => {
          const colors = getCategoryColor(cat);
          const catPrograms = programs.filter((p) => p.category === cat);

          return (
            <section key={cat} id={`category-${cat}`} className="mb-12">
              <FadeIn>
                <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
                  <span className={`inline-block h-6 w-1 rounded-full bg-gradient-to-b ${colors.from} ${colors.to}`} />
                  {getCategoryLabel(cat)}
                  <span className="text-sm font-normal text-gray-400">({catPrograms.length}件)</span>
                </h2>
              </FadeIn>

              <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {catPrograms.map((p) => (
                  <StaggerItem key={p.id}>
                    <GradientCard gradientFrom={colors.from} gradientTo={colors.to}>
                      {/* Header */}
                      <div className="mb-3 flex items-start justify-between">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}>
                          {getCategoryLabel(p.category)}
                        </span>
                        {p.isActive ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            実施中
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                            終了
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold tracking-tight leading-tight">{p.name}</h3>

                      {/* Description */}
                      <p className="mt-2 text-sm text-gray-600 line-clamp-3">{p.description}</p>

                      {/* Metadata */}
                      <div className="mt-4 flex flex-wrap gap-2 text-xs">
                        {p.budget && (
                          <span className="rounded-lg bg-amber-50 px-2 py-1 font-medium text-amber-700">
                            {formatBudgetAmount(p.budget)}
                          </span>
                        )}
                        <span className="rounded-lg bg-gray-100 px-2 py-1 text-gray-600">
                          {p.startYear}年〜{p.endYear ? `${p.endYear}年` : "継続中"}
                        </span>
                        {p.targetGroup && (
                          <span className="rounded-lg bg-blue-50 px-2 py-1 text-blue-700">
                            対象: {p.targetGroup}
                          </span>
                        )}
                        <span className="rounded-lg bg-gray-100 px-2 py-1 text-gray-600">
                          {p.ministry}
                        </span>
                      </div>

                      {/* Source link */}
                      {p.sourceUrl && (
                        <div className="mt-3">
                          <a
                            href={p.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors"
                          >
                            出典を見る &rarr;
                          </a>
                        </div>
                      )}
                    </GradientCard>
                  </StaggerItem>
                ))}
              </StaggerGrid>
            </section>
          );
        })}
      </div>
    </div>
  );
}
