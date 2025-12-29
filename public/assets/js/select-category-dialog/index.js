export default class SelectCategoryDialog extends EventTarget {

  /** @type {HTMLDialogElement} */
  element;

  /** @type {((result: {action: 'submit' | 'cancel', value: string | null}) => void) | null} */
  resolveCallback;

  constructor () {
    super();

    // ダイアログ要素の作成
    const element = document.createElement('dialog');
    element.classList.add('selectCategoryDialog');

    this.element = element;
    this.resolveCallback = null;
  }

  /**
   * ダイアログを開く
   * @param {Array<{label: string, value: string}>} options - カテゴリオプション
   * @returns {Promise<{action: 'submit' | 'cancel', value: string | null}>}
   */
  async open (options) {
    // 初期化
    this.element.innerHTML = '';
    this.resolveCallback = null;

    // 各オプションに対してボタンを作成
    options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option.label;
      button.addEventListener('click', () => this.select(option.value));
      this.element.appendChild(button);
    });

    // キャンセルボタン
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'キャンセル';
    cancelButton.classList.add('cancel');
    cancelButton.addEventListener('click', () => this.cancel());
    this.element.appendChild(cancelButton);

    return new Promise((resolve) => {
      this.resolveCallback = resolve;
      this.element.showModal();
    });
  }

  /**
   * カテゴリ選択処理
   * @param {string} value
   */
  select (value) {
    this.element.close();
    this.resolveCallback({ action: 'submit', value });
  }

  /**
   * キャンセル処理
   */
  cancel () {
    this.element.close();
    this.resolveCallback({ action: 'cancel', value: null });
  }
}
