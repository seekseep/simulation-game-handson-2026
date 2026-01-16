function greetAfterDelay(name, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`こんにちは, ${name}! (delay=${delay} ms)`)
      resolve()
    }, delay)
  })
}

greetAfterDelay("たろう", Math.random() * 5 * 1000)
  .then(() => {
    return greetAfterDelay("じろう", Math.random() * 5 * 1000)
  })
