export async function readJsonSafely(response) {
  try {
    return await response.json()
  } catch {
    return null
  }
}

export function getErrorMessage(data, fallbackMessage) {
  if (data && typeof data.message === 'string' && data.message.trim()) {
    return data.message
  }

  return fallbackMessage
}
