const dialog = document.getElementById("dialog")
const openButton = document.getElementById("openButton")
const nameText = document.getElementById("nameText")
const result = document.getElementById("result")
const nameInput = document.getElementById("nameInput")
const submitButton = document.getElementById("submitButton")

function openNameDialog() {
  dialog.showModal()

  submitButton.addEventListener("click", () => {
    const name = nameInput.value;
    result.hidden = false;
    nameText.textContent = name;
    dialog.close()
  })
}

openButton.addEventListener("click", () => {
  openNameDialog()
})
