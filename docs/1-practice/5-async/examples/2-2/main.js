const promise = new Promise((resolve) => {
  console.log("[1] Promiseの処理が実行されます")
  resolve()
})

promise.then(() => {
  console.log("[2] Promiseの処理が完了しました")
})
