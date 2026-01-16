export const root = document.getElementById('speaker')
export const contentText = document.getElementById('speakerContent')

export function start (content) {
  contentText.textContent = content
  root.hidden = false;
}
