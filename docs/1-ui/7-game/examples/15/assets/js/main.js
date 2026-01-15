import * as avater from './avater.js'
import * as menu from './menu.js'
import * as inputWordDialog from './inputWordDialog.js'
import * as selectWordCategoryDialog from './selectWordCategoryDialog.js'
import * as speaker from './speaker.js'

const words = []

const categories = ['あいさつ', '食べ物', '必殺技', '場所']

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

avater.view.addEventListener('load', () => {
  avater.view.changeAnimalMotion('idle')
})

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

  const word = await inputWordDialog.open()
  if (!word) {
    await speaker.start('言葉の入力がキャンセルされました')
  }
  await speaker.start(`「${word}」を教えました`)

  const wordCategory = await selectWordCategoryDialog.open(categories)

  await speaker.start(`「${wordCategory}」の分野を選びました`)

  words.push({ word, category: wordCategory })
  console.log({ words })
})
