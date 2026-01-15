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

  // ランダムに言葉を選択
  const word = words[Math.floor(Math.random() * words.length)]

  // 言葉のカテゴリに合致するテンプレートをフィルタ
  const categoryTemplates = templates.filter(
    template => template.word_category_id == word.word_category_id
  )

  // ランダムにテンプレートを選択
  const template = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)]

  // メッセージ生成
  const message = template.content.replace('{言葉}', word.content)

  // レスポンスを返す
  return new Response(JSON.stringify({
    message: message,
    motion: template.motion
  }))
}
