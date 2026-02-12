/**
 * seed-real-bills.ts
 *
 * 実際の国会法案データを投入するシードスクリプト。
 * 第211回〜第216回国会（2023〜2024年）の主要法案を含む。
 *
 * データソース:
 *   - 内閣法制局 (https://www.clb.go.jp/recent-laws/)
 *   - 衆議院 議案情報 (https://www.shugiin.go.jp/)
 *   - 参議院 議案情報 (https://www.sangiin.go.jp/)
 *   - 内閣官房 国会提出法案 (https://www.cas.go.jp/jp/houan/)
 */

import type { BillStatus, SessionType } from "@ojpp/db";
import { prisma } from "@ojpp/db";

// ============================================
// 国会会期データ（第211回〜第216回）
// ============================================

interface SessionData {
  number: number;
  type: SessionType;
  startDate: string;
  endDate: string;
}

const SESSIONS: SessionData[] = [
  // 第211回 通常国会（2023年）岸田内閣
  {
    number: 211,
    type: "ORDINARY",
    startDate: "2023-01-23",
    endDate: "2023-06-21",
  },
  // 第212回 臨時国会（2023年秋）岸田内閣
  {
    number: 212,
    type: "EXTRAORDINARY",
    startDate: "2023-10-20",
    endDate: "2023-12-13",
  },
  // 第213回 通常国会（2024年）岸田内閣
  {
    number: 213,
    type: "ORDINARY",
    startDate: "2024-01-26",
    endDate: "2024-06-23",
  },
  // 第214回 臨時国会（2024年10月）石破内閣発足・衆院解散
  {
    number: 214,
    type: "EXTRAORDINARY",
    startDate: "2024-10-01",
    endDate: "2024-10-09",
  },
  // 第215回 特別国会（2024年11月）第50回衆院選後・石破首相再指名
  {
    number: 215,
    type: "SPECIAL",
    startDate: "2024-11-11",
    endDate: "2024-11-14",
  },
  // 第216回 臨時国会（2024年11-12月）政治改革・補正予算
  {
    number: 216,
    type: "EXTRAORDINARY",
    startDate: "2024-11-28",
    endDate: "2024-12-24",
  },
];

// ============================================
// 法案データ
// ============================================

interface RealBill {
  sessionNumber: number;
  number: string; // 「回次-種別-番号」形式
  title: string;
  summary: string;
  proposer: string;
  category: string;
  status: BillStatus;
  submittedAt: string;
  passedAt?: string;
  sourceUrl?: string;
}

const REAL_BILLS: RealBill[] = [
  // ============================================================
  // 第211回国会（2023年通常国会）— 岸田内閣 主要法案
  // 閣法60本提出・全法成立
  // ============================================================
  {
    sessionNumber: 211,
    number: "211-閣法-1",
    title: "我が国の防衛力の抜本的な強化等のために必要な財源の確保に関する特別措置法案",
    summary:
      "防衛力強化のための財源確保に関する特別措置。決算剰余金の活用、税外収入の確保、防衛力強化資金の設置等を規定。5年間で43兆円の防衛費確保を目指す。",
    proposer: "内閣",
    category: "安全保障",
    status: "ENACTED",
    submittedAt: "2023-02-03",
    passedAt: "2023-06-16",
    sourceUrl:
      "https://www.shugiin.go.jp/internet/itdb_gian.nsf/html/gian/keika/1DD5AEE.htm",
  },
  {
    sessionNumber: 211,
    number: "211-閣法-2",
    title: "所得税法等の一部を改正する法律案",
    summary:
      "令和5年度税制改正。NISA制度の拡充・恒久化、インボイス制度の負担軽減措置、防衛力強化に係る税制措置等を含む。",
    proposer: "内閣",
    category: "経済",
    status: "ENACTED",
    submittedAt: "2023-02-03",
    passedAt: "2023-03-28",
    sourceUrl:
      "https://www.mof.go.jp/about_mof/bills/211diet/index.htm",
  },
  {
    sessionNumber: 211,
    number: "211-閣法-6",
    title: "新型インフルエンザ等対策特別措置法及び内閣法の一部を改正する法律案",
    summary:
      "感染症危機管理統括庁の設置。内閣官房に感染症危機に対応する司令塔機能を一元化し、初動対応の迅速化を図る。",
    proposer: "内閣",
    category: "社会保障",
    status: "ENACTED",
    submittedAt: "2023-02-07",
    passedAt: "2023-04-21",
  },
  {
    sessionNumber: 211,
    number: "211-閣法-12",
    title: "脱炭素成長型経済構造への円滑な移行の推進に関する法律案",
    summary:
      "GX推進法。グリーントランスフォーメーションの推進に向け、GX経済移行債の発行、カーボンプライシング導入等を規定。10年間で150兆円超の投資を見込む。",
    proposer: "内閣",
    category: "環境",
    status: "ENACTED",
    submittedAt: "2023-02-10",
    passedAt: "2023-05-12",
    sourceUrl:
      "https://www.cas.go.jp/jp/houan/211.html",
  },
  {
    sessionNumber: 211,
    number: "211-閣法-16",
    title: "全世代対応型の持続可能な社会保障制度を構築するための健康保険法等の一部を改正する法律案",
    summary:
      "出産育児一時金の引上げ（42万→50万円）、後期高齢者医療制度への拠出金見直し、かかりつけ医機能の制度整備等。",
    proposer: "内閣",
    category: "社会保障",
    status: "ENACTED",
    submittedAt: "2023-02-10",
    passedAt: "2023-05-12",
  },
  {
    sessionNumber: 211,
    number: "211-閣法-19",
    title: "防衛省設置法の一部を改正する法律案",
    summary:
      "防衛省の体制強化。自衛官定数の変更、サイバー防衛隊の拡充、統合司令部準備等。",
    proposer: "内閣",
    category: "安全保障",
    status: "ENACTED",
    submittedAt: "2023-02-28",
    passedAt: "2023-04-14",
  },
  {
    sessionNumber: 211,
    number: "211-閣法-20",
    title: "防衛省が調達する装備品等の開発及び生産のための基盤の強化に関する法律案",
    summary:
      "防衛産業基盤強化法。装備品のサプライチェーン強靭化、事業承継支援、製造工程の効率化支援等を規定。",
    proposer: "内閣",
    category: "安全保障",
    status: "ENACTED",
    submittedAt: "2023-02-28",
    passedAt: "2023-06-07",
  },
  {
    sessionNumber: 211,
    number: "211-閣法-26",
    title: "脱炭素社会の実現に向けた電気供給体制の確立を図るための電気事業法等の一部を改正する法律案",
    summary:
      "GX脱炭素電源法。原子力発電所の60年超運転を可能とする規制見直し、再エネ特措法の改正等。原発の運転期間制限を見直し。",
    proposer: "内閣",
    category: "環境",
    status: "ENACTED",
    submittedAt: "2023-02-28",
    passedAt: "2023-05-31",
  },
  {
    sessionNumber: 211,
    number: "211-閣法-36",
    title: "孤独・孤立対策推進法案",
    summary:
      "孤独・孤立対策を国・地方の責務と位置づけ、対策推進本部を設置。NPO等との連携強化、地域協議会の設置等。",
    proposer: "内閣",
    category: "社会保障",
    status: "ENACTED",
    submittedAt: "2023-02-24",
    passedAt: "2023-05-31",
  },
  {
    sessionNumber: 211,
    number: "211-閣法-39",
    title: "地方自治法の一部を改正する法律案",
    summary:
      "議会のオンライン出席の恒久化、会計年度任用職員への勤勉手当支給等。デジタル技術活用の促進。",
    proposer: "内閣",
    category: "行政",
    status: "ENACTED",
    submittedAt: "2023-03-10",
    passedAt: "2023-04-26",
  },
  {
    sessionNumber: 211,
    number: "211-閣法-40",
    title: "放送法及び電波法の一部を改正する法律案",
    summary:
      "NHKのインターネット活用業務の拡大に向けた制度整備。放送番組のネット同時・見逃し配信の必須業務化等。",
    proposer: "内閣",
    category: "行政",
    status: "ENACTED",
    submittedAt: "2023-03-07",
    passedAt: "2023-05-26",
  },
  {
    sessionNumber: 211,
    number: "211-閣法-46",
    title: "行政手続における特定の個人を識別するための番号の利用等に関する法律等の一部を改正する法律案",
    summary:
      "改正マイナンバー法。マイナンバーカードと健康保険証の一体化（マイナ保険証）、マイナンバーの利用範囲拡大、公金受取口座の登録促進等。",
    proposer: "内閣",
    category: "行政",
    status: "ENACTED",
    submittedAt: "2023-03-07",
    passedAt: "2023-06-02",
  },
  {
    sessionNumber: 211,
    number: "211-閣法-48",
    title: "出入国管理及び難民認定法及び日本国との平和条約に基づき日本の国籍を離脱した者等の出入国管理に関する特例法の一部を改正する法律案",
    summary:
      "改正入管法。難民認定申請中の送還停止効の例外規定を新設。監理措置制度の創設、補完的保護対象者の認定制度等。送還忌避問題への対応。",
    proposer: "内閣",
    category: "社会保障",
    status: "ENACTED",
    submittedAt: "2023-03-07",
    passedAt: "2023-06-09",
    sourceUrl:
      "https://www.moj.go.jp/hisho/kouhou/houan211.html",
  },
  {
    sessionNumber: 211,
    number: "211-閣法-23",
    title: "特定受託事業者に係る取引の適正化等に関する法律案",
    summary:
      "フリーランス保護新法。発注事業者に対し、書面等による取引条件の明示義務、報酬の60日以内支払義務等を規定。",
    proposer: "内閣",
    category: "経済",
    status: "ENACTED",
    submittedAt: "2023-02-24",
    passedAt: "2023-04-28",
  },
  {
    sessionNumber: 211,
    number: "211-閣法-47",
    title: "デジタル社会の形成を図るための規制改革を推進するためのデジタル社会形成基本法等の一部を改正する法律案",
    summary:
      "アナログ規制の一括見直し。書面・対面・目視等のアナログ規制をデジタル技術で代替可能とする法改正。",
    proposer: "内閣",
    category: "行政",
    status: "ENACTED",
    submittedAt: "2023-03-07",
    passedAt: "2023-06-07",
  },
  {
    sessionNumber: 211,
    number: "211-閣法-41",
    title: "刑事訴訟法等の一部を改正する法律案",
    summary:
      "被疑者の逃亡を防止するためGPS端末装着命令制度の創設。保釈中の被告人の逃亡防止強化。",
    proposer: "内閣",
    category: "司法",
    status: "ENACTED",
    submittedAt: "2023-03-14",
    passedAt: "2023-05-10",
  },
  // 議員立法
  {
    sessionNumber: 211,
    number: "211-衆法-25",
    title: "性的指向及びジェンダーアイデンティティの多様性に関する国民の理解の増進に関する法律案",
    summary:
      "LGBT理解増進法。性的指向及びジェンダーアイデンティティの多様性に関する国民の理解増進を図るための基本理念、国・地方の施策等を規定。",
    proposer: "自由民主党",
    category: "社会保障",
    status: "ENACTED",
    submittedAt: "2023-06-09",
    passedAt: "2023-06-16",
  },

  // ============================================================
  // 第212回国会（2023年臨時国会）— 岸田内閣
  // 閣法12本（新規）+ 継続2本、全14本成立
  // ============================================================
  {
    sessionNumber: 212,
    number: "212-閣法-1",
    title: "一般職の職員の給与に関する法律等の一部を改正する法律案",
    summary:
      "人事院勧告に基づく国家公務員の給与改定。月例給・ボーナスの引上げ。初任給の大幅引上げを含む。",
    proposer: "内閣",
    category: "行政",
    status: "ENACTED",
    submittedAt: "2023-10-31",
    passedAt: "2023-11-15",
  },
  {
    sessionNumber: 212,
    number: "212-閣法-5",
    title: "防衛省の職員の給与等に関する法律の一部を改正する法律案",
    summary:
      "自衛官等の給与改定。一般職に準じた処遇改善。",
    proposer: "内閣",
    category: "安全保障",
    status: "ENACTED",
    submittedAt: "2023-10-31",
    passedAt: "2023-11-17",
  },
  {
    sessionNumber: 212,
    number: "212-閣法-6",
    title: "国立研究開発法人情報通信研究機構法の一部を改正する等の法律案",
    summary:
      "NICT法改正。サイバーセキュリティ対策の強化、量子技術等の研究開発推進、安全保障分野での情報通信技術の活用強化。",
    proposer: "内閣",
    category: "科学技術",
    status: "ENACTED",
    submittedAt: "2023-10-31",
    passedAt: "2023-11-29",
  },
  {
    sessionNumber: 212,
    number: "212-閣法-7",
    title: "大麻取締法及び麻薬及び向精神薬取締法の一部を改正する法律案",
    summary:
      "大麻の「使用罪」新設。大麻由来医薬品の使用を可能とする制度の整備。大麻草の栽培に関する規制の見直し。",
    proposer: "内閣",
    category: "社会保障",
    status: "ENACTED",
    submittedAt: "2023-10-24",
    passedAt: "2023-12-06",
  },
  {
    sessionNumber: 212,
    number: "212-閣法-8",
    title: "官報の発行に関する法律案",
    summary:
      "官報の電子化。官報のインターネット発行を正本化し、法令公布の電子化を実現。",
    proposer: "内閣",
    category: "行政",
    status: "ENACTED",
    submittedAt: "2023-10-27",
    passedAt: "2023-11-29",
  },
  {
    sessionNumber: 212,
    number: "212-閣法-10",
    title: "国立大学法人法の一部を改正する法律案",
    summary:
      "大規模国立大学法人（東京大学、京都大学等）に運営方針会議の設置を義務付け。外部人材の登用等によるガバナンス強化。",
    proposer: "内閣",
    category: "教育",
    status: "ENACTED",
    submittedAt: "2023-10-31",
    passedAt: "2023-12-13",
  },
  {
    sessionNumber: 212,
    number: "212-閣法-12",
    title: "国立研究開発法人宇宙航空研究開発機構法の一部を改正する法律案",
    summary:
      "JAXA法改正。宇宙戦略基金の設置。民間の宇宙事業を支援するため、JAXAに10年間で1兆円規模の基金を設置。",
    proposer: "内閣",
    category: "科学技術",
    status: "ENACTED",
    submittedAt: "2023-10-31",
    passedAt: "2023-12-13",
  },

  // ============================================================
  // 第213回国会（2024年通常国会）— 岸田内閣
  // 閣法62本提出・61本成立（成立率98.4%）、議員立法8本成立
  // ============================================================
  {
    sessionNumber: 213,
    number: "213-閣法-1",
    title: "所得税法等の一部を改正する法律案",
    summary:
      "令和6年度税制改正。定額減税の実施（所得税3万円・住民税1万円）、賃上げ税制の強化、ストックオプション税制の拡充等。",
    proposer: "内閣",
    category: "経済",
    status: "ENACTED",
    submittedAt: "2024-02-02",
    passedAt: "2024-03-28",
    sourceUrl:
      "https://www.mof.go.jp/about_mof/bills/213diet/index.htm",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-2",
    title: "地方税法等の一部を改正する法律案",
    summary:
      "個人住民税の定額減税（1万円）、固定資産税の負担調整措置の延長、森林環境譲与税の配分見直し等。",
    proposer: "内閣",
    category: "経済",
    status: "ENACTED",
    submittedAt: "2024-02-02",
    passedAt: "2024-03-28",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-14",
    title: "防衛省設置法等の一部を改正する法律案",
    summary:
      "統合作戦司令部の設置。自衛隊の統合運用体制を強化し、陸海空を一元的に指揮する統合作戦司令官を新設。",
    proposer: "内閣",
    category: "安全保障",
    status: "ENACTED",
    submittedAt: "2024-02-13",
    passedAt: "2024-04-16",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-16",
    title: "脱炭素成長型経済構造移行推進のための低炭素水素等の供給及び利用の促進に関する法律案",
    summary:
      "水素社会推進法。低炭素水素等の供給・利用促進のための支援措置、価格差支援制度の創設等。GXの柱の一つ。",
    proposer: "内閣",
    category: "環境",
    status: "ENACTED",
    submittedAt: "2024-02-13",
    passedAt: "2024-05-17",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-17",
    title: "二酸化炭素の貯留事業に関する法律案",
    summary:
      "CCS事業法。二酸化炭素の地下貯留に関する許可制度の創設、事業者の義務、安全基準等を規定。2050年カーボンニュートラル実現に向けた基盤整備。",
    proposer: "内閣",
    category: "環境",
    status: "ENACTED",
    submittedAt: "2024-02-13",
    passedAt: "2024-05-17",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-19",
    title: "流通業務の総合化及び効率化の促進に関する法律及び貨物自動車運送事業法の一部を改正する法律案",
    summary:
      "物流2024年問題対応法。トラックドライバーの時間外労働規制に伴う輸送力不足への対策。荷主・物流事業者の連携強化、多重下請構造の是正等。",
    proposer: "内閣",
    category: "経済",
    status: "ENACTED",
    submittedAt: "2024-02-13",
    passedAt: "2024-04-12",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-20",
    title: "令和六年能登半島地震災害の被災者に対する金銭の支給に関する法律案",
    summary:
      "能登半島地震被災者支援。令和6年1月の能登半島地震の被災者に対する特別な給付金支給、税制上の特例措置等。",
    proposer: "内閣",
    category: "社会保障",
    status: "ENACTED",
    submittedAt: "2024-02-02",
    passedAt: "2024-02-21",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-22",
    title: "子ども・子育て支援法等の一部を改正する法律案",
    summary:
      "こども未来戦略の実現。児童手当の拡充（所得制限撤廃・高校生まで延長・第3子以降3万円）、こども誰でも通園制度の創設、育児休業給付の充実等。年間3.6兆円規模の少子化対策パッケージ。",
    proposer: "内閣",
    category: "社会保障",
    status: "ENACTED",
    submittedAt: "2024-02-16",
    passedAt: "2024-06-05",
    sourceUrl:
      "https://www.cfa.go.jp/laws/houan/e81845c0",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-24",
    title: "重要経済安保情報の保護及び活用に関する法律案",
    summary:
      "セキュリティ・クリアランス法。重要な経済安全保障情報にアクセスできる者を適性評価によって選別する制度を創設。経済安全保障推進法の補完。",
    proposer: "内閣",
    category: "安全保障",
    status: "ENACTED",
    submittedAt: "2024-02-27",
    passedAt: "2024-05-10",
    sourceUrl:
      "https://www.cas.go.jp/jp/houan/213.html",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-26",
    title: "食料・農業・農村基本法の一部を改正する法律案",
    summary:
      "25年ぶりの農業基本法改正。食料安全保障の強化を法の目的に追加。食料自給率向上、環境と調和のとれた食料システムの確立、スマート農業の推進等。",
    proposer: "内閣",
    category: "農林水産",
    status: "ENACTED",
    submittedAt: "2024-02-27",
    passedAt: "2024-05-29",
    sourceUrl:
      "https://www.maff.go.jp/j/law/bill/213/index.html",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-27",
    title: "食料供給困難事態対策法案",
    summary:
      "食料危機対応法。食料供給が困難になった場合の政府の対策措置を規定。備蓄の放出、輸入の促進、生産転換の指示等。",
    proposer: "内閣",
    category: "農林水産",
    status: "ENACTED",
    submittedAt: "2024-02-27",
    passedAt: "2024-05-29",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-31",
    title: "地方自治法の一部を改正する法律案",
    summary:
      "国の補充的指示権の創設。大規模災害や感染症危機等の非常時に、国が地方自治体に対して必要な指示を行うことができる規定を新設。コロナ禍の教訓を踏まえた対応。",
    proposer: "内閣",
    category: "行政",
    status: "ENACTED",
    submittedAt: "2024-03-01",
    passedAt: "2024-06-19",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-32",
    title: "放送法の一部を改正する法律案",
    summary:
      "改正NHK放送法。NHKのインターネット配信を「必須業務」に格上げ。テレビを持たずスマホのみでNHKを視聴する場合の受信料制度を整備。",
    proposer: "内閣",
    category: "行政",
    status: "ENACTED",
    submittedAt: "2024-03-01",
    passedAt: "2024-05-17",
    sourceUrl:
      "https://www.shugiin.go.jp/internet/itdb_gian.nsf/html/gian/keika/1DDBA96.htm",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-33",
    title: "日本電信電話株式会社等に関する法律の一部を改正する法律案",
    summary:
      "NTT法改正。NTTの研究成果の公開義務の廃止、外国人役員規制の緩和、ユニバーサルサービスの見直し。NTTの国際競争力強化が目的。",
    proposer: "内閣",
    category: "経済",
    status: "ENACTED",
    submittedAt: "2024-03-01",
    passedAt: "2024-04-17",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-38",
    title: "道路交通法の一部を改正する法律案",
    summary:
      "自動運転レベル4に対応した制度整備。特定自動運行の許可制度、自転車の酒酔い運転等に対する罰則強化等。",
    proposer: "内閣",
    category: "行政",
    status: "ENACTED",
    submittedAt: "2024-03-05",
    passedAt: "2024-05-17",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-40",
    title: "デジタル社会の形成を図るための規制改革を推進するためのデジタル社会形成基本法等の一部を改正する法律案",
    summary:
      "アナログ規制見直し第2弾。AI・ドローン等の新技術に対応した規制の合理化。テクノロジーマップの活用推進。",
    proposer: "内閣",
    category: "行政",
    status: "ENACTED",
    submittedAt: "2024-03-05",
    passedAt: "2024-05-24",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-42",
    title: "地球温暖化対策の推進に関する法律の一部を改正する法律案",
    summary:
      "温対法改正。GX推進の一環として、地方自治体の計画策定義務化、再エネ促進区域の設定等。",
    proposer: "内閣",
    category: "環境",
    status: "ENACTED",
    submittedAt: "2024-03-05",
    passedAt: "2024-05-22",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-44",
    title: "公益社団法人及び公益財団法人の認定等に関する法律の一部を改正する法律案",
    summary:
      "公益法人制度改革。財務規律の柔軟化（公益目的事業比率の見直し）、行政手続の簡素化、ガバナンス強化等。",
    proposer: "内閣",
    category: "行政",
    status: "ENACTED",
    submittedAt: "2024-03-15",
    passedAt: "2024-05-31",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-47",
    title: "民法等の一部を改正する法律案",
    summary:
      "共同親権導入。離婚後も父母が共同で親権を行使することを選択できる制度を導入。子の利益を最優先とする規定の整備。77年ぶりの親権制度の大改正。",
    proposer: "内閣",
    category: "司法",
    status: "ENACTED",
    submittedAt: "2024-03-08",
    passedAt: "2024-05-17",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-54",
    title: "育児休業、介護休業等育児又は家族介護を行う労働者の福祉に関する法律及び次世代育成支援対策推進法の一部を改正する法律案",
    summary:
      "改正育児介護休業法。男性育休取得促進のための措置義務、テレワークの努力義務、子の看護休暇の拡充等。次世代法の延長。",
    proposer: "内閣",
    category: "社会保障",
    status: "ENACTED",
    submittedAt: "2024-03-12",
    passedAt: "2024-05-24",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-56",
    title: "金融商品取引法及び投資信託及び投資法人に関する法律の一部を改正する法律案",
    summary:
      "資産運用立国実現のための金商法改正。資産運用業への新規参入の促進、非上場株式の取引活性化、四半期開示の見直し等。",
    proposer: "内閣",
    category: "経済",
    status: "ENACTED",
    submittedAt: "2024-03-15",
    passedAt: "2024-05-22",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-58",
    title: "出入国管理及び難民認定法及び出入国管理及び難民認定法及び日本国との平和条約に基づき日本の国籍を離脱した者等の出入国管理に関する特例法の一部を改正する法律案",
    summary:
      "育成就労制度の創設。技能実習制度を発展的に解消し、外国人材の育成・確保を目的とする新制度を創設。転籍の柔軟化、人権侵害の防止強化。",
    proposer: "内閣",
    category: "社会保障",
    status: "ENACTED",
    submittedAt: "2024-03-15",
    passedAt: "2024-06-14",
    sourceUrl:
      "https://www.moj.go.jp/hisho/kouhou/houan213.html",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-61",
    title: "学校設置者等及び民間教育保育等事業者による児童対象性暴力等の防止等のための措置に関する法律案",
    summary:
      "日本版DBS法。子どもに接する仕事に就く者の性犯罪歴を確認する仕組みを創設。学校・保育所・塾等に確認義務を課す。",
    proposer: "内閣",
    category: "教育",
    status: "ENACTED",
    submittedAt: "2024-03-19",
    passedAt: "2024-06-19",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-62",
    title: "スマートフォンにおいて利用される特定ソフトウェアに係る競争の促進に関する法律案",
    summary:
      "スマホソフトウェア競争促進法。Apple・Googleのアプリストア独占に対応し、サイドローディングの義務化等。日本版デジタル市場法。",
    proposer: "内閣",
    category: "経済",
    status: "ENACTED",
    submittedAt: "2024-04-26",
    passedAt: "2024-06-12",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-53",
    title: "海洋再生可能エネルギー発電設備の整備に係る海域の利用の促進に関する法律の一部を改正する法律案",
    summary:
      "洋上風力促進法改正。一般海域における洋上風力発電の促進区域指定の迅速化、環境影響評価手続きの合理化。",
    proposer: "内閣",
    category: "環境",
    status: "SUBMITTED",
    submittedAt: "2024-03-12",
  },
  // 第213回 議員立法
  {
    sessionNumber: 213,
    number: "213-衆法-16",
    title: "政治資金規正法の一部を改正する法律案",
    summary:
      "改正政治資金規正法。自民党派閥の裏金問題を受けた政治資金の透明化。政治資金パーティー収入の公開基準引下げ（20万円→5万円超）、政策活動費の使途公開（10年後）、国会議員関係政治団体への厳格化。",
    proposer: "自由民主党",
    category: "行政",
    status: "ENACTED",
    submittedAt: "2024-05-31",
    passedAt: "2024-06-19",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-9",
    title: "生活困窮者自立支援法等の一部を改正する法律案",
    summary:
      "生活困窮者の自立支援体制の強化。住居確保給付金の拡充、子どもの学習・生活支援事業の充実等。",
    proposer: "内閣",
    category: "社会保障",
    status: "ENACTED",
    submittedAt: "2024-02-09",
    passedAt: "2024-04-17",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-10",
    title: "雇用保険法等の一部を改正する法律案",
    summary:
      "雇用保険の適用拡大。週所定労働時間10時間以上の者を新たに適用対象に追加。教育訓練給付の充実、育児休業給付の引上げ等。",
    proposer: "内閣",
    category: "社会保障",
    status: "ENACTED",
    submittedAt: "2024-02-09",
    passedAt: "2024-05-10",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-23",
    title: "産業競争力強化法等の一部を改正する法律案",
    summary:
      "半導体・蓄電池等の戦略分野の国内投資促進。大規模投資に対する減税措置（最大10年間・税額控除40%）、中堅企業の成長支援等。",
    proposer: "内閣",
    category: "経済",
    status: "ENACTED",
    submittedAt: "2024-02-27",
    passedAt: "2024-05-22",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-34",
    title: "特定電気通信役務提供者の損害賠償責任の制限及び発信者情報の開示に関する法律の一部を改正する法律案",
    summary:
      "プロバイダ責任制限法改正。SNS等での誹謗中傷対策として、大規模プラットフォーム事業者に対し、投稿の削除等の迅速な対応を義務付け。",
    proposer: "内閣",
    category: "行政",
    status: "ENACTED",
    submittedAt: "2024-03-01",
    passedAt: "2024-05-10",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-35",
    title: "学校教育法の一部を改正する法律案",
    summary:
      "教員の処遇改善。教職調整額の引上げ、教員業務支援員の配置拡充、部活動の地域移行推進等。",
    proposer: "内閣",
    category: "教育",
    status: "ENACTED",
    submittedAt: "2024-03-01",
    passedAt: "2024-05-17",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-51",
    title: "建設業法及び公共工事の入札及び契約の適正化の促進に関する法律の一部を改正する法律案",
    summary:
      "建設業法改正。担い手確保のための労働環境改善、適正な請負代金の確保、ICT活用の推進。",
    proposer: "内閣",
    category: "経済",
    status: "ENACTED",
    submittedAt: "2024-03-08",
    passedAt: "2024-06-07",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-25",
    title: "経済施策を一体的に講ずることによる安全保障の確保の推進に関する法律の一部を改正する法律案",
    summary:
      "経済安全保障推進法改正。特定重要技術の研究開発支援の強化、サプライチェーン調査の迅速化等。",
    proposer: "内閣",
    category: "安全保障",
    status: "ENACTED",
    submittedAt: "2024-02-27",
    passedAt: "2024-04-17",
  },
  {
    sessionNumber: 213,
    number: "213-閣法-30",
    title: "銃砲刀剣類所持等取締法の一部を改正する法律案",
    summary:
      "銃刀法改正。クロスボウ（ボーガン）の所持許可制の導入、模造銃規制の強化、猟銃所持の厳格化。2023年長野事件を受けた対策。",
    proposer: "内閣",
    category: "司法",
    status: "ENACTED",
    submittedAt: "2024-02-27",
    passedAt: "2024-06-05",
  },
  // 議員立法 否決・未了分
  {
    sessionNumber: 213,
    number: "213-衆法-8",
    title: "消費税率の引下げ等に関する法律案",
    summary:
      "消費税率の時限的な5%への引下げ。物価高騰対策としての消費税減税を提案。",
    proposer: "日本維新の会",
    category: "経済",
    status: "REJECTED",
    submittedAt: "2024-03-01",
  },
  {
    sessionNumber: 213,
    number: "213-参法-3",
    title: "選択的夫婦別姓制度を導入する民法の一部を改正する法律案",
    summary:
      "婚姻時に夫婦が各自の氏を称することを選択できる制度の導入。",
    proposer: "立憲民主党",
    category: "司法",
    status: "COMMITTEE",
    submittedAt: "2024-02-14",
  },

  // ============================================================
  // 第214回国会（2024年10月臨時国会）— 石破内閣発足
  // 実質審議なし。首相指名後、10月9日に衆議院解散。
  // ============================================================
  // 第214回は石破内閣不信任決議案が否決された程度で、法案審議は行われていない

  // ============================================================
  // 第215回国会（2024年11月特別国会）— 第50回衆院選後
  // 首相指名（決選投票で石破再指名）のみ。会期4日間。
  // ============================================================
  // 第215回も法案審議は行われていない

  // ============================================================
  // 第216回国会（2024年11-12月臨時国会）— 石破内閣
  // 閣法9本・議員立法7本、計16本成立
  // ============================================================
  {
    sessionNumber: 216,
    number: "216-閣法-1",
    title: "一般職の職員の給与に関する法律等の一部を改正する法律案",
    summary:
      "人事院勧告に基づく国家公務員の給与改定。月例給・ボーナスの引上げ、初任給の大幅引上げ（大卒初任給を民間水準に近づける）。",
    proposer: "内閣",
    category: "行政",
    status: "ENACTED",
    submittedAt: "2024-11-28",
    passedAt: "2024-12-17",
  },
  {
    sessionNumber: 216,
    number: "216-閣法-2",
    title: "特別職の職員の給与に関する法律の一部を改正する法律案",
    summary:
      "内閣総理大臣・国務大臣等の特別職の給与改定。一般職の改定に準じた引上げ。",
    proposer: "内閣",
    category: "行政",
    status: "ENACTED",
    submittedAt: "2024-11-28",
    passedAt: "2024-12-17",
  },
  {
    sessionNumber: 216,
    number: "216-閣法-5",
    title: "防衛省の職員の給与等に関する法律の一部を改正する法律案",
    summary:
      "自衛官等の給与改定。一般職国家公務員の給与改定に準じた処遇改善。",
    proposer: "内閣",
    category: "安全保障",
    status: "ENACTED",
    submittedAt: "2024-11-28",
    passedAt: "2024-12-17",
  },
  {
    sessionNumber: 216,
    number: "216-閣法-7",
    title: "情報通信技術を活用した行政の推進等に関する法律の一部を改正する法律案",
    summary:
      "行政手続のデジタル化推進。マイナンバーカードを活用した行政手続のオンライン化促進等。",
    proposer: "内閣",
    category: "行政",
    status: "ENACTED",
    submittedAt: "2024-11-28",
    passedAt: "2024-12-20",
  },
  {
    sessionNumber: 216,
    number: "216-閣法-8",
    title: "地方交付税法及び特別会計に関する法律の一部を改正する法律案",
    summary:
      "地方交付税の追加交付。令和6年度補正予算に伴う地方財政措置。",
    proposer: "内閣",
    category: "経済",
    status: "ENACTED",
    submittedAt: "2024-12-09",
    passedAt: "2024-12-21",
  },
  // 第216回 議員立法（政治改革関連）
  {
    sessionNumber: 216,
    number: "216-衆法-1",
    title: "政治資金規正法の一部を改正する法律案（政策活動費廃止）",
    summary:
      "政策活動費の廃止。政党から議員個人に支給される政策活動費（旧称：組織活動費）を全面的に廃止。自民党裏金問題を受けた政治改革の柱。",
    proposer: "自由民主党・立憲民主党・日本維新の会・国民民主党",
    category: "行政",
    status: "ENACTED",
    submittedAt: "2024-12-09",
    passedAt: "2024-12-19",
  },
  {
    sessionNumber: 216,
    number: "216-衆法-2",
    title: "政治資金規正法の一部を改正する法律案（外国人パーティー券購入禁止・デジタル化）",
    summary:
      "外国人による政治資金パーティー券購入の禁止。収支報告書のデータベース化・オンライン検索システムの整備。政治資金の透明性向上。",
    proposer: "自由民主党・立憲民主党・日本維新の会",
    category: "行政",
    status: "ENACTED",
    submittedAt: "2024-12-09",
    passedAt: "2024-12-19",
  },
  {
    sessionNumber: 216,
    number: "216-衆法-3",
    title: "政治資金監視委員会設置法案",
    summary:
      "国会に独立性の高い「政治資金監視委員会」を設置し、政治資金の監視・検査機能を強化。",
    proposer: "自由民主党・立憲民主党・日本維新の会",
    category: "行政",
    status: "ENACTED",
    submittedAt: "2024-12-09",
    passedAt: "2024-12-19",
  },
  {
    sessionNumber: 216,
    number: "216-衆法-4",
    title: "国会議員の歳費、旅費及び手当等に関する法律の一部を改正する法律案（調査研究広報滞在費の使途公開）",
    summary:
      "旧文書通信交通滞在費（現・調査研究広報滞在費）の使途公開義務化。月額100万円の使途を領収書付きで公開。",
    proposer: "自由民主党・立憲民主党・日本維新の会",
    category: "行政",
    status: "ENACTED",
    submittedAt: "2024-12-09",
    passedAt: "2024-12-19",
  },
];

// ============================================
// シード実行
// ============================================

async function seedSessions() {
  console.log("=== 国会会期データの投入 ===");

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
      console.log(`  更新: 第${session.number}回国会（${session.type}）`);
    } else {
      await prisma.dietSession.create({
        data: {
          number: session.number,
          type: session.type,
          startDate: new Date(session.startDate),
          endDate: new Date(session.endDate),
        },
      });
      console.log(`  作成: 第${session.number}回国会（${session.type}）`);
    }
  }

  console.log(`  合計: ${SESSIONS.length}会期\n`);
}

async function seedBills() {
  console.log("=== 法案データの投入 ===");

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const bill of REAL_BILLS) {
    const session = await prisma.dietSession.findFirst({
      where: { number: bill.sessionNumber },
    });

    if (!session) {
      console.warn(
        `  スキップ: 第${bill.sessionNumber}回国会が見つかりません — ${bill.number} ${bill.title}`,
      );
      skipped++;
      continue;
    }

    const existing = await prisma.bill.findFirst({
      where: { number: bill.number, sessionId: session.id },
    });

    const data = {
      sessionId: session.id,
      number: bill.number,
      title: bill.title,
      summary: bill.summary,
      proposer: bill.proposer,
      category: bill.category,
      status: bill.status,
      submittedAt: new Date(bill.submittedAt),
      passedAt: bill.passedAt ? new Date(bill.passedAt) : null,
      sourceUrl: bill.sourceUrl ?? null,
    };

    if (existing) {
      await prisma.bill.update({
        where: { id: existing.id },
        data,
      });
      updated++;
    } else {
      await prisma.bill.create({ data });
      created++;
    }
  }

  console.log(`  作成: ${created}件`);
  console.log(`  更新: ${updated}件`);
  if (skipped > 0) {
    console.log(`  スキップ: ${skipped}件`);
  }
  console.log(`  合計: ${REAL_BILLS.length}件の法案データ\n`);
}

async function printStats() {
  console.log("=== 投入結果の統計 ===");

  const sessionCount = await prisma.dietSession.count();
  const billCount = await prisma.bill.count();

  const statusCounts = await prisma.bill.groupBy({
    by: ["status"],
    _count: { status: true },
  });

  const categoryCounts = await prisma.bill.groupBy({
    by: ["category"],
    _count: { category: true },
    orderBy: { _count: { category: "desc" } },
  });

  console.log(`  会期数: ${sessionCount}`);
  console.log(`  法案数: ${billCount}`);
  console.log("\n  ステータス別:");
  for (const s of statusCounts) {
    console.log(`    ${s.status}: ${s._count.status}件`);
  }
  console.log("\n  カテゴリ別:");
  for (const c of categoryCounts) {
    console.log(`    ${c.category ?? "未分類"}: ${c._count.category}件`);
  }
}

async function main() {
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║  実データシード: 国会法案データ (第211回〜第216回)  ║");
  console.log("╚══════════════════════════════════════════════════╝\n");

  try {
    await seedSessions();
    await seedBills();
    await printStats();

    console.log("\n✓ シードが正常に完了しました。");
  } catch (error) {
    console.error("\n✗ シード実行中にエラーが発生しました:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
