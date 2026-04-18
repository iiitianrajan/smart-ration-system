import { Link } from 'react-router-dom'
import { DASHBOARD_OVERVIEW_ROUTE } from '../../constants/routes'

export default function DashboardHeader({ routeTitle }) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-surface bg-surface-container-lowest px-8">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold text-on-surface">{routeTitle || 'Ration Transparency System'}</h1>
        <nav className="hidden space-x-6 text-sm font-semibold text-on-surface-variant md:block">
          <Link to={DASHBOARD_OVERVIEW_ROUTE} className="text-primary border-b-2 border-primary pb-[26px]">Overview</Link>
          <Link to={DASHBOARD_OVERVIEW_ROUTE} className="hover:text-on-surface transition-colors pb-[26px]">Notifications</Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center rounded-full bg-surface-container px-3 py-2 md:flex">
          <span className="material-symbols-outlined text-on-surface-variant text-[18px]">search</span>
          <input
            type="text"
            placeholder="Search grievance records..."
            className="w-48 bg-transparent px-2 text-sm text-on-surface outline-none placeholder:text-on-surface-variant"
          />
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface transition-colors">
          <span className="material-symbols-outlined filled-star">notifications</span>
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface transition-colors">
          <span className="material-symbols-outlined filled-star">help</span>
        </button>
        <button className="ml-2 flex items-center gap-3">
          <div className="hidden text-right md:block">
            <div className="text-xs font-bold text-on-surface">Ananya Sharma</div>
            <div className="text-[10px] uppercase tracking-widest text-on-surface-variant">User</div>
          </div>
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya"
            alt="Profile"
            className="h-10 w-10 rounded-full border-2 border-surface-container object-cover"
          />
        </button>
      </div>
    </header>
  )
}
