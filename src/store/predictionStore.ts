import { create } from 'zustand'
import { Prediction } from '@/types'

interface PredictionState {
  predictions: Prediction[]
  loading: boolean
  error: string | null
  setPredictions: (predictions: Prediction[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const usePredictionStore = create<PredictionState>((set) => ({
  predictions: [],
  loading: false,
  error: null,
  setPredictions: (predictions) => set({ predictions }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}))
