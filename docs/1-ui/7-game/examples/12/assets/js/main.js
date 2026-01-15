import * as avater from './avater.js'
import * as menu from './menu.js'
import * as inputWordDialog from './inputWordDialog.js'
import * as selectWordCategoryDialog from './selectWordCategoryDialog.js'
import * as speaker from './speaker.js'

const words = []

avater.view.addEventListener('load', () => {
  avater.view.changeAnimalMotion('idle')
})

avater.view.addEventListener('animal-click', () => {
  menu.open()
})

menu.talkButton.addEventListener('click', () => {
  console.log('動物と話す')
  menu.close()

  const word = words[Math.floor(Math.random() * words.length)]
  speaker.start(`${word.word}は${word.category}の言葉です！`)
})

menu.teachButton.addEventListener('click', async () => {
  console.log('動物に教える')
  menu.close()

  const word = await inputWordDialog.open()
  if (!word) {
    await speaker.start('言葉の入力がキャンセルされました')
  }
  await speaker.start(`「${word}」を教えました`)

  const wordCategory = await selectWordCategoryDialog.open([
    'あいさつ',
    '食べ物',
    '必殺技',
    '場所'
  ])

  await speaker.start(`「${wordCategory}」の分野を選びました`)

  words.push({ word, category: wordCategory })
  console.log({ words })
})
