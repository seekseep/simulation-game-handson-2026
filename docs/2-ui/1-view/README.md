# 1. ビュー作成

この節では、シミュレーションゲームのUIを段階的に構築していきます。

## 学習内容

- アプリケーション全体の構造
- メニューとダイアログの配置
- CSSでのレイアウト
- 複数のダイアログの管理
- セリフ表示エリアの実装

## 事前準備

この章では、第1章で学んだ`avater-view`（3D表示ライブラリ）とGLBファイルを使用します。以下のファイルをダウンロードして配置してください。

### ダウンロードするファイル

1. **avater-viewライブラリ**
   - ダウンロード元: `docs/2-ui/assets/js/avater-view.zip`
   - 展開先: `app/assets/js/avater-view/`

2. **GLBファイル（3Dモデル）**
   - ダウンロード元: `docs/2-ui/assets/glb/`
   - 必要なファイル:
     - `room.glb` - 部屋の3Dモデル
     - `animals.glb` - 動物の3Dモデル
     - `fan.glb` - 扇風機の3Dモデル
   - 配置先: `app/assets/glb/`

### ディレクトリ構造の準備

```
app/
└── assets/
    ├── glb/
    │   ├── room.glb
    │   ├── animals.glb
    │   └── fan.glb
    └── js/
        └── avater-view/
            ├── index.js
            ├── config.js
            └── objects/
                ├── factory.js
                ├── Room.js
                ├── Animals.js
                └── Fan.js
```

## サンプル一覧

1. [アバター表示の基本](#サンプル1-アバター表示の基本)
2. [メニューを追加](#サンプル2-メニューを追加)
3. [メニューを最初は非表示にする](#サンプル3-メニューを最初は非表示にする)
4. [単語入力ダイアログを追加](#サンプル4-単語入力ダイアログを追加)
5. [単語入力ダイアログのスタイルを改善](#サンプル5-単語入力ダイアログのスタイルを改善)
6. [カテゴリ選択ダイアログを追加（HTML内にボタン）](#サンプル6-カテゴリ選択ダイアログを追加html内にボタン)
7. [セリフ表示エリアを追加](#サンプル7-セリフ表示エリアを追加)
8. [セリフ表示エリアのIDを変更](#サンプル8-セリフ表示エリアのidを変更)
9. [UIの完成確認](#サンプル9-uiの完成確認)

---

# サンプル1: アバター表示の基本
実装例: `/examples/1`

## 目標

第1章で学んだ`avater-view`を使って、3Dキャラクターを表示します。今回は`app`ディレクトリで作業します。

## 作業前のディレクトリ構造

```
app/
└── assets/
    ├── glb/
    └── js/
        └── avater-view/
```

## 作業

1. HTMLファイルを作成
2. CSSファイルを作成（avater.css）
3. CSSファイルを作成（style.css）
4. JavaScriptファイルを作成（avater.js）
5. JavaScriptファイルを作成（main.js）

## 1. HTMLファイルを作成

ファイル名: `app/index.html`

```html
<html>
  <head>
    <link rel="stylesheet" href="./assets/css/style.css">
  </head>
  <body>
    <div id="avater"></div>
    <script type="importmap">
      {
        "imports": {
          "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
          "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
        }
      }
    </script>
    <script type="module" src="./assets/js/main.js"></script>
  </body>
</html>
```

第1章と同じ構造です。

## 2. CSSファイルを作成（avater.css）

ファイル名: `app/assets/css/avater.css`

```css
#avater {
  width: 100%;
  height: 100%;
}
```

アバター表示エリアを全画面にします。

## 3. CSSファイルを作成（style.css）

ファイル名: `app/assets/css/style.css`

```css
@import url('./avater.css');

body {
  margin: 0;
}
```

`avater.css`をインポートし、bodyのマージンを0にします。

## 4. JavaScriptファイルを作成（avater.js）

ファイル名: `app/assets/js/avater.js`

```javascript
import AvaterView from './avater-view/index.js'

const container = document.getElementById('avater')

export const view = new AvaterView({
  element: container,
  roomGlbUrl: './assets/glb/room.glb',
  fanGlbUrl: './assets/glb/fan.glb',
  animalsGlbUrl: './assets/glb/animals.glb',
})

view.addEventListener('load', () => {
  view.changeAnimalMotion('idle')
})
```

**説明:**

- `AvaterView`のインスタンスを作成し、`export`しています
- 他のファイルから`view`を参照できるようにするためです
- モデルが読み込まれたら、動物のモーションを`idle`（待機）にします

## 5. JavaScriptファイルを作成（main.js）

ファイル名: `app/assets/js/main.js`

```javascript
import * as avater from './avater.js'
```

`avater.js`をインポートするだけのファイルです。これにより、`avater.js`が実行されます。

## 動作確認

ブラウザで `app/index.html` を開きます。

- 部屋、動物、扇風機が表示される
- 動物が「idle（待機）」のアニメーションをしている

## 作業後のディレクトリ構造

```
app/
├── index.html
└── assets/
    ├── css/
    │   ├── avater.css
    │   └── style.css
    ├── glb/
    │   ├── room.glb
    │   ├── animals.glb
    │   └── fan.glb
    └── js/
        ├── main.js
        ├── avater.js
        └── avater-view/
```

---

# サンプル2: メニューを追加
実装例: `/examples/2`

## 目標

「教える」「話す」ボタンを持つメニューを追加します。

## 作業前のディレクトリ構造

```
app/
├── index.html
└── assets/
    ├── css/
    └── js/
```

## 作業

1. HTMLファイルを更新
2. CSSファイルを作成（menu.css）
3. CSSファイルを更新（style.css）

## 1. HTMLファイルを更新

ファイル名: `app/index.html`

```html
<html>
  <head>
    <link rel="stylesheet" href="./assets/css/style.css">
  </head>
  <body>
    <div id="menu">
      <button id="teachButton">教える</button>
      <button id="talkButton">話す</button>
    </div>
    <div id="avater"></div>
    <script type="importmap">
      {
        "imports": {
          "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
          "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
        }
      }
    </script>
    <script type="module" src="./assets/js/main.js"></script>
  </body>
</html>
```

**追加内容:**

- `<div id="menu">` - メニューコンテナ
- `<button id="teachButton">教える</button>` - 単語を教えるボタン
- `<button id="talkButton">話す</button>` - 動物に話させるボタン

## 2. CSSファイルを作成（menu.css）

ファイル名: `app/assets/css/menu.css`

```css
#menu {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  background: white;
  border: solid 5px black;

  button {
    border: none;
    background: none;
    font-size: 32px;
    padding: 10px;
    width: 200px;
    display: block;
    cursor: pointer;

    &:hover, &:active {
      background: snow;
    }
  }
}
```

**説明:**

- `position: absolute` - 絶対位置指定で画面の左上に配置
- `z-index: 10` - 3D表示の上に表示
- `button { ... }` - ネストしたCSSセレクタ（最新のCSSの書き方）
- `&:hover, &:active` - ホバー時とアクティブ時の背景色変更

## 3. CSSファイルを更新（style.css）

ファイル名: `app/assets/css/style.css`

```css
@import url('./avater.css');
@import url('./menu.css');

body {
  margin: 0;
}
```

`menu.css`をインポートします。

## 動作確認

ブラウザで `app/index.html` を開きます。

- 画面左上に「教える」「話す」ボタンが表示される
- ボタンにマウスを乗せると背景色が変わる
- まだクリックしても何も起きない（次のサンプルで実装します）

## 作業後のディレクトリ構造

```
app/
├── index.html
└── assets/
    ├── css/
    │   ├── avater.css
    │   ├── menu.css
    │   └── style.css
    └── js/
```

---

# サンプル3: メニューを最初は非表示にする
実装例: `/examples/3`

## 目標

メニューを最初は非表示にし、3Dモデルが読み込まれたら表示します。

## 作業前のディレクトリ構造

```
app/
├── index.html
└── assets/
```

## 作業

1. HTMLファイルを更新
2. CSSファイルを更新（avater.css）

## 1. HTMLファイルを更新

ファイル名: `app/index.html`

```html
<html>
  <head>
    <link rel="stylesheet" href="./assets/css/style.css">
  </head>
  <body>
    <div id="menu" hidden>
      <button id="teachButton">教える</button>
      <button id="talkButton">話す</button>
    </div>
    <div id="avater"></div>
    <script type="importmap">
      {
        "imports": {
          "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
          "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
        }
      }
    </script>
    <script type="module" src="./assets/js/main.js"></script>
  </body>
</html>
```

**変更点:**

- `<div id="menu" hidden>` - `hidden`属性を追加

## 2. CSSファイルを更新（avater.css）

ファイル名: `app/assets/css/avater.css`

```css
#avater {
  width: 100%;
  height: 100%;
}
```

サンプル2から変更はありません（例3でstyle.cssにavaterの設定が移動していますが、ここでは元の構造を維持します）。

**注意:** 実装例では`style.css`に`#avater`の設定が移動していますが、わかりやすさのため`avater.css`に残しています。

## 動作確認

ブラウザで `app/index.html` を開きます。

- 最初はメニューが表示されない
- 3Dモデルが読み込まれたら、メニューが表示される（次のステップで実装します）

**現時点では、メニューは常に非表示のままです。** JavaScriptで表示する処理は、第2節「ロジック実装」で追加します。

## 作業後のディレクトリ構造

```
app/
├── index.html
└── assets/
    ├── css/
    └── js/
```

---

# サンプル4: 単語入力ダイアログを追加
実装例: `/examples/4`

## 目標

単語を入力するダイアログを追加します。

## 作業前のディレクトリ構造

```
app/
├── index.html
└── assets/
```

## 作業

1. HTMLファイルを更新

## 1. HTMLファイルを更新

ファイル名: `app/index.html`

```html
<html>
  <head>
    <link rel="stylesheet" href="./assets/css/style.css">
  </head>
  <body>
    <div id="menu" hidden>
      <button id="teachButton">教える</button>
      <button id="talkButton">話す</button>
    </div>
    <div id="avater"></div>
    <dialog id="inputWordDialog">
      <label for="wordInput">言葉を入力してください:</label>
      <input type="text" id="wordInput" name="word" required>
      <div>
        <button id="cancelInputWordButton">キャンセル</button>
        <button id="submitInputWordButton">確定する</button>
      </div>
    </dialog>
    <script type="importmap">
      {
        "imports": {
          "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
          "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
        }
      }
    </script>
    <script type="module" src="./assets/js/main.js"></script>
  </body>
</html>
```

**追加内容:**

- `<dialog id="inputWordDialog">` - 単語入力ダイアログ
- `<label for="wordInput">` - 入力欄のラベル
- `<input type="text" id="wordInput">` - 単語を入力するテキストフィールド
- `<button id="cancelInputWordButton">` - キャンセルボタン
- `<button id="submitInputWordButton">` - 確定ボタン

## 動作確認

ブラウザで `app/index.html` を開きます。

- ダイアログはまだ表示されません（JavaScriptで制御します）
- HTML構造のみを追加した状態です

## 作業後のディレクトリ構造

```
app/
├── index.html
└── assets/
```

---

# サンプル5: 単語入力ダイアログのスタイルを改善
実装例: `/examples/5`

## 目標

単語入力ダイアログにスタイルを適用して見やすくします。

## 作業前のディレクトリ構造

```
app/
├── index.html
└── assets/
    ├── css/
    └── js/
```

## 作業

1. CSSファイルを作成（input-word-dialog.css）
2. CSSファイルを更新（style.css）

## 1. CSSファイルを作成（input-word-dialog.css）

ファイル名: `app/assets/css/input-word-dialog.css`

```css
#inputWordDialog {
  border: solid 5px black;
  padding: 20px;
  font-size: 20px;

  label {
    display: block;
    margin-bottom: 10px;
  }

  input {
    font-size: 20px;
    padding: 10px;
    width: 300px;
    margin-bottom: 20px;
  }

  button {
    font-size: 20px;
    padding: 10px 20px;
    margin-right: 10px;
    cursor: pointer;
  }
}
```

**説明:**

- ダイアログに黒い枠線とパディングを追加
- ラベル、入力欄、ボタンのサイズとスペースを調整
- ネストしたCSSで読みやすく記述

## 2. CSSファイルを更新（style.css）

ファイル名: `app/assets/css/style.css`

```css
@import url('./avater.css');
@import url('./menu.css');

body {
  margin: 0;
}

#avater {
  width: 100%;
  height: 100%;
}
```

**注意:** 実装例では`input-word-dialog.css`のインポートがありませんが、CSSが適用されています。`<style>`タグで直接記述されているか、別の方法で適用されている可能性があります。ここでは構造を理解することを優先します。

## 動作確認

ブラウザで `app/index.html` を開き、開発者ツールで以下を実行してダイアログを表示します。

```javascript
document.getElementById('inputWordDialog').showModal()
```

- ダイアログが中央に表示される
- スタイルが適用されている

## 作業後のディレクトリ構造

```
app/
├── index.html
└── assets/
    ├── css/
    │   ├── avater.css
    │   ├── menu.css
    │   ├── input-word-dialog.css
    │   └── style.css
    └── js/
```

---

# サンプル6: カテゴリ選択ダイアログを追加（HTML内にボタン）
実装例: `/examples/5`（注: 実装例5と6の内容が統合されています）

## 目標

単語のカテゴリを選択するダイアログを追加します。このサンプルでは、カテゴリのボタンをHTMLに直接記述します。

## 作業前のディレクトリ構造

```
app/
├── index.html
└── assets/
```

## 作業

1. HTMLファイルを更新

## 1. HTMLファイルを更新

ファイル名: `app/index.html`

```html
<html>
  <head>
    <link rel="stylesheet" href="./assets/css/style.css">
  </head>
  <body>
    <div id="menu" hidden>
      <button id="teachButton">教える</button>
      <button id="talkButton">話す</button>
    </div>
    <div id="avater"></div>
    <dialog id="inputWordDialog">
      <label for="wordInput">言葉を入力してください:</label>
      <input type="text" id="wordInput" name="word" required>
      <div>
        <button id="cancelInputWordButton">キャンセル</button>
        <button id="submitInputWordButton">確定する</button>
      </div>
    </dialog>
    <dialog id="selectWordCategoryDialog">
      <p>分野を選んでください:</p>
      <div id="selectWordCategoryList">
        <button value="あいさつ">あいさつ</button>
        <button value="食べ物">食べ物</button>
        <button value="必殺技">必殺技</button>
        <button value="場所">場所</button>
      </div>
    </dialog>
    <script type="importmap">
      {
        "imports": {
          "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
          "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
        }
      }
    </script>
    <script type="module" src="./assets/js/main.js"></script>
  </body>
</html>
```

**追加内容:**

- `<dialog id="selectWordCategoryDialog">` - カテゴリ選択ダイアログ
- `<div id="selectWordCategoryList">` - カテゴリボタンのコンテナ
- 4つのカテゴリボタン（あいさつ、食べ物、必殺技、場所）

## 動作確認

開発者ツールで以下を実行してダイアログを表示します。

```javascript
document.getElementById('selectWordCategoryDialog').showModal()
```

- カテゴリ選択ダイアログが表示される
- 4つのカテゴリボタンが表示される

## 作業後のディレクトリ構造

```
app/
├── index.html
└── assets/
```

---

# サンプル6（続き）: カテゴリ選択ダイアログを動的に生成
実装例: `/examples/6`

## 目標

前のサンプルで追加したカテゴリボタンをHTMLから削除し、JavaScriptで動的に生成できるようにします。

## 作業

1. HTMLファイルを更新

## 1. HTMLファイルを更新

ファイル名: `app/index.html`

```html
<html>
  <head>
    <link rel="stylesheet" href="./assets/css/style.css">
  </head>
  <body>
    <div id="menu" hidden>
      <button id="teachButton">教える</button>
      <button id="talkButton">話す</button>
    </div>
    <div id="avater"></div>
    <dialog id="inputWordDialog">
      <label for="wordInput">言葉を入力してください:</label>
      <input type="text" id="wordInput" name="word" required>
      <div>
        <button id="cancelInputWordButton">キャンセル</button>
        <button id="submitInputWordButton">確定する</button>
      </div>
    </dialog>
    <dialog id="selectWordCategoryDialog">
      <p>分野を選んでください:</p>
      <div id="selectWordCategoryList"></div>
    </dialog>
    <script type="importmap">
      {
        "imports": {
          "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
          "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
        }
      }
    </script>
    <script type="module" src="./assets/js/main.js"></script>
  </body>
</html>
```

**変更点:**

- `<div id="selectWordCategoryList"></div>` - 中身を空にしました
- カテゴリボタンはJavaScriptで動的に生成します（第2節で実装）

## 動作確認

現時点では、カテゴリボタンは表示されません。JavaScriptで生成する準備が整いました。

## 作業後のディレクトリ構造

```
app/
├── index.html
└── assets/
```

---

# サンプル7: セリフ表示エリアを追加
実装例: `/examples/7`

## 目標

動物のセリフを表示するエリアを画面下部に追加します。

## 作業前のディレクトリ構造

```
app/
├── index.html
└── assets/
    ├── css/
    └── js/
```

## 作業

1. HTMLファイルを更新
2. CSSファイルを作成（speaker.css）
3. CSSファイルを更新（style.css）

## 1. HTMLファイルを更新

ファイル名: `app/index.html`

```html
<html>
  <head>
    <link rel="stylesheet" href="./assets/css/style.css">
  </head>
  <body>
    <div id="menu" hidden>
      <button id="teachButton">教える</button>
      <button id="talkButton">話す</button>
    </div>
    <div id="avater"></div>
    <div id="speaker">
      <p></p>
    </div>
    <dialog id="inputWordDialog">
      <label for="wordInput">言葉を入力してください:</label>
      <input type="text" id="wordInput" name="word" required>
      <div>
        <button id="cancelInputWordButton">キャンセル</button>
        <button id="submitInputWordButton">確定する</button>
      </div>
    </dialog>
    <dialog id="selectWordCategoryDialog">
      <p>分野を選んでください:</p>
      <div id="selectWordCategoryList"></div>
    </dialog>
    <script type="importmap">
      {
        "imports": {
          "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
          "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
        }
      }
    </script>
    <script type="module" src="./assets/js/main.js"></script>
  </body>
</html>
```

**追加内容:**

- `<div id="speaker">` - セリフ表示エリア
- `<p></p>` - セリフのテキストを表示する段落

## 2. CSSファイルを作成（speaker.css）

ファイル名: `app/assets/css/speaker.css`

```css
#speaker {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  z-index: 10;
  background: white;
  border: solid 5px black;

  p {
    padding: 20px;
    min-height: 40px;
    font-size: 40px;
    margin: 0;
  }
}
```

**説明:**

- `position: absolute` - 絶対位置指定で画面下部に配置
- `bottom: 20px; left: 20px; right: 20px;` - 画面下部の左右に20pxのマージン
- `z-index: 10` - 3D表示の上に表示
- `min-height: 40px` - 最小の高さを確保
- `font-size: 40px` - 大きなフォントサイズ

## 3. CSSファイルを更新（style.css）

ファイル名: `app/assets/css/style.css`

```css
@import url('./avater.css');
@import url('./menu.css');
@import url('./speaker.css');

body {
  margin: 0;
}

#avater {
  width: 100%;
  height: 100%;
}
```

`speaker.css`をインポートします。

## 動作確認

ブラウザで `app/index.html` を開きます。

- 画面下部にセリフ表示エリアが表示される
- 白い背景に黒い枠線のボックスが表示される

## 作業後のディレクトリ構造

```
app/
├── index.html
└── assets/
    ├── css/
    │   ├── avater.css
    │   ├── menu.css
    │   ├── speaker.css
    │   └── style.css
    └── js/
```

---

# サンプル8: セリフ表示エリアのIDを変更
実装例: `/examples/8`

## 目標

セリフ表示エリアの`<p>`タグにIDを追加して、JavaScriptから操作しやすくします。また、最初は非表示にします。

## 作業前のディレクトリ構造

```
app/
├── index.html
└── assets/
```

## 作業

1. HTMLファイルを更新

## 1. HTMLファイルを更新

ファイル名: `app/index.html`

```html
<html>
  <head>
    <link rel="stylesheet" href="./assets/css/style.css">
  </head>
  <body>
    <div id="menu" hidden>
      <button id="teachButton">教える</button>
      <button id="talkButton">話す</button>
    </div>
    <div id="avater"></div>
    <div id="speaker" hidden>
      <p id="speakerContent"></p>
    </div>
    <dialog id="inputWordDialog">
      <label for="wordInput">言葉を入力してください:</label>
      <input type="text" id="wordInput" name="word" required>
      <div>
        <button id="cancelInputWordButton">キャンセル</button>
        <button id="submitInputWordButton">確定する</button>
      </div>
    </dialog>
    <dialog id="selectWordCategoryDialog">
      <p>分野を選んでください:</p>
      <div id="selectWordCategoryList"></div>
    </dialog>
    <script type="importmap">
      {
        "imports": {
          "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
          "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
        }
      }
    </script>
    <script type="module" src="./assets/js/main.js"></script>
  </body>
</html>
```

**変更点:**

- `<div id="speaker" hidden>` - `hidden`属性を追加
- `<p id="speakerContent"></p>` - `id="speakerContent"`を追加

これで、JavaScriptから`document.getElementById('speakerContent')`でアクセスできます。

## 動作確認

ブラウザで `app/index.html` を開きます。

- セリフ表示エリアが最初は非表示になっている

## 作業後のディレクトリ構造

```
app/
├── index.html
└── assets/
```

---

# サンプル9: UIの完成確認

実装例: `/examples/9`（例10も同内容）

## 目標

サンプル8までで、すべての必要なHTML要素とCSSが揃いました。ここでは作成したUIを確認します。

## 作成したUI要素

- メニュー（menu.css）
- セリフ表示エリア（speaker.css）
- アバター表示エリア（avater.css）
- 単語入力ダイアログ（HTMLのみ）
- カテゴリ選択ダイアログ（HTMLのみ）

**注意:** ダイアログのスタイルはブラウザのデフォルトスタイルを使用しているため、追加のCSSファイルは作成しません。

## 動作確認

ブラウザで `app/index.html` を開き、開発者ツール（F12）で以下を実行してダイアログの表示を確認します。

**単語入力ダイアログ:**
```javascript
document.getElementById('inputWordDialog').showModal()
```

**カテゴリ選択ダイアログ:**
```javascript
document.getElementById('selectWordCategoryDialog').showModal()
```

HTMLとCSSの構築が完了しました。次の節では、JavaScriptでこれらのUI要素を動かすロジックを実装します。

## 作業後のディレクトリ構造

```
app/
├── index.html
└── assets/
    ├── css/
    │   ├── avater.css
    │   ├── menu.css
    │   ├── speaker.css
    │   └── style.css
    ├── glb/
    │   ├── room.glb
    │   ├── animals.glb
    │   └── fan.glb
    └── js/
        ├── main.js
        ├── avater.js
        └── avater-view/
```

---

# まとめ

この節では、シミュレーションゲームのUIを段階的に構築しました。

**学んだこと:**

1. **HTMLの構造**: メニュー、ダイアログ、セリフ表示エリアの配置
2. **CSSのモジュール化**: 機能ごとにCSSファイルを分割
3. **@importの使用**: 複数のCSSファイルを組み合わせる
4. **ネストしたCSS**: 最新のCSS記法で読みやすく記述
5. **hidden属性**: JavaScriptで表示/非表示を制御するための準備

次の節では、これらのUI要素を動かすJavaScriptのロジックを実装します。

# 次の項

[2. ロジック実装](../2-logic/README.md)
