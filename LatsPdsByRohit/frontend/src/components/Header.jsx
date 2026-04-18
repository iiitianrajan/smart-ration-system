import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  ALLOCATIONS_ROUTE,
  FAIR_PRICE_SHOPS_ROUTE,
  HOME_ROUTE,
  PUBLIC_LEDGER_ROUTE,
  REGISTER_ROUTE,
  SIGN_IN_ROUTE,
  TRANSPARENCY_REPORTS_ROUTE,
} from '../constants/routes'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

export default function Header({ route }) {
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()
  const { selectedLanguage, supportedLanguages, setLanguage, t } = useLanguage()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const searchRef = useRef(null)
  const searchInputRef = useRef(null)
  const languageMenuRef = useRef(null)

  const quickActions = useMemo(
    () => [
      {
        id: 'ledger',
        title: t('header.publicLedger'),
        subtitle: 'Immutable public audit trail',
        icon: 'table_view',
        shortcut: 'L',
        route: PUBLIC_LEDGER_ROUTE,
        keywords: ['ledger', 'audit', 'public'],
      },
      {
        id: 'shops',
        title: t('header.shops'),
        subtitle: 'Locate nearby ration shops',
        icon: 'storefront',
        shortcut: 'F',
        route: FAIR_PRICE_SHOPS_ROUTE,
        keywords: ['shop', 'dealer', 'fair', 'store'],
      },
      {
        id: 'allocations',
        title: t('header.allocations'),
        subtitle: 'Track monthly entitlement details',
        icon: 'inventory_2',
        shortcut: 'A',
        route: ALLOCATIONS_ROUTE,
        keywords: ['allocation', 'quota', 'entitlement'],
      },
      {
        id: 'reports',
        title: t('header.reports'),
        subtitle: 'Review analytics and disclosures',
        icon: 'monitoring',
        shortcut: 'T',
        route: TRANSPARENCY_REPORTS_ROUTE,
        keywords: ['report', 'transparency', 'analysis'],
      },
    ],
    [t],
  )

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const filteredActions = quickActions.filter((action) => {
    const searchableText = `${action.title} ${action.subtitle} ${action.keywords.join(' ')}`.toLowerCase()
    return normalizedQuery ? searchableText.includes(normalizedQuery) : true
  })

  useEffect(() => {
    function handleOutsideClick(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false)
      }

      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setIsLanguageMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus()
    }
  }, [isSearchOpen])

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsSearchOpen(false)
        setSearchQuery('')
      }
    }

    if (isSearchOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isSearchOpen])

  function handleSearchSubmit(event) {
    event.preventDefault()
    const query = searchQuery.trim().toLowerCase()

    if (!query) {
      return
    }

    const matchedAction = quickActions.find((action) =>
      `${action.title} ${action.subtitle} ${action.keywords.join(' ')}`
        .toLowerCase()
        .includes(query),
    )

    navigate(matchedAction?.route || HOME_ROUTE)
    setIsSearchOpen(false)
    setSearchQuery('')
  }

  async function handleLogout() {
    setIsLoggingOut(true)

    try {
      await logout()
      toast.success(t('header.logout'))
      navigate(HOME_ROUTE, { replace: true })
      setIsMobileMenuOpen(false)
    } catch {
      toast.error('Unable to sign out right now.')
    } finally {
      setIsLoggingOut(false)
    }
  }

  const publicLedgerLinkClass =
    route === PUBLIC_LEDGER_ROUTE
      ? 'text-blue-900 dark:text-white font-bold border-b-2 border-blue-900 dark:border-blue-400 pb-1'
      : 'text-slate-600 dark:text-slate-400 hover:text-blue-800 transition-colors'

  const fairPriceShopsLinkClass =
    route === FAIR_PRICE_SHOPS_ROUTE
      ? 'text-blue-900 dark:text-white font-bold border-b-2 border-blue-900 dark:border-blue-400 pb-1'
      : 'text-slate-600 dark:text-slate-400 hover:text-blue-800 transition-colors'

  const allocationsLinkClass =
    route === ALLOCATIONS_ROUTE
      ? 'text-blue-900 dark:text-white font-bold border-b-2 border-blue-900 dark:border-blue-400 pb-1'
      : 'text-slate-600 dark:text-slate-400 hover:text-blue-800 transition-colors'

  const transparencyReportsLinkClass =
    route === TRANSPARENCY_REPORTS_ROUTE
      ? 'text-blue-900 dark:text-white font-bold border-b-2 border-blue-900 dark:border-blue-400 pb-1'
      : 'text-slate-600 dark:text-slate-400 hover:text-blue-800 transition-colors'

  return (
    <nav className="fixed top-0 z-50 w-full bg-slate-50/90 shadow-sm backdrop-blur-md transition-all duration-300 ease-in-out dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-4 sm:px-8">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className="flex items-center justify-center rounded-md p-2 text-blue-900 transition-colors hover:bg-slate-200/70 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
          >
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
          <Link className="text-lg font-bold uppercase tracking-tighter text-blue-950 dark:text-white sm:text-xl" to={HOME_ROUTE}>
            RationGuard
          </Link>
        </div>

        <div className="hidden items-center space-x-8 font-public-sans tracking-tight lg:flex">
          <Link className={publicLedgerLinkClass} to={PUBLIC_LEDGER_ROUTE}>
            {t('header.publicLedger')}
          </Link>
          <Link className={fairPriceShopsLinkClass} to={FAIR_PRICE_SHOPS_ROUTE}>
            {t('header.shops')}
          </Link>
          <Link className={allocationsLinkClass} to={ALLOCATIONS_ROUTE}>
            {t('header.allocations')}
          </Link>
          <Link className={transparencyReportsLinkClass} to={TRANSPARENCY_REPORTS_ROUTE}>
            {t('header.reports')}
          </Link>
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          <div className="relative" ref={searchRef}>
            <button
              aria-label="Open search"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-blue-900 transition-all hover:bg-slate-200/70 hover:text-blue-950"
              onClick={() => setIsSearchOpen(true)}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px] sm:text-[22px]">search</span>
            </button>

            {isSearchOpen ? (
              <div className="fixed inset-0 z-[70] flex items-start justify-center bg-slate-900/25 px-2 pt-16 backdrop-blur-[3px] sm:px-4 sm:pt-20">
                <button
                  aria-label="Close search popup"
                  className="absolute inset-0"
                  onClick={() => {
                    setIsSearchOpen(false)
                    setSearchQuery('')
                  }}
                  type="button"
                />
                <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-[0_20px_55px_rgba(15,23,42,0.28)] dark:border-slate-700 dark:bg-slate-900/95">
                  <button
                    aria-label="Close search"
                    className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
                    onClick={() => {
                      setIsSearchOpen(false)
                      setSearchQuery('')
                    }}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[19px]">close</span>
                  </button>

                  <form className="flex h-12 items-center border-b border-slate-200 px-2 pr-12 dark:border-slate-700" onSubmit={handleSearchSubmit}>
                    <span className="material-symbols-outlined text-[20px] text-slate-500">search</span>
                    <input
                      aria-label="Search navigation"
                      className="h-full flex-1 bg-transparent px-3 text-sm text-blue-950 outline-none placeholder:text-slate-400 dark:text-slate-100"
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder={t('header.searchPlaceholder')}
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                    />
                  </form>

                  <div className="px-2 pt-3">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      {t('header.trending')}
                    </p>
                    <div className="max-h-60 overflow-y-auto sm:max-h-72">
                      {filteredActions.length ? (
                        filteredActions.map((action) => (
                          <button
                            className="mb-1 flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
                            key={action.id}
                            onClick={() => {
                              navigate(action.route)
                              setIsSearchOpen(false)
                              setSearchQuery('')
                            }}
                            type="button"
                          >
                            <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                              <span className="material-symbols-outlined text-[16px]">{action.icon}</span>
                            </span>
                            <span className="flex-1 overflow-hidden">
                              <span className="block truncate text-sm font-semibold text-slate-700 dark:text-slate-100">
                                {action.title}
                              </span>
                              <span className="block truncate text-[11px] text-slate-400">{action.subtitle}</span>
                            </span>
                            <span className="hidden rounded border border-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 dark:border-slate-700 sm:inline-block">
                              {action.shortcut}
                            </span>
                          </button>
                        ))
                      ) : (
                        <div className="rounded-lg px-2 py-6 text-center text-sm text-slate-400">
                          {t('header.noResults')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="relative" ref={languageMenuRef}>
            <button
              aria-expanded={isLanguageMenuOpen}
              aria-haspopup="menu"
              className="inline-flex h-10 items-center justify-center gap-1 rounded-full px-2 text-blue-900 transition-all hover:bg-slate-200/70 hover:text-blue-950 sm:px-3"
              onClick={() => setIsLanguageMenuOpen((open) => !open)}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] sm:text-[21px]">language</span>
              <span className="hidden text-[11px] font-bold sm:inline">{selectedLanguage.code}</span>
              <span className="hidden material-symbols-outlined text-[16px] sm:inline-block">
                {isLanguageMenuOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {isLanguageMenuOpen ? (
              <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white/95 p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900/95">
                {supportedLanguages.map((option) => {
                  const isSelected = option.code === selectedLanguage.code
                  return (
                    <button
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-all ${
                        isSelected
                          ? 'bg-slate-100 text-blue-900 dark:bg-slate-800 dark:text-white'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-blue-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                      }`}
                      key={option.code}
                      onClick={() => {
                        setLanguage(option.code)
                        setIsLanguageMenuOpen(false)
                      }}
                      type="button"
                    >
                      <span>{option.label}</span>
                      {isSelected ? <span className="material-symbols-outlined text-[16px]">check</span> : null}
                    </button>
                  )
                })}
              </div>
            ) : null}
          </div>

          {isAuthenticated ? (
            <button
              className="inline-flex h-8 items-center justify-center rounded-full bg-primary px-4 text-xs font-bold text-on-primary shadow-lg transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:h-10 sm:px-5 sm:text-sm"
              disabled={isLoggingOut}
              onClick={handleLogout}
              type="button"
            >
              {isLoggingOut ? t('header.loggingOut') : t('header.logout')}
            </button>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link className="inline-flex h-8 items-center justify-center rounded-full border border-slate-200 px-4 text-xs font-bold text-blue-900 transition-all hover:bg-slate-100 sm:h-10 sm:text-sm" to={REGISTER_ROUTE}>
                {t('header.register')}
              </Link>
              <Link className="inline-flex h-8 items-center justify-center rounded-full bg-primary px-4 text-xs font-bold text-on-primary shadow-lg transition-all hover:brightness-110 sm:h-10 sm:px-5 sm:text-sm" to={SIGN_IN_ROUTE}>
                {t('header.signIn')}
              </Link>
            </div>
          )}
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-900 lg:hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col space-y-1 px-4 pb-6 pt-2">
          <Link className={`rounded-lg px-4 py-3 font-semibold ${route === PUBLIC_LEDGER_ROUTE ? 'bg-blue-50 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'}`} onClick={() => setIsMobileMenuOpen(false)} to={PUBLIC_LEDGER_ROUTE}>
            {t('header.publicLedger')}
          </Link>
          <Link className={`rounded-lg px-4 py-3 font-semibold ${route === FAIR_PRICE_SHOPS_ROUTE ? 'bg-blue-50 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'}`} onClick={() => setIsMobileMenuOpen(false)} to={FAIR_PRICE_SHOPS_ROUTE}>
            {t('header.shops')}
          </Link>
          <Link className={`rounded-lg px-4 py-3 font-semibold ${route === ALLOCATIONS_ROUTE ? 'bg-blue-50 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'}`} onClick={() => setIsMobileMenuOpen(false)} to={ALLOCATIONS_ROUTE}>
            {t('header.allocations')}
          </Link>
          <Link className={`rounded-lg px-4 py-3 font-semibold ${route === TRANSPARENCY_REPORTS_ROUTE ? 'bg-blue-50 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'}`} onClick={() => setIsMobileMenuOpen(false)} to={TRANSPARENCY_REPORTS_ROUTE}>
            {t('header.reports')}
          </Link>
          {isAuthenticated ? (
            <button
              className="mt-2 rounded-lg bg-primary px-4 py-3 text-left font-semibold text-on-primary disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isLoggingOut}
              onClick={handleLogout}
              type="button"
            >
              {isLoggingOut ? t('header.loggingOut') : t('header.logout')}
            </button>
          ) : (
            <>
              <Link className="rounded-lg px-4 py-3 font-semibold text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800" onClick={() => setIsMobileMenuOpen(false)} to={REGISTER_ROUTE}>
                {t('header.register')}
              </Link>
              <Link className="mt-2 rounded-lg bg-primary px-4 py-3 font-semibold text-on-primary" onClick={() => setIsMobileMenuOpen(false)} to={SIGN_IN_ROUTE}>
                {t('header.signIn')}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
