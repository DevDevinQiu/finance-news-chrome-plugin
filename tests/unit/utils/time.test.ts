import { describe, it, expect } from 'vitest'
import { formatTime, getTodayStart, isToday } from '@/utils/time'

describe('Time Utils', () => {
  describe('formatTime', () => {
    it('should format date string correctly', () => {
      const date = '2026-03-06T10:30:00'
      expect(formatTime(date)).toBe('10:30')
    })

    it('should format Date object correctly', () => {
      const date = new Date('2026-03-06T14:30:00')
      expect(formatTime(date)).toBe('14:30')
    })

    it('should handle invalid date', () => {
      expect(formatTime('invalid')).toBe('--:--')
    })
  })

  describe('getTodayStart', () => {
    it('should return start of today', () => {
      const todayStart = getTodayStart()
      const now = new Date()
      const expected = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      expect(todayStart.toISOString().split('T')[0]).toBe(expected.toISOString().split('T')[0])
    })
  })

  describe('isToday', () => {
    it('should return true for today', () => {
      const today = new Date()
      expect(isToday(today.toISOString())).toBe(true)
    })

    it('should return false for yesterday', () => {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
      expect(isToday(yesterday.toISOString())).toBe(false)
    })
  })
})
