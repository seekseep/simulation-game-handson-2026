const dialog = document.getElementById("dialog")
const openButton = document.getElementById("openButton")
const namteText = document.getElementById("nameText")
const result = document.getElementById("result")
const nameInput = document.getElementById("nameInput")
const submitButton = document.getElementById("submitButton")

function openNameDialog() {
  return new Promise((resolve) => {
    submitButton.addEventListener("click", () => {
      const name = nameInput.value;
      resolve(name)
    })
  })
}

openButton.addEventListener("click", () => {
  openNameDialog().then((name) => {
    result.hidden = false;
    namteText.textContent = name;
    dialog.close()
  })
})
