# 3. GitHub設定

この節では、作成したアプリケーションをGitHubにアップロードします。GitHubはコードのバージョン管理とホスティングのためのサービスです。

## 学習内容

- GitHubアカウントの作成
- リモートリポジトリの作成
- Gitの基本操作（init, add, commit, push）
- .gitignoreファイルの作成

## 前提条件

- Gitがインストールされていること
- コマンドラインツール（ターミナルまたはコマンドプロンプト）が使えること

---

# ステップ1: GitHubアカウントの作成

## 目標

GitHubアカウントを作成します。

## 手順

1. **GitHubのウェブサイトにアクセス**
   - https://github.com にアクセスします

2. **サインアップ**
   - 「Sign up」ボタンをクリック
   - メールアドレスを入力
   - パスワードを設定
   - ユーザー名を決める
   - メール認証を完了

3. **プランの選択**
   - 無料プラン（Free）を選択

**注意:** すでにGitHubアカウントを持っている場合は、このステップをスキップしてください。

---

# ステップ2: リモートリポジトリの作成

## 目標

GitHubにリポジトリ（コードを保存する場所）を作成します。

## 手順

1. **GitHubにログイン**
   - https://github.com にアクセスしてログイン

2. **新しいリポジトリを作成**
   - 右上の「+」ボタンをクリック
   - 「New repository」を選択

3. **リポジトリの設定**
   - **Repository name**: `simulation-game` (または任意の名前)
   - **Description**: 「シミュレーションゲーム - 単語を教えると話してくれる動物」(任意)
   - **Public / Private**: どちらでも良い（Publicにすると誰でも見れます）
   - **Add a README file**: チェックを**入れない**
   - **Add .gitignore**: 「None」を選択
   - **Choose a license**: 「None」を選択（後で追加できます）

4. **Create repository をクリック**

5. **リポジトリのURLをメモ**
   - 作成後の画面に表示されるURL（例: `https://github.com/your-username/simulation-game.git`）をメモしておきます

---

# ステップ3: ローカルリポジトリの作成

## 目標

自分のパソコン上でGitリポジトリを初期化し、GitHubにプッシュします。

## 作業前のディレクトリ構造

```
app/
├── index.html
└── assets/
    ├── css/
    ├── glb/
    └── js/
```

## 手順

### 1. .gitignoreファイルを作成

GitHubにアップロードしないファイルを指定します。

ファイル名: `app/.gitignore`

```
# macOS
.DS_Store

# Windows
Thumbs.db

# エディタ
.vscode/
.idea/
*.swp
*.swo
*~

# ログファイル
*.log

# 一時ファイル
.tmp/
temp/
```

**説明:**

- `.gitignore` - Gitが無視するファイルやディレクトリを指定
- macOSやWindows、エディタが自動生成するファイルを除外します

### 2. Gitリポジトリを初期化

ターミナルで `app` ディレクトリに移動します。

```bash
cd app
```

Gitリポジトリを初期化します。

```bash
git init
```

**実行結果:**

```
Initialized empty Git repository in /path/to/app/.git/
```

### 3. ファイルをステージングエリアに追加

すべてのファイルをステージングエリアに追加します。

```bash
git add .
```

**説明:**

- `git add .` - カレントディレクトリのすべてのファイルを追加
- `.gitignore`に記載されたファイルは除外されます

### 4. 最初のコミットを作成

変更をコミット（記録）します。

```bash
git commit -m "Initial commit: シミュレーションゲームの基本実装"
```

**説明:**

- `git commit` - 変更を記録
- `-m "メッセージ"` - コミットメッセージを指定

### 5. デフォルトブランチ名を設定

デフォルトのブランチ名を `main` に設定します。

```bash
git branch -M main
```

**説明:**

- GitHubのデフォルトブランチは `main` ですが、古いGitでは `master` になっている場合があります
- このコマンドで統一します

### 6. リモートリポジトリを追加

GitHubのリポジトリをリモートとして追加します。

```bash
git remote add origin https://github.com/your-username/simulation-game.git
```

**注意:** `your-username` と `simulation-game` は自分のユーザー名とリポジトリ名に置き換えてください。

**説明:**

- `git remote add` - リモートリポジトリを追加
- `origin` - リモートリポジトリの名前（慣習的に `origin` を使います）

### 7. GitHubにプッシュ

コミットをGitHubにアップロードします。

```bash
git push -u origin main
```

**認証:**

初回実行時は、GitHubのユーザー名とパスワード（または個人アクセストークン）を求められます。

**説明:**

- `git push` - リモートリポジトリにアップロード
- `-u origin main` - `origin` の `main` ブランチにプッシュし、今後のデフォルトとして設定

**実行結果:**

```
Enumerating objects: 25, done.
Counting objects: 100% (25/25), done.
Delta compression using up to 8 threads
Compressing objects: 100% (20/20), done.
Writing objects: 100% (25/25), 150.00 KiB | 15.00 MiB/s, done.
Total 25 (delta 2), reused 0 (delta 0), pack-reused 0
To https://github.com/your-username/simulation-game.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

## 動作確認

1. **GitHubでリポジトリを確認**
   - ブラウザで自分のGitHubリポジトリにアクセス
   - ファイルがアップロードされていることを確認

2. **コミット履歴を確認**
   - GitHubのリポジトリページで「commits」をクリック
   - 「Initial commit: シミュレーションゲームの基本実装」が表示される

## 作業後のディレクトリ構造

```
app/
├── .git/          (新規作成 - Gitの管理情報)
├── .gitignore     (新規作成)
├── index.html
└── assets/
    ├── css/
    ├── glb/
    └── js/
```

---

# 今後の更新方法

コードを変更した後、GitHubに反映する手順です。

## 手順

1. **変更をステージングエリアに追加**

```bash
git add .
```

2. **コミットを作成**

```bash
git commit -m "変更内容の説明"
```

例:
```bash
git commit -m "セリフ表示のアニメーション速度を調整"
```

3. **GitHubにプッシュ**

```bash
git push
```

**ヒント:**

- コミットメッセージは、何を変更したかが分かるように具体的に書きましょう
- 小さな変更ごとにコミットする習慣をつけると、後で変更履歴を追いやすくなります

---

# よくあるエラーと対処法

## エラー1: `git: command not found`

**原因:** Gitがインストールされていません。

**対処法:**
- Windows: https://git-scm.com/ からGitをダウンロードしてインストール
- macOS: `brew install git` (Homebrewがインストールされている場合)
- Linux: `sudo apt-get install git` (Ubuntuの場合)

## エラー2: `Permission denied (publickey)`

**原因:** SSH認証が設定されていません。

**対処法:**
- HTTPSのURLを使う（`https://github.com/...`）
- または、SSHキーをGitHubに登録する（GitHubのドキュメントを参照）

## エラー3: `fatal: remote origin already exists`

**原因:** すでにリモートリポジトリが追加されています。

**対処法:**
```bash
git remote remove origin
git remote add origin https://github.com/your-username/simulation-game.git
```

---

# まとめ

この節では、GitHubにアプリケーションをアップロードしました。

**学んだこと:**

1. **GitHubアカウントの作成**: コードを保存するためのアカウント
2. **リモートリポジトリの作成**: GitHubにコードを保存する場所を作成
3. **Gitの基本操作**: init, add, commit, push
4. **.gitignore**: 不要なファイルを除外

次の節では、Vercelを使ってアプリケーションをインターネット上に公開します。

# 次の項

[4. Vercelデプロイ](../4-vercel/README.md)
