import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { apiClient } from '../lib/apiClient'
import { EmptyState, PageLoader } from '../components/ui/PageState'
import { getApiErrorMessage } from '../utils/api'
import { openMapQuery } from '../utils/actions'

function getInventoryQuantity(shop, itemType) {
  const inventoryItem = (shop.inventory || []).find((item) => item.itemType === itemType)
  return Number(inventoryItem?.availableQuantity || 0)
}

export default function FairPriceShopsPage() {
  const [shops, setShops] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [districtFilter, setDistrictFilter] = useState('')
  const [pincodeFilter, setPincodeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Shops')

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
          const nextError = getApiErrorMessage(requestError, 'Unable to load fair price shops.')
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

  const filteredShops = useMemo(() => {
    return shops.filter((shop) => {
      const matchesDistrict =
        !districtFilter.trim() ||
        `${shop.name} ${shop.location} ${shop.ownerName}`.toLowerCase().includes(districtFilter.trim().toLowerCase())

      const matchesPincode =
        !pincodeFilter.trim() || String(shop.location || '').toLowerCase().includes(pincodeFilter.trim().toLowerCase())

      const matchesStatus =
        statusFilter === 'All Shops' ||
        (statusFilter === 'Currently Open' && shop.status === 'Active') ||
        (statusFilter === 'Stock Available' &&
          (shop.inventory || []).some((item) => Number(item.availableQuantity || 0) > 0))

      return matchesDistrict && matchesPincode && matchesStatus
    })
  }, [districtFilter, pincodeFilter, shops, statusFilter])

  function handleSearchResults() {
    toast.success(`${filteredShops.length} shop result${filteredShops.length === 1 ? '' : 's'} ready for review.`)
  }

  return (
    <main className="min-h-screen pt-24">
      <div className="mx-auto max-w-screen-2xl px-4 pb-12 md:px-8">
        <header className="mb-12">
          <div className="mb-2">
            <span className="label-md text-[0.75rem] font-bold uppercase tracking-[0.05em] text-on-surface-variant">
              Digital Directory
            </span>
          </div>
          <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-primary md:text-[3.5rem]">
            Fair Price Shops
          </h1>
          <div className="flex flex-col items-stretch gap-4 rounded-xl bg-surface-container-low p-4 md:flex-row md:items-end md:p-6">
            <div className="w-full md:w-1/3">
              <label className="mb-2 block text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">
                District / Region
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-t-lg border-none border-b-2 border-transparent bg-surface-container-highest px-4 py-3 transition-all focus:border-primary focus:bg-surface-container-lowest focus:ring-0"
                  onChange={(event) => setDistrictFilter(event.target.value)}
                  placeholder="e.g. South Delhi"
                  type="text"
                  value={districtFilter}
                />
                <span className="material-symbols-outlined absolute right-3 top-3 text-outline">
                  location_on
                </span>
              </div>
            </div>
            <div className="w-full md:w-1/4">
              <label className="mb-2 block text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">
                Pincode
              </label>
              <input
                className="w-full rounded-t-lg border-none border-b-2 border-transparent bg-surface-container-highest px-4 py-3 transition-all focus:border-primary focus:bg-surface-container-lowest focus:ring-0"
                onChange={(event) => setPincodeFilter(event.target.value)}
                placeholder="110001"
                type="text"
                value={pincodeFilter}
              />
            </div>
            <div className="w-full md:w-1/4">
              <label className="mb-2 block text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">
                Status Filter
              </label>
              <select
                className="w-full rounded-t-lg border-none border-b-2 border-transparent bg-surface-container-highest px-4 py-3 transition-all focus:border-primary focus:bg-surface-container-lowest focus:ring-0"
                onChange={(event) => setStatusFilter(event.target.value)}
                value={statusFilter}
              >
                <option>All Shops</option>
                <option>Currently Open</option>
                <option>Stock Available</option>
              </select>
            </div>
            <button
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 font-bold text-on-primary transition-all hover:bg-primary-container md:mt-0 md:w-auto"
              onClick={handleSearchResults}
              type="button"
            >
              <span className="material-symbols-outlined">search</span>
              {filteredShops.length} Shops Found
            </button>
          </div>
        </header>

        {isLoading ? (
          <PageLoader
            title="Loading fair price shops..."
            description="We are retrieving the latest shop directory and listed inventory from the backend."
          />
        ) : error ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm font-medium text-error shadow-sm">
            {error}
          </div>
        ) : (
          <div className="grid h-auto min-h-[600px] grid-cols-1 gap-8 lg:h-[calc(100vh-450px)] lg:grid-cols-12">
            <div className="no-scrollbar flex flex-col gap-4 overflow-y-auto pr-0 lg:col-span-5 lg:pr-4">
              {filteredShops.length ? (
                filteredShops.map((shop) => {
                  const isActive = shop.status === 'Active'

                  return (
                    <div
                      key={shop._id}
                      className={`rounded-xl bg-surface-container-lowest p-6 transition-all hover:shadow-md ${
                        isActive ? 'border-l-4 border-emerald-500' : 'border-l-4 border-slate-300'
                      }`}
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <span
                            className={`label-md mb-1 flex items-center gap-1 font-bold ${
                              isActive ? 'text-emerald-600' : 'text-slate-500'
                            }`}
                          >
                            <span
                              className={`h-2 w-2 rounded-full ${
                                isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                              }`}
                            />
                            {isActive ? 'OPEN NOW' : 'CLOSED'}
                          </span>
                          <h3 className="text-xl font-extrabold tracking-tight text-primary">
                            {shop.shopId}: {shop.name}
                          </h3>
                          <p className="mt-1 text-sm text-on-surface-variant">{shop.location}</p>
                        </div>
                        <span className="rounded-lg bg-surface-container p-2 text-primary">
                          <span className="material-symbols-outlined">storefront</span>
                        </span>
                      </div>
                      <div className="mb-6 grid grid-cols-3 gap-2 sm:gap-4">
                        {['Wheat', 'Rice', 'Sugar'].map((itemType) => (
                          <div key={itemType} className="rounded-lg bg-surface-container-low p-3 text-center">
                            <p className="text-[0.65rem] font-bold uppercase text-outline-variant">{itemType}</p>
                            <p className="font-bold text-primary">{getInventoryQuantity(shop, itemType)}kg</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                          className="flex-1 rounded-lg bg-secondary-container py-2.5 text-sm font-bold text-on-secondary-container transition-all hover:opacity-90"
                          onClick={() => openMapQuery(`${shop.name} ${shop.location}`)}
                          type="button"
                        >
                          Owner: {shop.ownerName}
                        </button>
                        <button
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-error/20 py-2.5 text-sm font-bold text-error transition-all hover:bg-error-container/20"
                          onClick={() => toast(shop.dealerId?.name ? `Assigned dealer: ${shop.dealerId.name}` : 'No dealer is assigned to this shop yet.')}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">person</span>
                          {shop.dealerId?.name || 'Dealer Unassigned'}
                        </button>
                      </div>
                    </div>
                  )
                })
              ) : (
                <EmptyState
                  title="No matching shops found"
                  description="Try adjusting the district, pincode, or status filter to find more shops."
                  icon="storefront"
                />
              )}
            </div>

            <div className="relative h-[400px] overflow-hidden rounded-2xl bg-surface-container lg:col-span-7 lg:h-auto">
              <img
                alt="Map"
                className="h-full w-full object-cover grayscale opacity-80"
                data-alt="Modern map interface with blue location markers and highlighted city districts in a clean minimal data visualization style"
                data-location="New Delhi"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVbHc1D2qdNq77UaYqeS4OlWLUysh5xTZ91DLLqzuEX5BwssJsh4cZ-IgVA2D-UC7oGqrr3jOfAWk48976qAK96xtvHOkMg4Z_PXYHP31Y34Px2CaYMMdLwSc7acUXIIEla21lUCwg2rJQncJvvrIlGABhyRWf6VJv8oMo9fWe6GhFEpv-XN0dWh4MFx6yqTUikdVtAhKUTpJa6oJmANOpLq3HfqIBnsjzGv1l7Drb7mz9BWihOXQVz-UIcX-58d47jBG4dkFllLo"
              />
              <div className="absolute left-6 top-6 flex flex-col gap-2">
                <button className="rounded bg-white p-2 shadow-md hover:bg-slate-100" onClick={() => toast('Map zoom in is a visual placeholder in this static map panel.')} type="button">
                  <span className="material-symbols-outlined">add</span>
                </button>
                <button className="rounded bg-white p-2 shadow-md hover:bg-slate-100" onClick={() => toast('Map zoom out is a visual placeholder in this static map panel.')} type="button">
                  <span className="material-symbols-outlined">remove</span>
                </button>
              </div>
              <div className="absolute bottom-6 right-6 flex gap-3">
                <button
                  className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-bold text-on-primary shadow-xl"
                  onClick={() => openMapQuery(filteredShops[0]?.location || 'Fair Price Shop near me')}
                  type="button"
                >
                  <span className="material-symbols-outlined">my_location</span>
                  Recenter
                </button>
                <button
                  className="flex items-center gap-2 rounded-lg bg-surface-container-lowest px-4 py-2 font-bold text-primary shadow-xl"
                  onClick={() => toast('Satellite mode is not available in this static preview map yet.')}
                  type="button"
                >
                  <span className="material-symbols-outlined">layers</span>
                  Satellite
                </button>
              </div>
              {filteredShops.slice(0, 3).map((shop, index) => (
                <div
                  key={shop._id}
                  className="group/pin absolute cursor-pointer"
                  style={{
                    top: `${32 + index * 18}%`,
                    left: `${30 + index * 16}%`,
                  }}
                >
                  <div className="h-4 w-4 rounded-full border-4 border-white bg-emerald-500 shadow-lg animate-bounce" />
                  <div className="absolute bottom-full left-1/2 mb-2 hidden min-w-[220px] -translate-x-1/2 rounded-lg bg-white p-3 shadow-2xl group-hover/pin:block">
                    <p className="text-xs font-bold text-emerald-600">{shop.shopId}</p>
                    <p className="text-sm font-extrabold text-primary">{shop.name}</p>
                    <p className="text-[10px] text-on-surface-variant">{shop.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
