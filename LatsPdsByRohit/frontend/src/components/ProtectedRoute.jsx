import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { SIGN_IN_ROUTE } from '../constants/routes'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to={SIGN_IN_ROUTE} />
  }

  return children || <Outlet />
}
