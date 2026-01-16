import { getSupabaseClient } from './supabase.js'

export async function GET() {
  // Supabaseクライアントを取得
  const supabase = getSupabaseClient()

  // templatesテーブルからデータを取得
  const { data } = await supabase
    .from('templates')
    .select('*')
    .order('id')

  // データを返す (キャメルケースに変換)
  const templates = data.map(row => ({
    id: row.id,
    content: row.content,
    wordCategoryId: row.word_category_id,
    motion: row.motion
  }))

  return new Response(JSON.stringify(templates))
}
