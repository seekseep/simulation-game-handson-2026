# 2. ロジック実装

この節では、前節で作成したUIに動作を追加していきます。JavaScriptで各UI要素を制御し、完全に動作するアプリケーションを完成させます。

## 学習内容

- モジュールごとにJavaScriptを分割する方法
- Promiseを使った非同期処理
- 配列操作とランダム選択
- テンプレート文字列の置換
- localStorageでのデータ永続化

## サンプル一覧

1. [基本的なロジックを実装](#サンプル1-基本的なロジックを実装)
2. [「話す」機能を実装](#サンプル2-話す機能を実装)
3. [テンプレート文をランダムに選択](#サンプル3-テンプレート文をランダムに選択)
4. [カテゴリに応じたテンプレートを選択](#サンプル4-カテゴリに応じたテンプレートを選択)
5. [動物のモーションを変更](#サンプル5-動物のモーションを変更)
6. [localStorageでデータを保存](#サンプル6-localstorageでデータを保存)

---

# サンプル1: 基本的なロジックを実装
実装例: `/examples/1`

## 目標

UI要素を制御するJavaScriptモジュールを作成し、基本的な操作を実装します。

## 作業前のディレクトリ構造

```
app/
├── index.html
└── assets/
    ├── css/
    └── js/
        ├── main.js
        ├── avater.js
        └── aveterView/
```

## 作業

1. menu.jsを作成
2. speaker.jsを作成
3. inputWordDialog.jsを作成
4. selectWordCategoryDialog.jsを作成
5. main.jsを更新

## 1. menu.jsを作成

ファイル名: `app/assets/js/menu.js`

```javascript
const root = document.getElementById('menu')
export const teachButton = document.getElementById('teachButton')
export const talkButton = document.getElementById('talkButton')

export function open () {
  root.hidden = false;
}

export function close () {
  root.hidden = true;
}
```

**説明:**

- メニュー要素とボタン要素を取得して`export`します
- `open()` - メニューを表示
- `close()` - メニューを非表示

## 2. speaker.jsを作成

ファイル名: `app/assets/js/speaker.js`

```javascript
export const root = document.getElementById('speaker')
export const contentText = document.getElementById('speakerContent')

export async function start (content) {
  contentText.textContent = content
  root.hidden = false;

  return new Promise((resolve) => {
    for (let i = 0; i < content.length; i++) {
      const isLast = i === content.length - 1
      const duration = i * 100
      setTimeout(() => {
        contentText.textContent = content.slice(0, i + 1)
      }, duration)

      if (isLast) {
        setTimeout(() => {
          root.hidden = true;
          resolve()
        }, duration + 1000)
      }
    }
  })
}
```

**説明:**

- `start(content)` - セリフを1文字ずつ表示するアニメーション
- `content.slice(0, i + 1)` - 先頭から i+1 文字を取得
- 各文字を100msごとに表示
- 最後の文字から1秒後にセリフを非表示にして、Promiseを解決

**用語:**

- **Promise**: 非同期処理の完了を表すオブジェクト
- **resolve()**: Promiseを成功状態にする

## 3. inputWordDialog.jsを作成

ファイル名: `app/assets/js/inputWordDialog.js`

```javascript
const dialog = document.getElementById('inputWordDialog')
const submitButton = document.getElementById('submitInputWordButton')
const cancelButton = document.getElementById('cancelInputWordButton')
const input = document.getElementById('wordInput')

export async function open () {
  dialog.showModal()
  input.value = "";

  return new Promise((resolve) => {
    cancelButton.addEventListener('click', () => {
      dialog.close()
      resolve(null)
    })

    submitButton.addEventListener('click', () => {
      dialog.close()
      resolve(input.value)
    })
  })
}
```

**説明:**

- `open()` - ダイアログを開いて、ユーザーの入力を待つ
- キャンセルボタンがクリックされたら `null` を返す
- 確定ボタンがクリックされたら入力値を返す
- Promiseを使って、非同期で入力結果を返す

**注意点:**

このコードには問題があります。イベントリスナーが毎回追加されるため、ダイアログを複数回開くとイベントが重複します。実際のプロダクションコードでは、イベントリスナーの削除や once オプションの使用が必要です。

## 4. selectWordCategoryDialog.jsを作成

ファイル名: `app/assets/js/selectWordCategoryDialog.js`

```javascript
const dialog = document.getElementById('selectWordCategoryDialog')
const categoryList = document.getElementById('selectWordCategoryList')

export async function open (categories) {
  dialog.showModal()

  categoryList.innerHTML = '';

  return new Promise((resolve) => {
    categories.forEach((category) => {
      const button = document.createElement('button')
      button.value = category;
      button.textContent = category;

      button.addEventListener('click', () => {
        dialog.close()
        resolve(button.value)
      })

      categoryList.appendChild(button)
    })
  })
}
```

**説明:**

- `open(categories)` - カテゴリ選択ダイアログを開く
- `categoryList.innerHTML = ''` - 前回のボタンを削除
- `categories.forEach(...)` - カテゴリごとにボタンを動的に生成
- `document.createElement('button')` - ボタン要素を作成
- `categoryList.appendChild(button)` - ボタンをリストに追加
- ボタンがクリックされたら、選択されたカテゴリを返す

## 5. main.jsを更新

ファイル名: `app/assets/js/main.js`

```javascript
import * as avater from './avater.js'
import * as menu from './menu.js'
import * as inputWordDialog from './inputWordDialog.js'
import * as selectWordCategoryDialog from './selectWordCategoryDialog.js'
import * as speaker from './speaker.js'

const words = []

avater.view.addEventListener('animal-click', () => {
  menu.open()
})

menu.talkButton.addEventListener('click', () => {
  console.log('動物と話す')
  menu.close()
})

menu.teachButton.addEventListener('click', async () => {
  console.log('動物に教える')
  menu.close()

  const content = await inputWordDialog.open()
  if (!content) {
    await speaker.start('言葉の入力がキャンセルされました')
    return
  }
  await speaker.start(`「${content}」を教えました`)

  const wordCategory = await selectWordCategoryDialog.open([
    'あいさつ',
    '食べ物',
    '必殺技',
    '場所'
  ])

  await speaker.start(`「${wordCategory}」の分野を選びました`)

  words.push({ content, category: wordCategory })
  console.log({ words })
})
```

**説明:**

- 各モジュールを`import`します
- `words` - 教えた単語を保存する配列
- 動物をクリックしたらメニューを開く
- 「教える」ボタンをクリックしたら:
  1. 単語入力ダイアログを開く
  2. カテゴリ選択ダイアログを開く
  3. 単語を配列に追加
- `async/await` - 非同期処理を順番に実行

## 動作確認

ブラウザで `app/index.html` を開きます。

- 動物をクリックするとメニューが表示される
- 「教える」ボタンをクリックすると:
  - 単語入力ダイアログが表示される
  - 単語を入力して「確定する」をクリック
  - セリフが1文字ずつ表示される
  - カテゴリ選択ダイアログが表示される
  - カテゴリを選択するとセリフが表示される
  - コンソールに単語の配列が表示される
- 「話す」ボタンをクリックするとメニューが閉じる（まだ何も話さない）

## 作業後のディレクトリ構造

```
app/
├── index.html
└── assets/
    ├── css/
    ├── glb/
    └── js/
        ├── main.js
        ├── avater.js
        ├── menu.js
        ├── speaker.js
        ├── inputWordDialog.js
        ├── selectWordCategoryDialog.js
        └── aveterView/
```

---

# サンプル2: 「話す」機能を実装
実装例: `/examples/2`

## 目標

「話す」ボタンをクリックしたときに、教えた単語を使ってセリフを話すようにします。

## 作業前のディレクトリ構造

```
app/
├── index.html
└── assets/
    └── js/
```

## 作業

1. main.jsを更新

## 1. main.jsを更新

ファイル名: `app/assets/js/main.js`

```javascript
import * as avater from './avater.js'
import * as menu from './menu.js'
import * as inputWordDialog from './inputWordDialog.js'
import * as selectWordCategoryDialog from './selectWordCategoryDialog.js'
import * as speaker from './speaker.js'

const words = []

avater.view.addEventListener('animal-click', () => {
  menu.open()
})

menu.talkButton.addEventListener('click', () => {
  console.log('動物と話す')
  menu.close()

  const word = words[Math.floor(Math.random() * words.length)]
  speaker.start(`${word.content}は${word.category}の言葉です！`)
})

menu.teachButton.addEventListener('click', async () => {
  console.log('動物に教える')
  menu.close()

  const content = await inputWordDialog.open()
  if (!content) {
    await speaker.start('言葉の入力がキャンセルされました')
  }
  await speaker.start(`「${content}」を教えました`)

  const wordCategory = await selectWordCategoryDialog.open([
    'あいさつ',
    '食べ物',
    '必殺技',
    '場所'
  ])

  await speaker.start(`「${wordCategory}」の分野を選びました`)

  words.push({ content, category: wordCategory })
  console.log({ words })
})
```

**変更点:**

```javascript
// 追加したコード
const word = words[Math.floor(Math.random() * words.length)]
speaker.start(`${word.content}は${word.category}の言葉です！`)
```

**説明:**

- `Math.random()` - 0から1未満のランダムな数を返す
- `Math.floor(...)` - 小数点以下を切り捨て
- `Math.floor(Math.random() * words.length)` - 配列のインデックスをランダムに選択
- `words[...]` - ランダムに選ばれた単語を取得
- テンプレートリテラルでセリフを生成

## 動作確認

ブラウザで `app/index.html` を開きます。

- 動物に単語を教える（例: 「こんにちは」を「あいさつ」）
- 「話す」ボタンをクリックすると「こんにちははあいさつの言葉です！」と話す
- 複数の単語を教えると、ランダムに選ばれて話す

## 作業後のディレクトリ構造

```
app/
├── index.html
└── assets/
    └── js/
```

---

# サンプル3: テンプレート文をランダムに選択
実装例: `/examples/3`

## 目標

セリフをより面白くするために、テンプレート文のリストを用意してランダムに選択します。

## 作業前のディレクトリ構造

```
app/
├── index.html
└── assets/
    └── js/
```

## 作業

1. main.jsを更新

## 1. main.jsを更新

ファイル名: `app/assets/js/main.js`

```javascript
import * as avater from './avater.js'
import * as menu from './menu.js'
import * as inputWordDialog from './inputWordDialog.js'
import * as selectWordCategoryDialog from './selectWordCategoryDialog.js'
import * as speaker from './speaker.js'

const words = []

const categories = ['あいさつ', '食べ物', '必殺技', '場所']

const templates = [
  'おはようからおやすみまで「{言葉}」でお送りしています',
  '第一声が「{言葉}」？それもう様式美でしょ',
  '今日も元気に「{言葉}」していこうな',
  'とりあえず「{言葉}」って言っとけば場は持つ',
  '{言葉}味、想像したら負けなやつ',
  '公式がやりそうでやらない「{言葉}」味',
  '見た目はアレだけど味は普通の「{言葉}」',
  'SNSで炎上しそうな「{言葉}」フード',
  '必殺技「{言葉}」発動！（なお効果は未確認）',
  '相手は「{言葉}」を理解できなかった',
  '伝説の技「{言葉}」※再現性なし',
  '強そうに見えるだけの必殺技「{言葉}」',
  'だいたいみんな一度は通る「{言葉}」',
  '地図に載ってないけど有名な「{言葉}」',
  '行くとだいたい迷う「{言葉}」',
  'なぜか語られがちな場所「{言葉}」'
]

avater.view.addEventListener('animal-click', () => {
  menu.open()
})

menu.talkButton.addEventListener('click', () => {
  console.log('動物と話す')
  menu.close()

  const word = words[Math.floor(Math.random() * words.length)]
  const template = templates[Math.floor(Math.random() * templates.length)]
  const message = template.replace('{言葉}', word.content)

  speaker.start(message)
})

menu.teachButton.addEventListener('click', async () => {
  console.log('動物に教える')
  menu.close()

  const content = await inputWordDialog.open()
  if (!content) {
    await speaker.start('言葉の入力がキャンセルされました')
  }
  await speaker.start(`「${content}」を教えました`)

  const wordCategory = await selectWordCategoryDialog.open(categories)

  await speaker.start(`「${wordCategory}」の分野を選びました`)

  words.push({ content, category: wordCategory })
  console.log({ words })
})
```

**追加内容:**

- `categories` - カテゴリのリスト（ハードコーディングを避ける）
- `templates` - セリフのテンプレート文（16個）
- `template.replace('{言葉}', word.content)` - `{言葉}`を実際の単語に置換

**説明:**

テンプレート文には`{言葉}`というプレースホルダーが含まれています。これを実際の単語に置き換えることで、バリエーション豊かなセリフを生成します。

## 動作確認

ブラウザで `app/index.html` を開きます。

- 単語を教える（例: 「こんにちは」を「あいさつ」）
- 「話す」ボタンをクリックすると、ランダムなテンプレートでセリフが生成される
- 例: 「おはようからおやすみまで「こんにちは」でお送りしています」

## 作業後のディレクトリ構造

```
app/
├── index.html
└── assets/
    └── js/
```

---

# サンプル4: カテゴリに応じたテンプレートを選択
実装例: `/examples/4`

## 目標

テンプレートにカテゴリ情報を追加して、単語のカテゴリに応じた適切なテンプレートを選択します。

## 作業前のディレクトリ構造

```
app/
├── index.html
└── assets/
    └── js/
```

## 作業

1. main.jsを更新

## 1. main.jsを更新

ファイル名: `app/assets/js/main.js`

```javascript
import * as avater from './avater.js'
import * as menu from './menu.js'
import * as inputWordDialog from './inputWordDialog.js'
import * as selectWordCategoryDialog from './selectWordCategoryDialog.js'
import * as speaker from './speaker.js'

const words = []

const categories = ['あいさつ', '食べ物', '必殺技', '場所']

const templates = [
  { content: `おはようからおやすみまで「{言葉}」でお送りしています`, category: 'あいさつ' },
  { content: `第一声が「{言葉}」？それもう様式美でしょ`, category: 'あいさつ' },
  { content: `今日も元気に「{言葉}」していこうな`, category: 'あいさつ' },
  { content: `とりあえず「{言葉}」って言っとけば場は持つ`, category: 'あいさつ' },
  { content: `{言葉}味、想像したら負けなやつ`, category: '食べ物' },
  { content: `公式がやりそうでやらない「{言葉}」味`, category: '食べ物' },
  { content: `見た目はアレだけど味は普通の「{言葉}」`, category: '食べ物' },
  { content: `SNSで炎上しそうな「{言葉}」フード`, category: '食べ物' },
  { content: `必殺技「{言葉}」発動！（なお効果は未確認）`, category: '必殺技' },
  { content: `相手は「{言葉}」を理解できなかった`, category: '必殺技' },
  { content: `伝説の技「{言葉}」※再現性なし`, category: '必殺技' },
  { content: `強そうに見えるだけの必殺技「{言葉}」`, category: '必殺技' },
  { content: `だいたいみんな一度は通る「{言葉}」`, category: '場所' },
  { content: `地図に載ってないけど有名な「{言葉}」`, category: '場所' },
  { content: `行くとだいたい迷う「{言葉}」`, category: '場所' },
  { content: `なぜか語られがちな場所「{言葉}」`, category: '場所' },
]

avater.view.addEventListener('animal-click', () => {
  menu.open()
})

menu.talkButton.addEventListener('click', () => {
  console.log('動物と話す')
  menu.close()

  const word = words[Math.floor(Math.random() * words.length)]
  const categoryTemplates = templates.filter(template => template.category == word.category)
  const template = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)]
  const message = template.content.replace('{言葉}', word.word)

  speaker.start(message)
})

menu.teachButton.addEventListener('click', async () => {
  console.log('動物に教える')
  menu.close()

  const content = await inputWordDialog.open()
  if (!content) {
    await speaker.start('言葉の入力がキャンセルされました')
  }
  await speaker.start(`「${content}」を教えました`)

  const wordCategory = await selectWordCategoryDialog.open(categories)

  await speaker.start(`「${wordCategory}」の分野を選びました`)

  words.push({ content, category: wordCategory })
  console.log({ words })
})
```

**変更点:**

- テンプレートが文字列からオブジェクトの配列に変更
- 各テンプレートに`category`プロパティを追加
- `templates.filter(...)` - 単語のカテゴリに一致するテンプレートのみを抽出

**説明:**

- `filter()` - 条件に一致する要素だけを抽出する配列メソッド
- `template.category == word.category` - カテゴリが一致するか判定
- これにより、「あいさつ」の単語には「あいさつ」のテンプレートが使われます

## 動作確認

ブラウザで `app/index.html` を開きます。

- 「こんにちは」を「あいさつ」として教える
- 「話す」ボタンをクリックすると、あいさつ用のテンプレートが使われる
- 「ラーメン」を「食べ物」として教える
- 「話す」ボタンをクリックすると、食べ物用のテンプレートが使われる

## 作業後のディレクトリ構造

```
app/
├── index.html
└── assets/
    └── js/
```

---

# サンプル5: 動物のモーションを変更
実装例: `/examples/5`

## 目標

セリフを話すときに、動物のモーション（アニメーション）を変更します。

## 作業前のディレクトリ構造

```
app/
├── index.html
└── assets/
    └── js/
```

## 作業

1. main.jsを更新

## 1. main.jsを更新

ファイル名: `app/assets/js/main.js`

テンプレートに`motion`プロパティを追加します。

```javascript
const templates = [
  { content: `おはようからおやすみまで「{言葉}」でお送りしています`, category: 'あいさつ', motion: 'idle' },
  { content: `第一声が「{言葉}」？それもう様式美でしょ`, category: 'あいさつ', motion: 'shifty' },
  { content: `今日も元気に「{言葉}」していこうな`, category: 'あいさつ', motion: 'idle' },
  { content: `とりあえず「{言葉}」って言っとけば場は持つ`, category: 'あいさつ', motion: 'confused' },
  { content: `{言葉}味、想像したら負けなやつ`, category: '食べ物', motion: 'confused' },
  { content: `公式がやりそうでやらない「{言葉}」味`, category: '食べ物', motion: 'shifty' },
  { content: `見た目はアレだけど味は普通の「{言葉}」`, category: '食べ物', motion: 'idle' },
  { content: `SNSで炎上しそうな「{言葉}」フード`, category: '食べ物', motion: 'damaged' },
  { content: `必殺技「{言葉}」発動！（なお効果は未確認）`, category: '必殺技', motion: 'attack' },
  { content: `相手は「{言葉}」を理解できなかった`, category: '必殺技', motion: 'confused' },
  { content: `伝説の技「{言葉}」※再現性なし`, category: '必殺技', motion: 'rolling' },
  { content: `強そうに見えるだけの必殺技「{言葉}」`, category: '必殺技', motion: 'shifty' },
  { content: `だいたいみんな一度は通る「{言葉}」`, category: '場所', motion: 'idle' },
  { content: `地図に載ってないけど有名な「{言葉}」`, category: '場所', motion: 'shifty' },
  { content: `行くとだいたい迷う「{言葉}」`, category: '場所', motion: 'confused' },
  { content: `なぜか語られがちな場所「{言葉}」`, category: '場所', motion: 'rolling' },
]
```

そして、「話す」ボタンのイベントハンドラを更新します。

```javascript
menu.talkButton.addEventListener('click', async () => {
  console.log('動物と話す')
  menu.close()

  const word = words[Math.floor(Math.random() * words.length)]
  const categoryTemplates = templates.filter(template => template.category == word.category)
  const template = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)]
  const message = template.content.replace('{言葉}', word.word)

  avater.view.changeAnimalMotion(template.motion)
  await speaker.start(message)
  avater.view.changeAnimalMotion('idle')
})
```

**追加内容:**

- 各テンプレートに`motion`プロパティを追加
- `avater.view.changeAnimalMotion(template.motion)` - セリフに合ったモーションに変更
- `await speaker.start(message)` - セリフが終わるまで待つ
- `avater.view.changeAnimalMotion('idle')` - セリフが終わったら待機モーションに戻す

**利用可能なモーション:**

- `idle` - 待機
- `attack` - 攻撃
- `rolling` - 回転
- `confused` - 混乱
- `damaged` - ダメージ
- `shifty` - きょろきょろ

## 動作確認

ブラウザで `app/index.html` を開きます。

- 単語を教える
- 「話す」ボタンをクリックすると、セリフに応じたモーションで動物が動く
- セリフが終わると、待機モーションに戻る

## 作業後のディレクトリ構造

```
app/
├── index.html
└── assets/
    └── js/
```

---

# サンプル6: localStorageでデータを保存
実装例: `/examples/6`

## 目標

教えた単語をlocalStorageに保存して、ページを再読み込みしてもデータが残るようにします。

## 作業前のディレクトリ構造

```
app/
├── index.html
└── assets/
    └── js/
```

## 作業

1. storage.jsを作成
2. main.jsを更新

## 1. storage.jsを作成

ファイル名: `app/assets/js/storage.js`

```javascript
export function getWords () {
  const json = localStorage.getItem('words')
  if (!json) {
    return []
  }
  return JSON.parse(json)
}

export function putWords (words) {
  const json = JSON.stringify(words)
  localStorage.setItem('words', json)
}

export function getWordCategories () {
  return [
    'あいさつ',
    '食べ物',
    '必殺技',
    '場所'
  ]
}

export function getTemplates () {
  return [
    { content: `おはようからおやすみまで「{言葉}」でお送りしています`, category: 'あいさつ', motion: 'idle' },
    { content: `第一声が「{言葉}」？それもう様式美でしょ`, category: 'あいさつ', motion: 'shifty' },
    { content: `今日も元気に「{言葉}」していこうな`, category: 'あいさつ', motion: 'idle' },
    { content: `とりあえず「{言葉}」って言っとけば場は持つ`, category: 'あいさつ', motion: 'confused' },
    { content: `{言葉}味、想像したら負けなやつ`, category: '食べ物', motion: 'confused' },
    { content: `公式がやりそうでやらない「{言葉}」味`, category: '食べ物', motion: 'shifty' },
    { content: `見た目はアレだけど味は普通の「{言葉}」`, category: '食べ物', motion: 'idle' },
    { content: `SNSで炎上しそうな「{言葉}」フード`, category: '食べ物', motion: 'damaged' },
    { content: `必殺技「{言葉}」発動！（なお効果は未確認）`, category: '必殺技', motion: 'attack' },
    { content: `相手は「{言葉}」を理解できなかった`, category: '必殺技', motion: 'confused' },
    { content: `伝説の技「{言葉}」※再現性なし`, category: '必殺技', motion: 'rolling' },
    { content: `強そうに見えるだけの必殺技「{言葉}」`, category: '必殺技', motion: 'shifty' },
    { content: `だいたいみんな一度は通る「{言葉}」`, category: '場所', motion: 'idle' },
    { content: `地図に載ってないけど有名な「{言葉}」`, category: '場所', motion: 'shifty' },
    { content: `行くとだいたい迷う「{言葉}」`, category: '場所', motion: 'confused' },
    { content: `なぜか語られがちな場所「{言葉}」`, category: '場所', motion: 'rolling' },
  ]
}
```

**説明:**

- `localStorage` - ブラウザにデータを保存する仕組み
- `JSON.stringify(words)` - JavaScript オブジェクトを JSON 文字列に変換
- `JSON.parse(json)` - JSON 文字列を JavaScript オブジェクトに変換
- `getWords()` - localStorageから単語を読み込む
- `putWords(words)` - localStorageに単語を保存する

## 2. main.jsを更新

ファイル名: `app/assets/js/main.js`

```javascript
import * as avater from './avater.js'
import * as menu from './menu.js'
import * as inputWordDialog from './inputWordDialog.js'
import * as selectWordCategoryDialog from './selectWordCategoryDialog.js'
import * as speaker from './speaker.js'
import * as storage from './storage.js'

const words = storage.getWords()
const categories = storage.getWordCategories()
const templates = storage.getTemplates()

avater.view.addEventListener('animal-click', () => {
  menu.open()
})

menu.talkButton.addEventListener('click', async () => {
  console.log('動物と話す')
  menu.close()

  const word = words[Math.floor(Math.random() * words.length)]
  const categoryTemplates = templates.filter(template => template.category == word.category)
  const template = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)]
  const message = template.content.replace('{言葉}', word.word)

  avater.view.changeAnimalMotion(template.motion)
  await speaker.start(message)
  avater.view.changeAnimalMotion('idle')
})

menu.teachButton.addEventListener('click', async () => {
  console.log('動物に教える')
  menu.close()

  const content = await inputWordDialog.open()
  if (!content) {
    await speaker.start('言葉の入力がキャンセルされました')
  }
  await speaker.start(`「${content}」を教えました`)

  const wordCategory = await selectWordCategoryDialog.open(categories)

  await speaker.start(`「${wordCategory}」の分野を選びました`)

  words.push({ content, category: wordCategory })

  storage.putWords(words)

  console.log({ words })
})
```

**変更点:**

- `import * as storage from './storage.js'` - storageモジュールをインポート
- `const words = storage.getWords()` - 初期データをlocalStorageから読み込む
- `const categories = storage.getWordCategories()` - カテゴリリストを取得
- `const templates = storage.getTemplates()` - テンプレートリストを取得
- `storage.putWords(words)` - 単語を追加したらlocalStorageに保存

## 動作確認

ブラウザで `app/index.html` を開きます。

- 単語を教える（例: 「こんにちは」を「あいさつ」）
- ページを再読み込みする
- 「話す」ボタンをクリックすると、教えた単語が残っている
- 開発者ツールの「Application」→「Local Storage」で保存されたデータを確認できる

## 作業後のディレクトリ構造

```
app/
├── index.html
└── assets/
    ├── css/
    ├── glb/
    └── js/
        ├── main.js
        ├── avater.js
        ├── menu.js
        ├── speaker.js
        ├── inputWordDialog.js
        ├── selectWordCategoryDialog.js
        ├── storage.js
        └── aveterView/
```

---

# まとめ

この節では、UIに動作を追加してアプリケーションを完成させました。

**学んだこと:**

1. **モジュール分割**: 機能ごとにJavaScriptファイルを分割
2. **非同期処理**: async/awaitとPromiseの実践的な使い方
3. **配列操作**: filter、ランダム選択、文字列置換
4. **localStorage**: ブラウザにデータを永続化
5. **アニメーション制御**: setTimeoutを使った文字表示アニメーション

次の節では、GitHubにコードをアップロードします。

# 次の項

[3. GitHub設定](../3-github/README.md)
