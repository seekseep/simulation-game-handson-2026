import { createClient } from '@supabase/supabase-js'

export async function GET() {
  // Supabaseクライアントを作成
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)

  // word_categoriesテーブルからデータを取得
  const { data } = await supabase
    .from('word_categories')
    .select('*')
    .order('id')

  // データを返す
  return new Response(JSON.stringify(data))
}
