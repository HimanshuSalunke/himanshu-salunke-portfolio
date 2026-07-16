import { useState, useEffect, useCallback } from 'react'

interface ArticleLike {
  articleId: string
  likes: number
  isLiked: boolean
}

interface ArticleView {
  articleId: string
  views: number
  lastViewed: number
}

interface ArticleStatistics {
  totalLikes: number
  totalViews: number
  getArticleLikes: (articleId: string) => number
  getArticleViews: (articleId: string) => number
}

interface ArticleStatsInput {
  id: string
  likes: number
  views: number
}

const LIKES_STORAGE_KEY = 'article-likes'
const VIEWS_STORAGE_KEY = 'article-views'

export const useArticleStatistics = (articles: ArticleStatsInput[]): ArticleStatistics => {
  const [totalLikes, setTotalLikes] = useState(0)
  const [totalViews, setTotalViews] = useState(0)

  const recalculateStatistics = useCallback(() => {
    // Calculate total likes from localStorage
    const storedLikes = localStorage.getItem(LIKES_STORAGE_KEY)
    let parsedLikes: ArticleLike[] = []
    
    if (storedLikes) {
      try {
        parsedLikes = JSON.parse(storedLikes)
      } catch (error) {
        console.error('Error parsing stored likes:', error)
      }
    }

    // Calculate total views from localStorage
    const storedViews = localStorage.getItem(VIEWS_STORAGE_KEY)
    let parsedViews: ArticleView[] = []
    
    if (storedViews) {
      try {
        parsedViews = JSON.parse(storedViews)
      } catch (error) {
        console.error('Error parsing stored views:', error)
      }
    }

    // Calculate totals
    const likesTotal = articles.reduce((sum, article) => {
      const storedLike = parsedLikes.find(like => like.articleId === article.id)
      return sum + (storedLike ? storedLike.likes : article.likes)
    }, 0)

    const viewsTotal = articles.reduce((sum, article) => {
      const storedView = parsedViews.find(view => view.articleId === article.id)
      return sum + (storedView ? storedView.views : article.views)
    }, 0)

    setTotalLikes(likesTotal)
    setTotalViews(viewsTotal)
  }, [articles])

  useEffect(() => {
    recalculateStatistics()
  }, [recalculateStatistics])

  // Listen for localStorage changes to recalculate statistics
  useEffect(() => {
    const handleStorageChange = () => {
      recalculateStatistics()
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Also listen for custom events (for same-tab changes)
    window.addEventListener('articleDataChanged', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('articleDataChanged', handleStorageChange)
    }
  }, [recalculateStatistics])

  const getArticleLikes = (articleId: string): number => {
    const storedLikes = localStorage.getItem(LIKES_STORAGE_KEY)
    if (storedLikes) {
      try {
        const parsedLikes: ArticleLike[] = JSON.parse(storedLikes)
        const articleLike = parsedLikes.find(like => like.articleId === articleId)
        if (articleLike) {
          return articleLike.likes
        }
      } catch (error) {
        console.error('Error parsing stored likes:', error)
      }
    }
    
    // Fallback to article data
    const article = articles.find(a => a.id === articleId)
    return article ? article.likes : 0
  }

  const getArticleViews = (articleId: string): number => {
    const storedViews = localStorage.getItem(VIEWS_STORAGE_KEY)
    if (storedViews) {
      try {
        const parsedViews: ArticleView[] = JSON.parse(storedViews)
        const articleView = parsedViews.find(view => view.articleId === articleId)
        if (articleView) {
          return articleView.views
        }
      } catch (error) {
        console.error('Error parsing stored views:', error)
      }
    }
    
    // Fallback to article data
    const article = articles.find(a => a.id === articleId)
    return article ? article.views : 0
  }

  return {
    totalLikes,
    totalViews,
    getArticleLikes,
    getArticleViews
  }
}
