import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { normalizeRole } from '../../utils/roles'
import {
  DASHBOARD_OVERVIEW_ROUTE,
  DASHBOARD_ALLOCATIONS_ROUTE,
  DASHBOARD_HISTORY_ROUTE,
  DASHBOARD_GRIEVANCES_ROUTE,
  DASHBOARD_PROFILE_ROUTE,
  DASHBOARD_SETTINGS_ROUTE,
} from '../../constants/routes'

export default function DashboardSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const { user } = useAuth()
  const userRole = normalizeRole(user?.role)

  const navItems = [
    { name: 'Overview', icon: 'dashboard', href: DASHBOARD_OVERVIEW_ROUTE, roles: ['user', 'dealer', 'admin'] },
    { name: 'My Allocations', icon: 'inventory_2', href: DASHBOARD_ALLOCATIONS_ROUTE, roles: ['user', 'dealer', 'admin'] },
    { name: 'Transaction History', icon: 'history', href: DASHBOARD_HISTORY_ROUTE, roles: ['user', 'dealer', 'admin'] },
    { name: 'Grievances', icon: 'warning', href: DASHBOARD_GRIEVANCES_ROUTE, roles: ['user', 'dealer', 'admin'] },
    { name: 'Profile', icon: 'person', href: DASHBOARD_PROFILE_ROUTE, roles: ['user', 'dealer', 'admin'] },
    { name: 'Settings', icon: 'settings', href: DASHBOARD_SETTINGS_ROUTE, roles: ['user', 'dealer', 'admin'] },
  ]
  const visibleNavItems = navItems.filter((item) => item.roles.includes(userRole))

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  return (
    <>
      <div className="md:hidden flex items-center justify-between bg-surface-container-lowest border-b border-surface p-4">
        <div className="text-xl font-bold tracking-tighter text-primary">RationSmart</div>
        <button className="text-on-surface" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          <span className="material-symbols-outlined">{isMobileOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      <aside
        className={`${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 transform bg-surface-container-lowest transition-transform duration-300 ease-in-out md:relative md:translate-x-0 border-r border-surface flex flex-col h-screen`}
      >
        <div className="flex h-20 items-center px-8 border-b border-surface">
          <div>
            <div className="text-xl font-black tracking-tighter text-primary">RationPortal</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              Government of Digital Monolith
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2 py-6">
          {visibleNavItems.map((item) => {
            return (
              <NavLink
                to={item.href}
                key={item.name}
                end
                className={`flex items-center gap-4 border-l-4 py-3 pl-7 pr-6 font-semibold transition-colors ${
                  pathname === item.href
                    ? 'border-primary bg-primary-container/20 text-primary'
                    : 'border-transparent text-on-surface-variant hover:bg-surface hover:text-on-surface'
                }`}
              >
                <span className={`material-symbols-outlined ${pathname === item.href ? 'filled-star' : ''}`}>
                  {item.icon}
                </span>
                <span className="text-sm uppercase tracking-widest">{item.name}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="p-6 border-t border-surface">
          <div className="flex items-center gap-3 rounded-xl bg-surface-container p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-on-primary">
              <span className="material-symbols-outlined">account_balance</span>
            </div>
            <div>
              <div className="text-xs font-bold text-on-surface">Agency Logo</div>
              <div className="text-[10px] text-on-surface-variant">Verified Access</div>
            </div>
          </div>
        </div>
      </aside>
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={() => setIsMobileOpen(false)} 
        />
      )}
    </>
  )
}
