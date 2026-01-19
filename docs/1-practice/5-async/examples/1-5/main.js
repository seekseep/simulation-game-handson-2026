const greetingButton = document.getElementById("greetingButton")
const result = document.getElementById("result")

function greetingWithDelay(name, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const greeting = document.createElement("div")
      greeting.textContent = `こんにちは, ${name}!`
      result.appendChild(greeting)
      resolve()
    }, delay)
  })
}

greetingButton.addEventListener("click", async () => {
  await greetingWithDelay("たろう", 1000)
  await greetingWithDelay("じろう", 1000)
  await greetingWithDelay("さぶろう", 1000)
  await greetingWithDelay("しろう", 1000)
  await greetingWithDelay("ごろう", 1000)
})
