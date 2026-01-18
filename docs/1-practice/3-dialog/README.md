# ダイアログ

このセクションでは、HTML の `<dialog>` 要素を使って、ダイアログ（入力画面）を表示する方法を学びます。

## 準備

practice ディレクトリの中に、このセクション用のディレクトリを作成します。

```bash
cd practice
mkdir 3-dialog
cd 3-dialog
```

これから、この `practice/3-dialog` ディレクトリの中でファイルを作成していきます。

---

# サンプル1: 基本的なダイアログ

実装例: `examples/1`

## 目標

HTML で `<dialog>` 要素を作成します。まだ JavaScript は使いません。

## 作業

1. `index.html` ファイルを作成する
2. `main.js` ファイルを作成する

## 1. index.html ファイルを作成する

ファイル名: `practice/3-dialog/index.html`

```html
<html>
  <body>
    <dialog id="exampleDialog">
      <p>これはダイアログ</p>
      <button id="closeButton">閉じる</button>
    </dialog>
    <script src="./main.js"></script>
  </body>
</html>
```

**解説:**
- `<dialog>` - ダイアログを作成する HTML 要素です
- `id="exampleDialog"` - JavaScript から操作するための ID を付けます
- ダイアログの中には、テキストやボタンなど、普通の HTML 要素を入れられます

## 2. main.js ファイルを作成する

ファイル名: `practice/3-dialog/main.js`

```javascript
// 何も書かない
```

まだ何も書きません。空のファイルを作成してください。

## 動作確認

`index.html` ファイルをブラウザで開いてください。

**期待する結果:**
- 何も表示されない（ダイアログは非表示の状態）

ダイアログは作成されましたが、まだ表示していません。

---

# サンプル2: ダイアログを表示する

実装例: `examples/2`

## 目標

JavaScript を使って、ダイアログを表示します。

## 作業

1. `main.js` を変更する

## 1. main.js を変更する

ファイル名: `practice/3-dialog/main.js`

```javascript
const dialog = document.getElementById("dialog")

dialog.showModal()
```

**解説:**
- `document.getElementById("dialog")` - ID が "dialog" の要素を取得します
- `showModal()` - ダイアログをモーダルとして表示します

**モーダルとは:**
- 画面の中央に表示される
- 背景が暗くなる（オーバーレイ）
- ダイアログを閉じるまで、他の操作ができなくなる

## 動作確認

ブラウザを更新してください。

**期待する結果:**
- ページを開くと同時にダイアログが表示される
- 背景が暗くなる
- 「これはダイアログ」と表示される

---

# サンプル3: ボタンでダイアログを開く

実装例: `examples/3`

## 目標

ボタンをクリックしたときに、ダイアログを開くようにします。

## 作業

1. `index.html` を変更する
2. `main.js` を変更する

## 1. index.html を変更する

ファイル名: `practice/3-dialog/index.html`

index.html の `<body>` の最初に、ボタンを追加します。

```html
<html>
  <body>
    <button>開く</button>
    <dialog id="exampleDialog">
      <p>これはダイアログ</p>
      <button id="closeButton">閉じる</button>
    </dialog>
    <script src="./main.js"></script>
  </body>
</html>
```

**解説:**
- `<button>開く</button>` - ダイアログを開くためのボタンを追加しました

## 2. main.js を変更する

ファイル名: `practice/3-dialog/main.js`

```javascript
const dialog = document.getElementById("dialog")
const openButton = document.querySelector("button")

openButton.addEventListener("click", () => {
  dialog.showModal()
})
```

**解説:**
- `document.querySelector("button")` - 最初の `<button>` 要素を取得します
- `addEventListener("click", () => { ... })` - ボタンがクリックされたときに実行する処理を登録します
- `() => { ... }` - アロー関数という書き方です

## 動作確認

ブラウザを更新してください。

**期待する結果:**
- 最初はダイアログが表示されていない
- 「開く」ボタンをクリックすると、ダイアログが表示される

---

# サンプル4: ダイアログを閉じる

実装例: `examples/4`

## 目標

ダイアログの中の「閉じる」ボタンで、ダイアログを閉じられるようにします。

## 作業

1. `main.js` を変更する

## 1. main.js を変更する

ファイル名: `practice/3-dialog/main.js`

```javascript
const dialog = document.getElementById("dialog")
const openButton = document.querySelector("button")
const closeButton = document.getElementById("closeButton")

openButton.addEventListener("click", () => {
  dialog.showModal()
})

closeButton.addEventListener("click", () => {
  dialog.close()
})
```

**解説:**
- `document.getElementById("closeButton")` - 閉じるボタンを取得します
- `dialog.close()` - ダイアログを閉じます

## 動作確認

ブラウザを更新してください。

**期待する結果:**
- 「開く」ボタンをクリックすると、ダイアログが表示される
- 「閉じる」ボタンをクリックすると、ダイアログが閉じる
- 何度でも開いたり閉じたりできる

---

# サンプル5: 入力を受け取る

実装例: `examples/5`

## 目標

ダイアログで名前を入力してもらい、その結果を画面に表示します。

## 作業

1. `index.html` を変更する
2. `main.js` を変更する

## 1. index.html を変更する

ファイル名: `practice/3-dialog/index.html`

```html
<html>
  <body>
    <button id="openButton">開く</button>
    <dialog id="dialog">
      <p>あなたの名前は？</p>
      <input type="text" id="nameInput" />
      <button id="submitButton">確定する</button>
    </dialog>
    <div id="result" hidden>
      あなたの名前は <span id="nameText"></span> です。
    </div>
    <script src="./main.js"></script>
  </body>
</html>
```

**解説:**
- `<input type="text" id="nameInput" />` - テキスト入力欄を追加しました
- `<div id="result" hidden>` - 結果を表示するエリアを追加しました
  - `hidden` - 最初は非表示にしています
- `<span id="nameText"></span>` - 入力された名前を表示する場所です

## 2. main.js を変更する

ファイル名: `practice/3-dialog/main.js`

```javascript
const dialog = document.getElementById("dialog")
const openButton = document.getElementById("openButton")
const nameText = document.getElementById("nameText")
const result = document.getElementById("result")
const nameInput = document.getElementById("nameInput")
const submitButton = document.getElementById("submitButton")

openButton.addEventListener("click", () => {
  dialog.showModal()
})

submitButton.addEventListener("click", () => {
  const name = nameInput.value;
  nameText.textContent = name;
  result.hidden = false;
  dialog.close()
})
```

**解説:**
- `nameInput.value` - 入力欄に入力された値を取得します
- `nameText.textContent = name` - 取得した値を `<span>` の中に設定します
- `result.hidden = false` - 結果エリアを表示します（hidden を解除）
- `dialog.close()` - ダイアログを閉じます

## 動作確認

ブラウザを更新してください。

**期待する結果:**
- 「開く」ボタンをクリックすると、ダイアログが表示される
- 「あなたの名前は？」という質問と入力欄が表示される
- 名前を入力して「確定する」ボタンをクリックする
- ダイアログが閉じて、「あなたの名前は ○○ です。」と表示される

**試してみること:**
- いろいろな名前を入力してみる
- 何も入力せずに「確定する」を押してみる

---

## まとめ

このセクションで学んだこと:

1. **dialog 要素** - ダイアログを作成する HTML タグ
2. **showModal()** - ダイアログをモーダル表示する
3. **close()** - ダイアログを閉じる
4. **イベントリスナー** - ボタンクリックなどのイベントを処理する
5. **DOM 操作** - 要素の取得、値の取得、テキストの設定
6. **hidden 属性** - 要素の表示/非表示を切り替える

ダイアログは、ユーザーに情報を入力してもらったり、確認メッセージを表示したりするときに使います。
第2章以降のアプリケーション開発でも、この知識を使います。

---

# 次の項

[setTimeout](../4-set-timeout/README.md)
