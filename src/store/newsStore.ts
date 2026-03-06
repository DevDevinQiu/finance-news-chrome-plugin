import { create } from 'zustand'
import { NewsItem, NewsFilter } from '@/types'

interface NewsState {
  news: NewsItem[]
  filter: NewsFilter
  loading: boolean
  error: string | null
  setNews: (news: NewsItem[]) => void
  setFilter: (filter: NewsFilter) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useNewsStore = create<NewsState>((set) => ({
  news: [],
  filter: {},
  loading: false,
  error: null,
  setNews: (news) => set({ news }),
  setFilter: (filter) => set({ filter }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}))
