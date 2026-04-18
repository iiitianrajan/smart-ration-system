import { Link } from 'react-router-dom'
import { HOME_ROUTE, PUBLIC_LEDGER_ROUTE } from '../constants/routes'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="w-full border-t-0 bg-slate-100 dark:bg-slate-900">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-start justify-between gap-12 px-6 py-16 md:px-12 lg:flex-row">
        <div className="max-w-xs">
          <div className="mb-6 text-lg font-black uppercase tracking-widest text-blue-950 dark:text-white">
            RationGuard
          </div>
          <p className="font-public-sans text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {t('footer.description')}
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-12 sm:grid-cols-2 lg:w-auto lg:grid-cols-3">
          <div>
            <h5 className="mb-6 text-xs font-bold uppercase tracking-widest text-blue-900 dark:text-blue-200">
              {t('footer.platform')}
            </h5>
            <ul className="space-y-4 font-public-sans text-sm">
              <li>
                <Link className="text-slate-500 transition-colors hover:text-blue-600" to={PUBLIC_LEDGER_ROUTE}>
                  {t('header.publicLedger')}
                </Link>
              </li>
              <li>
                <Link className="text-slate-500 transition-colors hover:text-blue-600" to={HOME_ROUTE}>
                  {t('footer.openData')}
                </Link>
              </li>
              <li>
                <Link className="text-slate-500 transition-colors hover:text-blue-600" to={HOME_ROUTE}>
                  {t('footer.apiDocs')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-6 text-xs font-bold uppercase tracking-widest text-blue-900 dark:text-blue-200">
              {t('footer.support')}
            </h5>
            <ul className="space-y-4 font-public-sans text-sm">
              <li>
                <Link className="text-slate-500 transition-colors hover:text-blue-600" to={HOME_ROUTE}>
                  {t('footer.contactSupport')}
                </Link>
              </li>
              <li>
                <Link className="text-slate-500 transition-colors hover:text-blue-600" to={HOME_ROUTE}>
                  {t('footer.districtOfficers')}
                </Link>
              </li>
              <li>
                <Link className="text-slate-500 transition-colors hover:text-blue-600" to={HOME_ROUTE}>
                  {t('footer.grievanceCell')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-6 text-xs font-bold uppercase tracking-widest text-blue-900 dark:text-blue-200">
              {t('footer.legal')}
            </h5>
            <ul className="space-y-4 font-public-sans text-sm">
              <li>
                <Link className="text-slate-500 transition-colors hover:text-blue-600" to={HOME_ROUTE}>
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link className="text-slate-500 transition-colors hover:text-blue-600" to={HOME_ROUTE}>
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 px-12 py-8 text-center opacity-80 dark:border-slate-800">
        <span className="text-xs font-bold tracking-widest text-slate-400">
          {t('footer.trustLine')}
        </span>
      </div>
    </footer>
  )
}
