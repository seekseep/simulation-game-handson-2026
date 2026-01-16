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
