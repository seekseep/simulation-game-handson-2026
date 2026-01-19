const greetingButton = document.getElementById("greetingButton")
const result = document.getElementById("result")

function greetingWithDelay(name, delay) {
  setTimeout(() => {
    const greeting = document.createElement("div")
    greeting.textContent = `こんにちは, ${name}!`
    result.appendChild(greeting)
  }, delay)
}

greetingButton.addEventListener("click", () => {
  greetingWithDelay("たろう", 1000)
  greetingWithDelay("じろう", 2000)
  greetingWithDelay("さぶろう", 3000)
  greetingWithDelay("しろう", 4000)
  greetingWithDelay("ごろう", 5000)
})
