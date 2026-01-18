const dialog = document.getElementById("dialog")
const openButton = document.getElementById("openButton")
const closeButton = document.getElementById("closeButton")

openButton.addEventListener("click", () => {
  dialog.showModal()
})

closeButton.addEventListener("click", () => {
  dialog.close()
})
