export default class TwoDAvaterView extends EventTarget {

  /** @type {HTMLElement} */
  element;

  /** @type {HTMLElement} */
  emojiElement;

  /** @type {string} */
  currentEmoji;

  // モーション名に対応する絵文字のマッピング
  static EMOJI_MAP = {
    'idle': '🙂',
    'attack': '😠',
    'rolling': '😵‍💫',
    'confused': '😵',
    'damaged': '🤕',
    'shifty': '😏',
    'default': '🙂'
  };

  constructor() {
    super();

    // コンテナ要素を作成
    this.element = document.createElement('div');
    this.element.classList.add('twoDAvaterView');
    this.element.style.cssText = `
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f0f0f0;
    `;

    // 絵文字表示用の要素を作成
    this.emojiElement = document.createElement('div');
    this.emojiElement.style.cssText = `
      font-size: 120px;
      transition: transform 0.3s ease;
      cursor: pointer;
    `;

    this.currentEmoji = TwoDAvaterView.EMOJI_MAP.default;
    this.emojiElement.textContent = this.currentEmoji;

    this.element.appendChild(this.emojiElement);

    // クリックイベントの設定
    this.emojiElement.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('animal-click'));
    });

    // ロード完了イベントを非同期で発火
    setTimeout(() => {
      this.dispatchEvent(new Event('load'));
    }, 0);
  }

  /**
   * アニメーション（モーション）名に基づいて絵文字を変更
   * @param {string} motionName - モーション名
   */
  changeAnimalMotion(motionName) {
    const emoji = TwoDAvaterView.EMOJI_MAP[motionName] || TwoDAvaterView.EMOJI_MAP.default;

    if (this.currentEmoji !== emoji) {
      // アニメーション効果を追加
      this.emojiElement.style.transform = 'scale(1.2)';
      setTimeout(() => {
        this.emojiElement.style.transform = 'scale(1)';
      }, 300);

      this.currentEmoji = emoji;
      this.emojiElement.textContent = emoji;
    }
  }
}
