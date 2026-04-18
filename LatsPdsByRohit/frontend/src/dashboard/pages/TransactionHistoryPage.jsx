import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { API_BASE_URL } from '../../config'
import { useAuth } from '../../context/AuthContext'
import { isDealerRole } from '../../utils/roles'
import InlineSpinner from '../../components/ui/InlineSpinner'
import { EmptyState, PageLoader } from '../../components/ui/PageState'
import { getErrorMessage, readJsonSafely } from '../../utils/api'

function formatDateTime(dateValue) {
  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return { date: 'Unknown Date', time: '--:--' }
  }

  return {
    date: date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
    time: date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  }
}

function getStatusLabel(transaction) {
  return transaction.itemsCollected?.length ? 'VERIFIED' : 'PROCESSING'
}

const DEALER_ITEM_OPTIONS = ['Rice', 'Wheat', 'Sugar', 'Kerosene']

export default function TransactionHistoryPage() {
  const { token, user } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [customers, setCustomers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedUserId, setSelectedUserId] = useState('')
  const [selectedItemType, setSelectedItemType] = useState(DEALER_ITEM_OPTIONS[0])
  const [quantity, setQuantity] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const canCreateTransactions = isDealerRole(user?.role)

  async function loadTransactions() {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_BASE_URL}/transactions/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await readJsonSafely(response)

      if (!response.ok) {
        throw new Error(getErrorMessage(data, 'Unable to load your transactions.'))
      }

      setTransactions(Array.isArray(data) ? data : [])
    } catch (requestError) {
      const nextError = requestError.message || 'Unable to load your transactions.'
      setError(nextError)
      toast.error(nextError)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let isActive = true

    loadTransactions().catch(() => {})

    async function loadCustomers() {
      if (!canCreateTransactions) {
        if (isActive) {
          setCustomers([])
        }
        return
      }

      try {
        const response = await fetch(`${API_BASE_URL}/users/customers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await readJsonSafely(response)

        if (!response.ok) {
          throw new Error(getErrorMessage(data, 'Unable to load users for transaction entry.'))
        }

        if (isActive) {
          const nextCustomers = Array.isArray(data) ? data : []
          setCustomers(nextCustomers)
          setSelectedUserId((currentValue) => currentValue || nextCustomers[0]?._id || '')
        }
      } catch (requestError) {
        if (isActive) {
          const nextError = requestError.message || 'Unable to load users for transaction entry.'
          setSubmitError(nextError)
          toast.error(nextError)
        }
      }
    }

    loadCustomers()

    return () => {
      isActive = false
    }
  }, [canCreateTransactions, token])

  async function handleCreateTransaction(event) {
    event.preventDefault()
    setSubmitError('')
    setSubmitSuccess('')

    const normalizedQuantity = Number(quantity)

    if (!selectedUserId) {
      setSubmitError('Please select a user before submitting.')
      return
    }

    if (!selectedItemType) {
      setSubmitError('Please select an item before submitting.')
      return
    }

    if (!Number.isFinite(normalizedQuantity) || normalizedQuantity <= 0) {
      setSubmitError('Please enter a valid quantity greater than zero.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: selectedUserId,
          itemsCollected: [
            {
              itemType: selectedItemType,
              quantity: normalizedQuantity,
            },
          ],
        }),
      })

      const data = await readJsonSafely(response)

      if (!response.ok) {
        throw new Error(getErrorMessage(data, 'Unable to create the transaction.'))
      }

      setQuantity('')
      setSelectedUserId((currentValue) => currentValue || customers[0]?._id || '')
      setSelectedItemType(DEALER_ITEM_OPTIONS[0])
      setSubmitSuccess('Transaction recorded successfully.')
      toast.success('Transaction recorded successfully.')
      await loadTransactions()
    } catch (requestError) {
      const nextError = requestError.message || 'Unable to create the transaction.'
      setSubmitError(nextError)
      toast.error(nextError)
    } finally {
      setIsSubmitting(false)
    }
  }

  const stats = useMemo(() => {
    const lastTransaction = transactions[0]?.transactionDate || null

    return {
      totalCollections: transactions.length,
      lastActivity: lastTransaction
        ? formatDateTime(lastTransaction).date
        : 'No Activity Yet',
    }
  }, [transactions])

  return (
    <div className="max-w-6xl">
      <div className="mb-8 flex flex-col justify-between md:flex-row md:items-end">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Activity Log</span>
          <h2 className="text-5xl font-black tracking-tight text-on-surface">Transaction History</h2>
        </div>
        <div className="mt-6 flex gap-4 md:mt-0">
          <div className="rounded-xl border border-surface bg-surface-container-lowest px-6 py-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Total Collections</p>
            <p className="text-2xl font-black text-on-surface">{stats.totalCollections}</p>
          </div>
          <div className="rounded-xl border border-primary bg-primary px-6 py-4 text-on-primary">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary-container">Last Activity</p>
            <p className="text-2xl font-black">{stats.lastActivity}</p>
          </div>
        </div>
      </div>

      {canCreateTransactions ? (
        <div className="mb-8 rounded-2xl border border-surface bg-surface-container-lowest p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Dealer Access</span>
              <h3 className="text-2xl font-black tracking-tight text-on-surface">Create Transaction</h3>
            </div>
            <p className="max-w-md text-sm text-on-surface-variant">
              Record ration collection for a beneficiary and the history table below will refresh automatically.
            </p>
          </div>

          <form className="grid grid-cols-1 gap-4 md:grid-cols-4" onSubmit={handleCreateTransaction}>
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
                <option value="">Choose a beneficiary</option>
                {customers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.name} - {customer.phone}
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
                {DEALER_ITEM_OPTIONS.map((itemOption) => (
                  <option key={itemOption} value={itemOption}>
                    {itemOption}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Quantity
              </span>
              <input
                className="h-12 w-full rounded-xl border border-surface bg-white px-4 text-sm text-on-surface outline-none transition focus:border-primary"
                min="0"
                onChange={(event) => setQuantity(event.target.value)}
                placeholder="Enter quantity"
                step="0.01"
                disabled={isSubmitting}
                type="number"
                value={quantity}
              />
            </label>

            <div className="flex flex-col justify-end">
              <button
                className="h-12 rounded-xl bg-primary px-6 text-xs font-bold uppercase tracking-widest text-on-primary disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting || !customers.length}
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <InlineSpinner />
                    Saving...
                  </>
                ) : (
                  'Create Entry'
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

      <div className="rounded-2xl border border-surface bg-surface-container-lowest shadow-sm mb-8">
        <div className="flex flex-col border-b border-surface p-4 sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex gap-2">
            <button className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-on-primary">All Transactions</button>
            <button className="rounded-lg bg-transparent px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface">Pending</button>
            <button className="rounded-lg bg-transparent px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface">Verified</button>
            <button className="rounded-lg bg-transparent px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface">Flagged</button>
          </div>
          <div className="flex gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-surface text-on-surface-variant hover:bg-surface">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-surface text-on-surface-variant hover:bg-surface">
              <span className="material-symbols-outlined text-[18px]">download</span>
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="p-6">
            <PageLoader
              title="Loading your transactions..."
              description="We are collecting the latest receipts and ration issue records."
            />
          </div>
        ) : error ? (
          <div className="p-6 text-sm font-medium text-error">
            {error}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface-container border-b border-surface">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Date</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Transaction ID</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Shop Name</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Items Received</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Verification Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface">
                  {transactions.length ? (
                    transactions.map((transaction) => {
                      const formatted = formatDateTime(transaction.transactionDate)
                      const status = getStatusLabel(transaction)

                      return (
                        <tr key={transaction._id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-5">
                            <p className="font-bold text-on-surface">{formatted.date}</p>
                            <p className="text-xs text-on-surface-variant">{formatted.time}</p>
                          </td>
                          <td className="px-6 py-5 font-mono text-xs text-on-surface-variant">
                            {transaction.receiptId || transaction._id}
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">store</span>
                              <span className="font-bold text-on-surface">
                                {transaction.shop?.name || 'Unknown Shop'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex flex-wrap gap-1">
                              {(transaction.itemsCollected || []).map((item, index) => (
                                <span
                                  className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-100"
                                  key={`${transaction._id}-${item.itemType}-${index}`}
                                >
                                  {item.quantity} {item.itemType}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${
                              status === 'VERIFIED'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                              {status}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <button className="text-xs font-bold text-primary hover:underline">
                              View Receipt
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td className="px-6 py-8" colSpan={6}>
                        <EmptyState
                          description={canCreateTransactions
                            ? 'No transactions have been recorded yet. Use the dealer form above to create the first entry.'
                            : 'Your issued ration transactions will appear here once collection activity is recorded.'}
                          icon="receipt_long"
                          title="No transaction history found"
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center justify-between border-t border-surface px-6 py-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Showing {transactions.length} transaction{transactions.length === 1 ? '' : 's'}
              </p>
              <div className="flex gap-1">
                <button className="flex h-8 w-8 items-center justify-center rounded bg-surface-container text-on-surface-variant hover:bg-surface-variant"><span className="material-symbols-outlined text-[16px]">chevron_left</span></button>
                <button className="flex h-8 w-8 items-center justify-center rounded bg-primary text-on-primary font-bold">1</button>
                <button className="flex h-8 w-8 items-center justify-center rounded bg-surface-container text-on-surface-variant hover:bg-surface-variant"><span className="material-symbols-outlined text-[16px]">chevron_right</span></button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-primary bg-primary p-8 text-on-primary shadow-lg overflow-hidden relative">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-black/20 to-transparent"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-4">Supply Regularity Analysis</h3>
            <p className="text-primary-container leading-relaxed max-w-md mb-6">
              Your transaction history below is fetched directly from the ration distribution ledger.
              Dates, quantities, and shops are shown exactly as recorded.
            </p>
            <button className="rounded bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary hover:bg-slate-100">
              Download Annual Report
            </button>
          </div>
        </div>
        
        <div className="rounded-2xl border border-surface bg-surface-container-lowest p-8 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container text-primary mb-4">
            <span className="material-symbols-outlined">verified</span>
          </div>
          <h3 className="text-lg font-bold text-on-surface mb-2">Biometric Security</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
            Every collected item displayed above includes the quantity recorded against your account
            for that transaction.
          </p>
          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:underline">
            Security Settings <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  )
}
