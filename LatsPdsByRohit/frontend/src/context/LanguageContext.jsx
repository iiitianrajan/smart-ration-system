import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { SUPPORTED_LANGUAGES, translations } from '../i18n/translations'

const LANGUAGE_STORAGE_KEY = 'appLanguage'
const LanguageContext = createContext(null)

function getValueByPath(object, path) {
  return path.split('.').reduce((currentValue, key) => currentValue?.[key], object)
}

function getInitialLanguage() {
  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  return SUPPORTED_LANGUAGES.some((language) => language.code === storedLanguage) ? storedLanguage : 'EN'
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    const selectedLanguage = SUPPORTED_LANGUAGES.find((entry) => entry.code === language)
    document.documentElement.lang = selectedLanguage?.locale || 'en'
  }, [language])

  const value = useMemo(() => {
    const selectedLanguage = SUPPORTED_LANGUAGES.find((entry) => entry.code === language) || SUPPORTED_LANGUAGES[0]

    return {
      language,
      setLanguage,
      selectedLanguage,
      supportedLanguages: SUPPORTED_LANGUAGES,
      t: (path, fallback = path) => {
        return (
          getValueByPath(translations[language], path) ??
          getValueByPath(translations.EN, path) ??
          fallback
        )
      },
    }
  }, [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}
