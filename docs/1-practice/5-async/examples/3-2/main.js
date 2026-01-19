const dialog = document.getElementById("dialog")
const openButton = document.getElementById("openButton")
const nameText = document.getElementById("nameText")
const result = document.getElementById("result")
const nameInput = document.getElementById("nameInput")
const submitButton = document.getElementById("submitButton")

function openNameDialog() {
  return new Promise((resolve) => {
    dialog.showModal()

    submitButton.addEventListener("click", () => {
      const name = nameInput.value;
      dialog.close()

      resolve(name)
    })
  })
}

openButton.addEventListener("click", async () => {
  const name = await openNameDialog()
  result.hidden = false;
  nameText.textContent = name;
})
