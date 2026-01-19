# Vercel CLI

APIの実装をローカルで動作確認しながら進めるためにVercelCLIを使用します。

この節では Vercel CLIのインストール方法を説明します。

# Node.js

Vercel CLI を使用するためにNode.jsが必要です。開発を行っている環境にNode.jsがインストールされていることを確認してください。

インストールされていない場合は、[Node.jsの公式サイト](https://nodejs.org/)からインストーラーをダウンロードしてインストールしてください。

## Windows 10/11

**使用する CLI**

* コマンドプロンプト
* PowerShell

### インストール確認

コマンドプロンプトあるいは PowerShell を開き、以下のコマンドを実行して Node.js がインストールされているか確認します。

```powershell
node -v
```

または

```powershell
npm -v
```

* バージョン番号が表示されればインストール済み
* 表示されない場合は未インストール

### インストール方法（未インストールの場合）

1. Node.js 公式サイトにアクセス
   [https://nodejs.org/](https://nodejs.org/)
2. **LTS（Long Term Support）** と表示されているバージョンをダウンロード
3. インストーラーを実行（基本的にすべて「次へ」でOK）
4. インストール後、CLI を再起動して再度確認

```powershell
node -v
```

## macOS

**使用する CLI**

* ターミナル.app（標準）

### インストール確認

```bash
node -v
```

または

```bash
npm -v
```

* バージョンが表示されればインストール済み
* `command not found` の場合は未インストール

### インストール方法①（公式インストーラー）

1. Node.js 公式サイトにアクセス
   [https://nodejs.org/](https://nodejs.org/)
2. **LTS** バージョンの `.pkg` をダウンロード
3. インストーラーを実行
4. ターミナルを再起動して確認

```bash
node -v
```

# Vercel CLI の確認

VercelCLIがインストールされているかを確認します。

```bash
vercel -v
```

* バージョン番号が表示されればインストール済み
* 表示されない場合は未インストール


# Vercel CLI のインストール方法（未インストールの場合）

Vercel CLI は npm を使用してインストールします。

```bash
npm install -g vercel
```

インストール後、再度バージョン確認を行います。

```bash
vercel -v
Vercel CLI 50.4.5
50.4.5
```
2026/01/19現在の最新バージョンは50.4.5です。

---

# まとめ

Vercel CLI のインストール方法について説明しました。

---

# 次の項

[APIの実装](../2-api/README.md)
