import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import { DASHBOARD_OVERVIEW_ROUTE, DASHBOARD_PROFILE_ROUTE } from '../../constants/routes'
import { normalizeRole } from '../../utils/roles'

export default function DashboardHeader({ routeTitle }) {
  const { user } = useAuth()
  const normalizedRole = normalizeRole(user?.role)
  const roleLabel = normalizedRole.charAt(0).toUpperCase() + normalizedRole.slice(1)
  const userName = user?.name || 'Verified User'
  const avatarSeed = encodeURIComponent(userName)

  return (
    <header className="border-b border-slate-200/70 bg-white/80 px-6 py-5 backdrop-blur md:px-8">
      <div className="flex items-center gap-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Dashboard Workspace</p>
          <h1 className="text-xl font-bold text-on-surface">{routeTitle || 'Ration Transparency System'}</h1>
        </div>
        <nav className="hidden space-x-6 text-sm font-semibold text-on-surface-variant md:block">
          <Link to={DASHBOARD_OVERVIEW_ROUTE} className="border-b-2 border-primary pb-[26px] text-primary">Overview</Link>
          <Link to={DASHBOARD_OVERVIEW_ROUTE} className="pb-[26px] transition-colors hover:text-on-surface">Notifications</Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
          <span className="material-symbols-outlined text-on-surface-variant text-[18px]">search</span>
          <input
            type="text"
            placeholder="Search dashboard records..."
            className="w-48 bg-transparent px-2 text-sm text-on-surface outline-none placeholder:text-on-surface-variant"
          />
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface"
          onClick={() => toast('Notifications center can be connected to backend events next.')}
          type="button"
        >
          <span className="material-symbols-outlined filled-star">notifications</span>
        </button>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface"
          onClick={() => toast('Use the sidebar and profile page to manage your workspace.')}
          type="button"
        >
          <span className="material-symbols-outlined filled-star">help</span>
        </button>
        <Link className="ml-2 flex items-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-2 shadow-sm" to={DASHBOARD_PROFILE_ROUTE}>
          <div className="hidden text-right md:block">
            <div className="text-xs font-bold text-on-surface">{userName}</div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">{roleLabel}</div>
          </div>
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
            alt="Profile"
            className="h-10 w-10 rounded-full border-2 border-surface-container object-cover"
          />
        </Link>
      </div>
    </header>
  )
}
