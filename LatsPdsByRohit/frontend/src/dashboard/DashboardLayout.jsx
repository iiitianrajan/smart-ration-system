import { Outlet, useLocation } from 'react-router-dom'
import DashboardHeader from './components/DashboardHeader'
import DashboardSidebar from './components/DashboardSidebar'
import { getDashboardTitle } from './dashboardConfig'

export default function DashboardLayout() {
  const { pathname } = useLocation()

  return (
    <div className="flex h-screen flex-col bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.08),_transparent_28%),linear-gradient(180deg,_rgba(248,250,252,1)_0%,_rgba(241,245,249,1)_100%)] font-public-sans antialiased text-on-surface md:flex-row">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader routeTitle={getDashboardTitle(pathname)} />
        <main className="flex-1 overflow-y-auto bg-transparent p-4 md:p-8 lg:p-10">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
