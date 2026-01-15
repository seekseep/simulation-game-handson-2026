import * as avater from './avater.js'
import * as menu from './menu.js'

avater.view.addEventListener('load', () => {
  avater.view.changeAnimalMotion('idle')
})

avater.view.addEventListener('animal-click', () => {
  menu.open()
})

menu.talkButton.addEventListener('click', () => {
  console.log('動物と話す')
  menu.close()
})

menu.teachButton.addEventListener('click', () => {
  console.log('動物に教える')
  menu.close()
})
