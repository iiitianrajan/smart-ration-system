import { createContext, useContext, useMemo, useState } from 'react'
import { normalizeRole } from '../utils/roles'

const AuthContext = createContext(null)

function normalizeUser(user) {
  if (!user) {
    return null
  }

  return {
    ...user,
    role: normalizeRole(user.role),
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => window.localStorage.getItem('authToken') || '')
  const [user, setUser] = useState(() => {
    const storedUser = window.localStorage.getItem('authUser')

    if (!storedUser) {
      return null
    }

    try {
      return normalizeUser(JSON.parse(storedUser))
    } catch {
      return null
    }
  })

  function setAuthSession(nextToken, nextUser) {
    const normalizedUser = normalizeUser(nextUser)

    setToken(nextToken)
    setUser(normalizedUser)
    window.localStorage.setItem('authToken', nextToken)
    window.localStorage.setItem('authUser', JSON.stringify(normalizedUser))
  }

  function clearAuthSession() {
    setToken('')
    setUser(null)
    window.localStorage.removeItem('authToken')
    window.localStorage.removeItem('authUser')
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      setAuthSession,
      clearAuthSession,
    }),
    [token, user],
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
