import AvaterView from "./avater-view/index.js";
import MessageBox from "./message-box/index.js";
import ActionMenu from "./action-menu/index.js";
import InputWordDialog from "./input-word-dialog/index.js";
import SelectCategoryDialog from "./select-category-dialog/index.js";
import ApiClient from "./api-client/index.js";

async function main () {
  const apiClient = new ApiClient();
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

  // カテゴリをAPIから取得
  const categories = await apiClient.getWordCategories();

  const handleTeach = async () => {
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
      categories.map(category => ({ value: category, label: category.name })),
    );
    if (categoryResult.action === 'cancel') {
      return;
    }

    const selectedCategory = categoryResult.value;

    // APIに単語を登録
    await apiClient.createWord(word, selectedCategory.id);

    await messageBox.showAsync(
      `${word}は${selectedCategory.name}のことなんだね`, 2000
    );

    messageBox.hide();
  }

  const handleListen = async () => {
    try {
      // APIからランダムな単語とlineを取得
      const line = await apiClient.createLine();

      // モーションを変更
      avaterView.changeAnimalMotion(line.motion_name);

      await messageBox.showAsync(line.content, 2000);
      messageBox.hide();

      // デフォルトのモーションに戻す
      avaterView.changeAnimalMotion('sparrow-1');
    } catch (error) {
      await messageBox.showAsync('今日はいい天気だね！', 2000);
      messageBox.hide();
    }
  }

  avaterView.addEventListener('load', () => {
    avaterView.changeAnimalMotion('sparrow-1');
  });

  avaterView.addEventListener('animal-click', async () => {
    actionMenu.open([
      {
        label: '教える',
        onSelect: handleTeach
      },
      {
        label: '話を聞く',
        onSelect: handleListen
      }
    ])
  })
}

main();
