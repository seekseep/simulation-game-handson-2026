# 6. アバター表示

この節では、Three.jsを使って3Dキャラクター（アバター）を表示する方法を学びます。

## 学習内容

- Three.jsの基本的な使い方
- 3Dモデル（GLBファイル）の読み込み
- イベントリスナーの実装
- 3Dオブジェクトのクリック検出
- アニメーションの制御

## サンプル一覧

1. [基本的な3Dシーンを作成](#サンプル1-基本的な3dシーンを作成)
2. [動物のモーションを変更](#サンプル2-動物のモーションを変更)
3. [動物のクリックイベントを追加](#サンプル3-動物のクリックイベントを追加)
4. [クリックで動物のモーションを変更](#サンプル4-クリックで動物のモーションを変更)

---

# サンプル1: 基本的な3Dシーンを作成
実装例: `/examples/1`

## 目標

Three.jsを使って、部屋・動物・扇風機の3Dモデルを表示します。

## 作業前のディレクトリ構造

```
practice/
└── 6-avater-view/
```

## 作業

1. HTMLファイルを作成
2. CSSファイルを作成
3. JavaScriptのメインファイルを作成
4. AvaterViewクラスを作成
5. 設定ファイルを作成
6. 3Dオブジェクト作成用のファイルを作成
7. GLBファイルを配置

## 1. HTMLファイルを作成

ファイル名: `practice/6-avater-view/index.html`

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

**説明:**

- `<script type="importmap">` は、モジュールのインポート時に使う名前（`three`）と実際のURLを対応付けます
- これにより、`import * as THREE from 'three'` と書くだけでThree.jsを使えます
- `<script type="module">` は、JavaScriptをES6モジュールとして読み込みます

**用語:**

- **Import Map**: モジュール名とURLの対応表
- **ES6 Module**: `import`/`export` を使えるJavaScriptの仕組み

## 2. CSSファイルを作成

ファイル名: `practice/6-avater-view/assets/css/style.css`

```css
body {
  margin: 0;
}

#avater {
  width: 100%;
  height: 100%;
}
```

3Dシーンを全画面表示するためのスタイルです。

## 3. JavaScriptのメインファイルを作成

ファイル名: `practice/6-avater-view/assets/js/main.js`

```javascript
import AvaterView from './avater-view/index.js'

const container = document.getElementById('avater')

new AvaterView({
  element: container,
  roomGlbUrl: './assets/glb/room.glb',
  fanGlbUrl: './assets/glb/fan.glb',
  animalsGlbUrl: './assets/glb/animals.glb',
})
```

**説明:**

- `AvaterView` クラスをインポートして、インスタンスを作成します
- 3つのGLBファイル（部屋、扇風機、動物）のパスを指定します

**用語:**

- **GLB**: 3Dモデルのファイル形式（GLTF形式のバイナリ版）

## 4. AvaterViewクラスを作成

ファイル名: `practice/6-avater-view/assets/js/avater-view/index.js`

このファイルは約200行あり、Three.jsの初期化やアニメーションループなどを含みます。主な処理:

- **Scene（シーン）**: 3Dオブジェクトを配置する空間
- **Camera（カメラ）**: 3D空間を見る視点
- **Renderer（レンダラー）**: 3D空間を画面に描画
- **Lights（ライト）**: 3Dオブジェクトを照らす光源
- **Controls（コントロール）**: マウスで視点を操作

**主要なメソッド:**

```javascript
constructor() {
  // シーン、カメラ、レンダラーを初期化
  // ライトを追加
  // コントロールを設定
  // リサイズ対応
}

async initObjects() {
  // 3Dモデル（GLB）を読み込み
  // シーンに追加
}

animate() {
  // アニメーションループ（毎フレーム呼ばれる）
  // 画面を更新
}
```

**詳細は実装例を参照してください。**

## 5. 設定ファイルを作成

ファイル名: `practice/6-avater-view/assets/js/avater-view/config.js`

カメラの位置、ライトの強度、オブジェクトのスケールなどの設定値を定義します。

**例:**

```javascript
export const CAMERA = Object.freeze({
  FOV: 30,
  NEAR: 0.1,
  FAR: 1000,
  DEFAULT_POSITION: new THREE.Vector3(-120, 20, 30),
  DEFAULT_TARGET: new THREE.Vector3(-5, 20, -3),
})
```

`Object.freeze()` で設定値を変更できないようにしています。

## 6. 3Dオブジェクト作成用のファイルを作成

以下のファイルを作成します（詳細は実装例を参照）:

- `practice/6-avater-view/assets/js/avater-view/objects/factory.js` - 3Dモデルを読み込む関数
- `practice/6-avater-view/assets/js/avater-view/objects/Room.js` - 部屋のクラス
- `practice/6-avater-view/assets/js/avater-view/objects/Animals.js` - 動物のクラス
- `practice/6-avater-view/assets/js/avater-view/objects/Fan.js` - 扇風機のクラス

## 7. GLBファイルを配置

以下のGLBファイルを配置します:

- `practice/6-avater-view/assets/glb/room.glb` - 部屋の3Dモデル
- `practice/6-avater-view/assets/glb/animals.glb` - 動物の3Dモデル
- `practice/6-avater-view/assets/glb/fan.glb` - 扇風機の3Dモデル

**注意:** GLBファイルは実装例からコピーしてください。

## 動作確認

ブラウザで `index.html` を開きます。

- 部屋、動物、扇風機が表示される
- マウスドラッグで視点を回転できる
- マウスホイールでズームイン/アウトできる

## 作業後のディレクトリ構造

```
practice/
└── 6-avater-view/
    ├── index.html
    └── assets/
        ├── css/
        │   └── style.css
        ├── glb/
        │   ├── room.glb
        │   ├── animals.glb
        │   └── fan.glb
        └── js/
            ├── main.js
            └── avater-view/
                ├── index.js
                ├── config.js
                └── objects/
                    ├── factory.js
                    ├── Room.js
                    ├── Animals.js
                    └── Fan.js
```

---

# サンプル2: 動物のモーションを変更
実装例: `/examples/2`

## 目標

3Dモデルが読み込まれたら、動物のモーションを「idle（待機）」に変更します。

## 作業前のディレクトリ構造

```
practice/
└── 6-avater-view/
    ├── index.html
    └── assets/
        ├── css/
        ├── glb/
        └── js/
```

## 作業

1. JavaScriptのメインファイルを更新

## 1. JavaScriptのメインファイルを更新

ファイル名: `practice/6-avater-view/assets/js/main.js`

```javascript
import AvaterView from './avater-view/index.js'

const container = document.getElementById('avater')

const view = new AvaterView({
  element: container,
  roomGlbUrl: './assets/glb/room.glb',
  fanGlbUrl: './assets/glb/fan.glb',
  animalsGlbUrl: './assets/glb/animals.glb',
})

view.addEventListener('load', () => {
  view.changeAnimalMotion('idle')
})
```

**変更点:**

- `new AvaterView(...)` の結果を `view` 変数に保存
- `load` イベントのリスナーを追加
- 3Dモデルが読み込まれたら `changeAnimalMotion('idle')` を呼び出す

**説明:**

- `addEventListener('load', ...)` は、3Dモデルの読み込みが完了したときに実行されます
- `changeAnimalMotion('idle')` は、動物のモーションを「idle（待機）」に変更します

## 動作確認

ブラウザで `index.html` を開きます。

- 動物が「idle（待機）」のアニメーションをしている

## 作業後のディレクトリ構造

```
practice/
└── 6-avater-view/
    ├── index.html
    └── assets/
        ├── css/
        ├── glb/
        └── js/
```

---

# サンプル3: 動物のクリックイベントを追加
実装例: `/examples/3`

## 目標

動物をクリックしたときにコンソールにメッセージを表示します。

## 作業前のディレクトリ構造

```
practice/
└── 6-avater-view/
    ├── index.html
    └── assets/
        ├── css/
        ├── glb/
        └── js/
```

## 作業

1. JavaScriptのメインファイルを更新

## 1. JavaScriptのメインファイルを更新

ファイル名: `practice/6-avater-view/assets/js/main.js`

```javascript
import AvaterView from './avater-view/index.js'

const container = document.getElementById('avater')

const view = new AvaterView({
  element: container,
  roomGlbUrl: './assets/glb/room.glb',
  fanGlbUrl: './assets/glb/fan.glb',
  animalsGlbUrl: './assets/glb/animals.glb',
})

view.addEventListener('load', () => {
  view.changeAnimalMotion('idle')
})

view.addEventListener('animal-click', () => {
  console.log('動物がクリックされました')
})
```

**追加内容:**

- `animal-click` イベントのリスナーを追加
- 動物がクリックされたらコンソールにメッセージを表示

**説明:**

- `AvaterView` クラスは、動物がクリックされたときに `animal-click` イベントを発行します
- このイベントをリッスンすることで、クリックを検出できます

## 動作確認

ブラウザで `index.html` を開き、開発者ツールのコンソールを開きます。

- 動物をクリックする
- コンソールに「動物がクリックされました」と表示される

## 作業後のディレクトリ構造

```
practice/
└── 6-avater-view/
    ├── index.html
    └── assets/
        ├── css/
        ├── glb/
        └── js/
```

---

# サンプル4: クリックで動物のモーションを変更
実装例: `/examples/4`

## 目標

動物をクリックしたときに、モーションを「attack（攻撃）」に変更します。

## 作業前のディレクトリ構造

```
practice/
└── 6-avater-view/
    ├── index.html
    └── assets/
        ├── css/
        ├── glb/
        └── js/
```

## 作業

1. JavaScriptのメインファイルを更新

## 1. JavaScriptのメインファイルを更新

ファイル名: `practice/6-avater-view/assets/js/main.js`

```javascript
import AvaterView from './avater-view/index.js'

const container = document.getElementById('avater')

const view = new AvaterView({
  element: container,
  roomGlbUrl: './assets/glb/room.glb',
  fanGlbUrl: './assets/glb/fan.glb',
  animalsGlbUrl: './assets/glb/animals.glb',
})

view.addEventListener('load', () => {
  view.changeAnimalMotion('idle')
})

view.addEventListener('animal-click', () => {
  // view.changeAnimalMotion('idle')
  view.changeAnimalMotion('attack')
  // view.changeAnimalMotion('rolling')
  // view.changeAnimalMotion('confused')
  // view.changeAnimalMotion('damaged')
  // view.changeAnimalMotion('shifty')
})
```

**変更点:**

- `console.log(...)` を削除
- `view.changeAnimalMotion('attack')` を追加
- 他のモーション名もコメントで記載（試すことができます）

**説明:**

- クリックすると、動物のモーションが「attack（攻撃）」に変わります
- コメントアウトされた他のモーション名を試すこともできます:
  - `idle` - 待機
  - `attack` - 攻撃
  - `rolling` - 回転
  - `confused` - 混乱
  - `damaged` - ダメージ
  - `shifty` - きょろきょろ

## 動作確認

ブラウザで `index.html` を開きます。

- 最初は「idle（待機）」のアニメーション
- 動物をクリックすると「attack（攻撃）」のアニメーションに変わる

## 作業後のディレクトリ構造

```
practice/
└── 6-avater-view/
    ├── index.html
    └── assets/
        ├── css/
        ├── glb/
        └── js/
```

---

# まとめ

この節では、Three.jsを使った3D表示の基本を学びました。

**学んだこと:**

1. **Three.jsの基本**: Scene、Camera、Renderer、Lightsの概念
2. **3Dモデルの読み込み**: GLBファイルを読み込んで表示
3. **イベント処理**: カスタムイベント（`load`、`animal-click`）の使い方
4. **アニメーション制御**: `changeAnimalMotion()` でモーションを変更

次の章では、この知識を使って実際のアプリケーションを構築していきます。

# 次の項

これで第1章「基礎練習」は完了です。お疲れ様でした！

次は第2章に進みましょう:

[第2章: UI構築](../../2-ui/README.md)
