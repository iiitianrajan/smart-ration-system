import { useEffect, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { apiClient } from '../../lib/apiClient'
import { DASHBOARD_OVERVIEW_ROUTE } from '../../constants/routes'
import { useAuth } from '../../context/AuthContext'
import { EmptyState, PageLoader } from '../../components/ui/PageState'
import { isAdminRole } from '../../utils/roles'
import { getApiErrorMessage } from '../../utils/api'

function formatDate(dateValue) {
  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return 'Unknown'
  }

  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function StatCard({ label, value, helper, icon, tone }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
            {label}
          </p>
          <h3 className="mt-2 text-4xl font-black tracking-tight text-on-surface">{value}</h3>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
      </div>
      <p className="mt-4 text-sm text-on-surface-variant">{helper}</p>
    </div>
  )
}

function IndicatorPanel({ title, subtitle, icon, children }) {
  return (
    <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
          <h3 className="text-xl font-black tracking-tight text-on-surface">{title}</h3>
          <p className="mt-1 text-sm text-on-surface-variant">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

export default function AdminAnalyticsPage() {
  const { user } = useAuth()
  const [analytics, setAnalytics] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const isAdmin = isAdminRole(user?.role)

  useEffect(() => {
    if (!isAdmin) {
      return
    }

    let isMounted = true

    async function loadAnalytics() {
      setIsLoading(true)
      setError('')

      try {
        const response = await apiClient.get('/admin/analytics')

        if (isMounted) {
          setAnalytics(response.data)
        }
      } catch (requestError) {
        if (isMounted) {
          const nextError = getApiErrorMessage(requestError, 'Unable to load admin analytics.')
          setError(nextError)
          toast.error(nextError)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadAnalytics()

    return () => {
      isMounted = false
    }
  }, [isAdmin])

  const summary = analytics?.summary || {
    totalAllocations: 0,
    totalTransactions: 0,
    totalComplaints: 0,
    activeUsers: 0,
  }

  const chartBars = useMemo(() => {
    const entries = [
      {
        key: 'allocations',
        label: 'Allocations',
        value: summary.totalAllocations,
        color: 'bg-blue-600',
      },
      {
        key: 'transactions',
        label: 'Transactions',
        value: summary.totalTransactions,
        color: 'bg-emerald-600',
      },
      {
        key: 'complaints',
        label: 'Complaints',
        value: summary.totalComplaints,
        color: 'bg-rose-600',
      },
      {
        key: 'users',
        label: 'Active Users',
        value: summary.activeUsers,
        color: 'bg-amber-500',
      },
    ]

    const maxValue = Math.max(...entries.map((entry) => entry.value), 1)

    return entries.map((entry) => ({
      ...entry,
      width: `${Math.max((entry.value / maxValue) * 100, entry.value > 0 ? 12 : 0)}%`,
    }))
  }, [summary])

  if (!isAdmin) {
    return <Navigate replace to={DASHBOARD_OVERVIEW_ROUTE} />
  }

  return (
    <div className="max-w-7xl">
      <div className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Admin Analytics</span>
        <h2 className="mt-3 text-4xl font-black tracking-tight text-on-surface">
          Platform health, allocation flow, and fraud watchlist
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-on-surface-variant">
          Review operational counts and investigate suspicious distribution patterns across allocations,
          complaints, and dealer activity without leaving the dashboard.
        </p>
      </div>

      {isLoading ? (
        <div className="mt-8">
          <PageLoader
            title="Loading analytics..."
            description="We are preparing counts, recent activity, and fraud indicators for admin review."
          />
        </div>
      ) : error ? (
        <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-6 text-sm font-medium text-error shadow-sm">
          {error}
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total Allocations"
              value={summary.totalAllocations}
              helper="Monthly entitlement records issued across the system."
              icon="inventory_2"
              tone="bg-blue-100 text-blue-700"
            />
            <StatCard
              label="Total Transactions"
              value={summary.totalTransactions}
              helper="Recorded ration issue events from dealer counters."
              icon="receipt_long"
              tone="bg-emerald-100 text-emerald-700"
            />
            <StatCard
              label="Total Complaints"
              value={summary.totalComplaints}
              helper="Submitted grievance records requiring monitoring."
              icon="gavel"
              tone="bg-rose-100 text-rose-700"
            />
            <StatCard
              label="Active Users"
              value={summary.activeUsers}
              helper="Citizen accounts currently registered in the platform."
              icon="groups"
              tone="bg-amber-100 text-amber-700"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_1fr]">
            <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl font-black tracking-tight text-on-surface">Operational volume snapshot</h3>
                <p className="mt-1 text-sm text-on-surface-variant">
                  A quick comparison of core system activity to highlight where usage is concentrated.
                </p>
              </div>

              <div className="space-y-5">
                {chartBars.map((bar) => (
                  <div key={bar.key}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-bold text-on-surface">{bar.label}</span>
                      <span className="text-sm font-bold text-on-surface-variant">{bar.value}</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div className={`h-full rounded-full ${bar.color}`} style={{ width: bar.width }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200/70 bg-slate-950 p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-300">Fraud Monitoring</p>
              <h3 className="mt-3 text-2xl font-black">Live risk heuristic panel</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                These indicators are lightweight heuristics meant to help admins prioritize review, not to
                make automatic enforcement decisions.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Fast Quota Claims</p>
                  <p className="mt-2 text-3xl font-black">{analytics?.fraudIndicators?.fastQuotaClaims?.length || 0}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">High Dealer Activity</p>
                  <p className="mt-2 text-3xl font-black">{analytics?.fraudIndicators?.highDealerActivity?.length || 0}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Repeated Transactions</p>
                  <p className="mt-2 text-3xl font-black">{analytics?.fraudIndicators?.repeatedTransactions?.length || 0}</p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <IndicatorPanel
              title="Users claiming full quota quickly"
              subtitle="Claims completed within 24 hours of allocation issuance."
              icon="bolt"
            >
              {analytics?.fraudIndicators?.fastQuotaClaims?.length ? (
                <div className="space-y-4">
                  {analytics.fraudIndicators.fastQuotaClaims.map((entry) => (
                    <div key={`${entry.userId}-${entry.itemType}-${entry.monthYear}`} className="rounded-2xl border border-surface bg-surface-container-lowest p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-bold text-on-surface">{entry.userName}</p>
                          <p className="mt-1 text-xs text-on-surface-variant">{entry.phone}</p>
                        </div>
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-800">
                          {entry.claimedWithinHours} hrs
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-on-surface-variant">
                        {entry.itemType} quota of {entry.totalQuantity} was fully claimed in {entry.monthYear}.
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No fast full-claim patterns"
                  description="We did not find users exhausting their quota unusually quickly in the latest sample."
                  icon="verified"
                />
              )}
            </IndicatorPanel>

            <IndicatorPanel
              title="Dealers with unusually high transactions"
              subtitle="Shops performing well above the current average activity baseline."
              icon="storefront"
            >
              {analytics?.fraudIndicators?.highDealerActivity?.length ? (
                <div className="space-y-4">
                  {analytics.fraudIndicators.highDealerActivity.map((entry) => (
                    <div key={String(entry.shopId)} className="rounded-2xl border border-surface bg-surface-container-lowest p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-bold text-on-surface">{entry.shopName}</p>
                          <p className="mt-1 text-xs text-on-surface-variant">{entry.dealerName}</p>
                        </div>
                        <span className="rounded-full bg-rose-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-rose-800">
                          {entry.transactionCount} txns
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-on-surface-variant">
                        Last recorded activity: {formatDate(entry.lastTransactionAt)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No high-activity dealer outliers"
                  description="Dealer traffic looks evenly distributed in the current analytics sample."
                  icon="store"
                />
              )}
            </IndicatorPanel>

            <IndicatorPanel
              title="Repeated transactions in short time"
              subtitle="Back-to-back entries for the same user and shop within 15 minutes."
              icon="warning"
            >
              {analytics?.fraudIndicators?.repeatedTransactions?.length ? (
                <div className="space-y-4">
                  {analytics.fraudIndicators.repeatedTransactions.map((entry) => (
                    <div key={`${entry.currentReceiptId}-${entry.previousReceiptId}`} className="rounded-2xl border border-surface bg-surface-container-lowest p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-bold text-on-surface">{entry.userName}</p>
                          <p className="mt-1 text-xs text-on-surface-variant">{entry.shopName}</p>
                        </div>
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-800">
                          {entry.timeDifferenceMinutes} min
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-on-surface-variant">
                        Receipts {entry.previousReceiptId} and {entry.currentReceiptId} were recorded close together.
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No rapid repeat transaction pairs"
                  description="We did not detect repeated entries in a suspiciously short time window."
                  icon="schedule"
                />
              )}
            </IndicatorPanel>
          </div>
        </>
      )}
    </div>
  )
}
