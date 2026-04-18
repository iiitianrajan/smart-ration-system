import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FAIR_PRICE_SHOPS_ROUTE,
  PUBLIC_LEDGER_ROUTE,
  REGISTER_ROUTE,
  SIGN_IN_ROUTE,
  TRANSPARENCY_REPORTS_ROUTE,
} from '../constants/routes'
import { useLanguage } from '../context/LanguageContext'
import { apiClient } from '../lib/apiClient'
import { PageLoader } from '../components/ui/PageState'

function sumInventory(shops, itemType) {
  return shops.reduce((sum, shop) => {
    const matchedItem = (shop.inventory || []).find((item) => item.itemType === itemType)
    return sum + Number(matchedItem?.availableQuantity || 0)
  }, 0)
}

export default function HomePage() {
  const { t } = useLanguage()
  const [shops, setShops] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [openFaq, setOpenFaq] = useState(0)

  useEffect(() => {
    let isMounted = true

    async function loadHomeMetrics() {
      try {
        const response = await apiClient.get('/shops')

        if (isMounted) {
          setShops(Array.isArray(response.data) ? response.data : [])
        }
      } catch {
        if (isMounted) {
          setShops([])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadHomeMetrics()

    return () => {
      isMounted = false
    }
  }, [])

  const metrics = useMemo(() => {
    const activeShops = shops.filter((shop) => shop.status === 'Active').length
    const totalInventory =
      sumInventory(shops, 'Wheat') +
      sumInventory(shops, 'Rice') +
      sumInventory(shops, 'Sugar') +
      sumInventory(shops, 'Kerosene')
    const assignedDealers = shops.filter((shop) => shop.dealerId?._id).length

    return {
      totalShops: shops.length,
      activeShops,
      totalInventory,
      assignedDealers,
      coverageRate: shops.length ? Math.round((activeShops / shops.length) * 100) : 0,
    }
  }, [shops])

  const previewRows = useMemo(() => {
    return shops.slice(0, 3).map((shop) => ({
      id: shop.shopId,
      location: shop.location,
      quantity:
        (shop.inventory || []).reduce((sum, item) => sum + Number(item.availableQuantity || 0), 0) || 0,
      status: shop.status === 'Active' ? 'Verified' : 'Inactive',
    }))
  }, [shops])

  const faqs = [
    {
      question: t('home.faq1q'),
      answer: t('home.faq1a'),
    },
    {
      question: t('home.faq2q'),
      answer: t('home.faq2a'),
    },
    {
      question: t('home.faq3q'),
      answer: t('home.faq3a'),
    },
  ]

  function scrollToSection(sectionId) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="mt-20">
      <section className="relative overflow-hidden px-8 pb-32 pt-24">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center gap-16 lg:flex-row">
          <div className="lg:w-1/2">
            <span className="label-md mb-4 block font-bold uppercase tracking-widest text-primary">
              {t('home.heroTag')}
            </span>
            <h1 className="mb-8 text-6xl font-extrabold leading-[1.1] tracking-tighter text-primary md:text-7xl">
              {t('home.heroTitleStart')}{' '}
              <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
                {t('home.heroTitleAccent')}
              </span>{' '}
              {t('home.heroTitleEnd')}
            </h1>
            <p className="mb-12 max-w-xl text-xl leading-relaxed text-on-surface-variant">
              {t('home.heroDescription')}
            </p>
            <div className="mb-16 flex flex-col gap-4 sm:flex-row">
              <Link
                className="w-full rounded-lg bg-primary px-10 py-5 text-center text-lg font-bold text-on-primary transition-all hover:shadow-xl sm:w-auto"
                to={PUBLIC_LEDGER_ROUTE}
              >
                {t('home.exploreLedger')}
              </Link>
              <button
                className="w-full rounded-lg bg-secondary-container px-10 py-5 text-center text-lg font-bold text-on-secondary-container transition-all hover:bg-surface-container sm:w-auto"
                onClick={() => scrollToSection('solution-infrastructure')}
                type="button"
              >
                {t('home.learnMore')}
              </button>
            </div>
            <div className="flex items-center gap-8 border-l-4 border-primary/20 pl-8">
              <div>
                <div className="text-3xl font-black tracking-tighter text-primary">{metrics.totalShops || 0}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  {t('home.registeredShops')}
                </div>
              </div>
              <div>
                <div className="text-3xl font-black tracking-tighter text-primary">{metrics.totalInventory.toFixed(0)}kg</div>
                <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  {t('home.visibleInventory')}
                </div>
              </div>
            </div>
          </div>
          <div className="relative lg:w-1/2">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-surface-container shadow-2xl">
              <img
                className="h-full w-full object-cover grayscale mix-blend-overlay opacity-30"
                data-alt="abstract close-up of a high-tech digital ledger screen with glowing blue data points and lines representing secure financial transactions"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzckIGu7U5nXO6RziV6YoC_IVsM3xR7uhGNG33jekAlYs16tbpvobeCbu888Qxnw94ul50OJynl-HtviZ3fAU6vlpilvDwoePLC6oAp_GSyuH63oDOdIVehbeRJ8Je_8vV2t1Pwk1gUTZP-2YlzGRAO9AV72VS_9ELOcuHwxfkalekxD-5pstXav8-gLbjrkrB85ZFAgGEV8KfXlVhoU9ef-WGB5jy5VQLHxDtsIjxaehJG3mAC_wGgnlllUHZOCeXpwSD2WvjuFk"
              />
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="w-full rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-2xl">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="font-bold text-primary">{t('home.liveShopFeed')}</span>
                    <span className="flex items-center gap-2 rounded bg-primary-fixed px-2 py-1 text-xs font-bold text-primary">
                      <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                      {t('home.live')}
                    </span>
                  </div>
                  {isLoading ? (
                    <div className="space-y-4">
                      <div className="h-12 animate-pulse rounded-lg bg-surface-container-low" />
                      <div className="h-12 w-3/4 animate-pulse rounded-lg bg-surface-container-low" />
                      <div className="h-12 animate-pulse rounded-lg bg-surface-container-low" />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {shops.slice(0, 3).map((shop) => (
                        <div key={shop._id} className="rounded-lg bg-surface-container-low px-4 py-3">
                          <p className="text-sm font-bold text-primary">{shop.name}</p>
                          <p className="text-xs text-on-surface-variant">{shop.location}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="absolute -right-12 -top-12 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 -z-10 h-48 w-48 rounded-full bg-primary-container/20 blur-2xl" />
          </div>
        </div>
      </section>

      {isLoading ? (
        <section className="bg-surface-container-low px-8 py-20">
          <div className="mx-auto max-w-screen-2xl">
            <PageLoader title="Loading live platform metrics..." description="We are retrieving public shop data for the homepage." />
          </div>
        </section>
      ) : (
        <>
          <section className="bg-surface-container-low px-8 py-20">
            <div className="mx-auto max-w-screen-2xl">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl bg-surface-container-lowest p-10 shadow-sm">
                  <div className="mb-4 text-primary-container">
                    <span className="material-symbols-outlined text-4xl">storefront</span>
                  </div>
                  <div className="mb-1 text-4xl font-black text-primary">{metrics.totalShops}</div>
                  <p className="font-medium text-on-surface-variant">{t('home.registeredShops')}</p>
                </div>
                <div className="rounded-xl bg-surface-container-lowest p-10 shadow-sm">
                  <div className="mb-4 text-primary-container">
                    <span className="material-symbols-outlined text-4xl">receipt_long</span>
                  </div>
                  <div className="mb-1 text-4xl font-black text-primary">{metrics.activeShops}</div>
                  <p className="font-medium text-on-surface-variant">{t('home.liveShopFeed')}</p>
                </div>
                <div className="rounded-xl bg-surface-container-lowest p-10 shadow-sm">
                  <div className="mb-4 text-primary-container">
                    <span className="material-symbols-outlined text-4xl">verified_user</span>
                  </div>
                  <div className="mb-1 text-4xl font-black text-primary">{metrics.coverageRate}%</div>
                  <p className="font-medium text-on-surface-variant">{t('home.visibleInventory')}</p>
                </div>
                <div className="rounded-xl bg-surface-container-lowest p-10 shadow-sm">
                  <div className="mb-4 text-primary-container">
                    <span className="material-symbols-outlined text-4xl">groups</span>
                  </div>
                  <div className="mb-1 text-4xl font-black text-primary">{metrics.assignedDealers}</div>
                  <p className="font-medium text-on-surface-variant">{t('home.operationsConsole')}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-8 py-32">
            <div className="mx-auto max-w-screen-2xl">
              <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
                <div className="max-w-2xl">
                  <span className="label-md font-bold uppercase tracking-widest text-primary">
                    {t('home.immutableRecord')}
                  </span>
                  <h2 className="mt-4 text-4xl font-bold tracking-tight">{t('home.publicLedgerTitle')}</h2>
                  <p className="mt-4 text-on-surface-variant">
                    {t('home.publicLedgerDescription')}
                  </p>
                </div>
                <Link className="rounded-lg bg-primary px-6 py-3 font-bold text-on-primary" to={PUBLIC_LEDGER_ROUTE}>
                  {t('home.viewFullLedger')}
                </Link>
              </div>
              <div className="mt-12 overflow-x-auto rounded-xl border border-outline-variant/10 bg-white shadow-sm">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-outline-variant bg-surface-container-low">
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest">Shop ID</th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest">FPS Location</th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest">Visible Stock (KG)</th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest">Dealer</th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30">
                    {previewRows.map((row) => (
                      <tr key={row.id} className="transition-colors hover:bg-primary-fixed/30">
                        <td className="px-6 py-4 font-mono text-sm">{row.id}</td>
                        <td className="px-6 py-4 text-sm">{row.location}</td>
                        <td className="px-6 py-4 text-sm font-bold">{row.quantity.toFixed(1)}</td>
                        <td className="px-6 py-4 text-sm">{row.status === 'Verified' ? 'Mapped / Active' : 'Pending Review'}</td>
                        <td className="px-6 py-4">
                          <span className={`rounded px-2 py-1 text-[10px] font-black uppercase ${row.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-slate-200 text-slate-700'}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </>
      )}

      <section className="bg-surface-container-low px-8 py-32">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-16 text-center text-4xl font-bold tracking-tight">{t('home.commonInquiries')}</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="rounded-xl bg-surface-container-low p-6">
                <button
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => setOpenFaq((currentValue) => (currentValue === index ? -1 : index))}
                  type="button"
                >
                  <span className="font-bold">{faq.question}</span>
                  <span className="material-symbols-outlined">{openFaq === index ? 'expand_less' : 'expand_more'}</span>
                </button>
                {openFaq === index ? (
                  <div className="mt-4 text-sm leading-relaxed text-on-surface-variant">{faq.answer}</div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 pb-32">
        <div className="relative mx-auto max-w-screen-2xl overflow-hidden rounded-[2rem] bg-primary p-20 text-center">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-white/5 to-transparent" />
          <h2 className="relative z-10 mb-8 text-5xl font-black tracking-tighter text-on-primary">
            {t('home.readyTitle')}
          </h2>
          <p className="relative z-10 mx-auto mb-12 max-w-2xl text-xl text-blue-200">
            {t('home.readyDescription')}
          </p>
          <div className="relative z-10 flex flex-wrap justify-center gap-6">
            <Link className="rounded-xl bg-on-primary px-12 py-5 text-lg font-black text-primary transition-all hover:bg-primary-fixed" to={SIGN_IN_ROUTE}>
              {t('home.getStarted')}
            </Link>
            <Link className="rounded-xl border-2 border-on-primary/30 px-12 py-5 text-lg font-black text-on-primary transition-all hover:bg-white/10" to={REGISTER_ROUTE}>
              {t('home.registerAccount')}
            </Link>
          </div>
        </div>
      </section>

      <section id="solution-infrastructure" className="bg-surface-container-low px-8 py-32">
        <div className="mx-auto max-w-screen-2xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <h2 className="mb-6 text-5xl font-black tracking-tighter text-primary">
                {t('home.solutionTitle')}
              </h2>
              <p className="text-lg leading-relaxed text-on-surface-variant">
                {t('home.solutionDescription')}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-2">
              <Link className="rounded-xl bg-surface-container-lowest p-8" to={FAIR_PRICE_SHOPS_ROUTE}>
                <span className="material-symbols-outlined mb-4 text-3xl text-primary">location_searching</span>
                <h4 className="mb-2 text-lg font-bold">{t('home.shopDirectory')}</h4>
                <p className="text-sm text-on-surface-variant">{t('home.shopDirectoryDesc')}</p>
              </Link>
              <Link className="rounded-xl bg-surface-container-lowest p-8" to={SIGN_IN_ROUTE}>
                <span className="material-symbols-outlined mb-4 text-3xl text-primary">fingerprint</span>
                <h4 className="mb-2 text-lg font-bold">{t('home.authenticatedAccess')}</h4>
                <p className="text-sm text-on-surface-variant">{t('home.authenticatedAccessDesc')}</p>
              </Link>
              <Link className="rounded-xl bg-surface-container-lowest p-8" to={REGISTER_ROUTE}>
                <span className="material-symbols-outlined mb-4 text-3xl text-primary">notifications_active</span>
                <h4 className="mb-2 text-lg font-bold">{t('home.verifiedOnboarding')}</h4>
                <p className="text-sm text-on-surface-variant">{t('home.verifiedOnboardingDesc')}</p>
              </Link>
              <Link className="rounded-xl bg-surface-container-lowest p-8" to={TRANSPARENCY_REPORTS_ROUTE}>
                <span className="material-symbols-outlined mb-4 text-3xl text-primary">analytics</span>
                <h4 className="mb-2 text-lg font-bold">{t('home.operationsConsole')}</h4>
                <p className="text-sm text-on-surface-variant">{t('home.operationsConsoleDesc')}</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
