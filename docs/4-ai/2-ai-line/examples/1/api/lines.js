import { getSupabaseClient } from './supabase.js'
import { getGeminiClient } from './gemini.js'

export async function POST() {
  // Supabaseクライアントを取得
  const supabase = getSupabaseClient()

  // wordsとtemplatesを並列で取得
  const [wordsResult, templatesResult] = await Promise.all([
    supabase.from('words').select('*').order('id'),
    supabase.from('templates').select('*').order('id')
  ])

  const words = wordsResult.data
  const templates = templatesResult.data

  // ランダムにテンプレートを選択
  const template = templates[Math.floor(Math.random() * templates.length)]

  // テンプレートのカテゴリに合致する言葉をフィルタ
  const categoryWords = words.filter(
    word => word.word_category_id == template.word_category_id
  )

  // ランダムに言葉を選択
  const word = categoryWords[Math.floor(Math.random() * categoryWords.length)]

  // 基本メッセージ生成
  const baseMessage = template.content.replace('{言葉}', word.content)

  // Gemini APIで性格を反映した言い回しに変換
  const genAI = getGeminiClient()
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

  const prompt = `
あなたは明るく元気で前向きなキャラクターです。
語尾に「!」や「♪」をつけることが多く、テンションが高くエネルギッシュな言葉遣いをします。
ポジティブな表現を好み、友達感覚でフレンドリーに話します。
例えば
「おはようからおやすみまで『おざまーっす』でお送りしています」を
「おはようからおやすみまで『おざまーっす』でお送りしてるよ〜♪みんな元気出していこうね!」
のように変換します。

以下のセリフを、この性格に合わせて言い換えてください。
元の意味やニュアンスは保ちつつ、性格の特徴を反映させてください。
セリフだけを返してください。説明や前置きは不要です。

元のセリフ: ${baseMessage}

性格に合わせたセリフ:`

  // Gemini APIを呼び出し
  const result = await model.generateContent(prompt)
  const response = result.response
  const transformedMessage = response.text().trim()

  // レスポンスを返す
  return new Response(JSON.stringify({
    message: transformedMessage,
    motion: template.motion
  }))
}
