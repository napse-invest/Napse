import { useEffect, useState } from 'react'

// Intl
import { IntlProvider } from 'react-intl'
import messages_fr from '../utils/lang/fr.json'

const messages = { fr: messages_fr }

interface Props {
  children: JSX.Element
}

const Languages = (props: Props): JSX.Element => {
  const { children } = props

  // --- Start setup localStorage --- //
  if (localStorage.getItem('language') == null) {
    // Get browser language (without region code)
    const language = navigator.language.split(/[-_]/)[0]
    localStorage.setItem('language', language)
  }
  // --- End setup localStorage --- //

  // --- Start setup language --- //
  const [language, setLanguage] = useState<string>(localStorage.getItem('language') || 'en')
  useEffect(() => {
    window.addEventListener('languageUpdated', () => {
      setLanguage(localStorage.getItem('language') || 'en')
    })
  }, [language])
  // --- End setup language --- //

  //<IntlProvider locale={language} defaultLocale='en' messages={messages[language]}>

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      {children}
    </IntlProvider>
  )
}

export default Languages
