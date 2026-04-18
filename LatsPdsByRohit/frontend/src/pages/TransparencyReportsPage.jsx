import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { apiClient } from '../lib/apiClient'
import { EmptyState, PageLoader } from '../components/ui/PageState'
import { getApiErrorMessage } from '../utils/api'
import { downloadCsv } from '../utils/actions'

function sumInventory(shops, itemType) {
  return shops.reduce((sum, shop) => {
    const matchedItem = (shop.inventory || []).find((item) => item.itemType === itemType)
    return sum + Number(matchedItem?.availableQuantity || 0)
  }, 0)
}

export default function TransparencyReportsPage() {
  const [shops, setShops] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadShops() {
      setIsLoading(true)
      setError('')

      try {
        const response = await apiClient.get('/shops')

        if (isMounted) {
          setShops(Array.isArray(response.data) ? response.data : [])
        }
      } catch (requestError) {
        if (isMounted) {
          const nextError = getApiErrorMessage(requestError, 'Unable to load transparency reports.')
          setError(nextError)
          toast.error(nextError)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadShops()

    return () => {
      isMounted = false
    }
  }, [])

  const stats = useMemo(() => {
    const activeShops = shops.filter((shop) => shop.status === 'Active').length
    const shopsWithDealers = shops.filter((shop) => shop.dealerId?._id).length
    const totalInventory =
      sumInventory(shops, 'Wheat') +
      sumInventory(shops, 'Rice') +
      sumInventory(shops, 'Sugar') +
      sumInventory(shops, 'Kerosene')

    return {
      totalShops: shops.length,
      activeShops,
      activeRate: shops.length ? Math.round((activeShops / shops.length) * 100) : 0,
      dealerCoverage: shops.length ? Math.round((shopsWithDealers / shops.length) * 100) : 0,
      totalInventory,
      wheat: sumInventory(shops, 'Wheat'),
      rice: sumInventory(shops, 'Rice'),
      sugar: sumInventory(shops, 'Sugar'),
    }
  }, [shops])

  const disclosureCards = useMemo(
    () => [
      {
        title: 'Shop Directory Audit',
        label: 'LIVE DIRECTORY',
        description: `${stats.totalShops} registered shop records are currently available in the public directory.`,
        value: `${stats.activeShops}/${stats.totalShops || 0}`,
        footer: 'Active shops',
        icon: 'description',
      },
      {
        title: 'Dealer Assignment Coverage',
        label: 'OPERATIONS',
        description: 'Tracks how many listed shops are linked to an assigned dealer account.',
        value: `${stats.dealerCoverage}%`,
        footer: 'Dealer mapping coverage',
        icon: 'analytics',
      },
      {
        title: 'Inventory Snapshot',
        label: 'MONTHLY',
        description: 'Summarizes visible listed stock across the live shop inventory records.',
        value: `${stats.totalInventory.toFixed(0)} KG`,
        footer: 'Visible inventory',
        icon: 'verified_user',
      },
    ],
    [stats],
  )

  function handleExportSnapshot() {
    if (!shops.length) {
      toast.error('No transparency data is available to export.')
      return
    }

    downloadCsv(
      'transparency-snapshot.csv',
      ['Shop ID', 'Shop Name', 'Status', 'Dealer', 'Visible Inventory'],
      shops.map((shop) => [
        shop.shopId,
        shop.name,
        shop.status,
        shop.dealerId?.name || 'Unassigned',
        (shop.inventory || []).reduce((sum, item) => sum + Number(item.availableQuantity || 0), 0).toFixed(1),
      ]),
    )
    toast.success('Transparency snapshot exported.')
  }

  return (
    <main className="mx-auto max-w-screen-2xl px-4 pb-24 pt-32 md:px-8">
      <header className="mb-20">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <span className="label-md mb-4 block font-bold uppercase tracking-[0.2em] text-primary">
              Institutional Accountability
            </span>
            <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-tighter text-primary md:text-[3.5rem]">
              Transparency Reports
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-secondary">
              Live operational snapshots built from the current backend shop directory. These public
              metrics help visitors understand network coverage, inventory visibility, and dealer assignment health.
            </p>
          </div>
          <div className="flex w-full min-w-0 items-center gap-6 rounded-xl bg-surface-container-low p-6 md:w-auto md:min-w-[300px] md:p-8">
            <div className="h-16 w-1 bg-primary" />
            <div>
              <div className="text-3xl font-black text-primary">{stats.activeRate}%</div>
              <div className="text-xs font-bold uppercase tracking-widest text-outline">
                Active Shop Availability
              </div>
            </div>
          </div>
        </div>
      </header>

      {isLoading ? (
        <PageLoader
          title="Loading transparency reports..."
          description="We are building public metrics from the latest shop directory records."
        />
      ) : error ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm font-medium text-error shadow-sm">
          {error}
        </div>
      ) : !shops.length ? (
        <EmptyState
          title="No transparency data available"
          description="No shop records are currently available to generate public transparency summaries."
          icon="monitoring"
        />
      ) : (
        <>
          <section className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="relative overflow-hidden rounded-2xl bg-surface-container-low p-6 md:col-span-8 md:p-8">
              <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-primary">Inventory Trends</h3>
                  <p className="text-sm text-secondary">
                    Live public inventory totals from the current shop directory.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="rounded-full bg-surface-container-lowest px-3 py-1 text-[10px] font-bold text-primary">
                    LIVE DATA
                  </span>
                </div>
              </div>
              <div className="flex h-64 items-end justify-between gap-2 px-2 md:px-4">
                {[
                  { label: 'Wheat', value: stats.wheat, color: 'bg-primary' },
                  { label: 'Rice', value: stats.rice, color: 'bg-primary' },
                  { label: 'Sugar', value: stats.sugar, color: 'bg-primary' },
                  { label: 'Shops', value: stats.totalShops, color: 'bg-primary' },
                  { label: 'Active', value: stats.activeShops, color: 'bg-primary' },
                  { label: 'Dealers', value: Math.round((stats.dealerCoverage / 100) * (stats.totalShops || 0)), color: 'bg-primary' },
                ].map((entry) => {
                  const maxValue = Math.max(stats.wheat, stats.rice, stats.sugar, stats.totalShops, stats.activeShops, 1)
                  const height = `${Math.max((entry.value / maxValue) * 100, entry.value > 0 ? 18 : 0)}%`

                  return (
                    <div key={entry.label} className="group relative h-full w-full rounded-t-sm bg-primary-fixed-dim/20">
                      <div className={`absolute bottom-0 w-full rounded-t-sm ${entry.color} transition-all duration-500 group-hover:brightness-110`} style={{ height }} />
                    </div>
                  )
                })}
              </div>
              <div className="mt-6 flex justify-between px-2 text-[10px] font-bold uppercase tracking-widest text-outline-variant md:px-4">
                <span>Wheat</span>
                <span>Rice</span>
                <span>Sugar</span>
                <span>Shops</span>
                <span>Active</span>
                <span>Dealers</span>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl bg-primary p-6 text-on-primary md:col-span-4 md:p-8">
              <div>
                <h3 className="mb-2 text-xl font-bold tracking-tight">Directory Coverage</h3>
                <p className="text-sm text-on-primary-container">
                  Publicly visible operational indicators derived from the shop registry.
                </p>
              </div>
              <div className="my-8 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                    <span>Active Shops</span>
                    <span>{stats.activeRate}%</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-on-primary/10">
                    <div className="h-full bg-on-primary-container" style={{ width: `${stats.activeRate}%` }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                    <span>Dealer Coverage</span>
                    <span>{stats.dealerCoverage}%</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-on-primary/10">
                    <div className="h-full bg-on-primary-container" style={{ width: `${stats.dealerCoverage}%` }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                    <span>Inventory Visibility</span>
                    <span>{stats.totalInventory.toFixed(0)} KG</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-on-primary/10">
                    <div className="h-full w-full bg-white" />
                  </div>
                </div>
              </div>
              <button
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all hover:gap-4"
                onClick={handleExportSnapshot}
                type="button"
              >
                LIVE DIRECTORY SNAPSHOT <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </section>

          <section className="mb-20">
            <div className="mb-10 flex items-center gap-4">
              <h2 className="text-2xl font-bold tracking-tight text-primary">Annual &amp; Monthly Disclosures</h2>
              <div className="h-px flex-grow bg-surface-container" />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {disclosureCards.map((card) => (
                <div key={card.title} className="group rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-6 transition-shadow hover:shadow-xl">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="rounded-lg bg-surface-container-low p-3 transition-colors group-hover:bg-primary group-hover:text-on-primary">
                      <span className="material-symbols-outlined">{card.icon}</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-outline">
                      {card.label}
                    </span>
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-primary">{card.title}</h4>
                  <p className="mb-6 text-sm text-secondary">{card.description}</p>
                  <div className="flex items-center justify-between rounded-lg bg-surface-container-low px-4 py-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-secondary">{card.footer}</span>
                    <span className="text-sm font-black text-primary">{card.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  )
}
