# setTimeout

このセクションでは、`setTimeout` を使って、時間を扱う処理を学びます。
アニメーションの基礎になる重要な概念です。

## 準備

practice ディレクトリの中に、このセクション用のディレクトリを作成します。

```bash
cd practice
mkdir 4-set-timeout
cd 4-set-timeout
```

---

# サンプル1: 基本のHTML

実装例: `examples/1`

## 目標

まず、基本となる HTML を作成します。犬の絵文字とボタンを表示するだけです。

## 作業

1. `index.html` ファイルを作成する
2. `main.js` ファイルを作成する

## 1. index.html ファイルを作成する

ファイル名: `practice/4-set-timeout/index.html`

```html
<html>
  <body>
    <button>クリック</button>
    <div>🐕️</div>
  </body>
</html>
```

## 2. main.js ファイルを作成する

ファイル名: `practice/4-set-timeout/main.js`

```javascript
// 何も書かない
```

空のファイルを作成してください。

## 動作確認

`index.html` ファイルをブラウザで開いてください。

**期待する結果:**
- ボタンと犬の絵文字が表示される
- ボタンをクリックしても何も起きない

---

# サンプル2: ボタンで犬を表示

実装例: `examples/2`

## 目標

ボタンをクリックしたら、犬の絵文字を表示します（まだ setTimeout は使いません）。

## 作業

1. `index.html` を変更する
2. `main.js` を変更する

## 1. index.html を変更する

ファイル名: `practice/4-set-timeout/index.html`

```html
<html>
  <body>
    <button id="button">クリック</button>
    <div id="dog" hidden>🐕️</div>
    <script src="main.js"></script>
  </body>
</html>
```

**解説:**
- `hidden` - 最初は非表示にします
- `<script src="main.js"></script>` - JavaScript ファイルを読み込みます

## 2. main.js を変更する

ファイル名: `practice/4-set-timeout/main.js`

```javascript
const button = document.getElementById("button")
const dog = document.getElementById("dog")

button.addEventListener("click", () => {
  dog.hidden = false
})
```

**解説:**
- ボタンをクリックしたら、`hidden` を `false` にして表示します

## 動作確認

ブラウザを更新してください。

**期待する結果:**
- 最初は犬が非表示
- ボタンをクリックすると、即座に犬が表示される

---

# サンプル3: setTimeout で遅延表示

実装例: `examples/3`

## 目標

`setTimeout` を使って、ボタンをクリックしてから 500ms（0.5秒）後に犬を表示します。

## 作業

1. `main.js` を変更する

## 1. main.js を変更する

ファイル名: `practice/4-set-timeout/main.js`

```javascript
const button = document.getElementById("button")
const dog = document.getElementById("dog")

button.addEventListener("click", () => {
  setTimeout(() => {
    dog.hidden = false
  }, 500)
})
```

**解説:**
- `setTimeout(関数, 時間)` - 指定した時間（ミリ秒）後に関数を実行します
- `500` - 500ミリ秒 = 0.5秒
- `() => { ... }` - 実行する処理をアロー関数で書きます

## 動作確認

ブラウザを更新してください。

**期待する結果:**
- ボタンをクリックする
- 0.5秒待つ
- 犬が表示される

---

# サンプル4: 複数の setTimeout

実装例: `examples/4`

## 目標

複数の `setTimeout` を使って、段階的にアニメーションします。

## 作業

1. `index.html` を変更する
2. `main.js` を変更する

## 1. index.html を変更する

ファイル名: `practice/4-set-timeout/index.html`

```html
<html>
  <body>
    <button id="button">クリック</button>
    <div id="barking"></div>
    <script src="main.js"></script>
  </body>
</html>
```

## 2. main.js を変更する

ファイル名: `practice/4-set-timeout/main.js`

```javascript
const button = document.getElementById("button")
const barking = document.getElementById("barking")

button.addEventListener("click", () => {
  barking.textContent = "💥"
  setTimeout(() => {
    barking.textContent = "💥💥"
  }, 500)
  setTimeout(() => {
    barking.textContent = "💥💥💥"
  }, 1500)
  setTimeout(() => {
    barking.textContent = "💥💥💥💥"
  }, 2000)
})
```

**解説:**
- 0ms: 💥 （即座に）
- 500ms後: 💥💥
- 1500ms後: 💥💥💥
- 2000ms後: 💥💥💥💥

## 動作確認

ブラウザを更新してください。

**期待する結果:**
- ボタンをクリックすると、💥が少しずつ増えていく

---

# サンプル5: ループと setTimeout

実装例: `examples/5`

## 目標

ループを使って、サンプル4と同じ効果を短いコードで実現します。

## 作業

1. `main.js` を変更する

## 1. main.js を変更する

ファイル名: `practice/4-set-timeout/main.js`

```javascript
const button = document.getElementById("button")
const barking = document.getElementById("barking")

button.addEventListener("click", () => {
  for (let i = 1; i <= 4; i++) {
      setTimeout(() => {
        barking.textContent = "💥".repeat(i)
      }, i * 500)
  }
})
```

**解説:**
- `for (let i = 1; i <= 4; i++)` - 1から4まで繰り返します
- `"💥".repeat(i)` - 💥を i 回繰り返した文字列を作ります
- `i * 500` - i が 1 なら 500ms、2 なら 1000ms...と計算されます

**実行される内容:**
- i=1: 500ms後に 💥
- i=2: 1000ms後に 💥💥
- i=3: 1500ms後に 💥💥💥
- i=4: 2000ms後に 💥💥💥💥

## 動作確認

ブラウザを更新してください。

**期待する結果:**
- サンプル4と同じ動作（💥が少しずつ増える）

---

# サンプル6: slice で一文字ずつ表示

実装例: `examples/6`

## 目標

文字列の `slice` メソッドを使って、文字を一つずつ表示します。

## 作業

1. `index.html` を変更する（犬の絵文字を追加）
2. `main.js` を変更する

## 1. index.html を変更する

ファイル名: `practice/4-set-timeout/index.html`

```html
<html>
  <body>
    <button id="button">クリック</button>
    <div>
      <span id="barking"></span>
      <span id="dog">🐕️</span>
    </div>
    <script src="main.js"></script>
  </body>
</html>
```

## 2. main.js を変更する

ファイル名: `practice/4-set-timeout/main.js`

```javascript
const button = document.getElementById("button")
const barking = document.getElementById("barking")

button.addEventListener("click", () => {
  const barkingContent = "💥💥💥💥"

  for (let i = 1; i <= barkingContent.length; i++) {
      setTimeout(() => {
        barking.textContent = barkingContent.slice(0, i)
      }, i * 500)
  }
})
```

**解説:**
- `barkingContent.length` - 文字列の長さ（4文字）
- `barkingContent.slice(0, i)` - 0文字目から i 文字目までを切り出します
  - i=1: "💥"
  - i=2: "💥💥"
  - i=3: "💥💥💥"
  - i=4: "💥💥💥💥"

## 動作確認

ブラウザを更新してください。

**期待する結果:**
- 💥が一つずつ増えていく
- 最後に犬の絵文字が右側に表示される

---

# サンプル7: 日本語テキストのアニメーション

実装例: `examples/7`

## 目標

日本語のテキスト「わんわんわんわん」を一文字ずつ表示します。

## 作業

1. `main.js` を変更する

## 1. main.js を変更する

ファイル名: `practice/4-set-timeout/main.js`

```javascript
const button = document.getElementById("button")
const barking = document.getElementById("barking")

button.addEventListener("click", () => {
  const barkingContent = "わんわんわんわん"

  for (let i = 1; i <= barkingContent.length; i++) {
      setTimeout(() => {
        barking.textContent = barkingContent.slice(0, i)
      }, i * 500)
  }
})
```

**解説:**
- `barkingContent = "わんわんわんわん"` に変更しただけです
- 同じ仕組みで日本語も一文字ずつ表示できます

## 動作確認

ブラウザを更新してください。

**期待する結果:**
- 「わ」「わん」「わんわ」...と一文字ずつ増えていく
- 0.5秒ごとに文字が追加される

---

## まとめ

このセクションで学んだこと:

1. **setTimeout の基本** - 指定時間後に処理を実行
2. **複数の setTimeout** - 段階的なアニメーション
3. **ループと組み合わせ** - 繰り返し処理を簡潔に書く
4. **文字列操作** - repeat や slice を使った文字列処理
5. **テキストアニメーション** - 一文字ずつ表示する仕組み

`setTimeout` は、アニメーションや時間差で何かを実行したいときに使います。
次のセクションでは、さらに高度な非同期処理を学びます。

---

# 次の項

[非同期処理](../5-async/README.md)
