import { getSupabaseClient } from './supabase.js'

export async function POST(request) {
  // Supabaseクライアントを取得
  const supabase = getSupabaseClient()

  // リクエストボディを取得
  const body = await request.json()
  console.log('新しい言葉を受け取りました:', body)

  // wordsテーブルにデータを挿入
  const { data } = await supabase
    .from('words')
    .insert([
      {
        content: body.content,
        word_category_id: body.wordCategoryId
      }
    ])
    .select()
    .single()

  // データを返す (キャメルケースに変換)
  const word = {
    id: data.id,
    content: data.content,
    wordCategoryId: data.word_category_id
  }

  return new Response(JSON.stringify(word))
}
