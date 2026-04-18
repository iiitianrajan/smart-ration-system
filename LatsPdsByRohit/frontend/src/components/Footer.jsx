import { Link } from 'react-router-dom'
import { HOME_ROUTE, PUBLIC_LEDGER_ROUTE } from '../constants/routes'

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 w-full border-t-0">
      <div className="flex flex-col lg:flex-row justify-between items-start px-6 md:px-12 py-16 gap-12 w-full max-w-screen-2xl mx-auto">
        <div className="max-w-xs">
          <div className="text-lg font-black text-blue-950 dark:text-white uppercase tracking-widest mb-6">
            RationGuard
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-public-sans text-sm leading-relaxed">
            © 2024 National Smart Ration Transparency Portal. An official government digital
            monolith dedicated to public welfare and transparency.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full lg:w-auto">
          <div>
            <h5 className="font-bold text-blue-900 dark:text-blue-200 mb-6 uppercase text-xs tracking-widest">
              Platform
            </h5>
            <ul className="space-y-4 font-public-sans text-sm">
              <li>
                <Link className="text-slate-500 hover:text-blue-600 transition-colors" to={PUBLIC_LEDGER_ROUTE}>
                  Public Ledger
                </Link>
              </li>
              <li>
                <Link className="text-slate-500 hover:text-blue-600 transition-colors" to={HOME_ROUTE}>
                  Open Data Initiative
                </Link>
              </li>
              <li>
                <Link className="text-slate-500 hover:text-blue-600 transition-colors" to={HOME_ROUTE}>
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-blue-900 dark:text-blue-200 mb-6 uppercase text-xs tracking-widest">
              Support
            </h5>
            <ul className="space-y-4 font-public-sans text-sm">
              <li>
                <Link className="text-slate-500 hover:text-blue-600 transition-colors" to={HOME_ROUTE}>
                  Contact Support
                </Link>
              </li>
              <li>
                <Link className="text-slate-500 hover:text-blue-600 transition-colors" to={HOME_ROUTE}>
                  District Officers
                </Link>
              </li>
              <li>
                <Link className="text-slate-500 hover:text-blue-600 transition-colors" to={HOME_ROUTE}>
                  Grievance Cell
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-blue-900 dark:text-blue-200 mb-6 uppercase text-xs tracking-widest">
              Legal
            </h5>
            <ul className="space-y-4 font-public-sans text-sm">
              <li>
                <Link className="text-slate-500 hover:text-blue-600 transition-colors" to={HOME_ROUTE}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-slate-500 hover:text-blue-600 transition-colors" to={HOME_ROUTE}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="px-12 py-8 border-t border-slate-200 dark:border-slate-800 text-center opacity-80">
        <span className="text-xs tracking-widest font-bold text-slate-400">
          DESIGNED FOR CITIZEN TRUST • SECURED BY END-TO-END ENCRYPTION
        </span>
      </div>
    </footer>
  )
}
