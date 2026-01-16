console.table([
  { name: "Alice", age: 30, city: "New York" },
  { name: "Bob", age: 25, city: "Los Angeles" },
])

const name = "Charlie"
const age = 28
console.log({ name, age })

console.time("処理時間計測")
// 何らかの処理
for (let i = 0; i < 1e6; i++) {
  Math.sqrt(i)
}
console.timeEnd("処理時間計測")

console.group("ユーザー情報")
console.log("名前: Alice")
console.log("年齢: 30")
console.log("都市: New York")
console.groupEnd("ユーザー情報")
