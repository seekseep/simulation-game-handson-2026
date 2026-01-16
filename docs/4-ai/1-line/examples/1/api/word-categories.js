import { getSupabaseClient } from './supabase.js'

export async function GET() {
  // Supabaseクライアントを取得
  const supabase = getSupabaseClient()

  // word_categoriesテーブルからデータを取得
  const { data } = await supabase
    .from('word_categories')
    .select('*')
    .order('id')

  // データを返す
  return new Response(JSON.stringify(data))
}
