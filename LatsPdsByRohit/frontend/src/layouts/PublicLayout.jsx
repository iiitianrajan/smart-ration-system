import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function PublicLayout() {
  const location = useLocation()

  return (
    <>
      <Header route={location.pathname} />
      <Outlet />
      <Footer />
    </>
  )
}
