# 5. 非同期処理

この節では、JavaScriptの非同期処理について学びます。非同期処理は、時間のかかる処理を待つ間も他の処理を続けられるようにする仕組みです。

## 学習内容

- 非同期処理の基本概念
- Promiseの使い方
- async/awaitの使い方
- 実際のUI操作での非同期処理の活用

## サンプル一覧

1. [setTimeout の復習](#サンプル1-settimeout-の復習)
2. [関数化して遅延後に挨拶](#サンプル2-関数化して遅延後に挨拶)
3. [複数回呼び出し（固定の遅延）](#サンプル3-複数回呼び出し固定の遅延)
4. [複数回呼び出し（ランダムな遅延）](#サンプル4-複数回呼び出しランダムな遅延)
5. [Promiseで順番を制御](#サンプル5-promiseで順番を制御)
6. [ダイアログをPromiseで扱う](#サンプル6-ダイアログをpromiseで扱う)
7. [async/awaitで読みやすく](#サンプル7-asyncawaitで読みやすく)

---

# サンプル1: setTimeout の復習
実装例: `/examples/1`

## 目標

setTimeout の基本的な使い方を復習します。

## 作業前のディレクトリ構造

```
practice/
└── 5-async/
```

## 作業

1. HTMLファイルを作成
2. JavaScriptファイルを作成

## 1. HTMLファイルを作成

ファイル名: `practice/5-async/index.html`

```html
<html>
  <body>
    <script src="main.js"></script>
  </body>
</html>
```

基本的なHTMLファイルで、JavaScriptファイルを読み込みます。

## 2. JavaScriptファイルを作成

ファイル名: `practice/5-async/main.js`

```javascript
setTimeout(() => {
  console.log("こんにちは")
}, 500)
```

500ミリ秒（0.5秒）後に「こんにちは」と表示します。

## 動作確認

ブラウザで `index.html` を開き、開発者ツールのコンソールを確認します。

- 0.5秒後に「こんにちは」と表示される

## 作業後のディレクトリ構造

```
practice/
└── 5-async/
    ├── index.html
    └── main.js
```

---

# サンプル2: 関数化して遅延後に挨拶
実装例: `/examples/2`

## 目標

遅延処理を関数にまとめて、再利用しやすくします。

## 作業前のディレクトリ構造

```
practice/
└── 5-async/
    ├── index.html
    └── main.js
```

## 作業

1. JavaScriptファイルを更新

## 1. JavaScriptファイルを更新

ファイル名: `practice/5-async/main.js`

```javascript
function greetAfterDelay(name, delay) {
  setTimeout(() => {
    console.log(`こんにちは, ${name}! (delay=${delay} ms)`)
  }, delay)
}

greetAfterDelay("たろう", 1000)
```

**説明:**

- `greetAfterDelay` 関数は、名前と遅延時間を受け取ります
- 指定した時間後に、名前と遅延時間を表示します
- テンプレートリテラル（`` ` ` ``）を使って、変数を文字列に埋め込んでいます

## 動作確認

ブラウザで `index.html` を開き、開発者ツールのコンソールを確認します。

- 1秒後に「こんにちは, たろう! (delay=1000 ms)」と表示される

## 作業後のディレクトリ構造

```
practice/
└── 5-async/
    ├── index.html
    └── main.js
```

---

# サンプル3: 複数回呼び出し（固定の遅延）
実装例: `/examples/3`

## 目標

同じ関数を複数回呼び出して、順番に実行されることを確認します。

## 作業前のディレクトリ構造

```
practice/
└── 5-async/
    ├── index.html
    └── main.js
```

## 作業

1. JavaScriptファイルを更新

## 1. JavaScriptファイルを更新

ファイル名: `practice/5-async/main.js`

```javascript
function greetAfterDelay(name, delay) {
  setTimeout(() => {
    console.log(`こんにちは, ${name}! (delay=${delay} ms)`)
  }, delay)
}

greetAfterDelay("たろう", 1000)
greetAfterDelay("じろう", 2000)
```

**説明:**

- 1つ目の呼び出しは1秒後に「たろう」と表示
- 2つ目の呼び出しは2秒後に「じろう」と表示
- 遅延時間が異なるので、順番に表示されます

## 動作確認

ブラウザで `index.html` を開き、開発者ツールのコンソールを確認します。

- 1秒後に「こんにちは, たろう! (delay=1000 ms)」と表示される
- その1秒後（開始から2秒後）に「こんにちは, じろう! (delay=2000 ms)」と表示される

## 作業後のディレクトリ構造

```
practice/
└── 5-async/
    ├── index.html
    └── main.js
```

---

# サンプル4: 複数回呼び出し（ランダムな遅延）
実装例: `/examples/4`

## 目標

ランダムな遅延時間を使うと、実行順序が予測できないことを確認します。これが非同期処理の課題です。

## 作業前のディレクトリ構造

```
practice/
└── 5-async/
    ├── index.html
    └── main.js
```

## 作業

1. JavaScriptファイルを更新

## 1. JavaScriptファイルを更新

ファイル名: `practice/5-async/main.js`

```javascript
function greetAfterDelay(name, delay) {
  setTimeout(() => {
    console.log(`こんにちは, ${name}! (delay=${delay} ms)`)
  }, delay)
}

greetAfterDelay("たろう", Math.random() * 5 * 1000)
greetAfterDelay("じろう", Math.random() * 5 * 1000)
```

**説明:**

- `Math.random()` は 0 から 1 未満のランダムな数を返します
- `Math.random() * 5 * 1000` は 0 から 5000 ミリ秒（5秒）のランダムな時間になります
- どちらが先に表示されるかは、実行するたびに変わります

**問題点:**

- 「たろう」の後に「じろう」が表示されることを保証できません
- 非同期処理の順序を制御する必要があります

## 動作確認

ブラウザで `index.html` を開き、開発者ツールのコンソールを確認します。

- 「たろう」と「じろう」がランダムな順序で表示される
- ページを再読み込みすると、順序が変わることがある

## 作業後のディレクトリ構造

```
practice/
└── 5-async/
    ├── index.html
    └── main.js
```

---

# サンプル5: Promiseで順番を制御
実装例: `/examples/5`

## 目標

Promise（プロミス）を使って、非同期処理の順序を制御します。

## 作業前のディレクトリ構造

```
practice/
└── 5-async/
    ├── index.html
    └── main.js
```

## 作業

1. JavaScriptファイルを更新

## 1. JavaScriptファイルを更新

ファイル名: `practice/5-async/main.js`

```javascript
function greetAfterDelay(name, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`こんにちは, ${name}! (delay=${delay} ms)`)
      resolve()
    }, delay)
  })
}

greetAfterDelay("たろう", Math.random() * 5 * 1000)
  .then(() => {
    return greetAfterDelay("じろう", Math.random() * 5 * 1000)
  })
```

**説明:**

- **Promise（プロミス）** は、非同期処理が完了したかどうかを管理する仕組みです
- `new Promise((resolve) => {...})` で Promise を作成します
- `resolve()` を呼ぶと、「処理が完了した」ことを通知します
- `.then()` は、前の処理が完了してから次の処理を実行します
- これにより、ランダムな遅延時間でも必ず「たろう」→「じろう」の順序で表示されます

**用語:**

- **Promise**: 非同期処理の完了（または失敗）を表すオブジェクト
- **resolve**: Promise を「成功」状態にする関数
- **.then()**: Promise が成功した後に実行する処理を指定する

## 動作確認

ブラウザで `index.html` を開き、開発者ツールのコンソールを確認します。

- 必ず「たろう」が先に表示される
- その後に「じろう」が表示される
- 何度再読み込みしても順序は変わらない

## 作業後のディレクトリ構造

```
practice/
└── 5-async/
    ├── index.html
    └── main.js
```

---

# サンプル6: ダイアログをPromiseで扱う
実装例: `/examples/6`

## 目標

ダイアログでの入力を Promise で扱い、ユーザーの入力を待って次の処理を実行します。

## 作業前のディレクトリ構造

```
practice/
└── 5-async/
    ├── index.html
    └── main.js
```

## 作業

1. HTMLファイルを更新
2. JavaScriptファイルを更新

## 1. HTMLファイルを更新

ファイル名: `practice/5-async/index.html`

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

**説明:**

- ダイアログを開くボタン（`openButton`）
- 名前を入力するダイアログ（`dialog`）
- 入力結果を表示するエリア（`result`）

## 2. JavaScriptファイルを更新

ファイル名: `practice/5-async/main.js`

```javascript
const dialog = document.getElementById("dialog")
const openButton = document.getElementById("openButton")
const namteText = document.getElementById("nameText")
const result = document.getElementById("result")
const nameInput = document.getElementById("nameInput")
const submitButton = document.getElementById("submitButton")

function openNameDialog() {
  return new Promise((resolve) => {
    submitButton.addEventListener("click", () => {
      const name = nameInput.value;
      resolve(name)
    })
  })
}

openButton.addEventListener("click", () => {
  openNameDialog().then((name) => {
    result.hidden = false;
    namteText.textContent = name;
    dialog.close()
  })
})
```

**説明:**

- `openNameDialog()` 関数は Promise を返します
- ユーザーが「確定する」ボタンをクリックすると `resolve(name)` が呼ばれます
- `.then((name) => {...})` で、入力された名前を受け取って表示します
- Promise を使うことで、「ユーザーの入力を待つ」処理を分かりやすく書けます

**注意:** `namteText` はタイポ（本来は `nameText`）ですが、exampleの通りに記載しています。

## 動作確認

ブラウザで `index.html` を開きます。

- 「開く」ボタンをクリックするとダイアログが表示される
- 名前を入力して「確定する」をクリックする
- 入力した名前が表示される

## 作業後のディレクトリ構造

```
practice/
└── 5-async/
    ├── index.html
    └── main.js
```

---

# サンプル7: async/awaitで読みやすく
実装例: `/examples/7`

## 目標

async/await を使って、Promise をより読みやすく書きます。

## 作業前のディレクトリ構造

```
practice/
└── 5-async/
    ├── index.html
    └── main.js
```

## 作業

1. JavaScriptファイルを更新

## 1. JavaScriptファイルを更新

ファイル名: `practice/5-async/main.js`

```javascript
const dialog = document.getElementById("dialog")
const openButton = document.getElementById("openButton")
const namteText = document.getElementById("nameText")
const result = document.getElementById("result")
const nameInput = document.getElementById("nameInput")
const submitButton = document.getElementById("submitButton")

function openNameDialog() {
  return new Promise((resolve) => {
    submitButton.addEventListener("click", () => {
      const name = nameInput.value;
      resolve(name)
    })
  })
}

openButton.addEventListener("click", async () => {
  const name = await openNameDialog()
  result.hidden = false;
  namteText.textContent = name;
  dialog.close()
})
```

**説明:**

- `async () => {...}` の `async` は、この関数が非同期処理を含むことを示します
- `await openNameDialog()` の `await` は、Promise が完了するまで待つことを示します
- `.then()` を使った書き方と比べて、より読みやすく、同期処理のように書けます

**比較:**

```javascript
// .then() を使った書き方
openNameDialog().then((name) => {
  result.hidden = false;
  namteText.textContent = name;
  dialog.close()
})

// async/await を使った書き方
const name = await openNameDialog()
result.hidden = false;
namteText.textContent = name;
dialog.close()
```

**用語:**

- **async**: 非同期関数を定義するキーワード
- **await**: Promise の完了を待つキーワード（async 関数の中でのみ使える）

## 動作確認

ブラウザで `index.html` を開きます。

- 「開く」ボタンをクリックするとダイアログが表示される
- 名前を入力して「確定する」をクリックする
- 入力した名前が表示される
- サンプル6と同じ動作ですが、コードがより読みやすくなっています

## 作業後のディレクトリ構造

```
practice/
└── 5-async/
    ├── index.html
    └── main.js
```

---

# まとめ

この節では、非同期処理の基本から Promise、async/await まで学びました。

**学んだこと:**

1. **非同期処理の課題**: ランダムな遅延では実行順序を制御できない
2. **Promise**: 非同期処理の完了を管理する仕組み
3. **.then()**: Promise の完了後に処理を実行する
4. **async/await**: Promise をより読みやすく書く方法

これらの知識は、次の節以降でも頻繁に使います。特に、ユーザーの操作を待つ処理やサーバーとの通信で重要になります。

# 次の項

[6. アバター表示](../6-avater-view/README.md)
