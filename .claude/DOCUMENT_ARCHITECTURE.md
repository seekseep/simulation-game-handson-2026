# ドキュメント構造ガイド

このファイルは、シミュレーションゲームハンズオンプロジェクトのドキュメント構造とテンプレートの使用方法を説明します。

## プロジェクトの全体像

このプロジェクトは、プログラミング初心者が Web アプリケーション開発を学ぶための学習教材です。
完成するのは「単語を教えると話してくれる動物キャラクター」のシミュレーションゲームです。

### 学習目標

1. HTML/CSS/JavaScript の基礎を理解する
2. 3D グラフィックス (Three.js) を使った UI 開発を学ぶ
3. サーバーレス API (Vercel Functions) の構築方法を学ぶ
4. データベース (Supabase) を使ったデータ管理を理解する
5. AI (Google Gemini) を活用したアプリケーション開発を体験する

### 完成するアプリケーションの機能

- 3D で表示された動物キャラクターに単語を教える
- 教えた単語を使ってキャラクターが話す
- 単語はカテゴリー (あいさつ、食べ物、必殺技、場所) で管理される
- AI がキャラクターの性格に合わせてセリフを生成する
- キャラクターがセリフに合わせてアニメーションする

## 技術スタック

### フロントエンド
- **HTML5** - ページ構造
- **CSS3** - スタイリング
- **JavaScript (ES6 Modules)** - アプリケーションロジック
- **Three.js (v0.160.0)** - 3D グラフィックス

### バックエンド
- **Vercel Serverless Functions** - API エンドポイント
- **Supabase** - PostgreSQL データベース (BaaS)
- **Google Generative AI** - Gemini 2.5 Flash モデル

### 開発ツール
- **Git & GitHub** - バージョン管理
- **Vercel CLI** - ローカル開発サーバー
- **ブラウザ DevTools** - デバッグ

## 必要な事前準備

このハンズオンを始める前に、以下のアカウントとツールを準備してください。

### 1. 開発環境

- **テキストエディタ** - VS Code を推奨 (https://code.visualstudio.com/)
- **Web ブラウザ** - Chrome または Firefox の最新版
- **ターミナル** - コマンドライン操作ができる環境

### 2. アカウント作成 (無料)

ハンズオンを進めるために、以下のサービスのアカウントが必要です。すべて無料プランで利用できます。

#### GitHub (第2章で使用)
- URL: https://github.com/
- 用途: コードのバージョン管理とデプロイ連携

#### Vercel (第2章、第3章で使用)
- URL: https://vercel.com/
- 用途: Web サイトのデプロイと API 実行環境
- GitHub アカウントでサインアップできます

#### Supabase (第3章で使用)
- URL: https://supabase.com/
- 用途: PostgreSQL データベース (BaaS)
- GitHub アカウントでサインアップできます

#### Google AI Studio (第4章で使用)
- URL: https://aistudio.google.com/
- 用途: Gemini API キーの取得
- Google アカウントが必要です

### 3. 前提知識

**必須**
- ファイルとフォルダの基本操作ができること
- テキストエディタでファイルを編集できること

**あると良い知識**
- HTML タグの基本 (知らなくても学べます)
- プログラミングの基礎概念 (変数、関数など)

## ディレクトリ構造

```
simulation-game-handson-2026/
├── .claude/                          # Claude Code 関連ファイル
│   ├── DOCUMENT_ARCHITECTURE.md      # このファイル
│   └── templates/                    # ドキュメントテンプレート
│       ├── section-readme-template.md
│       └── chapter-readme-template.md
├── demo/                             # 完成版デモアプリ
│   ├── api/                          # API 関数
│   ├── assets/                       # 静的ファイル
│   │   ├── css/
│   │   ├── js/
│   │   └── glb/                      # 3D モデル
│   ├── sql/                          # データベース定義
│   ├── index.html
│   └── package.json
├── docs/                             # ハンズオンドキュメント
│   ├── README.md                     # ドキュメント全体の目次
│   ├── 1-practice/                   # 第1章: 基礎練習
│   │   ├── README.md
│   │   ├── 1-html-css/
│   │   │   ├── README.md
│   │   │   └── examples/             # 実装サンプル
│   │   │       ├── 1/
│   │   │       ├── 2/
│   │   │       └── ...
│   │   ├── 2-debug/
│   │   ├── 3-dialog/
│   │   ├── 4-set-timeout/
│   │   ├── 5-async/
│   │   └── 6-aveterView/
│   ├── 2-ui/                         # 第2章: UI構築
│   │   ├── README.md
│   │   ├── 1-view/
│   │   ├── 2-logic/
│   │   ├── 3-github/
│   │   └── 4-vercel/
│   ├── 3-api/                        # 第3章: API構築
│   │   ├── README.md
│   │   ├── 1-vercel-cli/
│   │   ├── 2-api/
│   │   ├── 3-supabase/
│   │   ├── 4-database/
│   │   └── 5-environment/
│   └── 4-ai/                         # 第4章: AI統合
│       ├── README.md
│       ├── 1-line/
│       └── 2-ai-line/
└── README.md                         # プロジェクトのトップページ
```

## ドキュメントの構成

### デモ vs ハンズオン

- **デモ (`/demo`)** - 完成したアプリケーション。動作を確認できます。
- **ハンズオン (`/docs`)** - 段階的に学習するための教材。自分で実装しながら学びます。

### ハンズオンの章構成

#### 第1章: 基礎練習 (`docs/1-practice/`)
第2章以降で必要となる Web 開発の基礎知識を、`practice` ディレクトリで練習します。
各セクションは独立しており、HTML/CSS、JavaScript の基本、非同期処理、3D 表示などを学びます。

#### 第2章: UI 構築 (`docs/2-ui/`)
3D キャラクターと対話できる UI を段階的に構築します。
この章から一つのプロジェクトとして開発し、GitHub と Vercel を使ってデプロイまで行います。

#### 第3章: API 構築 (`docs/3-api/`)
第2章で作った UI にバックエンド API を追加します。
Vercel のサーバーレス関数と Supabase データベースを使って、データを永続化します。

#### 第4章: AI 統合 (`docs/4-ai/`)
Google Gemini AI を使って、キャラクターに性格を持たせます。
AI がキャラクターの性格に合わせてセリフを生成するようになります。

## テンプレートの使用方法

### 章レベルの README

各章のトップ (`docs/X-chapter-name/README.md`) では以下の内容を記載します:

- 章の説明と学習目標
- この章で作るもの/学ぶこと
- セクション一覧とリンク
- 次の章へのリンク

テンプレート: [`.claude/templates/chapter-readme-template.md`](.claude/templates/chapter-readme-template.md)

### セクションレベルの README

各セクション (`docs/X-chapter/Y-section/README.md`) では、examples の各サンプルごとに以下の内容を記載します:

1. サンプルのタイトルと実装例のパス
2. 学習目標
3. 作業前のディレクトリ構造
4. 作業手順 (番号付きリスト)
5. 各作業の詳細 (ファイル名、コード、説明)
6. 動作確認方法
7. 作業後のディレクトリ構造
8. 次のセクションへのリンク

テンプレート: [`.claude/templates/section-readme-template.md`](.claude/templates/section-readme-template.md)

### 初心者向けの配慮

ドキュメントを作成する際は、以下の点に注意してください:

- **専門用語には説明を付ける** - 初めて見る用語は必ず説明する
- **各ステップを細かく説明** - 「ファイルを作成する」だけでなく、「どこに」「何という名前で」まで明記
- **なぜそうするのかを説明** - 単に手順を示すだけでなく、理由も伝える
- **エラーへの対処法** - よくあるエラーとその解決方法を記載
- **動作確認を明確に** - 正しく動いているかを確認する方法を具体的に示す

## 学習の進め方

### 推奨順序

1. **第1章** から順番に進めてください
2. 各セクション内の **example は番号順** に進めてください
3. わからないことがあっても、**まずは先に進んで** みてください (後で理解できることもあります)
4. **手を動かすこと** が最も重要です。コピー&ペーストだけでなく、自分で打ち込んでみましょう

### practice ディレクトリについて (第1章)

第1章では、プロジェクトのルートに `practice` というディレクトリを自分で作成します。
このディレクトリは Git の管理対象外なので、自由に練習できます。

```bash
# プロジェクトルートで実行
mkdir practice
cd practice
```

第1章の各セクションでは、この `practice` ディレクトリの中にファイルを作成して練習します。

### app ディレクトリについて (第2章以降)

第2章からは、プロジェクトのルートに `app` というディレクトリを作成し、
実際のアプリケーションを段階的に構築していきます。

## 関連リンク

### 公式ドキュメント

- [Three.js Documentation](https://threejs.org/docs/)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Google AI Studio](https://ai.google.dev/)

### 学習リソース

- [MDN Web Docs (HTML/CSS/JavaScript)](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)

## サポート

質問や問題がある場合は、GitHub の Issues を活用してください。
