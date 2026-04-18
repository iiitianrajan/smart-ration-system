import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import InlineSpinner from '../../components/ui/InlineSpinner'
import { SIGN_IN_ROUTE } from '../../constants/routes'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { getApiErrorMessage } from '../../utils/api'

const SETTINGS_STORAGE_KEY = 'dashboardPreferences'

const DEFAULT_SETTINGS = {
  language: 'EN',
  region: 'India (IST)',
  emailNotifications: true,
  smsAlerts: true,
  pushNotifications: false,
  highContrastMode: false,
  screenReaderOptimization: false,
  textScale: 'Standard',
}

function normalizeStoredLanguage(language) {
  if (language === 'Hindi') {
    return 'HI'
  }

  if (language === 'Marathi') {
    return 'MR'
  }

  if (language === 'English (United Kingdom)') {
    return 'EN'
  }

  return language || DEFAULT_SETTINGS.language
}

function readStoredSettings() {
  try {
    const storedValue = window.localStorage.getItem(SETTINGS_STORAGE_KEY)

    if (!storedValue) {
      return DEFAULT_SETTINGS
    }

    return {
      ...DEFAULT_SETTINGS,
      ...JSON.parse(storedValue),
      language: normalizeStoredLanguage(JSON.parse(storedValue).language),
    }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export default function SettingsPage() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { language, setLanguage, supportedLanguages } = useLanguage()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [settings, setSettings] = useState(readStoredSettings)
  const [isSaving, setIsSaving] = useState(false)
  const [activeSection, setActiveSection] = useState('language')

  function updateSetting(key, value) {
    setSettings((currentValue) => ({
      ...currentValue,
      [key]: value,
    }))
  }

  function focusSection(sectionId) {
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleDiscardChanges() {
    setSettings(readStoredSettings())
    toast.success('Settings restored to the last saved values.')
  }

  async function handleSaveConfiguration() {
    setIsSaving(true)

    try {
      setLanguage(settings.language)
      window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
      toast.success('Settings saved successfully.')
    } catch {
      toast.error('Unable to save settings on this device.')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleLogout() {
    setIsLoggingOut(true)

    try {
      await logout()
      toast.success('You have been signed out securely.')
      navigate(SIGN_IN_ROUTE, { replace: true })
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Unable to sign out right now.'))
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto md:mx-0">
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Preferences & Controls</span>
        <h2 className="text-5xl font-black tracking-tight text-on-surface">Account Configuration</h2>
        <div className="mt-4 h-1 w-16 bg-primary" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-3 space-y-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Section 01</p>
            <button className={`block border-r-2 text-sm ${activeSection === 'language' ? 'border-primary font-bold text-primary' : 'border-transparent font-semibold text-on-surface-variant hover:text-on-surface'}`} onClick={() => focusSection('language')} type="button">Language & Region</button>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Section 02</p>
            <button className={`block border-r-2 text-sm ${activeSection === 'communication' ? 'border-primary font-bold text-primary' : 'border-transparent font-semibold text-on-surface-variant hover:text-on-surface'}`} onClick={() => focusSection('communication')} type="button">Communication</button>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Section 03</p>
            <button className={`block border-r-2 text-sm ${activeSection === 'security' ? 'border-primary font-bold text-primary' : 'border-transparent font-semibold text-on-surface-variant hover:text-on-surface'}`} onClick={() => focusSection('security')} type="button">Security & Access</button>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Section 04</p>
            <button className={`block border-r-2 text-sm ${activeSection === 'accessibility' ? 'border-primary font-bold text-primary' : 'border-transparent font-semibold text-on-surface-variant hover:text-on-surface'}`} onClick={() => focusSection('accessibility')} type="button">Accessibility</button>
          </div>
        </div>

        <div className="md:col-span-9 space-y-8">
          <section className="rounded-2xl border border-surface bg-surface-container-lowest p-8 shadow-sm" id="language">
            <h3 className="flex items-center gap-2 text-lg font-bold text-on-surface mb-6">
              <span className="material-symbols-outlined text-[20px] text-primary">language</span>
              Language Preferences
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Interface Language</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none rounded-lg border border-surface bg-white px-4 py-3 text-sm font-medium text-on-surface outline-none focus:border-primary"
                    onChange={(event) => updateSetting('language', event.target.value)}
                    value={settings.language || language}
                  >
                    {supportedLanguages.map((languageOption) => (
                      <option key={languageOption.code} value={languageOption.code}>
                        {languageOption.label}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[18px]">expand_more</span>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Regional Format</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none rounded-lg border border-surface bg-white px-4 py-3 text-sm font-medium text-on-surface outline-none focus:border-primary"
                    onChange={(event) => updateSetting('region', event.target.value)}
                    value={settings.region}
                  >
                    <option>India (IST)</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[18px]">expand_more</span>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-surface bg-surface-container-lowest p-8 shadow-sm relative overflow-hidden" id="communication">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-slate-50 rotate-12 opacity-50 transform pointer-events-none">
               <div className="w-full h-8 bg-slate-100 flex items-center justify-center"><div className="w-1/2 h-4 bg-slate-200"></div></div>
               <div className="w-full h-32 flex divide-x divide-slate-100"><div className="flex-1 bg-slate-50"></div><div className="flex-1 bg-slate-50"></div><div className="flex-1 bg-slate-50"></div></div>
            </div>

            <div className="relative z-10">
              <h3 className="flex items-center gap-2 text-lg font-bold text-on-surface mb-6">
                <span className="material-symbols-outlined text-[20px] text-primary">notifications</span>
                Notification Channels
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-white p-5 border border-surface shadow-sm">
                  <div>
                    <p className="font-bold text-sm text-on-surface">Email Notifications</p>
                    <p className="text-xs text-on-surface-variant mt-1">Receive monthly ration summaries and receipt copies.</p>
                  </div>
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      settings.emailNotifications
                        ? 'bg-primary focus:ring-primary'
                        : 'bg-surface-container focus:ring-surface-container'
                    }`}
                    onClick={() => updateSetting('emailNotifications', !settings.emailNotifications)}
                    type="button"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white p-5 border border-surface shadow-sm">
                  <div>
                    <p className="font-bold text-sm text-on-surface">SMS Alerts</p>
                    <p className="text-xs text-on-surface-variant mt-1">Get real-time updates on shop availability and delivery.</p>
                  </div>
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      settings.smsAlerts
                        ? 'bg-primary focus:ring-primary'
                        : 'bg-surface-container focus:ring-surface-container'
                    }`}
                    onClick={() => updateSetting('smsAlerts', !settings.smsAlerts)}
                    type="button"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.smsAlerts ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white p-5 border border-surface shadow-sm">
                  <div>
                    <p className="font-bold text-sm text-on-surface">Push Notifications</p>
                    <p className="text-xs text-on-surface-variant mt-1">Mobile app alerts for urgent administrative updates.</p>
                  </div>
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      settings.pushNotifications
                        ? 'bg-primary focus:ring-primary'
                        : 'bg-surface-container focus:ring-surface-container'
                    }`}
                    onClick={() => updateSetting('pushNotifications', !settings.pushNotifications)}
                    type="button"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                        settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-surface bg-surface-container-lowest p-8 shadow-sm" id="security">
            <h3 className="flex items-center gap-2 text-lg font-bold text-on-surface mb-6">
              <span className="material-symbols-outlined text-[20px] text-primary">security</span>
              Security & Authentication
            </h3>

            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between rounded-xl bg-white p-5 border border-surface shadow-sm gap-4">
                <div>
                  <p className="font-bold text-sm text-on-surface">Change Login Password</p>
                  <p className="text-xs text-on-surface-variant mt-1">Managed with your current secure account credentials.</p>
                </div>
                <button
                  className="rounded border border-slate-900 bg-slate-900 px-6 py-2.5 text-xs font-bold text-white hover:bg-slate-800"
                  onClick={() => toast('Password change flow can be connected to the backend next.')}
                  type="button"
                >
                  Update Password
                </button>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between rounded-xl bg-white p-5 border border-surface shadow-sm gap-4">
                <div>
                  <p className="font-bold text-sm text-on-surface">Reset Verification PIN</p>
                  <p className="text-xs text-on-surface-variant mt-1">Required for ration shop transactions.</p>
                </div>
                <button
                  className="rounded bg-blue-100 px-6 py-2.5 text-xs font-bold text-blue-900 hover:bg-blue-200"
                  onClick={() => toast('PIN reset flow can be connected once the backend exposes it.')}
                  type="button"
                >
                  Reset PIN
                </button>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between rounded-xl bg-white p-5 border border-surface shadow-sm gap-4">
                <div>
                  <p className="font-bold text-sm text-on-surface">Secure Sign Out</p>
                  <p className="text-xs text-on-surface-variant mt-1">Ends this session and revokes the current refresh token from the backend.</p>
                </div>
                <button
                  className="flex items-center justify-center gap-2 rounded px-6 py-2.5 text-xs font-bold text-white bg-slate-900 border border-slate-900 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                  type="button"
                >
                  {isLoggingOut ? (
                    <>
                      <InlineSpinner />
                      Signing Out...
                    </>
                  ) : (
                    'Sign Out'
                  )}
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-surface bg-surface-container-lowest p-8 shadow-sm" id="accessibility">
            <h3 className="flex items-center gap-2 text-lg font-bold text-on-surface mb-6">
              <span className="material-symbols-outlined text-[20px] text-primary">accessibility</span>
              Accessibility Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-surface bg-white p-6 shadow-sm">
                 <h4 className="font-bold text-sm text-on-surface mb-2">High Contrast Mode</h4>
                 <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                   Increases visibility for users with visual impairments.
                 </p>
                 <button
                   className={`rounded px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest ${
                     settings.highContrastMode
                       ? 'bg-slate-900 text-white'
                       : 'bg-surface-container text-on-surface-variant hover:bg-surface-variant'
                   }`}
                   onClick={() => updateSetting('highContrastMode', !settings.highContrastMode)}
                   type="button"
                 >
                   {settings.highContrastMode ? 'Enabled' : 'Enable'}
                 </button>
              </div>

              <div className="rounded-xl border border-surface bg-white p-6 shadow-sm">
                 <h4 className="font-bold text-sm text-on-surface mb-2">Screen Reader Optimization</h4>
                 <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                   Enhanced semantic HTML for external reader tools.
                 </p>
                 <button
                   className={`rounded px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest ${
                     settings.screenReaderOptimization
                       ? 'bg-slate-900 text-white'
                       : 'bg-surface-container text-on-surface-variant hover:bg-surface-variant'
                   }`}
                   onClick={() => updateSetting('screenReaderOptimization', !settings.screenReaderOptimization)}
                   type="button"
                 >
                   {settings.screenReaderOptimization ? 'Enabled' : 'Disabled'}
                 </button>
              </div>

              <div className="rounded-xl border border-surface bg-white p-6 shadow-sm md:col-span-2">
                 <h4 className="font-bold text-sm text-on-surface mb-2">Text Scaling</h4>
                 <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                   Adjust system-wide font size for better legibility.
                 </p>

                 <div className="mt-8 pb-4">
                   <div className="mb-4 flex gap-2">
                     {['Standard', 'Large', 'X-Large'].map((scaleOption) => (
                       <button
                         key={scaleOption}
                         className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                           settings.textScale === scaleOption
                             ? 'bg-slate-900 text-white'
                             : 'bg-surface-container text-on-surface-variant hover:bg-surface-variant'
                         }`}
                         onClick={() => updateSetting('textScale', scaleOption)}
                         type="button"
                       >
                         {scaleOption}
                       </button>
                     ))}
                   </div>
                   <div className="relative h-1 w-full bg-surface-container rounded-full">
                     <div
                       className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-slate-900 shadow-sm ring-4 ring-white ${
                         settings.textScale === 'Standard'
                           ? 'left-0 translate-x-0'
                           : settings.textScale === 'Large'
                             ? 'left-1/2 -translate-x-1/2'
                             : 'right-0 translate-x-0'
                       }`}
                     />
                   </div>
                   <div className="flex justify-between mt-4 text-[10px] uppercase font-bold text-on-surface-variant tracking-widest">
                     <span>Standard</span>
                     <span>Large</span>
                     <span>X-Large</span>
                   </div>
                 </div>
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-surface">
            <button
              className="text-sm font-bold text-on-surface-variant hover:text-on-surface"
              onClick={handleDiscardChanges}
              type="button"
            >
              Discard Changes
            </button>
            <button
              className="rounded bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSaving}
              onClick={handleSaveConfiguration}
              type="button"
            >
              {isSaving ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
