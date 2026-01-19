const promise = new Promise((resolve) => {
  console.log("[1] タイマーが開始されます")
  setTimeout(() => {
    console.log("[2] タイマーが終了しました")
    resolve()
  }, 1000)
})

promise.then(() => {
  console.log("[3] Promiseの処理が完了しました")
})
