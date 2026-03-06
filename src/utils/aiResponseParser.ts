// AI Response Parsing Utilities

export interface AIPrediction {
  result: string
  confidence: number
  reason: string
}

export interface ParsedPrediction extends AIPrediction {
  success: boolean
  error?: string
}

/**
 * Parse AI response, handling various formats including markdown code blocks
 */
export const parseAIResponse = (response: string): AIPrediction => {
  try {
    // Remove markdown code blocks if present
    let cleanedResponse = response.trim()

    // Handle ```json ... ``` format
    if (cleanedResponse.includes('```json')) {
      cleanedResponse = cleanedResponse.replace(/```json\n?/g, '').replace(/\n?```/g, '')
    }
    // Handle ``` ... ``` format
    else if (cleanedResponse.includes('```')) {
      cleanedResponse = cleanedResponse.replace(/```\n?/g, '').replace(/\n?```/g, '')
    }

    // Remove any leading/trailing non-JSON content
    const jsonStart = cleanedResponse.indexOf('{')
    const jsonEnd = cleanedResponse.lastIndexOf('}')
    if (jsonStart !== -1 && jsonEnd !== -1) {
      cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd + 1)
    }

    const parsed = JSON.parse(cleanedResponse) as AIPrediction

    // Validate required fields
    if (!parsed.result || typeof parsed.confidence !== 'number' || !parsed.reason) {
      throw new Error('Missing required fields in AI response')
    }

    return parsed
  } catch (error) {
    throw new Error(`Failed to parse AI response: ${error instanceof Error ? error.message : String(error)}`)
  }
}

/**
 * Validate prediction format
 */
export const validatePrediction = (prediction: Partial<AIPrediction>): boolean => {
  if (!prediction.result || typeof prediction.confidence !== 'number' || !prediction.reason) {
    return false
  }

  // Validate result is one of the expected values
  const validResults = ['看涨', '看跌', '看平', '加仓', '减仓', '维持不动']
  if (!validResults.includes(prediction.result)) {
    return false
  }

  // Validate confidence is between 0 and 1
  if (prediction.confidence < 0 || prediction.confidence > 1) {
    return false
  }

  return true
}
