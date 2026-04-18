import { Navigate } from 'react-router-dom'
import { SIGN_IN_ROUTE } from '../constants/routes'

export default function OtpVerificationPage() {
  return <Navigate replace to={SIGN_IN_ROUTE} />
}
