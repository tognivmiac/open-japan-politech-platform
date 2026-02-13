import { prisma } from "@ojpp/db";
import { Card, HeroSection, FadeIn } from "@ojpp/ui";
import { unstable_noStore as noStore } from "next/cache";
import { PrefectureTable } from "./prefecture-table";

export const dynamic = "force-dynamic";

/* ---------- Types ---------- */

interface WelfareStatRow {
  id: string;
  prefectureId: string;
  fiscalYear: number;
  category: string;
  value: number;
  unit: string;
  indicator: string;
  prefecture: {
    id: string;
    code: string;
    name: string;
    region: string | null;
  };
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
};

/* ---------- Main Page ---------- */

export default async function PrefecturesPage() {
  noStore();

  let stats: WelfareStatRow[] = [];
  try {
    stats = (await prisma.welfareStat.findMany({
      include: { prefecture: true },
      orderBy: [{ fiscalYear: "desc" }, { prefecture: { code: "asc" } }],
    })) as unknown as WelfareStatRow[];
  } catch {
    // DB not available
  }

  if (stats.length === 0) {
    return (
      <div>
        <HeroSection
          title="都道府県別データ"
          subtitle="社会保障に関する都道府県別の指標を比較"
          gradientFrom="from-emerald-500"
          gradientTo="to-teal-600"
        />
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Card>
            <p className="text-center text-gray-500">
              都道府県別福祉データがまだありません。
              <br />
              <code className="text-xs">pnpm ingest:social-security</code> を実行してデータを投入してください。
            </p>
          </Card>
        </div>
      </div>
    );
  }

  /* --- Derive available filters --- */
  const years = [...new Set(stats.map((s) => s.fiscalYear))].sort((a, b) => b - a);
  const latestYear = years[0];
  const indicators = [...new Set(stats.map((s) => s.indicator))].sort();
  const categories = [...new Set(stats.map((s) => s.category))];

  /* --- Build table data for latest year --- */
  const latestStats = stats.filter((s) => s.fiscalYear === latestYear);

  // Group by prefecture
  const prefectureMap = new Map<string, { name: string; code: string; region: string | null; stats: Record<string, { value: number; unit: string }> }>();
  for (const s of latestStats) {
    if (!prefectureMap.has(s.prefectureId)) {
      prefectureMap.set(s.prefectureId, {
        name: s.prefecture.name,
        code: s.prefecture.code,
        region: s.prefecture.region,
        stats: {},
      });
    }
    const pref = prefectureMap.get(s.prefectureId)!;
    pref.stats[s.indicator] = { value: s.value, unit: s.unit };
  }

  const tableData = [...prefectureMap.entries()]
    .map(([id, data]) => ({
      id,
      ...data,
    }))
    .sort((a, b) => a.code.localeCompare(b.code));

  const categoryLabels = Object.fromEntries(
    categories.map((c) => [c, CATEGORY_LABELS[c] ?? c])
  );

  return (
    <div>
      <HeroSection
        title="都道府県別データ"
        subtitle="社会保障に関する都道府県別の指標を比較"
        gradientFrom="from-emerald-500"
        gradientTo="to-teal-600"
      >
        <div className="flex flex-wrap gap-4 text-sm text-white/70">
          <span>最新: {latestYear}年度</span>
          <span>指標数: {indicators.length}種</span>
          <span>都道府県: {prefectureMap.size}</span>
        </div>
      </HeroSection>

      <div className="mx-auto max-w-7xl px-6 py-12 space-y-8">
        <FadeIn>
          <PrefectureTable
            data={tableData}
            indicators={indicators}
            categories={categories}
            categoryLabels={categoryLabels}
            year={latestYear}
          />
        </FadeIn>
      </div>
    </div>
  );
}
