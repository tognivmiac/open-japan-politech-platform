/**
 * ingest-sessions.ts
 *
 * 国会会期データの投入（第190回〜第220回）
 *
 * データソース:
 *   - 衆議院 国会会期一覧 (https://www.shugiin.go.jp/internet/itdb_annai.nsf/html/statics/shiryo/kaiki.htm)
 *   - 各回次のWikipedia記事（裏付け確認用）
 */

import type { SessionType } from "@ojpp/db";
import { prisma } from "@ojpp/db";

interface SessionData {
  number: number;
  type: SessionType;
  startDate: string;
  endDate: string;
}

const SESSIONS: SessionData[] = [
  // --- 第190回〜第199回（2016〜2019年）安倍内閣 ---
  { number: 190, type: "ORDINARY", startDate: "2016-01-04", endDate: "2016-06-01" },
  { number: 191, type: "EXTRAORDINARY", startDate: "2016-08-01", endDate: "2016-08-03" }, // 参院選後・3日間
  { number: 192, type: "EXTRAORDINARY", startDate: "2016-09-26", endDate: "2016-12-17" },
  { number: 193, type: "ORDINARY", startDate: "2017-01-20", endDate: "2017-06-18" },
  { number: 194, type: "EXTRAORDINARY", startDate: "2017-09-28", endDate: "2017-09-28" }, // 衆院解散・会期1日
  { number: 195, type: "SPECIAL", startDate: "2017-11-01", endDate: "2017-12-09" }, // 第48回衆院選後・首相指名
  { number: 196, type: "ORDINARY", startDate: "2018-01-22", endDate: "2018-07-22" },
  { number: 197, type: "EXTRAORDINARY", startDate: "2018-10-24", endDate: "2018-12-10" },
  { number: 198, type: "ORDINARY", startDate: "2019-01-28", endDate: "2019-06-26" },
  { number: 199, type: "EXTRAORDINARY", startDate: "2019-08-01", endDate: "2019-08-05" }, // 参院選後・5日間

  // --- 第200回〜第207回（2019〜2021年） ---
  { number: 200, type: "EXTRAORDINARY", startDate: "2019-10-04", endDate: "2019-12-09" },
  { number: 201, type: "ORDINARY", startDate: "2020-01-20", endDate: "2020-06-17" },
  { number: 202, type: "EXTRAORDINARY", startDate: "2020-09-16", endDate: "2020-09-18" }, // 菅内閣発足の特別国会的性質
  { number: 203, type: "EXTRAORDINARY", startDate: "2020-10-26", endDate: "2020-12-05" },
  { number: 204, type: "ORDINARY", startDate: "2021-01-18", endDate: "2021-06-16" },
  { number: 205, type: "EXTRAORDINARY", startDate: "2021-10-04", endDate: "2021-10-14" }, // 岸田内閣発足・衆院解散
  { number: 206, type: "SPECIAL", startDate: "2021-11-10", endDate: "2021-11-12" }, // 第49回衆院選後・首相指名
  { number: 207, type: "EXTRAORDINARY", startDate: "2021-12-06", endDate: "2021-12-21" },

  // --- 第208回〜第210回（2022年）岸田内閣 ---
  { number: 208, type: "ORDINARY", startDate: "2022-01-17", endDate: "2022-06-15" },
  { number: 209, type: "EXTRAORDINARY", startDate: "2022-08-03", endDate: "2022-08-05" }, // 参院選後・3日間
  { number: 210, type: "EXTRAORDINARY", startDate: "2022-10-03", endDate: "2022-12-10" },

  // --- 第211回〜第213回（2023〜2024年）岸田内閣 ---
  { number: 211, type: "ORDINARY", startDate: "2023-01-23", endDate: "2023-06-21" },
  { number: 212, type: "EXTRAORDINARY", startDate: "2023-10-20", endDate: "2023-12-13" },
  { number: 213, type: "ORDINARY", startDate: "2024-01-26", endDate: "2024-06-23" },

  // --- 第214回〜第216回（2024年秋）石破内閣 ---
  { number: 214, type: "EXTRAORDINARY", startDate: "2024-10-01", endDate: "2024-10-09" }, // 石破内閣発足・衆院解散
  { number: 215, type: "SPECIAL", startDate: "2024-11-11", endDate: "2024-11-14" }, // 第50回衆院選後・石破再指名
  { number: 216, type: "EXTRAORDINARY", startDate: "2024-11-28", endDate: "2024-12-24" }, // 政治改革・補正予算

  // --- 第217回〜第220回（2025〜2026年） ---
  { number: 217, type: "ORDINARY", startDate: "2025-01-24", endDate: "2025-06-22" }, // 石破内閣・通常国会（150日間）
  { number: 218, type: "EXTRAORDINARY", startDate: "2025-08-01", endDate: "2025-08-05" }, // 参院選後・5日間
  { number: 219, type: "EXTRAORDINARY", startDate: "2025-10-21", endDate: "2025-12-17" }, // 臨時国会（58日間）
  { number: 220, type: "ORDINARY", startDate: "2026-01-23", endDate: "2026-01-23" }, // 召集日に衆院解散（会期1日）
];

export async function ingestSessions() {
  console.log("Ingesting diet sessions...");

  for (const session of SESSIONS) {
    const existing = await prisma.dietSession.findFirst({
      where: { number: session.number },
    });

    if (existing) {
      await prisma.dietSession.update({
        where: { id: existing.id },
        data: {
          type: session.type,
          startDate: new Date(session.startDate),
          endDate: new Date(session.endDate),
        },
      });
      console.log(`  Updated session #${session.number}`);
    } else {
      await prisma.dietSession.create({
        data: {
          number: session.number,
          type: session.type,
          startDate: new Date(session.startDate),
          endDate: new Date(session.endDate),
        },
      });
      console.log(`  Created session #${session.number}`);
    }
  }

  console.log(`Ingested ${SESSIONS.length} sessions.`);
}

if (require.main === module) {
  ingestSessions()
    .then(() => process.exit(0))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
