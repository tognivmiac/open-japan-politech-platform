# オープンソース政治参加・市民参加ツール調査レポート

> 調査日: 2026-02-12

## 目次

1. [概要](#概要)
2. [主要プロジェクト一覧](#主要プロジェクト一覧)
3. [各プロジェクト詳細](#各プロジェクト詳細)
   - [Decidim](#1-decidim)
   - [Consul Democracy](#2-consul-democracy)
   - [Pol.is](#3-polis)
   - [DemocracyOS](#4-democracyos)
   - [Loomio](#5-loomio)
   - [Your Priorities (Citizens Foundation)](#6-your-priorities-citizens-foundation)
   - [g0v関連ツール / vTaiwan](#7-g0v関連ツール--vtaiwan)
   - [Adhocracy+](#8-adhocracy)
   - [Citizen OS](#9-citizen-os)
   - [CiviCRM](#10-civicrm)
   - [その他注目ツール](#11-その他注目ツール)
4. [チーム未来との比較・組み合わせ提案](#チーム未来との比較組み合わせ提案)
5. [比較表](#比較表)

---

## 概要

世界各地で政治参加・市民参加を促進するためのオープンソースソフトウェア（OSS）が開発・運用されている。本レポートでは、主要なプロジェクトを網羅的に調査し、技術スタック、機能、導入事例、日本語対応状況を整理した。特に、チーム未来のようなサービスを構築するために組み合わせて使えるツールの提案も行う。

---

## 主要プロジェクト一覧

| プロジェクト | 発祥国 | ライセンス | 主要言語 | GitHub Stars | アクティブ度 |
|---|---|---|---|---|---|
| Decidim | スペイン（バルセロナ） | AGPL-3.0 | Ruby on Rails | ~1,700 | 非常に活発 |
| Consul Democracy | スペイン（マドリード） | AGPL-3.0 | Ruby on Rails | ~1,500 | 活発 |
| Pol.is | アメリカ/台湾 | AGPL-3.0 | JS/Clojure | ~1,000 | 活発 |
| DemocracyOS | アルゼンチン | GPL-3.0 | JavaScript | ~1,800 | メンテ停止 |
| Loomio | ニュージーランド | AGPL-3.0 | Ruby/Vue | ~2,500 | 非常に活発 |
| Your Priorities | アイスランド | MIT | HTML/JS/TS | ~141 | 活発 |
| g0v / vTaiwan | 台湾 | 各種 | 各種 | - | 活発 |
| Adhocracy+ | ドイツ | AGPL-3.0 | Python/Django | ~103 | 活発 |
| Citizen OS | エストニア | Apache-2.0 | Node.js/Angular | ~9 | やや停滞 |
| CiviCRM | アメリカ | AGPL-3.0 | PHP | ~715 | 非常に活発 |

---

## 各プロジェクト詳細

### 1. Decidim

**"我々で決める"を意味するカタルーニャ語に由来する参加型民主主義フレームワーク**

- **GitHub**: https://github.com/decidim/decidim
- **公式サイト**: https://decidim.org/
- **ライセンス**: AGPL-3.0
- **技術スタック**: Ruby on Rails, JavaScript, SCSS
- **Stars**: ~1,700 / コミット数: 7,509+
- **最終更新**: 2024年12月（develop ブランチ）

#### 主な機能

**参加型スペース（Participatory Spaces）**:
- **プロセス（Processes）**: 参加型予算、戦略計画、選挙プロセス等
- **アセンブリ（Assemblies）**: 市民団体、議会、ワーキンググループ等の意思決定機関
- **イニシアチブ（Initiatives）**: 市民発議による規制変更
- **コンサルテーション（Consultations）**: 住民投票

**参加型コンポーネント（12種）**:
- 提案（Proposals）、コメント、修正案（Amendments）
- 投票（Votes）、討論（Debates）
- 参加型予算、アカウンタビリティ（進捗追跡）
- 会議（Meetings）、アンケート（Surveys）
- ブログ、ニュースレター、抽選（Sortitions）

**その他**:
- モジュラー設計により数百のコミュニティモジュールが存在
- 暗号化された電子投票技術
- マルチテナント対応

#### 日本での導入事例

Decidimは日本で最も導入実績のあるOSS参加型プラットフォームである。

- **加古川市**（2020年〜）: 日本初のDecidim導入。Code for Japan と東京大学の吉村有司准教授が中心となり日本語化。高校の授業での活用も行われ、初年度ユーザーの約4割が10代。マニフェスト大賞優秀賞受賞。
- **横浜市**: 脱炭素条例に基づいたエネルギー政策についての市民意見募集で実証実験。電通総研と連携。
- **兵庫県**: 県レベルでのプロジェクト
- **与謝野町、西会津町、釜石市**: 地方自治体での活用
- **国のスマートシティガイドブック策定**: 国レベルでの活用

**日本語対応**: あり（Code for Japan が日本語化を実施、GitHub: `codeforjapan/decidim-cfj`）

#### 評価

- 最も成熟した参加型民主主義フレームワーク
- 世界180以上の組織、32万ユーザー、311インスタンス（スペイン国内外）
- Decidim Association（2019年設立）が商標とコードベースを管理
- 日本でのエコシステムが最も充実している

---

### 2. Consul Democracy

**マドリード市が開発した世界最大級のオープンソース電子参加プラットフォーム**

- **GitHub**: https://github.com/consuldemocracy/consuldemocracy
- **公式サイト**: https://consuldemocracy.org/
- **ライセンス**: AGPL-3.0
- **技術スタック**: Ruby (76.7%), HTML (14.4%), SCSS (5.7%), JavaScript (1.9%), Python (1.3%)
- **Stars**: ~1,500 / コントリビューター: 149
- **最新リリース**: v2.4.1（2025年11月）

#### 主な機能

- **討論（Debates）**: 任意のトピックについて市民がスレッドを立てて議論
- **市民提案（Citizen Proposals）**: 一定の支持を集めた提案が投票に付される
- **参加型予算（Participatory Budgeting）**: 予算配分の直接民主的プロセス
- **協働法制（Collaborative Legislation）**: 法案・規則の協働起草
- **投票（Voting）**: 提案やアイデアに対する投票

**2025年の新展開**:
- LLM（大規模言語モデル）搭載のオープンソースCivic Assistantを開発中（Google Impact Fund支援）
- 若者、移民、低所得コミュニティなど参加率の低い層の参加促進を目指す

#### 導入事例

- 世界250以上の都市・組織で採用
- マドリード市（発祥地）、ブエノスアイレス市等
- People Powered による2025年の参加型プラットフォームランキングで世界2位
- **日本での導入事例は確認できず**

**日本語対応**: 多言語対応しているが、日本語ローカライゼーションの充実度はDecidimに劣る

#### 評価

- Decidimと並ぶ二大OSSプラットフォームの一つ
- LLM統合による次世代機能の開発が進行中（2025-2027年）
- ConsulCon 2026（ミュンヘン）で国際カンファレンス開催予定

---

### 3. Pol.is

**AI駆動の大規模意見集約プラットフォーム**

- **GitHub**: https://github.com/compdemocracy/polis
- **公式サイト**: https://pol.is/
- **ライセンス**: AGPL-3.0
- **技術スタック**: JavaScript/TypeScript（クライアント）, Clojure（数学処理/サーバー）, Python, Shell
- **Stars**: ~1,000+
- **デプロイ**: Docker ベース

#### 主な機能

- 参加者がステートメントを投稿し、他の参加者が賛成/反対/パスで反応
- **PCA（主成分分析）+ K-means クラスタリング**により意見グループを自動形成
- 対立点と合意点をリアルタイムで可視化
- 「サーベイより有機的、フォーカスグループより低労力」
- 管理者・参加者・レポート用の3つのクライアントアプリ
- JWT認証、OIDC対応

#### 導入事例

- **台湾 vTaiwan**: 最も有名な導入事例。28件以上の政策課題を議論し、80%が政府の施策につながった
- Uber/Airbnb規制、フィンテック規制等の政策策定に活用
- **チーム未来の「いどばたシステム」はPol.isの思想的影響を受けている**

**日本語対応**: インターフェースの日本語化は限定的だが、コンテンツは多言語で入力可能

#### 評価

- 意見集約・合意形成に特化した唯一無二のツール
- Clojureベースの数学処理が特徴的で、技術的なハードルがやや高い
- チーム未来の広聴AIの直接的な参照元

---

### 4. DemocracyOS

**オンライン審議・投票プラットフォーム（開発停止）**

- **GitHub**: https://github.com/DemocracyOS/democracyos
- **ライセンス**: GPL-3.0
- **技術スタック**: JavaScript (81.8%), CSS (12.3%), HTML (5.7%)
- **Stars**: ~1,800 / コントリビューター: 74+
- **状態**: **メンテナンス停止**

#### 主な機能

- 法案・政策提案のオンライン審議
- 市民による投票・追跡機能
- 15言語に翻訳

#### 導入事例

- チュニジア憲法草案の審議
- メキシコ連邦政府のオープンガバメント政策策定
- ケニア最年少議員の選挙区での市民協議
- ブエノスアイレス議会

**日本語対応**: なし

#### 評価

- 歴史的に重要なプロジェクトだが、現在はメンテナンスされていない
- Democracia en Red（アルゼンチンNGO）が開発していたが、他のプロジェクトに注力
- 新規導入は推奨できない

---

### 5. Loomio

**協働意思決定ツール**

- **GitHub**: https://github.com/loomio/loomio
- **公式サイト**: https://www.loomio.com/
- **ライセンス**: AGPL-3.0
- **技術スタック**: Ruby (61.3%), Vue (21.9%), JavaScript (13.9%), CSS, SCSS
- **Stars**: ~2,500 / コントリビューター: 84+
- **最新リリース**: v3.0.19（2026年2月9日）/ コミット数: 30,181

#### 主な機能

- グループ内での議論スレッド
- 複数の投票・意思決定方式（同意、ランキング、スコア等）
- 期限付き決定プロセス
- 視覚的な意見サマリー
- 30以上の言語対応（自動インライン翻訳）
- スクリーンリーダー等のアシスティブテクノロジー対応

#### 導入事例

- Enspiral（ニュージーランドの社会起業家ネットワーク）
- 協同組合、NGO、市民団体等で幅広く利用
- 政府機関でも一部採用

**日本語対応**: 30言語以上に対応（日本語含む）

#### 評価

- 最もアクティブに開発が続いているプロジェクトの一つ（2026年2月にも新リリース）
- 組織内の意思決定に強い
- 政治参加というよりは組織の合意形成に最適化されている

---

### 6. Your Priorities (Citizens Foundation)

**アイスランド発の市民エンゲージメントプラットフォーム**

- **GitHub**: https://github.com/CitizensFoundation/your-priorities-app
- **公式サイト**: https://citizens.is/
- **ライセンス**: MIT
- **技術スタック**: HTML (45.6%), JavaScript (34.5%), TypeScript (19.2%), Python
- **Stars**: ~141 / コントリビューター: 4 / コミット数: 7,983

#### 主な機能

- アイデア投稿・共有（クラウドソーシング型）
- 賛成/反対に分かれた市民的審議
- 参加型予算
- AI駆動の分析・推薦
- 毒性スキャン（投稿内容のモデレーション）
- 200言語対応
- 動画・音声投稿対応
- PWA（Progressive Web App）

#### 関連リポジトリ

- **policy-synth**: TypeScript, AI駆動の政策分析ツール（Stars: 57, MIT）
- **active-citizen**: AI技術を活用した市民エンパワーメントライブラリ（Stars: 46, AGPL-3.0）
- **open-active-voting**: 参加型予算向けセキュア投票アプリ（Stars: 41）

#### 導入事例

- 25カ国、200万人以上が利用
- アイスランドのBetri Reykjavik（より良いレイキャビク）プロジェクト
- 参加型プラットフォーム評価で世界トップクラス

**日本語対応**: 200言語対応のため日本語もサポート

#### 評価

- MIT ライセンスのため最も自由度が高い
- AI統合が最も進んでいるプラットフォームの一つ
- policy-synth はLLMベースの政策分析として独自の価値がある

---

### 7. g0v関連ツール / vTaiwan

**台湾のシビックハッカーコミュニティとそのツール群**

- **GitHub（g0v）**: https://github.com/g0v
- **GitHub（vTaiwan）**: https://github.com/g0v/vue.vtaiwan.tw
- **公式サイト**: https://g0v.tw/ / https://info.vtaiwan.tw/
- **ライセンス**: 各プロジェクトにより異なる

#### g0v の概要

- 2012年設立の分散型シビックテックコミュニティ
- 「.gov.tw」のウェブサイトをフォークして「.g0v.tw」で改良版を公開するアプローチ
- 2ヶ月に1回以上のハッカソン開催（毎回約120人参加）
- 参加者の60%以上が非技術者

#### vTaiwan

- オンラインとオフラインを組み合わせた開かれた協議プロセス
- 専門家、政府職員、ステークホルダー、市民が合意形成に参加
- 28件以上のケースを議論し、80%が政府の施策に反映

#### 主要ツール

| ツール | 用途 | 技術 |
|---|---|---|
| Pol.is | 大規模意見集約 | JS/Clojure |
| Hackfoldr | 政策議論の資料リンク共有 | EtherCalc |
| MoeDict | デジタル中国語辞書（Audrey Tang開発） | - |
| vTaiwan | 政策協議プラットフォーム | Vue.js |

#### 評価

- ボトムアップ型シビックテックの世界的モデル
- Audrey Tang（台湾デジタル担当大臣）の存在が大きい
- 特定のプラットフォームというよりも、複数ツールを組み合わせたプロセス設計
- チーム未来の思想的・技術的参照元として最も重要

---

### 8. Adhocracy+

**液体民主主義に基づくモジュラー参加プラットフォーム**

- **GitHub**: https://github.com/liqd/adhocracy-plus
- **公式サイト**: https://adhocracy.plus/
- **ライセンス**: AGPL-3.0
- **技術スタック**: Python (65.8%), HTML (21.9%), JavaScript (6.5%), SCSS (5.2%) — Django フレームワーク
- **Stars**: ~103 / コントリビューター: 30 / コミット数: 5,432
- **最新リリース**: v2601.2（2026年1月）

#### 主な機能

- モジュラー設計（ブレインストーミング、テキストレビュー、マッピング、アジェンダ設定）
- 液体民主主義（Liquid Democracy）の委任投票
- SaaSプラットフォームとして提供
- AI統合の研究が進行中（スタンス検出、審議品質評価）

#### 導入事例

- ドイツの自治体で主に利用
- Liquid Democracy e.V.（ベルリン）が開発・維持

**日本語対応**: なし

#### 評価

- 液体民主主義の概念を実装した珍しいプラットフォーム
- Django/Pythonベースのため、日本のエンジニアにとって扱いやすい可能性
- AI統合の研究論文が出ており、先端的

---

### 9. Citizen OS

**エストニア発の協働テキスト作成・議論・投票プラットフォーム**

- **GitHub**: https://github.com/citizenos
- **公式サイト**: https://citizenos.com/
- **ライセンス**: Apache-2.0（フロントエンド）
- **技術スタック**: Node.js, Angular, Etherpad-Lite（協働テキスト編集）
- **Stars**: ~9（フロントエンド） / コミット数: 9,532
- **最終更新**: 2022年12月（やや停滞気味）

#### 主な機能

- 4段階のトピックフロー：アイデア収集 → 賛否議論 → 投票 → アクション
- 協働テキスト編集（Etherpad統合）
- eID ログイン・電子署名（エストニアのデジタルIDに最適化）
- 投票委任（Vote Delegation）
- 14言語対応、GDPR準拠

#### 導入事例

- エストニアの市民社会で利用
- エストニア議会への電子請願に対応

**日本語対応**: 14言語対応だが日本語は未確認

#### 評価

- エストニアのデジタルID基盤との統合が特徴
- 開発の活発度がやや低い
- 協働テキスト編集機能は独自の強み

---

### 10. CiviCRM

**非営利組織・市民団体向けの構成員関係管理システム**

- **GitHub**: https://github.com/civicrm/civicrm-core
- **公式サイト**: https://civicrm.org/
- **ライセンス**: AGPL-3.0
- **技術スタック**: PHP (82.9%), Smarty (9.1%), JavaScript (4.0%), CSS (1.9%)
- **Stars**: ~715 / コントリビューター: 446 / コミット数: 72,491
- **CMS統合**: WordPress, Drupal, Joomla, Backdrop, Standalone

#### 主な機能

- 連絡先管理（無制限のカスタムフィールド）
- メール・SMSキャンペーン（セグメンテーション対応）
- イベント管理
- 会員管理（自動更新・リマインダー）
- 寄付管理・決済処理
- ケース管理
- アドボカシーキャンペーン
- P2Pファンドレイジング

#### 導入事例

- 11,000以上の非営利組織が利用
- 世界中のNGO、アドボカシー団体、政党の支持者管理

**日本語対応**: コミュニティ翻訳が存在するが、完全ではない

#### 評価

- 参加型民主主義プラットフォームとは異なり、組織の会員・支持者管理に特化
- 非常に成熟したプロジェクト（72,000+コミット、446コントリビューター）
- 政党の支持者管理・連絡先管理として最も適している

---

### 11. その他注目ツール

#### Open Source Politics（フランス）

- Decidimの公式パートナー企業（2016年設立）
- 200以上の組織にDecidimをSaaSで提供
- 欧州委員会の「Conference on the Future of Europe」にも導入
- GitHub: https://github.com/OpenSourcePolitics

#### FixMyStreet（mySociety, イギリス）

- **GitHub**: https://github.com/mysociety/fixmystreet
- 道路の穴やさえない街灯などの問題を地図ベースで報告するプラットフォーム
- 2007年にイギリスで開発され、世界中でコピーされている
- 技術スタック: Perl

#### Ushahidi（ケニア）

- **GitHub**: https://github.com/ushahidi/platform
- 情報収集・可視化・インタラクティブマッピングのウェブアプリ
- SMS、Twitter、RSS、メールからの情報収集
- 2008年ケニア選挙後の暴力マッピングから発展
- 災害管理にも広く活用

#### Discourse（グローバル）

- **GitHub**: https://github.com/discourse/discourse
- **Stars**: 43,000+
- 100%オープンソースのフォーラムソフトウェア
- Ruby on Rails ベース
- 市民討議のインフラとしても利用可能
- OpenAI、Mozilla等のコミュニティ基盤として採用

---

## チーム未来との比較・組み合わせ提案

### チーム未来の既存ツール

チーム未来（Team Mirai）は以下のOSSツールを独自開発している（GitHub: https://github.com/team-mirai）:

| ツール | 説明 | Stars | 技術 |
|---|---|---|---|
| **marumie**（みらい丸見え政治資金） | 政治資金の流れを可視化 | 666 | TypeScript |
| **mirai-gikai**（みらい議会） | 国会の法案情報を分かりやすく表示 | 187 | TypeScript |
| **kouchou-ai**（広聴AI） | AI駆動の市民意見集約 | 20 | TypeScript |
| **policy** | マニフェスト協働作成（CC BY 4.0） | 396 | TypeScript |

### 組み合わせ提案

チーム未来のようなサービスを構築する場合、以下の組み合わせが有効である。

#### A. 基盤プラットフォーム: Decidim

**推奨度: 最高**

- 日本での導入実績が最も豊富（加古川市、横浜市等）
- Code for Japan による日本語ローカライゼーション済み
- モジュラー設計により、チーム未来の独自機能をモジュールとして統合可能
- 提案、投票、参加型予算、会議管理が一体化
- AGPLライセンスのため、改変版もオープンソースで公開する必要がある

#### B. 意見集約エンジン: Pol.is

**推奨度: 高**

- チーム未来の「広聴AI」（kouchou-ai）の参照元
- vTaiwanでの実績が証明済み
- Decidimと組み合わせて使うことで、提案の前段階での意見集約が可能
- クラスタリングによる意見の可視化はチーム未来の方向性と合致

#### C. 支持者管理: CiviCRM

**推奨度: 中〜高**

- 政党の支持者・会員管理に最適
- メール・SMSキャンペーン機能
- 寄付管理・決済処理
- WordPress/Drupal統合
- 11,000以上の非営利組織での実績

#### D. 組織内意思決定: Loomio

**推奨度: 中**

- 党内の政策議論・合意形成に最適
- 複数の投票方式に対応
- 30言語対応（日本語含む）
- 最もアクティブに開発が継続

#### E. AI駆動の政策分析: policy-synth (Citizens Foundation)

**推奨度: 中**

- LLMベースの政策分析ツール
- チーム未来の「みらい議会」の法案分析機能と相補的
- MIT ライセンスで自由度が高い

#### F. フォーラム基盤: Discourse

**推奨度: 中**

- 市民同士の継続的な政策討論の場として
- 高い拡張性とプラグインエコシステム
- Ruby on Railsベースで技術的親和性あり

### 推奨アーキテクチャ

```
+---------------------------------------------------+
|            チーム未来型プラットフォーム              |
+---------------------------------------------------+
|                                                   |
|  [Decidim]           [Pol.is / kouchou-ai]        |
|   参加型プロセス       意見集約・クラスタリング     |
|   提案・投票・予算     大規模コンサルテーション     |
|                                                   |
|  [CiviCRM]           [Discourse / Loomio]         |
|   支持者管理           討論・合意形成              |
|   キャンペーン管理     党内意思決定               |
|                                                   |
|  [marumie]           [mirai-gikai]                |
|   政治資金可視化       法案トラッキング            |
|   （独自開発維持）     （独自開発維持）            |
|                                                   |
|  [policy-synth]      [policy (GitHub)]            |
|   AI政策分析          マニフェスト協働作成         |
|                                                   |
+---------------------------------------------------+
```

### 技術的統合のポイント

1. **Decidim をハブとして**: Decidimのモジュラー設計を活かし、Pol.isの意見集約機能やCiviCRMの会員管理機能をDecidimモジュールとして統合
2. **API連携**: 各ツールのREST APIを通じてデータ連携（Decidim GraphQL API、CiviCRM REST API等）
3. **SSO（シングルサインオン）**: 全ツールを統一認証で利用可能にする
4. **チーム未来独自ツールの維持**: marumie（政治資金可視化）やmirai-gikai（法案トラッキング）は独自の価値があり、OSSの置き換え対象ではなく、連携先として位置づける

---

## 比較表

### 機能比較

| 機能 | Decidim | Consul | Pol.is | Loomio | Your Priorities | Adhocracy+ |
|---|---|---|---|---|---|---|
| 提案・アイデア投稿 | ○ | ○ | - | ○ | ○ | ○ |
| 投票 | ○ | ○ | △（賛否のみ） | ○ | ○ | ○ |
| 参加型予算 | ○ | ○ | - | - | ○ | ○ |
| 討論・審議 | ○ | ○ | - | ○ | ○ | ○ |
| 意見クラスタリング | - | - | ○ | - | - | - |
| 協働法制・テキスト編集 | ○ | ○ | - | - | - | ○ |
| 会議管理 | ○ | - | - | - | - | - |
| AI統合 | △ | ○（開発中） | ○ | - | ○ | △（研究中） |
| モバイル対応 | ○ | ○ | ○ | ○ | ○（PWA） | ○ |
| 多言語対応 | ○ | ○ | △ | ○ | ○ | △ |
| 日本語 | ○ | △ | △ | ○ | ○ | - |

### 技術比較

| 項目 | Decidim | Consul | Pol.is | Loomio | Your Priorities | Adhocracy+ | CiviCRM |
|---|---|---|---|---|---|---|---|
| 主要言語 | Ruby | Ruby | JS/Clojure | Ruby/Vue | JS/TS | Python | PHP |
| フレームワーク | Rails | Rails | Node.js | Rails | Lit/Web Components | Django | 独自 |
| DB | PostgreSQL | PostgreSQL | PostgreSQL | PostgreSQL | PostgreSQL | PostgreSQL | MySQL |
| デプロイ | Docker | Docker | Docker | Docker | Docker | Docker | CMS統合 |
| API | GraphQL | REST | REST | REST | REST | REST | REST |
| ライセンス | AGPL-3.0 | AGPL-3.0 | AGPL-3.0 | AGPL-3.0 | MIT | AGPL-3.0 | AGPL-3.0 |

---

## 参考リンク

- [Decidim公式](https://decidim.org/)
- [Consul Democracy公式](https://consuldemocracy.org/)
- [Pol.is - Computational Democracy Project](https://compdemocracy.org/polis/)
- [Loomio公式](https://www.loomio.com/)
- [Citizens Foundation](https://citizens.is/)
- [g0v公式](https://g0v.tw/)
- [vTaiwan](https://info.vtaiwan.tw/)
- [Adhocracy+](https://adhocracy.plus/)
- [Citizen OS](https://citizenos.com/)
- [CiviCRM](https://civicrm.org/)
- [Code for Japan - Decidim](https://www.code4japan.org/activity/decidim)
- [Democracy Technologies Database](https://democracy-technologies.org/database/)
- [チーム未来 GitHub](https://github.com/team-mirai)
- [チーム未来公式](https://team-mir.ai/)
