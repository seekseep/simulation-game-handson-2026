# デモアプリケーション

このディレクトリには、完成したシミュレーションゲームアプリケーションが含まれています。

## 機能

- 3D で表示された動物キャラクターに単語を教えることができます
- 教えた単語を使って、キャラクターが話します
- 単語はカテゴリー（あいさつ、食べ物、必殺技、場所）で管理されます
- AI がキャラクターの性格に合わせてセリフを生成します
- キャラクターがセリフに合わせてアニメーションします

## ローカルでの起動方法

### 1. 環境変数の設定

`.env.local` ファイルを作成し、以下の環境変数を設定してください:

```bash
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
GEMINI_API_KEY=your_gemini_api_key
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 開発サーバーの起動

```bash
npx vercel dev
```

ブラウザで http://localhost:3000 にアクセスしてください。

## 技術スタック

### フロントエンド
- HTML5 / CSS3
- JavaScript (ES6 Modules)
- Three.js (3D グラフィックス)

### バックエンド
- Vercel Serverless Functions (API)
- Supabase (PostgreSQL データベース)
- Google Generative AI (Gemini)
