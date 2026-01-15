export async function getWords () {
  const response = await fetch('/api/words')
  const words = await response.json()
  return words
}

export function putWords (words) {
  const json = JSON.stringify(words)
  localStorage.setItem('words', json)
}

export async function getWordCategories () {
  const response = await fetch('/api/word-categories')
  const wordCategories = await response.json()
  return wordCategories
}

export async function getTemplates () {
  const response = await fetch('/api/templates')
  const templates = await response.json()
  return templates
}
