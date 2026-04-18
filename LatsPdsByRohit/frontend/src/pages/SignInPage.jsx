import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { DASHBOARD_OVERVIEW_ROUTE, HOME_ROUTE, REGISTER_ROUTE } from '../constants/routes'
import InlineSpinner from '../components/ui/InlineSpinner'
import { getApiErrorMessage } from '../utils/api'

export default function SignInPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const { selectedLanguage, setLanguage, supportedLanguages, t } = useLanguage()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [validationError, setValidationError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handlePhoneChange(event) {
    const digitsOnly = event.target.value.replace(/\D/g, '').slice(0, 10)
    setPhone(digitsOnly)

    if (validationError) {
      setValidationError('')
    }
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)

    if (validationError) {
      setValidationError('')
    }
  }

  function getValidationError() {
    if (!phone) {
      return 'Enter your 10 digit mobile number.'
    }

    if (phone.length !== 10) {
      return 'Mobile number must be exactly 10 digits.'
    }

    if (!password) {
      return 'Enter your password.'
    }

    return ''
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const error = getValidationError()
    if (error) {
      setValidationError(error)
      return
    }

    setIsSubmitting(true)
    setValidationError('')

    try {
      const profile = await login({
        phone,
        password,
      })
      toast.success(`Welcome back, ${profile.name || 'User'}.`)

      const nextRoute = location.state?.from?.pathname || DASHBOARD_OVERVIEW_ROUTE
      navigate(nextRoute, { replace: true })
    } catch (requestError) {
      const nextError = getApiErrorMessage(requestError, 'Invalid phone or password.')
      setValidationError(nextError)
      toast.error(nextError)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isIdentifierValid = phone.length === 10 && password.length > 0

  function handleLanguageInfo() {
    const currentIndex = supportedLanguages.findIndex((language) => language.code === selectedLanguage.code)
    const nextLanguage = supportedLanguages[(currentIndex + 1) % supportedLanguages.length]
    setLanguage(nextLanguage.code)
    toast.success(`${nextLanguage.label} selected.`)
  }

  function handleHelpInfo() {
    toast('Use your registered phone number and password to sign in.')
  }

  return (
    <main className="min-h-screen bg-surface pt-24 pb-12 px-6 text-on-surface">
      <header className="fixed top-0 z-50 w-full bg-slate-50/90 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-8 py-4">
          <Link className="flex items-center gap-3" to={HOME_ROUTE}>
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-container">
              <span className="material-symbols-outlined text-white">account_balance</span>
            </div>
            <div>
              <div className="text-lg font-black tracking-tighter text-blue-950">RationGuard</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Smart Ration Portal
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-4 text-slate-500">
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-slate-200/70 hover:text-blue-900"
              aria-label={`Language: ${selectedLanguage.label}`}
              onClick={handleLanguageInfo}
              type="button"
            >
              <span className="material-symbols-outlined">language</span>
            </button>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-slate-200/70 hover:text-blue-900"
              onClick={handleHelpInfo}
              type="button"
            >
              <span className="material-symbols-outlined">help_outline</span>
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl bg-surface-container-lowest shadow-[0_18px_50px_rgba(15,23,42,0.12)] lg:grid-cols-12">
        <div className="relative hidden min-h-[720px] overflow-hidden bg-primary lg:col-span-5 lg:flex lg:flex-col lg:justify-end p-12">
          <div className="absolute inset-0 opacity-35">
            <img
              alt="Abstract digital infrastructure"
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCL2xg3Net4OJPanHwhLoP_sOMRtTdKEp8XIeEzpV-YAgdFI2AxAGEOD75ZY2nyjxBIo5VRB4GJe_FZKK9atarKaN6MgNGHLch5Rj69SPIEBGbWmMbef6Bw0fjyCo-ENC2QuN8ldfUdkDwL_oIg9E-7Y_f6dJWJXHiW0kbbzF2C6GSnu0RtRYZ3rztEdLNd1od_wDn4aCFLh0weKIgcbn3kNEE9kO8uMZwQ2UqvrbQQ7wak8HBASTdPDtstk6Nc5dc38YY3Et5IEY"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
          <div className="relative z-10 max-w-sm text-on-primary">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-on-primary-container">
              {t('signIn.officialPortal')}
            </p>
            <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight">
              {t('signIn.heroTitle')}
            </h1>
            <p className="text-base leading-relaxed text-on-primary-container">
              {t('signIn.heroDescription')}
            </p>
            <div className="mt-12 flex items-center gap-6">
              <div>
                <div className="text-3xl font-black text-on-primary">100%</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-on-primary-container">
                  {t('signIn.transparency')}
                </div>
              </div>
              <div className="h-10 w-px bg-on-primary-container/25" />
              <div>
                <div className="text-3xl font-black text-on-primary">Secure</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-on-primary-container">
                  {t('signIn.encryption')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 px-6 py-10 md:px-10 md:py-16 lg:px-16 lg:py-20">
          <div className="mx-auto flex max-w-md flex-col justify-center">
            <header className="mb-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {t('signIn.signInToContinue')}
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-primary md:text-4xl">
                {t('signIn.title')}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant md:text-base">
                {t('signIn.subtitle')}
              </p>
            </header>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">phone_iphone</span>
                  {t('signIn.mobileNumber')}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium text-on-surface-variant">
                    +91
                  </span>
                  <input
                    className={`w-full rounded-lg border bg-surface-container-highest px-4 py-4 pl-14 font-medium text-on-surface outline-none transition-all placeholder:text-outline focus:border-primary focus:bg-surface-container-lowest ${
                      validationError ? 'border-error' : 'border-slate-200'
                    }`}
                    inputMode="numeric"
                    maxLength={10}
                    onChange={handlePhoneChange}
                    placeholder={t('signIn.mobileNumber')}
                    disabled={isSubmitting}
                    type="text"
                    value={phone}
                  />
                </div>
                <p className="text-xs text-on-surface-variant">
                  {t('signIn.mobileHint')}
                </p>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  {t('signIn.password')}
                </label>
                <div className="relative">
                  <input
                    className={`w-full rounded-lg border bg-surface-container-highest px-4 py-4 font-medium text-on-surface outline-none transition-all placeholder:text-outline focus:border-primary focus:bg-surface-container-lowest ${
                      validationError ? 'border-error' : 'border-slate-200'
                    }`}
                    disabled={isSubmitting}
                    onChange={handlePasswordChange}
                    placeholder={t('signIn.password')}
                    type="password"
                    value={password}
                  />
                </div>
                {validationError ? (
                  <p className="text-sm font-medium text-error">{validationError}</p>
                ) : (
                  <p className="text-xs text-on-surface-variant">
                    {t('signIn.passwordHint')}
                  </p>
                )}
              </div>

              <button
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 font-bold text-on-primary shadow-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!isIdentifierValid || isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <InlineSpinner />
                    {t('signIn.signingIn')}
                  </>
                ) : (
                  <>
                    {t('header.signIn')}
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </>
                )}
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-surface-container" />
                </div>
                <div className="relative flex justify-center bg-surface-container-lowest px-4 text-xs uppercase tracking-[0.18em] text-outline">
                  {t('signIn.accountAccess')}
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-on-surface-variant">
                  {t('signIn.newUser')}
                  <Link
                    className="ml-1 font-bold text-primary underline-offset-4 hover:underline"
                    to={REGISTER_ROUTE}
                  >
                    {t('signIn.registerHere')}
                  </Link>
                </p>
              </div>
            </form>

            <div className="mt-16 border-t border-surface-container pt-8">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="material-symbols-outlined text-outline">verified_user</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-outline">
                    {t('signIn.verified')}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="material-symbols-outlined text-outline">encrypted</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-outline">
                    {t('signIn.encrypted')}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="material-symbols-outlined text-outline">policy</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-outline">
                    {t('signIn.compliant')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-100 px-8 py-10 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
              RationGuard Authority
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              {t('signIn.secureAccess')}
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            <Link className="transition-colors hover:text-blue-800" to={HOME_ROUTE}>
              {t('footer.privacy')}
            </Link>
            <Link className="transition-colors hover:text-blue-800" to={HOME_ROUTE}>
              {t('footer.terms')}
            </Link>
            <Link className="transition-colors hover:text-blue-800" to={HOME_ROUTE}>
              {t('register.accessibility')}
            </Link>
            <Link className="transition-colors hover:text-blue-800" to={HOME_ROUTE}>
              {t('register.auditLog')}
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
