import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

export function getSupabaseClient() {
  return createClient(supabaseUrl, supabaseKey)
}
