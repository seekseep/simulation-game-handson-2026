const dialog = document.getElementById("dialog")
const openButton = document.getElementById("openButton")
const namteText = document.getElementById("nameText")
const result = document.getElementById("result")
const nameInput = document.getElementById("nameInput")
const submitButton = document.getElementById("submitButton")

openButton.addEventListener("click", () => {
  dialog.showModal()
})

submitButton.addEventListener("click", () => {
  const name = nameInput.value;
  namteText.textContent = name;
  result.hidden = false;
  dialog.close()
})
