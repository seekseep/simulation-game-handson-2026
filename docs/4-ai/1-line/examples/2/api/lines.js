import { getSupabaseClient } from './supabase.js'

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
    word => word.content_category_id == template.word_category_id
  )

  // ランダムに言葉を選択
  const word = categoryWords[Math.floor(Math.random() * categoryWords.length)]

  // メッセージ生成
  const message = template.content.replace('{言葉}', word.content)

  // レスポンスを返す
  return new Response(JSON.stringify({
    message: message,
    motion: template.motion
  }))
}
