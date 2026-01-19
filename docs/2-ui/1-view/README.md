# 1. ビュー作成

この節では、シミュレーションゲームのUIを段階的に構築していきます。

# ファイルの準備

1章の `handson-2026/practice/6-avater-view` ディレクトリの内容を `handson-2026/app` ディレクトリにコピーしてください。

`app` ディレクトリの中が次のようになります。

```
./
├── assets
│   ├── css
│   │   ├── avater.css
│   │   └── style.css
│   ├── glb
│   │   ├── animals.glb
│   │   ├── fan.glb
│   │   └── room.glb
│   └── js
│       ├── avater-view
│       │   ├── config.js
│       │   ├── index.js
│       │   └── objects
│       │       ├── Animals.js
│       │       ├── factory.js
│       │       ├── Fan.js
│       │       └── Room.js
│       └── main.js
└── index.html
```

# 主要なファイルの確認

## `index.html`

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

## `main.js`

```js
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
  view.changeAnimalMotion('attack')
})

```

# ファイルの整理

これから複数の機能を作っていきます。まずはファイルを整理して作業する対象が分かりやすいようにしましょう。

## `avater.js` の作成

`app/assets/js/` ディレクトリの中に `avater.js` という名前のファイルを作成してください。

`main.js` の内容を `avater.js` に移動し、次のように書き換えてください。
一部削除しています。

```js
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

## `main.js` の修正

作成した `avater.js` を `main.js` で読み込むように修正してください。

```js
import './avater.js'
```

## `avater.css` の作成

```css
#avater {
  width: 100%;
  height: 100%;
}

```


## style.css の修正

作成した `avater.css` を `style.css` で読み込むように修正してください。

```css
@import url('./avater.css');

body {
  margin: 0;
}
```

## 最終的なディレクトリ構造

```
├── assets
│   ├── css
│   │   ├── avater.css <- 作成
│   │   └── style.css <- 修正
│   ├── glb
│   │   ├── animals.glb
│   │   ├── fan.glb
│   │   └── room.glb
│   └── js
│       ├── avater-view
│       │   ├── config.js
│       │   ├── index.js
│       │   └── objects
│       │       ├── Animals.js
│       │       ├── factory.js
│       │       ├── Fan.js
│       │       └── Room.js
│       ├── avater.js <- 作成
│       └── main.js <- 修正
└── index.html
```

## 動作確認

ブラウザで `index.html` を開き、3Dキャラクターが表示されることを確認してください。

![1の結果](./assets/demo-1.gif)

## 
