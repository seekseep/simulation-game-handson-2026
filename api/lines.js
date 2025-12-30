import { getSupabaseClient } from '../lib/supabase.js'

export async function POST() {
  try {
    const supabase = getSupabaseClient()

    // 1. ランダムに単語を1つ取得
    const { data: words, error: wordsError } = await supabase
      .from('words')
      .select('*')

    if (wordsError) throw wordsError
    if (!words || words.length === 0) {
      return Response.json({ error: 'No words found' }, { status: 404 })
    }

    const randomWord = words[Math.floor(Math.random() * words.length)]

    // 2. その単語のword_category_idをもとにline_templatesを取得
    const { data: lineTemplates, error: templatesError } = await supabase
      .from('line_templates')
      .select('*')
      .eq('word_category_id', randomWord.word_category_id)

    if (templatesError) throw templatesError
    if (!lineTemplates || lineTemplates.length === 0) {
      return Response.json(
        { error: 'No line templates found for this category' },
        { status: 404 }
      )
    }

    // 3. ランダムに1つのテンプレートを選択
    const randomTemplate = lineTemplates[Math.floor(Math.random() * lineTemplates.length)]

    // 4. テンプレートに単語を埋め込んでlineを生成
    const line = {
      content: randomTemplate.content.replace(/\{\{word\}\}/g, randomWord.content),
      motion_name: randomTemplate.motion_name
    }

    return Response.json(line)
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
