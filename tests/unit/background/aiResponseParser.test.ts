import { describe, it, expect } from 'vitest'

describe('AI Response Parser', () => {
  describe('parseAIResponse', () => {
    it('should parse valid JSON response', () => {
      const response = JSON.stringify({
        result: '看涨',
        confidence: 0.75,
        reason: '市场情绪积极'
      })
      const parsed = parseAIResponse(response)
      expect(parsed).toEqual({
        result: '看涨',
        confidence: 0.75,
        reason: '市场情绪积极'
      })
    })

    it('should handle response with markdown code blocks', () => {
      const response = '```json\n{"result": "看跌", "confidence": 0.6, "reason": "测试"}\n```'
      const parsed = parseAIResponse(response)
      expect(parsed.result).toBe('看跌')
    })

    it('should throw error for invalid JSON', () => {
      const response = 'invalid json'
      expect(() => parseAIResponse(response)).toThrow()
    })
  })

  describe('validatePrediction', () => {
    it('should validate correct prediction format', () => {
      const prediction = {
        result: '看涨',
        confidence: 0.8,
        reason: 'test reason'
      }
      expect(validatePrediction(prediction)).toBe(true)
    })

    it('should reject invalid result value', () => {
      const prediction = {
        result: 'invalid',
        confidence: 0.8,
        reason: 'test reason'
      }
      expect(validatePrediction(prediction)).toBe(false)
    })

    it('should reject out of range confidence', () => {
      const prediction = {
        result: '看涨',
        confidence: 1.5,
        reason: 'test reason'
      }
      expect(validatePrediction(prediction)).toBe(false)
    })
  })
})
