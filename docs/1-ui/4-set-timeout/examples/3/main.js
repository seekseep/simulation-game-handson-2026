const button = document.getElementById("button")
const dog = document.getElementById("dog")

button.addEventListener("click", () => {
  setTimeout(() => {
    dog.hidden = false
  }, 500)
})
