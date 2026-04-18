import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { DASHBOARD_ALLOCATIONS_ROUTE, REGISTER_ROUTE, SIGN_IN_ROUTE } from '../constants/routes'
import { useAuth } from '../context/AuthContext'
import { apiClient } from '../lib/apiClient'
import { EmptyState, PageLoader } from '../components/ui/PageState'
import { getApiErrorMessage } from '../utils/api'

const ITEM_META = {
  Rice: { icon: 'grass', unit: 'KG' },
  Wheat: { icon: 'bakery_dining', unit: 'KG' },
  Sugar: { icon: 'water_drop', unit: 'KG' },
  Kerosene: { icon: 'propane_tank', unit: 'LT' },
}

export default function AllocationsPage() {
  const { isAuthenticated, user } = useAuth()
  const [allocations, setAllocations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      setAllocations([])
      setError('')
      return
    }

    let isMounted = true

    async function loadAllocations() {
      setIsLoading(true)
      setError('')

      try {
        const response = await apiClient.get('/allocations/my')

        if (isMounted) {
          setAllocations(Array.isArray(response.data) ? response.data : [])
        }
      } catch (requestError) {
        if (isMounted) {
          const nextError = getApiErrorMessage(requestError, 'Unable to load monthly allocations.')
          setError(nextError)
          toast.error(nextError)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadAllocations()

    return () => {
      isMounted = false
    }
  }, [isAuthenticated])

  const totals = useMemo(() => {
    const totalQuantity = allocations.reduce(
      (sum, allocation) => sum + Number(allocation.totalQuantity ?? allocation.quantity ?? 0),
      0,
    )
    const remainingQuantity = allocations.reduce(
      (sum, allocation) => sum + Number(allocation.quantity ?? 0),
      0,
    )

    return {
      totalQuantity,
      remainingQuantity,
      claimedPercentage: totalQuantity
        ? Math.round(((totalQuantity - remainingQuantity) / totalQuantity) * 100)
        : 0,
    }
  }, [allocations])

  const latestMonth = allocations[0]?.monthYear || 'Current Cycle'

  const history = useMemo(() => {
    const grouped = new Map()

    allocations.forEach((allocation) => {
      const currentValue = grouped.get(allocation.monthYear) || {
        monthYear: allocation.monthYear,
        totalQuantity: 0,
        items: 0,
      }

      currentValue.totalQuantity += Number(allocation.totalQuantity ?? allocation.quantity ?? 0)
      currentValue.items += 1
      grouped.set(allocation.monthYear, currentValue)
    })

    return Array.from(grouped.values())
  }, [allocations])

  return (
    <main className="mx-auto max-w-screen-2xl px-4 pb-20 pt-24 md:px-8">
      <section className="mb-16 mt-12">
        <div className="grid grid-cols-1 items-end gap-8 md:gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-primary">
              Current Status • {latestMonth}
            </span>
            <h1 className="mb-6 text-4xl font-bold leading-none tracking-tighter text-primary md:text-[3.5rem]">
              Monthly Allocations
            </h1>
            <p className="max-w-2xl text-lg text-secondary">
              {isAuthenticated
                ? 'Review the live entitlement records currently mapped to your account and track how much quota remains in the active cycle.'
                : 'Sign in to view your verified household entitlement and monthly allocation cycle from the backend ledger.'}
            </p>
          </div>
          <div className="flex justify-start border-surface-container lg:col-span-4 lg:justify-end">
            {isAuthenticated ? (
              <Link
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-6 py-4 font-bold text-on-primary shadow-xl transition-all hover:-translate-y-[2px] lg:w-auto md:px-8"
                to={DASHBOARD_ALLOCATIONS_ROUTE}
              >
                <span className="material-symbols-outlined">dashboard</span>
                Open Dashboard View
              </Link>
            ) : (
              <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                <Link
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-6 py-4 font-bold text-on-primary shadow-xl transition-all hover:-translate-y-[2px] sm:w-auto"
                  to={SIGN_IN_ROUTE}
                >
                  <span className="material-symbols-outlined">login</span>
                  Sign In
                </Link>
                <Link
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-surface-container-low px-6 py-4 font-bold text-primary shadow-sm transition-all hover:bg-white sm:w-auto"
                  to={REGISTER_ROUTE}
                >
                  <span className="material-symbols-outlined">person_add</span>
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {!isAuthenticated ? (
        <EmptyState
          title="Sign in to view your allocation cycle"
          description="Allocation records are tied to a verified user account. Sign in or register to review your current monthly entitlements."
          icon="inventory_2"
        />
      ) : isLoading ? (
        <PageLoader
          title="Loading your allocations..."
          description="We are preparing the active cycle, quantity totals, and monthly history."
        />
      ) : error ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm font-medium text-error shadow-sm">
          {error}
        </div>
      ) : (
        <>
          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex min-h-[400px] flex-col justify-between rounded-3xl bg-surface-container-low p-6 md:col-span-2 md:p-10">
              <div>
                <h3 className="mb-2 text-2xl font-bold text-primary">Claimed Quota</h3>
                <p className="text-secondary">
                  Overall consumption of your monthly entitlement across all active commodity records.
                </p>
              </div>
              <div className="mt-12">
                <div className="mb-4 flex items-end justify-between">
                  <span className="text-[4rem] font-black leading-none text-primary sm:text-[5rem]">
                    {totals.claimedPercentage}%
                  </span>
                  <div className="text-right">
                    <span className="block text-sm font-bold uppercase tracking-widest text-secondary">
                      Remaining balance
                    </span>
                    <span className="text-xl font-bold text-on-tertiary-fixed-variant sm:text-2xl">
                      {totals.remainingQuantity.toFixed(1)} KG Total
                    </span>
                  </div>
                </div>
                <div className="h-8 w-full overflow-hidden rounded-full bg-surface-container">
                  <div className="h-full bg-primary" style={{ width: `${totals.claimedPercentage}%` }} />
                </div>
              </div>
            </div>

            <div className="flex flex-col rounded-3xl bg-primary p-6 text-on-primary md:p-10">
              <div className="mb-auto">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-container">
                  <span className="material-symbols-outlined text-3xl text-on-primary-container">
                    account_balance_wallet
                  </span>
                </div>
                <h3 className="mb-1 text-xl font-bold">Household ID</h3>
                <p className="font-mono text-sm uppercase tracking-widest text-primary-fixed-dim">
                  {user?._id ? `RAT-${String(user._id).slice(-10).toUpperCase()}` : 'Pending sync'}
                </p>
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-sm text-primary-fixed-dim">Ration Card</span>
                  <span className="font-bold">{user?.rationCardNumber || 'Not Assigned'}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-sm text-primary-fixed-dim">Records</span>
                  <span className="font-bold">{allocations.length} Active Entries</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-sm text-primary-fixed-dim">Current Cycle</span>
                  <span className="font-bold">{latestMonth}</span>
                </div>
              </div>
            </div>
          </div>

          <section className="mb-20">
            <h2 className="mb-10 text-3xl font-bold text-primary">Commodity Breakdown</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {allocations.length ? (
                allocations.map((allocation) => {
                  const itemMeta = ITEM_META[allocation.itemType] || { icon: 'inventory_2', unit: 'KG' }
                  const totalQuantity = Number(allocation.totalQuantity ?? allocation.quantity ?? 0)

                  return (
                    <div key={allocation._id} className="group rounded-2xl bg-surface-container-lowest p-6 transition-all hover:bg-white hover:shadow-2xl md:p-8">
                      <div className="mb-8 flex items-start justify-between md:mb-12">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-low text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
                          <span className="material-symbols-outlined">{itemMeta.icon}</span>
                        </div>
                        <span className="text-right text-xs font-bold uppercase tracking-widest text-secondary">
                          {allocation.itemType}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-4xl font-bold text-primary">
                          {totalQuantity.toFixed(1)}{' '}
                          <span className="text-lg font-medium text-secondary">{itemMeta.unit}</span>
                        </div>
                        <p className="text-sm text-secondary">Monthly Entitlement</p>
                      </div>
                      <div className="mt-8 border-t border-surface-container pt-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="italic text-secondary">Status</span>
                          <span
                            className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${
                              allocation.status === 'Collected'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {allocation.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="sm:col-span-2 lg:col-span-4">
                  <EmptyState
                    title="No allocation records found"
                    description="Your current cycle has not been issued yet. Once an allocation is created, the commodity breakdown will appear here."
                    icon="inventory_2"
                  />
                </div>
              )}
            </div>
          </section>

          <section className="relative overflow-hidden rounded-2xl bg-surface-container-low p-6 md:p-12">
            <div className="relative z-10">
              <div className="mb-8 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-center md:gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-primary md:text-3xl">Allocation History</h2>
                  <p className="mt-2 text-secondary">
                    Immutable month-by-month ledger derived from the backend allocation records.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {history.length ? (
                  history.map((entry) => (
                    <div
                      key={entry.monthYear}
                      className="grid cursor-default grid-cols-1 items-center gap-3 rounded-xl border border-surface-container/50 bg-surface-container-lowest/50 p-5 transition-all hover:bg-surface-container-lowest md:grid-cols-4 md:gap-0 md:border-none md:p-6"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="font-bold">{entry.monthYear}</span>
                      </div>
                      <div className="font-mono text-sm text-secondary">
                        {entry.items} commodity record{entry.items === 1 ? '' : 's'}
                      </div>
                      <div className="font-medium text-primary">
                        {entry.totalQuantity.toFixed(1)} KG listed
                      </div>
                      <div className="hidden justify-end md:flex">
                        <span className="material-symbols-outlined cursor-pointer text-secondary hover:text-primary">
                          visibility
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState
                    title="No allocation history available"
                    description="Once your cycle data is issued, past and current month summaries will appear here."
                    icon="history_edu"
                  />
                )}
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-20 -right-20 hidden opacity-5 md:block">
              <span className="material-symbols-outlined text-[30rem]">history_edu</span>
            </div>
          </section>
        </>
      )}
    </main>
  )
}
