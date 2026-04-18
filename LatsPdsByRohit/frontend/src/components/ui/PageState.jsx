export function PageLoader({
  title = 'Loading data...',
  description = 'Please wait while we prepare the latest information.',
}) {
  return (
    <div className="rounded-2xl border border-surface bg-surface-container-lowest p-6 shadow-sm">
      <div className="mb-4 h-5 w-40 animate-pulse rounded bg-surface-container" />
      <div className="mb-3 h-4 w-full animate-pulse rounded bg-surface-container" />
      <div className="mb-6 h-4 w-3/4 animate-pulse rounded bg-surface-container" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="h-24 animate-pulse rounded-2xl bg-surface-container" />
        <div className="h-24 animate-pulse rounded-2xl bg-surface-container" />
      </div>
      <p className="mt-6 text-sm font-medium text-on-surface">{title}</p>
      <p className="mt-1 text-xs text-on-surface-variant">{description}</p>
    </div>
  )
}

export function FullPageLoader({
  title = 'Preparing your workspace...',
  description = 'We are restoring your session and loading the latest dashboard state.',
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-6 text-on-surface">
      <div className="w-full max-w-lg rounded-3xl border border-surface bg-surface-container-lowest p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-on-primary">
            <span className="material-symbols-outlined animate-pulse">shield_lock</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Secure Session</p>
            <h2 className="text-xl font-black tracking-tight text-on-surface">{title}</h2>
          </div>
        </div>
        <div className="mb-5 h-2 overflow-hidden rounded-full bg-surface-container">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
        </div>
        <p className="text-sm text-on-surface-variant">{description}</p>
      </div>
    </div>
  )
}

export function EmptyState({
  title,
  description,
  icon = 'inventory_2',
}) {
  return (
    <div className="rounded-2xl border border-surface bg-surface-container-lowest p-8 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-container text-on-surface-variant">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <h3 className="text-base font-bold text-on-surface">{title}</h3>
      <p className="mt-2 text-sm text-on-surface-variant">{description}</p>
    </div>
  )
}
