export default class InputWordDialog extends EventTarget {

  /** @type {HTMLDialogElement} */
  element;

  /** @type {HTMLInputElement} */
  inputElement;

  /** @type {((result: {action: 'submit' | 'cancel', value: string | null}) => void) | null} */
  resolveCallback;

  constructor () {
    super();

    // 入力フィールド
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.name = 'content';

    // キャンセルボタン
    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel');
    cancelButton.textContent = 'キャンセル';
    cancelButton.addEventListener('click', () => this.cancel());

    // 送信ボタン
    const submitButton = document.createElement('button');
    submitButton.textContent = '決定';
    submitButton.classList.add('submit');
    submitButton.addEventListener('click', () => this.submit());

    // ダイアログ要素の作成
    const element = document.createElement('dialog');
    element.classList.add('inputWordDialog');
    element.appendChild( inputElement);
    element.appendChild(cancelButton);
    element.appendChild(submitButton);

    this.element = element;
    this.inputElement = inputElement;

    this.resolveCallback = null;
  }

  /**
   * ダイアログを開く
   * @param {string} [defaultValue=''] - 初期値
   * @returns {Promise<{action: 'submit' | 'cancel', value: string | null}>}
   */
  async open (defaultValue = '') {
    // 初期化
    this.inputElement.value = defaultValue;
    this.resolveCallback = null;

    return new Promise((resolve) => {
      this.resolveCallback = resolve;
      this.element.showModal();
      this.inputElement.focus();
    });
  }

  /**
   * 送信処理
   */
  submit () {
    const value = this.inputElement.value;
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
