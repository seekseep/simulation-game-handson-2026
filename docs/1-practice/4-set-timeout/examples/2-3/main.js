const button = document.getElementById("button")
const barking = document.getElementById("barking")

button.addEventListener("click", () => {
  const barkingContent = "💥🍖💥🐈️💥"
  const characters = Array.from(barkingContent)

  for (let i = 1; i <= barkingContent.length; i++) {
      setTimeout(() => {
        const content = characters.slice(0, i).join("")
        barking.textContent = content
      }, i * 500)
  }
})
