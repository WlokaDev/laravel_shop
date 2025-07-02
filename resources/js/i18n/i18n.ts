import i18n, { Resource } from 'i18next'
import { initReactI18next } from 'react-i18next'

const setupI18n = ({
  translations,
  locale,
}: {
  translations: Resource
  locale: string
}) => {
  if (i18n.isInitialized) {
    return
  }

  i18n.use(initReactI18next).init({
    resources: {
      [locale]: {
        translation: translations,
      },
    },
    debug: true,
    lng: 'pl',
    fallbackLng: 'pl',
    interpolation: {
      escapeValue: false,
    },
  })
}

export { setupI18n }
