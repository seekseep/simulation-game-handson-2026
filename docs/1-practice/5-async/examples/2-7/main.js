function startTimer () {
  return new Promise((resolve) => {
    console.log("[1] タイマーが開始されます")
    setTimeout(() => {
      console.log("[2] タイマーが終了しました")
      resolve(new Date())
    }, 1000)
  })
}

async function main () {
  const date = await startTimer()
  console.log("[3] Promiseの処理が完了しました")
  console.log(`[4] 処理が完了した日時: ${date.toISOString()}`)
}

main()
