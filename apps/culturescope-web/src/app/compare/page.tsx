import { prisma } from "@ojpp/db";
import { HeroSection, Card, FadeIn, StaggerGrid, StaggerItem } from "@ojpp/ui";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";

/* ---------- Types ---------- */

interface StanceData {
  id: string;
  topic: string;
  stance: string;
  summary: string;
  manifesto: string | null;
  year: number;
  party: {
    id: string;
    name: string;
    shortName: string | null;
    color: string | null;
  };
}

/* ---------- Helpers ---------- */

function stanceBadge(stance: string) {
  const lower = stance.toLowerCase();
  if (lower.includes("賛成") || lower.includes("推進") || lower.includes("積極")) {
    return { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" };
  }
  if (lower.includes("反対") || lower.includes("慎重") || lower.includes("消極")) {
    return { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" };
  }
  if (lower.includes("条件") || lower.includes("一部")) {
    return { bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500" };
  }
  return { bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-500" };
}

/* ---------- Data fetching ---------- */

async function getStances() {
  noStore();
  const stances = await prisma.culturalStance.findMany({
    include: {
      party: {
        select: { id: true, name: true, shortName: true, color: true },
      },
    },
    orderBy: [{ year: "desc" }, { topic: "asc" }],
  });
  return stances as unknown as StanceData[];
}

/* ---------- Page ---------- */

export default async function ComparePage() {
  let stances: StanceData[] = [];
  let fetchError: string | null = null;

  try {
    stances = await getStances();
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[CultureScope] Failed to fetch stances:", msg);
    fetchError = msg;
  }

  /* Group by party */
  const partyMap = new Map<string, { party: StanceData["party"]; stances: StanceData[] }>();
  for (const s of stances) {
    const existing = partyMap.get(s.party.id);
    if (existing) {
      existing.stances.push(s);
    } else {
      partyMap.set(s.party.id, { party: s.party, stances: [s] });
    }
  }
  const parties = [...partyMap.values()];

  /* Group by topic for cross-comparison */
  const topics = [...new Set(stances.map((s) => s.topic))];

  if (stances.length === 0) {
    return (
      <div>
        <HeroSection
          title="政党別文化政策比較"
          subtitle="各政党のマニフェストから文化政策に関するスタンスを横断的に比較"
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
                政党別文化政策スタンスデータがまだ投入されていません。
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
        title="政党別文化政策比較"
        subtitle="各政党のマニフェストから文化政策に関するスタンスを横断的に比較"
        gradientFrom="from-amber-500"
        gradientTo="to-yellow-600"
      >
        <div className="flex flex-wrap gap-4 text-sm text-white/70">
          <span>政党数: {parties.length}</span>
          <span>トピック数: {topics.length}</span>
          <span>スタンス数: {stances.length}件</span>
        </div>
      </HeroSection>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* ====== Party Cards ====== */}
        <section className="mb-12">
          <FadeIn>
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
              <span className="inline-block h-6 w-1 rounded-full bg-gradient-to-b from-amber-500 to-yellow-600" />
              政党別スタンス
            </h2>
          </FadeIn>

          <StaggerGrid className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {parties.map(({ party, stances: partyStances }) => (
              <StaggerItem key={party.id}>
                <Card padding="lg" animate>
                  {/* Party Header */}
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="h-4 w-4 rounded-full shadow-sm"
                      style={{ backgroundColor: party.color ?? "#6B7280" }}
                    />
                    <h3 className="text-xl font-bold">{party.name}</h3>
                    {party.shortName && (
                      <span className="text-sm text-gray-400">({party.shortName})</span>
                    )}
                  </div>

                  {/* Stance list */}
                  <div className="space-y-3">
                    {partyStances.map((s) => {
                      const badge = stanceBadge(s.stance);
                      return (
                        <div
                          key={s.id}
                          className="rounded-lg border border-gray-100 p-3 transition-colors hover:bg-amber-50/30"
                        >
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">{s.topic}</span>
                            <div className="flex items-center gap-2">
                              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${badge.bg} ${badge.text}`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
                                {s.stance}
                              </span>
                              <span className="text-[10px] text-gray-400">{s.year}年</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{s.summary}</p>
                          {s.manifesto && (
                            <p className="mt-1 border-l-2 border-amber-200 pl-2 text-xs italic text-gray-500">
                              {s.manifesto}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>

        {/* ====== Cross-Topic Comparison Table ====== */}
        {topics.length > 0 && parties.length > 1 && (
          <section>
            <FadeIn>
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
                <span className="inline-block h-6 w-1 rounded-full bg-gradient-to-b from-amber-500 to-yellow-600" />
                トピック横断比較
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Card padding="lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-3 pr-4 text-xs font-medium text-gray-500">トピック</th>
                        {parties.map(({ party }) => (
                          <th key={party.id} className="pb-3 px-3 text-center">
                            <div className="flex flex-col items-center gap-1">
                              <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: party.color ?? "#6B7280" }}
                              />
                              <span className="text-xs font-medium text-gray-700">
                                {party.shortName ?? party.name}
                              </span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {topics.map((topic) => (
                        <tr key={topic} className="border-b last:border-0 transition-colors hover:bg-amber-50/30">
                          <td className="py-3 pr-4 font-medium text-gray-900">{topic}</td>
                          {parties.map(({ party, stances: partyStances }) => {
                            const topicStance = partyStances.find((s) => s.topic === topic);
                            if (!topicStance) {
                              return (
                                <td key={party.id} className="px-3 py-3 text-center text-xs text-gray-300">
                                  ---
                                </td>
                              );
                            }
                            const badge = stanceBadge(topicStance.stance);
                            return (
                              <td key={party.id} className="px-3 py-3 text-center">
                                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${badge.bg} ${badge.text}`}>
                                  <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
                                  {topicStance.stance}
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </FadeIn>
          </section>
        )}
      </div>
    </div>
  );
}
