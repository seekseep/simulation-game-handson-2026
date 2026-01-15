function greetAfterDelay(name, delay) {
  setTimeout(() => {
    console.log(`こんにちは, ${name}! (delay=${delay} ms)`)
  }, delay)
}

greetAfterDelay("たろう", Math.random() * 5 * 1000)
greetAfterDelay("じろう", Math.random() * 5 * 1000)
