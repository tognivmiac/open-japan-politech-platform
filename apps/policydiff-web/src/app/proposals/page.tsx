import { prisma } from "@ojpp/db";

export const dynamic = "force-dynamic";

export default async function ProposalsPage() {
  const proposals = await prisma.policyProposal.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      policy: {
        include: { party: true },
      },
    },
  });

  const statusCounts = {
    OPEN: proposals.filter((p) => p.status === "OPEN").length,
    UNDER_REVIEW: proposals.filter((p) => p.status === "UNDER_REVIEW").length,
    ACCEPTED: proposals.filter((p) => p.status === "ACCEPTED").length,
    REJECTED: proposals.filter((p) => p.status === "REJECTED").length,
    WITHDRAWN: proposals.filter((p) => p.status === "WITHDRAWN").length,
  };

  const statusStyleMap: Record<string, { bg: string; color: string }> = {
    OPEN: { bg: "rgba(59, 130, 246, 0.15)", color: "#60a5fa" },
    UNDER_REVIEW: { bg: "rgba(251, 191, 36, 0.15)", color: "#fbbf24" },
    ACCEPTED: { bg: "rgba(34, 197, 94, 0.15)", color: "#4ade80" },
    REJECTED: { bg: "rgba(239, 68, 68, 0.15)", color: "#f87171" },
    WITHDRAWN: { bg: "rgba(148, 163, 184, 0.15)", color: "#94a3b8" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="mb-2 text-3xl font-bold text-white">政策変更提案</h2>
        <p className="mb-8 text-slate-400">
          市民から寄せられた政策の改善提案一覧です。GitHubのPull
          Requestのように、政策への変更を提案できます。
        </p>

        <div className="mb-8 flex flex-wrap gap-3">
          {Object.entries(statusCounts).map(([status, count]) => {
            const style = statusStyleMap[status] ?? statusStyleMap.WITHDRAWN;
            return (
              <span
                key={status}
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{ backgroundColor: style.bg, color: style.color }}
              >
                {status}: {count}
              </span>
            );
          })}
        </div>

        {proposals.length > 0 ? (
          <div className="space-y-3">
            {proposals.map((proposal) => {
              const style = statusStyleMap[proposal.status] ?? statusStyleMap.WITHDRAWN;
              return (
                <div key={proposal.id} className="glass-card p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{proposal.title}</h3>
                      <p className="mt-1 text-sm text-slate-400">{proposal.description}</p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                        {proposal.policy.party && (
                          <span className="flex items-center gap-1">
                            {proposal.policy.party.color && (
                              <span
                                className="inline-block h-2 w-2 rounded-full"
                                style={{ backgroundColor: proposal.policy.party.color }}
                              />
                            )}
                            {proposal.policy.party.name}
                          </span>
                        )}
                        <span>{proposal.policy.title}</span>
                        <span>{new Date(proposal.createdAt).toLocaleDateString("ja-JP")}</span>
                      </div>
                      {proposal.gitPrUrl && (
                        <a
                          href={proposal.gitPrUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-xs text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          GitHub PR を見る
                        </a>
                      )}
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ backgroundColor: style.bg, color: style.color }}
                    >
                      {proposal.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-card p-8 text-center">
            <p className="text-slate-500">まだ提案がありません。</p>
            <p className="mt-2 text-sm text-slate-600">
              GitHubからPull Requestを送るか、このサイトから提案できます。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
