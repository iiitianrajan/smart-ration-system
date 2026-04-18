import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { API_BASE_URL } from '../config'
import { useAuth } from '../context/AuthContext'
import { DASHBOARD_OVERVIEW_ROUTE, HOME_ROUTE, SIGN_IN_ROUTE } from '../constants/routes'
import InlineSpinner from '../components/ui/InlineSpinner'
import { getErrorMessage, readJsonSafely } from '../utils/api'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { setAuthSession } = useAuth()
  const [name, setName] = useState('')
  const [aadharNumber, setAadharNumber] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)
  const [validationError, setValidationError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function clearError() {
    if (validationError) {
      setValidationError('')
    }
  }

  function handleNameChange(event) {
    setName(event.target.value)
    clearError()
  }

  function handleAadharChange(event) {
    const digitsOnly = event.target.value.replace(/\D/g, '').slice(0, 12)
    setAadharNumber(digitsOnly)
    clearError()
  }

  function handlePhoneChange(event) {
    const digitsOnly = event.target.value.replace(/\D/g, '').slice(0, 10)
    setPhone(digitsOnly)
    clearError()
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)
    clearError()
  }

  function handleTermsChange(event) {
    setIsTermsAccepted(event.target.checked)
    clearError()
  }

  function getValidationError() {
    if (!name.trim()) {
      return 'Enter your full name.'
    }

    if (aadharNumber.length !== 12) {
      return 'Aadhaar number must be exactly 12 digits.'
    }

    if (phone.length !== 10) {
      return 'Mobile number must be exactly 10 digits.'
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters.'
    }

    if (!isTermsAccepted) {
      return 'Please accept the terms to continue.'
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
      const registerResponse = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          password,
          aadharNumber,
        }),
      })

      const registerData = await readJsonSafely(registerResponse)

      if (!registerResponse.ok) {
        throw new Error(getErrorMessage(registerData, 'Unable to create your account.'))
      }

      const profileResponse = await fetch(`${API_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${registerData.token}`,
        },
      })

      const profileData = await readJsonSafely(profileResponse)

      if (!profileResponse.ok) {
        throw new Error(getErrorMessage(profileData, 'Unable to load your profile.'))
      }

      setAuthSession(registerData.token, profileData)
      setName('')
      setAadharNumber('')
      setPhone('')
      setPassword('')
      setIsTermsAccepted(false)
      toast.success('Account created successfully.')
      navigate(DASHBOARD_OVERVIEW_ROUTE, { replace: true })
    } catch (requestError) {
      const nextError = requestError.message || 'Unable to create your account.'
      setValidationError(nextError)
      toast.error(nextError)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid =
    name.trim().length > 0 &&
    aadharNumber.length === 12 &&
    phone.length === 10 &&
    password.length >= 6 &&
    isTermsAccepted

  return (
    <div className="flex min-h-screen flex-col bg-surface text-on-surface antialiased">
      <main className="flex flex-grow flex-col lg:flex-row">
        <section
          className="relative hidden overflow-hidden p-16 lg:flex lg:w-5/12 lg:flex-col lg:justify-between"
          style={{ backgroundImage: 'linear-gradient(135deg, #001e40 0%, #003366 100%)' }}
        >
          <div className="relative z-10">
            <div className="mb-12">
              <span className="text-3xl font-black uppercase tracking-tighter text-on-primary">
                RationSmart
              </span>
            </div>
            <h1 className="mb-6 text-6xl font-black leading-none tracking-tighter text-on-primary">
              Securing the <br />Public Record.
            </h1>
            <p className="max-w-md text-xl font-medium text-on-primary-container">
              Join the digital infrastructure for transparent resource distribution. An immutable
              gateway to civic integrity.
            </p>
          </div>
          <div className="relative z-10 grid grid-cols-1 gap-8">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-3xl text-on-primary-container">
                verified_user
              </span>
              <div>
                <h3 className="text-lg font-bold leading-tight text-on-primary">Identity Verification</h3>
                <p className="text-sm text-on-primary-container">
                  Secure Aadhaar-linked registration for authentic user access.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-3xl text-on-primary-container">
                account_balance
              </span>
              <div>
                <h3 className="text-lg font-bold leading-tight text-on-primary">Institutional Trust</h3>
                <p className="text-sm text-on-primary-container">
                  Direct oversight and end-to-end transparency in rationing systems.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-[-10%] right-[-10%] h-96 w-96 rounded-full bg-primary-container opacity-20 blur-3xl" />
        </section>

        <section className="flex flex-grow flex-col items-center justify-center bg-surface p-8 md:p-16 lg:p-24">
          <div className="w-full max-w-md space-y-12">
            <div className="mb-8 text-center lg:hidden">
              <span className="text-2xl font-black uppercase tracking-tighter text-primary">
                RationSmart
              </span>
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tight text-primary">Create Account</h2>
              <p className="font-medium text-on-surface-variant">
                Initialize your user profile for the smart registry.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-on-surface-variant">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-lg border-none bg-surface-container-highest p-4 text-on-surface placeholder:text-outline transition-all duration-300 focus:bg-surface-container-lowest focus:ring-0"
                      onChange={handleNameChange}
                      placeholder="Enter as per Aadhaar card"
                      type="text"
                      value={name}
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 focus-within:w-full" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-on-surface-variant">
                    Aadhar Number
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-lg border-none bg-surface-container-highest p-4 text-on-surface placeholder:text-outline transition-all duration-300 focus:bg-surface-container-lowest focus:ring-0"
                      inputMode="numeric"
                      maxLength={12}
                      onChange={handleAadharChange}
                      placeholder="XXXX XXXX XXXX"
                      disabled={isSubmitting}
                      type="text"
                      value={aadharNumber}
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-on-surface-variant">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-lg border-none bg-surface-container-highest p-4 text-on-surface placeholder:text-outline transition-all duration-300 focus:bg-surface-container-lowest focus:ring-0"
                      inputMode="numeric"
                      maxLength={10}
                      onChange={handlePhoneChange}
                      placeholder="+91 00000 00000"
                      disabled={isSubmitting}
                      type="tel"
                      value={phone}
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-on-surface-variant">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-lg border-none bg-surface-container-highest p-4 text-on-surface placeholder:text-outline transition-all duration-300 focus:bg-surface-container-lowest focus:ring-0"
                      disabled={isSubmitting}
                      onChange={handlePasswordChange}
                      placeholder="Create a secure password"
                      type="password"
                      value={password}
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300" />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 py-2">
                <input
                  checked={isTermsAccepted}
                  className="mt-1 h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-surface"
                  id="terms"
                  disabled={isSubmitting}
                  onChange={handleTermsChange}
                  type="checkbox"
                />
                <label className="text-sm leading-relaxed text-on-surface-variant" htmlFor="terms">
                  I acknowledge that my data will be processed according to the{' '}
                  <Link className="font-bold text-primary hover:underline" to={HOME_ROUTE}>
                    Privacy Policy
                  </Link>{' '}
                  and I agree to the{' '}
                  <Link className="font-bold text-primary hover:underline" to={HOME_ROUTE}>
                    Terms of Service
                  </Link>
                  .
                </label>
              </div>

              {validationError ? (
                <p className="text-sm font-medium text-error">{validationError}</p>
              ) : null}

              <button
                className="flex w-full items-center justify-center gap-3 rounded-lg bg-primary px-8 py-5 text-lg font-bold text-on-primary transition-all duration-200 active:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!isFormValid || isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <InlineSpinner />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </>
                )}
              </button>

              <div className="pt-4 text-center">
                <p className="font-medium text-on-surface-variant">
                  Already have an account?{' '}
                  <Link className="font-bold text-primary hover:underline" to={SIGN_IN_ROUTE}>
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="flex w-full flex-col items-center justify-between gap-4 bg-slate-100 px-8 py-12 md:flex-row dark:bg-slate-950">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100">
            RationSmart
          </span>
          <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Â© 2024 Smart Ration Transparency Authority. An Immutable Public Record.
          </span>
        </div>
        <div className="flex gap-8">
          <Link className="text-xs uppercase tracking-widest text-slate-500 transition-colors hover:text-blue-800 dark:text-slate-400" to={HOME_ROUTE}>
            Privacy Policy
          </Link>
          <Link className="text-xs uppercase tracking-widest text-slate-500 transition-colors hover:text-blue-800 dark:text-slate-400" to={HOME_ROUTE}>
            Terms of Service
          </Link>
          <Link className="text-xs uppercase tracking-widest text-slate-500 transition-colors hover:text-blue-800 dark:text-slate-400" to={HOME_ROUTE}>
            Accessibility
          </Link>
          <Link className="text-xs uppercase tracking-widest text-slate-500 transition-colors hover:text-blue-800 dark:text-slate-400" to={HOME_ROUTE}>
            Audit Log
          </Link>
        </div>
      </footer>
    </div>
  )
}
