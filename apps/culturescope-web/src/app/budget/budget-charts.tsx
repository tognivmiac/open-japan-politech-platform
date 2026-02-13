"use client";

import { useRef } from "react";
import { useInView } from "@ojpp/ui";
import { Card } from "@ojpp/ui";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

/* ---------- Types ---------- */

interface BudgetItem {
  id: string;
  fiscalYear: number;
  category: string;
  amount: number;
  description: string | null;
}

interface BudgetChartsProps {
  budgets: BudgetItem[];
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

const CATEGORY_CHART_COLORS: Record<string, string> = {
  ARTS_PROMOTION: "#f59e0b",
  CULTURAL_PROPERTY: "#10b981",
  MEDIA_ARTS: "#8b5cf6",
  INTERNATIONAL: "#3b82f6",
  COPYRIGHT: "#f43f5e",
  JAPANESE_LANGUAGE: "#06b6d4",
  RELIGIOUS_AFFAIRS: "#78716c",
  CREATIVE_INDUSTRY: "#d946ef",
  CULTURAL_FACILITY: "#84cc16",
  DIGITAL_ARCHIVE: "#6366f1",
  LOCAL_CULTURE: "#f97316",
  TOTAL: "#d97706",
};

const PIE_COLORS = [
  "#f59e0b", "#10b981", "#8b5cf6", "#3b82f6", "#f43f5e",
  "#06b6d4", "#78716c", "#d946ef", "#84cc16", "#6366f1", "#f97316",
];

function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}

function formatAmount(value: number): string {
  if (value >= 10000) return `${(value / 10000).toFixed(1)}兆`;
  if (value >= 100) return `${Math.round(value / 100)}億`;
  return `${value}百万`;
}

/* ---------- Custom Tooltip ---------- */

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-white/95 p-3 shadow-lg backdrop-blur-sm">
      <p className="mb-1 text-sm font-bold text-gray-900">{label}年度</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: {formatAmount(entry.value)} ({entry.value}百万円)
        </p>
      ))}
    </div>
  );
}

/* ---------- Component ---------- */

export function BudgetCharts({ budgets }: BudgetChartsProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const pieRef = useRef<HTMLDivElement>(null);
  const isBarInView = useInView(barRef, { once: true, margin: "-40px" });
  const isAreaInView = useInView(areaRef, { once: true, margin: "-40px" });
  const isPieInView = useInView(pieRef, { once: true, margin: "-40px" });

  /* --- Total budget by year (for AreaChart) --- */
  const totalByYear = budgets
    .filter((b) => b.category === "TOTAL")
    .sort((a, b) => a.fiscalYear - b.fiscalYear)
    .map((b) => ({
      year: `${b.fiscalYear}`,
      amount: b.amount,
    }));

  /* --- Category breakdown by year (for BarChart) --- */
  const years = [...new Set(budgets.map((b) => b.fiscalYear))].sort();
  const categories = [...new Set(budgets.filter((b) => b.category !== "TOTAL").map((b) => b.category))];

  const barData = years.map((year) => {
    const row: Record<string, number | string> = { year: `${year}` };
    for (const cat of categories) {
      const entry = budgets.find((b) => b.fiscalYear === year && b.category === cat);
      row[cat] = entry?.amount ?? 0;
    }
    return row;
  });

  /* --- Pie chart: latest year category breakdown --- */
  const latestYear = years[years.length - 1];
  const pieData = budgets
    .filter((b) => b.fiscalYear === latestYear && b.category !== "TOTAL")
    .sort((a, b) => b.amount - a.amount)
    .map((b) => ({
      name: getCategoryLabel(b.category),
      value: b.amount,
    }));

  return (
    <div className="space-y-8">
      {/* ====== Total Budget Trend (Area Chart) ====== */}
      {totalByYear.length > 0 && (
        <div ref={areaRef}>
          <Card padding="lg">
            <h3 className="mb-4 text-xl font-bold">文化庁予算総額の推移</h3>
            <div
              className="transition-opacity duration-700"
              style={{ opacity: isAreaInView ? 1 : 0 }}
            >
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={totalByYear} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradientAmber" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(v: number) => formatAmount(v)}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    name="予算総額"
                    stroke="#d97706"
                    strokeWidth={3}
                    fill="url(#gradientAmber)"
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {/* ====== Category Breakdown (Stacked Bar Chart) ====== */}
      {barData.length > 0 && categories.length > 0 && (
        <div ref={barRef}>
          <Card padding="lg">
            <h3 className="mb-4 text-xl font-bold">分野別予算の推移</h3>
            <div
              className="transition-opacity duration-700"
              style={{ opacity: isBarInView ? 1 : 0 }}
            >
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={barData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(v: number) => formatAmount(v)}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      return (
                        <div className="rounded-lg border bg-white/95 p-3 shadow-lg backdrop-blur-sm max-h-80 overflow-y-auto">
                          <p className="mb-2 text-sm font-bold text-gray-900">{label}年度</p>
                          {payload
                            .filter((entry) => (entry.value as number) > 0)
                            .sort((a, b) => (b.value as number) - (a.value as number))
                            .map((entry, i) => (
                              <p key={i} className="text-xs" style={{ color: entry.color as string }}>
                                {getCategoryLabel(entry.dataKey as string)}: {formatAmount(entry.value as number)}
                              </p>
                            ))}
                        </div>
                      );
                    }}
                  />
                  <Legend
                    formatter={(value: string) => getCategoryLabel(value)}
                    wrapperStyle={{ fontSize: 11 }}
                  />
                  {categories.map((cat) => (
                    <Bar
                      key={cat}
                      dataKey={cat}
                      name={cat}
                      stackId="a"
                      fill={CATEGORY_CHART_COLORS[cat] ?? "#9ca3af"}
                      animationDuration={1200}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {/* ====== Pie Chart (Latest Year) ====== */}
      {pieData.length > 0 && (
        <div ref={pieRef}>
          <Card padding="lg">
            <h3 className="mb-4 text-xl font-bold">{latestYear}年度 分野別構成比</h3>
            <div
              className="transition-opacity duration-700"
              style={{ opacity: isPieInView ? 1 : 0 }}
            >
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    paddingAngle={2}
                    dataKey="value"
                    animationDuration={1200}
                    label={({ name, percent }: { name: string; percent: number }) =>
                      `${name} ${(percent * 100).toFixed(1)}%`
                    }
                    labelLine={{ stroke: "#d1d5db" }}
                  >
                    {pieData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `${formatAmount(value)} (${value}百万円)`,
                      name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {/* ====== Data Table ====== */}
      <Card padding="lg">
        <h3 className="mb-4 text-xl font-bold">予算データ一覧</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-xs text-gray-500">
                <th className="pb-2 pr-4 font-medium">年度</th>
                <th className="pb-2 pr-4 font-medium">分野</th>
                <th className="pb-2 text-right font-medium">予算額</th>
              </tr>
            </thead>
            <tbody>
              {budgets
                .sort((a, b) => b.fiscalYear - a.fiscalYear || a.category.localeCompare(b.category))
                .slice(0, 50)
                .map((b) => (
                  <tr
                    key={b.id}
                    className="border-b last:border-0 transition-colors hover:bg-amber-50/40"
                  >
                    <td className="py-2 pr-4 text-gray-600">{b.fiscalYear}</td>
                    <td className="py-2 pr-4">
                      <span
                        className="inline-block rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: `${CATEGORY_CHART_COLORS[b.category] ?? "#9ca3af"}15`,
                          color: CATEGORY_CHART_COLORS[b.category] ?? "#6b7280",
                        }}
                      >
                        {getCategoryLabel(b.category)}
                      </span>
                    </td>
                    <td className="py-2 text-right font-bold">{formatAmount(b.amount)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
