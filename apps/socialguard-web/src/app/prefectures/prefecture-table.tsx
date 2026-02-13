"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "@ojpp/ui";

interface PrefectureData {
  id: string;
  name: string;
  code: string;
  region: string | null;
  stats: Record<string, { value: number; unit: string }>;
}

interface Props {
  data: PrefectureData[];
  indicators: string[];
  categories: string[];
  categoryLabels: Record<string, string>;
  year: number;
}

function getHeatColor(value: number, min: number, max: number): string {
  if (max === min) return "bg-emerald-50";
  const ratio = (value - min) / (max - min);
  if (ratio < 0.25) return "bg-emerald-50 text-emerald-800";
  if (ratio < 0.5) return "bg-emerald-100 text-emerald-900";
  if (ratio < 0.75) return "bg-emerald-200 text-emerald-900";
  return "bg-emerald-300 text-emerald-950 font-semibold";
}

export function PrefectureTable({ data, indicators, categoryLabels, year }: Props) {
  const [selectedIndicator, setSelectedIndicator] = useState<string>(indicators[0] ?? "");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  // Get min/max for heatmap
  const values = data
    .map((d) => d.stats[selectedIndicator]?.value)
    .filter((v): v is number => v != null);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const unit = data.find((d) => d.stats[selectedIndicator])?.stats[selectedIndicator]?.unit ?? "";

  // Sort data
  const sortedData = [...data].sort((a, b) => {
    const aVal = a.stats[selectedIndicator]?.value ?? 0;
    const bVal = b.stats[selectedIndicator]?.value ?? 0;
    return sortDir === "desc" ? bVal - aVal : aVal - bVal;
  });

  return (
    <div ref={ref} className="space-y-6">
      {/* Filter controls */}
      <div className="flex flex-wrap items-center gap-4">
        <label className="text-sm font-medium text-gray-700">
          指標:
          <select
            value={selectedIndicator}
            onChange={(e) => setSelectedIndicator(e.target.value)}
            className="ml-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            {indicators.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => setSortDir(sortDir === "desc" ? "asc" : "desc")}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm shadow-sm transition-colors hover:bg-gray-50"
        >
          {sortDir === "desc" ? "高い順" : "低い順"}
          <span className="text-xs">{sortDir === "desc" ? "\u25BC" : "\u25B2"}</span>
        </button>
        <span className="text-xs text-gray-400">{year}年度 | {data.length}都道府県</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border bg-white shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50/80">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-600 w-12">#</th>
              <th className="px-4 py-3 font-medium text-gray-600">都道府県</th>
              <th className="px-4 py-3 font-medium text-gray-600">地方</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">
                {selectedIndicator} ({unit})
              </th>
              <th className="px-4 py-3 font-medium text-gray-600 w-48">分布</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((pref, i) => {
              const stat = pref.stats[selectedIndicator];
              const value = stat?.value ?? 0;
              const barWidth = max > 0 ? (value / max) * 100 : 0;

              return (
                <motion.tr
                  key={pref.id}
                  className="border-b last:border-0 transition-colors hover:bg-emerald-50/50"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.8) }}
                >
                  <td className="px-4 py-2.5 text-gray-400 text-xs">{i + 1}</td>
                  <td className="px-4 py-2.5 font-medium">{pref.name}</td>
                  <td className="px-4 py-2.5 text-gray-500 text-xs">
                    {pref.region ?? "-"}
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-xs ${getHeatColor(value, min, max)}`}
                    >
                      {value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
                        initial={{ width: "0%" }}
                        animate={isInView ? { width: `${barWidth}%` } : { width: "0%" }}
                        transition={{
                          duration: 0.8,
                          delay: Math.min(i * 0.02, 0.8) + 0.2,
                          type: "spring",
                          stiffness: 60,
                          damping: 15,
                        }}
                      />
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
