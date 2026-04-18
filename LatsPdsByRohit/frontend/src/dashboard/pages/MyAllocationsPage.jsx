import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { apiClient } from '../../lib/apiClient'
import { useAuth } from '../../context/AuthContext'
import { isAdminRole } from '../../utils/roles'
import InlineSpinner from '../../components/ui/InlineSpinner'
import { EmptyState, PageLoader } from '../../components/ui/PageState'
import { getApiErrorMessage } from '../../utils/api'
import { callPhoneNumber, downloadCsv, openMapQuery } from '../../utils/actions'

const ITEM_STYLES = {
  Wheat: {
    icon: 'grain',
    iconClass: 'bg-orange-100 text-orange-600',
  },
  Rice: {
    icon: 'grass',
    iconClass: 'bg-blue-100 text-blue-600',
  },
  Sugar: {
    icon: 'water_drop',
    iconClass: 'bg-pink-100 text-pink-600',
  },
  Kerosene: {
    icon: 'oil_barrel',
    iconClass: 'bg-yellow-100 text-yellow-600',
  },
}

const ALLOCATION_ITEM_OPTIONS = ['Rice', 'Wheat', 'Sugar', 'Kerosene']

function getCurrentMonthYear() {
  return new Date().toLocaleDateString('en-IN', {
    month: 'short',
    year: 'numeric',
  })
}

export default function MyAllocationsPage() {
  const { token, user } = useAuth()
  const [allocations, setAllocations] = useState([])
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedUserId, setSelectedUserId] = useState('')
  const [selectedItemType, setSelectedItemType] = useState(ALLOCATION_ITEM_OPTIONS[0])
  const [totalQuantity, setTotalQuantity] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const isAdmin = isAdminRole(user?.role)

  async function loadAllocations() {
    setIsLoading(true)
    setError('')

    try {
      const endpoint = isAdmin ? '/allocations' : '/allocations/my'
      const response = await apiClient.get(endpoint)
      setAllocations(Array.isArray(response.data) ? response.data : [])
    } catch (requestError) {
      const nextError = getApiErrorMessage(requestError, 'Unable to load your allocations.')
      setError(nextError)
      toast.error(nextError)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let isActive = true

    loadAllocations().catch(() => {})

    async function loadUsers() {
      if (!isAdmin) {
        if (isActive) {
          setUsers([])
        }
        return
      }

      try {
        const response = await apiClient.get('/users/customers')

        if (isActive) {
          const nextUsers = Array.isArray(response.data) ? response.data : []
          setUsers(nextUsers)
          setSelectedUserId((currentValue) => currentValue || nextUsers[0]?._id || '')
        }
      } catch (requestError) {
        if (isActive) {
          const nextError = getApiErrorMessage(
            requestError,
            'Unable to load users for allocation management.',
          )
          setSubmitError(nextError)
          toast.error(nextError)
        }
      }
    }

    loadUsers()

    return () => {
      isActive = false
    }
  }, [isAdmin, token])

  async function handleCreateAllocation(event) {
    event.preventDefault()
    setSubmitError('')
    setSubmitSuccess('')

    const normalizedQuantity = Number(totalQuantity)

    if (!selectedUserId) {
      setSubmitError('Please select a user before submitting.')
      return
    }

    if (!selectedItemType) {
      setSubmitError('Please select an item before submitting.')
      return
    }

    if (!Number.isFinite(normalizedQuantity) || normalizedQuantity <= 0) {
      setSubmitError('Please enter a valid total quantity greater than zero.')
      return
    }

    setIsSubmitting(true)

    try {
      await apiClient.post('/allocations', {
        userId: selectedUserId,
        itemType: selectedItemType,
        totalQuantity: normalizedQuantity,
        monthYear: getCurrentMonthYear(),
      })

      setTotalQuantity('')
      setSelectedUserId((currentValue) => currentValue || users[0]?._id || '')
      setSelectedItemType(ALLOCATION_ITEM_OPTIONS[0])
      setSubmitSuccess('Allocation created successfully.')
      toast.success('Allocation created successfully.')
      await loadAllocations()
    } catch (requestError) {
      const nextError = getApiErrorMessage(requestError, 'Unable to create allocation.')
      setSubmitError(nextError)
      toast.error(nextError)
    } finally {
      setIsSubmitting(false)
    }
  }

  const totals = useMemo(() => {
    const totalQuantity = allocations.reduce(
      (sum, allocation) => sum + Number(allocation.totalQuantity ?? allocation.quantity ?? 0),
      0,
    )
    const remainingQuantity = allocations.reduce(
      (sum, allocation) => sum + Number(allocation.quantity || 0),
      0,
    )

    return { totalQuantity, remainingQuantity }
  }, [allocations])

  const groupedAllocations = useMemo(() => {
    return allocations.map((allocation) => {
      const config = ITEM_STYLES[allocation.itemType] || {
        icon: 'inventory_2',
        iconClass: 'bg-slate-100 text-slate-600',
      }

      return {
        ...allocation,
        icon: config.icon,
        iconClass: config.iconClass,
        displayQuantity: Number(allocation.totalQuantity ?? allocation.quantity ?? 0),
        remainingQuantity: allocation.status === 'Collected' ? 0 : allocation.quantity || 0,
      }
    })
  }, [allocations])

  const claimedPercentage = totals.totalQuantity
    ? Math.round(((totals.totalQuantity - totals.remainingQuantity) / totals.totalQuantity) * 100)
    : 0

  const entitlementPeriod = allocations[0]?.monthYear || 'Current Cycle'

  function handleDownloadSlip() {
    if (!allocations.length) {
      toast.error('No allocation data is available to export.')
      return
    }

    downloadCsv(
      'allocation-slip.csv',
      ['Month', 'Item', 'Total Quantity', 'Remaining Quantity', 'Status'],
      allocations.map((allocation) => [
        allocation.monthYear,
        allocation.itemType,
        Number(allocation.totalQuantity ?? allocation.quantity ?? 0).toFixed(1),
        Number(allocation.quantity || 0).toFixed(1),
        allocation.status,
      ]),
    )
    toast.success('Allocation slip downloaded.')
  }

  function handleForecastPreview() {
    toast.success(`Current cycle ${entitlementPeriod}: ${totals.remainingQuantity.toFixed(1)} kg remaining.`)
  }

  function handleDirections() {
    openMapQuery('Authorized Fair Price Shop near me')
  }

  function handleCallCenter() {
    callPhoneNumber('18004429000')
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-6 flex flex-col justify-between md:flex-row md:items-end">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {isAdmin ? 'Admin Controls' : 'User Portal'}
          </span>
          <h2 className="text-5xl font-black tracking-tight text-on-surface">My Allocations</h2>
          <p className="mt-4 max-w-2xl text-lg text-on-surface-variant">
            {isAdmin
              ? 'Manage monthly grain allocations, assign quantities to users, and monitor active cycles from one place.'
              : 'View your authorized grain entitlements for the current cycle. Allocations are calculated based on household size and verified eligibility criteria.'}
          </p>
        </div>
        <button
          className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-on-primary shadow-sm hover:brightness-110 md:mt-0"
          onClick={handleDownloadSlip}
          type="button"
        >
          <span className="material-symbols-outlined">download</span>
          Download Allocation Slip
        </button>
      </div>

      {isAdmin ? (
        <div className="mb-8 rounded-2xl border border-surface bg-surface-container-lowest p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Admin Access</span>
              <h3 className="text-2xl font-black tracking-tight text-on-surface">Create Allocation</h3>
            </div>
            <p className="max-w-md text-sm text-on-surface-variant">
              Assign a monthly entitlement to a user and refresh the allocation ledger immediately after saving.
            </p>
          </div>

          <form className="grid grid-cols-1 gap-4 md:grid-cols-4" onSubmit={handleCreateAllocation}>
            <label className="block">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Select User
              </span>
              <select
                className="h-12 w-full rounded-xl border border-surface bg-white px-4 text-sm text-on-surface outline-none transition focus:border-primary"
                onChange={(event) => setSelectedUserId(event.target.value)}
                value={selectedUserId}
                disabled={isSubmitting}
              >
                <option value="">Choose a user</option>
                {users.map((entry) => (
                  <option key={entry._id} value={entry._id}>
                    {entry.name} - {entry.phone}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Item
              </span>
              <select
                className="h-12 w-full rounded-xl border border-surface bg-white px-4 text-sm text-on-surface outline-none transition focus:border-primary"
                onChange={(event) => setSelectedItemType(event.target.value)}
                value={selectedItemType}
                disabled={isSubmitting}
              >
                {ALLOCATION_ITEM_OPTIONS.map((itemOption) => (
                  <option key={itemOption} value={itemOption}>
                    {itemOption}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Total Quantity
              </span>
              <input
                className="h-12 w-full rounded-xl border border-surface bg-white px-4 text-sm text-on-surface outline-none transition focus:border-primary"
                min="0"
                onChange={(event) => setTotalQuantity(event.target.value)}
                placeholder="Enter quantity"
                step="0.01"
                disabled={isSubmitting}
                type="number"
                value={totalQuantity}
              />
            </label>

            <div className="flex flex-col justify-end">
              <button
                className="h-12 rounded-xl bg-primary px-6 text-xs font-bold uppercase tracking-widest text-on-primary disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting || !users.length}
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <InlineSpinner />
                    Saving...
                  </>
                ) : (
                  'Create Allocation'
                )}
              </button>
            </div>
          </form>

          {submitError ? (
            <p className="mt-4 text-sm font-medium text-error">{submitError}</p>
          ) : null}
          {submitSuccess ? (
            <p className="mt-4 text-sm font-medium text-green-700">{submitSuccess}</p>
          ) : null}
        </div>
      ) : null}

      {isLoading ? (
        <PageLoader
          title="Loading your allocations..."
          description="We are preparing the current allocation cycle and quantity details."
        />
      ) : error ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-sm font-medium text-error shadow-sm">
          {error}
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-surface bg-surface-container-lowest p-8 shadow-sm">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-on-surface">Current Entitlement Period</h3>
                  <p className="text-sm font-medium text-on-surface-variant">{entitlementPeriod}</p>
                </div>
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-on-primary">
                  Active Cycle
                </span>
              </div>

              <div className="mb-8 rounded-2xl border border-surface bg-white p-6 shadow-sm">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      Total Quantity
                    </p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-4xl font-black text-on-surface">{totals.totalQuantity.toFixed(1)}</span>
                      <span className="text-sm font-bold text-on-surface-variant">kg</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      Remaining Quantity
                    </p>
                    <div className="mt-1 flex items-baseline justify-end gap-2">
                      <span className="text-2xl font-black text-primary">{totals.remainingQuantity.toFixed(1)}</span>
                      <span className="text-sm font-bold text-on-surface-variant">kg</span>
                    </div>
                  </div>
                </div>
                <div className="h-1 w-full bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${claimedPercentage}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {groupedAllocations.length ? (
                  groupedAllocations.map((allocation) => (
                    <div className="rounded-xl border border-surface bg-white p-6 shadow-sm" key={allocation._id}>
                      <div className="flex justify-between">
                        <div className={`flex h-10 w-10 items-center justify-center rounded ${allocation.iconClass}`}>
                          <span className="material-symbols-outlined">{allocation.icon}</span>
                        </div>
                        <span className={`rounded px-2 py-1 text-[10px] font-bold uppercase ${
                          allocation.status === 'Collected'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {allocation.status}
                        </span>
                      </div>
                      <div className="mt-6">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                          {allocation.itemType} Allocation
                        </p>
                        {isAdmin && allocation.user?.name ? (
                          <p className="mt-1 text-xs font-medium text-on-surface-variant">
                            {allocation.user.name}
                          </p>
                        ) : null}
                        <div className="mt-1 flex items-baseline gap-1">
                          <span className="text-4xl font-black text-on-surface">{allocation.displayQuantity.toFixed(1)}</span>
                          <span className="text-sm font-bold text-on-surface-variant">kg</span>
                        </div>
                      </div>
                      <div className="mt-6 border-t border-surface pt-4 text-xs font-medium text-on-surface-variant">
                        Remaining: {allocation.remainingQuantity.toFixed(1)} kg
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="sm:col-span-2">
                    <EmptyState
                      description={isAdmin
                        ? 'No allocations have been created yet. Use the admin form above to assign the first monthly allocation.'
                        : 'No allocations are available for your account yet. New monthly quantities will appear here once issued.'}
                      icon="inventory_2"
                      title={isAdmin ? 'No allocations in the ledger' : 'No allocations found'}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-surface bg-primary p-8 text-on-primary flex flex-col md:flex-row justify-between items-center shadow-lg">
              <div>
                <h3 className="text-xl font-bold">Next Forecast</h3>
                <div className="mt-4 flex gap-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-primary-container">Total Quantity</p>
                    <p className="text-xl font-bold">{totals.totalQuantity.toFixed(1)} kg</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-primary-container">Remaining Quantity</p>
                    <p className="text-xl font-bold">{totals.remainingQuantity.toFixed(1)} kg</p>
                  </div>
                </div>
              </div>
              <button
                className="mt-6 w-full rounded bg-on-primary px-6 py-3 font-bold text-primary hover:bg-slate-100 md:mt-0 md:w-auto"
                onClick={handleForecastPreview}
                type="button"
              >
                View Full Forecast
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-surface bg-surface-container-lowest p-6 shadow-sm">
              <h3 className="mb-6 text-[11px] font-bold uppercase tracking-widest text-primary">Household Context</h3>

              <div className="space-y-4">
                <div className="flex justify-between border-b border-surface pb-3">
                  <span className="text-sm font-medium text-on-surface-variant">Account Holder</span>
                  <span className="font-bold text-on-surface">{user?.name || 'User'}</span>
                </div>
                <div className="flex justify-between border-b border-surface pb-3">
                  <span className="text-sm font-medium text-on-surface-variant">Ration Card</span>
                  <span className="font-bold text-on-surface text-right">
                    {user?.rationCardNumber || 'Not Assigned'}
                  </span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-sm font-medium text-on-surface-variant">Verification Status</span>
                  <span className="font-bold text-state-success flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    Validated
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-surface bg-surface-container-lowest p-0 shadow-sm overflow-hidden">
              <div className="h-40 w-full bg-slate-300 relative">
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg border-2 border-white">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-primary mb-2">Fair Price Shop (FPS)</h3>
                <p className="font-bold text-on-surface truncate">Pickup mapping pending</p>
                <p className="mt-1 text-sm text-on-surface-variant leading-tight">
                  This account does not currently expose a mapped pickup shop from the backend.
                </p>
                <div className="mt-6 flex gap-3">
                  <button
                    className="flex-1 rounded bg-surface-container py-2 text-xs font-bold text-on-surface hover:bg-surface-variant"
                    onClick={handleDirections}
                    type="button"
                  >
                    Directions
                  </button>
                  <button
                    className="flex-1 rounded bg-surface-container py-2 text-xs font-bold text-on-surface hover:bg-surface-variant"
                    onClick={handleCallCenter}
                    type="button"
                  >
                    Call Center
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-red-50 p-6 border border-red-100">
              <h3 className="flex items-center gap-2 text-sm font-bold text-error mb-3">
                <span className="material-symbols-outlined filled-star">warning</span>
                ENTITLEMENT NOTICE
              </h3>
              <p className="text-xs text-error/80 font-medium leading-relaxed">
                Remaining quantity shown above is calculated directly from your active allocations.
                Collected items are counted as fully claimed.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
