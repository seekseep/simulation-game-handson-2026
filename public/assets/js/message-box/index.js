const INTERVAL = 200;

export default class MessageBox extends EventTarget {

  /** @type {HTMLElement} */
  element;

  /** @type {string | null} */
  message;

  /** @type {number | null} */
  timer;

  /** @type {number | null} */
  showedIndex;

  constructor () {
    super();

    this.element = document.createElement('div');
    this.element.classList.add('messageBox');
    this.message = null;

    this.timer = null;
    this.showedIndex = null;
  }

  hide () {
    this.element.classList.remove('shown');
  }

  initAnimation (message) {
    if (this.timer !== null) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
    this.message = message;
    this.showedIndex = 0;
    this.element.textContent = '';
    this.element.classList.add('shown');
  }

  show (message) {
    this.initAnimation(message);
    this.animate();
  }

  async showAsync (message, waitDuration = 0) {
    this.initAnimation(message);

    const animationDuration = INTERVAL * message.length + waitDuration;
    this.animate();

    await new Promise((resolve) => {
      setTimeout(() => resolve(), animationDuration);
    });

    return;
  }

  animate() {
    if (this.message === null || this.showedIndex === null) {
      return;
    }

    if (this.showedIndex > this.message.length) {
      return;
    }


    const shownMessage = this.message.slice(0, this.showedIndex);
    this.element.textContent = shownMessage;
    this.showedIndex += 1;

    this.timer = window.setTimeout(() => this.animate(), INTERVAL);
  }
}
