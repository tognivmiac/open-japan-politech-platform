# 類似のオープンソース政治参加ツール調査レポート

**調査日**: 2026-02-12
**対象**: 世界のオープンソース政治参加・CivicTechプラットフォーム

---

## 1. 主要OSSプラットフォーム一覧

### 1.1 Decidim（デシディム）

| 項目 | 内容 |
|------|------|
| URL | https://decidim.org/ |
| GitHub | https://github.com/decidim/decidim |
| 言語 | Ruby on Rails |
| ライセンス | AGPL-3.0 |
| 発祥 | バルセロナ市（2016年） |
| 導入実績 | 80以上の地方・中央政府、40以上の市民団体（スペイン中心） |
| 多言語対応 | 30言語以上 |

**機能**:
- 参加型プロセス（参加型予算、パブリックコメント等）
- アセンブリ（議会・委員会の運営）
- 市民イニシアチブ（住民発議）
- コンサルテーション（住民投票・アンケート）
- 提案・修正案・投票
- 対面ミーティングの管理・記録
- アカウンタビリティ（政策実施の追跡）

**特徴**:
- モジュラー設計で機能の追加・カスタマイズが容易
- Metadecidimコミュニティによるオープンガバナンス
- 透明性・トレーサビリティ・情報の完全性を保証
- Code for Japanがコロナ時代に日本向けに紹介・導入支援

---

### 1.2 Consul Democracy

| 項目 | 内容 |
|------|------|
| URL | https://consuldemocracy.org/ |
| GitHub | https://github.com/consuldemocracy/consuldemocracy |
| 言語 | Ruby on Rails |
| ライセンス | AGPL-3.0 |
| 発祥 | マドリード市（スペイン） |
| 導入実績 | 約250の自治体・政府機関 |

**機能**:
- 市民討論（政府が提出した重要課題についてのコンサルテーション）
- 参加型予算（市民がプロジェクトを提案・選定・投票）
- 市民提案（オープンな議論空間）
- 共同立法（法案の共同起草）
- 投票（電子投票）

**新機能（2025-2027開発中）**:
- LLM搭載のオープンソースCivic Assistant
  - 音声入力対応
  - リアルタイム翻訳
  - AI生成の提案

**特徴**:
- モジュラー・カスタマイズ・スケーラブル
- ベンダーロックインなし
- 全意思決定ステップの透明な記録

---

### 1.3 Pol.is（ポリス）

| 項目 | 内容 |
|------|------|
| URL | https://pol.is/ |
| GitHub | https://github.com/compdemocracy/polis |
| 言語 | JavaScript |
| ライセンス | AGPL-3.0 |
| 開発元 | The Computational Democracy Project |
| 利用国 | 台湾、アメリカ、カナダ、シンガポール、フィリピン、フィンランド、スペイン等 |

**機能**:
- 短文意見投稿（140文字以内）
- 賛成/反対/パスの投票
- 機械学習による意見クラスタリング
- 合意領域の自動検出・可視化
- 匿名参加（個人攻撃防止のため直接返信不可）

**特徴**:
- エンゲージメント最大化ではなく合意形成に最適化
- vTaiwanの中核技術として台湾の法制定に貢献
- 大規模オープンエンドフィードバック向けAI

---

### 1.4 Talk to the City（T3C）

| 項目 | 内容 |
|------|------|
| URL | https://talktothe.city/ |
| GitHub | AI Objectives Instituteにて公開 |
| ライセンス | OSS |
| 開発元 | AI Objectives Institute（カリフォルニア、故Peter Eckersley設立） |

**機能**:
- LLMを活用した大規模熟議の分析・可視化
- 定性データの集約と類似意見のクラスタリング
- ブロードリスニング（多数の声の集約・構造化）

**特徴**:
- チームみらいの「広聴AI」のベース技術
- 台湾デジタル省（moda）でAI政策討論に使用
- 2023年にオープンソース化

---

### 1.5 DemocracyOS

| 項目 | 内容 |
|------|------|
| 言語 | Node.js |
| ライセンス | OSS |
| 発祥 | アルゼンチン |

**機能**:
- オンライン討論（議会・集団意思決定機関向け）
- 市民提案
- 討論プラットフォーム（良い議論を報酬、無関係コンテンツをフィルタリング）

**導入実績**:
- チュニジア（憲法討論）
- メキシコ連邦政府（オープンガバメント政策）
- ケニア（最年少議員が選挙区市民に相談）
- ブエノスアイレス議会（デジタル民主主義の最初の実践）

**特徴**:
- 大規模グループ向け設計
- 議会・立法プロセスに最適化

---

### 1.6 Loomio（ルーミオ）

| 項目 | 内容 |
|------|------|
| URL | https://www.loomio.com/ |
| 言語 | Ruby on Rails + Vue.js |
| ライセンス | AGPL-3.0 |
| 発祥 | ウェリントン（ニュージーランド） |

**機能**:
- グループディスカッション
- 柔軟な合意形成プロセス（多数決ではない）
- 提案に対する賛成・反対・保留・棄権の表明
- 合意に基づく明確なアウトカム生成

**導入実績**:
- ブラジル海賊党
- 英国緑の党（複数地域支部）
- スペインのPodemos
- 米国プロボ市（パブリックコンサルテーション）

**特徴**:
- 小〜中規模グループの民主的意思決定に最適
- DemocracyOSとのAPI連携も検討

---

### 1.7 Your Priorities / Better Reykjavik

| 項目 | 内容 |
|------|------|
| URL | https://www.yrpri.org/ |
| GitHub | https://github.com/CitizensFoundation/your-priorities-app |
| 開発元 | Citizens Foundation（アイスランド、2008年設立） |
| ライセンス | OSS |

**機能**:
- アイデア生成と討論
- 賛成/反対の論点追加（従来型コメント欄ではない）
- アップ/ダウン投票システム（アイデアと論点の両方に投票）
- 優先順位付きアイデアリスト生成
- 参加型予算

**Better Reykjavik実績**:
- 2010年開始、利用者70,000人
- 毎月10〜15件の市民提案をレイキャビク市議会が検討
- 市の資本投資予算の約4%を参加型予算で決定

**展開**:
- ブルガリア、英国、インド、米国にも導入
- アイスランド各都市に拡大

---

### 1.8 CitizenLab / Go Vocal

| 項目 | 内容 |
|------|------|
| GitHub | https://github.com/CitizenLabDotCo/citizenlab |
| ライセンス | AGPL（コア機能）/ 商用ライセンス（高度機能） |
| データベース | PostgreSQL |

**機能**:
- 投票・アンケート
- 参加型予算
- アイデア収集
- マッピング（地域イベント等の可視化）
- ワークショップ（ライブ討論・リアルタイム熟議）

**特徴**:
- デュアルライセンス（コアOSS + 商用プレミアム）
- APIによるオープンデータ提供
- 2025年3月にオープンソース版を正式公開

---

## 2. 台湾のデジタル民主主義エコシステム

### 2.1 g0v（零時政府）

| 項目 | 内容 |
|------|------|
| URL | https://g0v.tw/ |
| 設立 | 2012年 |
| 形態 | 分散型CivicTechコミュニティ |

- 全プロジェクトがオープンソース
- 50回以上のハッカソンを開催
- 主要プロジェクト: Cofacts（ファクトチェックbot）、MoeDict（デジタル中国語辞典）、vTaiwan

### 2.2 vTaiwan

| 項目 | 内容 |
|------|------|
| URL | https://info.vtaiwan.tw/ |
| 開始 | 2014年 |
| 中核技術 | Pol.is |

- 4段階プロセス: 提案→意見→熟考→立法
- 2015-2018年に26のテーマを討論、80%が政府の具体的アクションに結実
- Uber規制の事例: オンライン合意を政府が法制化
- 現在はボランティア運営（政府直接支援なし）

### 2.3 Join（公共政策參與平台）

- 台湾政府公式の請願・討論プラットフォーム
- Pol.isを活用した合意形成
- 5,000署名で政府機関が各項目に回答義務

---

## 3. 日本のCivicTechエコシステム

### 3.1 Code for Japan

| 項目 | 内容 |
|------|------|
| URL | https://www.code4japan.org/ |
| 設立 | - |
| 形態 | 一般社団法人 |

- CivicTechプロジェクトの開発・支援
- Decidimの日本語化・導入支援
- Civictech Accelerator Program運営
- 年次Code for Japan Summit開催

### 3.2 チームみらい（デジタル民主主義2030）

- 上記「team-mirai-services.md」に詳述
- 広聴AI（Talk to the Cityベース）
- いどばた（vTaiwan参考の熟議プラットフォーム）
- Polimoney（政治資金透明化）

---

## 4. 比較表

| ツール | 主要機能 | 技術 | ライセンス | 規模 | 導入数 | AI活用 |
|--------|---------|------|-----------|------|--------|--------|
| **Decidim** | 参加型プロセス全般 | Ruby on Rails | AGPL-3.0 | 大規模 | 180+ | 限定的 |
| **Consul** | 市民参加・予算 | Ruby on Rails | AGPL-3.0 | 大規模 | 250+ | LLM Assistant開発中 |
| **Pol.is** | 意見集約・合意検出 | JavaScript | AGPL-3.0 | 大規模 | 多数 | ML（クラスタリング） |
| **T3C** | ブロードリスニング | - | OSS | 大規模 | 複数国 | LLM（分析・可視化） |
| **DemocracyOS** | 討論・立法 | Node.js | OSS | 大規模 | 4カ国+ | なし |
| **Loomio** | 合意形成 | Rails + Vue.js | AGPL-3.0 | 小〜中 | 多数 | なし |
| **Your Priorities** | アイデア生成・優先順位 | - | OSS | 中規模 | 複数国 | 限定的 |
| **CitizenLab** | 市民エンゲージメント全般 | - | AGPL + 商用 | 中〜大 | 多数 | 限定的 |
| **チームみらい** | 政治参加エコシステム | Next.js + Supabase | AGPL / CC-BY | 中規模 | 1政党+α | LLM全面活用 |

---

## 5. カテゴリ別分類

### 5.1 熟議・討論プラットフォーム
- **Pol.is** - 大規模合意検出
- **Loomio** - 小規模合意形成
- **DemocracyOS** - 議会向け討論

### 5.2 総合参加型プラットフォーム
- **Decidim** - 最も包括的（プロセス・アセンブリ・イニシアチブ・予算）
- **Consul Democracy** - 政府向け最大規模
- **CitizenLab / Go Vocal** - デュアルライセンスモデル

### 5.3 AI活用型（次世代）
- **Talk to the City** - LLMブロードリスニング
- **チームみらい広聴AI** - T3Cの日本実装
- **Consul Civic Assistant** - LLM搭載アシスタント（開発中）
- **チームみらいAIあんの** - RAG+3Dアバター政策応答

### 5.4 透明性・アカウンタビリティ
- **チームみらい まる見え政治資金** - 政治資金可視化
- **Decidim** - 政策実施の追跡
- **Your Priorities** - 優先順位の可視化

### 5.5 ファクトチェック・情報検証
- **チームみらい AIファクトチェッカー** - SNS偽情報検証
- **g0v Cofacts** - LINEファクトチェックbot

---

## 6. 日本での活用可能性

### すでに日本で使われているもの
- **Decidim**: Code for Japanが日本語化・導入支援済み
- **Talk to the City / 広聴AI**: チームみらいが日本向けに実装済み
- **Pol.is**: チームみらいのいどばたシステムの参考元

### 導入候補
- **Consul Democracy**: 250自治体の実績、LLM Civic Assistant開発中
- **Loomio**: 小規模の議員-住民間コミュニケーションに適合
- **Your Priorities**: 参加型予算のアイスランドモデルを日本の自治体に

### 日本独自の課題
1. 日本語対応の充実度（多くのOSSは英語・スペイン語中心）
2. 高齢者のデジタルリテラシー対応
3. 既存の行政DX（デジタル庁）との連携
4. 政党文化（トップダウン型意思決定）との親和性

---

## 7. まとめ

世界のOSS政治参加ツールは大きく3世代に分類できる:

1. **第1世代（2010年代前半）**: Loomio、DemocracyOS、Your Priorities
   - 基本的な討論・投票・提案機能
   - 小〜中規模コミュニティ向け

2. **第2世代（2010年代後半）**: Decidim、Consul、Pol.is
   - 包括的な参加型民主主義プラットフォーム
   - 大規模自治体・政府向け
   - モジュラー設計

3. **第3世代（2020年代）**: Talk to the City、チームみらいエコシステム、Consul AI Assistant
   - LLM/AI全面活用
   - ブロードリスニング
   - 政策立案プロセスのAI支援

チームみらいは第3世代の最前線にあり、政党が自らエンジニアチームを持ち、AIネイティブなツールをOSSとして開発・公開するモデルは世界的にもユニーク。特に「永田町エンジニアチーム」による内製開発体制は、政治のデジタル化における新しいパラダイムを示している。

---

## 参考リンク

- [Decidim](https://decidim.org/)
- [Consul Democracy](https://consuldemocracy.org/)
- [Pol.is](https://pol.is/)
- [Talk to the City](https://talktothe.city/)
- [DemocracyOS (Participedia)](https://participedia.net/method/democracyos)
- [Loomio](https://www.loomio.com/)
- [Your Priorities](https://www.yrpri.org/)
- [CitizenLab GitHub](https://github.com/CitizenLabDotCo/citizenlab)
- [g0v](https://g0v.tw/)
- [vTaiwan](https://info.vtaiwan.tw/)
- [Code for Japan](https://www.code4japan.org/)
- [Democracy Technologies Database](https://democracy-technologies.org/database/)
- [Digital Democracy 2030](https://dd2030.org/)
- [AI Objectives Institute](https://ai.objectives.institute/)
