import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { normalizeRole } from '../../utils/roles'
import { DASHBOARD_NAV_ITEMS } from '../dashboardConfig'
import { useNavigate } from 'react-router-dom'

export default function DashboardSidebar() {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const { user } = useAuth()
  const userRole = normalizeRole(user?.role)
  const visibleNavItems = DASHBOARD_NAV_ITEMS.filter((item) => item.roles.includes(userRole))

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  return (
    <>
      <div className="flex items-center justify-between border-b border-surface bg-surface-container-lowest p-4 md:hidden">
        <div>
          <div className="text-xl font-black tracking-tighter text-primary">RationSmart</div>
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
            Secure Access Layer
          </div>
        </div>
        <button className="text-on-surface" onClick={() => setIsMobileOpen(!isMobileOpen)} type="button">
          <span className="material-symbols-outlined">{isMobileOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      <aside
        className={`${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 flex h-screen w-72 transform flex-col border-r border-slate-200/70 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="border-b border-slate-200/70 px-8 py-6">
          <div>
            <div onClick={(e)=>{navigate('/home')}} className="text-xl font-black tracking-tighter text-primary cursor-pointer">RationPortal</div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
              Command Workspace
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-surface-container px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
              <span className="material-symbols-outlined text-[14px]">verified_user</span>
              {userRole}
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-6">
          {visibleNavItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <NavLink
                to={item.href}
                key={item.name}
                end
                className={`group rounded-2xl border px-4 py-4 transition-all ${
                  isActive
                    ? 'border-primary/20 bg-primary text-on-primary shadow-[0_12px_30px_rgba(37,99,235,0.24)]'
                    : 'border-transparent text-on-surface-variant hover:border-slate-200 hover:bg-slate-50 hover:text-on-surface'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`material-symbols-outlined ${isActive ? 'filled-star' : ''}`}>
                    {item.icon}
                  </span>
                  <div>
                    <div className="text-sm font-bold uppercase tracking-[0.16em]">{item.name}</div>
                    <div className={`mt-1 text-[11px] ${isActive ? 'text-on-primary/80' : 'text-on-surface-variant'}`}>
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              </NavLink>
            )
          })}
        </nav>

        <div className="border-t border-slate-200/70 p-6">
          <div className="rounded-2xl bg-slate-950 p-4 text-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                <span className="material-symbols-outlined">monitoring</span>
              </div>
              <div>
                <div className="text-xs font-bold">System Health</div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-slate-300">Operational</div>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-300">
              Role-based access is active and dashboard modules are filtered for this session.
            </p>
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
