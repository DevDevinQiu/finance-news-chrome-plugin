// Validation Utilities
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const isValidApiKey = (apiKey: string): boolean => {
  return apiKey.length > 0
}
