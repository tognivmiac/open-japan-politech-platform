# チーム未来（Team Mirai）GitHub 徹底分析レポート

**調査日**: 2026年2月12日
**調査対象**: GitHub Organization `team-mirai` および `team-mirai-volunteer`

---

## 1. 組織概要

### 1.1 チームみらい（team-mirai）
- **GitHub**: https://github.com/team-mirai
- **ウェブサイト**: https://team-mir.ai
- **連絡先**: dev@team-mir.ai
- **フォロワー**: 755人
- **リポジトリ数**: 8（うち1つアーカイブ済、1つフォーク）
- **性格**: 公式の開発チームによるコアプロダクト群

### 1.2 チームみらいサポーター（team-mirai-volunteer）
- **GitHub**: https://github.com/team-mirai-volunteer
- **説明**: 「チームみらいのサポーターが開発結果を共有するための場」
- **フォロワー**: 317人
- **リポジトリ数**: 30（うち1つアーカイブ済）
- **性格**: ボランティア・サポーターによるコミュニティ開発プロジェクト群

---

## 2. team-mirai（公式）リポジトリ詳細

### 2.1 marumie（まるみえ）- 政治資金透明化プラットフォーム
| 項目 | 内容 |
|------|------|
| **URL** | https://github.com/team-mirai/marumie |
| **本番URL** | https://marumie.team-mir.ai/ |
| **説明** | 政治資金の流れを透明性を持って公開するプラットフォーム |
| **Stars** | 666 |
| **Forks** | 74 |
| **コミット数** | 2,309 |
| **言語** | TypeScript (98.5%) |
| **ライセンス** | AGPL-3.0 |

**技術スタック**:
- **フロントエンド**: Next.js 15, React 19, TypeScript, Tailwind CSS v4
- **バックエンド**: Prisma ORM, Supabase
- **データベース**: PostgreSQL（Supabase経由）
- **可視化**: Recharts, ApexCharts, Nivo
- **ツール**: pnpm, Biome, Jest

**ディレクトリ構造**:
```
marumie/
├── webapp/          # ユーザー向けフロントエンド（政治資金の可視化）
├── admin/           # 管理ダッシュボード
├── shared/          # 共通モデル・型・ユーティリティ
├── data/            # サンプルデータセット
├── supabase/        # ローカル開発環境設定
├── prisma/          # データベーススキーマ・マイグレーション
└── docs/            # 設計ドキュメント
```

**機能・目的**: クラウド会計ソフトからのデータを可視化し、政治家や政治団体が会計データを公開共有できるダッシュボード。国民が政治資金の流れを容易に理解できるようにする。政治資金報告書作成も支援。Bounded Contextパターンを採用したサーバーサイド設計。

---

### 2.2 policy - オープンマニフェスト
| 項目 | 内容 |
|------|------|
| **URL** | https://github.com/team-mirai/policy |
| **本番URL** | https://policy.team-mir.ai/ |
| **状態** | アーカイブ済（2025年7月26日） |
| **Stars** | 396 |
| **Forks** | 77 |
| **コミット数** | 765 |
| **コントリビューター** | 31人 |
| **PR数** | 5,000件以上 |
| **ライセンス** | CC-BY-4.0 |

**技術スタック**:
- TypeScript (100%)
- GitHub Actions（リンク検証、PR通知）
- Idobata（AI熟議プラットフォーム）連携
- X/Twitter API連携（マージされたPRの自動投稿）

**ディレクトリ構造**:
```
policy/
├── .github/          # GitHub設定
├── .meta/            # メタデータ
├── .tools/           # ツール
├── 01_チームみらいのビジョン.md
├── 02_政策インデックス.md
├── 10-18_ステップ１*.md    # 教育、子育て、行政、産業、科学技術、デジタル民主主義、医療、福祉
├── 20-25_ステップ２*.md
├── 30-38_ステップ３*.md
├── 40_国政政党成立後100日プラン.md
├── 50_国政のその他重要分野.md
├── 60_改善提案の反映方針.md
├── 70_本マニフェスト掲載の政策に関する財政支出.md
└── LICENSE / README.md
```

**機能・目的**: 政策マニフェストをGitHubのPRワークフローで市民参加型に策定。5,000件以上のPRが市民から寄せられた。Idobata（AI熟議システム）とGitHub PRの2つの提案経路を提供。2025年参院選終了に伴いアーカイブ。

---

### 2.3 mirai-gikai（みらい議会）
| 項目 | 内容 |
|------|------|
| **URL** | https://github.com/team-mirai/mirai-gikai |
| **本番URL** | https://gikai.team-mir.ai/ |
| **Stars** | 187 |
| **Forks** | 18 |
| **コミット数** | 321 |
| **言語** | TypeScript (98.2%) |
| **ライセンス** | AGPL-3.0 |

**技術スタック**:
- **フロントエンド**: Next.js（App Router想定）, TypeScript
- **バックエンド**: Supabase
- **ツール**: pnpm, Biome, CodeRabbit（AIコードレビュー）
- **AI統合**: Claude, Gemini（CLAUDE.md, GEMINI.md, AGENTS.md を保有）

**ディレクトリ構造**:
```
mirai-gikai/
├── .claude/              # Claude AI設定
├── .github/              # GitHub Workflows
├── admin/                # 管理パネル
├── docs/                 # ドキュメント
├── packages/             # 共有パッケージ
├── supabase/             # DBマイグレーション・設定
├── web/                  # フロントエンドアプリ
├── AGENTS.md / CLAUDE.md / GEMINI.md
├── CLA.md
├── biome.json
├── pnpm-workspace.yaml
└── package.json
```

**機能・目的**: オンライン議会プラットフォーム。モノレポ構造（pnpm workspace）で管理画面と公開Web画面を分離。AIエージェント（Claude、Gemini）との統合を前提とした設計が特徴的。Supabaseベースの認証・DB。

---

### 2.4 kouchou-ai（広聴AI）
| 項目 | 内容 |
|------|------|
| **URL** | https://github.com/team-mirai/kouchou-ai |
| **説明** | 広聴AI（デジタル民主主義2030ブロードリスニング） |
| **Stars** | 20 |
| **Forks** | 57 |
| **言語** | TypeScript |
| **ライセンス** | AGPL-3.0 |
| **元プロジェクト** | AI Objectives Institute「Talk to the City」のフォーク |

**技術スタック**:
- **バックエンド**: Python + FastAPI（ポート8000）
- **フロントエンド**: Next.js + TypeScript（レポート閲覧: ポート3000、管理画面: ポート4000）
- **インフラ**: Docker（全サービスコンテナ化）
- **LLM**: OpenAI API（必須）、Ollama（オプション、ローカルLLM）
- **静的エクスポート**: GitHub Pages対応

**ディレクトリ構造**:
```
kouchou-ai/
├── server/              # FastAPIバックエンド
├── client/              # Next.jsレポートビューア
├── client-admin/        # Next.js管理画面
├── client-static-build/ # 静的ビルド出力
├── utils/               # ダミーサーバー（開発用）
├── docs/                # セットアップガイド
├── scripts/
├── test/e2e/
└── compose.yaml         # Docker Compose
```

**機能・目的**: CSV形式の市民意見を一括アップロードし、AIがクラスタリング・分析してレポートを生成する「ブロードリスニング」ツール。クラスタサイズは∛n（コメント数の立方根）で自動算出。GPU搭載マシンではOllamaによるローカルLLM実行も可能。

---

### 2.5 manifesto-body（マニフェスト本文）
| 項目 | 内容 |
|------|------|
| **URL** | https://github.com/team-mirai/manifesto-body |
| **Stars** | 13 |
| **Forks** | 2 |
| **コミット数** | 99 |
| **コントリビューター** | 9人 |
| **作成日** | 2026年1月19日 |
| **ブランチ** | shugiin-2026 |

**内容**: 衆院選2026のマニフェスト各政策のMarkdownファイル群。教育、子育て、科学技術、産業、エネルギー、経済財政、医療、社会福祉、日常生活・行政、デジタル民主主義など11分野の政策文書。GitHub Actionsによる自動化あり。policyリポジトリの後継的位置づけ。

---

### 2.6 その他の公式リポジトリ

| リポジトリ | 言語 | Stars | 説明 |
|-----------|------|-------|------|
| **random** | Python (94%) | 8 | 雑多な小プロジェクト共有用。PR分析ツール（データ収集・マージ・分類）を含む |
| **policy-pr-data** | Python | 2 | policyリポジトリのPRデータをJSON形式で保存・分析するデータストア |
| **get_events_from_notion_db** | Python | 1 | Notionデータベースからイベント情報を取得する定期バッチジョブ |

---

## 3. team-mirai-volunteer（サポーター）リポジトリ詳細

### 3.1 主要プロジェクト

#### fact-checker - AIファクトチェッカー
| 項目 | 内容 |
|------|------|
| **URL** | https://github.com/team-mirai-volunteer/fact-checker |
| **Stars** | 92 |
| **Forks** | 16 |
| **言語** | TypeScript (97%) |
| **ライセンス** | AGPL-3.0 |

**技術スタック**: Bun（ランタイム）, Hono（Webフレームワーク）, OpenAI API, Dify, X/Twitter API, Slack API, Terraform, Docker, GCP

**機能**: X（Twitter）上の投稿をリアルタイム監視し、政治的デマ情報をAIでファクトチェック。検出時にSlackへ自動通知。CLIツールとWeb APIの二重インターフェース。Google Cloud Schedulerによる定期実行対応。

---

#### action-board - アクションボード
| 項目 | 内容 |
|------|------|
| **URL** | https://github.com/team-mirai-volunteer/action-board |
| **Stars** | 81 |
| **Forks** | 85 |
| **言語** | TypeScript |
| **ライセンス** | AGPL-3.0 |

**技術スタック**: Next.js, React, TypeScript, Tailwind CSS, Supabase（PostgreSQL + RLS）, Playwright, Jest, Terraform, Google Cloud Build, Vercel, Sentry, HubSpot API, pnpm, Biome

**ディレクトリ構造**:
```
action-board/
├── src/               # メインアプリケーション
├── supabase/          # DBマイグレーション・RLSポリシー
├── tests/             # E2E・ユニットテスト
├── mission_data/      # ミッション・アクティビティデータ
├── posting_data/      # 投稿コンテンツ
├── mobile_flutter/    # Flutterモバイルアプリ
├── public/            # 静的アセット
├── docs/              # ドキュメント
├── terraform/         # インフラコード
└── scripts/           # ユーティリティスクリプト
```

**機能**: 政治活動への参加をゲーミフィケーション化したプラットフォーム。ミッション/アクティビティシステム、ユーザー認証とRBACメ、Row-Level Security、HubSpot CRM連携、モバイル対応（Flutter）。テスト体制が充実（ユニット、E2E、RLSテスト）。

---

#### polister - 選挙ポスター掲示板マップ
| 項目 | 内容 |
|------|------|
| **URL** | https://github.com/team-mirai-volunteer/polister |
| **Stars** | 5 |
| **Forks** | 2 |
| **言語** | TypeScript |
| **ライセンス** | AGPL-3.0 |

**技術スタック**: Next.js 15（App Router）, React 19, Material UI, Mapbox GL JS, PostgreSQL + PostGIS, Redis, Jest, ESLint, Prettier, Docusaurus 3

**アーキテクチャ**: Clean Architecture + DDD（Domain-Driven Design）。`features/`ディレクトリ内にBounded Contextを実装。各機能は domain/, application/, infrastructure/, ui/ のレイヤーに分離。

**機能**: 選挙ポスター掲示板の位置をデジタル化しオープンデータとして公開。地図上でインタラクティブに表示・検索。地域ベースの検証システム、信頼レベルに基づくデータ品質管理、一括インポート（CSV/Excel/KML）対応。

---

### 3.2 データ分析・可視化系プロジェクト

| リポジトリ | Stars | 言語 | 説明 |
|-----------|-------|------|------|
| **gov-vis** | 7 | Python | RSシステム（行政事業レビュー）データの処理・分析。5,664事業、146.6兆円規模の予算データを分析。AIプロジェクト特定機能も搭載 |
| **rs-vis** | 1 | TypeScript | 政府予算のサンキーダイアグラム可視化。Next.js 15 + @nivo/sankey。15,111事業・25,892支出先のインタラクティブ表示 |
| **poster-map** | 9 | Python/JS | 選挙ポスター掲示板の地図表示。Next.js + Leaflet + Google Spreadsheet連携。Netlifyデプロイ |
| **policy-pr-hub** | 2 | TypeScript | Idobata経由の1,700件以上の政策改善提案を分析。Next.js 15 + Plotly.js + OpenRouter API |

### 3.3 メディア・コンテンツ系プロジェクト

| リポジトリ | Stars | 言語 | 説明 |
|-----------|-------|------|------|
| **video-processor** | 3 | TypeScript | 動画処理ツール |
| **manifesto-notify-bot** | 3 | TypeScript | マニフェスト更新通知Bot（AGPL-3.0） |
| **post-checker** | 2 | TypeScript | SNS投稿・動画スクリプトのチェックシステム |
| **shortmovie-draft-generator** | 1 | Python | ショート動画のドラフト生成 |
| **shortmovie-draft-generator2** | 1 | Python | ショート動画ドラフト生成（v2） |
| **youtube** | 1 | Python | YouTube関連ツール |

### 3.4 インフラ・ユーティリティ系

| リポジトリ | Stars | 言語 | 説明 |
|-----------|-------|------|------|
| **kokkai-join** | 3 | TypeScript | みらい議会のディープリサーチAPI。Hono + React + Supabase + pgvector |
| **community-manager-bot** | 0 | - | Slackコミュニティ管理Bot（AGPL-3.0） |
| **upptime** | 0 | Markdown | サービス稼働監視（Upptime） |
| **github-activity-reporter** | 1 | Python | GitHub活動レポート生成 |
| **devin-stat** | 1 | Python | Devin AI統計 |
| **oss-statistics** | 1 | Python | OSS統計情報 |
| **tiktok-data-tracker** | 1 | Python | TikTokメトリクス追跡 |
| **ai-search** | 1 | CSS | AI検索ツール |
| **knowledge** | 1 | - | ナレッジリポジトリ（MIT） |
| **engineering-hub** | 0 | - | 開発コーディネーションハブ |
| **project_template** | 1 | - | 新規プロジェクトテンプレート（MIT） |

---

## 4. 技術スタック総括

### 4.1 主要技術の採用状況

| カテゴリ | 技術 | 採用プロジェクト数 |
|---------|------|-------------------|
| **言語** | TypeScript | 大多数（公式全て＋ボランティア主要プロジェクト） |
| **言語** | Python | データ分析系（gov-vis, poster-map, random等） |
| **フレームワーク** | Next.js | marumie, action-board, polister, rs-vis, policy-pr-hub, kouchou-ai |
| **バックエンド** | Supabase | marumie, mirai-gikai, action-board, kokkai-join |
| **バックエンド** | Hono | fact-checker, kokkai-join |
| **バックエンド** | FastAPI | kouchou-ai |
| **ORM** | Prisma | marumie |
| **DB** | PostgreSQL | 全Supabaseプロジェクト |
| **DB拡張** | PostGIS | polister |
| **DB拡張** | pgvector | kokkai-join |
| **スタイリング** | Tailwind CSS | marumie, action-board, rs-vis |
| **パッケージマネージャー** | pnpm | marumie, mirai-gikai, action-board |
| **パッケージマネージャー** | Bun | fact-checker, kokkai-join（一部） |
| **コード品質** | Biome | marumie, mirai-gikai, action-board |
| **テスト** | Jest | marumie, action-board, polister |
| **テスト** | Playwright | action-board |
| **IaC** | Terraform | fact-checker, action-board |
| **デプロイ** | GCP (Cloud Run/Build) | fact-checker, action-board |
| **デプロイ** | Vercel | action-board, policy-pr-hub |
| **デプロイ** | Netlify | poster-map |
| **デプロイ** | Docker | kouchou-ai, fact-checker |
| **AI** | OpenAI API | kouchou-ai, fact-checker |
| **AI** | Claude/Gemini | mirai-gikai（エージェント統合） |
| **AI** | OpenRouter API | policy-pr-hub, random |
| **コードレビュー** | CodeRabbit | mirai-gikai, polister |
| **地図** | Mapbox GL JS | polister |
| **地図** | Leaflet | poster-map |
| **CRM** | HubSpot | action-board |

### 4.2 共通の設計パターン

1. **モノレポ構造**: marumie、mirai-gikai、action-boardはwebapp/admin/shared（またはweb/admin/packages）の分離型モノレポ
2. **Supabase中心**: 認証、データベース、Row-Level Securityを一元管理
3. **CLA必須**: 全プロジェクトでContributor License Agreementを要求
4. **AGPL-3.0ライセンス**: 大半のプロジェクトがAGPL-3.0を採用（コード公開を強制）
5. **AIコードレビュー**: CodeRabbit、Claude、Geminiの積極活用
6. **Biome統一**: ESLint/Prettierの代わりにBiomeを採用するプロジェクトが増加

---

## 5. サービスアーキテクチャ推測

### 5.1 全体像

```
┌─────────────────────────────────────────────────────────┐
│                    team-mir.ai (メインサイト)              │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  policy/      │  │  marumie/    │  │ mirai-gikai/ │  │
│  │  manifesto-   │  │  (まるみえ)   │  │ (みらい議会)  │  │
│  │  body         │  │              │  │              │  │
│  │              │  │  政治資金      │  │  オンライン   │  │
│  │  マニフェスト  │  │  透明化       │  │  議会         │  │
│  │  策定         │  │  ダッシュボード│  │              │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                 │                  │          │
│  ┌──────┴─────────────────┴──────────────────┴───────┐  │
│  │              Supabase (PostgreSQL + Auth)           │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ kouchou-ai   │  │ action-board │  │ fact-checker  │  │
│  │              │  │              │  │              │  │
│  │ ブロード     │  │ 市民参加     │  │ X投稿の      │  │
│  │ リスニング   │  │ ゲーミフィケ │  │ ファクト     │  │
│  │ (AI分析)     │  │ ーション     │  │ チェック     │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                 │                  │          │
│  ┌──────┴──┐  ┌──────────┴────┐  ┌──────────┴────┐    │
│  │ OpenAI  │  │ HubSpot CRM  │  │ X/Twitter API │    │
│  │ API     │  │ Supabase     │  │ Slack API     │    │
│  │ Ollama  │  │ GCP          │  │ OpenAI API    │    │
│  └─────────┘  └──────────────┘  └───────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │         データ分析・可視化レイヤー                    │  │
│  │  gov-vis / rs-vis / policy-pr-hub / policy-pr-data │  │
│  │  poster-map / polister                             │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │         コンテンツ・メディアレイヤー                  │  │
│  │  video-processor / shortmovie-draft-generator      │  │
│  │  manifesto-notify-bot / post-checker / youtube     │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │         運用・監視レイヤー                           │  │
│  │  upptime / community-manager-bot                   │  │
│  │  github-activity-reporter / devin-stat             │  │
│  └────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 5.2 アーキテクチャの特徴

1. **Supabase統一基盤**: 主要3サービス（marumie、mirai-gikai、action-board）がSupabaseを共通基盤として採用。認証・DB・RLSを統一管理。
2. **Next.js + TypeScript標準化**: フロントエンドはほぼ全てNext.js。React 19 + App Routerの最新構成。
3. **マルチクラウド展開**: GCP（Cloud Run/Build）、Vercel、Netlify、Dockerを案件に応じて使い分け。
4. **AI活用の多層化**:
   - プロダクト内AI: OpenAI API（kouchou-ai, fact-checker）、OpenRouter（policy-pr-hub）
   - 開発支援AI: Claude/Gemini（mirai-gikai）、CodeRabbit、Devin
5. **データパイプライン**: Python（pandas, polars）によるデータ処理 → TypeScript/Next.jsによる可視化の二段階構成

---

## 6. 改善可能ポイント

### 6.1 アーキテクチャ・設計面

| # | 課題 | 詳細 | 提案 |
|---|------|------|------|
| 1 | **Supabaseインスタンスの分散** | 各プロジェクトが独自にSupabaseを立ち上げている模様。共有認証基盤が不在 | 共通認証サービス（SSO）の導入。Supabase Auth + JWTの共有レイヤー構築 |
| 2 | **モノレポ vs マルチレポの不統一** | 一部はモノレポ（marumie, mirai-gikai）、一部は単体リポ | 全体的なモノレポ戦略の検討。少なくともshared packagesの統合 |
| 3 | **バックエンド技術の分散** | Supabase直接、Hono、FastAPI、Next.js API Routesが混在 | バックエンドフレームワークの標準化。HonoまたはNext.js API Routesに統一 |
| 4 | **デプロイ先の分散** | GCP、Vercel、Netlify、Docker自前が混在 | デプロイ先の標準化。GCP or Vercelのどちらかに集約 |

### 6.2 コード品質・開発体験面

| # | 課題 | 詳細 | 提案 |
|---|------|------|------|
| 5 | **テスト体制の格差** | action-boardは充実（Jest + Playwright + RLS）だが、他プロジェクトはJestのみまたはテストなし | テスト戦略の標準化。最低限のユニットテストとE2Eテストの必須化 |
| 6 | **パッケージマネージャーの不統一** | pnpm、Bun、npm、yarnが混在 | pnpmへの統一（大多数が既に使用） |
| 7 | **コード品質ツールの不統一** | Biome、ESLint + Prettier、なし が混在 | Biomeへの統一と共通設定ファイルの配布 |
| 8 | **型共有の不足** | 各プロジェクトが独自にSupabase型を生成 | 共有型パッケージ（@team-mirai/types）の作成 |

### 6.3 セキュリティ面

| # | 課題 | 詳細 | 提案 |
|---|------|------|------|
| 9 | **デフォルトクレデンシャルの公開** | 複数のREADMEにadmin@example.com / admin123456が記載 | 開発用シードデータとしては問題ないが、本番環境との明確な分離を文書化 |
| 10 | **CLA管理の一元化不足** | 各リポジトリに個別のCLA.mdが存在 | CLA管理の一元化（CLA Assistant等のBot活用） |
| 11 | **APIキー管理** | 各プロジェクトが個別に.env管理 | シークレット管理の統合（GCP Secret Manager等） |

### 6.4 ドキュメント・コミュニティ面

| # | 課題 | 詳細 | 提案 |
|---|------|------|------|
| 12 | **プロジェクト間の関係性が不明瞭** | 38リポジトリの全体像を把握する手段がない | Organization READMEまたはドキュメントサイトでプロジェクト一覧と関係図を公開 |
| 13 | **ボランティアリポの品質格差** | 一部は充実（action-board）、一部は最小限（video-processor） | 品質基準の策定と定期レビュー |
| 14 | **アーカイブ戦略の不明瞭さ** | policyはアーカイブ済だが後継のmanifesto-bodyとの関係が不明瞭 | プロジェクトのライフサイクル管理方針の明文化 |

### 6.5 プロダクト面

| # | 課題 | 詳細 | 提案 |
|---|------|------|------|
| 15 | **ユーザー体験の断片化** | 各サービスが独立したドメイン・UIで提供 | 統合ポータルの構築。シングルサインオンで全サービスにアクセス |
| 16 | **モバイル対応の不完全さ** | action-boardにFlutter版があるが他サービスはレスポンシブのみ | PWA化による統一的なモバイル体験の提供 |
| 17 | **可視化ツールの重複** | gov-vis（Python）とrs-vis（TypeScript）が類似機能 | プロジェクトの統合またはデータパイプラインの共有 |
| 18 | **政策データのAPI化** | policy/manifesto-bodyのMarkdownデータがAPI経由で利用できない | 政策データAPI（REST/GraphQL）の構築。他プロジェクトからの参照を容易に |

---

## 7. 統計サマリー

| 指標 | team-mirai | team-mirai-volunteer | 合計 |
|------|-----------|---------------------|------|
| リポジトリ数 | 8 | 30 | 38 |
| 総Stars | 1,292 | 約220 | 約1,512 |
| 総コミット数（主要） | 約4,400 | 不明（多数） | - |
| 主要言語 | TypeScript, Python | TypeScript, Python | TypeScript, Python |
| ライセンス | AGPL-3.0, CC-BY-4.0 | AGPL-3.0, MIT, GPL-3.0 | 混合 |

---

## 8. 注目すべき取り組み

1. **GitHubを政治プロセスに直接組み込んだ先駆的事例**: policyリポジトリで5,000件以上の市民からのPRを受け付け、CC-BY-4.0で公開。政策策定のオープンソース化。
2. **AI統合の先進性**: Claude/Geminiのエージェント統合（AGENTS.md）、CodeRabbitによるAIコードレビュー、Devin AIによる開発支援など、AIファーストな開発体制。
3. **政治資金の完全透明化**: marumie（まるみえ）による会計データのリアルタイム公開は、政治資金報告の新しいスタンダードを提示。
4. **ブロードリスニング**: kouchou-aiによるAI活用の市民意見収集・分析は、デジタル民主主義の実践例として注目。
5. **ファクトチェックの自動化**: X上のデマ情報をAIでリアルタイム検出するfact-checkerは、情報空間の健全性維持に貢献。
6. **Clean Architecture + DDDの導入**: polisterプロジェクトでの本格的なドメイン駆動設計は、政治系OSSとしては異例の設計品質。

---

## 9. 結論

チーム未来のGitHubエコシステムは、日本の政党としては極めて先進的なデジタル戦略を体現している。38リポジトリにわたるOSS群は、政策策定（policy/manifesto-body）、政治資金透明化（marumie）、市民参加（action-board）、AI活用（kouchou-ai, fact-checker）、データ可視化（gov-vis, rs-vis）という多層的なデジタル民主主義基盤を形成している。

技術的にはNext.js + TypeScript + Supabaseを軸とした比較的統一感のあるスタックだが、プロジェクト間の連携不足やツール・デプロイ先の分散が課題。38リポジトリを統合的に管理するガバナンスフレームワークの強化が、今後のスケーリングに向けた鍵となるだろう。

特に参考になるのは、**GitHubのPRワークフローを政策策定に転用した試み**と、**政治資金のリアルタイム公開プラットフォーム**の2点であり、これらはデジタル民主主義の他のプロジェクトにとっても重要な先行事例となる。
