import { Outlet, useLocation } from 'react-router-dom'
import DashboardHeader from './components/DashboardHeader'
import DashboardSidebar from './components/DashboardSidebar'

export default function DashboardLayout() {
  const { pathname } = useLocation()

  const getRouteTitle = () => {
    switch (pathname) {
      case '/dashboard/overview': return 'Ration Transparency System'
      case '/dashboard/allocations': return 'My Allocations'
      case '/dashboard/history': return 'Transaction History'
      case '/dashboard/grievances': return 'Grievances'
      case '/dashboard/profile': return 'Profile Management'
      case '/dashboard/settings': return 'Account Configuration'
      default: return 'Dashboard'
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-surface-container font-public-sans antialiased text-on-surface">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader routeTitle={getRouteTitle()} />
        <main className="flex-1 overflow-y-auto bg-surface-container-low p-4 md:p-10 lg:pl-16">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
