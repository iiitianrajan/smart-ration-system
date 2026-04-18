export function getApiErrorMessage(error, fallbackMessage) {
  const backendMessage = error?.response?.data?.message

  if (typeof backendMessage === 'string' && backendMessage.trim()) {
    return backendMessage
  }

  if (error?.code === 'ERR_NETWORK') {
    return 'Unable to reach the server. Please check your connection and try again.'
  }

  if (error?.response?.status === 401) {
    return 'Your session has expired. Please sign in again.'
  }

  if (error?.response?.status === 403) {
    return 'You do not have permission to perform this action.'
  }

  if (error?.response?.status >= 500) {
    return 'The server is having trouble right now. Please try again shortly.'
  }

  if (typeof error?.message === 'string' && error.message.trim()) {
    return error.message
  }

  return fallbackMessage
}
