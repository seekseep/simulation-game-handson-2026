const greetingButton = document.getElementById("greetingButton")
const result = document.getElementById("result")

greetingButton.addEventListener("click", () => {
  setTimeout(() => {
    const greeting = document.createElement("div")
    greeting.textContent = `こんにちは, たろう!`
    result.appendChild(greeting)
  }, 1000)
})
