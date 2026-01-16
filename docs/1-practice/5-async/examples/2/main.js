function greetAfterDelay(name, delay) {
  setTimeout(() => {
    console.log(`こんにちは, ${name}!(delay=${delay} ms)`)
  }, delay)
}

greetAfterDelay("たろう", 1000)
