const root = document.getElementById('speaker')
const contentText = document.getElementById('speakerContent')

export async function start (content) {
  contentText.textContent = content
  root.hidden = false;

  return new Promise((resolve) => {
    for (let i = 0; i < content.length; i++) {
      const isLast = i === content.length - 1
      const duration = i * 100
      setTimeout(() => {
        contentText.textContent = content.slice(0, i + 1)
      }, duration)

      if (isLast) {
        setTimeout(() => {
          root.hidden = true;
          resolve()
        }, duration + 1000)
      }
    }
  })
}
