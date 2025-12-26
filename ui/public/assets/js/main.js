import AvaterView from "./avater-view/index.js";
import MessageBox from "./message-box/index.js";
import ActionMenu from "./action-menu/index.js";
import InputWordDialog from "./input-word-dialog/index.js";
import SelectCategoryDialog from "./select-category-dialog/index.js";

const words = []

const CATEGORIES = [
  { id: 'greeting', name: 'あいさつ' },
  { id: 'food', name: '食べ物' },
  { id: 'animal', name: '動物' },
  { id: 'vehicle', name: '乗り物' },
]

const TALK_TEMPLATES = {
  greeting: [
    (word) => `${word}って言うと元気が出るよね！`,
    (word) => `${word}は大切なことばだね`,
    (word) => `みんなに${word}って言いたいな`
  ],
  food: [
    (word) => `${word}って美味しそうだね！`,
    (word) => `${word}が食べたいなぁ`,
    (word) => `${word}はどんな味がするんだろう？`
  ],
  animal: [
    (word) => `${word}って可愛いよね！`,
    (word) => `${word}に会ってみたいな`,
    (word) => `${word}はどんな鳴き声なんだろう？`
  ],
  vehicle: [
    (word) => `${word}に乗ってみたいな！`,
    (word) => `${word}って速そうだね`,
    (word) => `${word}でどこか行きたいな`
  ]
}

function main () {
  const messageBox = new MessageBox();
  const avaterView = new AvaterView();
  const actionMenu = new ActionMenu();
  const inputWordDialog = new InputWordDialog();
  const selectCategoryDialog = new SelectCategoryDialog();

  document.body.appendChild(avaterView.element);
  document.body.appendChild(messageBox.element);
  document.body.appendChild(actionMenu.element);
  document.body.appendChild(inputWordDialog.element);
  document.body.appendChild(selectCategoryDialog.element);

  avaterView.addEventListener('load', () => {
    avaterView.changeAnimalMotion('sparrow-1');
  });

  avaterView.addEventListener('animal-click', async (event) => {
    actionMenu.open([
      {
        label: '教える',
        onSelect: async () => {
          await messageBox.showAsync('何を教えてくれるの？', 1000);
          messageBox.hide();
          const wordResult = await inputWordDialog.open();
          if (wordResult.action === 'cancel') {
            return;
          }

          const word = wordResult.value;
          await messageBox.showAsync(
            `${word}ってどんなことば？`, 2000
          );
          messageBox.hide();

          const categoryResult = await selectCategoryDialog.open(
            CATEGORIES.map(category => ({ value: category, label: category.name })),
          );
          if (categoryResult.action === 'cancel') {
            return;
          }

          const selectedCategory = categoryResult.value;
          words.push({ word, category: selectedCategory.id });

          await messageBox.showAsync(
            `${word}は${selectedCategory.name}のことなんだね`, 2000
          );

          messageBox.hide();
        }
      },
      {
        label: '話を聞く',
        onSelect: async () => {
          if (words.length === 0) {
            await messageBox.showAsync('今日はいい天気だね！', 2000);
            messageBox.hide();
            return;
          }

          // ランダムに単語を選ぶ
          const randomWord = words[Math.floor(Math.random() * words.length)];
          const templates = TALK_TEMPLATES[randomWord.category];
          const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
          const message = randomTemplate(randomWord.word);

          await messageBox.showAsync(message, 2000);
          messageBox.hide();
        }
      }
    ])
  })

  avaterView.addEventListener('fan-click', async (event) => {
    avaterView.fan.on();

    avaterView.changeAnimalMotion('sparrow-3');

    await messageBox.showAsync('ころがるー', 1000)
    await messageBox.showAsync('たのしいなー', 1000)

    avaterView.fan.off();

    avaterView.changeAnimalMotion('sparrow-1');

    await messageBox.showAsync('ふぅ...', 2000)

    messageBox.hide();
  });
}

main();
