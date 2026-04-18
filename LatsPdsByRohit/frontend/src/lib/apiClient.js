import axios from 'axios'
import { API_BASE_URL } from '../config'

export const authClient = axios.create({
  baseURL: API_BASE_URL,
})

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
})

let getAccessToken = () => ''
let refreshAccessToken = null
let handleAuthFailure = null
let refreshRequest = null

export function configureApiClient(config) {
  getAccessToken = config.getAccessToken
  refreshAccessToken = config.refreshAccessToken
  handleAuthFailure = config.handleAuthFailure
}

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken()

  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      !error.response ||
      error.response.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error)
    }

    if (!refreshAccessToken) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      if (!refreshRequest) {
        refreshRequest = refreshAccessToken()
      }

      const nextAccessToken = await refreshRequest

      originalRequest.headers = originalRequest.headers || {}
      originalRequest.headers.Authorization = `Bearer ${nextAccessToken}`

      return apiClient(originalRequest)
    } catch (refreshError) {
      if (handleAuthFailure) {
        await handleAuthFailure()
      }

      return Promise.reject(refreshError)
    } finally {
      refreshRequest = null
    }
  },
)
