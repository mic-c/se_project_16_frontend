import mockNewsData from '../utils/mockNewsData'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY

const newsApiBaseUrl = import.meta.env.PROD
  ? 'https://nomoreparties.co/news/v2/everything'
  : 'https://newsapi.org/v2/everything'

const getDateRange = () => {
  const to = new Date()
  const from = new Date()
  from.setDate(from.getDate() - 7)

  return {
    from: from.toISOString().split('T')[0],
    to: to.toISOString().split('T')[0],
  }
}

const hasValidApiKey = API_KEY && API_KEY !== 'your_api_key_here'
const MIN_FALLBACK_RESULTS = 3

const ensureMinimumFallbackResults = (articles) => {
  if (articles.length >= MIN_FALLBACK_RESULTS) {
    return articles
  }

  const seenUrls = new Set(articles.map((article) => article.url))
  const paddedArticles = [...articles]

  for (const article of mockNewsData) {
    if (paddedArticles.length >= MIN_FALLBACK_RESULTS) {
      break
    }

    if (!seenUrls.has(article.url)) {
      paddedArticles.push(article)
      seenUrls.add(article.url)
    }
  }

  return paddedArticles
}

const searchMockArticles = (keyword) => {
  const normalizedKeyword = keyword.trim().toLowerCase()

  if (!normalizedKeyword) {
    return ensureMinimumFallbackResults(mockNewsData)
  }

  const matchingArticles = mockNewsData.filter((article) => {
    const haystack = `${article.title} ${article.description} ${article.source?.name || ''}`.toLowerCase()
    return haystack.includes(normalizedKeyword)
  })

  return ensureMinimumFallbackResults(matchingArticles)
}

export const searchArticles = async (keyword) => {
  if (!hasValidApiKey) {
    return searchMockArticles(keyword)
  }

  const { from, to } = getDateRange()

  const url = new URL(newsApiBaseUrl)
  url.searchParams.set('q', keyword)
  url.searchParams.set('apiKey', API_KEY)
  url.searchParams.set('from', from)
  url.searchParams.set('to', to)
  url.searchParams.set('pageSize', '100')

  try {
    const response = await fetch(url)

    if (!response.ok) {
      return searchMockArticles(keyword)
    }

    const data = await response.json()
    const articles = data.articles || []

    if (!articles.length) {
      return searchMockArticles(keyword)
    }

    return articles
  } catch {
    return searchMockArticles(keyword)
  }
}
