import { getSupabaseClient } from '../lib/supabase.js'

export async function GET() {
  try {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from('word_categories')
      .select('*')
      .order('id')

    if (error) throw error

    return Response.json(data)
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
