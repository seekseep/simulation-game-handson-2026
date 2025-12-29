export default class ActionMenu extends EventTarget {

  /** @type {HTMLElement} */
  element;

  constructor () {
    super();

    this.element = document.createElement('div');
    this.element.classList.add('actionMenu');
  }

  /**
   * メニューを開く
   * @param {Array<{label: string, onSelect: () => void}>} options
   */
  open (options) {
    console.log('ActionMenu.open', options);
    // 既存のボタンをクリア
    this.element.innerHTML = '';

    // 各オプションに対してボタンを作成
    options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option.label;
      button.addEventListener('click', () => {
        this.close();
        option.onSelect();
      });
      this.element.appendChild(button);
    });

    // メニューを表示
    this.element.classList.add('shown');
  }

  /**
   * メニューを閉じる
   */
  close () {
    this.element.classList.remove('shown');
  }
}
