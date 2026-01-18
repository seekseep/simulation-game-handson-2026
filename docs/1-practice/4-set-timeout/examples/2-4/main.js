const button = document.getElementById("button")
const barking = document.getElementById("barking")

button.addEventListener("click", () => {
  const barkingContent = "わんわんわんわん"
  const characters = Array.from(barkingContent)

  for (let i = 1; i <= characters.length; i++) {
      setTimeout(() => {
        barking.textContent = characters.slice(0, i).join("")
      }, i * 500)
  }
})
