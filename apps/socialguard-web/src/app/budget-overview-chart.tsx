"use client";

import { useRef } from "react";
import { useInView } from "@ojpp/ui";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartData {
  category: string;
  amount: number;
  color: string;
}

export function BudgetOverviewChart({ data }: { data: ChartData[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref}>
      {isInView && (
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={data} layout="vertical" margin={{ left: 100, right: 20 }}>
            <defs>
              {data.map((d) => (
                <linearGradient key={d.category} id={`grad-${d.category}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={d.color} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={d.color} stopOpacity={0.6} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
            <XAxis
              type="number"
              tickFormatter={(v: number) =>
                v >= 10000 ? `${(v / 10000).toFixed(0)}兆` : `${v.toLocaleString()}億`
              }
              tick={{ fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey="category"
              width={100}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: number) => [
                value >= 10000
                  ? `${(value / 10000).toFixed(2)}兆円`
                  : `${value.toLocaleString()}億円`,
                "予算額",
              ]}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
              }}
            />
            <Bar dataKey="amount" radius={[0, 6, 6, 0]} animationDuration={1200} animationBegin={200}>
              {data.map((d) => (
                <Cell key={d.category} fill={`url(#grad-${d.category})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
