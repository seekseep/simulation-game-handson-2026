const button = document.getElementById("button")
const barking = document.getElementById("barking")

button.addEventListener("click", () => {
  for (let i = 1; i <= 4; i++) {
      setTimeout(() => {
        barking.textContent = "💥".repeat(i)
      }, i * 500)
  }
})
