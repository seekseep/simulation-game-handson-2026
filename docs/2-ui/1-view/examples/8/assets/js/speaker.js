const root = document.getElementById('speaker')
const contentText = document.getElementById('speakerContent')

export function start (content) {
  contentText.textContent = content
  root.hidden = false;
}
