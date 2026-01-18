const numbers = [1, 4, 3, 5, 2, 8, 7, 6]
console.log(numbers)

for (let i = 0; i < numbers.length - 1; i++) {
  for (let j = 0; j < numbers.length - 1 - i; j++) {
    if (numbers[j] > numbers[j + 1]) {
      const temporary = numbers[j]
      numbers[j] = numbers[j + 1]
      numbers[j + 1] = temporary
      console.log(numbers)
    }
  }
}

console.log(numbers)
