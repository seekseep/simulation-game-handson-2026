class ApiClient {
  constructor(baseUrl = '/api') {
    this.baseUrl = baseUrl
  }

  async getWordCategories() {
    try {
      const response = await fetch(`${this.baseUrl}/word-categories`)
      if (!response.ok) throw new Error('Failed to fetch categories')
      return await response.json()
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  }

  async createWord(content, word_category_id) {
    try {
      const response = await fetch(`${this.baseUrl}/words`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content, word_category_id })
      })
      if (!response.ok) throw new Error('Failed to create word')
      return await response.json()
    } catch (error) {
      console.error('Error creating word:', error)
      throw error
    }
  }

  async createLine() {
    try {
      const response = await fetch(`${this.baseUrl}/lines`, {
        method: 'POST'
      })
      if (!response.ok) throw new Error('Failed to create line')
      return await response.json()
    } catch (error) {
      console.error('Error creating line:', error)
      throw error
    }
  }
}

export default ApiClient
