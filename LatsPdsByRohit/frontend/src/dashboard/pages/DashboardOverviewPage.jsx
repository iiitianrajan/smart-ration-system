import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { apiClient } from '../../lib/apiClient'
import { useAuth } from '../../context/AuthContext'
import { isAdminRole, isDealerRole } from '../../utils/roles'
import { PageLoader } from '../../components/ui/PageState'
import { getApiErrorMessage } from '../../utils/api'

const ROLE_OVERVIEW = {
  user: {
    label: 'Citizen Workspace',
    title: 'Your ration records are active and ready.',
    description:
      'Track current allocations, review transaction history, and raise complaints when something needs attention.',
  },
  dealer: {
    label: 'Dealer Workspace',
    title: 'Your distribution terminal is ready for collection entry.',
    description:
      'Record beneficiary collections, review recent shop activity, and keep the issue ledger updated in real time.',
  },
  admin: {
    label: 'Admin Workspace',
    title: 'Operations overview for allocation and grievance control.',
    description:
      'Monitor distribution health, manage allocation issuance, and keep the complaints workflow moving across the system.',
  },
}

function getRoleKey(role) {
  if (isAdminRole(role)) {
    return 'admin'
  }

  if (isDealerRole(role)) {
    return 'dealer'
  }

  return 'user'
}

function buildMetrics(roleKey, stats) {
  if (roleKey === 'admin') {
    return [
      {
        label: 'Allocations',
        value: String(stats.totalAllocations),
        helper: 'Issued allocation records across the system',
        icon: 'inventory_2',
        tone: 'bg-primary-container text-primary',
        footerTone: 'text-state-success',
      },
      {
        label: 'Complaints',
        value: String(stats.totalComplaints),
        helper: 'Grievance cases being monitored',
        icon: 'support_agent',
        tone: 'bg-red-100 text-red-700',
        footerTone: 'text-on-surface-variant',
      },
      {
        label: 'Analytics',
        value: String(stats.activeUsers),
        helper: 'Active user accounts currently onboarded',
        icon: 'monitoring',
        tone: 'bg-emerald-100 text-emerald-700',
        footerTone: 'text-state-success',
      },
    ]
  }

  if (roleKey === 'dealer') {
    return [
      {
        label: 'Collection Desk',
        value: String(stats.totalTransactions),
        helper: 'Transactions issued through your linked shop view',
        icon: 'point_of_sale',
        tone: 'bg-primary-container text-primary',
        footerTone: 'text-state-success',
      },
      {
        label: 'Beneficiaries',
        value: String(stats.customerCount),
        helper: 'Eligible users available for dealer workflow',
        icon: 'groups',
        tone: 'bg-blue-100 text-blue-700',
        footerTone: 'text-on-surface-variant',
      },
      {
        label: 'Shop Audit',
        value: stats.lastTransactionDate,
        helper: 'Latest recorded transaction timestamp',
        icon: 'verified',
        tone: 'bg-surface-variant text-on-surface-variant',
        footerTone: 'text-state-success',
      },
    ]
  }

  return [
    {
      label: 'Allocations',
      value: String(stats.totalAllocations),
      helper: 'Current allocation records mapped to your account',
      icon: 'inventory_2',
      tone: 'bg-primary-container text-primary',
      footerTone: 'text-state-success',
    },
    {
      label: 'Transactions',
      value: String(stats.totalTransactions),
      helper: 'Issued ration receipts available in history',
      icon: 'receipt_long',
      tone: 'bg-secondary-container text-secondary',
      footerTone: 'text-on-surface-variant',
    },
    {
      label: 'Grievances',
      value: String(stats.totalGrievances),
      helper: stats.totalGrievances ? 'Open a case to track support follow-up' : 'No active grievance records right now',
      icon: 'gavel',
      tone: 'bg-surface-variant text-on-surface-variant',
      footerTone: 'text-state-success',
    },
  ]
}

function formatDateTime(dateValue) {
  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return 'No activity yet'
  }

  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function DashboardOverviewPage() {
  const { user } = useAuth()
  const roleKey = getRoleKey(user?.role)
  const overviewCopy = ROLE_OVERVIEW[roleKey]
  const [stats, setStats] = useState({
    totalAllocations: 0,
    totalTransactions: 0,
    totalGrievances: 0,
    totalComplaints: 0,
    activeUsers: 0,
    customerCount: 0,
    lastTransactionDate: 'No activity yet',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadOverviewStats() {
      setIsLoading(true)
      setLoadError('')

      try {
        if (roleKey === 'admin') {
          const response = await apiClient.get('/admin/analytics')
          const summary = response.data?.summary || {}

          if (isMounted) {
            setStats({
              totalAllocations: summary.totalAllocations || 0,
              totalTransactions: summary.totalTransactions || 0,
              totalGrievances: summary.totalComplaints || 0,
              totalComplaints: summary.totalComplaints || 0,
              activeUsers: summary.activeUsers || 0,
              customerCount: 0,
              lastTransactionDate: 'Live dashboard',
            })
          }

          return
        }

        if (roleKey === 'dealer') {
          const [transactionsResponse, customersResponse] = await Promise.all([
            apiClient.get('/transactions/my'),
            apiClient.get('/users/customers'),
          ])

          const transactions = Array.isArray(transactionsResponse.data) ? transactionsResponse.data : []
          const customers = Array.isArray(customersResponse.data) ? customersResponse.data : []

          if (isMounted) {
            setStats({
              totalAllocations: 0,
              totalTransactions: transactions.length,
              totalGrievances: 0,
              totalComplaints: 0,
              activeUsers: 0,
              customerCount: customers.length,
              lastTransactionDate: formatDateTime(transactions[0]?.transactionDate),
            })
          }

          return
        }

        const [allocationsResponse, transactionsResponse, grievancesResponse] = await Promise.all([
          apiClient.get('/allocations/my'),
          apiClient.get('/transactions/my'),
          apiClient.get('/grievances/my'),
        ])

        if (isMounted) {
          setStats({
            totalAllocations: Array.isArray(allocationsResponse.data) ? allocationsResponse.data.length : 0,
            totalTransactions: Array.isArray(transactionsResponse.data) ? transactionsResponse.data.length : 0,
            totalGrievances: Array.isArray(grievancesResponse.data) ? grievancesResponse.data.length : 0,
            totalComplaints: 0,
            activeUsers: 0,
            customerCount: 0,
            lastTransactionDate: formatDateTime(transactionsResponse.data?.[0]?.transactionDate),
          })
        }
      } catch (error) {
        if (isMounted) {
          const nextError = getApiErrorMessage(error, 'Unable to load dashboard overview.')
          setLoadError(nextError)
          toast.error(nextError)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadOverviewStats()

    return () => {
      isMounted = false
    }
  }, [roleKey])

  const metrics = useMemo(() => buildMetrics(roleKey, stats), [roleKey, stats])

  const quickActions = useMemo(() => {
    if (roleKey === 'admin') {
      return ['Create allocation', 'Review grievances', 'Monitor analytics']
    }

    if (roleKey === 'dealer') {
      return ['Create transaction', 'Check beneficiary queue', 'Review shop ledger']
    }

    return ['Review allocations', 'Check transactions', 'Submit grievance']
  }, [roleKey])

  if (isLoading) {
    return (
      <PageLoader
        title="Loading dashboard overview..."
        description="We are preparing your role-based dashboard summary and account activity."
      />
    )
  }

  return (
    <div className="max-w-6xl">
      <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-8 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
          {overviewCopy.label}
        </span>
        <h2 className="mt-3 text-4xl font-black tracking-tight text-on-surface">
          Welcome back, {user?.name || 'User'}
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-on-surface-variant">
          {overviewCopy.description}
        </p>
        {loadError ? (
          <p className="mt-4 text-sm font-medium text-error">{loadError}</p>
        ) : null}

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-surface bg-surface-container-lowest p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    {metric.label}
                  </p>
                  <h3 className="mt-1 text-2xl font-black text-primary">{metric.value}</h3>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${metric.tone}`}>
                  <span className="material-symbols-outlined">{metric.icon}</span>
                </div>
              </div>
              <div className={`mt-4 border-t border-surface pt-4 text-xs font-medium ${metric.footerTone}`}>
                {metric.helper}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-slate-200/70 bg-slate-950 p-8 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-300">Operational Focus</p>
          <h3 className="mt-3 text-2xl font-black">{overviewCopy.title}</h3>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">
            This overview adapts to the signed-in role so each operator sees the most relevant workflow first.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
            {quickActions.map((action) => (
              <div key={action} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold">
                {action}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Session Snapshot</p>
          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between border-b border-surface pb-4">
              <span className="text-sm text-on-surface-variant">Signed in as</span>
              <span className="text-sm font-bold text-on-surface">{user?.name || 'Verified User'}</span>
            </div>
            <div className="flex items-center justify-between border-b border-surface pb-4">
              <span className="text-sm text-on-surface-variant">Role</span>
              <span className="rounded-full bg-surface-container px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-on-surface">
                {roleKey}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-surface pb-4">
              <span className="text-sm text-on-surface-variant">Phone</span>
              <span className="text-sm font-bold text-on-surface">{user?.phone || 'Not available'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-on-surface-variant">Latest Activity</span>
              <span className="text-sm font-bold text-on-surface">{stats.lastTransactionDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
