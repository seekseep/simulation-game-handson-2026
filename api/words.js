import { getSupabaseClient } from '../lib/supabase.js'

export async function POST(request) {
  try {
    const { content, word_category_id } = await request.json()

    if (!content || !word_category_id) {
      return Response.json(
        { error: 'content and word_category_id are required' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from('words')
      .insert([{ content, word_category_id }])
      .select()
      .single()

    if (error) throw error

    return Response.json(data, { status: 201 })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
