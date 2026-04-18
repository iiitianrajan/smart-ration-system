export default function DashboardOverviewPage() {
  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">System Overview</span>
        <h2 className="text-4xl font-black text-on-surface">Welcome back, Ananya</h2>
        <p className="mt-2 text-on-surface-variant">Your RationSmart profile is active and verified.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-surface bg-surface-container-lowest p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Allocations</p>
              <h3 className="mt-1 text-2xl font-black text-primary">Active</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container text-primary">
              <span className="material-symbols-outlined filled-star">inventory_2</span>
            </div>
          </div>
          <div className="mt-4 border-t border-surface pt-4 text-xs font-medium text-state-success flex items-center gap-1">
             <span className="material-symbols-outlined text-[14px]">check_circle</span>
             Ready for pickup
          </div>
        </div>

        <div className="rounded-xl border border-surface bg-surface-container-lowest p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Transactions</p>
              <h3 className="mt-1 text-2xl font-black text-primary">128</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-container text-secondary">
              <span className="material-symbols-outlined">receipt_long</span>
            </div>
          </div>
          <div className="mt-4 border-t border-surface pt-4 text-xs font-medium text-on-surface-variant">
             Last: Oct 24, 2023
          </div>
        </div>

        <div className="rounded-xl border border-surface bg-surface-container-lowest p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Grievances</p>
              <h3 className="mt-1 text-2xl font-black text-primary">0</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-variant text-on-surface-variant">
              <span className="material-symbols-outlined">gavel</span>
            </div>
          </div>
          <div className="mt-4 border-t border-surface pt-4 text-xs font-medium text-state-success flex items-center gap-1">
             <span className="material-symbols-outlined text-[14px]">thumb_up</span>
             No active issues
          </div>
        </div>
      </div>
    </div>
  )
}
