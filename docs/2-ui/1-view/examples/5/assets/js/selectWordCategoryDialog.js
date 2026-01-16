const dialog = document.getElementById('selectWordCategoryDialog')
const buttons = document.querySelectorAll('#selectWordCategoryList button')

export async function open () {
  dialog.showModal()

  return new Promise((resolve) => {
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        dialog.close()
        resolve(button.value)
      })
    })
  })
}
