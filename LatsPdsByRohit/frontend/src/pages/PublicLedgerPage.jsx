import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { SIGN_IN_ROUTE } from '../constants/routes'
import { useAuth } from '../context/AuthContext'
import { apiClient } from '../lib/apiClient'
import { EmptyState, PageLoader } from '../components/ui/PageState'
import { getApiErrorMessage } from '../utils/api'
import { downloadCsv } from '../utils/actions'

function formatDateTime(dateValue) {
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

function getVerificationTone(receiptId) {
  if (!receiptId) {
    return {
      label: 'Pending Review',
      className: 'text-blue-700',
      icon: 'pending_actions',
    }
  }

  return {
    label: 'Recorded',
    className: 'text-green-700',
    icon: 'check_circle',
  }
}

export default function PublicLedgerPage() {
  const { isAuthenticated } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCommodity, setSelectedCommodity] = useState('All Types')

  useEffect(() => {
    if (!isAuthenticated) {
      setTransactions([])
      setError('')
      return
    }

    let isMounted = true

    async function loadTransactions() {
      setIsLoading(true)
      setError('')

      try {
        const response = await apiClient.get('/transactions')
        

        if (isMounted) {
          setTransactions(Array.isArray(response.data) ? response.data : [])
        }
      } catch (requestError) {
        if (isMounted) {
          const nextError = getApiErrorMessage(requestError, 'Unable to load the transaction ledger.')
          setError(nextError)
          toast.error(nextError)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadTransactions()

    return () => {
      isMounted = false
    }
  }, [isAuthenticated])

  const commodityOptions = useMemo(() => {
    const itemTypes = new Set()

    transactions.forEach((transaction) => {
      ;(transaction.itemsCollected || []).forEach((item) => itemTypes.add(item.itemType))
    })

    return ['All Types', ...Array.from(itemTypes)]
  }, [transactions])

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const searchableText = [
        transaction.receiptId,
        transaction.shop?.name,
        transaction.shop?.location,
        ...(transaction.itemsCollected || []).map((item) => item.itemType),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      const matchesSearch = !searchTerm.trim() || searchableText.includes(searchTerm.trim().toLowerCase())
      const matchesCommodity =
        selectedCommodity === 'All Types' ||
        (transaction.itemsCollected || []).some((item) => item.itemType === selectedCommodity)

      return matchesSearch && matchesCommodity
    })
  }, [searchTerm, selectedCommodity, transactions])

  const stats = useMemo(() => {
    const today = new Date()
    const todayKey = today.toDateString()
    const totalQuantity = transactions.reduce(
      (sum, transaction) =>
        sum +
        (transaction.itemsCollected || []).reduce(
          (itemSum, item) => itemSum + (Number(item.quantity) || 0),
          0,
        ),
      0,
    )
    const todayTransactions = transactions.filter(
      (transaction) => new Date(transaction.transactionDate).toDateString() === todayKey,
    ).length
    const uniqueShops = new Set(transactions.map((transaction) => transaction.shop?._id).filter(Boolean)).size

    return {
      totalTransactions: transactions.length,
      todayTransactions,
      totalQuantity,
      uniqueShops,
    }
  }, [transactions])

  function handleExportLedger() {
    if (!filteredTransactions.length) {
      toast.error('No ledger records are available to export.')
      return
    }

    downloadCsv(
      'public-ledger.csv',
      ['Receipt ID', 'Shop', 'Location', 'Items', 'Timestamp'],
      filteredTransactions.map((transaction) => [
        transaction.receiptId || transaction._id,
        transaction.shop?.name || 'Unknown Shop',
        transaction.shop?.location || 'Location unavailable',
        (transaction.itemsCollected || []).map((item) => `${item.quantity} ${item.itemType}`).join('; '),
        formatDateTime(transaction.transactionDate),
      ]),
    )
    toast.success('Ledger export downloaded.')
  }

  return (
    <main className="mx-auto max-w-screen-2xl px-4 pb-20 pt-24 md:px-8">
      <header className="mb-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-2 block text-label-md font-bold uppercase tracking-[0.05em] text-secondary">
              National Transparency Protocol
              
            </span>
            <h1 className="text-4xl font-extrabold leading-none tracking-tighter text-primary sm:text-5xl">
              Public Ledger
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-secondary">
              Review recorded ration transactions from the backend ledger. Signed-in users see the
              ledger scope allowed by their role and permissions.
            </p>
          </div>
          <div className="flex w-full flex-col gap-4 sm:flex-row md:w-auto">
            <button
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-surface-container-highest px-6 py-3 font-semibold text-on-surface-variant transition-colors hover:bg-surface-variant sm:w-auto"
              onClick={handleExportLedger}
              type="button"
            >
              <span className="material-symbols-outlined">download</span>
              Export Data
            </button>
            {!isAuthenticated ? (
              <Link
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-on-primary transition-opacity hover:opacity-90 sm:w-auto"
                to={SIGN_IN_ROUTE}
              >
                <span className="material-symbols-outlined">login</span>
                Sign In for Ledger Access
              </Link>
            ) : null}
          </div>
        </div>
      </header>

      {!isAuthenticated ? (
        <EmptyState
          title="Sign in to access the live ledger"
          description="The transaction ledger is protected by the backend now. Sign in to review the transactions visible to your account role."
          icon="shield_lock"
        />
      ) : isLoading ? (
        <PageLoader
          title="Loading transaction ledger..."
          description="We are retrieving the latest transaction records allowed for your account."
        />
      ) : error ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm font-medium text-error shadow-sm">
          {error}
        </div>
      ) : (
        <>
          <section className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex min-h-[180px] flex-col justify-between rounded-xl bg-surface-container-lowest p-6 md:p-8">
              <div className="flex items-start justify-between">
                <span className="text-label-md font-bold uppercase tracking-wider text-secondary">
                  Ledger Records
                </span>
                <span className="material-symbols-outlined text-primary-container">receipt_long</span>
              </div>
              <div className="mt-6 md:mt-0">
                <div className="text-[3rem] font-black leading-none tracking-tighter text-primary md:text-[3.5rem]">
                  {stats.totalTransactions}
                </div>
                <div className="mt-2 flex items-center gap-1 text-sm font-medium text-green-700 md:mt-4">
                  <span className="material-symbols-outlined text-xs">database</span>
                  <span>Live transaction records</span>
                </div>
              </div>
            </div>

            <div className="flex min-h-[180px] flex-col justify-between rounded-xl bg-primary p-6 text-on-primary shadow-lg md:p-8">
              <div className="flex items-start justify-between">
                <span className="text-label-md font-bold uppercase tracking-wider opacity-80">
                  Transactions Today
                </span>
                <span className="material-symbols-outlined opacity-80">today</span>
              </div>
              <div className="mt-6 md:mt-0">
                <div className="text-[3rem] font-black leading-none tracking-tighter md:text-[3.5rem]">
                  {stats.todayTransactions}
                </div>
                <div className="mt-2 flex items-center gap-1 text-sm font-medium opacity-80 md:mt-4">
                  <span className="material-symbols-outlined text-xs">update</span>
                  <span>Calculated from current ledger scope</span>
                </div>
              </div>
            </div>

            <div className="flex min-h-[180px] flex-col justify-between rounded-xl bg-secondary-container p-6 md:p-8">
              <div className="flex items-start justify-between">
                <span className="text-label-md font-bold uppercase tracking-wider text-on-secondary-container">
                  Quantity Recorded
                </span>
                <span className="material-symbols-outlined text-on-secondary-container">inventory_2</span>
              </div>
              <div className="mt-6 md:mt-0">
                <div className="text-[3rem] font-black leading-none tracking-tighter text-on-secondary-container md:text-[3.5rem]">
                  {stats.totalQuantity.toFixed(1)}
                  <span className="ml-1 text-2xl font-bold">KG</span>
                </div>
                <div className="mt-2 flex items-center gap-1 text-sm font-medium text-on-secondary-container md:mt-4">
                  <span className="material-symbols-outlined text-xs">storefront</span>
                  <span>{stats.uniqueShops} shop ledger sources</span>
                </div>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl bg-surface-container-low">
            <div className="flex flex-col justify-between gap-4 px-4 py-6 md:flex-row md:items-center md:px-8">
              <div className="relative max-w-full flex-1 md:max-w-md">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  search
                </span>
                <input
                  className="w-full rounded-lg border-none bg-surface-container-lowest py-3 pl-12 pr-4 text-on-surface focus:ring-2 focus:ring-primary"
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by receipt, shop, or commodity..."
                  type="text"
                  value={searchTerm}
                />
              </div>
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center justify-between gap-2 rounded-lg bg-surface-container px-4 py-2">
                  <span className="text-sm font-bold uppercase tracking-tight text-secondary">
                    Commodity:
                  </span>
                  <select
                    className="cursor-pointer border-none bg-transparent text-sm font-bold text-primary focus:ring-0"
                    onChange={(event) => setSelectedCommodity(event.target.value)}
                    value={selectedCommodity}
                  >
                    {commodityOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="min-w-[800px] w-full border-collapse text-left">
                <thead>
                  <tr className="border-none bg-surface-container-high">
                    <th className="px-4 py-4 text-label-md font-bold uppercase tracking-widest text-secondary md:px-8">
                      Transaction ID
                    </th>
                    <th className="px-4 py-4 text-label-md font-bold uppercase tracking-widest text-secondary md:px-6">
                      Location (FPS)
                    </th>
                    <th className="px-4 py-4 text-label-md font-bold uppercase tracking-widest text-secondary md:px-6">
                      Commodity Type
                    </th>
                    <th className="px-4 py-4 text-label-md font-bold uppercase tracking-widest text-secondary md:px-6">
                      Quantity
                    </th>
                    <th className="px-4 py-4 text-label-md font-bold uppercase tracking-widest text-secondary md:px-6">
                      Timestamp
                    </th>
                    <th className="px-4 py-4 text-label-md font-bold uppercase tracking-widest text-secondary md:px-8">
                      Verification
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.length ? (
                    filteredTransactions.map((transaction, index) => {
                      const verification = getVerificationTone(transaction.receiptId)
                      const rowTone = index % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low'

                      return (
                        <tr key={transaction._id} className={`${rowTone} group transition-colors hover:bg-primary-fixed`}>
                          <td className="px-4 py-6 font-mono text-sm font-bold text-primary md:px-8">
                            {transaction.receiptId || transaction._id}
                          </td>
                          <td className="px-4 py-6 md:px-6">
                            <div className="font-bold text-on-surface">{transaction.shop?.name || 'Unknown Shop'}</div>
                            <div className="text-xs text-secondary">
                              {transaction.shop?.location || 'Location unavailable'}
                            </div>
                          </td>
                          <td className="px-4 py-6 md:px-6">
                            <div className="flex flex-wrap gap-2">
                              {(transaction.itemsCollected || []).map((item, itemIndex) => (
                                <span
                                  key={`${transaction._id}-${item.itemType}-${itemIndex}`}
                                  className="rounded-full bg-secondary-container px-3 py-1 text-xs font-bold text-on-secondary-container"
                                >
                                  {item.itemType}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-6 font-bold text-primary md:px-6">
                            {(transaction.itemsCollected || [])
                              .reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)
                              .toFixed(1)} KG
                          </td>
                          <td className="px-4 py-6 text-sm text-secondary md:px-6">
                            {formatDateTime(transaction.transactionDate)}
                          </td>
                          <td className="px-4 py-6 md:px-8">
                            <div className={`flex items-center gap-2 text-sm font-bold ${verification.className}`}>
                              <span className="material-symbols-outlined text-lg">{verification.icon}</span>
                              {verification.label}
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td className="px-4 py-8 md:px-8" colSpan={6}>
                        <EmptyState
                          title="No matching transactions found"
                          description="Try adjusting the search term or commodity filter to see more ledger records."
                          icon="receipt_long"
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </main>
  )
}
