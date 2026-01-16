const button = document.getElementById("button")
const barking = document.getElementById("barking")

button.addEventListener("click", () => {
  barking.textContent = "💥"
  setTimeout(() => {
    barking.textContent = "💥💥"
  }, 500)
  setTimeout(() => {
    barking.textContent = "💥💥💥"
  }, 1500)
  setTimeout(() => {
    barking.textContent = "💥💥💥💥"
  }, 2000)
})
