import { getSupabaseClient } from './supabase.js'

export async function POST() {
  // Supabaseクライアントを取得
  const supabase = getSupabaseClient()

  const { data: words } = await supabase.from('words').select('*').order('id')
  const { data: templates } = await supabase.from('templates').select('*').order('id')

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
