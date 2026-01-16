const button = document.getElementById("button")
const barking = document.getElementById("barking")

button.addEventListener("click", () => {
  const barkingContent = "💥💥💥💥"

  for (let i = 1; i <= barkingContent.length; i++) {
      setTimeout(() => {
        barking.textContent = barkingContent.slice(0, i)
      }, i * 500)
  }
})
