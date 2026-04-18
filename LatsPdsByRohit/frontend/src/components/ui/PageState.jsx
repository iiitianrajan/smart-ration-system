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
