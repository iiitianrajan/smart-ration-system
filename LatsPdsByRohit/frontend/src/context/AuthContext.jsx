import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { authClient, configureApiClient } from '../lib/apiClient'
import { normalizeRole } from '../utils/roles'
import { getApiErrorMessage } from '../utils/api'

const AuthContext = createContext(null)
const ACCESS_TOKEN_KEY = 'authToken'
const REFRESH_TOKEN_KEY = 'authRefreshToken'
const USER_KEY = 'authUser'

function normalizeUser(user) {
  if (!user) {
    return null
  }

  return {
    ...user,
    role: normalizeRole(user.role),
  }
}

function readStoredUser() {
  const storedUser = window.localStorage.getItem(USER_KEY)

  if (!storedUser) {
    return null
  }

  try {
    return normalizeUser(JSON.parse(storedUser))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() => window.localStorage.getItem(ACCESS_TOKEN_KEY) || '')
  const [storedRefreshToken, setStoredRefreshToken] = useState(
    () => window.localStorage.getItem(REFRESH_TOKEN_KEY) || '',
  )
  const [user, setUser] = useState(readStoredUser)
  const [isInitializing, setIsInitializing] = useState(true)
  const accessTokenRef = useRef(accessToken)
  const refreshTokenRef = useRef(storedRefreshToken)

  useEffect(() => {
    accessTokenRef.current = accessToken
  }, [accessToken])

  useEffect(() => {
    refreshTokenRef.current = storedRefreshToken
  }, [storedRefreshToken])

  function setAuthSession(nextAccessToken, nextRefreshToken, nextUser) {
    const normalizedUser = normalizeUser(nextUser)

    setAccessToken(nextAccessToken)
    setStoredRefreshToken(nextRefreshToken)
    setUser(normalizedUser)
    window.localStorage.setItem(ACCESS_TOKEN_KEY, nextAccessToken)
    window.localStorage.setItem(REFRESH_TOKEN_KEY, nextRefreshToken)
    window.localStorage.setItem(USER_KEY, JSON.stringify(normalizedUser))
  }

  function clearAuthSession() {
    setAccessToken('')
    setStoredRefreshToken('')
    setUser(null)
    window.localStorage.removeItem(ACCESS_TOKEN_KEY)
    window.localStorage.removeItem(REFRESH_TOKEN_KEY)
    window.localStorage.removeItem(USER_KEY)
  }

  async function fetchUserProfile(tokenToUse) {
    const response = await authClient.get('/users/profile', {
      headers: {
        Authorization: `Bearer ${tokenToUse}`,
      },
    })

    return normalizeUser(response.data)
  }

  async function refreshProfile() {
    const activeToken = accessTokenRef.current

    if (!activeToken) {
      throw new Error('No active session found.')
    }

    const profile = await fetchUserProfile(activeToken)
    setUser(profile)
    window.localStorage.setItem(USER_KEY, JSON.stringify(profile))
    return profile
  }

  async function refreshToken() {
    const currentRefreshToken = refreshTokenRef.current

    if (!currentRefreshToken) {
      throw new Error('Your session has expired. Please sign in again.')
    }

    try {
      const response = await authClient.post('/auth/refresh-token', {
        refreshToken: currentRefreshToken,
      })

      const nextAccessToken = response.data?.accessToken || response.data?.token
      const nextRefreshToken = response.data?.refreshToken

      if (!nextAccessToken || !nextRefreshToken) {
        throw new Error('The server did not return a valid session.')
      }

      setAccessToken(nextAccessToken)
      setStoredRefreshToken(nextRefreshToken)
      window.localStorage.setItem(ACCESS_TOKEN_KEY, nextAccessToken)
      window.localStorage.setItem(REFRESH_TOKEN_KEY, nextRefreshToken)

      return nextAccessToken
    } catch (error) {
      clearAuthSession()
      throw new Error(getApiErrorMessage(error, 'Your session has expired. Please sign in again.'))
    }
  }

  async function login(credentials) {
    const response = await authClient.post('/auth/login', credentials)
    const nextAccessToken = response.data?.accessToken || response.data?.token
    const nextRefreshToken = response.data?.refreshToken

    if (!nextAccessToken || !nextRefreshToken) {
      throw new Error('Unable to start a secure session.')
    }

    const profile = await fetchUserProfile(nextAccessToken)
    setAuthSession(nextAccessToken, nextRefreshToken, profile)
    return profile
  }

  async function register(payload) {
    const response = await authClient.post('/auth/register', payload)
    const nextAccessToken = response.data?.accessToken || response.data?.token
    const nextRefreshToken = response.data?.refreshToken

    if (!nextAccessToken || !nextRefreshToken) {
      throw new Error('Unable to start a secure session.')
    }

    const profile = await fetchUserProfile(nextAccessToken)
    setAuthSession(nextAccessToken, nextRefreshToken, profile)
    return profile
  }

  async function logout() {
    const currentRefreshToken = refreshTokenRef.current

    try {
      if (currentRefreshToken) {
        await authClient.post('/auth/logout', {
          refreshToken: currentRefreshToken,
        })
      }
    } finally {
      clearAuthSession()
    }
  }

  useEffect(() => {
    configureApiClient({
      getAccessToken: () => accessTokenRef.current,
      refreshAccessToken: refreshToken,
      handleAuthFailure: async () => {
        clearAuthSession()
      },
    })
  })

  useEffect(() => {
    let isMounted = true

    async function bootstrapAuth() {
      const initialAccessToken = accessTokenRef.current
      const initialRefreshToken = refreshTokenRef.current

      if (!initialAccessToken && !initialRefreshToken) {
        if (isMounted) {
          setIsInitializing(false)
        }
        return
      }

      try {
        let activeAccessToken = initialAccessToken

        if (!activeAccessToken) {
          activeAccessToken = await refreshToken()
        }

        const profile = await fetchUserProfile(activeAccessToken)

        if (isMounted) {
          setAuthSession(activeAccessToken, refreshTokenRef.current, profile)
        }
      } catch {
        if (isMounted) {
          clearAuthSession()
        }
      } finally {
        if (isMounted) {
          setIsInitializing(false)
        }
      }
    }

    bootstrapAuth()

    return () => {
      isMounted = false
    }
  }, [])

  const value = useMemo(
    () => ({
      token: accessToken,
      accessToken,
      refreshTokenValue: storedRefreshToken,
      user,
      isAuthenticated: Boolean(accessToken || storedRefreshToken),
      isInitializing,
      login,
      logout,
      register,
      refreshToken,
      refreshProfile,
      setAuthSession,
      clearAuthSession,
    }),
    [accessToken, storedRefreshToken, user, isInitializing],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
