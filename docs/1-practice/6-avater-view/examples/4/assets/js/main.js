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
