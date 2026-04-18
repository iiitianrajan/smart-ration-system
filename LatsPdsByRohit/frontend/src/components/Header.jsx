import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ALLOCATIONS_ROUTE,
  FAIR_PRICE_SHOPS_ROUTE,
  HOME_ROUTE,
  PUBLIC_LEDGER_ROUTE,
  TRANSPARENCY_REPORTS_ROUTE,
  SIGN_IN_ROUTE,
} from '../constants/routes'

export default function Header({ route }) {
  const navigate = useNavigate()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState({ code: 'EN', label: 'English' })
  const searchRef = useRef(null)
  const searchInputRef = useRef(null)
  const languageMenuRef = useRef(null)

  const languageOptions = [
    { code: 'EN', label: 'English' },
    { code: 'HI', label: 'Hindi' },
    { code: 'MR', label: 'Marathi' },
  ]

  const quickActions = [
    {
      id: 'ledger',
      title: 'Go to Public Ledger',
      subtitle: 'Immutable public audit trail',
      icon: 'table_view',
      shortcut: 'L',
      route: PUBLIC_LEDGER_ROUTE,
      keywords: ['ledger', 'audit', 'public'],
    },
    {
      id: 'shops',
      title: 'Find Fair Price Shops',
      subtitle: 'Locate nearby ration shops',
      icon: 'storefront',
      shortcut: 'F',
      route: FAIR_PRICE_SHOPS_ROUTE,
      keywords: ['shop', 'dealer', 'fair', 'store'],
    },
    {
      id: 'allocations',
      title: 'Check Allocations',
      subtitle: 'Track monthly entitlement details',
      icon: 'inventory_2',
      shortcut: 'A',
      route: ALLOCATIONS_ROUTE,
      keywords: ['allocation', 'quota', 'entitlement'],
    },
    {
      id: 'reports',
      title: 'Transparency Reports',
      subtitle: 'Review analytics and disclosures',
      icon: 'monitoring',
      shortcut: 'T',
      route: TRANSPARENCY_REPORTS_ROUTE,
      keywords: ['report', 'transparency', 'analysis'],
    },
  ]

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

    if (matchedAction) {
      navigate(matchedAction.route)
      setIsSearchOpen(false)
      setSearchQuery('')
      return
    }

    if (query.includes('ledger')) {
      navigate(PUBLIC_LEDGER_ROUTE)
    } else if (query.includes('shop') || query.includes('fair')) {
      navigate(FAIR_PRICE_SHOPS_ROUTE)
    } else if (query.includes('allocation')) {
      navigate(ALLOCATIONS_ROUTE)
    } else if (query.includes('report') || query.includes('transparency')) {
      navigate(TRANSPARENCY_REPORTS_ROUTE)
    } else {
      navigate(HOME_ROUTE)
    }

    setIsSearchOpen(false)
    setSearchQuery('')
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
    <nav className="fixed top-0 w-full z-50 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            className="lg:hidden flex items-center justify-center p-2 rounded-md text-blue-900 hover:bg-slate-200/70 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
          <Link
            className="text-lg sm:text-xl font-bold tracking-tighter text-blue-950 dark:text-white uppercase"
            to={HOME_ROUTE}
          >
            RationGuard
          </Link>
        </div>
        
        <div className="hidden lg:flex items-center space-x-8 font-public-sans tracking-tight">
          <Link className={publicLedgerLinkClass} to={PUBLIC_LEDGER_ROUTE}>
            Public Ledger
          </Link>
          <Link className={fairPriceShopsLinkClass} to={FAIR_PRICE_SHOPS_ROUTE}>
            Fair Price Shops
          </Link>
          <Link className={allocationsLinkClass} to={ALLOCATIONS_ROUTE}>
            Allocations
          </Link>
          <Link className={transparencyReportsLinkClass} to={TRANSPARENCY_REPORTS_ROUTE}>
            Transparency Reports
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
              <div className="fixed inset-0 z-[70] flex items-start justify-center bg-slate-900/25 px-2 sm:px-4 pt-16 sm:pt-20 backdrop-blur-[3px]">
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

                  <form
                    className="flex h-12 items-center border-b border-slate-200 px-2 pr-12 dark:border-slate-700"
                    onSubmit={handleSearchSubmit}
                  >
                    <span className="material-symbols-outlined text-[20px] text-slate-500">search</span>
                    <input
                      aria-label="Search navigation"
                      className="h-full flex-1 bg-transparent px-3 text-sm text-blue-950 outline-none placeholder:text-slate-400 dark:text-slate-100"
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search for transactions..."
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                    />
                  </form>

                  <div className="px-2 pt-3">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      Trending Categories
                    </p>
                    <div className="max-h-60 sm:max-h-72 overflow-y-auto">
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
                              <span className="block text-sm font-semibold text-slate-700 dark:text-slate-100 truncate">
                                {action.title}
                              </span>
                              <span className="block text-[11px] text-slate-400 truncate">{action.subtitle}</span>
                            </span>
                            <span className="hidden sm:inline-block rounded border border-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 dark:border-slate-700">
                              {action.shortcut}
                            </span>
                          </button>
                        ))
                      ) : (
                        <div className="rounded-lg px-2 py-6 text-center text-sm text-slate-400">
                          No matching results found.
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
              className="inline-flex h-10 items-center justify-center gap-1 rounded-full px-2 sm:px-3 text-blue-900 transition-all hover:bg-slate-200/70 hover:text-blue-950"
              onClick={() => setIsLanguageMenuOpen((open) => !open)}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] sm:text-[21px]">language</span>
              <span className="hidden text-[11px] font-bold sm:inline">{selectedLanguage.code}</span>
              <span className="hidden sm:inline-block material-symbols-outlined text-[16px]">
                {isLanguageMenuOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {isLanguageMenuOpen ? (
              <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white/95 p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900/95">
                {languageOptions.map((option) => {
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
                        setSelectedLanguage(option)
                        setIsLanguageMenuOpen(false)
                      }}
                      type="button"
                    >
                      <span>{option.label}</span>
                      {isSelected ? (
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      ) : null}
                    </button>
                  )
                })}
              </div>
            ) : null}
          </div>

          <Link
            className="inline-flex h-8 sm:h-10 items-center justify-center rounded-full bg-primary px-4 sm:px-5 text-xs sm:text-sm font-bold text-on-primary shadow-lg transition-all hover:brightness-110"
            to={SIGN_IN_ROUTE}
          >
            Sign in
          </Link>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col px-4 pt-2 pb-6 space-y-1">
          <Link 
            className={`px-4 py-3 rounded-lg font-semibold ${
              route === PUBLIC_LEDGER_ROUTE ? 'bg-blue-50 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`} 
            to={PUBLIC_LEDGER_ROUTE}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Public Ledger
          </Link>
          <Link 
            className={`px-4 py-3 rounded-lg font-semibold ${
              route === FAIR_PRICE_SHOPS_ROUTE ? 'bg-blue-50 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`} 
            to={FAIR_PRICE_SHOPS_ROUTE}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Fair Price Shops
          </Link>
          <Link 
            className={`px-4 py-3 rounded-lg font-semibold ${
              route === ALLOCATIONS_ROUTE ? 'bg-blue-50 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`} 
            to={ALLOCATIONS_ROUTE}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Allocations
          </Link>
          <Link 
            className={`px-4 py-3 rounded-lg font-semibold ${
              route === TRANSPARENCY_REPORTS_ROUTE ? 'bg-blue-50 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`} 
            to={TRANSPARENCY_REPORTS_ROUTE}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Transparency Reports
          </Link>
        </div>
      </div>
    </nav>
  )
}

